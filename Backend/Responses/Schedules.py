from Responses.Base import BaseResponse
from Models.Schedules import Schedule
from pydantic import Field
from typing import Optional

class CreateScheduleResponse(BaseResponse):
    scheduleID : str = Field(..., description="New Schedule ID that was just created.")

class GetScheduleResponse(BaseResponse):
    scheduleList : Optional[list[Schedule]] = Field(None, description="List of all schedules")
    schedule : Optional[Schedule] = Field(None, description="Schedule details")

class UpdateScheduleResponse(BaseResponse):
    schedule : Optional[Schedule] = Field(None, description="Updated Schedule details")

class DeleteScheduleResponse(BaseResponse):
    pass

class LoadSchedulesResponse(BaseResponse):
    pass