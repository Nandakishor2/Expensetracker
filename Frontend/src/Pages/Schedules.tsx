import { useEffect, useState, useCallback } from "react"
import AddSchedule from "../Components/Schedules/AddSchedule"
import { type ScheduleDetails } from "../Components/Schedules/Types"
import ListSchedules from "../Components/Schedules/ListSchedules"
import UpdateSchedule from "../Components/Schedules/UpdateSchedule"
import { deleteSchedule, getSchedules } from "../API/schedulesAPI"
import { useAPIResponse } from "../Context/APIResponse"
import TextGroup from "../Components/Forms/TextGroup"
import SelectGroup from "../Components/Forms/SelectGroup"
import Button from "../Components/UI/Button"

function Schedules() {
    const [scheduleList, setScheduleList] = useState<ScheduleDetails[]>([])
    const [selectedSchedule, setSelectedSchedule] = useState<ScheduleDetails | null>(null)
    const { showSuccess, showFailure } = useAPIResponse()

    const [filters, setFilters] = useState({
        sessionStatus: "",
        transactionType: "",
        dueDateFrom: "",
        dueDateTo: "",
        minAmount: "",
        maxAmount: ""
    })

    const refreshSchedulesTable = useCallback(async (currentFilters?: typeof filters) => {
        try {
            const activeFilters: any = {}
            const f = currentFilters || filters
            if (f.sessionStatus && f.sessionStatus !== "all") activeFilters.sessionStatus = f.sessionStatus
            if (f.transactionType && f.transactionType !== "all") activeFilters.transactionType = f.transactionType
            if (f.dueDateFrom) activeFilters.dueDateFrom = f.dueDateFrom
            if (f.dueDateTo) activeFilters.dueDateTo = f.dueDateTo
            if (f.minAmount !== "") activeFilters.minAmount = Number(f.minAmount)
            if (f.maxAmount !== "") activeFilters.maxAmount = Number(f.maxAmount)

            const responseData = await getSchedules(activeFilters)
            setScheduleList(responseData.scheduleList || [])
            setSelectedSchedule(null)
        } catch (error: any) {
            showFailure(error.message || "Schedules could not be fetched")
            setScheduleList([])
        }
    }, [showFailure, filters])

    const handleDeleteSchedule = useCallback(async (scheduleID: string) => {
        try {
            const responseData = await deleteSchedule(scheduleID)
            showSuccess(responseData.message || "Schedule deleted successfully", 3000)
            refreshSchedulesTable()
        } catch (error: any) {
            showFailure(error.message || "Schedule could not be deleted")
        }
    }, [refreshSchedulesTable, showSuccess, showFailure])

    useEffect(() => {
        refreshSchedulesTable()
    }, [refreshSchedulesTable])

    return (
        <>
            <div className="border-b border-white/10 pb-3 ">
                <h2 className="text-base/7 font-semibold text-white">Schedules</h2>
                <p className="mt-1 text-sm/6 text-gray-400">Find, Create , Update or Delete schedules here.</p>
            </div>
            {
                selectedSchedule != null ? (
                    <UpdateSchedule existingDetails={selectedSchedule} refreshTableFunction={refreshSchedulesTable} />
                ) : (
                    <AddSchedule refreshTableFunction={refreshSchedulesTable} />
                )
            }

            <div className="bg-white/5 p-4 rounded-lg my-4 border border-white/10">
                <h3 className="text-sm font-semibold text-white mb-3">Filters</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <SelectGroup 
                        id="filterSessionStatus"
                        name="sessionStatus"
                        labelName="STATUS"
                        value={filters.sessionStatus || "all"}
                        dropdownItems={{ "all": "All", "pending": "Pending", "completed": "Completed", "cancelled": "Cancelled" }}
                        onChange={(e) => setFilters(prev => ({ ...prev, sessionStatus: e.target.value }))}
                    />
                    <SelectGroup 
                        id="filterTransactionType"
                        name="transactionType"
                        labelName="TRANSACTION TYPE"
                        value={filters.transactionType || "all"}
                        dropdownItems={{ "all": "All", "credit": "Credit", "debit": "Debit" }}
                        onChange={(e) => setFilters(prev => ({ ...prev, transactionType: e.target.value }))}
                    />
                    <TextGroup 
                        id="filterMinAmount"
                        name="minAmount"
                        labelName="MIN AMOUNT"
                        type="number"
                        value={String(filters.minAmount)}
                        placeholder="Min amount"
                        onChange={(e) => setFilters(prev => ({ ...prev, minAmount: e.target.value }))}
                    />
                    <TextGroup 
                        id="filterMaxAmount"
                        name="maxAmount"
                        labelName="MAX AMOUNT"
                        type="number"
                        value={String(filters.maxAmount)}
                        placeholder="Max amount"
                        onChange={(e) => setFilters(prev => ({ ...prev, maxAmount: e.target.value }))}
                    />
                    <TextGroup 
                        id="filterDueDateFrom"
                        name="dueDateFrom"
                        labelName="DUE DATE FROM"
                        type="date"
                        value={filters.dueDateFrom}
                        onChange={(e) => setFilters(prev => ({ ...prev, dueDateFrom: e.target.value }))}
                    />
                    <TextGroup 
                        id="filterDueDateTo"
                        name="dueDateTo"
                        labelName="DUE DATE TO"
                        type="date"
                        value={filters.dueDateTo}
                        onChange={(e) => setFilters(prev => ({ ...prev, dueDateTo: e.target.value }))}
                    />
                </div>
                <div className="flex gap-2 justify-end mt-3">
                    <Button variant="ghost" className="text-sm" onClick={() => {
                        const cleared = { sessionStatus: "", transactionType: "", dueDateFrom: "", dueDateTo: "", minAmount: "", maxAmount: "" }
                        setFilters(cleared)
                        refreshSchedulesTable(cleared)
                    }}>Reset</Button>
                    <Button variant="secondary" className="text-sm" onClick={() => refreshSchedulesTable(filters)}>Search</Button>
                </div>
            </div>

            <hr className="mt-2 mb-2" />
            <ListSchedules 
                scheduleList={scheduleList} 
                onEditSchedule={(sched) => {
                    console.log("Edit Schedule Details", sched)
                    setSelectedSchedule(sched)
                }}
                onDeleteSchedule={handleDeleteSchedule}
            />
        </>
    )
}

export default Schedules

