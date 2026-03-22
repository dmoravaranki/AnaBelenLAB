import { MongoClient } from "mongodb";

const uri = process.env["COSMOSDB_URI"];
const dbName = process.env["COSMOSDB_DBNAME"] || "beePlatform";
const collectionName = process.env["COSMOSDB_COLLECTION"] || "kidsSuggestions";

let cachedClient: MongoClient | null = null;
async function getClient() {
  if (cachedClient) return cachedClient;
  if (!uri) throw new Error("Missing COSMOSDB_URI");
  const client = new MongoClient(uri);
  await client.connect();
  cachedClient = client;
  return client;
}

/**
 * Azure Function for /api/bee-chat/kids-build
 * Compatible with Azure Static Web Apps
 */
// @ts-ignore
export default async function (context, req) {
  if (req.method === "GET") {
    try {
      const client = await getClient();
      const db = client.db(dbName);
      const collection = db.collection(collectionName);
      const suggestions = await collection.find({}).sort({ _id: -1 }).limit(100).toArray();
      context.res = {
        status: 200,
        body: suggestions,
        headers: { "Content-Type": "application/json" }
      };
    } catch (err) {
      context.log.error("GET /api/bee-chat/kids-build error:", err);
      context.res = {
        status: 500,
        body: { error: "Failed to fetch suggestions." }
      };
    }
  } else if (req.method === "POST") {
    try {
      const { prompt, name } = req.body;
      if (!prompt || !name) {
        context.res = {
          status: 400,
          body: { error: "Missing prompt or name." }
        };
        return;
      }
      const client = await getClient();
      const db = client.db(dbName);
      const collection = db.collection(collectionName);
      await collection.insertOne({ prompt, name, createdAt: new Date() });
      context.res = {
        status: 200,
        body: { success: true }
      };
    } catch (err) {
      context.log.error("POST /api/bee-chat/kids-build error:", err);
      context.res = {
        status: 500,
        body: { error: "Failed to save suggestion." }
      };
    }
  } else {
    context.res = {
      status: 405,
      body: { error: "Method not allowed" }
    };
  }
}
