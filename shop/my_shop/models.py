from django.db import models
# Create your models here.

class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=100)
    gender = models.CharField(max_length=30)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    editorial = models.CharField(max_length=50)
    pub_date = models.DateField('Publication date')
    image = models.ImageField(upload_to='img',max_length=150, default='img/book.png')
    quantity = models.IntegerField(default=0)
    #String que se mostrara cuando se pregunte por los libros (objects.all)
    def __unicode__(self):
        return self.title + ", " + self.author


class Disk(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=100)
    gender = models.CharField(max_length=30)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    pub_date = models.DateField('Publication date')
    quantity = models.IntegerField(default=0)
    audio = models.FileField(upload_to='aud',max_length=150, default='aud/sample.mp3')
    def __unicode__(self):
        return self.title + ", " + self.author


class Bike(models.Model):
    model = models.CharField(max_length=200)
    brand = models.CharField(max_length=100)
    color = models.CharField(max_length=20)
    wheel_size = models.IntegerField(default=0)
    price = models.DecimalField(max_digits=7, decimal_places=2)
    video = models.FileField(upload_to='vid',max_length=150, default='vid/sample.mp4')
    quantity = models.IntegerField(default=0)
    def __unicode__(self):
        return self.brand + ", " + self.model + " " + str(self.wheel_size)
