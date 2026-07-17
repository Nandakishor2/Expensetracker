from Models.Audit import AuditFields
from Models.Loans import Loans

class LoanSchema(Loans,AuditFields):
    pass