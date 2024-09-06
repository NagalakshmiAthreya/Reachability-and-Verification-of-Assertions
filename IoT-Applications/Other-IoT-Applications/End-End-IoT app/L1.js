const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const temperatureData = JSON.parse(event.body);
    const temperature = temperatureData.temperature;
    
    // Preprocessing step 1 for temperature data (L1)
    const preprocessedTemperature1 = adjustTemperature(temperature);
    
    // Preprocessing step 2 for temperature data (L1)
    const preprocessedTemperature2 = scaleTemperature(preprocessedTemperature1);

    // Your logic to handle preprocessed temperature data (L1)
    console.log('Preprocessed temperature:', preprocessedTemperature2);
    
    // Update completion status in DynamoDB
    await updateCompletionStatus('L1');

    // Trigger Lambda function L3
    await invokeLambdaFunction('L3');

    const response = {
        statusCode: 200,
        body: JSON.stringify('Temperature reading processed: ' + temperature)
    };
    return response;
};

function adjustTemperature(temperature) {
    // Placeholder preprocessing step 1: Add 5 to temperature
    return temperature + 5;
}

function scaleTemperature(temperature) {
    // Placeholder preprocessing step 2: Multiply temperature by 1.2
    return temperature * 1.2;
}

async function updateCompletionStatus(functionName) {
    const params = {
        TableName: 'CompletionStatusTable',
        Item: {
            function: functionName,
            status: 'completed'
        }
    };
    await dynamodb.put(params).promise();
}

async function invokeLambdaFunction(functionName) {
    const lambda = new AWS.Lambda();
    const params = {
        FunctionName: functionName,
        InvocationType: 'Event' // Asynchronous invocation
    };
    await lambda.invoke(params).promise();
}
