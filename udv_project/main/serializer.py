from rest_framework import serializers
from .models import *


class SubtaskSerializer(serializers.Serializer):
    task_id = serializers.SlugRelatedField(queryset=Task.objects.all(), slug_field='id')
    name = serializers.CharField()
    description = serializers.CharField(allow_blank=True, required=False)
    result = serializers.CharField()
    is_completed = serializers.BooleanField()

    def create(self, validated_data):
        return Subtask.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.task_id = validated_data.get("task_id", instance.task_id)
        instance.name = validated_data.get("name", instance.name)
        instance.result = validated_data.get("result", instance.result)
        instance.is_completed = validated_data.get("is_completed", instance.is_completed)
        instance.description = validated_data.get("description", instance.description)
        instance.save()
        return instance


class SubtaskReadSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    task_id = serializers.SlugRelatedField(queryset=Task.objects.all(), slug_field='id')
    name = serializers.CharField()
    description = serializers.CharField()
    result = serializers.CharField()
    is_completed = serializers.BooleanField()


class TasksListSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    is_completed = serializers.BooleanField()
    subtasks = serializers.JSONField()


class WorkersSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    surname = serializers.CharField()
    patronymic = serializers.CharField()
    telegram = serializers.CharField()
    hr_id = serializers.IntegerField()
    jobTitle = serializers.CharField()
    employmentDate = serializers.DateField()
    email = serializers.CharField()
    user_id = serializers.IntegerField()
    tasks = serializers.JSONField()


class WorkerPutSerializer(serializers.Serializer):
    name = serializers.CharField()
    surname = serializers.CharField()
    patronymic = serializers.CharField()
    telegram = serializers.CharField()
    jobTitle = serializers.CharField()
    employmentDate = serializers.DateField()
    hr_id = serializers.SlugRelatedField(queryset=Hr.objects.all(), slug_field='id')

    def update(self, instance, validated_data):
        instance.name = validated_data.get("name", instance.name)
        instance.surname = validated_data.get("surname", instance.surname)
        instance.patronymic = validated_data.get("patronymic", instance.patronymic)
        instance.telegram = validated_data.get("telegram", instance.telegram)
        instance.jobTitle = validated_data.get("jobTitle", instance.jobTitle)
        instance.employmentDate = validated_data.get("employmentDate", instance.employmentDate)
        instance.hr_id = validated_data.get("hr_id", instance.hr_id)
        instance.save()
        return instance


class TasksSerializer(serializers.Serializer):
    worker_id = serializers.SlugRelatedField(queryset=Worker.objects.all(), slug_field='id')
    name = serializers.CharField()
    is_completed = serializers.BooleanField()

    def create(self, validated_data):
        return Task.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.worker_id = validated_data["worker_id"]
        instance.name = validated_data["name"]
        instance.is_completed = validated_data["is_completed"]
        instance.save()
        return instance


class TasksReadSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    worker_id = serializers.IntegerField()
    name = serializers.CharField()
    is_completed = serializers.BooleanField()


class UserSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    email = serializers.CharField()
    who = serializers.CharField()


class ContactReadSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    surname = serializers.CharField()
    patronymic = serializers.CharField()
    email = serializers.CharField()
    telegram = serializers.CharField()
    jobTitle = serializers.CharField()


class ContactSerializer(serializers.Serializer):
    name = serializers.CharField()
    surname = serializers.CharField()
    patronymic = serializers.CharField()
    email = serializers.CharField()
    telegram = serializers.CharField()
    jobTitle = serializers.CharField()

    def create(self, validated_data):
        return Contact.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.email = validated_data["email"]
        instance.name = validated_data["name"]
        instance.surname = validated_data["surname"]
        instance.patronymic = validated_data["patronymic"]
        instance.telegram = validated_data["telegram"]
        instance.jobTitle = validated_data["jobTitle"]
        instance.save()
        return instance


class ProjectReadSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    description = serializers.CharField()
    desk_link = serializers.CharField()
    contacts = ContactReadSerializer(read_only=True, many=True)


class ProjectSerializer(serializers.Serializer):
    name = serializers.CharField()
    description = serializers.CharField()
    desk_link = serializers.CharField()

    def create(self, validated_data):
        return Project.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data["name"]
        instance.description = validated_data["description"]
        instance.desk_link = validated_data["desk_link"]
        instance.save()
        return instance

