from Connections.MongoDB import mongoDB,getMongoDBConnection
from Schema.People import PeopleSchema
from Models.People import UpdatePeople
from datetime import datetime,timezone
from pymongo import ReturnDocument
from pymongo.errors import DuplicateKeyError
import logging
from Exceptions.pymongo import DatabaseReadException,DatabaseUpdateException,DatabaseWriteException,DatabaseDeleteException,DuplicateKeyException
async def getPeopleList(filterOptions : dict) -> list[dict]:
    try:
        mongoDB = getMongoDBConnection()
        result = await mongoDB["People"].find(filterOptions).to_list()
        return result
    except Exception as e:
        raise DatabaseReadException("Issue while getting data from database.") from e

async def insertPeople(personDetail : PeopleSchema) -> str | None:
    try:
        mongoDB = getMongoDBConnection()
        result = await mongoDB["People"].insert_one(personDetail.model_dump())
        return personDetail.personID if result.acknowledged else None
    except DuplicateKeyError as e:
        raise DuplicateKeyException("Person already exists.") from e
    except Exception as e:
        logging.exception(e)
        raise DatabaseWriteException("Issue while inserting data into database.") from e

async def updatePeopleDetails(personID : str, updateDetails : UpdatePeople) -> dict :
    try:
        mongoDB = getMongoDBConnection()
        data = updateDetails.model_dump(exclude_defaults=True,exclude_none=True,exclude_unset=True)
        data["updatedDate"] = datetime.now(timezone.utc)
        
        result = await mongoDB["People"].find_one_and_update({"personID" : personID} , {"$set" : data},return_document = ReturnDocument.AFTER)
        return result
    except DuplicateKeyError as e:
        raise DuplicateKeyException("Person already exists.") from e
    except Exception as e:
        logging.exception(e)
        raise DatabaseUpdateException("Issue while updating data into database.") from e

async def deletePersonDetails(personID : str):
    try:
        mongoDB = getMongoDBConnection()
        result = await mongoDB["People"].find_one_and_delete({"personID" : personID})

        if result is None:
            raise DatabaseDeleteException("Issue while deleting data from database.") from e  
        return result is not None

    except DatabaseDeleteException:
        raise
    except Exception as e:
        raise DatabaseDeleteException("Issue while deleting data from database.") from e    