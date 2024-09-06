const mqtt = require('mqtt');

async function main() {
    // Connect to MQTT broker
    const client = mqtt.connect('mqtt://localhost:1883');

    // Subscribe to the LWT topic
    client.on('connect', () => {
        console.log('Connected to MQTT broker');
        client.subscribe('sensor_publisher_status');
        client.subscribe('sensor_data');
    });

    // Handle incoming messages
    client.on('message', (topic, message) => {
        if (topic === 'sensor_publisher_status') {
            const statusMessage = message.toString();
            console.log(`Received status message on topic ${topic}:`, statusMessage);
            if (statusMessage === 'offline') {
                publishAlert(client);
            }
        } else if (topic === 'sensor_data') {
            const data = JSON.parse(message.toString());
            console.log('Received sensor data:', data);
            if (data.temperature > 35) {
                checkWindowStatusAndSetAcStatus(client, data.temperature);
            }
        }
    });
}

// Function to publish an alert message
function publishAlert(client) {
    const alertMessage = 'Sensor is no longer working/abruptly stopped';
    client.publish('sensor_alerts', alertMessage, { qos: 1, retain: false }, (err) => {
        if (err) {
            console.error('Failed to publish alert message:', err);
        } else {
            console.log('Published alert message:', alertMessage);
        }
    });
}

// Function to check window status and set AC status
function checkWindowStatusAndSetAcStatus(client, temperature) {
    console.log('Temperature:', temperature);

    // Simulated window status (replace with actual logic)
    const windowStatus = 'Closed';

    // Simulated initial AC status
    let acStatus = 'OFF';
    console.log('Initial AC Status:', acStatus);

    // Check if the window is closed
    if (windowStatus === 'Closed') {
        if (acStatus === 'OFF') {
            acStatus = 'ON';
        }
    }

    // Publish the new AC status
    publishAcStatus(client, acStatus);
}

// Function to publish AC status
function publishAcStatus(client, acStatus) {
    client.publish('ac_status', acStatus, { qos: 1, retain: false }, (err) => {
        if (err) {
            console.error('Failed to publish AC status:', err);
        } else {
            console.log('Published AC status:', acStatus);
        }
    });
}

// Start the main function
main().catch(console.error);
