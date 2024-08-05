from django.shortcuts import render, redirect
from mail.models import EmailInfo
from django.urls import reverse

def email_login(request):
    ports = {
        'yandex': 'imap.yandex.ru',
        'mail': 'imap.mail.ru',
        'gmail': 'imap.gmail.com'
    }
    if request.method == "POST":
        login = request.POST.get('login')
        password = request.POST.get('password')
        port = request.POST.get('port')
        
        email, created = EmailInfo.objects.get_or_create(login=login, password=password, port=ports[port])
        return redirect(reverse('mail:message', kwargs={'pk': email.pk}))


    return render(request, 'mail/login.html')

def email_messages(request, pk):
    email = EmailInfo.objects.get(pk=pk)

    context = {
        'email': email
    }

    return render(request, 'mail/messages.html', context)
