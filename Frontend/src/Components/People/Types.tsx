type PersonDetails = {
    personID: string
    name: string
    contactNumber: string
    whatsappNumber: string
    email?: string
}

type CreatePerson = Omit<PersonDetails, "personID">
type UpdatePerson = Partial<CreatePerson>

// Responses
type GetPeopleDetailsResponse = {
    statusCode: number
    message: string
    peopleList: PersonDetails[]
}

type CreatePersonDetailsResponse = {
    statusCode: number
    message: string
    personID: string
}

type UpdatePersonDetailsResponse = {
    statusCode: number
    message: string
    personDetails: PersonDetails
}

type DeletePersonDetailsResponse = {
    statusCode: number
    message: string
}

export type {
    PersonDetails,
    CreatePerson,
    UpdatePerson,
    GetPeopleDetailsResponse,
    CreatePersonDetailsResponse,
    UpdatePersonDetailsResponse,
    DeletePersonDetailsResponse
}
