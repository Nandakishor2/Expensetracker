from Models.Audit import AuditFields
from Models.Transactions import Transactions


class TransactionsSchema(Transactions,AuditFields):
    pass