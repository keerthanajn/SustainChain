# Generated by Django 5.0.3 on 2024-03-16 23:01

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('db', '0005_tokens'),
    ]

    operations = [
        migrations.CreateModel(
            name='Whitelist',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('wallet_address', models.Field(blank=True, max_length=200)),
                ('total_projects', models.IntegerField(default=0)),
                ('total_attendees', models.IntegerField(default=0)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='db.login', unique=True)),
            ],
        ),
    ]