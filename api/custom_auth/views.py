from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .use_cases import AuthUseCase

use_case = AuthUseCase()

class LoginView(APIView):
    def post(self, request):
        token, errors = use_case.login(request.data)
        if errors:
            return Response(errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({'token': token})
            

class RegisterView(APIView):
    def post(self, request):
        token, errors = use_case.register(data=request.data)
        if errors:
            return Response(errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({'token': token}, status=status.HTTP_201_CREATED)
