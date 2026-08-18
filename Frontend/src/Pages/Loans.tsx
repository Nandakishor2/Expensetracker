import { useEffect, useState, useCallback } from "react"
import ListLoans from "../Components/Loans/ListLoans"
import type { loanDetails } from "../Components/Loans/Types"
import { getLoanDetails, deleteLoanDetails } from "../API/LoansAPI"
import AddLoan from "../Components/Loans/AddLoan"
import UpdateLoan from "../Components/Loans/UpdateLoan"
import { useAPIResponse } from "../Context/APIResponse"

function Loans() {
    const [loanList, setLoanList] = useState<loanDetails[]>([])
    const [selectedLoan, setSelectedLoan] = useState<loanDetails | null>(null)
    const { showSuccess, showFailure } = useAPIResponse()

    const refreshLoansTable = useCallback(async () => {
        try {
            const responseData = await getLoanDetails()
            setLoanList(responseData.loanDetailsList || [])
            setSelectedLoan(null)
        } catch (error: any) {
            showFailure(error.message || "Loan Details could not be fetched")
            setLoanList([])
        }
    }, [showFailure])

    const deleteLoan = useCallback(async (loanID: string) => {
        try {
            const responseData = await deleteLoanDetails(loanID)
            showSuccess(responseData.message || "Loan deleted successfully", 3000)
            refreshLoansTable()
        } catch (error: any) {
            showFailure(error.message || "Loan could not be deleted")
        }
    }, [refreshLoansTable, showSuccess, showFailure])

    useEffect(() => {
        refreshLoansTable()
    }, [refreshLoansTable])

    return (
        <>
            <div className="border-b border-white/10 pb-3 ">
                <h2 className="text-base/7 font-semibold text-white">Loans</h2>
                <p className="mt-1 text-sm/6 text-gray-400">Find, Create , Update or Delete your loans from here.</p>
            </div>
            {
                selectedLoan != null ? (
                    <UpdateLoan existingLoanDetails={selectedLoan} refreshTableFunction={refreshLoansTable} />
                ) : (
                    <AddLoan refreshTableFunction={refreshLoansTable} />
                )
            }

            <hr className="mt-2 mb-2" />
            
            <ListLoans 
                loanDetailsList={loanList} 
                onEditLoan={(loan) => {
                    console.log("Edit Loan Details", loan)
                    setSelectedLoan(loan)
                }}
                onDeleteLoan={deleteLoan}
            />
        </>
    )
}

export default Loans