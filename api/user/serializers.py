from rest_framework import serializers
from django.contrib.auth import get_user_model

# Obtém o modelo User personalizado
User = get_user_model()

min_password_length = 8

class UserModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # Define quais campos serão serializados
        fields = ['id', 'fullname', 'email', 'created_at', 'updated_at']
        # Define campos que não podem ser alterados
        read_only_fields = ['id', 'created_at', 'updated_at']
        # Define campos extras para validação
        extra_kwargs = {
            'email': {'required': True},
            'fullname': {'required': True}
        }

class UserSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True)
    fullname = serializers.CharField(max_length=200, required=True)

    allowed_domains = ['gmail.com', 'hotmail.com']
    
    def validate_password(self, value):
        if len(value) < min_password_length:
            raise serializers.ValidationError(f"Password must be at least {min_password_length} characters long")
        return value
    
    def validate_email(self, email):
        domain = email.split('@')[1]
        
        if domain not in self.allowed_domains:
            raise serializers.ValidationError(f"Email domain not allowed. Allowed domains: {', '.join(self.allowed_domains)}")
        
        return email
    
    def validate_fullname(self, fullname):
        if len(fullname.split(' ')) < 2:
            raise serializers.ValidationError("Fullname must be at least 2 words")
        return fullname
    