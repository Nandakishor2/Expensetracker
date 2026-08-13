from pydantic import BaseModel,Field
from datetime import datetime,timezone
from typing import Optional
from enum import Enum
class TransactionType(str, Enum):
    CREDIT = "credit"
    DEBIT = "debit"


class Category(str,Enum):
    FOOD = "food"
    BILLS = "bills"
    LOANS = "loans"
    TRANSFER = "transfer"
    OTHER = "other"

class TransactionBase(BaseModel):   
    category : Category = Field(..., description="Name of the category")
    description : str = Field(..., description="Short explanation for the transaction")
    transactionDate : datetime = Field(default_factory= lambda : datetime.now(timezone.utc), description="Date when transaction were carried out")
    scheduleID : Optional[str] = Field(None, description="Duedate when the schedule is")
    loanID : Optional[str] = Field(None, description="Loan For which emi must be paid")
    billID : Optional[str] = Field(None, description="Bill which must be paid")
    incomeID : Optional[str] = Field(None, description="Income that is about to come")
    transactionType : TransactionType = Field(..., description="Credit / Debit")
    amount : float = Field(..., description="Amount that is to be transacted")

class Transaction(TransactionBase):
    transactionID : str = Field(..., description="Unique Identifier for the transaction")

class UpdateTransaction(BaseModel):
    category : Optional[Category] = Field(None, description="Name of the category")
    description : Optional[str] = Field(None, description="Short explanation for the transaction")
    transactionDate : Optional[datetime] = Field(None, description="Date when transaction were carried out")
    scheduleID : Optional[str] = Field(None, description="Duedate when the schedule is")
    loanID : Optional[str] = Field(None, description="Loan For which emi must be paid")
    billID : Optional[str] = Field(None, description="Bill which must be paid")
    incomeID : Optional[str] = Field(None, description="Income that is about to come")
    transactionType : Optional[TransactionType] = Field(None, description="Credit / Debit")
    amount : Optional[float] = Field(None, description="Amount that is to be transacted")