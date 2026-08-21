from Connections.MongoDB import getMongoDBConnection
from Models.CreditHistory import CreditHistory,UpdateCreditHistory, CreditHistoryFilter
from Schema.CreditHistory import CreditHistorySchema
from pymongo.errors import DuplicateKeyError
from Exceptions.pymongo import DuplicateKeyException,DatabaseWriteException,DatabaseReadException,DatabaseUpdateException,DatabaseDeleteException
import logging
from pymongo import ReturnDocument
from datetime import datetime,timezone
from typing import Optional
from Utils.DateTime import ensure_utc

async def insertCreditHistory(creditHistory : CreditHistorySchema) -> str:
    try:
        mongoDB = getMongoDBConnection()
        result = await mongoDB["CreditHistory"].insert_one(creditHistory.model_dump())

        if result.acknowledged:
            return creditHistory.creditHistoryID 
        else:
            raise DatabaseWriteException(message="Could not insert Credit History")

    except DatabaseWriteException:
        logging.exception("Could not insert Credit History")
        raise

    except DuplicateKeyError as e:
        logging.exception("Credit History already exists")
        raise DuplicateKeyException(message="Credit History already exists") from e
        
    except Exception as e:
        logging.exception("Could not insert Credit History")
        raise DatabaseWriteException(message="Could not insert Credit History") from e

async def getCreditHistory(filters: Optional[CreditHistoryFilter] = None) -> list[dict]:
    try:
        mongoDB = getMongoDBConnection()
        query = {}
        if filters:
            if filters.dueCleared is not None:
                query["dueCleared"] = filters.dueCleared
            if filters.peopleID:
                query["peopleID"] = filters.peopleID
            if filters.creditPaymentMode:
                query["creditPaymentMode"] = filters.creditPaymentMode
            if filters.repaymentMode:
                query["repaymentMode"] = filters.repaymentMode
            if filters.recievedDateFrom is not None or filters.recievedDateTo is not None:
                query["recievedDate"] = {}
                if filters.recievedDateFrom is not None:
                    query["recievedDate"]["$gte"] = ensure_utc(filters.recievedDateFrom)
                if filters.recievedDateTo is not None:
                    query["recievedDate"]["$lte"] = ensure_utc(filters.recievedDateTo)
            if filters.dueDateFrom is not None or filters.dueDateTo is not None:
                query["dueDate"] = {}
                if filters.dueDateFrom is not None:
                    query["dueDate"]["$gte"] = ensure_utc(filters.dueDateFrom)
                if filters.dueDateTo is not None:
                    query["dueDate"]["$lte"] = ensure_utc(filters.dueDateTo)
            if filters.dueClearedDateFrom is not None or filters.dueClearedDateTo is not None:
                query["dueClearedDate"] = {}
                if filters.dueClearedDateFrom is not None:
                    query["dueClearedDate"]["$gte"] = ensure_utc(filters.dueClearedDateFrom)
                if filters.dueClearedDateTo is not None:
                    query["dueClearedDate"]["$lte"] = ensure_utc(filters.dueClearedDateTo)
            if filters.minAmount is not None or filters.maxAmount is not None:
                query["amount"] = {}
                if filters.minAmount is not None:
                    query["amount"]["$gte"] = filters.minAmount
                if filters.maxAmount is not None:
                    query["amount"]["$lte"] = filters.maxAmount

        result = await mongoDB["CreditHistory"].find(query).to_list(length=None)

        return result
    except Exception as e:
        logging.exception("Could not get Credit History")
        raise DatabaseReadException(message="Could not get Credit History") from e

async def findCreditHistory(creditHistoryID : str) -> dict:
    try:
        mongoDB = getMongoDBConnection()
        result = await mongoDB["CreditHistory"].find_one({"creditHistoryID" : creditHistoryID})

        if result is None:
            raise DatabaseReadException(message="Credit History not found")
        return result
    except DatabaseReadException:
        raise
    except Exception as e:
        logging.exception("Could not find Credit History")
        raise DatabaseReadException(message="Could not find Credit History") from e

async def updateCreditHistory(creditHistoryID : str,creditHistory : UpdateCreditHistory) -> dict:
    try:
        mongoDB = getMongoDBConnection()

        existingCreditHistory = creditHistory.model_dump(exclude_defaults=True,exclude_none=True)

        existingCreditHistory["updatedDate"] = datetime.now(timezone.utc)

        result = await mongoDB["CreditHistory"].find_one_and_update({"creditHistoryID" : creditHistoryID},
                                                    {"$set" : existingCreditHistory},
                                                    return_document= ReturnDocument.AFTER)

        if result is None:
            raise DatabaseUpdateException(message="Credit History not found")
        return result
    except DatabaseUpdateException:
        raise
    except Exception as e:
        logging.exception("Could not update Credit History")
        raise DatabaseUpdateException(message="Could not update Credit History") from e

async def deleteCreditHistory(creditHistoryID : str) -> bool:
    try:
        mongoDB = getMongoDBConnection()
        result = await mongoDB["CreditHistory"].find_one_and_delete({"creditHistoryID" : creditHistoryID})

        if result is None:
            raise DatabaseDeleteException(message="Credit History not found")
        return True
    except DatabaseDeleteException:
        raise
    except Exception as e:
        logging.exception("Could not delete Credit History")
        raise DatabaseDeleteException(message="Could not delete Credit History") from e