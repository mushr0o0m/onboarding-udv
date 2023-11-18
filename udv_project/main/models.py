from django.db import models


# Create your models here.

class YouTubeVideo(models.Model):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=100, blank=True)
    channel = models.ForeignKey('Channel', on_delete=models.PROTECT)


class Channel(models.Model):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=100, blank=True)
