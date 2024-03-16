from django.urls import path
from . import views

urlpatterns = [
    # path('', views.getData),
    path('getuser/', views.getallusers.user_login),
    path('getprojects/', views.getallprojects.projects),
    path('getsignedup/', views.getallsignedup.signedup),
    path('', views.home),
]