from django.contrib import admin

# Register your models here.
from .models import Book, Disk, Bike

admin.site.register(Book)
admin.site.register(Disk)
admin.site.register(Bike)
