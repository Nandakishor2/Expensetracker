import axiosClient from "./axiosClient";
import type { 
    CreateBills, 
    UpdateBills, 
    GetBillResponse, 
    CreateBillResponse, 
    UpdateBillResponse, 
    DeleteBillResponse 
} from "../Components/Bills/Types";

export async function getBills(): Promise<GetBillResponse> {
    return axiosClient.get("/Bills/");
}

export async function getBillDetails(billID: string): Promise<GetBillResponse> {
    return axiosClient.get(`/Bills/${billID}`);
}

export async function createBill(bill: CreateBills): Promise<CreateBillResponse> {
    return axiosClient.post("/Bills/", bill);
}

export async function updateBill(billID: string, bill: UpdateBills): Promise<UpdateBillResponse> {
    return axiosClient.put(`/Bills/${billID}`, bill);
}

export async function deleteBill(billID: string): Promise<DeleteBillResponse> {
    return axiosClient.delete(`/Bills/${billID}`);
}

