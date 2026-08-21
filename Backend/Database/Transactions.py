from Schema.Transaction import TransactionSchema
from Exceptions.pymongo import DatabaseReadException, DatabaseWriteException, DatabaseDeleteException, DatabaseUpdateException
from Connections.MongoDB import getMongoDBConnection
import logging
from Models.Transactions import UpdateTransaction, TransactionFilter
from pymongo import ReturnDocument
from typing import Optional
from Utils.DateTime import ensure_utc


async def addNewTransaction(transaction : TransactionSchema) -> str:
    try:
        mongoDB = getMongoDBConnection()
        result  = await mongoDB["Transactions"].insert_one(transaction.model_dump())
        if result.acknowledged:
            return transaction.transactionID
        raise DatabaseWriteException("Failed to add new transaction")
    except DatabaseWriteException:
        logging.exception("Failed to add new transaction")
        raise
    except Exception as e:
        logging.exception("Failed to add new transaction")
        raise DatabaseWriteException("Error in adding new transaction")

async def getTransaction(transactionID : str) -> dict:
    try:
        mongoDB = getMongoDBConnection()
        result  = await mongoDB["Transactions"].find_one({"transactionID" : transactionID})
        if result is not None:
            return result
        raise DatabaseReadException("Failed to get transaction")
    except DatabaseReadException:
        logging.exception("Failed to get transaction")
        raise
    except Exception as e:
        logging.exception("Failed to get transaction")
        raise DatabaseReadException("Error in getting transaction")

async def getTransactionList(filters: Optional[TransactionFilter] = None) -> list[dict]:
    try:
        mongoDB = getMongoDBConnection()
        query = {}
        if filters:
            if filters.category:
                query["category"] = filters.category
            if filters.transactionType:
                query["transactionType"] = filters.transactionType
            if filters.transactionDateFrom is not None or filters.transactionDateTo is not None:
                query["transactionDate"] = {}
                if filters.transactionDateFrom is not None:
                    query["transactionDate"]["$gte"] = ensure_utc(filters.transactionDateFrom)
                if filters.transactionDateTo is not None:
                    query["transactionDate"]["$lte"] = ensure_utc(filters.transactionDateTo)
            if filters.loanID:
                query["loanID"] = filters.loanID
            if filters.billID:
                query["billID"] = filters.billID
            if filters.incomeID:
                query["incomeID"] = filters.incomeID
            if filters.scheduleID:
                query["scheduleID"] = filters.scheduleID
            if filters.minAmount is not None or filters.maxAmount is not None:
                query["amount"] = {}
                if filters.minAmount is not None:
                    query["amount"]["$gte"] = filters.minAmount
                if filters.maxAmount is not None:
                    query["amount"]["$lte"] = filters.maxAmount

        result  = await mongoDB["Transactions"].find(query).to_list(length=None)
        if result is not None:
            return result
        raise DatabaseReadException("Failed to get transaction list")
    except DatabaseReadException:
        logging.exception("Failed to get transaction list")
        raise
    except Exception as e:
        logging.exception("Failed to get transaction list")
        raise DatabaseReadException("Error in getting transaction list")

async def updateTransaction(transactionID : str, updateTransaction : UpdateTransaction) -> dict:
    try:
        mongoDB = getMongoDBConnection()
        result = await mongoDB["Transactions"].find_one_and_update(
            {"transactionID" : transactionID},
            {
                "$set" : updateTransaction.model_dump(exclude_unset=True)
            },
            return_document=ReturnDocument.AFTER
        )
        if result is not None:
            return result
        raise DatabaseUpdateException("Failed to update transaction")
    except DatabaseUpdateException:
        logging.exception("Failed to update transaction")
        raise
    except Exception as e:
        logging.exception("Failed to update transaction")
        raise DatabaseUpdateException("Error in updating transaction")

async def deleteTransaction(transactionID : str) -> bool:
    try:
        mongoDB = getMongoDBConnection()
        result = await mongoDB["Transactions"].find_one_and_delete(
            {"transactionID" : transactionID}
        )
        if result is not None:
            return True
        raise DatabaseDeleteException("Failed to delete transaction")
    except DatabaseDeleteException:
        logging.exception("Failed to delete transaction")
        raise
    except Exception as e:
        logging.exception("Failed to delete transaction")
        raise DatabaseDeleteException("Error in deleting transaction")