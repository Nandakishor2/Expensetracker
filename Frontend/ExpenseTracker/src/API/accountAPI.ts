import axiosClient from "./axiosClient";
import type { CreateAccount } from "../Components/Accounts/Types";

export async function createAccount(accountDetails: CreateAccount) {
    const response = await axiosClient.post("/accounts/create", accountDetails);
    return response.data;
}