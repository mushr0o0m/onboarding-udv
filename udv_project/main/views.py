from django.shortcuts import render
from rest_framework.views import APIView
from .models import *
from .serializer import *
from rest_framework import viewsets, mixins
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from django.conf import settings
from django.core.mail import send_mail
from password_generator import PasswordGenerator
from django.http import Http404


class TasksListView(APIView):
    def get(self, request):
        try:
            worker = Worker.objects.get(user_id=request.user.id)
        except:
            raise Http404
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
        try:
            instance = Subtask.objects.get(pk=pk)
        except:
            raise Http404

        serializer = SubtaskSerializer(data=request.data, instance=instance)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'post': serializer.data})

    def patch(self, request, *args, **kwargs):
        pk = kwargs.get("pk", None)
        try:
            instance = Subtask.objects.get(pk=pk)
        except:
            raise Http404
        instance.is_completed = bool(request.data['is_completed'])
        instance.save()

        return Response({'post': SubtaskSerializer(instance).data})

    def delete(self, request, *args, **kwargs):
        pk = kwargs.get("pk", None)
        try:
            instance = Subtask.objects.get(pk=pk)
        except:
            raise Http404

        instance = Subtask.objects.get(id=pk)
        instance.delete()
        return Response({'delete': 'ok'})


class WorkerListView(APIView):
    def get(self, request):
        try:
            hr = Hr.objects.get(user_id=request.user.id)
            workers = Worker.objects.filter(hr_id=hr.id)
        except:
            raise Http404
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
                                                   'telegram': worker.telegram,
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
        try:
            hr = Hr.objects.get(user_id=request.user.id)
        except:
            raise Http404

        '''pwo = PasswordGenerator()
        pwo.minlen = 8
        pwo.maxlen = 8
        pwo.minuchars = 2
        pwo.minlchars = 4
        pwo.minnumbers = 1
        pwo.minschars = 1
        password = pwo.generate()'''

        user = User.objects.create_user(email=data['email'], password='AB133777')  # password)

        '''send_mail('Регистрация на сервисе для онбординга UDV',
                  'Похоже вы недавно устроились на работу в UDV, поздравляем! Ваш Hr, ' + str(hr.name) +
                  ' уже вас зарегистрировал(а). Переходите скорее в сервис \nВаш пароль: ' + str(password) + '.',
                  settings.EMAIL_HOST_USER,
                  [data['email']])'''

        worker = Worker.objects.get(user_id=user.id)

        worker.name = data['name']
        worker.surname = data['surname']
        worker.patronymic = data['patronymic']
        worker.telegram = data['telegram']
        worker.jobTitle = data['jobTitle']
        worker.employmentDate = data['employmentDate'][:10].replace('.', '-')
        worker.hr_id = hr
        worker.save()

        contact = Contact.objects.create()
        contact.name = data['name']
        contact.surname = data['surname']
        contact.patronymic = data['patronymic']
        contact.email = data['email']
        contact.telegram = data['telegram']
        contact.jobTitle = data['jobTitle']
        contact.save()

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
                                                      'telegram': worker.telegram,
                                                      'hr_id': worker.hr_id,
                                                      'jobTitle': worker.jobTitle,
                                                      'employmentDate': worker.employmentDate,
                                                      'email': user.email,
                                                      'user_id': user.id,
                                                      'tasks': tasklist
                                                      }).data,
                         'contact': ContactReadSerializer(contact).data
                         })

    def get(self, request, *args, **kwargs):
        pk = kwargs.get("pk", None)
        try:
            worker = Worker.objects.get(id=pk)
            hr = Hr.objects.get(id=worker.hr_id)
            user = User.objects.get(id=worker.user_id)
        except:
            raise Http404
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

        return Response({'worker': WorkersSerializer({'id': worker.id,
                                                      'name': worker.name,
                                                      'surname': worker.surname,
                                                      'patronymic': worker.patronymic,
                                                      'telegram': worker.telegram,
                                                      'hr_id': hr.id,
                                                      'jobTitle': worker.jobTitle,
                                                      'employmentDate': worker.employmentDate,
                                                      'email': user.email,
                                                      'user_id': user.id,
                                                      'tasks': tasks_list
                                                      }).data})

    def put(self, request, *args, **kwargs):
        pk = kwargs.get("pk", None)
        try:
            instance = Worker.objects.get(pk=pk)
            user = User.objects.get(id=instance.user_id)
        except:
            raise Http404

        serializer = WorkerPutSerializer(data=request.data, instance=instance)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        request_data = request.data
        request_data.update({"email": user.email})

        serializer_contact = ContactSerializer(data=request.data, instance=instance)
        serializer_contact.is_valid(raise_exception=True)
        serializer_contact.save()
        return Response({'post': serializer.data,
                         'contact': serializer_contact.data})

    def delete(self, request, *args, **kwargs):
        pk = kwargs.get("pk", None)
        try:
            instance = Worker.objects.get(pk=pk)
        except:
            raise Http404

        instance = Worker.objects.get(id=pk)
        user = User.objects.get(id=instance.user_id)
        instance.delete()
        user.delete()
        return Response({'delete': 'ok'})


class TaskView(APIView):
    def get(self, request, *args, **kwargs):
        pk = kwargs.get("pk", None)
        try:
            worker = Worker.objects.get(pk=pk)
        except:
            raise Http404
        tasks = Task.objects.filter(worker_id=worker.id)
        return Response({'tasks': TasksReadSerializer(tasks, many=True).data})

    def post(self, request):
        serializer = TasksSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        inst = serializer.save()
        return Response({'post': serializer.data, 'task_id': inst.id})

    def put(self, request, *args, **kwargs):
        pk = kwargs.get("pk", None)
        try:
            instance = Task.objects.get(pk=pk)
        except:
            raise Http404
        data = {"worker_id": instance.worker_id,
                "name": request.data["name"],
                "is_completed": request.data["is_completed"]}
        serializer = TasksSerializer(data=data, instance=instance)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'post': serializer.data})

    def patch(self, request, *args, **kwargs):
        pk = kwargs.get("pk", None)
        try:
            instance = Task.objects.get(pk=pk)
        except:
            raise Http404
        instance.is_completed = bool(request.data['is_completed'])
        instance.save()

        return Response({'post': TasksSerializer(instance).data})

    def delete(self, request, *args, **kwargs):
        pk = kwargs.get("pk", None)
        try:
            instance = Task.objects.get(pk=pk)
        except:
            raise Http404
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
            return Response({'name': hr.name,
                             'surname': hr.surname,
                             'patronymic': hr.patronymic})


class ContactView(APIView):
    def get(self, request, *args, **kwargs):
        pk = kwargs.get("pk", None)
        try:
            contact = Contact.objects.get(pk=pk)
        except:
            raise Http404
        return Response({'post': ContactReadSerializer(contact).data})

    def post(self, request):
        try:
            serializer = ContactSerializer(data=request.data)
        except:
            raise Http404
        serializer.is_valid(raise_exception=True)
        inst = serializer.save()
        return Response({'post': serializer.data, 'contact_id': inst.id})

    def put(self, request, *args, **kwargs):
        pk = kwargs.get("pk", None)
        try:
            instance = Contact.objects.get(pk=pk)
        except:
            raise Http404

        serializer = ContactSerializer(data=request.data, instance=instance)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'post': serializer.data})

    def delete(self, request, *args, **kwargs):
        pk = kwargs.get("pk", None)
        try:
            instance = Contact.objects.get(pk=pk)
        except:
            raise Http404
        instance.delete()
        return Response({'delete': 'ok'})


class ProjectView(APIView):
    def get(self, request, *args, **kwargs):
        pk = kwargs.get("pk", None)
        try:
            contact = Project.objects.get(pk=pk)
        except:
            raise Http404
        return Response({'post': ProjectReadSerializer(contact).data})

    def post(self, request):
        serializer = ProjectSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        inst = serializer.save()
        for contact_id in request.data["contacts_ids"]:
            try:
                contact = Contact.objects.get(id=contact_id)
            except:
                raise Http404
            inst.contacts.add(contact)
        inst.save()
        return Response({'post': ProjectReadSerializer(inst).data, 'project_id': inst.id})

    def put(self, request, *args, **kwargs):
        pk = kwargs.get("pk", None)
        try:
            instance = Project.objects.get(pk=pk)
        except:
            raise Http404
        serializer = ProjectSerializer(data=request.data, instance=instance)
        serializer.is_valid(raise_exception=True)
        project = serializer.save()
        project.contacts.clear()
        for contact_id in request.data["contacts_ids"]:
            try:
                contact = Contact.objects.get(id=contact_id)
            except:
                raise Http404
            project.contacts.add(contact)
        project.save()
        return Response({'post': ProjectReadSerializer(project).data})

    def delete(self, request, *args, **kwargs):
        pk = kwargs.get("pk", None)
        try:
            instance = Project.objects.get(pk=pk)
        except:
            raise Http404
        instance.delete()
        return Response({'delete': 'ok'})
