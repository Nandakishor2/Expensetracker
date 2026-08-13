from Models.Audit import AuditFields
from Models.Transactions import Transaction

class TransactionSchema(Transaction,AuditFields):
    pass