import { useEffect, useState, useCallback } from "react"
import AddPerson from "../Components/People/AddPerson"
import { type PersonDetails } from "../Components/People/Types"
import ListPeople from "../Components/People/ListPeople"
import UpdatePerson from "../Components/People/UpdatePerson"
import { deletePerson, getPeople } from "../API/peopleAPI"
import { useAPIResponse } from "../Context/APIResponse"
import TextGroup from "../Components/Forms/TextGroup"
import Button from "../Components/UI/Button"

function People() {
    const [peopleList, setPeopleList] = useState<PersonDetails[]>([])
    const [selectedPerson, setSelectedPerson] = useState<PersonDetails | null>(null)
    const { showSuccess, showFailure } = useAPIResponse()

    const [filters, setFilters] = useState({
        name: ""
    })

    const refreshPeopleTable = useCallback(async (currentFilters?: typeof filters) => {
        try {
            const activeFilters: any = {}
            const f = currentFilters || filters
            if (f.name.trim()) activeFilters.name = f.name.trim()

            const responseData = await getPeople(activeFilters)
            setPeopleList(responseData.peopleList || [])
            setSelectedPerson(null)
        } catch (error: any) {
            showFailure(error.message || "People Details could not be fetched")
            setPeopleList([])
        }
    }, [showFailure, filters])

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

            <div className="bg-white/5 p-4 rounded-lg my-4 border border-white/10">
                <h3 className="text-sm font-semibold text-white mb-3">Filters</h3>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <TextGroup 
                        id="filterName"
                        name="name"
                        labelName="NAME"
                        value={filters.name}
                        placeholder="Filter by name"
                        onChange={(e) => setFilters({ name: e.target.value })}
                    />
                </div>
                <div className="flex gap-2 justify-end mt-3">
                    <Button variant="ghost" className="text-sm" onClick={() => {
                        const cleared = { name: "" }
                        setFilters(cleared)
                        refreshPeopleTable(cleared)
                    }}>Reset</Button>
                    <Button variant="secondary" className="text-sm" onClick={() => refreshPeopleTable(filters)}>Search</Button>
                </div>
            </div>

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

