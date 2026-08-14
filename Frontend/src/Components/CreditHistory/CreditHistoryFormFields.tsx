import { useEffect, useState, type ChangeEvent } from "react"
import TextGroup from "../Forms/TextGroup"
import SelectGroup from "../Forms/SelectGroup"
import type { CreditHistoryDetails } from "./Types"
import { getPeople } from "../../API/peopleAPI"
import type { PersonDetails } from "../People/Types"

type CreditHistoryFormFieldsProps = {
    creditHistoryDetails: Partial<CreditHistoryDetails>
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}

function CreditHistoryFormFields({ creditHistoryDetails, onChange }: CreditHistoryFormFieldsProps) {
    const [people, setPeople] = useState<PersonDetails[]>([])

    useEffect(() => {
        async function fetchPeople() {
            try {
                const data = await getPeople()
                setPeople(data.peopleList || [])
            } catch (err) {
                console.error("Failed to fetch people list", err)
            }
        }
        fetchPeople()
    }, [])

    const lenderOptions: Record<string, string> = { "": "Select Lender" }
    people.forEach(p => {
        lenderOptions[p.personID] = p.name
    })

    const isCleared = String(creditHistoryDetails.dueCleared) === "true"

    return (
        <>
            {/* Row 1 */}
            <div className="sm:col-span-4">
                <SelectGroup 
                    id="drpLender"
                    name="peopleID"
                    labelName="LENDER / PERSON"
                    value={creditHistoryDetails.peopleID || ""}
                    dropdownItems={lenderOptions}
                    onChange={onChange}
                />
            </div>
            <div className="sm:col-span-4">
                <TextGroup 
                    id="txtPurpose"
                    name="purpose"
                    labelName="PURPOSE"
                    value={creditHistoryDetails.purpose || ""}
                    placeholder="Provide purpose of credit"
                    onChange={onChange}
                />
            </div>
            <div className="sm:col-span-4">
                <TextGroup 
                    id="txtCreditPaymentMode"
                    name="creditPaymentMode"
                    labelName="CREDIT PAYMENT MODE"
                    value={creditHistoryDetails.creditPaymentMode || ""}
                    placeholder="E.g. Cash, UPI, Bank Transfer"
                    onChange={onChange}
                />
            </div>

            {/* Row 2 */}
            <div className="sm:col-span-4">
                <TextGroup 
                    id="txtRecievedDate"
                    name="recievedDate"
                    labelName="RECEIVED DATE"
                    value={creditHistoryDetails.recievedDate ? String(creditHistoryDetails.recievedDate).split("T")[0] : ""}
                    type="date"
                    onChange={onChange}
                />
            </div>
            <div className="sm:col-span-4">
                <TextGroup 
                    id="txtDueDate"
                    name="dueDate"
                    labelName="REPAYMENT DUE DATE"
                    value={creditHistoryDetails.dueDate ? String(creditHistoryDetails.dueDate).split("T")[0] : ""}
                    type="date"
                    onChange={onChange}
                />
            </div>
            <div className="sm:col-span-4">
                <SelectGroup 
                    id="drpDueCleared"
                    name="dueCleared"
                    labelName="IS REPAYMENT CLEARED?"
                    value={String(creditHistoryDetails.dueCleared || "false")}
                    dropdownItems={{ "false": "No (Pending)", "true": "Yes (Cleared)" }}
                    onChange={(e) => {
                        const val = e.target.value === "true"
                        onChange({
                            ...e,
                            target: {
                                ...e.target,
                                name: "dueCleared",
                                value: val as any
                            }
                        })
                    }}
                />
            </div>

            {/* Repayment details conditional fields */}
            {isCleared && (
                <>
                    <div className="sm:col-span-4">
                        <TextGroup 
                            id="txtDueClearedDate"
                            name="dueClearedDate"
                            labelName="DUE CLEARED DATE"
                            value={creditHistoryDetails.dueClearedDate ? String(creditHistoryDetails.dueClearedDate).split("T")[0] : ""}
                            type="date"
                            onChange={onChange}
                        />
                    </div>
                    <div className="sm:col-span-4">
                        <TextGroup 
                            id="txtRepaymentMode"
                            name="repaymentMode"
                            labelName="REPAYMENT MODE"
                            value={creditHistoryDetails.repaymentMode || ""}
                            placeholder="E.g. Cash, UPI, Bank Transfer"
                            onChange={onChange}
                        />
                    </div>
                    <div className="sm:col-span-4"></div>
                </>
            )}
        </>
    )
}

export default CreditHistoryFormFields
