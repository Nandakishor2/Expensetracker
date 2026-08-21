from pydantic import BaseModel,Field
from datetime import datetime,timezone
from pymongo.asynchronous.database import AsyncDatabase
from Connections.MongoDB import getMongoDBConnection
from Schema.Loans import LoanSchema
from bson.objectid import ObjectId
from pymongo import ReturnDocument
from Exceptions.pymongo import DatabaseWriteException,DatabaseReadException,DatabaseUpdateException,DuplicateKeyException
from Exceptions.resource import ResourceNotFoundException
import logging
from pymongo.errors import DuplicateKeyError
from Models.Loans import UpdateLoan, LoanFilter
from typing import Optional
from Utils.DateTime import ensure_utc

async def insertLoanDetails(loanDetails :LoanSchema ) -> str:
    try:
        mongoDB = getMongoDBConnection()
        newLoanID = await mongoDB["Loans"].insert_one(loanDetails.model_dump())
        return loanDetails.loanID

    except DuplicateKeyError as e:
        logging.exception(str(e))
        raise DuplicateKeyException(message="Loan Already Exists")
    except Exception as e:
        logging.exception(str(e))
        raise DatabaseWriteException(message=str(e))

async def findLoanDetails(loanID : str) -> dict:
    try:
        mongoDB = getMongoDBConnection()
        loanDetails : dict | None = await mongoDB["Loans"].find_one(
            {"loanID" : loanID}
        )

        if loanDetails is None:
            raise ResourceNotFoundException(message="Loan Not Found")

        return loanDetails

    except ResourceNotFoundException:
        logging.warning("Could not find loan Details for the given loanID")
        raise
    except Exception as e:
        logging.exception("Issue while finding loan Details")
        raise DatabaseReadException(message="Issue while finding loan Details")

async def getAllLoanDetails(filters: Optional[LoanFilter] = None) -> list[dict]:
    try:
        mongoDB = getMongoDBConnection()
        query = {}
        if filters:
            if filters.activeStatus is not None:
                query["activeStatus"] = filters.activeStatus
            if filters.accountID:
                query["accountID"] = filters.accountID
            if filters.companyName:
                query["companyName"] = {"$regex": filters.companyName, "$options": "i"}
            if filters.startDateFrom is not None or filters.startDateTo is not None:
                query["startDate"] = {}
                if filters.startDateFrom is not None:
                    query["startDate"]["$gte"] = ensure_utc(filters.startDateFrom)
                if filters.startDateTo is not None:
                    query["startDate"]["$lte"] = ensure_utc(filters.startDateTo)
            if filters.endDateFrom is not None or filters.endDateTo is not None:
                query["endDate"] = {}
                if filters.endDateFrom is not None:
                    query["endDate"]["$gte"] = ensure_utc(filters.endDateFrom)
                if filters.endDateTo is not None:
                    query["endDate"]["$lte"] = ensure_utc(filters.endDateTo)
            if filters.minLoanAmount is not None or filters.maxLoanAmount is not None:
                query["loanAmount"] = {}
                if filters.minLoanAmount is not None:
                    query["loanAmount"]["$gte"] = filters.minLoanAmount
                if filters.maxLoanAmount is not None:
                    query["loanAmount"]["$lte"] = filters.maxLoanAmount

        loanDetailsList = await mongoDB["Loans"].find(query).to_list(length=None)

        if loanDetailsList is None:
            raise ResourceNotFoundException(message="No Loans were found.")

        return loanDetailsList
    except ResourceNotFoundException:
        logging.warning("No loans were found.")
        raise
    except Exception as e:
        logging.exception("Issue while finding loan Details")
        raise DatabaseReadException(message="Issue while finding loan Details")

async def updateLoanDetails(loanID : str, loanDetails : UpdateLoan) -> dict:
    try:
        
        mongoDB : AsyncDatabase = getMongoDBConnection()
        existingLoanDetails : dict = loanDetails.model_dump(exclude_unset=True,exclude_defaults=True)
        existingLoanDetails["updatedDate"] = datetime.now(timezone.utc)

        updatedLoanDetails : dict = await mongoDB["Loans"].find_one_and_update(
            {"loanID" : loanID},
            {
                "$set" : existingLoanDetails
            },
            return_document=ReturnDocument.AFTER
        )

        if updatedLoanDetails is None:
            raise ResourceNotFoundException(message="Loan Not Found")

        return updatedLoanDetails

    except ResourceNotFoundException:
        logging.warning("Could not find loan Details for the given loanID")
        raise
    except Exception as e:
        logging.exception("Could not update loan records")
        raise DatabaseUpdateException(message="Could not update loan records.") from e

async def deleteLoanDetails(loanID : str) -> bool:
    try:
        mongoDB = getMongoDBConnection()

        updatedLoanDetails = await mongoDB["Loans"].find_one_and_delete(
            {"loanID" : loanID}
        )

        if updatedLoanDetails is None:
            raise ResourceNotFoundException(message="Loan Not Found")

        return True
    except ResourceNotFoundException:
        logging.warning("Could not find loan Details for the given loanID")
        raise
    except Exception as e:
        logging.exception("Could not delete loan records")
        raise DatabaseDeleteException(message="Could not delete loan records.") from e