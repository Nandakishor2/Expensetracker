from pydantic import BaseModel,Field
from enum import Enum
from datetime import datetime
from Models.Audit import AuditFields
from Models.CreditHistory import CreditHistory


class CreditHistorySchema(CreditHistory,AuditFields):
    creditHistoryID : str = Field(...,description="Auto Generated Unique Identifier")
    pass



