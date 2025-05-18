from django.db import models 
# from django.contrib.auth.admin import PermissionsMixin
from django.contrib.auth.models import AbstractBaseUser,PermissionsMixin
from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import gettext_lazy as _  #For real time translation to local language of user
from django.core.validators import RegexValidator

letters_only_validator = RegexValidator(
    regex='^[a-zA-Z]*$',
    message=_('Username must contain only letters (a-z, A-Z).'),
    code='invalid_username'
)

# Create your models here.

class CustomUserManager(BaseUserManager):
    
    def create_user(self,username,email,password=None,**extra_fields):
        if not username:
            raise ValueError(_('setting username is mendatory'))
        if not email:
          raise ValueError(_('setting email is mendatory'))
    
        email =self.normalize_email(email)
        user=self.model(username=username,email=email,**extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        
        return user
    
    
    def create_superuser(self,username,email,password=None,**extra_fields):
        extra_fields.setdefault('is_staff',True)
        extra_fields.setdefault('is_superuser',True)
        
        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))
       
        return self.create_user(username,email,password,**extra_fields)







class User(AbstractBaseUser,PermissionsMixin):
    # username, email, password, profile_pic, first_name, last_name
    username=models.CharField(
        max_length=40,
        unique=True,
        # primary_key=True,
        validators=[letters_only_validator] # Using custom validator for charater only input,
        
    )
    email=models.EmailField( _('email address'),unique=True,max_length=128,help_text=_('Required. 8 characters or more'))
    password=models.CharField( _('password'),max_length=128)
    profile_pic=models.ImageField( _('profile picture'), blank=True, null=True,
        upload_to='profile_pics/',
        default='profile_pics/default.jpg',
        help_text=_('Upload a profile picture (optional).')
    )
     
    # Required fields for custom user model
    is_active = models.BooleanField( _('active'), default=True, help_text=_('Designates whether this user should be treated as active.'))
    
    is_staff = models.BooleanField(_('staff status'), default=False, help_text=_('Designates whether the user can log into this admin site.'))
    date_joined = models.DateTimeField(_('date joined'), auto_now_add=True)
    
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    objects = CustomUserManager()

    def __str__(self):
        return self.username
    
    # to setisfy simple_jwt
    # @property
    # def id(self):
    #     return self.username
    






