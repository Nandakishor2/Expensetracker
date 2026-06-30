from pydantic import BaseModel,Field
from datetime import datetime

class Transactions(BaseModel):
    accountNumber : str = Field(..., description="Account from where the money is being transacted")
    incomeID : Optional[str] = Field(None, description="Income form where spending is done")
    loanID : Optional[str] = Field(None, description="Loan amount from where the spending is done")
    amount : float = Field(..., description="transaction amount")
    purpose : str = Field(..., description="purpose of  transaction")
    categoryID : str = Field(..., description="Category of spend")
    transactionType : str = Field(..., description="to specify the transaction (Expense,transfer etc)")
    timestamp : datetime = Field(..., description="transaction timestamp")
    