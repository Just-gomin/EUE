# EUE

## INDEX

**0.[프로젝트 명세서](https://github.com/dorakang612/EUE#0-프로젝트-명세서)**</br>
**1. [프로젝트 구성](https://github.com/dorakang612/EUE#1-프로젝트-구성)</br>**
**2. [프로젝트 설치](https://github.com/dorakang612/EUE#2-프로젝트-설치)**

- 2-1. [Git](https://github.com/dorakang612/EUE#2-1-git)
- 2-2. [Zip File](https://github.com/dorakang612/EUE#2-2-zip-File)

**3. [프로젝트 실행](https://github.com/dorakang612/EUE#3-프로젝트-실행)**

- 3-1. [아두이노](https://github.com/dorakang612/EUE#3-1-아두이노)
- 3-2. [Client (React)](https://github.com/dorakang612/EUE#3-2-client-react)
- 3-3. [Server (Express.js)](https://github.com/dorakang612/EUE#3-3-server-expressjs)

<br>

---

## 0. 프로젝트 명세서

- [API 명세](https://github.com/dorakang612/EUE/blob/master/server/API%EB%AA%85%EC%84%B8%EC%84%9C.md)
- [Data 명세](https://github.com/dorakang612/EUE/blob/master/server/Data%EB%AA%85%EC%84%B8%EC%84%9C.md)

---

<br>

## 1. 프로젝트 구성

      ∟ arduino
         ∟ code
            ∟ main_inside
            ∟ main_outside
         ∟ info.md
      ∟ client
         ∟ public
         ∟ src
            ∟ components
            ∟ pages
            ∟ utils
      ∟ server
         ∟ data
            ∟ admAddressCode.csv( 출처 : https://sgis.kostat.go.kr›upload›census›adm_code)
         ∟ config
         ∟ src
            ∟ controllers
            ∟ data_processing
            ∟ db
            ∟ models
            ∟ routers
            ∟ views

<br>
<br>

## 2. 프로젝트 설치

<br>

### 2-1. Git

깃을 이용할 때는 프로젝트를 다운받을 경로로 이동한 뒤 다음의 명령어를 복사 및 붙여넣기 합니다.

```console
git clone https://github.com/dorakang612/EUE.git
```

<br>

**또는**

<br>

### 2-2. Zip File

프로젝트의 zip 파일을 <https://github.com/dorakang612/EUE>에서 받은 뒤 압축을 해제하여 설치합니다.

<br>
<br>

## 3. 프로젝트 실행

<br>

### 3-1. 아두이노

1. <https://www.arduino.cc/en/software>에서 Arduino IDE를 설치합니다.

   > - 이미 설치를 해두셨다면 바로 아래부터 진행합니다.
   >
   > - 최근에는 Arduino에서 Online IDE를 서비스해주는 것 같습니다. 아두이노를 많이 다루지 않아도 되므로, 필요에 따라 IDE설치 보다 Online IDE를 사용하는 것을 고려해보시기 바랍니다.(해당 내용은 추후 서비스 사용 후 수정 예정)

<br>

2. 프로젝트에서 다음의 두 파일을 수정합니다.

   1. arduino/code/main_inside/main_inside.io
   2. arduino/code/main_outside/main_outside.io

   - 수정할 것.
     1. SSID (공유기의 이름)
     2. SSPW (공유기의 비밀번호)
     3. EUEIP (웹사이트 아이피주소)
     4. EUEPORT (웹사이트 포트번호)

<br>

3. 아두이노 메인보드를 PC에 연결합니다.

<br>

4. 실내용 아두이노 보드에는 main_inside.io를 업로드합니다.

<br>

5. 외부용 아두이노 보드에는 main_inside.io를 업로드합니다.

> 프로젝트를 진행하는데 있어 사용한 모듈 정보는 arduino/info.md를 참고하시면 됩니다.
>
> 모듈 정보를 참고하여 RTC 모듈의 시간을 현재 시간으로 설정합니다.

> 2021.08.09 현재 데이터 수집기 동작이 원활하지 않아, 향후 보완 예정입니다.

<br>

### 3-2. Client (React)

1. /client 경로로 이동하여 다음의 명령어를 실행합니다.

   ```console
   npm install
   ```

<br>

2. /client 경로에서 다음의 명령어를 실행하여 Client를 동작시킵니다.

   ```console
   npm start
   ```

<br>

### 3-3. Server (Express.js)

<br>

1. /server 경로상으로 이동한 뒤 다음의 명령어를 실행합니다.

   ```console
   npm install
   ```

   위의 명령어를 통해 프로젝트가 사용하는 모든 node module들을 설치합니다.

<br>

2. PostgreSQL을 통해 Database를 생성합니다.

   각자의 OS에 맞는 방법으로 PostgreSQL 서버에 접속해 주신 뒤, DataBase를 생성해줍니다.

<br>

3. /server/config 경로에 있는 config_public.js를 복사하여 config.js를 생성하고, 자신의 환경에 맞도록 변수들의 값을 입력합니다.

<br>

4. /server 경로상에서 다음을 입력해 서버를 시작합니다. (개발용 서버 동작)

   ```console
   npm run dev:server
   ```
