import axiosClient from "./axiosClient";
import type { CreateAccount, UpdateAccount } from "../Components/Accounts/Types";

export async function createAccount(accountDetails: CreateAccount) {
    const response = await axiosClient.post("/accounts/create", accountDetails);
    return response.data;
}

export async function getAccountDetails() {
    const response = await axiosClient.get("/accounts/");
    return response.data;
}

export async function updateAccountDetails(accountDetails: UpdateAccount) {
    const response = await axiosClient.patch(`/accounts/update/${accountDetails.accountID}`, accountDetails)
    return response.data;
}

export async function deleteAccountDetails(accountID: string) {
    const response = await axiosClient.delete(`/accounts/delete/${accountID}`)
    return response.data;
}
