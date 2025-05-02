from django.urls import path
from .views import LoginView, RegisterView
from dataclasses import dataclass

@dataclass
class UrlNames:
    Login = 'login'
    Register = 'register'


urlpatterns = [
    path('login/', LoginView.as_view(), name=UrlNames.Login),
    path('register/', RegisterView.as_view(), name=UrlNames.Register),
]
