from django.shortcuts import render

# Create your views here.
# views.py
from rest_framework.views import APIView
from django.http import JsonResponse
from db.models import *
from .serializers import *
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
class getallprojects(APIView):
    def projects(request):
        projects = Projects.objects.all()
            # Serialize project objects to JSON
        projects_json = []
        for project in projects:
            project_data = {
                'projectID': project.projectID,
                'projectName': project.projectName,
                'description': project.description,
                'category': project.category.name,
                'created': project.created.strftime('%Y-%m-%d'),  # Format the date as string
                'user': project.user.username  # Assuming Login model has a field named username
            }
            projects_json.append(project_data)
        return JsonResponse(projects_json, safe=False)
class getallsignedup(APIView):
    def signedup(request):
        signedUp = SignedupList.objects.all()
            # Serialize project objects to JSON
        Signed_json = []
        for signed in signedUp:
            signed_data = {
                'projectID': signed.projectID.projectID,
                'projectName':signed.projectID.projectName,
                'username': signed.username.username,
            }
            Signed_json.append(signed_data)
        return JsonResponse(signed_data, safe=False)


    



def home(request):
    return render(request,'base.html')


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

