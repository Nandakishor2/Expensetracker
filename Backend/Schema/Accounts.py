from pydantic import BaseModel,Field
from Models.Accounts import Account
from Models.Audit import AuditFields


class AccountSchema(Account,AuditFields):
    pass
   
