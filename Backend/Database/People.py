from Models.Audit import AuditFields
from pydantic import BaseModel,Field

class People(AuditFields):
    name : str = Field(...,description="Name of the person")
    contactNumber : str = Field(...,description="Contact information of the person")
    email : str = Field(...,description="Email of the person")  