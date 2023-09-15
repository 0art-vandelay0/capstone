from twilio.rest import Client


def send_sms(body, to, from_):
    account_sid = "your_twilio_account_sid"
    auth_token = "your_twilio_auth_token"
    client = Client(account_sid, auth_token)
    message = client.messages.create(
        body=body,
        from_=from_,
        to=to
    )
    return message.sid
