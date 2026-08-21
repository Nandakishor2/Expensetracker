from pydantic import BaseModel,Field,field_validator,model_validator
from datetime import datetime,timezone
from typing import Optional
from enum import Enum
from Utils.DateTime import ensure_utc
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
    scheduleID : Optional[str] = Field(None, description="Duedate when the schedule is",min_length=1)
    loanID : Optional[str] = Field(None, description="Loan For which emi must be paid",min_length=1)
    billID : Optional[str] = Field(None, description="Bill which must be paid",min_length=1)
    incomeID : Optional[str] = Field(None, description="Income that is about to come",min_length=1)
    transactionType : TransactionType = Field(..., description="Credit / Debit")
    amount : float = Field(..., description="Amount that is to be transacted")

    @field_validator("transactionDate", mode="after", check_fields=False)
    @classmethod
    def normalize_datetimes(cls, value: Optional[datetime]) -> Optional[datetime]:
        return ensure_utc(value)

    @model_validator(mode="after")
    def validateSource(self):

        if self.scheduleID or self.loanID or self.billID or self.incomeID:
            pass
        else:
            raise ValueError("The transaction should be backed by atlest one of these , Loan , Bill , Income , Schedule")
        return self

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

    @field_validator("transactionDate", mode="after", check_fields=False)
    @classmethod
    def normalize_datetimes(cls, value: Optional[datetime]) -> Optional[datetime]:
        return ensure_utc(value)

class TransactionFilter(BaseModel):
    category: Optional[Category] = None
    transactionType: Optional[TransactionType] = None
    transactionDateFrom: Optional[datetime] = None
    transactionDateTo: Optional[datetime] = None
    loanID: Optional[str] = None
    billID: Optional[str] = None
    incomeID: Optional[str] = None
    scheduleID: Optional[str] = None
    minAmount: Optional[float] = None
    maxAmount: Optional[float] = None
