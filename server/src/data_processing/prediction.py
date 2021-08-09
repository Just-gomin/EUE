from config import DB
import datetime
from dateutil.relativedelta import relativedelta
import json
import os
import psycopg2
import sys
import pandas as pd
import tensorflow as tf
import numpy as np



if __name__ == "__main__":

    dbconfig = {"host": DB["host"], "port": DB["port"], "user": DB["user"],
                "password": DB["password"], "database": DB["database"]}
    user_email = sys.argv[1]

    data_dir = os.getcwd() + "/src/data_processing/temp.csv"
    model_dir = os.getcwd() + "/src/data_processing/model.h5"

    # DB Connect and Make Cursor
    connection = psycopg2.connect(
        dbname=dbconfig["database"], user=dbconfig["user"], password=dbconfig["password"], host=dbconfig["host"], port=dbconfig["port"])
    cursor = connection.cursor()

    # Get Model and Params, then Make File and Variable
    cursor.execute(
        "SELECT model_file, params FROM \"Data_Processings\" WHERE host=%s", (user_email,))
    model_params = cursor.fetchone()

    blob_model = model_params[0]
    model_file = open(model_dir, "wb")
    model_file.write(blob_model)
    model_file.close()

    params = model_params[1]
    mean = json.loads(params["mean"])
    std = json.loads(params["std"])

    # Get User Info
    cursor.execute(
        "SELECT using_aircon, loc_code FROM \"Users\" WHERE email=%s", (user_email,))
    user_info = cursor.fetchone()

    # Get Weather Data and Make File
    today = datetime.date.today()
    yesterday = today - relativedelta(days=1)
    f_yesterday = "{0}-{1}-{2}".format(yesterday.year,
                                       yesterday.month, yesterday.day)

    cursor.execute(
        "SELECT collected_at as \"date\", temp as temp_out, humi as humi_out, press, wind_speed "
        + "From \"Weather_Outs\" "
        + "WHERE loc_code = %s AND collected_at >= %s", (user_info[1], f_yesterday,)
    )
    results = cursor.fetchall()

    data_file = open(data_dir, 'w')

    # header
    data_file.write("date,temp_out,humi_out,press,wind_speed\n")

    # contents
    for result in results:
        data_file.write("{0},{1},{2},{3},{4}\n".format(
            result[0], result[1], result[2], result[3], result[4]))

    data_file.close()
    cursor.close()

    data_list = pd.read_csv(data_dir)
    new_data = data_list[-6:]

    date_time = pd.to_datetime(new_data['date'], format='%Y-%m-%d %H:%M')
    timestamp_s = date_time.map(datetime.datetime.timestamp)

    new_data = new_data[['temp_out', 'humi_out', 'press', 'wind_speed']]
    day = 24*60*60
    year = (365.2425)*day

    new_data['Day sin'] = np.sin(timestamp_s * (2 * np.pi / day))
    new_data['Day cos'] = np.cos(timestamp_s * (2 * np.pi / day))
    new_data['Year sin'] = np.sin(timestamp_s * (2 * np.pi / year))
    new_data['Year cos'] = np.cos(timestamp_s * (2 * np.pi / year))

    feature_cols = ['temp_out', 'humi_out', 'press',
                    'wind_speed', 'Day sin', 'Day cos', 'Year sin', 'Year cos']
    for col in feature_cols:
        new_data[col] =  (new_data[col] - mean[col]) / std[col]

    model_pro = tf.keras.models.load_model(model_dir)
    prediction = model_pro.predict(new_data)
    prediction = prediction * std['temp_out'] + mean['temp_out']


    # 사용한 파일 삭제
    if os.path.isfile(data_dir):
        os.remove(data_dir)

    if os.path.isfile(model_dir):
        os.remove(model_dir)

    print(prediction)
