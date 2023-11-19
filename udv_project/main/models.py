from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import UserManager
from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import gettext_lazy as _
from .constants import WHO_CHOICE


class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password, who, **extra_fields):
        """
        Создает и сохраняет пользователя с введенным им email и паролем.
        """
        if not email:
            raise ValueError('email должен быть указан')

        email = self.normalize_email(email)
        user = self.model(email=email, who=who, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, who='WR', **extra_fields):
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, who, **extra_fields)

    def create_superuser(self, email, password, who='WR', **extra_fields):
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, who, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_('email'), unique=True)
    who = models.CharField(_('who'), max_length=2, choices=WHO_CHOICE)
    is_active = models.BooleanField(_('is_active'), default=True)
    is_staff = models.BooleanField(_('is_staff'), default=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')

    def get_full_name(self):
        '''
        Возвращает first_name и last_name с пробелом между ними.
        '''
        return self.email

    def get_short_name(self):
        '''
        Возвращает сокращенное имя пользователя.
        '''
        return self.email

    '''def email_user(self, subject, message, from_email=None, **kwargs):
        ''
        Отправляет электронное письмо этому пользователю.
        ''
        send_mail(subject, message, from_email, [self.email], **kwargs)'''

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if self.who:
            if self.who == 'WR' and not Worker.objects.filter(user=self).exists():
                Worker.objects.create(user=self)
            elif self.who == 'HR' and not Hr.objects.filter(user=self).exists():
                Hr.objects.create(user=self)


class Hr(models.Model):
    name = models.CharField(max_length=100)
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, verbose_name="Аккаунт пользователя")


class Worker(models.Model):
    name = models.CharField(max_length=100)
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, verbose_name="Аккаунт пользователя")


