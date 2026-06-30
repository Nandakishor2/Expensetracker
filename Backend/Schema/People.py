from Models.Audit import AuditFields
from Models.People import People

class PeopleSchema(People,AuditFields):
    pass