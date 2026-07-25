from Responses.Base import BaseResponse
from typing import Optional,List
from Models.CreditHistory import CreditHistory
from pydantic import Field
class GetCreditHistoryResponse(BaseResponse):
    creditHistoryList : Optional[List[CreditHistory]] = Field(default=None,description="Credit history list.")
    creditHistoryDetails : Optional[CreditHistory] = Field(default=None,description="Credit history details.")

class CreateCreditHistoryResponse(BaseResponse):
    creditHistoryID : str = Field(...,description="New Credit history ID.")

class UpdateCreditHistoryResponse(BaseResponse):
    creditHistoryDetails : CreditHistory = Field(...,description="Updated Credit history details.")

class DeleteCreditHistoryResponse(BaseResponse):
    pass