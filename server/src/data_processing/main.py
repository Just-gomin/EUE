"""
    # main.py

    - Load된 데이터들에 대해 Linear Regression을 진행합니다.
    - 진행된 후의 Weights를 파일로 저장합니다.
"""

import sys
import psycopg2

from preprocessing import preprocess

# DB 환경 변수
dbconfig = {"host": sys.argv[1], "user": sys.argv[2],
            "password": sys.argv[3], "database": sys.argv[4]}

# DB 연결
connection = psycopg2.connect(
    database=dbconfig["database"], user=dbconfig["user"])

# DB에 대한 동작을 위한 cursor 생성
cursor = connection.cursor()

cursor.execute("SELECT email as host, loc_code, using_aircon FROM Users")
hosts = cursor.fetchall()

for host in hosts:
    # 데이터 전처리
    preprocess(cursor, host)

# Cursor와 Connection 종료
cursor.close()
connection.close()
