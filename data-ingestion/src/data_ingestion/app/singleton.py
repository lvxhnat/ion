import os
import pymongo
from dotenv import load_dotenv

env_loaded = load_dotenv()
mongodb_client = pymongo.MongoClient(os.environ["MONGODB_HOST_URL"])
