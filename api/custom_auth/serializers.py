from rest_framework import serializers
from user.serializers import UserSerializer
from user.serializers import min_password_length

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True)

    def validate_password(self, value):
        if len(value) < min_password_length:
            raise serializers.ValidationError(f"Password must be at least {min_password_length} characters long")
        return value
    