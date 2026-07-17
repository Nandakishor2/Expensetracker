from Models.Audit import AuditFields
from Models.People import People
from pydantic import Field
class PeopleSchema(People,AuditFields):
    personID : str = Field(...,description="Unique identifier for a person.")