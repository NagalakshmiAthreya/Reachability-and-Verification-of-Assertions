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
        const newCollection = database.collection("person_door_data"); // New collection to store processed data

        const records = await collection.find({}).toArray(); // Fetch all records from the database

        // Process each record
        for (const record of records) {
            const personDetector = record.roomData.person_detector;
            const lightStatus = record.roomData.light_status;

            await insertData(newCollection, personDetector, lightStatus);
        }

        console.log("All operations completed");
        await client.close(); // Close the MongoDB client after all operations are completed
    } catch (err) {
        console.error(err);
    }
}

// Function to insert data into MongoDB
async function insertData(collection, personDetector, lightStatus) {
    try {
        await collection.insertOne({ personDetector, lightStatus, timestamp: new Date() });
        console.log('Data inserted into MongoDB:', { personDetector, lightStatus });
    } catch (err) {
        console.error(err);
    }
}

main().catch(console.error);
