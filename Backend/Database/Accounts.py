from Connections.MongoDB import mongoDB
from Schema.Accounts import AccountSchema
from bson.objectid import ObjectId
from pymongo.return_document import ReturnDocument

def inserAccountDetails(accountDetails :AccountSchema ) -> str:
    try:
        newAccountID = mongoDB["Accounts"].insert_one(accountDetails.model_dump())
        return newAccountID.inserted_id
    except Exception as e:
        print(e)

def getAccountDetails(accountID : str) -> dict:
    try:
        accountDetails : dict | None = mongoDB["Accounts"].find_one(
            {"_id" : ObjectId(accountID)}
        )

        if accountDetails is None:
            raise ValueError("Account Not Found")

        return accountDetails
    except Exception as e:
        print(e)

def updateAccountDetails(accountID : str, accountDetails : AccountSchema) -> dict:
    try:
        updatedAccountDetails : dict | None = mongoDB["Accounts"].find_one_and_update(
            {"_id" : ObjectId(accountID)},
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

def deleteAccountDetails(accountID : str) -> bool:
    try:
        deletedAccount : dict | None = mongoDB["Accounts"].find_one_and_delete(
            {"_id" : ObjectId(accountID)}
        )

        if deletedAccount is None:
            raise Exception("Could not find deleted account details after account deletion. There is something wrong.")

        return True
    except Exception as e:
        print(e)
        
    