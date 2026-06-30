
from pydantic import Field,BaseModel
from typing import Optional
from datetime import datetime

class IncomeSourceBase(BaseModel):
    sourceName : str = Field(..., description="Name for the source", index=True)

    
class IncomeSource(BaseModel):
    creditedDate : datetime = Field(..., description="The date when the money will be credited")
    amount : float = Field(..., description="Amount that will be credited")
    accountID : str = Field(..., description="Bank Account ID where the money be credited")
    incomeSourceStatus : bool = Field(..., description="Indicate weather the income is still valid")
    startDate : datetime = Field(..., description="Income source start date")
    endDate : Optional[datetime] = Field(None, description="Income source end date")
    incomeID : str = Field(..., description="Foreign key for Income source")
    

