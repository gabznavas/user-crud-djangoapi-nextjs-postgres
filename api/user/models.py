from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

class User(AbstractUser):
    fullname = models.CharField(_('full name'), max_length=150)
    email = models.EmailField(_('email address'), unique=True)
    created_at = models.DateTimeField(_('created at'), auto_now_add=True)
    updated_at = models.DateTimeField(_('updated at'), auto_now=True)

    username = None
    first_name = None
    last_name = None
    date_joined = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['fullname']

    class Meta:
        db_table = "users"
        verbose_name = "Usuário"
        verbose_name_plural = "Usuário"
        ordering = ["-created_at"]

    def __str__(self):
        return self.email
