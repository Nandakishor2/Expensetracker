from pydantic import BaseModel, Field

class Notifications(BaseModel):
    recieverMobileNumber : str = Field(..., description="Reciever mobile number")
    senderMobileNumber : str = Field(..., description="Sender mobile number")
    senderMessage : Optional[str] = Field(None, description="Sender's messgae")
    date : date = Field(..., description="Date of message sent")
    status : str = Field(..., description="Message Status")
    whatsappMessgaeID : str = Field(..., description="Message ID for tracking whatsapp business")