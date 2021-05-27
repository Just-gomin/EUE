"""
    # main.py

    - Load된 데이터들에 대해 Linear Regression을 진행합니다.
    - 진행된 후의 Weights를 파일로 저장합니다.
"""

import datetime
from os import getcwd, path, makedirs
import sys
import pymysql
import numpy as np
from preprocessing import preprocessingData
from linear_regression import LinearRegression


def storeParameters(link, filename, data):
    today = datetime.datetime.today()
    year = str(today.year)
    month = str(today.month) if today.month >= 10 else '0'+str(today.month)
    day = str(today.day) if today.day >= 10 else '0'+str(today.day)

    time_dir = '/' + year + '/' + year+month + '/' + year + month + day

    file_dir = getcwd() + link + time_dir

    try:
        if not path.exists(file_dir):
            makedirs(file_dir)
    except:
        print("Error : Creating Directory - ", file_dir)

    file = open(file_dir + filename, "w")

    file.write(data)

    file.close()


dbconfig = {"host": sys.argv[1], "user": sys.argv[2],
            "password": sys.argv[3], "database": sys.argv[4]}

eue_db = pymysql.connect(user=dbconfig["user"], password=dbconfig["password"],
                         host=dbconfig["host"], db=dbconfig["database"], charset='utf8')
cursor = eue_db.cursor(pymysql.cursors.DictCursor)

query = "SELECT ID,DATALINK FROM USER;"
cursor.execute(query)
result = cursor.fetchall()

# Main Process
for userdata in result:

    print("User ID : ", userdata["ID"])
    print("Data Processing Start...")

    # Get Data links
    # ./data/DO/SGG/EMD/Users/ID
    user_datalink = userdata["DATALINK"]
    dir_ls = user_datalink.split("/")

    # ./data/DO/SGG/EMD/Outside
    outside_datalink = ("/").join(dir_ls[:-2]) + "/Outside"

    # data load
    train_x, train_t, weights, bias, mean, std_d = preprocessingData(
        user_datalink, outside_datalink)

    # linear regression
    model = LinearRegression(train_x, train_t, weights,
                             bias, learning_rate=0.05)
    model.gradientDescent()

    # Save the Parameters.
    # - analysis_parameters
    analysis_data = ""

    for i in range(len(model.weights[0])):
        analysis_data += str(model.weights[0][i]) + ','

    analysis_data += str(model.bias)

    storeParameters(user_datalink, "/analysis_parameters.csv", analysis_data)

    # - prediction_parameters
    prediction_data = ""

    for i in range(len(mean)):
        prediction_data += str(mean[i][0]) + ','
    prediction_data = prediction_data[:-1]
    prediction_data += '\n'

    for i in range(len(std_d)):
        prediction_data += str(std_d[i][0]) + ','
    prediction_data = prediction_data[:-1]

    storeParameters(
        user_datalink, "/prediction_parameters.csv", prediction_data)
