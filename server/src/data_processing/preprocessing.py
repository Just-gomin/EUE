'''
    # initialize.py

    - Data 전처리를 목적으로 하는 파일입니다.
'''

import os
import datetime
import csv
import numpy as np


def loadRawData(link):
    '''
        # CSV 파일의 내용을 반환하는 함수
        - 어제 하루 기록된 파일들에 대해 진행하기 위해 날짜 정보를 생성합니다.
        - 제공 받은 링크를 통해 파일을 읽고 반환합니다.
    '''
    raw_data = []
    today = datetime.datetime.today()
    yesterday = today - datetime.timedelta(days=1)

    yMonth = yesterday.month if yesterday.month >= 10 else "0" + \
        str(yesterday.month)
    yDay = yesterday.day if yesterday.day >= 10 else "0"+str(yesterday.day)

    time_dir = "/" + str(yesterday.year) + "/" + \
        str(yesterday.year) + str(yMonth) + "/" + \
        str(yesterday.year) + str(yMonth) + str(yDay)

    weather_dir = os.getcwd() + "/server" + link + time_dir + "/weather.csv"

    data_file = open(weather_dir, 'r', newline='')
    csv_data = csv.reader(data_file)

    for line in csv_data:
        raw_data.append(line)

    data_file.close()

    return raw_data


def handleUserRawData(user_data):
    '''
        # User Raw Data (CSV 파일 데이터) 가공 함수
        - [ 월 / 일 / 시 / 분 / 온도 / 습도 / 광도 ]의 데이터를 변환하는 함수
        - 월 / 일 / 분 제거
        - test_data(분이 제거된 데이터)와 true_data(단위 시간 후 실제 온도)로 나누기
    '''
    user_x = []
    train_t = []

    isFirstLine = True

    for line in user_data:
        _, _, hour, _, temp, humi, lights = line
        user_x.append([int(hour), float(temp), float(humi), float(lights)])
        if isFirstLine:
            isFirstLine = False
        else:
            train_t.append([float(temp)])

    train_t.append(train_t[-1])

    return (user_x, train_t)


def handleOutRawData(out_data):
    '''
        # Out Raw Data (CSV 파일 데이터) 가공 함수
        - [ 월 / 일 / 시 / 분 / 온도 / 습도 / 기압 / 풍속 ] 데이터를 변환하는 함수
        - '분' 을 제거합니다.
        - 같은 시각의 데이터들은 평균을 구해서 데이터로 저장합니다.
        - 외부 데이터는 Dictionary Data로 최종 반환됩니다.
        - Dictionary의 Key는 '시'가 됩니다.
    '''

    out_dict = {}
    key = None
    counter = 1

    sum_temp, sum_humi, sum_pressure, sum_wind_speed = 0, 0, 0, 0

    for line in out_data:
        month, day, hour, _, temp, humi, pressure, wind_speed = line

        if key == None:
            key = int(hour)
            counter = 1
            sum_temp, sum_humi, sum_pressure, sum_wind_speed = float(
                temp), float(humi), float(pressure), float(wind_speed)

        if key == hour:
            counter += 1
            sum_temp += float(temp)
            sum_humi += float(humi)
            sum_pressure += float(pressure)
            sum_wind_speed += float(wind_speed)
        else:
            out_dict[key] = [int(month), int(day), key, sum_temp/counter, sum_humi /
                             counter, sum_pressure/counter, sum_wind_speed/counter]

            key = int(hour)
            counter = 1
            sum_temp, sum_humi, sum_pressure, sum_wind_speed = float(
                temp), float(humi), float(pressure), float(wind_speed)

    return out_dict


def combineXdata(user_x, out_dict):
    '''
        # 분리된 입력 데이터를 합치는 함수
        - 사용자 데이터와 외부 데이터를 결합해 입력층의 값으로 가공합니다.
    '''
    train_x = []

    for line in user_x:
        hour, temp, humi, lights = line
        x = out_dict[hour] + [temp, humi, lights]
        train_x.append(x)

    return train_x


def preprocessingData(user_link, out_link):
    '''
        # 데이터 분석 전 데이터 전처리 함수입니다.
        1. 데이터 로드
        2. 데이터 1차 가공 (handle~RawData)
        3. 데이터 2차 가공 (combineXdata)
        4. 데이터 넘파이 형식 배열로 변환
        5. 반환
    '''
    raw_user_data = loadRawData(user_link)
    raw_out_data = loadRawData(out_link)

    user_x, train_t = handleUserRawData(raw_user_data)
    out_dict = handleOutRawData(raw_out_data)

    train_x = combineXdata(user_x, out_dict)

    train_x = np.array(train_x)
    train_t = np.array(train_t)

    return train_x, train_t
