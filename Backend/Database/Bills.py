from Schema.Bills import BillSchema
from Exceptions.pymongo import DatabaseReadException, DatabaseWriteException, DatabaseDeleteException, DatabaseUpdateException
from Connections.MongoDB import getMongoDBConnection
import logging
from Models.Bills import UpdateBills
from pymongo import ReturnDocument


async def addNewBill(bill : BillSchema) -> str:
    try:
        mongoDB = getMongoDBConnection()
        result  = await mongoDB["Bills"].insert_one(bill.model_dump())
        if result.acknowledged:
            return bill.billID
        raise DatabaseWriteException("Failed to add new bill")
    except DatabaseWriteException:
        logging.exception("Failed to add new bill")
        raise
    except Exception as e:
        logging.exception("Failed to add new bill")
        raise DatabaseWriteException("Error in adding new bill")

async def getBill(billID : str) -> dict:
    try:
        mongoDB = getMongoDBConnection()
        result  = await mongoDB["Bills"].find_one({"billID" : billID})
        if result is not None:
            return result
        raise DatabaseReadException("Failed to get bill")
    except DatabaseReadException:
        logging.exception("Failed to get bill")
        raise
    except Exception as e:
        logging.exception("Failed to get bill")
        raise DatabaseReadException("Error in getting bill")

async def getBillList() -> list[dict]:
    try:
        mongoDB = getMongoDBConnection()
        result  = await mongoDB["Bills"].find().to_list(length=None)
        if result is not None:
            return result
        raise DatabaseReadException("Failed to get bill list")
    except DatabaseReadException:
        logging.exception("Failed to get bill list")
        raise
    except Exception as e:
        logging.exception("Failed to get bill list")
        raise DatabaseReadException("Error in getting bill list")

async def updateBill(billID : str, updateBillData : UpdateBills) -> dict:
    try:
        mongoDB = getMongoDBConnection()
        result = await mongoDB["Bills"].find_one_and_update(
            {"billID" : billID},
            {
                "$set" : updateBillData.model_dump(exclude_unset=True)
            },
            return_document=ReturnDocument.AFTER
        )
        if result is not None:
            return result
        raise DatabaseUpdateException("Failed to update bill")
    except DatabaseUpdateException:
        logging.exception("Failed to update bill")
        raise
    except Exception as e:
        logging.exception("Failed to update bill")
        raise DatabaseUpdateException("Error in updating bill")

async def deleteBill(billID : str) -> bool:
    try:
        mongoDB = getMongoDBConnection()
        result = await mongoDB["Bills"].find_one_and_delete(
            {"billID" : billID}
        )
        if result is not None:
            return True
        raise DatabaseDeleteException("Failed to delete bill")
    except DatabaseDeleteException:
        logging.exception("Failed to delete bill")
        raise
    except Exception as e:
        logging.exception("Failed to delete bill")
        raise DatabaseDeleteException("Error in deleting bill")
