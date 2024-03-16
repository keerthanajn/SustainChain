from django.shortcuts import render

# Create your views here.
# views.py
from rest_framework.views import APIView
from django.http import JsonResponse
from db.models import *
from .serializers import *
from django.views.decorators.csrf import csrf_exempt
import json





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

class postallpostcomments(APIView):
    @csrf_exempt  # Only if you're not using CSRF protection for this view
    def create_event_view(request):
        print(request.method)
        if request.method == 'POST':
            try:
                # Parse the JSON data from the request body
                data = json.loads(request.body)
                
                # Extract event data from the JSON
                # project_id = data.get('projectID')
                project_name = data.get('projectName')
                description = data.get('eventDescription')
                category = data.get('categoryOption')
                postcode = data.get('postcode')
                user = data.get('user')

                login_instance = Login.objects.get(username=user)
                category_instance = Category.objects.get(name=category)
                # Create the event in the database
                project = Project.objects.create(
                    # projectID=project_id,
                    projectName=project_name,
                    description=description,
                    category=category_instance,
                    postcode=postcode,
                    user=login_instance
                )
                
                # Optionally, you can return the newly created project data as a JSON response
                return JsonResponse({'message': 'Event created successfully', 'project': {
                    'projectID': project.projectID,
                    'projectName': project.projectName,
                    'eventDescription': project.description,
                    'categoryOption': project.category.name,
                    'created': project.created,
                    'postcode': project.postcode,
                    'user': project.user.username
                }}, status=201)
            
            except json.JSONDecodeError as e:
                return JsonResponse({'error': 'Invalid JSON format'}, status=400)
            
            except KeyError as e:
                return JsonResponse({'error': f'Missing required field: {e}'}, status=400)
            
            except Exception as e:
                return JsonResponse(print({'error': str(e)}), status=500)
            
        else:
            return JsonResponse({'error': 'Method not allowed'}, status=405)
    
class getallprojects(APIView):
    def projects(request):
        projects = Project.objects.all()
            # Serialize project objects to JSON
        projects_json = []
        for project in projects:
            project_data = {
                'projectID': project.projectID,
                'projectName': project.projectName,
                'description': project.description,
                'category': project.category.name,
                'created': project.created.strftime('%Y-%m-%d'),  # Format the date as string
                'postcode': project.postcode,
                'user': project.user.username,  # Assuming Login model has a field named username
            }
            projects_json.append(project_data)
        return JsonResponse(projects_json, safe=False)
class getallsignedup(APIView):


    def signedup(request):
        signedUp = SignedupList.objects.all()
            # Serialize project objects to JSON
        Signed_json = []
        sd = []
        for signed in signedUp:
            s = signed.username.username
            sd.append(s)
            signed_data = { 
                'projectID': signed.projectID.projectID,
                'projectName':signed.projectID.projectName,
                'username': sd,
                'number': len(sd),
                # 'number': len(signed.username)
            }
            print(sd)
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

