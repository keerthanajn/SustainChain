from rest_framework import serializers
from db.models import *
class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'