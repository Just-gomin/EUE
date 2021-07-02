#include <SoftwareSerial.h>
#include <DHT.h>
#include <DHT_U.h>
#include <TimeLib.h>
#include <DS1302RTC.h>


#define ESP_TX 2         // ESP8266 모듈의 TX 핀
#define ESP_RX 3         // ESP8266 모듈의 RX 핀

#define RTC_CLK 4        // DS1302RTC 모듈의 CLK 핀
#define RTC_DAT 5        // DS1302RTC 모듈의 DAT 핀
#define RTC_RST 6        // DS1302RTC 모듈의 CLK 핀

#define DHT_DAT 10        // DHT11 핀 
#define DHTTYPE DHT11    // DHT 모듈 종류

#define CDS_D 8          // CDS 모듈 디지털 핀
#define CDS_A A0         // CDS 모듈 아날로그 핀

uint32_t delayMS;        // 센서를 읽는 지연시간


SoftwareSerial esp(ESP_TX,ESP_RX);          // ESP 모듈 객체 생성
DHT_Unified dht(DHT_DAT, DHTTYPE);          // DHT 모듈 객체 생성
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

  pinMode(CDS_D, INPUT);  // CDS모듈의 Pinmode를 Input으로 설정
  
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

  dht.begin();            // DHT11 센서 작동 시작
  Serial.println("DHT11 Unified Sensor Start.");
  Serial.println();

  sensor_t sensor;        // dht11 구조체 생성

  // 온도센서 정보 출력
  dht.temperature().getSensor(&sensor);
  Serial.println("------------------------------------");
  Serial.println("Temperature(온도)");
  Serial.print("Sensor : ");Serial.println(sensor.name);
  Serial.print("Drive Ver : ");Serial.println(sensor.version);
  Serial.print("Unique ID : ");Serial.println(sensor.sensor_id);
  Serial.print ("Max Value : "); Serial.print(sensor.max_value); Serial.println(" *C");
  Serial.print ("Min Value : "); Serial.print(sensor.min_value); Serial.println(" *C");
  Serial.print ("Resolution : "); Serial.print(sensor.resolution); Serial.println(" *C");  
  Serial.println("------------------------------------");
  Serial.println();

  // 습도센서 정보 프린트
  dht.humidity().getSensor(&sensor);
  Serial.println("------------------------------------");
  Serial.println("Humidity(습도)");
  Serial.print ("Sensor : "); Serial.println(sensor.name);
  Serial.print ("Driver Ver : "); Serial.println(sensor.version);
  Serial.print ("Unique ID : "); Serial.println(sensor.sensor_id);
  Serial.print ("Max Value : "); Serial.print(sensor.max_value); Serial.println("%");
  Serial.print ("Min Value : "); Serial.print(sensor.min_value); Serial.println("%");
  Serial.print ("Resolution : "); Serial.print(sensor.resolution); Serial.println("%");  
  Serial.println("------------------------------------");
  Serial.println();

  delayMS =sensor.min_delay /1000;                    // 센서를 읽는 시간을 최소로 설정
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
    
      sensors_event_t event;    // dht 모듈의 데이터 수집

      // 온도 데이터
      dht.temperature().getEvent(&event);
      float temp = event.temperature;
      String str_Temp = isnan(temp) != 0 ? "none" : String(temp);

      // 습도 데이터
      dht.humidity().getEvent(&event);
      float humi = event.relative_humidity;
      String str_Humi = isnan(humi) != 0 ? "none" : String(humi);

      // 조도 데이터
      int lights = analogRead(CDS_A);
      String str_Lights = isnan(lights) != 0 ? "none" : String(lights);
    
      String type_ = "In";
      String ID = "eue_tester1";
      String locCode = "3124053";
    
      input += "type=" + type_;
      input += "&id=" + ID;
      input += "&locCode=" + locCode;
      input += "&date=" + date;
      input += "&temp=" + str_Temp;
      input += "&humi=" + str_Humi;
      input += "&lights=" + str_Lights;

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