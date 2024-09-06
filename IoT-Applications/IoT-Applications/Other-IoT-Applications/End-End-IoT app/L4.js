const AWS = require('aws-sdk');

const sns = new AWS.SNS();

exports.handler = async (event) => {
    for (const record of event.Records) {
        if (record.eventName === 'MODIFY') { // Trigger only on item updates
            const newItem = record.dynamodb.NewImage;
            
            // Extract the relevant information from the newItem
            const timestamp = newItem.timestamp; // Assuming timestamp is an attribute in your DynamoDB table
            
            // Construct the message for SNS notification
            const message = `An item was updated at ${timestamp}`;
            
            // Publish SNS notification
            await publishSNSNotification(message);
        }
    }
};

async function publishSNSNotification(message) {
    const params = {
        Message: message,
        TopicArn: 'YOUR_SNS_TOPIC_ARN' // Replace with your SNS topic ARN
    };
    
    await sns.publish(params).promise();
}
