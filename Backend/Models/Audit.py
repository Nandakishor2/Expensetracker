from pydantic import BaseModel,Field,field_validator
from datetime import datetime,timezone
from typing import Optional
from Utils.DateTime import ensure_utc

class AuditFields(BaseModel):
    createdDate : datetime = Field(
        default_factory= lambda :  datetime.now(timezone.utc),
        description="Record Created Date"
    )
    updatedDate : Optional[datetime] = Field(
        default=None,
        description="Record Last Modified Date"
    )

    @field_validator("createdDate", "updatedDate", mode="after", check_fields=False)
    @classmethod
    def normalize_datetimes(cls, value: Optional[datetime]) -> Optional[datetime]:
        return ensure_utc(value)