from Database.Schedules import addNewSchedule, getSchedule, getScheduleList, updateSchedule, deleteSchedule
from Responses.Schedules import CreateScheduleResponse, GetScheduleResponse, UpdateScheduleResponse, DeleteScheduleResponse
from Models.Schedules import Schedule, CreateSchedule, UpdateSchedule
from Schema.Schedules import SchedulesSchema
from Utils.GenerateUUID import generateUUID


async def handleCreateSchedule(createSchedule : CreateSchedule) -> CreateScheduleResponse:
    scheduleSchema : SchedulesSchema = SchedulesSchema(**createSchedule.model_dump(),
        scheduleID= generateUUID()
    )
    result : str = await addNewSchedule(scheduleSchema)    
    return CreateScheduleResponse(
        scheduleID = result,
        statusCode = 200,
        message = "Schedule created successfully",
    )

async def handleGetSchedule(scheduleID : str) -> GetScheduleResponse:
    result : dict = await getSchedule(scheduleID)
    return GetScheduleResponse(
        statusCode = 200,
        message = "Schedule fetched successfully",
        schedule = Schedule(**result)
    )

async def handleGetScheduleList() -> GetScheduleResponse:
    result : list[dict] = await getScheduleList()
    return GetScheduleResponse(
        statusCode = 200,
        message = "Schedule list fetched successfully",
        scheduleList = [Schedule(**sched) for sched in result]
    )

async def handleUpdateSchedule(scheduleID : str, updateScheduleData : UpdateSchedule) -> UpdateScheduleResponse:
    result : dict = await updateSchedule(scheduleID, updateScheduleData)
    return UpdateScheduleResponse(
        statusCode = 200,
        message = "Schedule updated successfully",
        schedule = Schedule(**result)
    )

async def handleDeleteSchedule(scheduleID : str) -> DeleteScheduleResponse:
    await deleteSchedule(scheduleID)
    return DeleteScheduleResponse(
        statusCode = 200,
        message = "Schedule deleted successfully"
    )
