from Schema.IncomeSource import IncomeSourceSchema
from Exceptions.pymongo import DatabaseReadException,DatabaseWriteException,DatabaseDeleteException,DatabaseUpdateException
from Connections.MongoDB import getMongoDBConnection
import logging
from Models.IncomeSource import UpdateIncomeSource, IncomeSourceFilter
from pymongo import ReturnDocument
from typing import Optional


async def addNewIncomeSource(incomesource : IncomeSourceSchema) -> str:
    try:
        mongoDB = getMongoDBConnection()
        result  = await mongoDB["IncomeSource"].insert_one(incomesource.model_dump())
        if result.acknowledged:
            return incomesource.incomeID
        raise DatabaseWriteException("Failed to add new income source")
    except DatabaseWriteException:
        logging.exception("Failed to add new income source")
        raise
    except Exception as e:
        logging.exception("Failed to add new income source")
        raise DatabaseWriteException("Error in adding new income source")

async def getIncomeSource(incomeSourceID : str) -> dict:
    try:
        mongoDB = getMongoDBConnection()
        result  = await mongoDB["IncomeSource"].find_one({"incomeID" : incomeSourceID})
        if result is not None:
            return result
        raise DatabaseReadException("Failed to get income source")
    except DatabaseReadException:
        logging.exception("Failed to get income source")
        raise
    except Exception as e:
        logging.exception("Failed to get income source")
        raise DatabaseReadException("Error in getting income source")

async def getIncomeSourceList(filters: Optional[IncomeSourceFilter] = None) -> list[dict]:
    try:
        mongoDB = getMongoDBConnection()
        query = {}
        if filters:
            if filters.incomeSourceStatus is not None:
                query["incomeSourceStatus"] = filters.incomeSourceStatus
            if filters.accountID:
                query["accountID"] = filters.accountID
            if filters.sourceName:
                query["sourceName"] = {"$regex": filters.sourceName, "$options": "i"}
            if filters.creditedDateFrom is not None or filters.creditedDateTo is not None:
                query["creditedDate"] = {}
                if filters.creditedDateFrom is not None:
                    query["creditedDate"]["$gte"] = filters.creditedDateFrom
                if filters.creditedDateTo is not None:
                    query["creditedDate"]["$lte"] = filters.creditedDateTo
            if filters.minAmount is not None or filters.maxAmount is not None:
                query["amount"] = {}
                if filters.minAmount is not None:
                    query["amount"]["$gte"] = filters.minAmount
                if filters.maxAmount is not None:
                    query["amount"]["$lte"] = filters.maxAmount

        result  = await mongoDB["IncomeSource"].find(query).to_list(length=None)
        if result is not None:
            return result
        raise DatabaseReadException("Failed to get income source list")
    except DatabaseReadException:
        logging.exception("Failed to get income source list")
        raise
    except Exception as e:
        logging.exception("Failed to get income source list")
        raise DatabaseReadException("Error in getting income source list")

async def updateIncomeSource(incomeSourceID : str,updateIncomeSource : UpdateIncomeSource) -> str:
    try:
        mongoDB = getMongoDBConnection()
        result = await mongoDB["IncomeSource"].find_one_and_update(
            {"incomeID" : incomeSourceID},
            {
                "$set" : updateIncomeSource.model_dump(exclude_unset=True)
            },
            return_document=ReturnDocument.AFTER
        )
        if result is not None:
            return result
        raise DatabaseUpdateException("Failed to update income source")
    except DatabaseUpdateException:
        logging.exception("Failed to update income source")
        raise
    except Exception as e:
        logging.exception("Failed to update income source")
        raise DatabaseUpdateException("Error in updating income source")

async def deleteIncomeSource(incomeSourceID : str) -> bool:
    try:
        mongoDB = getMongoDBConnection()
        result = await mongoDB["IncomeSource"].find_one_and_delete(
            {"incomeID" : incomeSourceID}
        )
        if result is not None:
            return True
        raise DatabaseDeleteException("Failed to delete income source")
    except DatabaseDeleteException:
        logging.exception("Failed to delete income source")
        raise
    except Exception as e:
        logging.exception("Failed to delete income source")
        raise DatabaseDeleteException("Error in deleting income source")