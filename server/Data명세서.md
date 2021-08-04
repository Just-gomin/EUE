### _데이터 명세서_

2021.08.04일 기준, 아두이노(데이터 수집기) 동작의 오류로 실내 데이터 없이 실외 데이터로 데이터 분석이 진행 중 입니다.
데이터 수집기의 동작 오류 해결시, 실내와 실외 데이터 분석을 재 진행 하겠습니다.

<br>

# 1. Data Store

PostgreSQL DB를 이용하여, 날씨 데이터와 분석 결과를 저장합니다.

<br>

## Weather_Out

| Field |   loc_code   | collected_at  |   temp    |   humi    | press | wind_speed |
| :---: | :----------: | :-----------: | :-------: | :-------: | :---: | :--------: |
| Mean  | 지역코드(PK) | 수집 시간(PK) | 실외 온도 | 실외 습도 | 기압  |    풍속    |
| Type  |   INTEGER    |     DATE      |   FLOAT   |   FLOAT   | FLOAT |   FLOAT    |

<br>

- 실외 데이터 수집 형식 입니다.

<br>

## Weather_In

| Field |    host    | collected_at  |   temp    |   humi    |     lights      |
| :---: | :--------: | :-----------: | :-------: | :-------: | :-------------: |
| Mean  | 사용자(PK) | 수집 시간(PK) | 실내 온도 | 실내 습도 | 실내 광도(조도) |
| Type  |   STRING   |     DATE      |   FLOAT   |   FLOAT   |      FLOAT      |

<br>

- 실내 데이터 수집 형식 입니다.

<br>

## Data_Processing

| Field |    host    |     collected_at     |        params         |
| :---: | :--------: | :------------------: | :-------------------: |
| Mean  | 사용자(PK) | 데이터 분석 날짜(PK) | 데이터 분석 결과 인자 |
| Type  |   STRING   |         DATE         |         JSON          |

<br>

- 데이터 분석을 진행하고 발생한 인자들을 저장하는 형식입니다.
- 가중치, 편향, 평균, 표준편차가 발생할 수 있고, JSON 형태로 모두 저장합니다.

<br><br>

# 2. Data Processing

<br>

매일 자정 사용자 개개인의 데이터를 바탕으로 분석과정이 진행됩니다.

1. 데이터 전처리 과정
2. 데이터 분석 과정
3. 산출 결과물 저장 과정

<br>

## File Format (2021.08.04 - 보류)

데이터 분석용 파일의 형식은 csv이며 내용은 다음과 같습니다.

|  Header  |     date     | temp_out  | humi_out  | press | wind_speed |  temp_in  |  humi_in  | lights |
| :------: | :----------: | :-------: | :-------: | :---: | :--------: | :-------: | :-------: | :----: |
| Contents | 날짜 및 시각 | 실외 온도 | 실외 습도 | 기압  |    풍속    | 실내 온도 | 실내 습도 |  광도  |

## File Format (2021.08.04 - 진행)

데이터 분석용 파일의 형식은 csv이며 내용은 다음과 같습니다.

|  Header  |     date     | temp_out  | humi_out  | press | wind_speed |
| :------: | :----------: | :-------: | :-------: | :---: | :--------: |
| Contents | 날짜 및 시각 | 실외 온도 | 실외 습도 | 기압  |    풍속    |

<br>

## Preprocessing

1. 사용자 정보(email, loc_code, using_aircon)를 검색합니다.
2. 사용자의 수 만큼 데이터 분석을 반복합니다.
3. 사용자 한명에 대해 날씨 정보를 담은 csv파일을 생성합니다.
   - 날씨 정보는 약 20,000 개의 데이터를 사용하기 위해 5개월 단위를 검색해 사용합니다.
