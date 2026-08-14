import { useEffect, useState } from "react"
import ListLoans from "../Components/Loans/ListLoans"
import type { loanDetails } from "../Components/Loans/Types"
import { getLoanDetails, deleteLoanDetails } from "../API/LoansAPI"
import AddLoan from "../Components/Loans/AddLoan"
import UpdateLoan from "../Components/Loans/UpdateLoan"

function Loans() {
    const [loanList, setLoanList] = useState<loanDetails[]>([])
    const [selectedLoan, setSelectedLoan] = useState<loanDetails | null>(null)

    async function refreshLoansTable() {
        try {
            const responseData = await getLoanDetails()
            setLoanList(responseData.loanDetailsList || [])
            setSelectedLoan(null)
        } catch {
            console.log("Loan Details could not be fetched")
            setLoanList([])
        }
    }

    async function deleteLoan(loanID: string) {
        try {
            const responseData = await deleteLoanDetails(loanID)
            console.log(responseData.message)
            refreshLoansTable()
        } catch {
            console.log("Loan could not be deleted")
        }
    }

    useEffect(() => {
        refreshLoansTable()
    }, [])

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