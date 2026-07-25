from pydantic import BaseModel,Field
class BaseResponse(BaseModel):
    statusCode : int = Field(200,description="Status Code")
    message : str = Field(...,description="Response message.")