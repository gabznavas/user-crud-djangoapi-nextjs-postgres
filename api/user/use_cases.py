from .models import User
from .serializers import UserModelSerializer, UserSerializer


class UserManagementUseCase:
    def get_users(self) -> list[dict]:
        users = User.objects.filter(is_active=True)
        serializer = UserModelSerializer(users, many=True)
        return serializer.data

    def get_user(self, user_id: int) -> dict:
        try:
            user: User = User.objects.get(pk=user_id)
            if not user.is_active:
                raise User.DoesNotExist
        except User.DoesNotExist:
            return None
        
        serializer = UserModelSerializer(user)
        return serializer.data

    def update_user(self, user_id: int, user_data: dict) -> dict | None:
        try:
            user: User = User.objects.get(pk=user_id)
            if not user.is_active:
                raise User.DoesNotExist
        except User.DoesNotExist:
            return {'error': 'User not found'}

        serializer = UserSerializer(user, data=user_data)
        if not serializer.is_valid():
            return serializer.errors
        
        user_by_email = User.objects.filter(email=user_data['email']).first()
        if user_by_email and user_by_email.id != user_id:
            return {'error': 'Email already exists'}
        
        user.fullname = user_data['fullname']
        user.email = user_data['email']
        user.set_password(user_data['password'])
        user.save()

        return None

    def delete_user(self, user_id: int) -> dict | None:
        try:
            user: User = User.objects.get(pk=user_id)
            if not user.is_active:
                raise User.DoesNotExist
        except User.DoesNotExist:
            return {'error': 'User not found'}
        
        user.is_active = False
        user.save()
        return None 