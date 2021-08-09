"""
    # main.py

    - Load된 데이터들에 대해 Linear Regression을 진행합니다.
    - 진행된 후의 Weights를 파일로 저장합니다.
"""

import datetime
import os
import psycopg2
from psycopg2.extras import Json

from config import DB
from preprocessing import preprocess
from model import modeling


# DB 환경 변수
dbconfig = {"host": DB["host"], "port": DB["port"], "user": DB["user"],
            "password": DB["password"], "database": DB["database"]}

data_dir = os.getcwd() + "/src/data_processing/temp.csv"
model_dir = os.getcwd() + "/src/data_processing/model.h5"


def makeDateForm():
    today = datetime.datetime.today()
    year = str(today.year)
    month = str(today.month) if today.month >= 10 else '0'+str(today.month)
    day = str(today.day) if today.day >= 10 else '0'+str(today.day)
    collected_at = year + "-" + month + "-" + day

    return collected_at


# DB 연결
connection = psycopg2.connect(
    dbname=dbconfig["database"], user=dbconfig["user"], password=dbconfig["password"], host=dbconfig["host"], port=dbconfig["port"])

# DB에 대한 동작을 위한 cursor 생성
cursor = connection.cursor()

cursor.execute("SELECT email, loc_code, using_aircon FROM \"Users\"")
users = cursor.fetchall()

for user in users:

    host = {"email": user[0], "loc_code": user[1], "using_aircon": user[2]}

    # 데이터 전처리
    standard_df, mean_df, std_df = preprocess(cursor, host)

    # 데이터 분석
    modeling(standard_df)

    # 데이터 분석 결과 저장

    collected_at = makeDateForm()

    model_file = open(model_dir, 'rb')
    model_file_data = model_file.read()

    params = {"mean": mean_df.to_json(), "std": std_df.to_json()}

    cursor.execute("INSERT INTO \"Data_Processings\" (host,collected_at,model_file,params) VALUES (%s,%s,%s,%s)",
                   (host["email"],
                    collected_at,
                    model_file_data,
                    Json(params),))

    connection.commit()
    model_file.close()

    if os.path.isfile(data_dir):
        os.remove(data_dir)

    if os.path.isfile(model_dir):
        os.remove(model_dir)


# Cursor와 Connection 종료
cursor.close()
connection.close()
