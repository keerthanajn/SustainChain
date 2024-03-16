from django.db import models

# Create your models here.

class Login(models.Model):
    username = models.CharField(max_length=15, unique=True)
    password = models.CharField(max_length=15)
    name = models.CharField(max_length=200)

class Category(models.Model):
     name = models.CharField(max_length=200)
     
    

class Projects(models.Model):
    user = models.ForeignKey(Login, on_delete=models.CASCADE)
    projectID = models.AutoField(primary_key=True)
    projectName = models.CharField(max_length=200)
    description = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    created = models.DateField(auto_now_add=True) 

class Project(models.Model):
    user = models.ForeignKey(Login, on_delete=models.CASCADE)
    projectID = models.AutoField(primary_key=True)
    projectName = models.CharField(max_length=200)
    description = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    postcode = models.TextField(max_length = 10)
    created = models.DateField(auto_now_add=True) 

class SignedupList(models.Model):
    projectID = models.ForeignKey(Projects, on_delete=models.CASCADE)
    username = models.ForeignKey(Login, on_delete=models.CASCADE, unique=True)
class tokens(models.Model):
    user = models.ForeignKey(Login, on_delete=models.CASCADE)
    tokens = models.BigIntegerField(max_length=100000)

    

