type AccountDetails = {
    accountID: string
    ifscCode: string
    accountType: "current" | "savings"
    bankName: string
    closingBalance: number
}
type CreateAccount = AccountDetails
type UpdateAccount = AccountDetails


// Responses
type GetAccountDetailsResponse = {
    accountDetailsList: Array<AccountDetails>
    message: string
}

type UpdateAccountDetailsResponse = {
    message: string,
    updatedAccountDetails: AccountDetails
}

type DeleteAccountDetailsResponse = {
    message: string
}
export type { AccountDetails, CreateAccount, UpdateAccount, GetAccountDetailsResponse, UpdateAccountDetailsResponse, DeleteAccountDetailsResponse }