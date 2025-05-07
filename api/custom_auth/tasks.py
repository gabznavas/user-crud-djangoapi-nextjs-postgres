from celery import shared_task

@shared_task
def handle_new_user_event(user_id, email):
    print(f"[CELERY] Novo usuário recebido: id={user_id}, email={email}")
