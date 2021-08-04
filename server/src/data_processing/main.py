"""
    # main.py

    - Load된 데이터들에 대해 Linear Regression을 진행합니다.
    - 진행된 후의 Weights를 파일로 저장합니다.
"""

import datetime
from server.src.data_processing.model import modeling
import sys
import psycopg2

from preprocessing import preprocess

# DB 환경 변수
dbconfig = {"host": sys.argv[1], "user": sys.argv[2],
            "password": sys.argv[3], "database": sys.argv[4]}

today = datetime.datetime.today()
year = str(today.year)
month = str(today.month) if today.month >= 10 else '0'+str(today.month)
day = str(today.day) if today.day >= 10 else '0'+str(today.day)
collected_at = year + "-" + month + "-" + day


# DB 연결
connection = psycopg2.connect(
    database=dbconfig["database"], user=dbconfig["user"])

# DB에 대한 동작을 위한 cursor 생성
cursor = connection.cursor()

cursor.execute("SELECT email, loc_code, using_aircon FROM Users")
users = cursor.fetchall()

for user in users:

    host = {"email": user[0], "loc_code": user[1], "using_aircon": user[2]}

    # 데이터 전처리
    standard_df, mean_df , std_df = preprocess(cursor, host)

    # 데이터 분석
    modeling(standard_df)

    # 데이터 분석 결과 저장
    # cursor.execute("INSERT INTO \"Data_Processings\" (host,collected_at,params) VALUES (%s,%s,%s)",
    #                (host["email"], collected_at, params))

# Cursor와 Connection 종료
cursor.close()
connection.close()