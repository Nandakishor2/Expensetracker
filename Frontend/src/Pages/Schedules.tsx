import { useEffect, useState, useCallback } from "react"
import AddSchedule from "../Components/Schedules/AddSchedule"
import { type ScheduleDetails } from "../Components/Schedules/Types"
import ListSchedules from "../Components/Schedules/ListSchedules"
import UpdateSchedule from "../Components/Schedules/UpdateSchedule"
import { deleteSchedule, getSchedules } from "../API/schedulesAPI"
import { useAPIResponse } from "../Context/APIResponse"

function Schedules() {
    const [scheduleList, setScheduleList] = useState<ScheduleDetails[]>([])
    const [selectedSchedule, setSelectedSchedule] = useState<ScheduleDetails | null>(null)
    const { showSuccess, showFailure } = useAPIResponse()

    const refreshSchedulesTable = useCallback(async () => {
        try {
            const responseData = await getSchedules()
            setScheduleList(responseData.scheduleList || [])
            setSelectedSchedule(null)
        } catch (error: any) {
            showFailure(error.message || "Schedules could not be fetched")
            setScheduleList([])
        }
    }, [showFailure])

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

