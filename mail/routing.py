from django.urls import path
from mail.consumers import WsComsumer

ws_urlpatterns = [
    path('ws/get-messages/<int:pk>/', WsComsumer.as_asgi())
]