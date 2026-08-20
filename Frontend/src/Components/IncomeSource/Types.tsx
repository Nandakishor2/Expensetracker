type IncomeSourceDetails = {
    incomeID: string
    sourceName: string
    creditedDate: number
    amount: number
    accountID: string
    incomeSourceStatus: boolean
}

type CreateIncomeSource = Omit<IncomeSourceDetails, "incomeID">
type UpdateIncomeSource = Partial<CreateIncomeSource>

// Responses
type GetIncomeSourceResponse = {
    statusCode: number
    message: string
    incomeSourceList?: IncomeSourceDetails[]
    incomeSource?: IncomeSourceDetails
}

type CreateIncomeSourceResponse = {
    statusCode: number
    message: string
    incomeID: string
}

type UpdateIncomeSourceResponse = {
    statusCode: number
    message: string
    incomeSource: IncomeSourceDetails
}

type DeleteIncomeSourceResponse = {
    statusCode: number
    message: string
}

export type {
    IncomeSourceDetails,
    CreateIncomeSource,
    UpdateIncomeSource,
    GetIncomeSourceResponse,
    CreateIncomeSourceResponse,
    UpdateIncomeSourceResponse,
    DeleteIncomeSourceResponse
}
