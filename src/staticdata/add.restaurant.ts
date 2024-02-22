import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

// Define the MongoDB connection URL and Database Name
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME;

const myobj = [
    {
        "name": "Restaurant 1",
        "address": "123 Main St",
        "cuisineType": "Mexican",
        "location": {
            "type": "Point",
            "coordinates": [-118.2508, 34.0498]
        }
    },
    {
        "name": "Restaurant 2",
        "address": "123 Main St",
        "cuisineType": "Mexican",
        "location": {
            "type": "Point",
            "coordinates": [-118.2508, 34.0498]
        }
    },
    {
        "name": "Restaurant 3",
        "address": "789 Elm St",
        "cuisineType": "Chinese",
        "location": {
            "type": "Point",
            "coordinates": [-118.2570, 34.0449]
        }
    },
    // Add more restaurants as needed
];

async function insertData() {
    const client = new MongoClient(url);

    try {
        await client.connect();
        console.log("Connected to MongoDB");

        const db = client.db(dbName);
        const collection = db.collection(process.env.COLLECTION || 'restaurants');

        // Check if each restaurant already exists in the collection
        for (const restaurant of myobj) {
            const existingRestaurant = await collection.findOne({ name: restaurant.name });
            if (!existingRestaurant) {
                // If restaurant does not exist, insert it
                await collection.insertOne(restaurant);
                console.log(`Inserted new restaurant: ${restaurant.name}`);
            } else {
                console.log(`Restaurant already exists: ${restaurant.name}`);
            }
        }

    } catch (err) {
        console.error("Error inserting data:", err);
    } finally {
        client.close();
        console.log("Connection to MongoDB closed.");
    }
}

// Call the function to insert data
insertData().catch(console.error);
