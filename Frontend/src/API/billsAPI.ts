import axiosClient from "./axiosClient";
import type { CreateBills, UpdateBills } from "../Components/Bills/Types";

export async function getBills() {
    const response = await axiosClient.get("/Bills/");
    return response.data;
}

export async function getBillDetails(billID: string) {
    const response = await axiosClient.get(`/Bills/${billID}`);
    return response.data;
}

export async function createBill(bill: CreateBills) {
    const response = await axiosClient.post("/Bills/", bill);
    return response.data;
}

export async function updateBill(billID: string, bill: UpdateBills) {
    const response = await axiosClient.put(`/Bills/${billID}`, bill);
    return response.data;
}

export async function deleteBill(billID: string) {
    const response = await axiosClient.delete(`/Bills/${billID}`);
    return response.data;
}
