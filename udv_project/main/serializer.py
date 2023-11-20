from rest_framework import serializers
from .models import *


class SubtaskSerializer(serializers.Serializer):
    task_id = serializers.IntegerField()
    text = serializers.CharField()
    result = serializers.CharField()
    is_completed = serializers.BooleanField()

    def create(self, validated_data):
        return Subtask.objects.create(**validated_data)


class TaskSerializer(serializers.Serializer):
    worker_id = serializers.IntegerField()
    text = serializers.CharField()
    result = serializers.CharField()
    is_completed = serializers.BooleanField()
    subtasks = serializers.JSONField()
