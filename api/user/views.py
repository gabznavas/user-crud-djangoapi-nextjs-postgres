from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status
from .use_cases import UserManagementUseCase
from custom_auth.authentication import JWTAuthentication
from custom_auth.permissions import IsAuthenticated, IsAdmin
from rest_framework.decorators import permission_classes, authentication_classes

user_usecase = UserManagementUseCase()

class UserListView(APIView):

    @authentication_classes([JWTAuthentication])
    @permission_classes([IsAuthenticated])
    def get(self, request: Request) -> Response:
        users_data = user_usecase.get_users()
        return Response(users_data)

class UserGetUpdateDeleteView(APIView):

    @authentication_classes([JWTAuthentication])
    @permission_classes([IsAuthenticated])
    def get(self, request: Request, id: int) -> Response:
        user = user_usecase.get_user(id)
        
        if user is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(user)

    @authentication_classes([JWTAuthentication])
    @permission_classes([IsAuthenticated])
    def put(self, request: Request, id: int) -> Response:
        errors = user_usecase.update_user(id, request.data)
        if errors is not None:
            return Response(errors, status=status.HTTP_400_BAD_REQUEST)
       
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    @authentication_classes([JWTAuthentication])
    @permission_classes([IsAdmin])
    def delete(self, request: Request, id: int) -> Response:
        errors = user_usecase.delete_user(id)
        if errors is not None:
            return Response(errors, status=status.HTTP_404_NOT_FOUND)
        return Response(status=status.HTTP_204_NO_CONTENT)
    