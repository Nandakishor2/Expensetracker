from pydantic import BaseModel
class BaseResponse(BaseModel):
    status_code = 200
    def __init__(self,message : str):
        self.message = message