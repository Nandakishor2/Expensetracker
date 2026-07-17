from pydantic import BaseModel,Field
class BaseResponse(BaseModel):
    status_code : int = Field(200,description="Status Code")
    message : str = Field(...,description="Response message.")