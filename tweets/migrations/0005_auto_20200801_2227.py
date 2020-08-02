# Generated by Django 2.2 on 2020-08-01 22:27

from django.conf import settings
from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('tweets', '0004_auto_20200801_2121'),
    ]

    operations = [
        migrations.AddField(
            model_name='tweet',
            name='timestamp',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]