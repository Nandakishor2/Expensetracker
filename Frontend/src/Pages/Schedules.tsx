import { useEffect, useState } from "react"
import AddSchedule from "../Components/Schedules/AddSchedule"
import { type ScheduleDetails } from "../Components/Schedules/Types"
import ListSchedules from "../Components/Schedules/ListSchedules"
import UpdateSchedule from "../Components/Schedules/UpdateSchedule"
import { deleteSchedule, getSchedules } from "../API/schedulesAPI"

function Schedules() {
    const [scheduleList, setScheduleList] = useState<ScheduleDetails[]>([])
    const [selectedSchedule, setSelectedSchedule] = useState<ScheduleDetails | null>(null)

    async function refreshSchedulesTable() {
        try {
            const responseData = await getSchedules()
            console.log(responseData.message)
            setScheduleList(responseData.scheduleList || [])
            setSelectedSchedule(null)
        } catch {
            console.log("Schedules could not be fetched")
            setScheduleList([])
        }
    }

    async function handleDeleteSchedule(scheduleID: string) {
        try {
            const responseData = await deleteSchedule(scheduleID)
            console.log(responseData.message)
            refreshSchedulesTable()
        } catch {
            console.log("Schedule could not be deleted")
        }
    }

    useEffect(() => {
        refreshSchedulesTable()
    }, [])

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
