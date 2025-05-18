
from rest_framework import serializers
from .models import User

from django.contrib.auth import authenticate


class RegisterSerializer(serializers.ModelSerializer):
    
    password=serializers.CharField(write_only=True)
    
    class Meta:
        
        model=User
        fields=['username', 'email', 'password', 'profile_pic' ]
        extra_kwargs={
            'profile_pic':{'required':False}
        }
    def create(self, validated_data):
        password=validated_data.pop('password') # poping pass as it needs extra care like hashing before saving & ensuring it is not contained in the dictionary accidentaly
        user=User(**validated_data) # unpacks the dict validated data
        user.set_password(password)
        user.save()
        return user

class LoginSerializer(serializers.Serializer):
    
    email=serializers.EmailField()
    password=serializers.CharField(write_only=True)
    
    def validate(self, attrs):
        email=attrs.get('email')
        password=attrs.get('password')
        user=authenticate(email=email,password=password)
        
        if user is None:
            raise serializers.ValidationError('Invalid email or password')
        
        attrs['user']=user
        return attrs
        
    








