from .models import *
from django import forms
from main.business_logic.constants import WHO_CHOICE
from django.contrib.auth import get_user_model


class SignupForm(forms.ModelForm):
    class Meta:
        model = get_user_model()
        fields = ['email', 'who']

    def signup(self, request, user):
        user.email = self.cleaned_data['email']
        user.who = self.cleaned_data['who']
        user.save()