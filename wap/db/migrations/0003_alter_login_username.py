# Generated by Django 5.0.3 on 2024-03-16 15:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('db', '0002_category_login_projects_signeduplist_delete_item'),
    ]

    operations = [
        migrations.AlterField(
            model_name='login',
            name='username',
            field=models.CharField(max_length=15, unique=True),
        ),
    ]
