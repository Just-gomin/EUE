# API 명세서

## API 명세 Table

| Category       | HTTP Method | URI                   | Description                                                 |
| :------------- | :---------: | :-------------------- | :---------------------------------------------------------- |
| Root           |     ﹒      | /api                  | 서버의 기본 경로                                            |
| Data Collector |     GET     | /data/input?...       | 아두이노를 통해 수집한 자료 등록 (내부, 외부는 쿼리로 구분) |
| Data           |     GET     | /data/user            | 사용자 지정 장소의 날씨 데이터 요청                         |
| Data           |     GET     | /data/outside?loccode | 해당 지역구의 날씨 데이터 요청                              |
| Data           |     GET     | /data/loccode         | 행정 구역 코드 요청                                         |
| Auth           |    POST     | /signup               | 회원가입 요청                                               |
| Auth           |    POST     | /login                | 로그인 요청                                                 |
| Auth           |     GET     | /logout               | 로그아웃 요청                                               |
| Auth           |     GET     | /confirm?...          | 메일 인증용 토큰의 유효성 확인 요청                         |
| User Info      |     GET     | /user-info            | 회원 정보 요청                                              |
| User Info      |    POST     | /edit-profile         | 회원 정보 수정 요청                                         |
| User Info      |     GET     | /toggle-aircon        | 회원의 에어컨 사용 여부 정보 수정 요청                      |

<br><br>

## 주소 접근 방법

      [ "http://localhost:[your_port]" or "your_domain"]/api/--[URI]--

먼저 도메인을 입력 후, api서버의 기초 주소인 **/api**를 입력하고 위의 표 중 필요한 경로로 접근합니다.

<br><br>

## 응답(Response)

1. **Status Code** : 주로 데이터 수집기에게 보내는 응답입니다.
2. **Redirecttion** : 특정 요청에 대해 데이터 전송이 아닌 다른 주소로의 이동이 필요한 경우의 응답입니다.
3. **JSON** : 데이터 요청에 대한 응답입니다.

```js
/*
   ## 서버의 응답 json 형태
*/

{
   msg : — ( "OK!" / "ERROR!" ) — ,
   contents:{
      — 각 응답 별 요청 데이터 첨부 —
      existing_user : true / false,
      mail_sending: true / false,
      loc_code : — 도/시군구/읍면동 이름과 코드 —,
      user_info : — 사용자 정보 —,
      weather_out : — 실외 날씨 데이터 —,
      weather_in : — 실내(사용자 개인) 날씨 데이터 —,
      weather_predict : — 사용자 날씨 데이터를 통한 예측 값 —,
      error: — 에러 —,
   }
}

```

각 url로 접근 시 서버는 위의 형태와 같이 **"msg"** 와 **"contents"**, 두 가지 영역으로 구성된 json 응답을 전송합니다.

<br>

### msg

서버에서 해당 요청을 정상적으로 처리했다면 "OK!"를, 요청을 처리하는 중 오류가 발생했다면 "ERROR!"를 전달합니다.

<br>

### contents

#### 1. existing_user

- 회원가입

  - 이미 가입된 사용자인지 여부를 전달합니다
  - true : 가입된 사용자 / false : 미등록 사용자(신규 사용자)

- 로그인

  - DB에 등록된 사용자인지 여부를 전달합니다.
  - true : 가입된 사용자 / false : 미등록 사용자

#### 2. mail_sending

- 로그인
  - 메일 발송의 성공 여부를 전달합니다.
  - true : 메일 발송 성공 / false : 메일 발송 실패

#### 3. loc_code

- 도 / 시군구 / 읍면동의 지역 이름과 코드를 전달합니다.

#### 4. user_info

- 로그인 후

  - 화면에 표시될 사항들을 위해 사용자 정보를 전송합니다.

- 프로필 수정

  - 수정 요청 전 : 현재 사용자의 정보를 전송합니다.
  - 수정 요청 후 : 수정된 사용자의 정보를 전송합니다.

#### 4. weather_out

- 실외 날씨데이터를 전달합니다.

#### 5. weather_user

- 사용자의 날씨 데이터를 전달합니다.

#### 6, error

- 에러 발생시 에러의 내용을 전송합니다.

<br><br>

## API 명세 기록

<br>

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

      2021.05.07 +) Data Collector의 경우 Post 방식으로 보내주는 것이 맞으나, 현재 Get방식을 이용하고 있습니다. 올해 초 부터 아두이노에서 POST로 전송을 하고자 여러 자료를 찾아 봤지만, 방법을 찾지 못해 일단 진행 하였습니다. 방법을 발견하면 수정을 진행하겠습니다.

<br>

### 2021.07.12 \_ 경로 수정

1. 도 정보를 가져오는 경로 수정
   : loccode/do -> loccode/doe

<br>

### 2021.07.19 \_ 경로 수정

1. API 서버로의 기본 주소 수정
   : "/" -> "/api"

2. 행정 구역 코드 데이터 주소 수정
   : "도", "시/군/구", "읍/면/동"의 데이터를 따로 요청할 수 있던 것에서, 한번에 처리하도록 변경

<br>

### 2021.07.26 \_ 경로 추가 및 분류 변경

1. 사용자 정보 주소 추가
   : 사용자의 정보를 요청하는 주소 추가 "/user-info"

2. 사용자 지역 코드 수정 주소 추가
   : 사용자의 지역 코드 수정 주소 "/set-loccode" 추가

3. 사용자 인증 주소 추가
   : 사용자가 메일을 통해 발급받은 주소로 이동시 토큰의 유효성을 검사하는 주소 "/confirm" 추가

4. 사용자 인증과 사용자 정보 주소 분류 구분
   : 사용자 인증에 관한 주소 "Auth", 사용자 정보에 관한 주소 "User Info" 분류 구분.

<br>

### 2021.07.29 \_ 경로 삭제 및 응답 방식 작성

1. 사용자 지역 코드 수정 주소 삭제
   : 사용자 정보를 수정하는 "/edit-profile" 에서 처리

2. 서버의 응답 형태와 전달 내용 작성

### 2021.07.30 \_ 로그아웃 경로 추가

1. 로그아웃 요청 주소 생성
   : 로그아웃 요청 시 클라이언트의 쿠키에 저장된 토큰을 없애도록 처리.

### 2021.07.31 \_ 에어컨 사용

1. 에어컨 사용 토글 버튼 처리 주소 생성
   : 사용자의 에어컨 사용 여부 변환 처리.
