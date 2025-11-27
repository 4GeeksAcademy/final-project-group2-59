import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")


def send_email(to_email, subject, html_content):
    # Crear el mensaje
    message = MIMEMultipart("alternative")
    message["From"] = EMAIL_USER
    message["To"] = to_email
    message["Subject"] = subject

    # Parte HTML
    html_part = MIMEText(html_content, "html")
    message.attach(html_part)

    # Conexión al servidor SMTP
    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(EMAIL_USER, EMAIL_PASSWORD)
            server.sendmail(EMAIL_USER, to_email, message.as_string())

        return True
    except Exception as error:
        return False


