
#include <SPI.h>
#include <Wire.h>
#include <Ethernet.h>
#include "rgb_lcd.h"



const int B = 3975;
int val;
const int pinTemp = A0;

byte mac[] = {0x98,0x4F,0xEE,0x05,0x37,0x48};
IPAddress server(172,19,6,189);
EthernetClient client;

void setup() {

  // Open serial communications and wait for port to open:
   system("ifdown eth0");
  delay(500);
  system("ifup eth0");

  Serial.begin(9600);
   while (!Serial) {
    ; // wait for serial port to connect. Needed for Leonardo only
  }

  // start the Ethernet connection:
  if (Ethernet.begin(mac) == 0) {
    Serial.println("Failed to configure Ethernet using DHCP");
    // no point in carrying on, so do nothing forevermore:
    for(;;)
      ;
  }
  Serial.print(Ethernet.localIP());
  // give the Ethernet shield a second to initialize:
  delay(1000);
}

void loop()
{
  
   int val = analogRead(pinTemp);
    float resistance = (float)(1023-val)*10000/val;

    // Calculate the temperature based on the resistance value.
    int temperature = 1/(log(resistance/10000)/B+1/298.15)-273.15;
    //Serial.println(temperature);
    
if(temperature>16.0){
  
      if (client.connect(server,4300)) {
        
          // adding temp 
     String s = "GET /add?value=";
     s+=temperature;
     client.println(s);
     client.println();
     
//-------------------------------------------

          // reading tmp
      //String s = "GET /getById?id=23";
     
    
//-------------------------------------------
   } 
 }

delay(3000);
}

