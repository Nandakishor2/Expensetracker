from Responses.Base import BaseResponse
from Models.Accounts import Account
from pydantic import Field
from typing import Optional

class CreateAccountResponse(BaseResponse):
    accountID : str = Field(...,description="New Account identifier returned by mongoDB")

class UpdateAccountResponse(BaseResponse):
    updatedAccountDetails : Account = Field(...,description="Updated Account details.")

class DeleteAccountResponse(BaseResponse):
    pass

class GetAccountDetailsResponse(BaseResponse):
    accountDetails : Optional[list[Account]] = Field(None,description="List of Account details retrieved from DB")
    accountDetail : Optional[Account] = Field(None,description="Account details retrieved from DB")