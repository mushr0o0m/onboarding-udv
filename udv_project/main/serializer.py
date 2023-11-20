from rest_framework import serializers
from .models import *


class SubtaskSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    task_id = serializers.SlugRelatedField(queryset=Task.objects.all(), slug_field='id')
    name = serializers.CharField()
    result = serializers.CharField()
    is_completed = serializers.BooleanField()

    def create(self, validated_data):
        return Subtask.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.id = validated_data.get("id", instance.id)
        instance.task_id = validated_data.get("task_id", instance.task_id)
        instance.name = validated_data.get("name", instance.name)
        instance.result = validated_data.get("result", instance.result)
        instance.is_completed = validated_data.get("is_completed", instance.is_completed)
        instance.save()
        return instance


class TaskSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    worker_id = serializers.IntegerField()
    name = serializers.CharField()
    result = serializers.CharField()
    is_completed = serializers.BooleanField()
    subtasks = serializers.JSONField()


class WorkersSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    surname = serializers.CharField()
    patronumic = serializers.CharField()
    hr_id = serializers.IntegerField()
    jobTitle = serializers.CharField()
    employmentDate = serializers.DateField()
    email = serializers.CharField()
    user_id = serializers.IntegerField()
    tasks = serializers.JSONField()
    # hr_id = serializers.SlugRelatedField(queryset=Hr.objects.all(), slug_field='id')
    # user_id = serializers.SlugRelatedField(read_only=True, slug_field='id')
