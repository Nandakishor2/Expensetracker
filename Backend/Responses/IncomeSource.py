from Responses.Base import BaseResponse
from Models.IncomeSource import IncomeSource
from pydantic import Field
from typing  import Optional
class CreateIncomeSourceResponse(BaseResponse):
    incomeID : str = Field(..., description="New Income ID that was just created .")

class GetIncomeSourceResponse(BaseResponse):
    incomeSourceList :Optional[list[IncomeSource]] = Field(None,description="List of all income sources")
    incomeSource : Optional[IncomeSource] = Field(None,description="Income source")

class UpdateIncomeSourceResponse(BaseResponse):
    incomeSource : Optional[IncomeSource] = Field(None,description="Updated Income source")

class DeleteIncomeSourceResponse(BaseResponse):
    pass