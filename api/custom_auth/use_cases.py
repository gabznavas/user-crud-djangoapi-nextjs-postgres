from .serializers import LoginSerializer
from user.serializers import UserSerializer
from user.models import User
from django.contrib.auth import authenticate
import jwt
from django.conf import settings
from datetime import datetime, timedelta
from django.core.cache import cache

class AuthUseCase:
    def login(self, data: dict) -> tuple[str, dict]:
        serializer = LoginSerializer(data=data)
        if not serializer.is_valid():
            return None, serializer.errors
        user_data: dict = serializer.validated_data

        user = authenticate(email=user_data['email'], password=user_data['password'])
        if user is None:
            return None, {'details': 'Credenciais inválidas.'}
        
        token_jwt = self.__get_jwt_token(user_data)

        return token_jwt, None


    def register(self, data: dict) -> tuple[str, dict]:
        serializer = UserSerializer(data=data)
        if not serializer.is_valid():
            return None, serializer.errors  
        user_data: dict = serializer.validated_data

        user_by_email = User.objects.filter(email=user_data['email']).first()
        if user_by_email:
            return None, {'details': 'Usuário já existe com esse e-mail.'}   
        
        user = User.objects.create(
            email=user_data['email'],
            fullname=user_data['fullname']
        )
        user.set_password(user_data['password'])
        user.save()
    
        user: dict = serializer.validated_data
        token_jwt = self.__get_jwt_token(user_data)

        keys = cache.keys(f"get_users*")
        cache.delete_many(keys)

        return token_jwt, None


    def __get_jwt_token(self, user: dict) -> str:
        jwt_payload = {
            'sub': user['email'],
            'exp': datetime.now() + timedelta(days=1),
            'iat': datetime.now(), 
        }
        jwt_token = jwt.encode(jwt_payload, settings.SECRET_KEY)
        return jwt_token