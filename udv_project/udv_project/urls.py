"""
URL configuration for udv_project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.urls import re_path as url

from main.views import *
from rest_framework import routers

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('djoser.urls')),
    re_path(r'^auth/', include('djoser.urls.authtoken')),
    path('api/tasklist/', TasksView.as_view()),
    path('api/tasklist/<int:pk>/', TasksView.as_view()),
    path('api/workers/', WorkersView.as_view()),
    path('api/who/', WhoView.as_view()),
    path('api/worker/<int:pk>/', WorkerView.as_view()),
    path('api/tasks/', OnlyTasksView.as_view()),
    path('api/tasks/<int:pk>/', OnlyTasksView.as_view())
]
