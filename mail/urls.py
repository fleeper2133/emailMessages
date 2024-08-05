from django.urls import path
import mail.views as mail

app_name = 'mail'

urlpatterns = [
    path('', mail.email_login, name="login"),
    path('messages/<int:pk>/', mail.email_messages, name="message")
]