import { useEffect, useState, type ChangeEvent } from "react"
import TextGroup from "../Forms/TextGroup"
import SelectGroup from "../Forms/SelectGroup"
import type { IncomeSourceDetails } from "./Types"
import { getAccountDetails } from "../../API/accountAPI"
import type { AccountDetails } from "../Accounts/Types"

type IncomeSourceFormFieldsProps = {
    incomeSourceDetails: Partial<IncomeSourceDetails>
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}

function IncomeSourceFormFields({ incomeSourceDetails, onChange }: IncomeSourceFormFieldsProps) {
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
                    id="txtSourceName"
                    name="sourceName"
                    labelName="SOURCE NAME"
                    value={incomeSourceDetails.sourceName || ""}
                    placeholder="E.g. Salary, Freelance, Dividend"
                    onChange={onChange}
                />
            </div>
            <div className="sm:col-span-4">
                <TextGroup 
                    id="txtCreditedDate"
                    name="creditedDate"
                    labelName="CREDITED DATE OF MONTH"
                    value={incomeSourceDetails.creditedDate !== undefined && incomeSourceDetails.creditedDate !== null ? String(incomeSourceDetails.creditedDate) : ""}
                    placeholder="E.g. 1 - 31"
                    type="number"
                    onChange={onChange}
                />
            </div>
            <div className="sm:col-span-4">
                <TextGroup 
                    id="txtAmount"
                    name="amount"
                    labelName="AMOUNT"
                    value={String(incomeSourceDetails.amount ?? "")}
                    placeholder="Provide income amount"
                    type="number"
                    onChange={onChange}
                />
            </div>

            {/* Row 2 */}
            <div className="sm:col-span-4">
                <SelectGroup 
                    id="drpAccount"
                    name="accountID"
                    labelName="BANK ACCOUNT"
                    value={incomeSourceDetails.accountID || ""}
                    dropdownItems={accountOptions}
                    onChange={onChange}
                />
            </div>
            <div className="sm:col-span-4">
                <SelectGroup 
                    id="drpStatus"
                    name="incomeSourceStatus"
                    labelName="STATUS"
                    value={String(incomeSourceDetails.incomeSourceStatus ?? "true")}
                    dropdownItems={{ "true": "Active / Valid", "false": "Inactive / Terminated" }}
                    onChange={(e) => {
                        const val = e.target.value === "true"
                        onChange({
                            ...e,
                            target: {
                                ...e.target,
                                name: "incomeSourceStatus",
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

export default IncomeSourceFormFields
