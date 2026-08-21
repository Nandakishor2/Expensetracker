from Schema.Schedules import SchedulesSchema
from Exceptions.pymongo import DatabaseReadException, DatabaseWriteException, DatabaseDeleteException, DatabaseUpdateException
from Connections.MongoDB import getMongoDBConnection
import logging
from Models.Schedules import UpdateSchedule, ScheduleFilter
from pymongo import ReturnDocument
from typing import Optional


async def addNewSchedule(schedule : SchedulesSchema) -> str:
    try:
        mongoDB = getMongoDBConnection()
        result  = await mongoDB["Schedules"].insert_one(schedule.model_dump())
        if result.acknowledged:
            return schedule.scheduleID
        raise DatabaseWriteException("Failed to add new schedule")
    except DatabaseWriteException:
        logging.exception("Failed to add new schedule")
        raise
    except Exception as e:
        logging.exception("Failed to add new schedule")
        raise DatabaseWriteException("Error in adding new schedule")

async def getSchedule(scheduleID : str) -> dict:
    try:
        mongoDB = getMongoDBConnection()
        result  = await mongoDB["Schedules"].find_one({"scheduleID" : scheduleID})
        if result is not None:
            return result
        raise DatabaseReadException("Failed to get schedule")
    except DatabaseReadException:
        logging.exception("Failed to get schedule")
        raise
    except Exception as e:
        logging.exception("Failed to get schedule")
        raise DatabaseReadException("Error in getting schedule")

async def getScheduleList(filters: Optional[ScheduleFilter] = None) -> list[dict]:
    try:
        mongoDB = getMongoDBConnection()
        query = {}
        if filters:
            if filters.sessionStatus:
                query["sessionStatus"] = filters.sessionStatus
            if filters.transactionType:
                query["transactionType"] = filters.transactionType
            if filters.dueDateFrom is not None or filters.dueDateTo is not None:
                query["dueDate"] = {}
                if filters.dueDateFrom is not None:
                    query["dueDate"]["$gte"] = filters.dueDateFrom
                if filters.dueDateTo is not None:
                    query["dueDate"]["$lte"] = filters.dueDateTo
            if filters.loanID:
                query["loanID"] = filters.loanID
            if filters.billID:
                query["billID"] = filters.billID
            if filters.incomeID:
                query["incomeID"] = filters.incomeID
            if filters.minAmount is not None or filters.maxAmount is not None:
                query["amount"] = {}
                if filters.minAmount is not None:
                    query["amount"]["$gte"] = filters.minAmount
                if filters.maxAmount is not None:
                    query["amount"]["$lte"] = filters.maxAmount

        result  = await mongoDB["Schedules"].find(query).to_list(length=None)
        if result is not None:
            return result
        raise DatabaseReadException("Failed to get schedule list")
    except DatabaseReadException:
        logging.exception("Failed to get schedule list")
        raise
    except Exception as e:
        logging.exception("Failed to get schedule list")
        raise DatabaseReadException("Error in getting schedule list")

async def updateSchedule(scheduleID : str, updateSchedule : UpdateSchedule) -> dict:
    try:
        mongoDB = getMongoDBConnection()
        result = await mongoDB["Schedules"].find_one_and_update(
            {"scheduleID" : scheduleID},
            {
                "$set" : updateSchedule.model_dump(exclude_unset=True)
            },
            return_document=ReturnDocument.AFTER
        )
        if result is not None:
            return result
        raise DatabaseUpdateException("Failed to update schedule")
    except DatabaseUpdateException:
        logging.exception("Failed to update schedule")
        raise
    except Exception as e:
        logging.exception("Failed to update schedule")
        raise DatabaseUpdateException("Error in updating schedule")

async def deleteSchedule(scheduleID : str) -> bool:
    try:
        mongoDB = getMongoDBConnection()
        result = await mongoDB["Schedules"].find_one_and_delete(
            {"scheduleID" : scheduleID}
        )
        if result is not None:
            return True
        raise DatabaseDeleteException("Failed to delete schedule")
    except DatabaseDeleteException:
        logging.exception("Failed to delete schedule")
        raise
    except Exception as e:
        logging.exception("Failed to delete schedule")
        raise DatabaseDeleteException("Error in deleting schedule")
