const AWS = require('aws-sdk');
const sns = new AWS.SNS();

exports.handler = async (event) => {
    const message = 'Sensor is dead';

    // Trigger SNS notification
    const snsParams = {
        Message: message,
        Subject: 'Sensor Alert',
        TopicArn: 'arn:aws:sns:your-region:your-account-id:YourTopic'
    };

    await sns.publish(snsParams).promise();

    return { status: 'success' };
};