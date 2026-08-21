import axiosClient from "./axiosClient";
import type { 
    CreateAccount, 
    UpdateAccount, 
    GetAccountDetailsResponse, 
    UpdateAccountDetailsResponse, 
    DeleteAccountDetailsResponse 
} from "../Components/Accounts/Types";

export async function createAccount(accountDetails: CreateAccount): Promise<UpdateAccountDetailsResponse> {
    return axiosClient.post("/accounts/create", accountDetails);
}

export async function getAccountDetails(filters?: any): Promise<GetAccountDetailsResponse> {
    return axiosClient.get("/accounts/", { params: filters });
}

export async function updateAccountDetails(accountDetails: UpdateAccount): Promise<UpdateAccountDetailsResponse> {
    return axiosClient.patch(`/accounts/update/${accountDetails.accountID}`, accountDetails);
}

export async function deleteAccountDetails(accountID: string): Promise<DeleteAccountDetailsResponse> {
    return axiosClient.delete(`/accounts/delete/${accountID}`);
}

