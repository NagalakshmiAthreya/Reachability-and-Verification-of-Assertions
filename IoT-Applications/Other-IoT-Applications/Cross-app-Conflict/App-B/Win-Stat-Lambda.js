const mqtt = require('mqtt');

async function main() {
    const client = mqtt.connect('mqtt://localhost:1883');

    let windowStatus = 'closed';

    // Subscribe to relevant topics
    client.on('connect', () => {
        console.log('Connected to MQTT broker for action control');
        client.subscribe('window_status');
        client.subscribe('unknown_person_status');
    });

    // Handle incoming messages
    client.on('message', (topic, message) => {
        const statusMessage = message.toString();
        console.log(`Received message on topic ${topic}:`, statusMessage);

        if (topic === 'window_status') {
            windowStatus = statusMessage;
            console.log('Updated window status:', windowStatus);
        } else if (topic === 'unknown_person_status') {
            if (statusMessage === 'yes') {
                // If unknown person is detected and window is open, close the window
                if (windowStatus === 'open') {
                    console.log('Unknown person detected! Closing the window.');
                    // Publish the new window status
                    client.publish('window_status', 'closed');
                } else {
                    console.log('Unknown person detected, but the window is already closed.');
                }
            } else {
                console.log('No unknown person detected.');
            }
        }
    });
}

// Start the main function
main().catch(console.error);
