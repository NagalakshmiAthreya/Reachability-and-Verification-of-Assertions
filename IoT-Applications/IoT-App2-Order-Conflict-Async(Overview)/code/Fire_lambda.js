const mqtt = require('mqtt');
const mqttClient = mqtt.connect('mqtt://localhost');
const TEMP_THRESHOLD = 90;
const SMOKE_THRESHOLD = 0.08;
async function createBundle(data) {
  return new Promise((resolve) => {
    // Longer and more variable delay to simulate async operation
    setTimeout(() => {
      console.log(`Bundle created for client ${data.client} - count: ${data.count}`);
      resolve();
    }, Math.random() * 3000); // Delay up to 3 seconds
  });
}
async function uploadStr(data) {
  return new Promise((resolve) => {
    // Longer and more variable delay to simulate async operation
    setTimeout(() => {
      console.log(`Data uploaded successfully for client ${data.client} - count: ${data.count}`);
      resolve();
    }, Math.random() * 3000); // Delay up to 3 seconds
  });
}
async function handleFireDetection(data) {
  try {
    if (data.temperature > TEMP_THRESHOLD || data.smokeLevel > SMOKE_THRESHOLD) {
      console.log(`Threshold exceeded for client ${data.client} - count: ${data.count}`);      
      // Start both async operations but do not wait for one before starting the other
      const createPromise = createBundle(data);
      const uploadPromise = uploadStr(data);
      // Wait for both operations to complete
      await Promise.all([createPromise, uploadPromise]);
	}
	else {
      console.log(`Threshold not exceeded for client ${data.client} - count: ${data.count}`);
    }
  } 
  catch (err) {
    console.log(err);
  }
}
mqttClient.on('connect', () => {
  console.log('Connected to MQTT broker');
  mqttClient.subscribe('fireDetection/#', (err) => {
    if (!err) {
      console.log('Subscribed to fireDetection/#');
    }
  });
});
//connect
mqttClient.on('message', (topic, message) => {
  const data = JSON.parse(message.toString());
  handleFireDetection(data);
});
