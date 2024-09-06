To demonstrate the non-deterministic order of asynchronous operations, where createBundle and uploadStr can finish in any order.
C:\Users\Nagalakshmi\Desktop\PhD-PH2019005\Paper-2-SETTA\Feb-SOSE\CG+CFG\App2>node Sensor.js
Sensor data published to fireDetection/sensor, count: 1
Sensor data published to fireDetection/sensor, count: 2
Sensor data published to fireDetection/sensor, count: 3
Sensor data published to fireDetection/sensor, count: 4
Sensor data published to fireDetection/sensor, count: 5
Sensor data published to fireDetection/sensor, count: 6
Sensor data published to fireDetection/sensor, count: 7
***********************************************
C:\Users\Nagalakshmi\Desktop\PhD-PH2019005\Paper-2-SETTA\Feb-SOSE\CG+CFG\App2>node Fire_lambda.js
Connected to MQTT broker
Subscribed to fireDetection/#
Threshold exceeded for client Fire_sensor - count: 1
Bundle created for client Fire_sensor - count: 1
Data uploaded successfully for client Fire_sensor - count: 1

Threshold not exceeded for client Fire_sensor - count: 2

Threshold exceeded for client Fire_sensor - count: 3
Data uploaded successfully for client Fire_sensor - count: 3
Bundle created for client Fire_sensor - count: 3

Threshold exceeded for client Fire_sensor - count: 4
Data uploaded successfully for client Fire_sensor - count: 4
Bundle created for client Fire_sensor - count: 4

Threshold exceeded for client Fire_sensor - count: 5
Bundle created for client Fire_sensor - count: 5
Data uploaded successfully for client Fire_sensor - count: 5

Threshold not exceeded for client Fire_sensor - count: 6
Threshold not exceeded for client Fire_sensor - count: 7