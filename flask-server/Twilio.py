from twilio.rest import Client
# from flask import request


def send_sms(body, to, from_):
    account_sid = "your_twilio_account_sid"
    auth_token = "your_twilio_auth_token"
    client = Client(account_sid, auth_token)

    message = client.messages.create(

        from_=from_,
        body='This is the code for the bathroom',
        to=to
    )
    return message.sid
