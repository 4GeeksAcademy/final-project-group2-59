import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, Email, To, HtmlContent


def send_email(to_email, subject, html_content):

    from_email = os.getenv('SENDGRID_FROM_EMAIL')

    # Crear el mensaje
    message = Mail(
        from_email=Email(from_email, "Patitas Felices"),
        to_emails=To(to_email),
        subject=subject,
        html_content=HtmlContent(html_content)
    )

    try:
        sendgrid = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
        sendgrid.send(message)

        return True
    except Exception as error:
        return False


