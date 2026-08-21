import axiosClient from "./axiosClient";
import type { 
    CreateSchedule, 
    UpdateSchedule, 
    GetScheduleResponse, 
    CreateScheduleResponse, 
    UpdateScheduleResponse, 
    DeleteScheduleResponse 
} from "../Components/Schedules/Types";

export async function getSchedules(filters?: any): Promise<GetScheduleResponse> {
    return axiosClient.get("/Schedules/", { params: filters });
}

export async function getScheduleDetails(scheduleID: string): Promise<GetScheduleResponse> {
    return axiosClient.get(`/Schedules/${scheduleID}`);
}

export async function createSchedule(schedule: CreateSchedule): Promise<CreateScheduleResponse> {
    return axiosClient.post("/Schedules/", schedule);
}

export async function updateSchedule(scheduleID: string, schedule: UpdateSchedule): Promise<UpdateScheduleResponse> {
    return axiosClient.put(`/Schedules/${scheduleID}`, schedule);
}

export async function deleteSchedule(scheduleID: string): Promise<DeleteScheduleResponse> {
    return axiosClient.delete(`/Schedules/${scheduleID}`);
}

