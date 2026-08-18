import axiosClient from "./axiosClient";
import type { 
    CreateTransaction, 
    UpdateTransaction, 
    GetTransactionResponse, 
    CreateTransactionResponse, 
    UpdateTransactionResponse, 
    DeleteTransactionResponse 
} from "../Components/Transactions/Types";

export async function getTransactions(): Promise<GetTransactionResponse> {
    return axiosClient.get("/Transactions/");
}

export async function getTransactionDetails(transactionID: string): Promise<GetTransactionResponse> {
    return axiosClient.get(`/Transactions/${transactionID}`);
}

export async function createTransaction(transaction: CreateTransaction): Promise<CreateTransactionResponse> {
    return axiosClient.post("/Transactions/", transaction);
}

export async function updateTransaction(transactionID: string, transaction: UpdateTransaction): Promise<UpdateTransactionResponse> {
    return axiosClient.put(`/Transactions/${transactionID}`, transaction);
}

export async function deleteTransaction(transactionID: string): Promise<DeleteTransactionResponse> {
    return axiosClient.delete(`/Transactions/${transactionID}`);
}

