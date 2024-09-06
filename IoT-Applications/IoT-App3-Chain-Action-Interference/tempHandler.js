const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost:1883'); // Connect to the Mosquitto broker
const THRESHOLD = 25; // Example temperature threshold
exports.tempHandler = async (event) => {
    const temp = event.temperature; // Assuming temperature data comes in the event
    let acStatus = 'OFF';
    if (temp > THRESHOLD) {
        acStatus = 'ON';
    }
    client.publish('home/ac/status', acStatus, () => {
        console.log(`AC status set to ${acStatus}`);
    });
    return {
        statusCode: 200,
        body: JSON.stringify({ message: `AC status set to ${acStatus}` }),
    };
};
