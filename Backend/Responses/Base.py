from pydantic import BaseModel,Field
class BaseResponse(BaseModel):
    statusCode : int = Field(...,description="Status code for the response")
    message : str = Field(...,description="Response Message.")
    