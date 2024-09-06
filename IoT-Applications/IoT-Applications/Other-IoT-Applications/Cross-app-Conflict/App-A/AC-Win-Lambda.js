const mqtt = require('mqtt');

async function main() {
    // Connect to MQTT broker
    const client = mqtt.connect('mqtt://localhost:1883');

    // Subscribe to the AC status topic
    client.on('connect', () => {
        console.log('Connected to MQTT broker');
        client.subscribe('ac_status');
    });

    // Handle incoming AC status messages
    client.on('message', (topic, message) => {
        const acStatus = message.toString();
        console.log(`Received AC status on topic ${topic}:`, acStatus);
        controlWindowStatus(acStatus);
    });
}

// Function to control window status based on AC status
function controlWindowStatus(acStatus) {
    // Simulated initial window status
    let windowStatus = 'Open';
    console.log('Initial Window Status:', windowStatus);

    // Control logic to close the window if AC is ON
    if (acStatus === 'ON' && windowStatus === 'Open') {
        windowStatus = 'Closed';
        console.log('Window Status: Closed');
    } else if (acStatus === 'OFF' && windowStatus === 'Closed') {
        windowStatus = 'Open';
        console.log('Window Status: Open');
    } else {
        console.log('Window Status: No change');
    }
}

// Start the main function
main().catch(console.error);
