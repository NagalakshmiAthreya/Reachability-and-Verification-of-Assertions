# Explanation:
1. Setup with Sinon and AWS Mock
   - We use `sinon` to create a spy (`snsPublishSpy`) that monitors calls to `SNS.publish`.
   - `AWS.mock` is used to mock the `SNS` service, ensuring that when your handler tries to publish a message, it doesn't actually send anything to AWS SNS but allows us to verify that the publish function was called.

2. Simulating the Event:
   - The test simulates the event that would be passed to your Lambda function when the LWT trigger occurs. This simulates a situation where the sensor has disconnected, leading to the publication of the LWT message.

3. Handler Execution
   - The Lambda handler is invoked with the simulated event.

4. Assertions:
   - The test verifies that the SNS `publish` method was called exactly once (`assert(snsPublishSpy.calledOnce)`).
   - It further checks the contents of the message to ensure it matches the expected LWT message ("Sensor is dead").

5. Test Execution:
   - To run this test, you would execute `mocha test.js` in your terminal after setting up your project to use Mocha.

This test ensures that the handler for the LWT message is reachable and correctly processes the event when the sensor disconnects. The reachability of the handler is indirectly tested by confirming that the expected SNS publish action takes place when the LWT condition is met.