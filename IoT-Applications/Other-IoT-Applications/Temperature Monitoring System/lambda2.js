async function processTemperatureData(sensorData) {
    // Process temperature data
    const temperature = sensorData.temperature;
    console.log();
    if (temperature > 30) {
        // Simulate sending an alert (replace with actual alerting mechanism)
        console.log(`ALERT: Temperature is too high: ${temperature}`);
    }
    // Simulate storing data (replace with actual database operations)
    console.log('Storing data:', sensorData);
}

exports.handler = async (event) => {
    const sensorData = JSON.parse(event.sensorData);
    await processTemperatureData(sensorData);
    return { statusCode: 200, body: 'Temperature processed successfully' };
};