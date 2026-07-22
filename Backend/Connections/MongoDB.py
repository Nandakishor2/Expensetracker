from dotenv import load_dotenv
import os

from pymongo import AsyncMongoClient
from pymongo.server_api import ServerApi
import certifi

import logging
from urllib.parse import quote_plus
import asyncio
from pymongo.errors import ServerSelectionTimeoutError,ConnectionFailure
from Exceptions.pymongo import DatabaseServerSelectionTimeoutException,DatabaseConnectionException
load_dotenv()

mongoDBUserName : str | None = quote_plus(os.getenv("MONGODB_USER"))    
mongoDBPassword : str | None = quote_plus(os.getenv("MONGODB_PASSWORD"))

if mongoDBPassword is None or mongoDBUserName is None:
    raise Exception("Mongo DB Credentials not found.")

url =  f"mongodb+srv://{mongoDBUserName}:{mongoDBPassword}@cluster0.hl9iezs.mongodb.net/?appName=Cluster0"

mongoDB = None
mongoClient = None
async def initializeConnection():
    try:

        mongoDBClient = AsyncMongoClient(
            url,
            server_api=ServerApi("1"),
            tls=True,
            tlsCAFile=certifi.where(),
        )

        mongoDB = mongoDBClient["ExpenseTracker"]
        await mongoDBClient.admin.command("ping")

        
        # Ensure indexes are created asynchronously
        await mongoDB["People"].create_index(["personID"],unique = True)
        print("MongoDB Connection Successful.")

    except ServerSelectionTimeoutError as e:
        logging.exception("MongoDB Connection Failed")
        raise DatabaseServerSelectionTimeoutException(
            "MongoDB Connection Failed."
        ) from e
    except ConnectionFailure as e:
        logging.exception("MongoDB Connection Failed")
        raise DatabaseConnectionException(
            "MongoDB Connection Failed."
        ) from e

    except Exception as e:
        logging.exception("MongoDB Connection Failed")
        raise DatabaseConnectionException(
            "MongoDB Connection Failed."
        ) from e

async def closeConnection():
    try:
        if mongoClient is not None:
            await mongoClient.close()
    except Exception as e:
        logging.exception("Could not close the existing mongoDB Connection")
        raise DatabaseConnectionException("Could not close the existing mongoDB Connection")

def getMongoDBConnection():
    try:
        if mongoDB is not None:
            return mongoDB
        raise DatabaseConnectionException("No Connection is established to mongoDB Server.")
    
    except DatabaseConnectionException:
        logging.exception("No Connection is established to mongoDB Server.")
        raise
    except Exception as e:
        logging.exception("Connection failed when Connecting to the server.")
        raise DatabaseConnectionException("Connection failed when Connecting to the server.")
