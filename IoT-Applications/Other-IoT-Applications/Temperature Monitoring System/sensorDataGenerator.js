function generateSensorData() {
    // Generate sensor data with random temperature
    return {
        sensorData: {
            temperature: Math.floor(Math.random() * 100)
        }
    };
}

module.exports = generateSensorData;