from celery import Celery
from log.logs import log_user_created
from config import Config

app = Celery('consumer', broker=Config.RABBITMQ_URL)

@app.task(name='custom_auth.tasks.handle_new_user_event')
def handle_new_user_event(user_id: int, email: str):
    log_user_created(user_id, email)
    print(f"[CONSUMIDOR] Novo usuário: {user_id}, {email}")
