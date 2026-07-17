from pydantic import BaseModel,Field
from datetime import datetime

from Connections.MongoDB import mongoDB
from Schema.Loans import LoanSchema
from bson.objectid import ObjectId
from pymongo import ReturnDocument
from Exceptions.pymongo import DatabaseWriteException
import logging

def insertLoanDetails(loanDetails :LoanSchema ) -> str:
    try:
        newLoanID = mongoDB["Loans"].insert_one(loanDetails.model_dump())
        return str(newLoanID.inserted_id)
    except Exception as e:
        logging.exception(str(e))
        raise DatabaseWriteException(message=str(e))

def findLoanDetails(accountID : str) -> dict:
    try:
        accountDetails : dict | None = mongoDB["Accounts"].find_one(
            {"_id" : ObjectId(accountID)}
        )

        if accountDetails is None:
            raise ValueError("Loan Not Found")

        return loanDetails
    except Exception as e:
        print(e)

def getAllLoanDetails() -> list:
    try:
        loanDetailsList : list | None = mongoDB["Loans"].find()

        if loanDetailsList is None:
            raise ValueError("Loans Not Found")

        return loanDetailsList
    except Exception as e:
        print(e)
