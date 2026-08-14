import axiosClient from "./axiosClient";
import type { CreateLoan, UpdateLoan } from "../Components/Loans/Types";

export async function getLoanDetails() {
    const response = await axiosClient.get("/loans/");
    return response.data;
}

export async function createLoanDetails(loanDetails: CreateLoan) {
    const response = await axiosClient.post("/loans/", loanDetails);
    return response.data;
}

export async function updateLoanDetails(loanID: string, loanDetails: UpdateLoan) {
    const response = await axiosClient.put(`/loans/${loanID}`, loanDetails);
    return response.data;
}

export async function deleteLoanDetails(loanID: string) {
    const response = await axiosClient.delete(`/loans/${loanID}`);
    return response.data;
}