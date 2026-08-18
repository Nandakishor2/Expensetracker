import axiosClient from "./axiosClient";
import type { 
    CreateIncomeSource, 
    UpdateIncomeSource, 
    GetIncomeSourceResponse, 
    CreateIncomeSourceResponse, 
    UpdateIncomeSourceResponse, 
    DeleteIncomeSourceResponse 
} from "../Components/IncomeSource/Types";

export async function getIncomeSources(): Promise<GetIncomeSourceResponse> {
    return axiosClient.get("/IncomeSource/");
}

export async function getIncomeSourceDetails(incomeSourceID: string): Promise<GetIncomeSourceResponse> {
    return axiosClient.get(`/IncomeSource/${incomeSourceID}`);
}

export async function createIncomeSource(incomeSource: CreateIncomeSource): Promise<CreateIncomeSourceResponse> {
    return axiosClient.post("/IncomeSource/", incomeSource);
}

export async function updateIncomeSource(incomeSourceID: string, incomeSource: UpdateIncomeSource): Promise<UpdateIncomeSourceResponse> {
    return axiosClient.put(`/IncomeSource/${incomeSourceID}`, incomeSource);
}

export async function deleteIncomeSource(incomeSourceID: string): Promise<DeleteIncomeSourceResponse> {
    return axiosClient.delete(`/IncomeSource/${incomeSourceID}`);
}

