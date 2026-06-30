from Models.Audit import AuditFields
from Models.Notifications import Notifications

class NotificationsSchema(Notifications,AuditFields):
    pass