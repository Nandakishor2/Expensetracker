from Responses.People import GetPeopleDetailsResponse,CreatePersonDetailsResponse,UpdatePersonDetailsResponse,DeletePersonDetailsResponse
from Services.People import handleCreatePersonDetails,handleDeletePersonDetails,handleGetPeopleDetails,handleUpdatePersonDetails
from Models.People import People,UpdatePeople,CreatePerson
from fastapi.responses import JSONResponse
from fastapi import APIRouter

peopleRouter = APIRouter(prefix="/people",tags=["People"])

@peopleRouter.get("/")
async def getPeople() -> GetPeopleDetailsResponse:
    response : GetPeopleDetailsResponse = await handleGetPeopleDetails()
    return JSONResponse(
        status_code= response.status_code,
        content=response.model_dump()
    )

@peopleRouter.post("/")
async def createPeople(people : CreatePerson) -> CreatePersonDetailsResponse:
    response : CreatePersonDetailsResponse = await handleCreatePersonDetails(people)
    return JSONResponse(
        status_code= response.status_code,
        content=response.model_dump()
    )

@peopleRouter.put("/{personID}")
async def updatePeople(personID : str,updateDetails : UpdatePeople) -> UpdatePersonDetailsResponse:

    response : UpdatePersonDetailsResponse = await handleUpdatePersonDetails(personID,updateDetails)
    return JSONResponse(
        status_code= response.status_code,
        content=response.model_dump()
    )

@peopleRouter.delete("/{personID}")
async def deletePeople(personID : str) -> DeletePersonDetailsResponse:
    response : DeletePersonDetailsResponse = await handleDeletePersonDetails(personID)
    return JSONResponse(
        status_code= response.status_code,
        content=response.model_dump()
    )