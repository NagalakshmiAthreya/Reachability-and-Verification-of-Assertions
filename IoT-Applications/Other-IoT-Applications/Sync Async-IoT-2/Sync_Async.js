const fs = require('fs');

// Hard-coded sensor data
const sensorData = {
  temperature: 25,
  pressure: 950
};

// Function to write sensor data to a JSON file
function writeSensorDataToFile(data) {
  //fs.writeFileSync('sensor_data.json', JSON.stringify(data));
  console.log("Sensor data written to file");
}

// Synchronous function 1
function syncFunction1(clientId) {
  console.log(`Starting syncFunction1 for client ${clientId}`);
  // Simulating some processing with temperature data
  console.log(`Temperature data processed for client ${clientId}`);
}

// Synchronous function 2
function syncFunction2(clientId) {
  console.log(`Starting syncFunction2 for client ${clientId}`);
  // Simulating some processing with pressure data
  console.log(`Pressure data processed for client ${clientId}`);
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

// Writing sensor data to file
writeSensorDataToFile(sensorData);

// Start the simulation
simulateClients();