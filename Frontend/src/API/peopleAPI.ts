import axiosClient from "./axiosClient";
import type { CreatePerson, UpdatePerson } from "../Components/People/Types";

export async function getPeople() {
    const response = await axiosClient.get("/people/");
    return response.data;
}

export async function createPerson(people: CreatePerson) {
    const response = await axiosClient.post("/people/", people);
    return response.data;
}

export async function updatePerson(personID: string, updateDetails: UpdatePerson) {
    const response = await axiosClient.put(`/people/${personID}`, updateDetails);
    return response.data;
}

export async function deletePerson(personID: string) {
    const response = await axiosClient.delete(`/people/${personID}`);
    return response.data;
}
