const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function main() {
    console.log("Entered main");
    try {
        await client.connect(); // Connect to MongoDB
        console.log("mongodb is connected");
        const database = client.db("room_data"); // Replace 'your_database_name' with your actual database name
        const collection = database.collection("room"); // Replace 'your_collection_name' with your actual collection name
        
        const home1Rooms = ['room1']; // Add more device names as needed

        console.log("Start telemetry data publishing for home2");
        let completedOperations = 0;
        const totalOperations = home1Rooms.length;

        home1Rooms.forEach(roomName => {
            infiniteLoopPublish(roomName, collection, () => {
                completedOperations++;
                if (completedOperations === totalOperations) {
                    console.log("All operations completed");
                    client.close(); // Close the MongoDB client after all operations are completed
                }
            });
        });
    } catch (err) {
        console.error(err);
    }
}

// Function sending room telemetry data every 5 seconds
async function infiniteLoopPublish(roomName, collection, callback) {
    try {
        console.log('Sending room telemetry data to MongoDB for ' + roomName);
        // Insert room data into MongoDB
        await insertRoomData(collection, roomName);
        callback(); // Call the callback function to track completion
    } catch (err) {
        console.error(err);
    }
}

// Function to insert room data into MongoDB
async function insertRoomData(collection, roomName) {
    try {
        const roomData = getRoomData(roomName);
        console.log(roomData);
        await collection.insertOne({ roomName, roomData, timestamp: new Date() });
        console.log('Room data inserted into MongoDB for', roomName);
    } catch (err) {
        console.warn(err);
    }
}

// Generate random room data based on the roomName
function getRoomData(roomName) {
    return {
        'home_id': 2,
        'room_temp': generateRandomTemperature(),
        'room_pressure': generateRandomPressure(),
        'window_status': generateRandomStatus(),
        'AC_status': generateRandomStatus(['on', 'off']),
        'light_status': generateRandomStatus(['on', 'off']),
        'room_door': generateRandomStatus(),
        'person_detector': generateRandomStatus(['yes', 'no'])
    };

}

// Function to generate a random temperature between 0 and 100 degrees Celsius
function generateRandomTemperature() {
    return Math.floor(Math.random() * 101);
}

// Function to generate a random pressure between 800 and 1200 hPa
function generateRandomPressure() {
    return Math.floor(Math.random() * 401) + 800;
}

// Function to generate a random status (open/close, on/off, etc.)
function generateRandomStatus(options = ['open', 'close']) {
    return options[Math.floor(Math.random() * options.length)];
}

main().catch(console.error);
