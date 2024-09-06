const mqtt = require('mqtt');
const { expect } = require('chai');

describe('Trigger-Condition Verification', function() {
    this.timeout(15000); // Set a timeout for async operations

    let client;

    before((done) => {
        client = mqtt.connect('mqtt://localhost:1883');
        client.on('connect', () => {
            console.log('Test client connected to MQTT broker');
            done();
        });
    });

    it('should verify that AC status triggers window action', (done) => {
        let acStatusPublished = false;
        let windowActionReceived = false;

        client.subscribe('home/ac/status');
        client.subscribe('home/window/action');

        // Simulate publishing temperature to trigger AC status
        client.publish('home/temperature', '26.5');

        client.on('message', (topic, message) => {
            if (topic === 'home/ac/status') {
                acStatusPublished = true;
                const acStatus = message.toString();
                expect(acStatus).to.equal('ON');
                console.log('AC status is ON, checking window action...');
            }

            if (topic === 'home/window/action' && acStatusPublished) {
                windowActionReceived = true;
                const windowAction = message.toString();
                expect(windowAction).to.equal('OPEN');
                console.log('Window action received:', windowAction);

                if (windowActionReceived) {
                    done();
                }
            }
        });

        setTimeout(() => {
            if (!windowActionReceived) {
                done(new Error('Window action not triggered as expected'));
            }
        }, 10000); // Set a timeout to prevent test from hanging
    });

    after(() => {
        client.end();
    });
});
