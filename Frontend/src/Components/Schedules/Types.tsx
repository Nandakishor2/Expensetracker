type ScheduleDetails = {
    scheduleID: string
    name: string
    description: string
    dueDate: string | Date
    loanID?: string | null
    billID?: string | null
    incomeID?: string | null
    transactionType: "credit" | "debit"
    amount: number
    sessionStatus: "pending" | "completed" | "cancelled"
}

type CreateSchedule = Omit<ScheduleDetails, "scheduleID">
type UpdateSchedule = Partial<CreateSchedule>

// Responses
type GetScheduleResponse = {
    statusCode: number
    message: string
    scheduleList?: ScheduleDetails[]
    schedule?: ScheduleDetails
}

type CreateScheduleResponse = {
    statusCode: number
    message: string
    scheduleID: string
}

type UpdateScheduleResponse = {
    statusCode: number
    message: string
    schedule: ScheduleDetails
}

type DeleteScheduleResponse = {
    statusCode: number
    message: string
}

export type {
    ScheduleDetails,
    CreateSchedule,
    UpdateSchedule,
    GetScheduleResponse,
    CreateScheduleResponse,
    UpdateScheduleResponse,
    DeleteScheduleResponse
}
