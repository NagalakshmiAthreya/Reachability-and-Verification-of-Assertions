const AWS = require('aws-sdk');
const IoTData = new AWS.IotData({endpoint: 'YOUR_IOT_ENDPOINT'}); // Replace 'YOUR_IOT_ENDPOINT' with your AWS IoT endpoint

exports.handler = async (event) => {
    const temperature = generateRandomTemperature();
    const pressure = generateRandomPressure();
    
    // Publish temperature and pressure readings to AWS IoT Core topics
    await publishToIoTCore('temperature/readings', { temperature: temperature });
    await publishToIoTCore('pressure/readings', { pressure: pressure });
    
    const response = {
        statusCode: 200,
        body: JSON.stringify('Temperature and pressure readings sent to AWS IoT Core.')
    };
    return response;
};

function generateRandomTemperature() {
    // Generate a random temperature between 0 and 100 degrees Celsius
    return Math.floor(Math.random() * 101);
}

function generateRandomPressure() {
    // Generate a random pressure between 800 and 1200 hPa
    return Math.floor(Math.random() * 401) + 800;
}

async function publishToIoTCore(topic, data) {
    const params = {
        topic: topic,
        payload: JSON.stringify(data),
        qos: 0
    };
    
    try {
        await IoTData.publish(params).promise();
        console.log('Data sent to AWS IoT Core:', data);
    } catch (error) {
        console.error('Error publishing data to AWS IoT Core:', error);
        throw error;
    }
}
