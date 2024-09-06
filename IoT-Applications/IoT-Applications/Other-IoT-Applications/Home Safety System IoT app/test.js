const handleHomeSafetySystemData = require('./homeSafetySystemHandler');

// Sample data object
const testData = {
    temperature: 75, // Fahrenheit
    humidity: 60, // Percentage
    gasLeakage: false,
    motionDetected: true
};

// Call the handler function with the test data
handleHomeSafetySystemData(testData);
const normalData = {
    temperature: 25, // Celsius
    humidity: 70, // Percentage
    gasLeakage: false,
    motionDetected: false
};
handleHomeSafetySystemData(normalData);

const highTemperatureData = {
    temperature: 35, // Celsius
    humidity: 60, // Percentage
    gasLeakage: false,
    motionDetected: true
};
handleHomeSafetySystemData(highTemperatureData);

const highHumidityData = {
    temperature: 20, // Celsius
    humidity: 90, // Percentage
    gasLeakage: true,
    motionDetected: false
};
handleHomeSafetySystemData(highHumidityData);
const gasLeakageData = {
    temperature: 22, // Celsius
    humidity: 50, // Percentage
    gasLeakage: true,
    motionDetected: true
};
handleHomeSafetySystemData(gasLeakageData);
const motionDetectedData = {
    temperature: 18, // Celsius
    humidity: 55, // Percentage
    gasLeakage: false,
    motionDetected: true
};
handleHomeSafetySystemData(motionDetectedData);


