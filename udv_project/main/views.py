from django.shortcuts import render
from rest_framework.views import APIView
from .models import *
from .serializer import *
from rest_framework import viewsets, mixins
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet


class TasksView(APIView):
    def get(self, request):
        tasks = Task.objects.filter(worker_id=request.user.id)
        tasks_list = []

        for task in tasks:
            subtasks_list = []
            subtasks = Subtask.objects.filter(task_id=task.id)
            for subtask in subtasks:
                subtasks_list.append(SubtaskSerializer(subtask).data)
            task_dict = {'worker_id': task.worker_id,
                         'text': task.text,
                         'result': task.result,
                         'is_completed': task.is_completed,
                         'subtasks': subtasks_list}
            tasks_list.append(TaskSerializer(task_dict).data)
        return Response({'tasks': tasks_list})
