const lambdaFunction = require('./lambda2');
const generateSensorData = require('./sensorDataGenerator');

setInterval(() => {
    const event = generateSensorData().sensorData; // Access the inner object directly
    lambdaFunction.handler({ sensorData: JSON.stringify(event) }) // Convert event to JSON string
        .then(response => console.log(response))
        .catch(error => console.error(error));
}, 5000); // Generate data every 5 seconds
