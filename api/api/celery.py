import os
from celery import Celery

# Define o settings do Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'api.settings')

app = Celery('api')

# Lê as configurações do Django com prefixo CELERY_
app.config_from_object('django.conf:settings', namespace='CELERY')

# Auto descobre tarefas em tasks.py dos apps registrados
app.autodiscover_tasks()