from django.shortcuts import render
from rest_framework.views import APIView
from .models import *
from .serializer import *
from rest_framework import viewsets, mixins
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet


class TasksListView(APIView):
    def get(self, request):
        worker = Worker.objects.get(user_id=request.user.id)
        tasks = Task.objects.filter(worker_id=worker.id)
        tasks_list = []

        for task in tasks:
            subtasks_list = []
            subtasks = Subtask.objects.filter(task_id=task.id)
            for subtask in subtasks:
                subtasks_list.append(SubtaskReadSerializer(subtask).data)
            task_dict = {'id': task.id,
                         'worker_id': task.worker_id,
                         'name': task.name,
                         'is_completed': task.is_completed,
                         'subtasks': subtasks_list}
            tasks_list.append(TasksListSerializer(task_dict).data)
        return Response({'tasks': tasks_list})

    def post(self, request):
        serializer = SubtaskSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        inst = serializer.save()
        return Response({'post': serializer.data, 'subtask_id': inst.id})

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

    def patch(self, request, *args, **kwargs):
        pk = kwargs.get("pk", None)
        if not pk:
            return Response({"error": "Method PATCH not allowed"})
        instance = Subtask.objects.get(pk=pk)
        instance.is_completed = bool(request.data['is_completed'])
        instance.save()

        return Response({'post': SubtaskSerializer(instance).data})

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


class WorkerListView(APIView):
    def get(self, request):
        hr = Hr.objects.get(user_id=request.user.id)
        workers = Worker.objects.filter(hr_id=hr.id)
        workers_list = []
        for worker in workers:
            user = User.objects.get(id=worker.user_id)

            tasks = Task.objects.filter(worker_id=worker.id)
            tasks_list = []

            for task in tasks:
                subtasks_list = []
                subtasks = Subtask.objects.filter(task_id=task.id)
                for subtask in subtasks:
                    subtasks_list.append(SubtaskReadSerializer(subtask).data)
                task_dict = {'id': task.id,
                             'name': task.name,
                             'is_completed': task.is_completed,
                             'subtasks': subtasks_list}
                tasks_list.append(TasksListSerializer(task_dict).data)

            workers_list.append(WorkersSerializer({'id': worker.id,
                                                   'name': worker.name,
                                                   'surname': worker.surname,
                                                   'patronymic': worker.patronymic,
                                                   'hr_id': worker.hr_id,
                                                   'jobTitle': worker.jobTitle,
                                                   'employmentDate': worker.employmentDate,
                                                   'email': user.email,
                                                   'user_id': user.id,
                                                   'tasks': tasks_list
                                                   }).data)

        return Response({'workers': workers_list})


class WhoView(APIView):
    def get(self, request):
        return Response({'who': request.user.who})


class WorkerView(APIView):

    def post(self, request):
        data = request.data
        user = User.objects.create_user(email=data['email'], password='Postupila_000')
        worker = Worker.objects.get(user_id=user.id)

        worker.name = data['name']
        worker.surname = data['surname']
        worker.patronymic = data['patronymic']
        worker.jobTitle = data['jobTitle']
        worker.employmentDate = data['employmentDate'][:10].replace('.', '-')
        worker.hr_id = Hr.objects.get(user_id=request.user.id)
        worker.save()

        tasklist = []
        tasks = data['tasks']
        for task in tasks:
            tasklist.append(TasksReadSerializer(Task.objects.create(worker_id=worker,
                                                                    name=task['name'],
                                                                    is_completed=False)).data)

        return Response({'worker': WorkersSerializer({'id': worker.id,
                                                      'name': worker.name,
                                                      'surname': worker.surname,
                                                      'patronymic': worker.patronymic,
                                                      'hr_id': worker.hr_id,
                                                      'jobTitle': worker.jobTitle,
                                                      'employmentDate': worker.employmentDate,
                                                      'email': user.email,
                                                      'user_id': user.id,
                                                      'tasks': tasklist
                                                      }).data
                         })

    def get(self, request, *args, **kwargs):
        pk = kwargs.get("pk", None)
        worker = Worker.objects.get(id=pk)
        hr = Hr.objects.get(id=worker.hr_id)
        user = User.objects.get(id=worker.user_id)
        tasks = Task.objects.filter(worker_id=worker.id)
        tasks_list = []

        for task in tasks:
            subtasks_list = []
            subtasks = Subtask.objects.filter(task_id=task.id)
            for subtask in subtasks:
                subtasks_list.append(SubtaskReadSerializer(subtask).data)
            task_dict = {'id': task.id,
                         'worker_id': task.worker_id,
                         'name': task.name,
                         'result': task.result,
                         'is_completed': task.is_completed,
                         'subtasks': subtasks_list}
            tasks_list.append(TasksListSerializer(task_dict).data)

        return Response({'worker': WorkersSerializer({'id': worker.id,
                                                      'name': worker.name,
                                                      'surname': worker.surname,
                                                      'patronymic': worker.patronymic,
                                                      'hr_id': hr.id,
                                                      'jobTitle': worker.jobTitle,
                                                      'employmentDate': worker.employmentDate,
                                                      'email': user.email,
                                                      'user_id': user.id,
                                                      'tasks': tasks_list
                                                      }).data})

    def put(self, request, *args, **kwargs):
        pk = kwargs.get("pk", None)
        if not pk:
            return Response({"error": "Method PUT not allowed"})

        instance = Worker.objects.get(pk=pk)

        serializer = WorkerPutSerializer(data=request.data, instance=instance)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'post': serializer.data})

    def delete(self, request, *args, **kwargs):
        pk = kwargs.get("pk", None)
        if not pk:
            return Response({"error": "Method PUT not allowed"})
        try:
            instance = Worker.objects.get(pk=pk)
        except:
            return Response({"error": "Object does not exists"})

        instance = Worker.objects.get(id=pk)
        instance.delete()
        return Response({'delete': 'ok'})


class TaskView(APIView):
    def get(self, request, *args, **kwargs):
        pk = kwargs.get("pk", None)
        worker = Worker.objects.get(pk=pk)
        tasks = Task.objects.filter(worker_id=worker.id)
        return Response({'tasks': TasksReadSerializer(tasks, many=True).data})

    def post(self, request):
        serializer = TasksSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        inst = serializer.save()
        return Response({'post': serializer.data, 'task_id': inst.id})

    def put(self, request, *args, **kwargs):
        pk = kwargs.get("pk", None)
        if not pk:
            return Response({"error": "Method PUT not allowed"})

        instance = Task.objects.get(pk=pk)
        data = {"worker_id": instance.worker_id,
                "name": request.data["name"],
                "is_completed": request.data["is_completed"]}
        serializer = TasksSerializer(data=data, instance=instance)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'post': serializer.data})

    def patch(self, request, *args, **kwargs):
        pk = kwargs.get("pk", None)
        if not pk:
            return Response({"error": "Method PATCH not allowed"})
        instance = Task.objects.get(pk=pk)
        instance.is_completed = bool(request.data['is_completed'])
        instance.save()

        return Response({'post': TasksSerializer(instance).data})

    def delete(self, request, *args, **kwargs):
        pk = kwargs.get("pk", None)
        if not pk:
            return Response({"error": "Method PUT not allowed"})
        try:
            instance = Task.objects.get(pk=pk)
        except:
            return Response({"error": "Object does not exists"})

        instance = Task.objects.get(pk=pk)
        instance.delete()
        return Response({'delete': 'ok'})


class NameUser(APIView):
    def get(self, request, *args, **kwargs):
        user = User.objects.get(id=request.user.id)
        if user.who == 'WR':
            worker = Worker.objects.get(user_id=user.id)
            return Response({'name': worker.name,
                             'surname': worker.surname,
                             'patronymic': worker.patronymic})
        else:
            hr = Hr.objects.get(user_id=user.id)
            return Response({'name': hr.name})
