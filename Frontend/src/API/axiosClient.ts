import axios, { AxiosError } from "axios";

declare module "axios" {
  export interface AxiosInstance {
    request<T = any, R = T>(config: import("axios").AxiosRequestConfig): Promise<R>;
    get<T = any, R = T>(url: string, config?: import("axios").AxiosRequestConfig): Promise<R>;
    delete<T = any, R = T>(url: string, config?: import("axios").AxiosRequestConfig): Promise<R>;
    head<T = any, R = T>(url: string, config?: import("axios").AxiosRequestConfig): Promise<R>;
    options<T = any, R = T>(url: string, config?: import("axios").AxiosRequestConfig): Promise<R>;
    post<T = any, R = T>(url: string, data?: any, config?: import("axios").AxiosRequestConfig): Promise<R>;
    put<T = any, R = T>(url: string, data?: any, config?: import("axios").AxiosRequestConfig): Promise<R>;
    patch<T = any, R = T>(url: string, data?: any, config?: import("axios").AxiosRequestConfig): Promise<R>;
  }
}

const axiosClient = axios.create({
    baseURL: "http://localhost:8000",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosClient.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error: AxiosError<{ message?: string }>) => {
        let errorMessage = "An Unexpected error Occoured";
        const statusCode = error.response?.status;

        if (error.response) {
            errorMessage = error.response.data?.message || `Error: ${error.response.statusText}`;
        } else if (error.request) {
            errorMessage = "Unable to connect to server. Please check your internet connection.";
        }

        return Promise.reject({ message: errorMessage, statusCode });
    }
);

export default axiosClient;