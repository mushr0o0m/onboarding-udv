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
            task_dict = {'id': task.id,
                         'worker_id': task.worker_id,
                         'name': task.name,
                         'result': task.result,
                         'is_completed': task.is_completed,
                         'subtasks': subtasks_list}
            tasks_list.append(TaskSerializer(task_dict).data)
        return Response({'tasks': tasks_list})

    def post(self, request):
        serializer = SubtaskSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'post': serializer.data})

    def put(self, request, *args, **kwargs):
        pk = kwargs.get("pk", None)
        if not pk:
            return Response({"error": "Method PUT not allowed"})
        try:
            instance = Subtask.objects.get(pk=pk)
        except:
            return Response({"error": "Object does not exists"})

        serializer = SubtaskSerializer(data=request.data, instance=instance)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'post': serializer.data})

    def delete(self, request, *args, **kwargs):
        pk = kwargs.get("pk", None)
        if not pk:
            return Response({"error": "Method PUT not allowed"})
        try:
            instance = Subtask.objects.get(pk=pk)
        except:
            return Response({"error": "Object does not exists"})

        instance = Subtask.objects.get(id=pk)
        instance.delete()
        return Response({'delete': 'ok'})


class WorkersView(APIView):
    def get(self, request):
        hr = Hr.objects.get(user_id=request.user.id)
        workers = Worker.objects.filter(hr_id=hr.id)

        return Response({'workers': WorkersSerializer(workers, many=True).data})


class WhoView(APIView):
    def get(self, request):
        return Response({'who': request.user.who})
