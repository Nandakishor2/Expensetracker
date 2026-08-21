from pydantic import BaseModel,Field,field_validator
from datetime import datetime
from typing import Optional
from Utils.DateTime import ensure_utc

class Loans(BaseModel):
    loanID : str = Field(..., description="Unique ID for loan")
    accountID : str = Field(...,description="Amount Credited and EMI Deduction bank Account ")
    companyName : str = Field(..., description="Name of the company who issued the loan")
    purpose : str = Field(..., description="Purpose of the loan")
    loanAmount : float = Field(..., description="Amount sanctioned by the company")
    startDate : datetime = Field(..., description="Loan-Start date")
    endDate : Optional[datetime] = Field(None, description="Loan-End Date")
    emiDate : int = Field(..., description="EMI Due Date")
    rateOfIntrest : float = Field(..., description="Rate of Intrest offered by the loan")
    emiAmount : float = Field(..., description="EMI Amount payable")
    activeStatus : bool = Field(..., description="Loan Status")

    @field_validator("startDate", "endDate", mode="after", check_fields=False)
    @classmethod
    def normalize_datetimes(cls, value: Optional[datetime]) -> Optional[datetime]:
        return ensure_utc(value)

class UpdateLoan(BaseModel):
    accountID : Optional[str] = Field(None,description="Amount Credited and EMI Deduction bank Account ")
    companyName : Optional[str] = Field(None, description="Name of the company who issued the loan")
    purpose : Optional[str] = Field(None, description="Purpose of the loan")
    loanAmount : Optional[float] = Field(None, description="Amount sanctioned by the company")
    startDate : Optional[datetime] = Field(None, description="Loan-Start date")
    emiDate : Optional[int] = Field(None, description="EMI Due Date")
    rateOfIntrest : Optional[float] = Field(None, description="Rate of Intrest offered by the loan")
    emiAmount : Optional[float] = Field(None, description="EMI Amount payable")

    @field_validator("startDate", mode="after", check_fields=False)
    @classmethod
    def normalize_datetimes(cls, value: Optional[datetime]) -> Optional[datetime]:
        return ensure_utc(value)

class LoanFilter(BaseModel):
    activeStatus: Optional[bool] = None
    accountID: Optional[str] = None
    companyName: Optional[str] = None
    startDateFrom: Optional[datetime] = None
    startDateTo: Optional[datetime] = None
    endDateFrom: Optional[datetime] = None
    endDateTo: Optional[datetime] = None
    minLoanAmount: Optional[float] = None
    maxLoanAmount: Optional[float] = None