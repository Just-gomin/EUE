"""
    # preprocessing.py

    데이터 전처리를 위한 파일입니다.
    DB에 저장된 값들을 불러와 사용자 등록 장소의 날씨 데이터와 외부 날씨 데이터를 결합해 CSV 파일을 생성합니다.

"""

def preprocess(cursor, host):
    """
        ### preprocess(cursor, host)

        - cursor : psycopg2의 SQL 실행을 위한 cursor.
        - host : 사용자 정보.

        사용자 정보를 바탕으로 외부 날씨와 내부 날씨를 검색해 CSV 파일로 작성합니다. 
    """

    cursor.execute(
        "SELECT t2.collected_at as \"date\", temp_out, humi_out, press, wind_speed, temp_in, humi_in, lights FROM"
        + " (SELECT collected_at, temp as temp_out, humi as humi_out,press, wind_speed FROM Weather_Outs WHERE loc_code = %s) t1"
        + " JOIN "
        + " (SELECT collected_at, temp as temp_in, humi as humi_in, lights FROM Weather_Ins WHERE host = %s) t2"
        + " ON t1.collected_at = t2.collected_at", (host["loc_code"], host["email"],))
    results = cursor.fetchall()

    file = open("/src/dataprocessing/temp.csv", 'w')

    # header
    file.write("date,temp_out,humi_out,press,wind_speed,temp_in,humi_in,lights\n")

    for result in results:
        file.write("{0},{1},{2},{3},{4},{5},{6},{7}\n".format(
            result[0], result[1], result[2], result[3], result[4], result[5], result[6], result[7]))

    file.close()
