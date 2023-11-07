from django.db import models

# Create your models here.

class YouTubeVideo(models.Model):
    title = models.CharField(max_length=100)
    channel = models.CharField(max_length=100)