from pydantic import BaseModel,Field
from typing import Optional

class BillBase(BaseModel):
    organization:str = Field(...,description="The Person generating the bill.")
    description:str = Field(...,description="The Description of the bill.")
    dueDate:str = Field(...,description="The Due Date of the bill.")

class Bill(BillBase):
    billID : str = Field(...,description="Billing Identifier")

class CreateBills(BillBase):
    pass

class UpdateBills(BillBase):
    organization:Optional[str] = Field(None,description="The Person generating the bill.")
    description:Optional[str] = Field(None,description="The Description of the bill.")
    dueDate:Optional[str] = Field(None,description="The Due Date of the bill.")
