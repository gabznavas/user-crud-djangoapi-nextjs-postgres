import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from config import Config

def send_email(to_email: str, subject: str, message: str):
    # Criar mensagem MIME
    msg = MIMEMultipart()
    msg["From"] = Config.EMAIL_ADDRESS
    msg["To"] = to_email
    msg["Subject"] = subject
    msg.attach(MIMEText(message, "plain"))

    try:
        # Conectar ao servidor SMTP do Gmail
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(Config.EMAIL_ADDRESS, Config.EMAIL_PASSWORD)
            server.send_message(msg)
            print("[LOG] Email enviado com sucesso")
    except Exception as e:
        print("[ERRO] Falha ao enviar e-mail:", e)
