type loanDetails = {
    loanID: string // Unique ID for loan
    accountID: string //Amount Credited and EMI Deduction bank Account 
    companyName: string // Name of the company who issued the loan
    purpose: string // Purpose of the loan
    loanAmount: number // Amount sanctioned by the company
    startDate: string // Loan-Start date
    endDate?: string | null // Loan-End Date
    emiDate: number // EMI Due Date
    rateOfIntrest: number  // Rate of Intrest offered by the loan
    emiAmount: number // EMI Amount payable
    activeStatus: boolean // Loan Status
}

type CreateLoan = loanDetails
type UpdateLoan = loanDetails

//Responses 
type getLoanDetailsResponse = {
    statusCode: number
    message: string
    loanDetailsList: loanDetails[]
}

type CreateNewLoanResponse = {
    statusCode: number
    message: string
    loanID: string
}

type UpdateLoanDetailsResponse = {
    statusCode: number
    message: string
    loanDetails: loanDetails
}

type DeleteLoanDetailsResponse = {
    statusCode: number
    message: string
    loanDeleted: boolean
}

export type { 
    loanDetails, 
    CreateLoan, 
    UpdateLoan, 
    getLoanDetailsResponse, 
    CreateNewLoanResponse, 
    UpdateLoanDetailsResponse, 
    DeleteLoanDetailsResponse 
}