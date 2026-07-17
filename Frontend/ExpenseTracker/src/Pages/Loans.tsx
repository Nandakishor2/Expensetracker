import { useEffect, useState } from "react"
import ListLoans from "../Components/Loans/ListLoans"
import type { getLoanDetailsResponse, loanDetails } from "../Components/Loans/Types"
import { getLoanDetails } from "../API/LoansAPI"
import AddLoan from "../Components/Loans/AddLoan"

function Loans() {



    const [loanList, setLoanList] = useState<loanDetails[]>([])

    async function refreshLoansTable() {
        const loanDetailsList: getLoanDetailsResponse = await getLoanDetails();
        setLoanList(loanDetailsList.loanDetailsList)
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
            <AddLoan />
            <ListLoans loanDetailsList={loanList} />
        </>
    )
}

export default Loans