// sensor.js
const mqtt = require('mqtt');
const mqttClient = mqtt.connect('mqtt://localhost');
// Function to generate random sensor data
function generateSensorData(count) {
  return {
    client: 'Fire_sensor',
    temperature: (Math.random() * (100 - 60) + 60).toFixed(2), // Random temperature between 60 and 100
    smokeLevel: (Math.random() * (0.1 - 0.01) + 0.01).toFixed(2), // Random smoke level between 0.01 and 0.1
    count: count // Count of the number of times this data is sent
  };
}
// Publish sensor data to MQTT topic
function publishSensorData() {
  const topic = 'fireDetection/sensor';
  let count = 1;
 setInterval(() => {
    const data = generateSensorData(count);
    mqttClient.publish(topic, JSON.stringify(data), () => {
      console.log(`Sensor data published to ${topic}, count: ${data.count}`);
    });
    count++;
  }, 5000); // Publish data every second
}
publishSensorData();
