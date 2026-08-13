from Models.Audit import AuditFields
from Models.IncomeSource import IncomeSource

class IncomeSourceSchema(IncomeSource,AuditFields):
    pass
