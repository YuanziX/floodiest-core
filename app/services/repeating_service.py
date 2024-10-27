from firebase_admin import messaging, initialize_app


initialize_app()
def send_push_notification(token: str, message: str):
    message = messaging.Message(
        notification=messaging.Notification(
            title='Flood Alert',
            body=message,
        ),
        token=token,
    )
    response = messaging.send(message)
    print('Successfully sent message:', response)
