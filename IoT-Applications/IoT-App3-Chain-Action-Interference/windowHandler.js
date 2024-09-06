const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost:1883'); // Connect to the Mosquitto broker

exports.windowHandler = async (event) => {
    const acStatus = event.acStatus; // Assuming AC status comes in the event

    let windowAction = 'CLOSE';
    if (acStatus === 'ON') {
        windowAction = 'OPEN';
    }

    // Publish the window action to the MQTT topic
    client.publish('home/window/action', windowAction, () => {
        console.log(`Window action: ${windowAction}`);
    });

    return {
        statusCode: 200,
        body: JSON.stringify({ message: `Window action: ${windowAction}` }),
    };
};
