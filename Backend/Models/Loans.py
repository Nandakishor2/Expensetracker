from pydantic import BaseModel,Field
from datetime import datetime
from typing import Optional

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
    