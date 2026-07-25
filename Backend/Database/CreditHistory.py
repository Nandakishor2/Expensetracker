from Connections.MongoDB import getMongoDBConnection
from Models.CreditHistory import CreditHistory,UpdateCreditHistory
from Schema.CreditHistory import CreditHistorySchema
from pymongo.errors import DuplicateKeyError
from Exceptions.pymongo import DuplicateKeyException,DatabaseWriteException,DatabaseReadException,DatabaseUpdateException,DatabaseDeleteException
import logging
from pymongo import ReturnDocument
from datetime import datetime,timezone

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

async def getCreditHistory() -> list[dict]:
    try:
        mongoDB = getMongoDBConnection()
        result = await mongoDB["CreditHistory"].find().to_list(length=None)

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