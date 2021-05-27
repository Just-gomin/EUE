'''
    # initialize.py

    - Data 전처리를 목적으로 하는 파일입니다.
'''

import os
import datetime
import csv
import numpy as np


def loadRawData(link, file_name):
    '''
        ### CSV 파일의 내용을 반환하는 함수
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

    file_dir = os.getcwd() + link + time_dir + file_name

    if not os.path.isfile(file_dir):
        print("File doesn't exist on {0}".format(file_dir))
        return None

    data_file = open(file_dir, 'r', newline='')
    csv_data = csv.reader(data_file)

    for line in csv_data:
        raw_data.append(line)

    data_file.close()

    return raw_data


def handleUserRawData(user_data):
    '''
        ### User Raw Data (CSV 파일 데이터) 가공 함수
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
        ### Out Raw Data (CSV 파일 데이터) 가공 함수
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


def handleParameters(raw_w):
    '''
        ### Weights & Bias를 처리하는 함수
        - raw 데이터는 weights와 bias가 합쳐진 상태입니다.
        - raw 데이터를 하나씩 잘라 실수로 변환한 뒤, 마지막의 편향을 잘라냅니다.
    '''

    if raw_w == None:
        return None, None

    weights = []

    for line in raw_w:
        for fig in line:
            weights.append([float(fig)])

    bias = weights.pop()[0]

    return weights, bias


def combineXdata(user_x, out_dict):
    '''
        ### 분리된 입력 데이터를 합치는 함수
        - 사용자 데이터와 외부 데이터를 결합해 입력층의 값으로 가공합니다.
    '''
    train_x = []

    for line in user_x:
        hour, temp, humi, lights = line

        # 데이터 수집이 균일하게 이루어지지 않은 경우 처리
        if hour in out_dict:
            key_hour = hour
        else:
            minimum = 4
            key_hour = None
            for h in range(hour-3, hour + 3):
                if h in out_dict and abs(h - hour) < minimum:
                    minimum = abs(h-hour)
                    key_hour = h

        x = out_dict[key_hour] + [temp, humi, lights]
        train_x.append(x)

    return train_x


def Xnormalize(data):
    '''
        ### 정규화 함수
        - 입력 층의 데이터를 정규화 시킵니다.
        - 월, 일 데이터의 평균과 표준 편차를 계산하여 값을 수정합니다.
    '''

    normalized_data = data.T   # (n,10) -> (10,n)

    mean = np.mean(normalized_data, axis=1)    # 평균 (10, 1)
    std_d = np.std(normalized_data, axis=1)    # 표준편차

    # 월, 일의 평균과 표준편차 지정
    new_mean = []
    for i, fig in enumerate(list(mean)):
        if i == 0:
            new_mean.append(6.5)
        elif i == 1:
            new_mean.append(16.0)
        else:
            new_mean.append(fig)
    new_mean = np.array(new_mean).reshape((-1, 1))

    new_std_d = []
    for i, fig in enumerate(list(std_d)):
        if i == 0:
            new_std_d.append(3.45205253)
        elif i == 1:
            new_std_d.append(8.94427191)
        else:
            new_std_d.append(fig)
    new_std_d = np.array(new_std_d).reshape((-1, 1))

    normalized_data = (normalized_data - new_mean) / new_std_d

    normalized_data = normalized_data.T

    return normalized_data, new_mean, new_std_d


def Tnormalize(data):
    '''
        ### 데이터 정규화 함수
        - 평균과 표준 편차를 이용해 입력된 데이터를 정규화 시킵니다.
        - 현재 입력층의 데이터가 아닌 train 데이터의 참 값을 표준화 시킵니다.
    '''
    n_data = data.T   # (n,1) -> (1,n)

    mean = np.mean(n_data, axis=1)    # 평균
    std_d = np.std(n_data, axis=1)     # 표준편차

    n_data = (n_data - mean) / std_d

    n_data = n_data.T

    return n_data


def preprocessingData(user_link, out_link):
    '''
        # 데이터 분석 전 데이터 전처리 함수
        1. 데이터 로드
        2. 데이터 1차 가공 (handle~RawData)
        3. 데이터 2차 가공 (combineXdata)
        4. 데이터 3차 가공 (nomalize~)
        5. 데이터 넘파이 형식 배열로 변환
        6. 반환
    '''
    raw_user_data = loadRawData(user_link, "/weather.csv")
    raw_out_data = loadRawData(out_link, "/weather.csv")
    raw_parameters = loadRawData(user_link, "/analysis_parameters.csv")

    user_x, train_t = handleUserRawData(raw_user_data)
    out_dict = handleOutRawData(raw_out_data)
    weights, bias = handleParameters(raw_parameters)

    train_x = combineXdata(user_x, out_dict)

    train_x = np.array(train_x)  # (n ,10)
    train_x, mean, std_d = Xnormalize(train_x)

    train_t = np.array(train_t)  # (10,1)
    train_t = Tnormalize(train_t)

    weights = np.array(weights) if weights != None else None
    bias = float(bias) if bias != None else None

    return train_x, train_t, weights, bias, mean, std_d
