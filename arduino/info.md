# Arduino 정보

## Goal

온도, 습도, 조도 값을 wifi를 통해 server로 전송하도록 하는 하드웨어 제작.

## 사용 모듈

- [아두이노 우노 R3 호환보드](https://smartstore.naver.com/mechasolution_com/products/4864858307?NaPm=ct%3Dkh5sht9x%7Cci%3Dcheckout%7Ctr%3Dppc%7Ctrx%3D%7Chk%3D263e55077065b7e821aab4cb5c2c549835202409) : 메인 보드

- [DHT11 온습도 센서](https://smartstore.naver.com/mechasolution_com/products/3126779187?NaPm=ct%3Dkh5sckx3%7Cci%3Dcheckout%7Ctr%3Dppc%7Ctrx%3D%7Chk%3D24efda3bfdd3136f882e6254c93b68e6497e1750) : 온도와 습도를 측정하기 위한 모듈

  - DHT11 라이브러리 및 설명 출처 : [https://cafe.naver.com/mechawiki?iframe_url=/MyCafeIntro.nhn%3Fclubid=29397234](https://cafe.naver.com/mechawiki?iframe_url=/MyCafeIntro.nhn%3Fclubid=29397234)

- [CDS 포토셀 광 조도센서 모듈](https://smartstore.naver.com/mechasolution_com/products/2940398248?NaPm=ct%3Dkh5skvb2%7Cci%3Dcheckout%7Ctr%3Dppc%7Ctrx%3D%7Chk%3D3b2b0f3e4509d7b7987fc4d02326b431c9dc5d10) : 조도를 측정하기 위한 모듈

  - CDS 포토셀 광 조도 센서 설명 출처 : [https://cafe.naver.com/mechawiki](https://cafe.naver.com/mechawiki)

- [ESP8266 와이파이 모듈](https://smartstore.naver.com/mechasolution_com/products/3412252175?NaPm=ct%3Dkh5sisz4%7Cci%3Dcheckout%7Ctr%3Dppc%7Ctrx%3D%7Chk%3D782dcfa869b54343ad9113b3089fe8b7e1455a90) : wifi 연결 모듈

- [ESP8266 와이파이 모듈 전용 어댑터](https://smartstore.naver.com/mechasolution_com/products/3448897447?NaPm=ct%3Dkh5sj8sw%7Cci%3Dcheckout%7Ctr%3Dppc%7Ctrx%3D%7Chk%3D967033f4922b6288b4279fe63965a7511c1ecf4b) : ESP8266 wifi 모듈을 쉽게 사용하기 위한 어댑터

- [DS1302 RTC 모듈](https://smartstore.naver.com/domekit/products/599920174?NaPm=ct%3Dkqm1qi9x%7Cci%3Dcheckout%7Ctr%3Dppc%7Ctrx%3D%7Chk%3De00f325f99c7d23306f06a0380ccc65a28ff29a6) : 시간 정보를 저장할 수 있는 모듈

## 사용 라이브러리

- Adafruit Sensor Library : [https://github.com/adafruit/Adafruit_Sensor](https://github.com/adafruit/Adafruit_Sensor)
- DHT Sensor Library : [https://github.com/adafruit/DHT-sensor-library](https://github.com/adafruit/DHT-sensor-library)
- DS1302 RTC Library : [https://playground.arduino.cc/Main/DS1302RTC/](https://playground.arduino.cc/Main/DS1302RTC/)
- Time Library : 아두이노 라이브러리 관리 -> "Time by Michael Margolis" 검색 및 설치

## Arduino 참고 자료

- [https://it-g-house.tistory.com/entry/%EC%95%84%EB%91%90%EC%9D%B4%EB%85%B8Arduino-%EC%9D%B8%ED%84%B0%EB%84%B7-%ED%95%98%EA%B8%B0-Wifi-ESP-01%EC%97%B0%EA%B2%B0%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95](https://it-g-house.tistory.com/entry/%EC%95%84%EB%91%90%EC%9D%B4%EB%85%B8Arduino-%EC%9D%B8%ED%84%B0%EB%84%B7-%ED%95%98%EA%B8%B0-Wifi-ESP-01%EC%97%B0%EA%B2%B0%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95)
- [https://cafe.naver.com/mechawiki/122](https://cafe.naver.com/mechawiki/122)

## Arduino 주의 사항 (외부 전원을 통한 독립적 실행)

### 외부 전원 공급 (UNO R3 보드 기준 작성)

- 전원 공급 방식 참고 : https://chipwired.com/can-arduino-run-without-computer/

- UNO 보드의 DC 배럴 잭으로 전원을 공급 받는 경우 : 7V ~ 12V 사이의 전원을 공급

### 외부 실행시 Serial 관련 함수 생략

아두이노 학습 진행시 시리얼 모니터를 활용하기에, 코드에 Serial 함수를 필수적으로 생각할 수 있습니다. 하지만, 시리얼 모니터를 쓰지 않을 경우에는 Serial관련 함수를 적지 않습니다. Serial 관련 함수를 이용시, 시리얼 모니터를 켜야 코드가 동작될 뿐아니라 외부 전원을 공급하여 실행하고자 할 때 전혀 동작하지 않습니다.

- 시리얼 모니터 사용 O : Serial 관련 함수 사용 할 것.
- 시리얼 모니터 사용 X : Serial 관련 함수 사용 하지 않을 것.
