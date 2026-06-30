from pydantic import BaseModel,Field

class Category(BaseModel):
    name: str = Field(..., description="Name of the category")
    description : str = Field(..., description="Description of the category")

class UpdateCategory(BaseModel):
    name: Optional[str] = Field(None, description="Name of the category")
    description : Optional[str] = Field(None, description="Description of the category")
    
