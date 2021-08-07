"""
    # preprocessing.py

    데이터 전처리를 위한 파일입니다.
    DB에 저장된 값들을 불러와 사용자 등록 장소의 날씨 데이터와 외부 날씨 데이터를 결합해 CSV 파일을 생성합니다.

"""

import pandas as pd
import datetime
import numpy as np
import os


def preprocess(cursor, host):
    """
        ### preprocess(cursor, host)

        - cursor : psycopg2의 SQL 실행을 위한 cursor.
        - host : 사용자 정보.

        사용자 정보를 바탕으로 외부 날씨와 내부 날씨를 검색해 CSV 파일로 작성합니다.
        CSV 파일 생성 후 pandas를 이용해 dataframe으로 만든 뒤, 정규화를 진행합니다.
    """

    # # 데이터 수집기 오류로 인해 보류
    # cursor.execute(
    #     "SELECT t2.collected_at as \"date\", temp_out, humi_out, press, wind_speed, temp_in, humi_in, lights FROM"
    #     + " (SELECT collected_at, temp as temp_out, humi as humi_out,press, wind_speed FROM Weather_Outs WHERE loc_code = %s) t1"
    #     + " JOIN "
    #     + " (SELECT collected_at, temp as temp_in, humi as humi_in, lights FROM Weather_Ins WHERE host = %s) t2"
    #     + " ON t1.collected_at = t2.collected_at", (host["loc_code"], host["email"],))

    # results = cursor.fetchall()

    # file = open("/src/dataprocessing/temp.csv", 'w')

    # # header
    # file.write("date,temp_out,humi_out,press,wind_speed,temp_in,humi_in,lights\n")

    # for result in results:
    #     file.write("{0},{1},{2},{3},{4},{5},{6},{7}\n".format(
    #         result[0], result[1], result[2], result[3], result[4], result[5], result[6], result[7]))

    # file.close()

    # 사용자의 거주 지역의 실외 데이터 검색
    cursor.execute(
        "SELECT collected_at as \"date\", temp as temp_out, humi as humi_out, press, wind_speed "
        + "From \"Weather_Outs\" "
        + "WHERE loc_code = %s", (host["loc_code"],)
    )

    results = cursor.fetchall()

    file = open(os.getcwd() + "/src/data_processing/temp.csv", 'w')

    # header
    file.write("date,temp_out,humi_out,press,wind_speed\n")

    for result in results:
        file.write("{0},{1},{2},{3},{4}\n".format(
            result[0], result[1], result[2], result[3], result[4]))

    file.close()

    df = pd.read_csv(os.getcwd() + "/src/data_processing/temp.csv")
    date_time = pd.to_datetime(df['date'], format='%Y-%m-%d %H:%M')
    timestamp_s = date_time.map(datetime.datetime.timestamp)

    df = df[['temp_out', 'humi_out', 'press', 'wind_speed']]
    day = 24*60*60
    year = (365.2425)*day

    df['Day sin'] = np.sin(timestamp_s * (2 * np.pi / day))
    df['Day cos'] = np.cos(timestamp_s * (2 * np.pi / day))
    df['Year sin'] = np.sin(timestamp_s * (2 * np.pi / year))
    df['Year cos'] = np.cos(timestamp_s * (2 * np.pi / year))

    def standard(dataframe):
        mean = dataframe.mean()
        std = dataframe.std()
        zscore = (dataframe - mean) / std
        return zscore, mean, std

    standard_df, mean_df, std_df = standard(df)

    return standard_df, mean_df, std_df
