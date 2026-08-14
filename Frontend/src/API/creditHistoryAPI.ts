import axiosClient from "./axiosClient";
import type { CreateCreditHistory, UpdateCreditHistory } from "../Components/CreditHistory/Types";

export async function getCreditHistory() {
    const response = await axiosClient.get("/creditHistory/");
    return response.data;
}

export async function findCreditHistory(creditHistoryID: string) {
    const response = await axiosClient.get(`/creditHistory/${creditHistoryID}`);
    return response.data;
}

export async function createCreditHistory(creditHistory: CreateCreditHistory) {
    const response = await axiosClient.post("/creditHistory/", creditHistory);
    return response.data;
}

export async function updateCreditHistory(creditHistoryID: string, creditHistory: UpdateCreditHistory) {
    const response = await axiosClient.put(`/creditHistory/${creditHistoryID}`, creditHistory);
    return response.data;
}

export async function deleteCreditHistory(creditHistoryID: string) {
    const response = await axiosClient.delete(`/creditHistory/${creditHistoryID}`);
    return response.data;
}
