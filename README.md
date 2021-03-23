# EUE

## INDEX

**1. [프로젝트 구성](https://github.com/dorakang612/EUE#1-프로젝트-구성)</br>**
**2. [프로젝트 설치](https://github.com/dorakang612/EUE#2-프로젝트-설치)**

- 2-1. [Git](https://github.com/dorakang612/EUE#2-1-git)
- 2-2. [Zip File](https://github.com/dorakang612/EUE#2-2-zip-File)

**3. [프로젝트 실행](https://github.com/dorakang612/EUE#3-프로젝트-실행)**

- 3-1. [아두이노](https://github.com/dorakang612/EUE#3-1-아두이노)
- 3-2. [Client (React)](https://github.com/dorakang612/EUE#3-2-client-react)
- 3-3. [Server (Express.js)](https://github.com/dorakang612/EUE#3-3-server-expressjs)

</br>

---

</br>

## 1. 프로젝트 구성

    ∟ arduino
        ∟ code
            ∟ main_inside
            ∟ main_outside
        ∟ info.md
    ∟ client
    ∟ server
        ∟ (data)
        ∟ src
            ∟ controllers
            ∟ db
            ∟ routers
            ∟ views

</br>
</br>

## 2. 프로젝트 설치

</br>

### 2-1. Git

깃을 이용할 때는 프로젝트를 다운받을 경로로 이동한 뒤 다음의 명령어를 복사 및 붙여넣기 합니다.

```console
git clone https://github.com/dorakang612/EUE.git
```

</br>

**또는**

</br>

### 2-2. Zip File

프로젝트의 zip 파일을 <https://github.com/dorakang612/EUE>에서 받은 뒤 압축을 해제하여 설치합니다.

</br>
</br>

## 3. 프로젝트 실행

</br>

### 3-1. 아두이노

1. <https://www.arduino.cc/en/software>에서 Arduino IDE를 설치합니다.

   > - 이미 설치를 해두셨다면 바로 아래부터 진행합니다.
   >
   > - 최근에는 Arduino에서 Online IDE를 서비스해주는 것 같습니다. 아두이노를 많이 다루지 않아도 되므로, 필요에 따라 IDE설치 보다 Online IDE를 사용하는 것을 고려해보시기 바랍니다.(해당 내용은 추후 서비스 사용 후 수정 예정)

2. 프로젝트에서 다음의 두 파일을 수정합니다.

   - arduino/code/main_inside/main_inside.io
   - arduino/code/main_outside/main_outside.io

   위의 두 파일에 대해 본인의 상황에 맞게 다음의 것들을 수정합니다.

   1. SSID (공유기의 이름)
   2. SSPW (공유기의 비밀번호)
   3. EUEIP (웹사이트 아이피주소)
   4. EUEPORT (웹사이트 포트번호)

3. 아두이노 메인보드를 PC에 연결합니다.
4. 실내용 아두이노 보드에는 main_inside.io를 업로드합니다.
5. 외부용 아두이노 보드에는 main_inside.io를 업로드합니다.

> 프로젝트를 진행하는데 있어 사용한 모듈 정보는 arduino/info.md를 참고하시면 됩니다.

</br>

### 3-2. Client (React)

</br>

### 3-3. Server (Express.js)

1. /server 경로상으로 이동한 뒤 다음의 명령어를 실행합니다.

   ```console
   npm install
   ```

   위의 명령어를 통해 프로젝트가 사용하는 모든 node module들을 설치합니다.

2. Mysql을 통해 Database를 생성합니다.

3. 생성된 Database 상에서 다음의 명령어를 입력해 Relation들을 생성합니다.

   ```console
   mysql> source server/src/db/eue.sql
   ```

4. /server 경로상으로 이동한 뒤 db/dbsetting.js를 다음의 명령어로 실행합니다.

   ```console
   npx babel-node db/dbsetting.js
   ```

   위의 명령어를 통해 Location에 관련된 Relation들에 data가 입력됩니다.
