from django.contrib import admin

from .models import *
# Register your models here.
admin.site.register(Login)
admin.site.register(Category)
# admin.site.register(Projects)
admin.site.register(Project)
admin.site.register(SignedupList)
admin.site.register(tokens)
admin.site.register(Whitelist)

