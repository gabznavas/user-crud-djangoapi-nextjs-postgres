from dotenv import load_dotenv
import os

load_dotenv()

class Config:
    MONGO_URL = os.getenv('MONGO_URL')
    RABBITMQ_URL = os.getenv('RABBITMQ_URL')
