import { useEffect, useState, type ChangeEvent } from "react"
import TextGroup from "../Forms/TextGroup"
import SelectGroup from "../Forms/SelectGroup"
import type { ScheduleDetails } from "./Types"
import { getLoanDetails } from "../../API/LoansAPI"
import { getBills } from "../../API/billsAPI"
import { getIncomeSources } from "../../API/incomeSourceAPI"
import type { loanDetails } from "../Loans/Types"
import type { BillDetails } from "../Bills/Types"
import type { IncomeSourceDetails } from "../IncomeSource/Types"

type ScheduleFormFieldsProps = {
    scheduleDetails: Partial<ScheduleDetails>
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}

function ScheduleFormFields({ scheduleDetails, onChange }: ScheduleFormFieldsProps) {
    const [loans, setLoans] = useState<loanDetails[]>([])
    const [bills, setBills] = useState<BillDetails[]>([])
    const [incomes, setIncomes] = useState<IncomeSourceDetails[]>([])

    useEffect(() => {
        async function fetchData() {
            try {
                const loanData = await getLoanDetails()
                setLoans(loanData.loanDetailsList || [])
                
                const billData = await getBills()
                setBills(billData.billList || [])

                const incomeData = await getIncomeSources()
                setIncomes(incomeData.incomeSourceList || [])
            } catch (err) {
                console.error("Failed to fetch references for Schedule fields", err)
            }
        }
        fetchData()
    }, [])

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
                <TextGroup 
                    id="txtName"
                    name="name"
                    labelName="SCHEDULE NAME"
                    value={scheduleDetails.name || ""}
                    placeholder="Provide name"
                    onChange={onChange}
                />
            </div>
            <div className="sm:col-span-4">
                <TextGroup 
                    id="txtDescription"
                    name="description"
                    labelName="DESCRIPTION"
                    value={scheduleDetails.description || ""}
                    placeholder="Provide description"
                    onChange={onChange}
                />
            </div>
            <div className="sm:col-span-4">
                <TextGroup 
                    id="txtDueDate"
                    name="dueDate"
                    labelName="DUE DATE"
                    value={scheduleDetails.dueDate ? String(scheduleDetails.dueDate).split("T")[0] : ""}
                    type="date"
                    onChange={onChange}
                />
            </div>

            {/* Row 2 */}
            <div className="sm:col-span-4">
                <SelectGroup 
                    id="drpLoan"
                    name="loanID"
                    labelName="ASSOCIATED LOAN"
                    value={scheduleDetails.loanID || ""}
                    dropdownItems={loanOptions}
                    onChange={onChange}
                />
            </div>
            <div className="sm:col-span-4">
                <SelectGroup 
                    id="drpBill"
                    name="billID"
                    labelName="ASSOCIATED BILL"
                    value={scheduleDetails.billID || ""}
                    dropdownItems={billOptions}
                    onChange={onChange}
                />
            </div>
            <div className="sm:col-span-4">
                <SelectGroup 
                    id="drpIncome"
                    name="incomeID"
                    labelName="ASSOCIATED INCOME"
                    value={scheduleDetails.incomeID || ""}
                    dropdownItems={incomeOptions}
                    onChange={onChange}
                />
            </div>

            {/* Row 3 */}
            <div className="sm:col-span-4">
                <SelectGroup 
                    id="drpTransactionType"
                    name="transactionType"
                    labelName="TRANSACTION TYPE"
                    value={scheduleDetails.transactionType || "credit"}
                    dropdownItems={{ "credit": "Credit (+)", "debit": "Debit (-)" }}
                    onChange={onChange}
                />
            </div>
            <div className="sm:col-span-4">
                <TextGroup 
                    id="txtAmount"
                    name="amount"
                    labelName="AMOUNT"
                    value={String(scheduleDetails.amount || "")}
                    placeholder="Provide amount"
                    type="number"
                    onChange={onChange}
                />
            </div>
            <div className="sm:col-span-4">
                <SelectGroup 
                    id="drpSessionStatus"
                    name="sessionStatus"
                    labelName="STATUS"
                    value={scheduleDetails.sessionStatus || "pending"}
                    dropdownItems={{ "pending": "Pending", "completed": "Completed", "cancelled": "Cancelled" }}
                    onChange={onChange}
                />
            </div>
        </>
    )
}

export default ScheduleFormFields
