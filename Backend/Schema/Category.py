from pydantic import BaseModel,Field
from Models.Audit import AuditFields
from Models.Category import Category

class CategorySchema(Category,AuditFields):
    pass