import Button from "../UI/Button"
import { useState, useEffect } from "react"
import type { PersonDetails } from "./Types"
import PersonFormFields from "./PersonFormFields"
import { updatePerson } from "../../API/peopleAPI"
import { useAPIResponse } from "../../Context/APIResponse"

type PersonUpdateProps = {
    existingPersonDetails: PersonDetails
    refreshTableFunction: () => Promise<any>
}

function UpdatePerson({ existingPersonDetails, refreshTableFunction }: PersonUpdateProps) {
    const [personDetails, setPersonDetails] = useState<PersonDetails>(existingPersonDetails)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { showSuccess, showFailure } = useAPIResponse()

    useEffect(() => {
        setPersonDetails(existingPersonDetails)
    }, [existingPersonDetails])

    async function funcUpdatePersonDetails() {
        setIsSubmitting(true)
        try {
            const res = await updatePerson(personDetails.personID, personDetails)
            showSuccess(res.message || "Person updated successfully", 3000)
            await refreshTableFunction()
        } catch (error: any) {
            showFailure(error.message || "Failed to update person details")
        } finally {
            setIsSubmitting(false)
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
                }} className="text-sm" disabled={isSubmitting}>Reset</Button>
                <Button type="button" variant="primary" onClick={funcUpdatePersonDetails} className="text-sm" disabled={isSubmitting}>
                    {isSubmitting ? "Updating..." : "Update"}
                </Button>
            </div>
        </div>
    )
}

export default UpdatePerson

