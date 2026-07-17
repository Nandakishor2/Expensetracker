from Responses.Base import BaseResponse
from Models.Loans import Loans
from pydantic import Field

class GetLoanDetailsResponse(BaseResponse):
    loanDetailsList : list[Loans] = Field(default_factory=list, description="List of loan details")

class CreateNewLoanResponse(BaseResponse):
    loanID : str = Field(..., description="Loan ID")