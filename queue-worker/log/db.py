from pymongo import MongoClient
from config import Config

client = MongoClient(Config.MONGO_URL)
db = client["crud-logs"]
collection_logs = db["logs"]
