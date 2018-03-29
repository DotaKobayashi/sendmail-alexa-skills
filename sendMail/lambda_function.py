#coding: UTF-8
import json
from encodings.utf_8 import decode

def lambda_handler(event, context):
    import smtplib
    from email.mime.text import MIMEText
    import datetime
    
    me = "your gmail"
    passwd = ""
    hostml = ""
    to_address = ['']
    titletext = "mail tiltle"

    # メール本文
    body = "お疲れ様です。\n"\
         + "お休みします。\n"\
         + "宜しくお願い致します。\n"

    message = MIMEText(body)
    message['Subject'] = titletext
    message['From'] = hostml
    message['To'] = ', '.join(to_address)
    
    s = smtplib.SMTP('smtp.gmail.com', 587)
    s.ehlo()
    s.starttls()
    s.login(me, passwd)
    s.sendmail(
        me,
        to_address,
        message.as_string(),
    )
    s.close()
    print("メール送信処理が完了しました")
    

    return {
        "statusCode": 200,
        "headers": {"headerName": "headerValue", "Foo": "bar"},
        "body": "This is body"
    }