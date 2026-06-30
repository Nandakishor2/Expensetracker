from Models.Audit import AuditFields
from Models.Loans import Loans

class LoansSchema(Loans,AuditFields):
    pass