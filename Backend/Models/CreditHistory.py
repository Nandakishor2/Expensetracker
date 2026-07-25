from pydantic import BaseModel,Field,model_validator
from enum import Enum
from datetime import datetime
from typing import Optional

class CreditHistoryBase(BaseModel):
    peopleID : str = Field(..., description="Lender/User that has given me the money")
    purpose : str = Field(...,description="Reason for taking money")
    creditPaymentMode : str = Field(...,description="Payment Mode Used by User for making payment")
    recievedDate : datetime = Field(...,description="Date the amount was credited in my account/Given by cash")
    dueDate : datetime = Field(...,description="The commited date of repayment")
    dueClearedDate : Optional[datetime] = Field(None,description="due cleared date")
    repaymentMode : Optional[str] = Field(None,description="Payment Mode Used by User for making payment")
    dueCleared : bool = Field(...,description="The repayment status")

class CreditHistory(CreditHistoryBase):
    creditHistoryID : str = Field(...,description="Unique identifier for the credit history")

class CreateCreditHistory(CreditHistoryBase):
    @model_validator(mode="after")
    def validateCreditHistoryDetails(self):
        if self.dueCleared is True and (self.dueClearedDate is None or self.repaymentMode is None):
            raise ValueError("dueClearedDate and repaymentMode are required when dueCleared is True")
        return self

class UpdateCreditHistory(BaseModel):
    peopleID : Optional[str] = Field(None, description="Lender/User that has given me the money")
    purpose : Optional[str] = Field(None,description="Reason for taking money")
    creditPaymentMode : Optional[str] = Field(None,description="Payment Mode Used by User for making payment")
    recievedDate : Optional[datetime] = Field(None,description="Date the amount was credited in my account/Given by cash")
    dueDate : Optional[datetime] = Field(None,description="The commited date of repayment")
    dueClearedDate : Optional[datetime] = Field(None,description="due cleared date")
    repaymentMode : Optional[str] = Field(None,description="Payment Mode Used by User for making payment")
    dueCleared : Optional[bool] = Field(None,description="The repayment status")
    