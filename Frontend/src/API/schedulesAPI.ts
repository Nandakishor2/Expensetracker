import axiosClient from "./axiosClient";
import type { CreateSchedule, UpdateSchedule } from "../Components/Schedules/Types";

export async function getSchedules() {
    const response = await axiosClient.get("/Schedules/");
    return response.data;
}

export async function getScheduleDetails(scheduleID: string) {
    const response = await axiosClient.get(`/Schedules/${scheduleID}`);
    return response.data;
}

export async function createSchedule(schedule: CreateSchedule) {
    const response = await axiosClient.post("/Schedules/", schedule);
    return response.data;
}

export async function updateSchedule(scheduleID: string, schedule: UpdateSchedule) {
    const response = await axiosClient.put(`/Schedules/${scheduleID}`, schedule);
    return response.data;
}

export async function deleteSchedule(scheduleID: string) {
    const response = await axiosClient.delete(`/Schedules/${scheduleID}`);
    return response.data;
}
