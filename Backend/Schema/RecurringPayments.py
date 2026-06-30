from Models.Audit import AuditFields
from Models.RecurringPayments import RecurringPayments,RecurringPaymentsInstance


class RecurringPaymentsSchema(RecurringPayments,AuditFields):
    pass

class RecurringPaymentsInstanceSchema(RecurringPaymentsInstance,AuditFields):
    pass