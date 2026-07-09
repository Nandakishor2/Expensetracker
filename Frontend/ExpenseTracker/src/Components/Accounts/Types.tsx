type AccountDetails = {
    accountID: string
    ifscCode: string
    accountType: "current" | "savings"
    bankName: string
    closingBalance: number
    createdDate: string
    updatedDate: string
}
type CreateAccount = {
    accountID: string
    ifscCode: string
    accountType: "current" | "savings"
    bankName: string
    closingBalance: number
}


export type { AccountDetails, CreateAccount }