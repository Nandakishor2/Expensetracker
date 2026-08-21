from Database.Schedules import addNewSchedule, getSchedule, getScheduleList, updateSchedule, deleteSchedule
from Responses.Schedules import CreateScheduleResponse, GetScheduleResponse, UpdateScheduleResponse, DeleteScheduleResponse , LoadSchedulesResponse

from Models.Schedules import Schedule, CreateSchedule, UpdateSchedule, ScheduleFilter
from Schema.Schedules import SchedulesSchema
from Utils.GenerateUUID import generateUUID
from typing import Optional


from Responses.Loans import GetLoanDetailsResponse
from Services.Loans import handleGetAllLoans
from Models.Loans import LoanFilter


from Responses.Bills import GetBillResponse
from Services.Bills import handleGetBillList
from Models.Bills import BillFilter

from Responses.IncomeSource import GetIncomeSourceResponse
from Services.IncomeSource import handleGetIncomeSourceList
from Models.IncomeSource import IncomeSourceFilter

import logging
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

async def handleGetScheduleList(filters: Optional[ScheduleFilter] = None) -> GetScheduleResponse:
    result : list[dict] = await getScheduleList(filters)
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


async def handleLoadSchedules() -> LoadSchedulesResponse:
    # Step 1 , Get all records from Loans 
    loanFilters : LoanFilter  = LoanFilter(
            activeStatus = True
        )
    loanDetailResponse : GetLoanDetailsResponse = handleGetAllLoans(loanFilters)
    if loanDetailResponse.loanDetailsList:
       pass
    else:
        logging.exception("Could not find loan details")

    # Step 2 , Get all records from Bills 
    billFilters : BillFilter  = BillFilter(
            isActive = True
    )
    billDetailsResponse : GetBillResponse = handleGetBillList(billFilters)
    if billDetailsResponse.billList:
       pass
    else:
        logging.exception("Could not find bill details")

    # Step 3 , Get all records from Bills 
    incomeSourceFilter : IncomeSourceFilter  = IncomeSourceFilter(
        incomeSourceStatus = True
    )
    incomeSourceDetailsResponse : GetIncomeSourceResponse = handleGetIncomeSourceList(incomeSourceFilter)
    if incomeSourceDetailsResponse.incomeSourceList:
       pass
    else:
        logging.exception("Could not find bill details")