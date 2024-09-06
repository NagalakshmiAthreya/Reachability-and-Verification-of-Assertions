const assert = require('assert');
const mqtt = require('mqtt');
const sinon = require('sinon');

// MQTT Client and topics
const mqttClient = mqtt.connect('mqtt://localhost');
const sensorTopic = 'fireDetection/sensor';

// Track the order of operations
let operationOrder = [];

// Stub the console.log to capture output instead of printing it
sinon.stub(console, 'log').callsFake((message) => {
    operationOrder.push(message);
});

describe('Fire Detection Order Preservation', function() {
    this.timeout(30000); // Increase timeout for async operations

    // Before all tests, connect and subscribe to the topic
    before((done) => {
		 this.timeout(20000); 
        mqttClient.on('connect', () => {
            mqttClient.subscribe(sensorTopic, done);
        });
    });

    // After all tests, disconnect the MQTT client
    after((done) => {
        mqttClient.end(true, done);
    });

    it('should preserve the order of operations during fire detection', (done) => {
        // Publish a message to simulate sensor data
        const testData = JSON.stringify({
            client: 'Fire_sensor',
            temperature: 95, // Above the threshold
            smokeLevel: 0.09, // Above the threshold
            count: 1
        });

        mqttClient.publish(sensorTopic, testData, () => {
            setTimeout(() => {
                // Check if the operations are in the correct order
                try {
                    assert.ok(operationOrder.includes('Connected to MQTT broker'), 'MQTT broker connection is not in the correct order');
                    assert.ok(operationOrder.includes('Subscribed to fireDetection/#'), 'Subscription is not in the correct order');
                    assert.ok(operationOrder.includes('Threshold exceeded for client Fire_sensor - count: 1'), 'Threshold check is not in the correct order');
                    assert.ok(operationOrder.some(msg => msg.startsWith('Bundle created')), 'Bundle creation is not in the correct order');
                    assert.ok(operationOrder.some(msg => msg.startsWith('Data uploaded')), 'Data upload is not in the correct order');
                } catch (error) {
                    return done(error);
                }

                done();
            }, 5000); // Wait for all operations to complete
        });
    });
});
