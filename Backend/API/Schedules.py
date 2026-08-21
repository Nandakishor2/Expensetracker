from Responses.Schedules import CreateScheduleResponse, GetScheduleResponse, UpdateScheduleResponse, DeleteScheduleResponse
from Services.Schedules import handleCreateSchedule, handleDeleteSchedule, handleGetSchedule, handleGetScheduleList, handleUpdateSchedule
from Models.Schedules import CreateSchedule, UpdateSchedule, ScheduleFilter
from fastapi.responses import JSONResponse
from fastapi.routing import APIRouter
from fastapi import Depends

scheduleRouter = APIRouter(prefix="/Schedules", tags=["Schedules"])

@scheduleRouter.get("/")
async def getScheduleList(filters: ScheduleFilter = Depends()):
    response : GetScheduleResponse = await handleGetScheduleList(filters)
    return JSONResponse(
        status_code=response.statusCode,
        content=response.model_dump(exclude_none=True,exclude_unset=True,mode="json")
    )

@scheduleRouter.get("/{scheduleID}")
async def getScheduleDetails(scheduleID:str):
    response : GetScheduleResponse = await handleGetSchedule(scheduleID)
    return JSONResponse(
        status_code=response.statusCode,
        content=response.model_dump(exclude_none=True,exclude_unset=True,mode="json")
    )

@scheduleRouter.post("/")
async def createSchedule(schedule:CreateSchedule):
    response : CreateScheduleResponse = await handleCreateSchedule(schedule)
    return JSONResponse(
        status_code=response.statusCode,
        content=response.model_dump(exclude_none=True,exclude_unset=True,mode="json")
    )

@scheduleRouter.put("/{scheduleID}")
async def updateSchedule(scheduleID:str,schedule:UpdateSchedule):
    response : UpdateScheduleResponse = await handleUpdateSchedule(scheduleID,schedule)
    return JSONResponse(
        status_code=response.statusCode,
        content=response.model_dump(exclude_none=True,exclude_unset=True,mode="json")
    )

@scheduleRouter.delete("/{scheduleID}")
async def deleteSchedule(scheduleID:str):
    response : DeleteScheduleResponse = await handleDeleteSchedule(scheduleID)
    return JSONResponse(
        status_code=response.statusCode,
        content=response.model_dump(exclude_none=True,exclude_unset=True,mode="json")
    )
