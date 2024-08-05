from django.contrib import admin
from mail.models import EmailInfo, Message, FileMessage

admin.site.register(EmailInfo)
admin.site.register(Message)
admin.site.register(FileMessage)
