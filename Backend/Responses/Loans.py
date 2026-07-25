from Responses.Base import BaseResponse
from Models.Loans import Loans
from pydantic import Field
from typing import Optional
class GetLoanDetailsResponse(BaseResponse):
    loanDetailsList : Optional[list[Loans]] = Field(default=None, description="List of loan details")
    loanDetails : Optional[Loans] = Field(default=None,description="Requested loan details.")

class CreateNewLoanResponse(BaseResponse):
    loanID : str = Field(..., description="Loan ID")

class UpdateLoanDetailsResponse(BaseResponse):
    loanDetails : Loans = Field(..., description="Updated Loan Details")

class DeleteLoanDetailsResponse(BaseResponse):
    loanDeleted : bool = Field(..., description="True if loan deleted successfully")