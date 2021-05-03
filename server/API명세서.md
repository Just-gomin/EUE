# API 명세서

## API 명세 Table

| Category       | HTTP Method | URI                        | Description                                                 |
| -------------- | ----------- | -------------------------- | ----------------------------------------------------------- |
| Data Collector | GET         | /data/input?...            | 아두이노를 통해 수집한 자료 등록 (내부, 외부는 쿼리로 구분) |
| Data - User    | GET         | /data/user/:id             | 사용자 지정 장소의 데이터 요청                              |
| Data - Outside | GET         | /data/outside/:id          | 해당 지역구의 데이터 요청                                   |
| Local Code     | GET         | /loccode/do                | 행정 구역 코드 '도' 요청                                    |
| Local Code     | GET         | /loccode/sigungu/:id       | 사용자 입력 '도'에 따른 행정 구역 코드 '시군구' 요청        |
| Local Code     | GET         | /loccod/eup-myeon-dong/:id | 사용자 입력 '시군구'에 따른 행정 구역 코드 '읍면동' 요청    |
| Auth           | POST        | /signup                    | 회원가입 요청                                               |
| Auth           | POST        | /login                     | 로그인 요청                                                 |
| Auth           | POST        | /:id/edit-profile          | 회원 정보 수정 요청                                         |

---

## API 명세 기록

### 2021.05.03 \_ API 명세 초안 작성

1. Data Collector Routes
   : 데이터 수집기로 부터 정보를 전송하기 위함

- [x] 내부 데이터 수집기로 부터 데이터 전송
- [x] 외부 데이터 수집기로 부터 데이터 전송

2. API Routes
   : 최근 해당 지역구 및 사용자 등록 장소의 3시간 이내의 데이터를 그래프로 표현하기 위함

- [x] 사용자 가입 시 주소지 목록을 위한 경로 ( 도 / 시군구 / 읍면동)
- [x] 사용자 등록 장소(실내) Data
- [x] 사용자 지역구(외부) Data

3. Auth Routes
   : 사용자 등록, 확인 및 변경. 사용자 메인

- [x] 사용자 정보 변경 ( Edit )
- [x] 사용자 확인 ( Log-in )
- [x] 사용자 등록 ( Register )
