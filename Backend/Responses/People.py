from Responses.Base import BaseResponse
from Models.People import People
from pydantic import Field
class GetPeopleDetailsResponse(BaseResponse):
    peopleList : list[People] = Field(...,description="People List")

class CreatePersonDetailsResponse(BaseResponse):
    personID : str = Field(...,description="New Person ID ")

class UpdatePersonDetailsResponse(BaseResponse):
    personDetails  : People = Field(...,description="Updated Person Details")

class DeletePersonDetailsResponse(BaseResponse):
    pass