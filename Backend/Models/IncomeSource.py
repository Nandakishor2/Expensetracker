
from pydantic import Field,BaseModel
from typing import Optional

class IncomeSourceBase(BaseModel):
    sourceName : str = Field(..., description="Name for the source", index=True)
    creditedDate : int = Field(..., description="The date when the money will be credited")
    amount : float = Field(..., description="Amount that will be credited")
    accountID : str = Field(..., description="Bank Account ID where the money be credited")
    incomeSourceStatus : bool = Field(..., description="Indicate weather the income is still valid")
    

class IncomeSource(IncomeSourceBase):
    incomeID : str = Field(..., description="Unique identifier for the income source")

class CreateIncomeSource(IncomeSourceBase):
    pass

class UpdateIncomeSource(BaseModel):
    sourceName : Optional[str] = Field(None, description="Name for the source")
    creditedDate : Optional[int] = Field(None, description="The date when the money will be credited")
    amount : Optional[float] = Field(None, description="Amount that will be credited")
    accountID : Optional[str] = Field(None, description="Bank Account ID where the money be credited")
    incomeSourceStatus : Optional[bool] = Field(None, description="Indicate weather the income is still valid")