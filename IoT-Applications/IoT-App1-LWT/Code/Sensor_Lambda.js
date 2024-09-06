const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const sns = new AWS.SNS();
const lambda = new AWS.Lambda();
exports.handler = async (event) => {
    const message = JSON.parse(event.Records[0].Sns.Message);
    const personStatus = message.person;
    let doorStatus = personStatus === 'known' ? 'open' : 'closed';
	if (personStatus === 'known') {
        // Example of getting data from the Thing Shadow
        const iotdata = new AWS.IotData({ endpoint: 'YOUR_IOT_ENDPOINT' });
        const params = {
            thingName: 'YourThingName'
        };
        try {
            const data = await iotdata.getThingShadow(params).promise();
            const payload = JSON.parse(data.payload);
            const personId = payload.state.reported.personId;
            // Write to DynamoDB
            const dbParams = {
                TableName: 'YourDynamoDBTable',
                Item: {
                    id: message.timestamp.toString(),
                    personStatus: personStatus,
                    doorStatus: doorStatus,
                    personId: personId
                }
            };
            await dynamoDB.put(dbParams).promise();
            // Trigger SNS notification
            const snsParams = {
                Message: `Door status updated to ${doorStatus} for person: ${personStatus} (ID: ${personId})`,
                Subject: 'Door Status Update',
                TopicArn: 'arn:aws:sns:your-region:your-account-id:YourTopic'
            };
            await sns.publish(snsParams).promise();
        } 
		catch (error) {
            console.error('Error fetching from IoT Thing Shadow:', error);
            throw error;
        }
    } else {
        // Close the door and send an SNS message
        const snsParams = {
            Message: `Unknown person detected. Door status set to ${doorStatus}. Retrying in 5 seconds.`,
            Subject: 'Door Status Update',
            TopicArn: 'arn:aws:sns:your-region:your-account-id:YourTopic'
        };
        await sns.publish(snsParams).promise();
        // Write to DynamoDB with door closed status
        const dbParams = {
            TableName: 'YourDynamoDBTable',
            Item: {
                id: message.timestamp.toString(),
                personStatus: personStatus,
                doorStatus: doorStatus
            }
        };
        await dynamoDB.put(dbParams).promise();
        // Wait for 5 seconds and invoke the Lambda function again
        await new Promise(resolve => setTimeout(resolve, 5000));
        const invokeParams = {
            FunctionName: 'YourLambdaFunctionName',
            InvocationType: 'Event',
            Payload: JSON.stringify(event)
        };
        await lambda.invoke(invokeParams).promise();
        console.log('Re-invoked Lambda function after 5 seconds');
    }
    return { status: 'success' };
	};
