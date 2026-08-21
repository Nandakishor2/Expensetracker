import axiosClient from "./axiosClient";
import type { 
    CreateLoan, 
    UpdateLoan, 
    getLoanDetailsResponse, 
    CreateNewLoanResponse, 
    UpdateLoanDetailsResponse, 
    DeleteLoanDetailsResponse 
} from "../Components/Loans/Types";

export async function getLoanDetails(filters?: any): Promise<getLoanDetailsResponse> {
    return axiosClient.get("/loans/", { params: filters });
}

export async function createLoanDetails(loanDetails: CreateLoan): Promise<CreateNewLoanResponse> {
    return axiosClient.post("/loans/", loanDetails);
}

export async function updateLoanDetails(loanID: string, loanDetails: UpdateLoan): Promise<UpdateLoanDetailsResponse> {
    return axiosClient.put(`/loans/${loanID}`, loanDetails);
}

export async function deleteLoanDetails(loanID: string): Promise<DeleteLoanDetailsResponse> {
    return axiosClient.delete(`/loans/${loanID}`);
}