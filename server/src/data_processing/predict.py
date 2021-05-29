'''

    # predict.py의 역할

    - 마지막으로 입력된 데이터 가져오기
    - 최근 데이터들을 통해 단위 시간 후의 기온 예측

    #### 수정 사항(5/29)
    1. loadRawData에서 time_dir을 생성하는 부분을 오늘 날짜 경로와 어제 날짜 경로로 구분합니다.
    2. data의 경로를 보내며, 오늘 날짜인지 어제 날짜인지를 결정합니다.
    3. csv 파일을 읽어 온 뒤의 후처리 함수를 생성합니다.
'''
import numpy as np
import pymysql
import sys
from preprocessing import combineXdata, handleLearningParams, handleOutRawData, handleStatsParams, handleUserRawData, loadRawData

# DB를 이용하기 위한 정보
dbconfig = {"host": sys.argv[1], "user": sys.argv[2],
            "password": sys.argv[3], "database": sys.argv[4]}

# 사용자 ID
user_name = sys.argv[5]

# DB Connect
eue_db = pymysql.connect(
    user=dbconfig["user"], password=dbconfig["password"], host=dbconfig["host"], db=dbconfig["database"], charset="utf8")
cursor = eue_db.cursor(pymysql.cursors.DictCursor)

# Get User and Outside data directory
query = "SELECT DATALINK FROM USER WHERE ID='{0}';".format(user_name)
cursor.execute(query)
result = cursor.fetchall()

user_link = result[0]["DATALINK"]
link_ls = user_link.split("/")
outside_link = ('/').join(link_ls[:-2]) + "/Outside"

# File names.
weather_data_file = "weather.csv"
analy_params_file = "analysis_parameters.csv"
predict_params_file = "prediction_parameters.csv"

# Get parameters and Data.
weather_out, weatehr_user = [], []

# - Get weights and bias.
raw_wb_data = loadRawData(user_link, "today", analy_params_file)
weights, bias = handleLearningParams(raw_wb_data)

# - Get mean and standard deviation.
raw_ms_data = loadRawData(user_link, "today", predict_params_file)
mean, std, temp_mean, temp_std = handleStatsParams(raw_ms_data)

# - Get weather data and modify.
raw_weather_out = loadRawData(outside_link, "today", weather_data_file)
raw_weather_user = loadRawData(user_link, "today", weather_data_file)
out_dict = handleOutRawData(raw_weather_out)
user_x, _ = handleUserRawData(raw_weather_user)
input_data = combineXdata(user_x, out_dict)
input_data = input_data[-1]

# Pedict
pass
