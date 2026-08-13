from Responses.Base import BaseResponse
from Models.Bills import Bill
from pydantic import Field
from typing import Optional

class CreateBillResponse(BaseResponse):
    billID : str = Field(..., description="New Bill ID that was just created.")

class GetBillResponse(BaseResponse):
    billList : Optional[list[Bill]] = Field(None, description="List of all bills")
    bill : Optional[Bill] = Field(None, description="Bill details")

class UpdateBillResponse(BaseResponse):
    bill : Optional[Bill] = Field(None, description="Updated Bill details")

class DeleteBillResponse(BaseResponse):
    pass
