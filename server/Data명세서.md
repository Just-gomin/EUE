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
                      ∟ weights.csv

데이터가 저장되는 경로의 구조입니다.

- 1차 : 지역별 대분류
- 2차 : 사용자와 외부 정보 분류
- 3차 : 연 / 월 / 일 분류

<br><br>

# 2. Data Format

데이터들은 CSV(Comma Separated Values) 형식의 파일로 저장됩니다.<br><br>

## Ouside Data

외부 데이터는 다음과 같은 형식으로 저장됩니다.

| Month | Date | Hour | Minute | Temperature | Humidity |   Press   | Wind Speed |
| :---: | :--: | :--: | :----: | :---------: | :------: | :-------: | :--------: |
|  월   |  일  |  시  |   분   |   온도(℃)   | 습도(%)  | 기압(hPa) | 풍속(m/s)  |

<br><br>

## User Side Data

사용자가 설정한 장소의 데이터는 다음과 같은 형식으로 저장됩니다.

| Month | Date | Hour | Minute | Temperature | Humidity | Lights |
| :---: | :--: | :--: | :----: | :---------: | :------: | :----: |
|  월   |  일  |  시  |   분   |   온도(℃)   | 습도(%)  |  광도  |

<br><br>

# 3. Data Processing

EUE가 제일 중요하게 수행해야할 부분입니다. 데이터에 대해 선형회귀 분석을 진행합니다. 이 결과를 바탕으로 단위 시간 후의 온도를 예측해봅니다.

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
