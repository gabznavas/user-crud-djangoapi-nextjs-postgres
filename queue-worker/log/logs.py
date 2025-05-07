from datetime import datetime
from log.db import collection_logs

def log_user_created(user_id: int, email: str):
    try:
        collection_logs.insert_one({
            "user_id": user_id,
            "email": email,
            "created_at": datetime.now()
        })
        print("[LOG] Log de usuário criado com sucesso")
    except Exception as e:
        print("[ERRO] Falha ao inserir log:", e)
