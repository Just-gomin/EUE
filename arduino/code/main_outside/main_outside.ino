#include <SoftwareSerial.h>


#define ESPPIN_TX 2     // ESP 8266 모듈의 TX 핀
#define ESPPIN_RX 3     // ESP 8266 모듈의 RX 핀


SoftwareSerial esp(ESPPIN_TX,ESPPIN_RX);


String SSID = "Wifi_SSID";        // Wifi - SSID
String SSPW = "Wifi_SSPW";        // Wifi - SSPW

String EUEIP = "EUE_IP";          // Web Server - IP
int EUEPORT = 8081;               // Web Server - Port

void connectESP();
void connectWifi();
void sendData(String vars);


void setup() {
  Serial.begin(9600);     // Serial monitor의 통신 속도 9600으로 설정
  esp.begin(9600);        // esp모듈의 통신 속도 9600으로 설정
}

void loop() {
  connectESP();           // ESP 모듈 탐색
  connectWifi();          // ESP 모듈 wifi 연결

  String input = "";
  
  // 측정기 분류(IN / OUT)
  String type_ = "Out";
  
  // 지역 코드
  String locCode = "3743011";

  // 지역의 위도(Latitude), 경도(Longitude)
  float lati = 37.241706;
  String str_lati = String(lati,6);
  float lng = 131.864889;
  String str_lng = String(lng,6);
  
  input += "type=" + type_;
  input += "&locCode=" + locCode;
  input += "&lat=" + str_lati;
  input += "&lng=" + str_lng;
  Serial.println(input);
  
  // 데이터 전송
  sendData(input);

  // 30분마다 전송 진행
  delay(1800000);
}

// ESP모듈 연결
void connectESP(){
  esp.println("AT");
  Serial.println("AT Sent");
  while(!esp.find("OK")){
    esp.println("AT");
    Serial.println("ESP8266 Not Found.");
  }
  Serial.println("OK Command Received.");
}

// 공유기와 연결
void connectWifi(){
   // ESP8266 모듈 Client로 설정
  String cmd = "AT+CWMODE=1";
  esp.println(cmd);
  Serial.println("Set ESP8266 to client.");

  // 공유기와 연결
  Serial.println("Connecting to Wifi...");
  cmd = "AT+CWJAP=\"" + SSID + "\"," + SSPW + "\"";
  esp.println(cmd);
  
  // 연결 확인
  while(!esp.find("OK"));
  Serial.println("Wifi Connected");
  
  // 연결된 공유기 확인
  cmd = "AT+CWJAP?";
  esp.println(cmd);
  Serial.write(esp.read());
}

void sendData(String input){
  // ESP 모듈을 통해 Server로 데이터 전송
  esp.println("AT+CIPSTART=\"TCP\",\"" + EUEIP + "\"," + EUEPORT);
  if(esp.find("Error")){
    Serial.println("AT+CIPSTART Error...");
  }

  // 서버로 전송할 데이터 작성
  String vars = input;
  
  String msg = "GET /data/input?";
  msg += vars;
  msg += " HTTP/1.0\r\n\r\n";
  esp.print("AT+CIPSEND=");
  esp.println(msg.length());
  delay(2000);

  // 데이터 전송
  if(esp.find(">")){
    esp.print(msg);
    Serial.println("Data sent.");
    delay(1000);
  }

  // 서버와 연결 종료
  Serial.println("Connection Closed.");
  esp.println("AT+CIPCLOSE");
}
