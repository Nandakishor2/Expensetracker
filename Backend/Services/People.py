from Database.People import getPeopleList,insertPeople,updatePeopleDetails,deletePersonDetails
from Responses.People import GetPeopleDetailsResponse,CreatePersonDetailsResponse,UpdatePersonDetailsResponse,DeletePersonDetailsResponse
from Models.People import People,UpdatePeople
from Utils.GenerateUUID import generateUUID
from Schema.People import PeopleSchema
async def handleGetPeopleDetails() -> GetPeopleDetailsResponse:
    peopleList : list[dict] = await getPeopleList({})
    return GetPeopleDetailsResponse(
        message="Get People Details Success",
        peopleList=[People(**people)  for people in peopleList] 
    )
    
async def handleCreatePersonDetails(personDetails: People) -> CreatePersonDetailsResponse:
    personDetails : dict = personDetails.model_dump()
    personDetails["personID"] = generateUUID()
    personID : str | None = await insertPeople(PeopleSchema(**personDetails))

    if personID is None:
        raise ValueError("Could not get Person ID")
    return CreatePersonDetailsResponse(
        message="Create Person Details Success",
        personID=personID
    )

async def handleUpdatePersonDetails(personID : str,updateDetails : UpdatePeople) -> UpdatePersonDetailsResponse:

    updatedDetails : dict = await updatePeopleDetails(personID,updateDetails)
    return UpdatePersonDetailsResponse(
        personDetails = People(**updatedDetails),
        message="Update Person Details Success"
    )

async def handleDeletePersonDetails(personID : str) -> DeletePersonDetailsResponse:
    deleteResult = await deletePersonDetails(personID)
    return DeletePersonDetailsResponse(
        message="Delete Person Details Success"
    )
