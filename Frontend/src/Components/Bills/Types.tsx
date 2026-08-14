type BillDetails = {
    billID: string
    organization: string
    description: string
    dueDate: string | Date
}

type CreateBills = Omit<BillDetails, "billID">
type UpdateBills = Partial<CreateBills>

// Responses
type GetBillResponse = {
    statusCode: number
    message: string
    billList?: BillDetails[]
    bill?: BillDetails
}

type CreateBillResponse = {
    statusCode: number
    message: string
    billID: string
}

type UpdateBillResponse = {
    statusCode: number
    message: string
    bill: BillDetails
}

type DeleteBillResponse = {
    statusCode: number
    message: string
}

export type {
    BillDetails,
    CreateBills,
    UpdateBills,
    GetBillResponse,
    CreateBillResponse,
    UpdateBillResponse,
    DeleteBillResponse
}
