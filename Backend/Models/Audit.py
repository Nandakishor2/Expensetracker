from pydantic import BaseModel,Field
from datetime import datetime,timezone
from typing import Optional

class AuditFields(BaseModel):
    createdDate : datetime = Field(
        default_factory= datetime.now(timezone.utc),
        description="Record Created Date"
    )
    updatedDate : Optional[datetime] = Field(
        default=None,
        description="Record Last Modified Date"
    )