# Generated by Django 2.1.7 on 2019-03-11 09:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('full_test', '0002_auto_20190311_0958'),
    ]

    operations = [
        migrations.AlterField(
            model_name='history',
            name='qps',
            field=models.FloatField(verbose_name='qps值'),
        ),
    ]
