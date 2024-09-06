const mqtt = require('mqtt');

// MQTT broker URL
const brokerUrl = 'mqtt://localhost:1883'; // Replace with your broker URL

// Client options including LWT configuration
const options = {
    clientId: 'ID1', // Client ID
    will: {
        topic: 'sensor_publisher_status', // LWT topic
        payload: 'ID1_offline', // LWT payload
        qos: 1, // QoS level for LWT message
        retain: true // Retain flag for LWT message
    }
};

// Create MQTT client instance with options
const client = mqtt.connect(brokerUrl, options);

// Connect to MQTT broker
client.on('connect', function () {
    console.log('Connected to MQTT broker');

    // Set status to online
    client.publish('sensor_publisher_status', 'ID1_online', { qos: 1, retain: true });

    // Publish sensor data every 5 seconds
    setInterval(publishSensorData, 5000);
});

// Function to publish sensor data
function publishSensorData() {
	console.trace('entering publishSensorData()');
    // Generate random sensor data
    const sensorData = {
		ID:1,
        temperature: getRandomInt(10, 40), // Random temperature between 10°C and 40°C
        humidity: getRandomInt(40, 80),    // Random humidity between 40% and 80%
        timestamp: new Date().toISOString() // Current timestamp
    };

    // Publish sensor data to topic
    client.publish('sensor_data', JSON.stringify(sensorData));
    console.log('Published sensor data:', sensorData);
}

// Function to generate random integer between min and max (inclusive)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Handle errors
client.on('error', function (error) {
    console.error('Error:', error);
});

// Disconnect from MQTT broker when application exits
process.on('SIGINT', function () {
    // Set status to offline before disconnecting
    client.publish('sensor_publisher_status', 'offline', { qos: 1, retain: true });
    client.end();
    console.log('Disconnected from MQTT broker');
    process.exit();
});
