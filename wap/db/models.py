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
    def __str__(self):
         return self.category 

class SignedupList(models.Model):
    projectID = models.ForeignKey(Projects, on_delete=models.CASCADE)
    username = models.ForeignKey(Login, on_delete=models.CASCADE, unique=True)


