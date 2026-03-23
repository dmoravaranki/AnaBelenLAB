import { MongoClient } from "mongodb";


const uri = process.env.AZURE_COSMOS_CONNECTIONSTRING || "mongodb://invalid"; // fallback for build

if (!process.env.AZURE_COSMOS_CONNECTIONSTRING) {
  console.warn(
    "Warning: No AZURE_COSMOS_CONNECTIONSTRING found. Using fallback URI. This may cause runtime errors if not set in production."
  );
}

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
