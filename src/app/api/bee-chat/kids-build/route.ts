import { NextRequest, NextResponse } from "next/server";


import { MongoClient } from "mongodb";

const uri = process.env.COSMOSDB_URI;
const dbName = process.env.COSMOSDB_DBNAME || "beePlatform";
const collectionName = process.env.COSMOSDB_COLLECTION || "kidsSuggestions";

let cachedClient: MongoClient | null = null;

async function getClient() {
  if (cachedClient) return cachedClient;
  if (!uri) throw new Error("Missing COSMOSDB_URI");
  const client = new MongoClient(uri);
  await client.connect();
  cachedClient = client;
  return client;
}


export async function GET() {
  try {
    const client = await getClient();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const suggestions = await collection.find({}).sort({ _id: -1 }).limit(100).toArray();
    return NextResponse.json(suggestions);
  } catch (err) {
    console.error("GET /api/bee-chat/kids-build error:", err);
    if (err instanceof Error) {
      console.error(err.stack);
    }
    return NextResponse.json({ error: "Failed to fetch suggestions." }, { status: 500 });
  }
}


export async function POST(request: NextRequest) {
  try {
    const { prompt, name } = await request.json();
    if (!prompt || !name) {
      return NextResponse.json({ error: "Missing prompt or name." }, { status: 400 });
    }
    const client = await getClient();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    await collection.insertOne({ prompt, name, createdAt: new Date() });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("POST /api/bee-chat/kids-build error:", err);
    if (err instanceof Error) {
      console.error(err.stack);
    }
    return NextResponse.json({ error: "Failed to save suggestion." }, { status: 500 });
  }
}
