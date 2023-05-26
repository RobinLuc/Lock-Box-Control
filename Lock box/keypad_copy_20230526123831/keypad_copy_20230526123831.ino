#include <Keypad.h>

const byte ROWS = 4;
const byte COLS = 4;

char keys[ROWS][COLS] = {
  {'1', '2', '3', 'A'},
  {'4', '5', '6', 'B'},
  {'7', '8', '9', 'C'},
  {'*', '0', '#', 'D'}
};

byte rowPins[ROWS] = {9, 8, 7, 6};
byte colPins[COLS] = {5, 4, 3, 2};

Keypad keypad = Keypad(makeKeymap(keys), rowPins, colPins, ROWS, COLS);

String password = "";
String input = "";

const int ledPin = LED_BUILTIN;
const int lightSensorPin = A6;

void setup() {
  Serial.begin(9600);
  pinMode(ledPin, OUTPUT);
  pinMode(lightSensorPin, INPUT);
}

void loop() {
  char key = keypad.getKey();

  if (key) {
    Serial.print("key");
    Serial.println(key);
    input += key;
    if (input.length() == 4) {
      Serial.print("ïnput");
      Serial.println(input);
      if (input == password){
//If the entered keys match the password received
//from the server, it toggles the state of the LED.  
        Serial.println("match");
        digitalWrite(ledPin, !digitalRead(ledPin));
      }
      input = "";
    }
  }

  if (Serial.available()) {
    password = Serial.readStringUntil('\n');
    password.trim();
    Serial.print("password");
    Serial.println(password);
  }
// It also reads the value of the light sensor 
//and sends it to the server with the prefix "LS".
  int lightSensorValue = analogRead(lightSensorPin);
  Serial.print("LS");
  Serial.println(lightSensorValue);
  delay(500);
}