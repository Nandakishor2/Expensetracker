import axiosClient from "./axiosClient";

export async function getLoanDetails() {
    const response = await axiosClient.get("/loans/");
    return response.data

}