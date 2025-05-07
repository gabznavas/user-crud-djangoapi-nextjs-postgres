from dotenv import load_dotenv
import os

load_dotenv()

class Config:
    MONGO_URL = os.getenv('MONGO_URL')
    RABBITMQ_URL = os.getenv('RABBITMQ_URL')
    EMAIL_ADDRESS = os.getenv('EMAIL_ADDRESS')
    EMAIL_PASSWORD = os.getenv('EMAIL_PASSWORD')