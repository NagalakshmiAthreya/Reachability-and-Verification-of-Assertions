// homeSafetySystemHandler.js
const mongoose = require('mongoose');
const generateHomeSafetySystemData = require('./homeSafetySystemDataGenerator');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;

// Define schema
const homeSafetySystemSchema = new mongoose.Schema({
    temperature: Number,
    humidity: Number,
    gasLeakage: String,
    motionDetected: Boolean
});

// Define model
const HomeSafetySystem = mongoose.model('HomeSafetySystem', homeSafetySystemSchema);

// Preprocessing function 1: Normalize Temperature
function normalizeTemperature(data) {
    data.temperature = (data.temperature - 32) * 5 / 9; // Convert Fahrenheit to Celsius
    return data;
}

// Preprocessing function 2: Scale Humidity
function scaleHumidity(data) {
    data.humidity *= 1.2; // Scale humidity by a factor of 1.2
    return data;
}

// Preprocessing function 3: Convert Gas Leakage to String
function convertGasLeakageToString(data) {
    data.gasLeakage = data.gasLeakage ? 'Yes' : 'No'; // Convert boolean to string
    return data;
}

// Preprocessing function
async function preprocessData(data) {
    // Normalize temperature
    data = normalizeTemperature(data);
    
    // Scale humidity
    data = scaleHumidity(data);
    
    // Convert gas leakage to string
    data = convertGasLeakageToString(data);
    
    return data;
}

// Handler function
async function handleHomeSafetySystemData(data) {
    try {
        // Preprocess data
        const preprocessedData = await preprocessData(data);
        
        // Check threshold levels
        if (preprocessedData.temperature < 30 && preprocessedData.humidity < 80) {
            // Write to MongoDB
            const homeSafetySystem = new HomeSafetySystem(preprocessedData);
            await homeSafetySystem.save();
            console.log('Data written to MongoDB:', preprocessedData);
        } else {
            console.log('Threshold levels exceeded. Skipping data:', preprocessedData);
        }
    } catch (error) {
        console.error('Error handling data:', error);
    }
}

module.exports = handleHomeSafetySystemData;
