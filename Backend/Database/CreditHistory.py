from pydantic import BaseModel,Field
from enum import Enum
from datetime import datetime

class CreditHistory(BaseModel):
    peopleID : str = Field(..., description="Lender/User that has given me the money")
    purpose : str = Field(...,description="Reason for taking money")
    creditPaymentMode : str = Field(...,description="Payment Mode Used by User for making payment")
    recievedDate : date = Field(...,description="Date the amount was credited in my account/Given by cash")
    dueDate : date = Field(...,description="The commited date of repayment")
    dueClearedDate : date = Field(...,description="due cleared date")
    repaymentMode : str = Field(...,description="Payment Mode Used by User for making payment")
    dueCleared : bool = Field(...,description="The repayment status")

