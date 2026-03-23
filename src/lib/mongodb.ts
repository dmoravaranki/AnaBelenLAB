import { MongoClient } from "mongodb";

const uri = process.env.AZURE_COSMOS_CONNECTIONSTRING || process.env.COSMOSDB_URI;
if (!uri) throw new Error("Missing MongoDB connection string");

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // In dev, use a global variable so the value is preserved across module reloads
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  // In prod, create a new client once
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;
