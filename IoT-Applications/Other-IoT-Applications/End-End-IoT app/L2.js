const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const pressureData = JSON.parse(event.body);
    const pressure = pressureData.pressure;
    
    // Preprocessing step 1 for pressure data (L2)
    const preprocessedPressure1 = adjustPressure(pressure);
    
    // Preprocessing step 2 for pressure data (L2)
    const preprocessedPressure2 = scalePressure(preprocessedPressure1);

    // Your logic to handle preprocessed pressure data (L2)
    console.log('Preprocessed pressure:', preprocessedPressure2);
    
    // Update completion status in DynamoDB
    await updateCompletionStatus('L2');

    // Trigger Lambda function L3
    await invokeLambdaFunction('L3');

    const response = {
        statusCode: 200,
        body: JSON.stringify('Pressure reading processed: ' + pressure)
    };
    return response;
};

function adjustPressure(pressure) {
    // Placeholder preprocessing step 1: Subtract 100 from pressure
    return pressure - 100;
}

function scalePressure(pressure) {
    // Placeholder preprocessing step 2: Multiply pressure by 0.9
    return pressure * 0.9;
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
