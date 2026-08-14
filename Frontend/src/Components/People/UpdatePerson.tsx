import Button from "../UI/Button"
import { useState } from "react"
import type { PersonDetails } from "./Types"
import PersonFormFields from "./PersonFormFields"
import { updatePerson } from "../../API/peopleAPI"

type PersonUpdateProps = {
    existingPersonDetails: PersonDetails
    refreshTableFunction: () => Promise<any>
}

function UpdatePerson({ existingPersonDetails, refreshTableFunction }: PersonUpdateProps) {
    const [personDetails, setPersonDetails] = useState<PersonDetails>(existingPersonDetails)

    async function funcUpdatePersonDetails() {
        try {
            await updatePerson(personDetails.personID, personDetails)
            refreshTableFunction()
        } catch (error) {
            console.error("Failed to update person details", error)
        }
    }

    return (
        <div className="grid sm:grid-cols-12 mt-5 gap-2">
            <PersonFormFields 
                personDetails={personDetails}
                onChange={(e) => {
                    const { name, value } = e.target
                    setPersonDetails((prev) => ({ ...prev, [name]: value }))
                }} 
            />

            <div className="sm:col-span-9"></div>
            <div className="sm:col-span-3 flex gap-2 justify-end-safe">
                <Button type="button" variant="ghost" onClick={() => {
                    setPersonDetails(existingPersonDetails)
                }} className="text-sm">Reset</Button>
                <Button type="button" variant="primary" onClick={funcUpdatePersonDetails} className="text-sm">Update</Button>
            </div>
        </div>
    )
}

export default UpdatePerson
