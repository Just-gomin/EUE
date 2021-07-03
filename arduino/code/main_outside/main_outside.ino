/*

  # 실외 데이터 수집기 코드

  ## 사용자 변수

  1. String SSID
  2. String SSPW
  3. String EUEIP
  4. int EUEPORT
  5. String locCode
  6. float lati
  7. float lng 
  
  ## PC에 연결하여 동작 (시리얼 모니터 사용 O)

    시리얼 모니터를 통해 상태를 확인하는 경우, 사용자 변수들의 값만 변경하여 사용합니다.

  ## 아두이노 단독 실행 (시리얼 모니터 사용 X)

    시리얼 모니터를 사용하지 않는 경우, 사용자 변수 값 변경 이외에 아래 "Serial.~~" 꼴로 된 라인은 모두 주석처리 해줍니다.

*/

#include <SoftwareSerial.h>
#include <TimeLib.h>
#include <DS1302RTC.h>


#define ESP_TX 2         // ESP8266 모듈의 TX 핀
#define ESP_RX 3         // ESP8266 모듈의 RX 핀

#define RTC_CLK 4        // DS1302RTC 모듈의 CLK 핀
#define RTC_DAT 5        // DS1302RTC 모듈의 DAT 핀
#define RTC_RST 6        // DS1302RTC 모듈의 CLK 핀

SoftwareSerial esp(ESP_TX,ESP_RX);          // ESP 모듈 객체 생성
DS1302RTC rtc(RTC_RST, RTC_DAT, RTC_CLK);   // RTC 모듈 객체 생성


String SSID = "Wifi_SSID";        // Wifi - SSID
String SSPW = "Wifi_SSPW";        // Wifi - SSPW

String EUEIP = "EUE_IP";          // Web Server - IP
int EUEPORT = 8081;               // Web Server - Port

// 함수 선언부
void connectESP();
void connectWifi();
void sendData(String vars);
void printTime(tmElements_t tm);


void setup() {

  Serial.begin(9600);     // Serial monitor의 통신 속도 9600으로 설정
  esp.begin(9600);        // esp모듈의 통신 속도 9600으로 설정

  connectESP();           // ESP 모듈 탐색
  connectWifi();          // ESP 모듈 wifi 연결

  // DS1302 RTC 모듈이 작동 중인지 확인
  if(rtc.haltRTC()){
    Serial.println("The DS1302 is stopped.");
    rtc.haltRTC(0);
    Serial.println("The DS1302 starts.");
    delay(100);
  } else{
    Serial.println("The DS1302 is working");
  }
  Serial.println();

  // DS1302 RTC 모듈이 쓰기 금지 모드 상태인지 확인
  if(rtc.writeEN() == 0){
    Serial.println("The DS1302 is write protected.");
  } else{
    Serial.println("The DS1302 can write.");
    rtc.writeEN(false);
    Serial.println("Write protected is started.");
  }
  Serial.println();
}

void loop() {

  tmElements_t tm;        // 시간 데이터를 저장하는 변수
  if(rtc.read(tm) == 0){

    printTime(tm);
    
    if(tm.Minute % 10 == 0 && tm.Second == 0){
      // Wifi 연결 확인
      String cmd = "AT+CWJAP?";
      esp.println(cmd);
      if(esp.find("No AP")){
        Serial.println("Wifi disconnected, try to connect...");
        connectESP();           // ESP 모듈 탐색
        connectWifi();          // ESP 모듈 wifi 연결 
      }

      String input = "";        // 전송할 데이터

      String date = "";         // 전송 시점 데이터
      date += String(tmYearToCalendar(tm.Year));
      date += tm.Month < 10 ? '0' + String(tm.Month) : String(tm.Month);
      date += tm.Day < 10 ? '0' + String(tm.Day) : String(tm.Day);
      date += tm.Hour < 10 ? '0' + String(tm.Hour): String(tm.Hour);
      date += tm.Minute < 10 ? '0' + String(tm.Minute) : String(tm.Minute);
    
      String type_ = "Out";
      String locCode = "3743011";
      float lati = 37.241706;
      String str_lati = String(lati,6);
      float lng = 131.864889;
      String str_lng = String(lng,6);
    
      input += "type=" + type_;
      input += "&locCode=" + locCode;
      input += "&date=" + date;
      input += "&lat=" + str_lati;
      input += "&lng=" + str_lng;

      sendData(input);
    }
  }

  delay(1000);    // 1초 단위로 확인하기 위한 지연
}

// 함수 정의부

// ESP 모듈 연결 함수
void connectESP(){
  esp.println("AT");
  Serial.println("AT Sent");
  while(!esp.find("OK")){
    esp.println("AT");
    Serial.println("ESP8266 Not Found.");
  }
  Serial.println("OK Command Received.");
  Serial.println();
}

// Wifi 연결 함수

void connectWifi(){
  String cmd = "AT+CWMODE=1";                         // Client로 설정
  esp.println(cmd);
  Serial.println("Set ESP8266 to client.");

  Serial.println("Connecting to Wifi...");
  cmd = "AT+CWJAP=\"" + SSID + "\"," + SSPW + "\"";   // Wifi 연결
  esp.println(cmd);
 
  while(!esp.find("OK"));
  Serial.println("Wifi Connected");
  
  cmd = "AT+CWJAP?";                                  // 현재 연결된 AP 정보 확인, 연결 안되어있을 시 "No AP" 출력
  esp.println(cmd);
  Serial.write(esp.read());
  Serial.println();
}

// 서버에 데이터 전송 함수
void sendData(String input){
  
  // ESP 모듈을 통해 Server로 데이터 전송
  esp.println("AT+CIPSTART=\"TCP\",\"" + EUEIP + "\"," + EUEPORT);
  if(esp.find("Error")){
    Serial.println("AT+CIPSTART Error...");
  }

  // Get 방식을 이용한 전송
  String msg = "GET /data/input?";
  msg += input;
  
  msg += " HTTP/1.0\r\n\r\n";
  esp.print("AT+CIPSEND=");
  esp.println(msg.length());
  delay(2000);

  if(esp.find(">")){
    esp.print(msg);
    Serial.println(msg);
    Serial.println("Data sent.");
    delay(1000);
  }
  
  Serial.println("Connection Closed.");
  esp.println("AT+CIPCLOSE");
  Serial.println();
}

// 시간 출력 함수
void printTime(tmElements_t tm){
  Serial.print(tmYearToCalendar(tm.Year));
  Serial.print(" / ");
  Serial.print(tm.Month < 10 ? '0' + String(tm.Month) : tm.Month);
  Serial.print(" / ");
  Serial.print(tm.Day < 10 ? '0' + String(tm.Day) : tm.Day);
  Serial.print(" - ");
  Serial.print(tm.Hour < 10 ? '0' + String(tm.Hour) : tm.Hour);
  Serial.print(" : ");
  Serial.print(tm.Minute < 10 ? '0' + String(tm.Minute) : tm.Minute);
  Serial.print(" : ");
  Serial.println(tm.Second < 10 ? '0' + String(tm.Second) : tm.Second);
  Serial.println();
}