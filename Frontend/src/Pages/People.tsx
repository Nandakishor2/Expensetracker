import { useEffect, useState, useCallback } from "react"
import AddPerson from "../Components/People/AddPerson"
import { type PersonDetails } from "../Components/People/Types"
import ListPeople from "../Components/People/ListPeople"
import UpdatePerson from "../Components/People/UpdatePerson"
import { deletePerson, getPeople } from "../API/peopleAPI"
import { useAPIResponse } from "../Context/APIResponse"

function People() {
    const [peopleList, setPeopleList] = useState<PersonDetails[]>([])
    const [selectedPerson, setSelectedPerson] = useState<PersonDetails | null>(null)
    const { showSuccess, showFailure } = useAPIResponse()

    const refreshPeopleTable = useCallback(async () => {
        try {
            const responseData = await getPeople()
            setPeopleList(responseData.peopleList || [])
            setSelectedPerson(null)
        } catch (error: any) {
            showFailure(error.message || "People Details could not be fetched")
            setPeopleList([])
        }
    }, [showFailure])

    const handleDeletePerson = useCallback(async (personID: string) => {
        try {
            const responseData = await deletePerson(personID)
            showSuccess(responseData.message || "Person deleted successfully", 3000)
            refreshPeopleTable()
        } catch (error: any) {
            showFailure(error.message || "Person could not be deleted")
        }
    }, [refreshPeopleTable, showSuccess, showFailure])

    useEffect(() => {
        refreshPeopleTable()
    }, [refreshPeopleTable])

    return (
        <>
            <div className="border-b border-white/10 pb-3 ">
                <h2 className="text-base/7 font-semibold text-white">People</h2>
                <p className="mt-1 text-sm/6 text-gray-400">Find, Create , Update or Delete people from here.</p>
            </div>
            {
                selectedPerson != null ? (
                    <UpdatePerson existingPersonDetails={selectedPerson} refreshTableFunction={refreshPeopleTable} />
                ) : (
                    <AddPerson refreshTableFunction={refreshPeopleTable} />
                )
            }

            <hr className="mt-2 mb-2" />
            <ListPeople 
                peopleDetails={peopleList} 
                onEditPerson={(person) => {
                    console.log("Edit Person Details", person)
                    setSelectedPerson(person)
                }}
                onDeletePerson={handleDeletePerson} 
            />
        </>
    )
}

export default People

