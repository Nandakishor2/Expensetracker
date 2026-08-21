import axiosClient from "./axiosClient";
import type { 
    CreatePerson, 
    UpdatePerson, 
    GetPeopleDetailsResponse, 
    CreatePersonDetailsResponse, 
    UpdatePersonDetailsResponse, 
    DeletePersonDetailsResponse 
} from "../Components/People/Types";

export async function getPeople(filters?: any): Promise<GetPeopleDetailsResponse> {
    return axiosClient.get("/people/", { params: filters });
}

export async function createPerson(people: CreatePerson): Promise<CreatePersonDetailsResponse> {
    return axiosClient.post("/people/", people);
}

export async function updatePerson(personID: string, updateDetails: UpdatePerson): Promise<UpdatePersonDetailsResponse> {
    return axiosClient.put(`/people/${personID}`, updateDetails);
}

export async function deletePerson(personID: string): Promise<DeletePersonDetailsResponse> {
    return axiosClient.delete(`/people/${personID}`);
}

