from Models.Audit import AuditFields
from Models.IncomeSource import IncomeSourceBase,IncomeSource

class IncomeSourceBaseSchema(IncomeSourceBase,AuditFields):
    pass


class IncomeSourceSchema(IncomeSource,AuditFields):
    pass
    

