import { useEffect, useState, type ChangeEvent } from "react"
import TextGroup from "../Forms/TextGroup"
import SelectGroup from "../Forms/SelectGroup"
import type { loanDetails } from "./Types"
import { getAccountDetails } from "../../API/accountAPI"
import type { AccountDetails } from "../Accounts/Types"

type LoanFormFieldsProps = {
    loanDetails: loanDetails
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
    isEditMode?: boolean
}

function LoanFormFields({ loanDetails, onChange, isEditMode = false }: LoanFormFieldsProps) {
    const [accounts, setAccounts] = useState<AccountDetails[]>([])

    useEffect(() => {
        async function fetchAccounts() {
            try {
                const data = await getAccountDetails()
                setAccounts(data.accountDetailsList || [])
            } catch (err) {
                console.error("Failed to fetch accounts", err)
            }
        }
        fetchAccounts();
    }, [])

    const accountOptions: Record<string, string> = { "": "Select Account" }
    accounts.forEach(acc => {
        accountOptions[acc.accountID] = `${acc.bankName} (${acc.accountID})`
    })

    return (
        <>
            {/* Row 1 */}
            <div className="sm:col-span-4">
                <TextGroup 
                    id="txtLoanID"
                    name="loanID"
                    labelName="LOAN ID"
                    value={loanDetails.loanID}
                    placeholder="Please provide your loan ID"
                    onChange={onChange}
                    type="text"
                    {...(isEditMode ? { readOnly: true } : {})}
                />
            </div>
            <div className="sm:col-span-4">
                <SelectGroup 
                    id="drpAccountID"
                    name="accountID"
                    labelName="ACCOUNT"
                    value={loanDetails.accountID}
                    dropdownItems={accountOptions}
                    onChange={onChange}
                />
            </div>
            <div className="sm:col-span-4">
                <TextGroup 
                    id="txtCompanyName"
                    name="companyName"
                    labelName="COMPANY NAME"
                    value={loanDetails.companyName}
                    placeholder="Please provide company name"
                    onChange={onChange}
                />
            </div>

            {/* Row 2 */}
            <div className="sm:col-span-4">
                <TextGroup 
                    id="txtPurpose"
                    name="purpose"
                    labelName="PURPOSE"
                    value={loanDetails.purpose}
                    placeholder="Please provide purpose"
                    onChange={onChange}
                />
            </div>
            <div className="sm:col-span-4">
                <TextGroup 
                    id="txtLoanAmount"
                    name="loanAmount"
                    labelName="LOAN AMOUNT"
                    value={String(loanDetails.loanAmount || "")}
                    placeholder="Please provide loan amount"
                    type="number"
                    onChange={onChange}
                />
            </div>
            <div className="sm:col-span-4">
                <TextGroup 
                    id="txtStartDate"
                    name="startDate"
                    labelName="START DATE"
                    value={loanDetails.startDate ? String(loanDetails.startDate).split("T")[0] : ""}
                    type="date"
                    onChange={onChange}
                />
            </div>

            {/* Row 3 */}
            <div className="sm:col-span-4">
                <TextGroup 
                    id="txtEndDate"
                    name="endDate"
                    labelName="END DATE"
                    value={loanDetails.endDate ? String(loanDetails.endDate).split("T")[0] : ""}
                    type="date"
                    onChange={onChange}
                />
            </div>
            <div className="sm:col-span-4">
                <TextGroup 
                    id="txtEmiDate"
                    name="emiDate"
                    labelName="EMI DUE DAY OF MONTH (1-31)"
                    value={String(loanDetails.emiDate || "")}
                    placeholder="E.g. 5"
                    type="number"
                    onChange={onChange}
                />
            </div>
            <div className="sm:col-span-4">
                <TextGroup 
                    id="txtRateOfIntrest"
                    name="rateOfIntrest"
                    labelName="RATE OF INTEREST (%)"
                    value={String(loanDetails.rateOfIntrest || "")}
                    placeholder="E.g. 8.5"
                    type="number"
                    onChange={onChange}
                />
            </div>

            {/* Row 4 */}
            <div className="sm:col-span-4">
                <TextGroup 
                    id="txtEmiAmount"
                    name="emiAmount"
                    labelName="EMI AMOUNT"
                    value={String(loanDetails.emiAmount || "")}
                    placeholder="Please provide EMI amount"
                    type="number"
                    onChange={onChange}
                />
            </div>
            <div className="sm:col-span-4">
                <SelectGroup 
                    id="drpActiveStatus"
                    name="activeStatus"
                    labelName="STATUS"
                    value={String(loanDetails.activeStatus)}
                    dropdownItems={{ "true": "Active", "false": "Inactive" }}
                    onChange={(e) => {
                        // Forward boolean value simulated as event
                        const val = e.target.value === "true"
                        onChange({
                            ...e,
                            target: {
                                ...e.target,
                                name: "activeStatus",
                                value: val as any
                            }
                        })
                    }}
                />
            </div>
            <div className="sm:col-span-4"></div>
        </>
    )
}

export default LoanFormFields