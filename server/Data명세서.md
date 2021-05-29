### _데이터 명세서_

<br>

# 1. Data Directory Structure

    data
      ∟ Local Code (Do/도)
        ∟ Local Code (SGG/시군구)
          ∟ Local Code (EMD/읍면동)
            ∟ Outside
              ∟ YYYY (연)
                ∟ YYYYMM (연/월)
                  ∟ YYYYMMDD (연/월/일)
                    ∟ weather.csv
            ∟ Users
              ∟ ID (사용자 개인 ID)
                ∟ YYYY (연)
                  ∟ YYYYMM (연/월)
                    ∟ YYYYMMDD (연/월/일)
                      ∟ weather.csv
                      ∟ analysis_parameters.csv
                      ∟ predict_parameters.csv

데이터가 저장되는 경로의 구조입니다.

- 1차 : 지역별 대분류
- 2차 : 사용자와 외부 정보 분류
- 3차 : 연 / 월 / 일 분류

<br><br>

# 2. Data Format

데이터들은 CSV(Comma Separated Values) 형식의 파일로 저장됩니다.<br><br>

## Ouside Data - weather.csv

외부 데이터는 다음과 같은 형식으로 저장됩니다.

| Month | Date | Hour | Minute | Temperature | Humidity |   Press   | Wind Speed |
| :---: | :--: | :--: | :----: | :---------: | :------: | :-------: | :--------: |
|  월   |  일  |  시  |   분   |   온도(℃)   | 습도(%)  | 기압(hPa) | 풍속(m/s)  |

<br><br>

## User Side Data - weather.csv

사용자가 설정한 장소의 데이터는 다음과 같은 형식으로 저장됩니다.

| Month | Date | Hour | Minute | Temperature | Humidity | Lights |
| :---: | :--: | :--: | :----: | :---------: | :------: | :----: |
|  월   |  일  |  시  |   분   |   온도(℃)   | 습도(%)  |  광도  |

<br><br>

## User Side Data - analysis_parameters.csv

Linear Regression을 진행하며 조정된 가중치와 편향 값입니다. 마지막 한개의 값이 편향이며, 이외의 값은 가중치 입니다.

| Weights |  …  | Bias |
| :-----: | :-: | :--: |
| 가중치  |  …  | 편향 |

<br><br>

## User Side Data - prediction_parameters.csv

출력된 결과 값을 통해 온도를 유추하기 위한 값들입니다. 첫 번째 줄이 각 데이터 범주들의 평균치 이며, 두 번째 줄이 표준편차 입니다.

| Line NO. |  Parameters Name   |          Meaning           |
| :------: | :----------------: | :------------------------: |
|    1     |       Means        |   10가지 데이터들의 평균   |
|    2     | Standard Deviation | 10가지 데이터들의 표준편차 |

<br><br>

# 3. Data Processing

EUE가 제일 중요하게 수행해야할 부분입니다. 데이터에 대해 선형회귀 분석을 진행합니다. 이 결과를 바탕으로 단위 시간 후의 온도를 예측해봅니다.
각 데이터들 마다 그 크기가 다양해, 크기가 클 수록 결과에 많은 영향을 미칩니다. 이에 따라 **Z 점수 정규화**를 진행하겠습니다.

- [정규화](<https://en.wikipedia.org/wiki/Normalization_(statistics)>)
- [z 점수 (표준 점수)](https://ko.wikipedia.org/wiki/%ED%91%9C%EC%A4%80_%EC%A0%90%EC%88%98)

예측 결과는 표준 점수로 나올 것이며, 해당 점수에 실내 온도의 표준편차를 곱하고, 평균을 더해 줌으로써 예측한 온도 값을 구할 수 있습니다.

    z = (x - m) / θ

          ⥥

    x = z * θ + m

    x : 데이터 , z : 표준 점수, m : 평균, θ : 표준 편차

## Input Data

- 공통 데이터

  - 월 ( Month )
  - 일 ( Date )
  - 시 ( Hour )

- 외부 데이터

  - 온도 ( Out Temperature )
  - 습도 ( Out Humidity )
  - 기압 ( Out Pressure )
  - 풍속 ( Out Wind Speed )

- 사용자 데이터
  - 온도 ( Temperature )
  - 습도 ( Humidity )
  - 광도 ( Lights )

<br>

## Output Data

- 사용자 장소의 미래 온도

  : 현재 시간에 들어온 데이터들을 통해서 다음 30분, 한시간의 데이터를 예측합니다.<br><br>

## Modeling Method

[Linear Regression](https://ko.wikipedia.org/wiki/선형_회귀)를 통해서 데이터들의 선형 관계를 파악 후 다음의 온도를 예측해보려 합니다.

매일 자정(Day K) 데이터 처리 과정이 진행 됩니다. 따라서 (Day K - 1)의 데이터들과 (Day K - 1)까지 사용된 가중치 데이터들을 이용해 Linear Regression을 진행합니다. 데이터 처리 과정이 진행된 후의 가중치들은 (Day K)의 가중치 파일로 생성되어 저장됩니다.

## Data Processing Files

데이터 처리에 관한 부분은 파이썬 코드로 진행 됩니다.

    server
      ∟ src
        ∟ ...
        ∟ data_processing
          ∟ linear_regression.py
          ∟ main.py
          ∟ preprocessing.py

1. 매일 자정이 되면 서버는 child process를 생성해 **/src/data_processing/main.py** 를 호출합니다. <br><br>
2. main.py는 DB에 관한 정보를 넘겨받아, data들이 존재하는 링크를 획득합니다. <br><br>
3. 링크들을 **/src/data_processing/preprocessing.py**의 preprocessing 메소드로 넘겨줍니다. <br><br>
4. preprocessing 메소드는 수집된 데이터들과 이전까지 진행한 변수들의 정보를 연산 가능한 상태로 가공하여 반환합니다. <br><br>

- 가공 후의 데이터 타입 및 Shape
  | 변수 명 | 의미 | Shape |
  | :---:|:---:|:---:|
  |train_x|정규화된 수집 데이터 | (n , 1)|
  |train_t| 정규화된 온도 값|(n, 1)|
  |weights| 가중치|(10, 1) or None|
  |bias |편향|float or None|
  |mean |각 데이터 범주의 평균| (10, 1)|
  |std_d |각 데이터 범주의 표준 편차| (10, 1)|

  <br><br>

  Preprocessing 과정에서 구해진 평균과 표준 오차는 사용자의 링크 하위에 **prediction_parameters.csv**로 저장합니다.

<br><br>

5. 가공된 데이터들을 바탕으로 학습률이 0.05이며, 비용 함수는 평균제곱 오차(MSE)인 선형회귀 분석을 진행합니다.<br><br>
6. 선형 회귀 분석이 후 생긴 가중치와 편향을 **analysis_parameters.csv**로 저장합니다.<br><br>

# 4. Prediction

사용자 화면에 현재까지의 기록과 함께 단위 시간 뒤의 온도 예측 결과를 보이는 것을 목표로 합니다.

---- 진행중 입니다. ----
