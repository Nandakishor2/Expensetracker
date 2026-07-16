from Models.Audit import AuditFields
from pydantic import BaseModel,Field,EmailStr
from typing import Optional

class PeopleBase(BaseModel):
    name : str = Field(...,description="Name of the person")
    contactNumber : str = Field(...,description="Contact information of the person")
    whatsappNumber : str = Field(...,description="Whatsapp Number.")
    email : Optional[EmailStr]

class People(PeopleBase):
    personID : str = Field(...,description="ID of the person")
    
class CreatePerson(PeopleBase):
    pass
class UpdatePeople(BaseModel) : 
    name : Optional[str] = Field(default=None,description="Name of the person")
    contactNumber : Optional[str] = Field(default=None,description="Contact information of the person")
    whatsappNumber : Optional[str] = Field(default=None,description="Whatsapp Number.")
    email : Optional[EmailStr] 