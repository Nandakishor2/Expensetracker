from dotenv import load_dotenv
import os

from pymongo import AsyncMongoClient
from pymongo.server_api import ServerApi
import certifi

import logging
from urllib.parse import quote_plus
import asyncio
load_dotenv()

mongoDBUserName : str | None = quote_plus(os.getenv("MONGODB_USER"))    
mongoDBPassword : str | None = quote_plus(os.getenv("MONGODB_PASSWORD"))

if mongoDBPassword is None or mongoDBUserName is None:
    raise Exception("Mongo DB Credentials not found.")

url =  f"mongodb+srv://{mongoDBUserName}:{mongoDBPassword}@cluster0.hl9iezs.mongodb.net/?appName=Cluster0"

mongoDBClient = AsyncMongoClient(
    url,
    server_api=ServerApi("1"),
    tls=True,
    tlsCAFile=certifi.where(),
)

mongoDB = mongoDBClient["ExpenseTracker"]




async def checkConnection():
    try:
        await mongoDBClient.admin.command("ping")
        # Ensure indexes are created asynchronously
        await mongoDB["People"].create_index(["personID"],unique = True)
        print("MongoDB Connection Successful.")
    except Exception as e:
        logging.exception("MongoDB Connection Failed")
        raise DatabaseConnectionException(
            "MongoDB Connection Failed."
        ) from e