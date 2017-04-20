# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Bike',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('model', models.CharField(max_length=200)),
                ('brand', models.CharField(max_length=100)),
                ('color', models.CharField(max_length=20)),
                ('wheel_size', models.IntegerField(default=0)),
                ('price', models.DecimalField(max_digits=7, decimal_places=2)),
                ('video', models.FileField(default=b'vid/sample.mp4', max_length=150, upload_to=b'vid')),
                ('quantity', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Book',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=200)),
                ('author', models.CharField(max_length=100)),
                ('gender', models.CharField(max_length=30)),
                ('price', models.DecimalField(max_digits=5, decimal_places=2)),
                ('editorial', models.CharField(max_length=50)),
                ('pub_date', models.DateField(verbose_name=b'Publication date')),
                ('image', models.ImageField(default=b'img/book.png', max_length=150, upload_to=b'img')),
                ('quantity', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Disk',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=200)),
                ('author', models.CharField(max_length=100)),
                ('gender', models.CharField(max_length=30)),
                ('price', models.DecimalField(max_digits=5, decimal_places=2)),
                ('pub_date', models.DateField(verbose_name=b'Publication date')),
                ('quantity', models.IntegerField(default=0)),
                ('audio', models.FileField(default=b'aud/sample.mp3', max_length=150, upload_to=b'aud')),
            ],
        ),
    ]
