from pydantic import BaseModel,Field
from datetime import datetime

from Connections.MongoDB import getMongoDBConnection
from Schema.Loans import LoanSchema
from bson.objectid import ObjectId
from pymongo import ReturnDocument
from Exceptions.pymongo import DatabaseWriteException,DatabaseReadException,DatabaseUpdateException,DuplicateKeyException
from Exceptions.resource import ResourceNotFoundException
import logging
from pymongo.errors import DuplicateKeyError

async def insertLoanDetails(loanDetails :LoanSchema ) -> str:
    try:
        mongoDB = getMongoDBConnection()
        newLoanID = await mongoDB["Loans"].insert_one(loanDetails.model_dump())
        return str(newLoanID.inserted_id)

    except DuplicateKeyError:
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
        raise DatabaseReadException("Issue while finding loan Details")

async def getAllLoanDetails() -> list:
    try:
        mongoDB = getMongoDBConnection()
        loanDetailsList = await mongoDB["Loans"].find().to_list(length=None)

        if loanDetailsList is None:
            raise ResourceNotFoundException(message="No Loans were found.")

        return loanDetailsList
    except ResourceNotFoundException:
        logging.warning("No loans were found.")
        raise
    except Exception as e:
        logging.exception("Issue while finding loan Details")
        raise DatabaseReadException("Issue while finding loan Details")
