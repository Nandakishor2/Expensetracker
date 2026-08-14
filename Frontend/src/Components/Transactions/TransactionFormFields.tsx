import { useEffect, useState, type ChangeEvent } from "react"
import TextGroup from "../Forms/TextGroup"
import SelectGroup from "../Forms/SelectGroup"
import type { TransactionDetails } from "./Types"
import { getSchedules } from "../../API/schedulesAPI"
import { getLoanDetails } from "../../API/LoansAPI"
import { getBills } from "../../API/billsAPI"
import { getIncomeSources } from "../../API/incomeSourceAPI"
import type { ScheduleDetails } from "../Schedules/Types"
import type { loanDetails } from "../Loans/Types"
import type { BillDetails } from "../Bills/Types"
import type { IncomeSourceDetails } from "../IncomeSource/Types"

type TransactionFormFieldsProps = {
    transactionDetails: Partial<TransactionDetails>
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}

function TransactionFormFields({ transactionDetails, onChange }: TransactionFormFieldsProps) {
    const [schedules, setSchedules] = useState<ScheduleDetails[]>([])
    const [loans, setLoans] = useState<loanDetails[]>([])
    const [bills, setBills] = useState<BillDetails[]>([])
    const [incomes, setIncomes] = useState<IncomeSourceDetails[]>([])

    useEffect(() => {
        async function fetchReferences() {
            try {
                const scheduleData = await getSchedules()
                setSchedules(scheduleData.scheduleList || [])

                const loanData = await getLoanDetails()
                setLoans(loanData.loanDetailsList || [])

                const billData = await getBills()
                setBills(billData.billList || [])

                const incomeData = await getIncomeSources()
                setIncomes(incomeData.incomeSourceList || [])
            } catch (err) {
                console.error("Failed to fetch references for transaction form", err)
            }
        }
        fetchReferences()
    }, [])

    const scheduleOptions: Record<string, string> = { "": "None / Select Schedule" }
    schedules.forEach(s => {
        scheduleOptions[s.scheduleID] = `${s.name} (${s.dueDate})`
    })

    const loanOptions: Record<string, string> = { "": "None / Select Loan" }
    loans.forEach(l => {
        loanOptions[l.loanID] = `${l.companyName} (${l.loanAmount})`
    })

    const billOptions: Record<string, string> = { "": "None / Select Bill" }
    bills.forEach(b => {
        billOptions[b.billID] = `${b.organization} - ${b.description}`
    })

    const incomeOptions: Record<string, string> = { "": "None / Select Income" }
    incomes.forEach(i => {
        incomeOptions[i.incomeID] = i.sourceName
    })

    return (
        <>
            {/* Row 1 */}
            <div className="sm:col-span-4">
                <SelectGroup 
                    id="drpCategory"
                    name="category"
                    labelName="CATEGORY"
                    value={transactionDetails.category || "other"}
                    dropdownItems={{
                        "food": "Food",
                        "bills": "Bills",
                        "loans": "Loans",
                        "transfer": "Transfer",
                        "other": "Other"
                    }}
                    onChange={onChange}
                />
            </div>
            <div className="sm:col-span-4">
                <TextGroup 
                    id="txtDescription"
                    name="description"
                    labelName="DESCRIPTION"
                    value={transactionDetails.description || ""}
                    placeholder="Provide description"
                    onChange={onChange}
                />
            </div>
            <div className="sm:col-span-4">
                <TextGroup 
                    id="txtTransactionDate"
                    name="transactionDate"
                    labelName="TRANSACTION DATE"
                    value={transactionDetails.transactionDate ? String(transactionDetails.transactionDate).split("T")[0] : ""}
                    type="date"
                    onChange={onChange}
                />
            </div>

            {/* Row 2 */}
            <div className="sm:col-span-4">
                <SelectGroup 
                    id="drpSchedule"
                    name="scheduleID"
                    labelName="ASSOCIATED SCHEDULE"
                    value={transactionDetails.scheduleID || ""}
                    dropdownItems={scheduleOptions}
                    onChange={onChange}
                />
            </div>
            <div className="sm:col-span-4">
                <SelectGroup 
                    id="drpLoan"
                    name="loanID"
                    labelName="ASSOCIATED LOAN"
                    value={transactionDetails.loanID || ""}
                    dropdownItems={loanOptions}
                    onChange={onChange}
                />
            </div>
            <div className="sm:col-span-4">
                <SelectGroup 
                    id="drpBill"
                    name="billID"
                    labelName="ASSOCIATED BILL"
                    value={transactionDetails.billID || ""}
                    dropdownItems={billOptions}
                    onChange={onChange}
                />
            </div>

            {/* Row 3 */}
            <div className="sm:col-span-4">
                <SelectGroup 
                    id="drpIncome"
                    name="incomeID"
                    labelName="ASSOCIATED INCOME"
                    value={transactionDetails.incomeID || ""}
                    dropdownItems={incomeOptions}
                    onChange={onChange}
                />
            </div>
            <div className="sm:col-span-4">
                <SelectGroup 
                    id="drpTransactionType"
                    name="transactionType"
                    labelName="TRANSACTION TYPE"
                    value={transactionDetails.transactionType || "debit"}
                    dropdownItems={{ "credit": "Credit (+)", "debit": "Debit (-)" }}
                    onChange={onChange}
                />
            </div>
            <div className="sm:col-span-4">
                <TextGroup 
                    id="txtAmount"
                    name="amount"
                    labelName="AMOUNT"
                    value={String(transactionDetails.amount || "")}
                    placeholder="Provide amount"
                    type="number"
                    onChange={onChange}
                />
            </div>
        </>
    )
}

export default TransactionFormFields
