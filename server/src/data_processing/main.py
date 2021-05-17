"""
    # main.py

    - Load된 데이터들에 대해 Linear Regression을 진행합니다.
    - 진행된 후의 Weights를 파일로 저장합니다.
"""

import sys
import pymysql
from preprocessing import preprocessingData


def getUsersDataLinks(dbconfig):
    eue_db = pymysql.connect(user=dbconfig["user"], password=dbconfig["password"],
                             host=dbconfig["host"], db=dbconfig["database"], charset='utf8')
    cursor = eue_db.cursor(pymysql.cursors.DictCursor)

    query = "SELECT ID,DATALINK FROM USER;"
    cursor.execute(query)
    result = cursor.fetchall()

    return result


dbconfig = {"host": sys.argv[1], "user": sys.argv[2],
            "password": sys.argv[3], "database": sys.argv[4]}


users = getUsersDataLinks(dbconfig)

for userdata in users:
    # Get Data links
    # ./data/DO/SGG/EMD/Users/ID
    user_datalink = userdata["DATALINK"]
    dir_ls = user_datalink.split("/")
    # ./data/DO/SGG/EMD/Outside
    outside_datalink = ("/").join(dir_ls[:-2]) + "/Outside"

    # data load
    train_x, train_t = preprocessingData(user_datalink, outside_datalink)

    # linear regression
    pass
