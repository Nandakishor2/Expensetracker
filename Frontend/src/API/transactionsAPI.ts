import axiosClient from "./axiosClient";
import type { CreateTransaction, UpdateTransaction } from "../Components/Transactions/Types";

export async function getTransactions() {
    const response = await axiosClient.get("/Transactions/");
    return response.data;
}

export async function getTransactionDetails(transactionID: string) {
    const response = await axiosClient.get(`/Transactions/${transactionID}`);
    return response.data;
}

export async function createTransaction(transaction: CreateTransaction) {
    const response = await axiosClient.post("/Transactions/", transaction);
    return response.data;
}

export async function updateTransaction(transactionID: string, transaction: UpdateTransaction) {
    const response = await axiosClient.put(`/Transactions/${transactionID}`, transaction);
    return response.data;
}

export async function deleteTransaction(transactionID: string) {
    const response = await axiosClient.delete(`/Transactions/${transactionID}`);
    return response.data;
}
