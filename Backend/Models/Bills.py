from pydantic import BaseModel,Field
from typing import Optional

class BillBase(BaseModel):
    organization:str = Field(...,description="The Person generating the bill.")
    description:str = Field(...,description="The Description of the bill.")
    dueDate:int = Field(...,description="The Due Date of the bill.")
    isActive:bool = Field(True,description="Whether the bill is currently active")

class Bill(BillBase):
    billID : str = Field(...,description="Billing Identifier")

class CreateBills(BillBase):
    pass

class UpdateBills(BillBase):
    organization:Optional[str] = Field(None,description="The Person generating the bill.")
    description:Optional[str] = Field(None,description="The Description of the bill.")
    dueDate:Optional[int] = Field(None,description="The Due Date of the bill.")
    isActive:Optional[bool] = Field(None,description="Whether the bill is currently active")

class BillFilter(BaseModel):
    isActive: Optional[bool] = None
    dueDateFrom: Optional[int] = None
    dueDateTo: Optional[int] = None
    organization: Optional[str] = None
