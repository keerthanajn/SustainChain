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
                walletaddress = data.get('wallet_address')

                login_instance = Login.objects.get(username=user)
                category_instance = Category.objects.get(name=category)
                # Create the event in the database
                Project.objects.create(
                    # projectID=project_id,
                    projectName=project_name,
                    description=description,
                    category=category_instance,
                    postcode=postcode,
                    user=login_instance
                )
                Whitelist.objects.create(
                    user = login_instance,
                    walletAddress = walletaddress,
                )
                
                # Optionally, you can return the newly created project data as a JSON response
                return JsonResponse({'message': 'Event created successfully', }, status=201)
            
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
    def getUsernames(spd):
        s = []
        for i in spd:
            a = i.username.username
            s.append(a)
        return s

            



    def signedup(request):
        
        signedUp = SignedupList.objects.values('projectID').distinct()
        
            # Serialize project objects to JSON
        Signed_json = []
        sd = []
        pd = []
        # for i in si:
        #     s = i.projectID.projectName
        #     sd.append(s)
        # sd = list(set(sd))
        print(sd)
        for signed in signedUp:
            
            signedp = Project.objects.filter(projectID=signed['projectID'])
            spd = SignedupList.objects.filter(projectID = signed['projectID'])  
            spd = getallsignedup.getUsernames(spd)       
            # s = signed.username
            # p = signed.projectID.objects.values('projectID').distinct()
            # print(p)
            # sd.append(s)
            # pd.append(p)
            signed_data = { 
                    'projectID': signed['projectID'],
                    'projectName':signedp[0].projectName,
                    'username': spd,
                    'number': len(spd),
                        # 'number': len(signed.username)
            }
            Signed_json.append(signed_data)
        return JsonResponse(Signed_json, safe=False)

class getalltokens(APIView):
    def tokens(request):
        token = tokens.objects.all()
        token_json = []
        
        for i in token:
            token_data = { 
                'user': i.user.username,
                'tokens': i.tokens,
            }
            token_json.append(token_data)
        return JsonResponse(token_json, safe=False)


class whitelist(APIView):
    def update_whitelist(request):
        whiteList = Whitelist.objects.all()
            # Serialize project objects to JSON
        whiteList_json = []
        for whiteItem in whiteList:
            project = Project.objects.filter(user=whiteItem.user)
            whiteItem_data = {
                'user': whiteItem.user.username,
                'walletAddress': whiteItem.walletAddress,
                'projectnum': project.count(),
                
            }
            whiteList_json.append(whiteItem_data)
        return JsonResponse(whiteList_json, safe=False)


    # Get the user's projects
        
        
    



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

