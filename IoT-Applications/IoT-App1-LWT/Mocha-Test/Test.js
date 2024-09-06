const assert = require('assert');
const sinon = require('sinon');
const AWS = require('aws-sdk-mock');
const handler = require('../path/to/your/lambda-handler'); // Adjust the path to your actual handler file

describe('LWT Trigger Reachability', function () {
    let snsPublishSpy;

    before(function () {
        // Mock SNS to test if it's called
        snsPublishSpy = sinon.spy();
        AWS.mock('SNS', 'publish', snsPublishSpy);
    });

    after(function () {
        // Restore AWS SDK
        AWS.restore();
    });

    it('should trigger the LWT handler when the sensor disconnects', async function () {
        // Simulate an LWT message
        const event = {
            Records: [
                {
                    Sns: {
                        Message: JSON.stringify({
                            status: 'disconnected',
                            timestamp: Date.now(),
                        })
                    }
                }
            ]
        };

        // Call the handler function
        await handler(event);

        // Assert that SNS publish was called
        assert(snsPublishSpy.calledOnce, 'SNS publish was not called');
        
        // Check the contents of the published message
        const callArgs = snsPublishSpy.getCall(0).args[0];
        assert.strictEqual(callArgs.Message, 'Sensor is dead');
        assert.strictEqual(callArgs.Subject, 'Sensor Alert');
    });
});
