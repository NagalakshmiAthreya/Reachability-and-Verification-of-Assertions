// homeSafetySystemDataGenerator.js
function generateHomeSafetySystemData() {
    // Generate home safety system data in JSON format
    return {
        temperature: Math.floor(Math.random() * 100),
        humidity: Math.floor(Math.random() * 100),
        gasLeakage: Math.random() < 0.5 ? true : false, // 50% chance of true/false
        motionDetected: Math.random() < 0.5 ? true : false // 50% chance of true/false
    };
}

module.exports = generateHomeSafetySystemData;