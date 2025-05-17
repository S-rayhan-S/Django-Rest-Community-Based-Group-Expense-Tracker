from django.shortcuts import render

from .models import CustomUser
from .serializers import RegisterSerializer
from rest_framework import generics

# Create your views here.

class RegisterView(generics.CreateAPIView):
    queryset=CustomUser.objects.all()
    serializer_class=RegisterSerializer






