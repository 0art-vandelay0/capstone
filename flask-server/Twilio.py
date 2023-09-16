from twilio.rest import Client
# from flask import request
import os


def send_sms(body, to, from_):
    account_sid = os.environ.get("TWILIO_ACCOUNT_SID")
    auth_token = os.environ.get("TWILIO_AUTH_TOKEN")
    client = Client(account_sid, auth_token)

    message = client.messages.create(

        from_=from_,
        body=body,
        to=to
    )
    return message.sid
