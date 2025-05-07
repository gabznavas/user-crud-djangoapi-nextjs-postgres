# consumer.py
from celery import Celery

app = Celery('consumer', broker='amqp://guest:guest@localhost:5672//')

@app.task(name='custom_auth.tasks.handle_new_user_event')
def handle_new_user_event(user_id, email):
    print(f"[CONSUMIDOR] Novo usuário: {user_id}, {email}")
