const awsIot = require('aws-iot-device-sdk');
const device = awsIot.device({
   keyPath: 'path/to/private.pem.key',
   certPath: 'path/to/certificate.pem.crt',
   caPath: 'path/to/root-CA.crt',
   clientId: 'mySensor',
   host: 'your-iot-endpoint.amazonaws.com',
   will: {
       topic: 'sensor/lwt',
       payload: JSON.stringify({ message: 'Sensor is dead', timestamp: Date.now() }),
       qos: 0,
       retain: false
   }
});
device.on('connect', function() {
    console.log('Connected to AWS IoT');
    // Send normal data every 5 seconds
    setInterval(() => {
        const payload = JSON.stringify({
            status: 'normal',
            person: Math.random() > 0.5 ? 'known' : 'unknown', // Randomly decide if the person is known or unknown
            timestamp: Date.now()
        });
        device.publish('sensor/data', payload);
        console.log('Data sent:', payload);
    }, 5000);
});


// Ensure the process exits gracefully and the LWT message gets published on Ctrl+C (SIGINT)
process.on('SIGINT', function() {
    console.log('Received SIGINT. Exiting...');
    device.end(false, () => {
        console.log('Disconnected from AWS IoT');
        process.exit(0);
    });
});