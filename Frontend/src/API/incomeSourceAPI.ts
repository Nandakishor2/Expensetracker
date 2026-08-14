import axiosClient from "./axiosClient";
import type { CreateIncomeSource, UpdateIncomeSource } from "../Components/IncomeSource/Types";

export async function getIncomeSources() {
    const response = await axiosClient.get("/IncomeSource/");
    return response.data;
}

export async function getIncomeSourceDetails(incomeSourceID: string) {
    const response = await axiosClient.get(`/IncomeSource/${incomeSourceID}`);
    return response.data;
}

export async function createIncomeSource(incomeSource: CreateIncomeSource) {
    const response = await axiosClient.post("/IncomeSource/", incomeSource);
    return response.data;
}

export async function updateIncomeSource(incomeSourceID: string, incomeSource: UpdateIncomeSource) {
    const response = await axiosClient.put(`/IncomeSource/${incomeSourceID}`, incomeSource);
    return response.data;
}

export async function deleteIncomeSource(incomeSourceID: string) {
    const response = await axiosClient.delete(`/IncomeSource/${incomeSourceID}`);
    return response.data;
}
