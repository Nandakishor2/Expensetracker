from Connections.MongoDB import mongoDB
from Schema.Category import CategorySchema
from bson.objectid import ObjectId
from pymongo.return_document import ReturnDocument

def insertCategoryDetails(categoryDetails : CategorySchema) -> str:
    try:
        newCategory = mongoDB["Category"].insert_one(categoryDetails.model_dump())
        return newCategory.inserted_id
    except Exception as e:
        print(e)


def getCategoryDetails(categoryID : str) -> dict:
    try:
        categoryDetails = mongoDB["Category"].find_one({
            "_id" : ObjectId(categoryID)
        })
        if categoryDetails is None:
            raise Exception("Category Not Found")

        return categoryDetails
    except Exception as e:
        print(e)


def updateCategoryDetails(categoryID : str,updatedCategoryDetails : dict) -> bool:
    try:
        updatedCategory = mongoDB["Category"].find_one_and_update(
            {"_id" : ObjectId(categoryID)},
            {
                "$set" : updatedCategoryDetails
            },
            return_document=ReturnDocument.AFTER
        )
        if updatedCategory is None:
            raise Exception("Category Not Found")

        return True
    except Exception as e:
        print(e)

def deleteCategory(categoryID : str) -> bool:
    try:
        deletedCategory = mongoDB["Category"].find_one_and_delete(
            {
                "_id" : ObjectId(categoryID)
            }
        )
        if deletedCategory is None:
            raise Exception("Category Not Found")

        return True
    except Exception as e:
        print(e)