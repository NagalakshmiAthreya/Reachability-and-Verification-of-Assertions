const fs = require('fs');

// Function to generate random sensor data
function generateRandomSensorData() {
  return {
    temperature: Math.floor(Math.random() * 50) + 10, // Random temperature between 10 and 60
    pressure: Math.floor(Math.random() * 1000) + 900 // Random pressure between 900 and 1900
  };
}

// Function to write sensor data to a JSON file
function writeSensorDataToFile(data) {
 // fs.writeFileSync('sensor_data.json', JSON.stringify(data));
  console.log("Sensor data written to file:", data);
}

// Synchronous function 1
function syncFunction1(clientId, sensorData) {
  console.log(`Starting syncFunction1 for client ${clientId}`);
  // Simulating some processing with temperature data
  console.log(`Temperature data processed for client ${clientId}: ${sensorData.temperature}`);
}

// Synchronous function 2
function syncFunction2(clientId, sensorData) {
  console.log(`Starting syncFunction2 for client ${clientId}`);
  // Simulating some processing with pressure data
  console.log(`Pressure data processed for client ${clientId}: ${sensorData.pressure}`);
}

// Synchronous function 3
function syncFunction3(clientId) {
  console.log(`Starting syncFunction3 for client ${clientId}`);
  // Simulating writing to storage
  console.log(`Data written to storage for client ${clientId}`);
}

// Synchronous function 4
function syncFunction4(clientId) {
  console.log(`Starting syncFunction4 for client ${clientId}`);
  // Simulating sending SMS
  console.log(`SMS sent to client ${clientId}`);
}

// Asynchronous function containing synchronous functions inside
async function asyncFunction(clientId) {
  console.log(`Starting asyncFunction for client ${clientId}`);
  
  // Generate random sensor data for each client
  const sensorData = generateRandomSensorData();
  writeSensorDataToFile(sensorData);

  // Simulating reading data and performing some threshold check
  if (sensorData.temperature > 30 || sensorData.pressure > 1000) {
    console.log(`Threshold exceeded for client ${clientId}`);
    syncFunction3(clientId);
    syncFunction4(clientId);
  } else {
    console.log(`Threshold not exceeded for client ${clientId}`);
  }

  console.log(`Async function completed for client ${clientId}`);
}

// Simulating multiple client requests without explicit control over ordering
async function simulateClients() {
  const numClients = 3;
  const clientPromises = [];
  for (let i = 1; i <= numClients; i++) {
    clientPromises.push(asyncFunction(i));
  }
  await Promise.all(clientPromises);
}

// Start the simulation
simulateClients();
// ****************************************

// Output:

// Starting asyncFunction for client 1
// Sensor data written to file: { temperature: 24, pressure: 1866 }
// Threshold exceeded for client 1
// Starting syncFunction3 for client 1
// Data written to storage for client 1
// Starting syncFunction4 for client 1
// SMS sent to client 1
// Async function completed for client 1
// Starting asyncFunction for client 2
// Sensor data written to file: { temperature: 30, pressure: 1255 }
// Threshold exceeded for client 2
// Starting syncFunction3 for client 2
// Data written to storage for client 2
// Starting syncFunction4 for client 2
// SMS sent to client 2
// Async function completed for client 2
// Starting asyncFunction for client 3
// Sensor data written to file: { temperature: 51, pressure: 1844 }
// Threshold exceeded for client 3
// Starting syncFunction3 for client 3
// Data written to storage for client 3
// Starting syncFunction4 for client 3
// SMS sent to client 3
// Async function completed for client 3

// ********************************************

// Output:

// Starting asyncFunction for client 1
// Sensor data written to file: { temperature: 15, pressure: 1016 }
// Threshold exceeded for client 1
// Starting syncFunction3 for client 1
// Data written to storage for client 1
// Starting syncFunction4 for client 1
// SMS sent to client 1
// Async function completed for client 1
// Starting asyncFunction for client 2
// Sensor data written to file: { temperature: 22, pressure: 1696 }
// Threshold exceeded for client 2
// Starting syncFunction3 for client 2
// Data written to storage for client 2
// Starting syncFunction4 for client 2
// SMS sent to client 2
// Async function completed for client 2
// Starting asyncFunction for client 3
// Sensor data written to file: { temperature: 16, pressure: 1143 }
// Threshold exceeded for client 3
// Starting syncFunction3 for client 3
// Data written to storage for client 3
// Starting syncFunction4 for client 3
// SMS sent to client 3
// Async function completed for client 3
