import os
import pymongo
import pymongo.errors 

from dotenv import load_dotenv

env_loaded = load_dotenv()

def test_connection():
    # Test connection to see if it takes > 5s to connect
    try:
        pymongo.MongoClient(os.environ["MONGODB_HOST_URL"], serverSelectionTimeoutMS = 5000).server_info()
        return 200
    except pymongo.errors.ServerSelectionTimeoutError:
        return 408
    except Exception as e: 
        return 500
    
mongodb_client = pymongo.MongoClient(os.environ["MONGODB_HOST_URL"])
