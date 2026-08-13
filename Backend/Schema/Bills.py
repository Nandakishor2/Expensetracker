from Models.Audit import AuditFields
from Models.Bills import Bill

class BillSchema(Bill,AuditFields):
    pass
