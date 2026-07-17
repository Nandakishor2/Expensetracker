type loanDetails = {
    loanID: string // Unique ID for loan
    accountID: string //Amount Credited and EMI Deduction bank Account 
    companyName: string // Name of the company who issued the loan
    purpose: string // Purpose of the loan
    loanAmount: number // Amount sanctioned by the company
    startDate: Date // Loan-Start date
    endDate: Date // Loan-End Date
    emiDate: number // EMI Due Date
    rateOfIntrest: number  // Rate of Intrest offered by the loan
    emiAmount: number // EMI Amount payable
    activeStatus: boolean // Loan Status
}

//Loan details response 
type getLoanDetailsResponse = {
    statusCode: number
    message: string
    loanDetailsList: loanDetails[]
}

export type { loanDetails, getLoanDetailsResponse }