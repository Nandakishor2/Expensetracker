type AccountDetails = {
    accountID: string
    ifscCode: string
    accountType: "Current" | "Savings"
    bankName: string
    closingbalance: number
    createdDate: string
    updatedDate: string
}


export type { AccountDetails }