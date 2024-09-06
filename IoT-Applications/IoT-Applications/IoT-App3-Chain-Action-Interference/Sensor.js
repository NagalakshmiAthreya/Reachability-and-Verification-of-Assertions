const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost:1883'); // Connect to the Mosquitto broker

const SENSOR_TOPIC = 'home/temperature';

function generateRandomTemperature() {
    return (Math.random() * (30 - 18) + 18).toFixed(2);
}

function publishTemperature() {
    const temperature = generateRandomTemperature();
    client.publish(SENSOR_TOPIC, temperature, () => {
        console.log(`Published temperature: ${temperature}°C`);
    });
}

// Simulate temperature data publishing every 5 seconds
setInterval(publishTemperature, 5000);

client.on('connect', () => {
    console.log('Connected to MQTT broker');
});

client.on('error', (error) => {
    console.error(`MQTT connection error: ${error}`);
});
