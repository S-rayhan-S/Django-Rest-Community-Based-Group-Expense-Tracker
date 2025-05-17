from django.test import TestCase
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from users.models import CustomUser
from rest_framework_simplejwt.tokens import RefreshToken


# Create your tests here.
class AuthTests(APITestCase):
    
    def setUp(self):
        self.register_url=reverse('register')
        self.token_url=reverse('token_obtain_pair')
        self.user_data = {
            'username': 'testuser',
            'email': 'test@example.com',
            'password': 'securepassword123'
        }
        self.user=CustomUser.objects.create_user(**self.user_data)
    
    def test_user_registration_success(self):
        response=self.client.post(self.register_url,{
            'username': 'newuser',
            'email': 'new@example.com',
            'password': 'newpass123'
        })   
        self.assertEqual(response.status_code,status.HTTP_201_CREATED)  
        self.assertEqual(CustomUser.objects.count(),2)

    def test_user_registration_duplicate_username(self):
        response=self.client.post(self.register_url,self.user_data)
        self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)
        
    def test_login_success(self):
        response=self.client.post(self.token_url,{
            'username': 'testuser',
            'password': 'securepassword123'
        })
        self.assertEqual(response.status_code,status.HTTP_200_OK)
        self.assertIn('access',response.data)
        self.assertIn('refresh',response.data)
    
    def test_login_invalid_credentials(self):
        response = self.client.post(self.token_url,{
            'username': 'testuser',
            'password': 'wrongpass'
        })
        self.assertEqual(response.status_code,status.HTTP_401_UNAUTHORIZED)





