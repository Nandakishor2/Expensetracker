from pydantic import BaseModel,Field
from enum import Enum

class RecurringPayments(BaseModel):
    name : str = Field(..., description="Name of recurring payments")
    amount : float = Field(..., description="Total amount")
    description : Optional[str] = Field(None, description="Additional explanation about this payment")
    day : int = Field(..., description="Date of the month of payment")
    activeStatus : bool = Field(..., description="Active status of recurring payment")
    messageTemplate : str = Field(..., description="whatsapp message template")


class PaymentStatus(Enum):
    PENDING = "PENDING"
    PAID = "PAID"
    OVERDUE = "OVERDUE"
    CANCELLED = "CANCELLED"

class RecurringPaymentsInstance(BaseModel):
    rcpaymentID : Optional[str] = Field(None, description="Unique Identifier for recurring Payments ")
    description : Optional[str] = Field(None, description="Additional explanation about this payment")
    dueDate : date = Field(..., description="Date of which the payment is due")
    month : int = Field(..., description="month of payment")
    year : int = Field(..., description="year of payment")
    amount : float = Field(..., description="actual amount to be paid/collected")
    paymentStatus : PaymentStatus = Field(..., description="Payment status")