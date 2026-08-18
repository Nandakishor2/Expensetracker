import axiosClient from "./axiosClient";
import type { 
    CreateCreditHistory, 
    UpdateCreditHistory, 
    GetCreditHistoryResponse, 
    CreateCreditHistoryResponse, 
    UpdateCreditHistoryResponse, 
    DeleteCreditHistoryResponse 
} from "../Components/CreditHistory/Types";

export async function getCreditHistory(): Promise<GetCreditHistoryResponse> {
    return axiosClient.get("/creditHistory/");
}

export async function findCreditHistory(creditHistoryID: string): Promise<GetCreditHistoryResponse> {
    return axiosClient.get(`/creditHistory/${creditHistoryID}`);
}

export async function createCreditHistory(creditHistory: CreateCreditHistory): Promise<CreateCreditHistoryResponse> {
    return axiosClient.post("/creditHistory/", creditHistory);
}

export async function updateCreditHistory(creditHistoryID: string, creditHistory: UpdateCreditHistory): Promise<UpdateCreditHistoryResponse> {
    return axiosClient.put(`/creditHistory/${creditHistoryID}`, creditHistory);
}

export async function deleteCreditHistory(creditHistoryID: string): Promise<DeleteCreditHistoryResponse> {
    return axiosClient.delete(`/creditHistory/${creditHistoryID}`);
}

