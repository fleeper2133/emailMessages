from django.db import models
from django.contrib.postgres.fields import ArrayField

PORT_CHOICE = (
    ('imap.gmail.com', 'gmail' ),
    ('imap.yandex.ru', 'yandex'),
    ('imap.mail.ru', 'mail')
)

class EmailInfo(models.Model):
    
    login = models.EmailField()
    password = models.CharField(max_length=255)
    port = models.CharField(max_length=50, choices=PORT_CHOICE)

class Message(models.Model):
    mail_id = models.PositiveIntegerField()
    subject = models.CharField(max_length=255)
    date_send = models.CharField(max_length=155)
    date_receipt = models.DateField(auto_now_add=True)
    text = models.TextField()
    email = models.ForeignKey(EmailInfo, on_delete=models.CASCADE, related_name='messages')

    def __str__(self) -> str:
        return f"{self.mail_id} {self.subject}"
    
class FileMessage(models.Model):
    message = models.ForeignKey(Message, on_delete=models.CASCADE, related_name="files")
    file = models.FileField()
