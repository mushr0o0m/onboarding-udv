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
    path('admin/', admin.site.urls),  # админ панель целиком
    path('api/auth/', include('djoser.urls')),  # авторизация
    re_path(r'^auth/', include('djoser.urls.authtoken')),  # авторизация

    path('api/tasklist/', TasksListView.as_view()),  # get - возвращает список tasks со вложенными subtasks для worker
                                                     # по токену
                                                     # post - создаёт subtask
    path('api/tasklist/<int:pk>/', TasksListView.as_view()),  # put/delete - изменение/удаление subtask по subtask id

    path('api/workerlist/', WorkerListView.as_view()),  # get - возвращает список workers о всеми влложениями
                                                        # для hr по токену

    path('api/who/', WhoView.as_view()),  # get - возвращает поле who юзера
    path('api/worker/', WorkerView.as_view()),  # post - создание user и соответственно worker

    path('api/worker/<int:pk>/', WorkerView.as_view()),  # get/put/delete -  возвращает/изменяет/удаляет конкретного
                                                         # worker по worker id

    path('api/tasks/', TaskView.as_view()),  # post - создание task
    path('api/tasks/<int:pk>/', TaskView.as_view()),  # get - возвращает список tasks без subtasks для worker id
                                                      # put/delete - изменение/удаление task по task id

    path('api/name/', NameUser.as_view()),  # get - возвращает ФИО или только имя по токену. Работает для hr и worker

    path('api/contacts/', ContactView.as_view()),
    path('api/contacts/<int:pk>/', ContactView.as_view()),

    path('api/projects/', ProjectView.as_view()),
    path('api/projects/<int:pk>/', ProjectView.as_view()),
    path('api/first_day/', FirstDayView.as_view()),
    path('api/first_day/<int:pk>/', FirstDayView.as_view()),
    path('api/game/', GameView.as_view()),
    path('api/game/<int:game_object>/', GameView.as_view()),
    path('api/is_onboarding_over/', IsOnboardingOverView.as_view()),
    path('api/stars/', StarsView.as_view())
]
