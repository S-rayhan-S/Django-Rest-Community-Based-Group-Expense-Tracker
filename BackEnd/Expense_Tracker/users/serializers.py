
from rest_framework import serializers
from .models import CustomUser


class RegisterSerializer(serializers.ModelSerializer):
    
    password=serializers.CharField(write_only=True)
    
    class Meta:
        
        model=CustomUser
        fields=['username', 'email', 'password', 'profile_pic' ]
        extra_kwargs={
            'profile_pic':{'required':False}
        }
    def create(self, validated_data):
        password=validated_data.pop('password') # poping pass as it needs extra care like hashing before saving & ensuring it is not contained in the dictionary accidentaly
        user=CustomUser(**validated_data) # unpacks the dict validated data
        user.set_password(password)
        user.save()
        return user








