type CreditHistoryDetails = {
    creditHistoryID: string
    peopleID: string
    purpose: string
    amount: number
    creditPaymentMode: string
    recievedDate: string | Date
    dueDate: string | Date
    dueClearedDate?: string | Date | null
    repaymentMode?: string | null
    dueCleared: boolean
}

type CreateCreditHistory = Omit<CreditHistoryDetails, "creditHistoryID">
type UpdateCreditHistory = Partial<CreateCreditHistory>

// Responses
type GetCreditHistoryResponse = {
    statusCode: number
    message: string
    creditHistoryList?: CreditHistoryDetails[]
    creditHistoryDetails?: CreditHistoryDetails
}

type CreateCreditHistoryResponse = {
    statusCode: number
    message: string
    creditHistoryID: string
}

type UpdateCreditHistoryResponse = {
    statusCode: number
    message: string
    creditHistoryDetails: CreditHistoryDetails
}

type DeleteCreditHistoryResponse = {
    statusCode: number
    message: string
}

export type {
    CreditHistoryDetails,
    CreateCreditHistory,
    UpdateCreditHistory,
    GetCreditHistoryResponse,
    CreateCreditHistoryResponse,
    UpdateCreditHistoryResponse,
    DeleteCreditHistoryResponse
}
