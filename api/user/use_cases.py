from .models import User
from .serializers import UserModelSerializer, UserSerializer
from django.db.models import Q
from django.core.paginator import Paginator
from django.core.paginator import Page
from django.core.cache import cache

class UserManagementUseCase:
    def get_users(self, page: int, page_size: int, query: str) -> list[dict]:   
        key_redis = f'get_users:data:{page}:{page_size}:{query}'
        redis_cache = cache.get(key_redis)
        if redis_cache is not None:
            return redis_cache

        users_query = User.objects.filter(is_active=True)
        if query:
            users_query = users_query.filter(Q(fullname__icontains=query) | Q(email__icontains=query))
        users_query = users_query.order_by('-created_at')
        
        paginator = Paginator(users_query, page_size)
        
        try:
            # Aqui é executada a query com LIMIT e OFFSET
            page_obj = paginator.page(page)

            # Aqui é executado o COUNT(*)
            user_count = paginator.count
            print("Query após page():", str(page_obj.object_list.query))
            
            serializer = UserModelSerializer(page_obj.object_list, many=True)
            data= self.build_response(serializer.data, page_obj, page_size, user_count, paginator)
            cache.set(key_redis, data)
            return data
        except:
            # Se a página não existir, retorna a primeira página
            page_obj = paginator.page(1)
            serializer = UserModelSerializer(page_obj.object_list, many=True)
            
            return self.build_response(serializer.data, page_obj, page_size, user_count, paginator)

    def build_response(self, data: list[dict], page_obj: Page, page_size: int, user_count: int, paginator: Paginator) -> dict:
        return {
            'data': data,
            'page': page_obj.number,
            'page_size': page_size,
            'total': user_count,
            'total_pages': paginator.num_pages,
            'has_next': page_obj.has_next(),
            'has_previous': page_obj.has_previous(),
            'next': page_obj.next_page_number() if page_obj.has_next() else None,
            'previous': page_obj.previous_page_number() if page_obj.has_previous() else None
        }

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
            return {'details': 'Usuário não encontrado.'}
        
        if not user.is_active:
            return {'details': 'Usuário não está ativo.'}

        serializer = UserSerializer(user, data=user_data)
        if not serializer.is_valid():
            return serializer.errors
        
        user_by_email = User.objects.filter(email=user_data['email']).first()
        if user_by_email and user_by_email.id != user_id:
            return {'details': 'E-mail já está em uso.'}
        
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
            return {'details': 'Usuário não encontrado.'}
        
        if User.objects.filter(is_active=True).count() == 1:
            return {'details': 'Não é possível deletar o único usuário existente.'}
        
        user.is_active = False
        user.save()
        return None 