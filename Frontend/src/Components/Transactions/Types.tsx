type TransactionDetails = {
    transactionID: string
    category: "food" | "bills" | "loans" | "transfer" | "other"
    description: string
    transactionDate: string | Date
    scheduleID?: string | null
    loanID?: string | null
    billID?: string | null
    incomeID?: string | null
    transactionType: "credit" | "debit"
    amount: number
}

type CreateTransaction = Omit<TransactionDetails, "transactionID">
type UpdateTransaction = Partial<CreateTransaction>

// Responses
type GetTransactionResponse = {
    statusCode: number
    message: string
    transactionList?: TransactionDetails[]
    transaction?: TransactionDetails
}

type CreateTransactionResponse = {
    statusCode: number
    message: string
    transactionID: string
}

type UpdateTransactionResponse = {
    statusCode: number
    message: string
    transaction: TransactionDetails
}

type DeleteTransactionResponse = {
    statusCode: number
    message: string
}

export type {
    TransactionDetails,
    CreateTransaction,
    UpdateTransaction,
    GetTransactionResponse,
    CreateTransactionResponse,
    UpdateTransactionResponse,
    DeleteTransactionResponse
}
