from channels.generic.websocket import AsyncWebsocketConsumer, StopConsumer
import imaplib
import email
from email.header import decode_header
import json
from asyncio import sleep
from mail.models import EmailInfo, Message, FileMessage
from asgiref.sync import sync_to_async
from django.conf import settings
from pathlib import Path
from django.core.files.base import File

@sync_to_async
def get_email_info(pk):
    return EmailInfo.objects.get(pk=pk)


@sync_to_async
def exists_message(mail_id, email_info_pk):
    return Message.objects.filter(mail_id=mail_id, email_id=email_info_pk).first()


@sync_to_async
def create_message(mail_id, subject, date_send, text, email_info_pk, files=None):
    message =  Message.objects.create(
        mail_id=mail_id,
        subject=subject,
        date_send=date_send,
        text=text,
        email_id=email_info_pk,
    )
    for file_info in files:
        with open(file_info.get('att_path'), "rb") as file:
            FileMessage.objects.create(file=File(file, name=file_info.get('filename')), message=message)
    return message

@sync_to_async
def get_files(message: Message) -> list:
    return [{"url": file.file.url, "name": str(file.file)} for file in message.files.select_related().all()]


class WsComsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        self.room_name = str(self.scope["url_route"]["kwargs"]["pk"])

        email_info = await get_email_info(self.room_name)

        mail_pass = email_info.password
        username = email_info.login
        imap_server = email_info.port

        message_info = {}

        try:
            imap = imaplib.IMAP4_SSL(imap_server)
            imap.login(username, mail_pass)
        except:
            await self.send(json.dumps({"error": "Ошибка авторизации"}))
            self.end = True
            raise StopConsumer()
        imap.select("INBOX")
        status, messages = imap.search(None, "ALL")

        mail_ids = messages[0].split()
        quantity = len(mail_ids)

        for mail_id in mail_ids:
            message = await exists_message(int(mail_id), email_info.pk)

            if not message:
                
                try:
                    status, msg_data = imap.fetch(mail_id, "(RFC822)")
                    for response_part in msg_data:
                        if isinstance(response_part, tuple):
                            msg = email.message_from_bytes(response_part[1])
                            

                            # Получение заголовков письма
                            subject, encoding = decode_header(msg["Subject"])[0]
                            if isinstance(subject, bytes):
                                subject = subject.decode(encoding if encoding else "utf-8")
                            date = msg.get("Date")
                            body = ''
                            files = []

                            # Получение тела письма
                            if msg.is_multipart():
                                for part in msg.get_payload():
                                    if part.get_content_type() == "text/plain":
                                        body = part.get_payload(decode=True).decode(
                                            part.get_content_charset()
                                        )
                                    if part.get('Content-Disposition'):
                                        filename = part.get_filename()
                                        att_path = settings.MEDIA_ROOT / "files" / filename
                                        files.append({'filename': filename, 'att_path': att_path})

                                        if not Path(att_path).is_file():
                                            fp = open(att_path, 'wb')
                                            fp.write(part.get_payload(decode=True))
                                            fp.close()

                            else:
                                body = msg.get_payload(decode=True).decode(
                                    msg.get_content_charset()
                                )

                            
                            message = await create_message(
                                int(mail_id), subject, date, body, email_info.pk, files
                            )
                except Exception as ex:
                    print(f"[Error] - {ex}")

            if message:
                files = await get_files(message)
                
                message_info = {
                    "quantity": quantity,
                    "result": {
                        "subject": message.subject,
                        "date_send": message.date_send,
                        "date_receipt": str(message.date_receipt),
                        "text": message.text[:155],
                        "mail_id": int(mail_id),
                        "files": files
                    },
                }
            await self.send(json.dumps(message_info))

    async def disconnect(self, code):
        
        return await super().disconnect(code)
            
