from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models
from django.utils import timezone

'''
class ListUserManager(BaseUserManager):

    def create_user(self, email):
        ListUser.objects.create(email=email)

    def create_superuser(self, email, password):
        self.create_user(email)

'''
# class ListUser(AbstractBaseUser, PermissionsMixin):
class ListUser(models.Model):
    email = models.EmailField(primary_key=True)
    last_login = models.DateTimeField(default=timezone.now)

    USERNAME_FIELD = 'email'
    # REQUIRED_FIELDS = ['email', 'height']
    REQUIRED_FIELDS = ()

    def is_authenticated(self):
        return True

'''
    objects = ListUserManager()

    @property
    def is_staff(self):
        return self.email == 'harry.percival@example.com'

    @property
    def is_active(self):
        return True

'''