const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const sns = new AWS.SNS();

async function processTemperatureData(sensorData) {
    // Process temperature data
    const temperature = sensorData.temperature;
    if (temperature > 30) {
        await sendAlert(`Temperature is too high: ${temperature}`);
    }
    // Store data in DynamoDB
    await dynamoDB.put({
        TableName: 'TemperatureData',
        Item: { timestamp: Date.now(), temperature }
    }).promise();
}

async function sendAlert(message) {
    await sns.publish({
        TopicArn: 'arn:aws:sns:us-east-1:123456789012:TemperatureAlerts',
        Message: message
    }).promise();
}

exports.handler = async (event) => {
    const sensorData = JSON.parse(event.sensorData);
    await processTemperatureData(sensorData);
    return { statusCode: 200, body: 'Temperature processed successfully' };
};
