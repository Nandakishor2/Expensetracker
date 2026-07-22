from Connections.MongoDB import getMongoDBConnection
from Schema.Accounts import AccountSchema
from bson.objectid import ObjectId
from pymongo import ReturnDocument
from Models.Accounts import UpdateAccount
from pymongo.errors import DuplicateKeyError
from Exceptions.pymongo import DatabaseWriteException,DuplicateKeyException,DatabaseReadException,DatabaseUpdateException
from Exceptions.resource import ResourceNotFoundException

async def inserAccountDetails(accountDetails :AccountSchema ) -> str:
    try:
        mongoDB = getMongoDBConnection()
        newAccountID = await mongoDB["Accounts"].insert_one(accountDetails.model_dump())
        return accountDetails.accountID

    except DuplicateKeyError as e:
        raise DuplicateKeyException("Account already exists.") from e
    except Exception as e:
        logging.exception(e)
        raise DatabaseWriteException("Issue while inserting data into database.") from e

async def findAccountDetails(accountID : str) -> dict:
    try:
        mongoDB = getMongoDBConnection()
        accountDetails : dict | None = await mongoDB["Accounts"].find_one(
            {"_id" : ObjectId(accountID)}
        )

        if accountDetails is None:
            raise ResourceNotFoundException("Could not find UserID for the Account. Please check your inputs.")

        return accountDetails

    except ResourceNotFoundException:
        raise
    except Exception as e:
        logging.exception(e)
        raise DatabaseReadException("Issue while fetching data from database.") from e

async def getAllAccountDetails() -> list:
    try:
        mongoDB = getMongoDBConnection()
        accountDetailsList : list | None = await mongoDB["Accounts"].find().to_list(length=None)

        if accountDetailsList is None:
            raise ValueError("Accounts Not Found")

        return accountDetailsList
    except Exception as e:
        logging.exception(e)
        raise DatabaseReadException("Issue while fetching data from database.") from e

async def updateAccountDetails(accountID : str, accountDetails : UpdateAccount) -> dict:
    try:
        mongoDB = getMongoDBConnection()
        updatedAccountDetails : dict = await mongoDB["Accounts"].find_one_and_update(
            {"accountID" : accountID},
            {"$set" : accountDetails.model_dump(
                exclude_unset=True,
                exclude_none=True,
                exclude_defaults=True,
            )},
            return_document=ReturnDocument.AFTER
        )

        if updatedAccountDetails is None:
            raise Exception("Could not find updated account details after account update. There is something wrong.")

        return updatedAccountDetails
    except Exception as e:
        print(e)

async def deleteAccountDetails(accountID : str) -> bool:
    try:
        mongoDB = getMongoDBConnection()
        deletedAccount : dict = await mongoDB["Accounts"].find_one_and_delete(
            {"accountID" : accountID}
        )

        if deletedAccount is None:
            raise Exception("Could not find deleted account details after account deletion. There is something wrong.")

        return True
    except Exception as e:
        print(e)
        
    