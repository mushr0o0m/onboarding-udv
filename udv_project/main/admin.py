from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(User)
admin.site.register(Hr)
admin.site.register(Worker)
admin.site.register(Task)
admin.site.register(Subtask)
admin.site.register(Contact)
admin.site.register(Project)
