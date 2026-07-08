from dotenv import load_dotenv
import os

from pymongo import MongoClient
from pymongo.server_api import ServerApi
import certifi

import logging
from urllib.parse import quote_plus
load_dotenv()

mongoDBUserName : str | None = quote_plus(os.getenv("MONGODB_USER"))    
mongoDBPassword : str | None = quote_plus(os.getenv("MONGODB_PASSWORD"))

if mongoDBPassword is None or mongoDBUserName is None:
    raise Exception("Mongo DB Credentials not found.")

url =  f"mongodb+srv://{mongoDBUserName}:{mongoDBPassword}@cluster0.hl9iezs.mongodb.net/?appName=Cluster0"

mongoDBClient = MongoClient(url,server_api=ServerApi('1'),tls = True,tlsCAFile=certifi.where())

mongoDB = None

try:
    mongoDBClient.admin.command("ping")
    print("Mongo DB Connection Successful.")
    mongoDB = mongoDBClient["ExpenseTracker"]
    
except Exception as e:
    logging.exception(str(e))
    raise Exception("Mongo DB Connection Failed.")
