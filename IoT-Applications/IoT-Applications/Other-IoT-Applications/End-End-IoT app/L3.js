const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const iotdata = new AWS.IotData({ endpoint: 'YOUR_IOT_ENDPOINT' }); // Replace 'YOUR_IOT_ENDPOINT' with your AWS IoT endpoint

exports.handler = async (event) => {
    // Check if both L1 and L2 have completed
    const l1Status = await getCompletionStatus('L1');
    const l2Status = await getCompletionStatus('L2');

    if (l1Status === 'completed' && l2Status === 'completed') {
        // Both L1 and L2 have completed, proceed with further processing (L3)
        console.log('L1 and L2 have completed. Proceeding with processing (L3).');

        // Check temperature and pressure thresholds
        const temperatureThreshold = 40; // Example temperature threshold (adjust as needed)
        const pressureThreshold = 1000; // Example pressure threshold (adjust as needed)

        const temperatureData = await getLatestTemperatureData();
        const pressureData = await getLatestPressureData();

        const temperature = temperatureData.temperature;
        const pressure = pressureData.pressure;

        let temperatureAlert = false;
        let pressureAlert = false;

        // Check if temperature exceeds threshold
        if (temperature > temperatureThreshold) {
            temperatureAlert = true;
        }

        // Check if pressure exceeds threshold
        if (pressure > pressureThreshold) {
            pressureAlert = true;
        }

        // Update DynamoDB with temperature and pressure alerts
        await updateAlertStatus(temperatureAlert, pressureAlert);

        // Update IoT device shadow
        await updateDeviceShadow({ temperature: temperature, pressure: pressure, temperatureAlert: temperatureAlert, pressureAlert: pressureAlert });

        console.log('Temperature:', temperature, 'Pressure:', pressure);
    } else {
        console.log('L1 and/or L2 have not completed yet. Skipping processing (L3).');
    }

    const response = {
        statusCode: 200,
        body: JSON.stringify('L3 executed')
    };
    return response;
};

async function getCompletionStatus(functionName) {
    const params = {
        TableName: 'CompletionStatusTable',
        Key: {
            function: functionName
        }
    };
    const data = await dynamodb.get(params).promise();
    return data.Item ? data.Item.status : 'pending';
}

async function getLatestTemperatureData() {
    // Placeholder function to fetch latest temperature data from DynamoDB or other data source
    return { temperature: 42 }; // Example temperature data (replace with actual implementation)
}

async function getLatestPressureData() {
    // Placeholder function to fetch latest pressure data from DynamoDB or other data source
    return { pressure: 1050 }; // Example pressure data (replace with actual implementation)
}

async function updateAlertStatus(temperatureAlert, pressureAlert) {
    const params = {
        TableName: 'AlertStatusTable',
        Item: {
            timestamp: Date.now(),
            temperatureAlert: temperatureAlert,
            pressureAlert: pressureAlert
        }
    };
    await dynamodb.put(params).promise();
}

async function updateDeviceShadow(data) {
    const params = {
        thingName: 'YOUR_THING_NAME', // Replace 'YOUR_THING_NAME' with your IoT Thing Name
        payload: JSON.stringify({
            state: {
                reported: data
            }
        })
    };
    await iotdata.updateThingShadow(params).promise();
}
