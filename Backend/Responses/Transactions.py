from Responses.Base import BaseResponse
from Models.Transactions import Transaction
from pydantic import Field
from typing import Optional

class CreateTransactionResponse(BaseResponse):
    transactionID : str = Field(..., description="New Transaction ID that was just created.")

class GetTransactionResponse(BaseResponse):
    transactionList : Optional[list[Transaction]] = Field(None, description="List of all transactions")
    transaction : Optional[Transaction] = Field(None, description="Transaction details")

class UpdateTransactionResponse(BaseResponse):
    transaction : Optional[Transaction] = Field(None, description="Updated Transaction details")

class DeleteTransactionResponse(BaseResponse):
    pass
