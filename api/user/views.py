from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status
from .use_cases import GetUsersUseCase, UpdateUserUseCase, DeleteUserUseCase
from custom_auth.authentication import JWTAuthentication
from custom_auth.permissions import IsAuthenticated, IsAdmin
from rest_framework.decorators import permission_classes

get_users_usecase = GetUsersUseCase()
update_user_usecase = UpdateUserUseCase()
delete_user_usecase = DeleteUserUseCase()

class UserListView(APIView):
    authentication_classes = [JWTAuthentication]

    @permission_classes([IsAuthenticated])
    def get(self, request: Request) -> Response:
        try:
            page = int(request.query_params.get('page', '1'))
            page_size = int(request.query_params.get('page_size', '10'))
        except ValueError:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        query = request.query_params.get('query', '')
        users_data = get_users_usecase.get_users(page, page_size, query)
        return Response(users_data)


class UserGetLoggedView(APIView):
    authentication_classes = [JWTAuthentication]

    @permission_classes([IsAuthenticated])
    def get(self, request: Request) -> Response:
        user = get_users_usecase.get_user(request.user.id)
        
        if user is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(user)


class UserGetUpdateDeleteView(APIView):
    authentication_classes = [JWTAuthentication]

    @permission_classes([IsAuthenticated])
    def get(self, _: Request, id: int) -> Response:
        user = get_users_usecase.get_user(id)
        
        if user is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(user)

    @permission_classes([IsAuthenticated])
    def put(self, request: Request, id: int) -> Response:
        errors = update_user_usecase.update_user(id, request.data)
        if errors is not None:
            return Response(errors, status=status.HTTP_400_BAD_REQUEST)
       
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    @permission_classes([IsAdmin])
    def delete(self, _: Request, id: int) -> Response:
        errors = delete_user_usecase.delete_user(id)
        if errors is not None:
            return Response(errors, status=status.HTTP_404_NOT_FOUND)
        return Response(status=status.HTTP_204_NO_CONTENT)
    