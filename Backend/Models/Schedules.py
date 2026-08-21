from pydantic import BaseModel,Field
from enum import Enum
from typing import Optional

class StatusEnum(str,Enum):
    PENDING = "pending"
    COMPLETED = "completed"
    CANCELLED = "cancelled"
    
class TransactionTypeEnum(str,Enum):
    CREDIT = "credit"
    DEBIT = "debit"


class ScheduleBase(BaseModel):
    name:str = Field(default=None,description="Name of the schedule ")
    description:str = Field(default=None,description="Short explanation for the schedule")
    dueDate:str = Field(default=None,description="Duedate when the schedule is")
    loanID:str = Field(default=None,description="Loan For which emi must be paid")
    billID:str = Field(default=None,description="Bill which must be paid")
    incomeID:str = Field(default=None,description="Income that is about to come ")
    transactionType:TransactionTypeEnum = Field(default=TransactionTypeEnum.CREDIT,description="Credit / Debit")
    amount:float = Field(default=None,description="Amount that is to be transacted")
    sessionStatus:StatusEnum = Field(default=StatusEnum.PENDING,description="Status Enum ")

class Schedule(ScheduleBase):
    scheduleID:str = Field(default=None,description="Unique Identifier for the Schedules")

class CreateSchedule(ScheduleBase):
    pass

class UpdateSchedule(BaseModel):
    name:Optional[str] = Field(default=None,description="Name of the schedule ")
    description:Optional[str] = Field(default=None,description="Short explanation for the schedule")
    dueDate:Optional[str] = Field(default=None,description="Duedate when the schedule is")
    loanID:Optional[str] = Field(default=None,description="Loan For which emi must be paid")
    billID:Optional[str] = Field(default=None,description="Bill which must be paid")
    incomeID:Optional[str] = Field(default=None,description="Income that is about to come ")
    transactionType:Optional[TransactionTypeEnum] = Field(default=None,description="Credit / Debit")
    amount:Optional[float] = Field(default=None,description="Amount that is to be transacted")
    sessionStatus:Optional[StatusEnum] = Field(default=None,description="Status Enum ")

class ScheduleFilter(BaseModel):
    sessionStatus: Optional[StatusEnum] = None
    transactionType: Optional[TransactionTypeEnum] = None
    dueDateFrom: Optional[str] = None
    dueDateTo: Optional[str] = None
    loanID: Optional[str] = None
    billID: Optional[str] = None
    incomeID: Optional[str] = None
    minAmount: Optional[float] = None
    maxAmount: Optional[float] = None