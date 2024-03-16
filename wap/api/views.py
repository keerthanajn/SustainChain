from django.shortcuts import render

# Create your views here.
# views.py
from rest_framework.views import APIView
from django.http import JsonResponse
from rest_framework import status
from db.models import *
from .serializers import *
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt




class getallusers(APIView):
    @csrf_exempt  # This decorator is used to allow POST requests without CSRF token
    def user_login(request):
        objs = Login.objects.all()
        mains = []
        for i in objs:
            js = {}
            js["username"]=i.username
            js["password"]=i.password
            js["name"] = i.name
            mains.append(js)
        return JsonResponse(mains,safe=False)

class getallpostcomments(APIView):
    @csrf_exempt  # This decorator is used to allow POST requests without CSRF token
    def user_login(request):
        objs = Login.objects.all()
        mains = []
        for i in objs:
            js = {}
            js["username"]=i.username
            js["password"]=i.password
            js["name"] = i.name
            mains.append(js)
        return JsonResponse(mains,safe=False)

    


# @api_view(['GET'])
# def getData(request):
#     items = Item.objects.all()
#     serializer = ItemSerializer(items, many=True)
#     return Response(serializer.data)

# @api_view(['POST'])
# def addItem(request):
#     serializer = ItemSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()


#     return Response(serializer.data)

