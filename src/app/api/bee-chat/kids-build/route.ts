import { NextRequest, NextResponse } from 'next/server';

// Cosmos DB connection setup
const COSMOSDB_URI = process.env.AZURE_COSMOS_CONNECTIONSTRING || process.env.COSMOSDB_URI;
// Extract database name from connection string or hardcode if known
const COSMOSDB_DBNAME = 'beechat-database'; // Replace with your actual DB name if different
const COSMOSDB_COLLECTION = 'prompts'; // Replace with your actual collection name if different


// Always create a new MongoClient per request (no caching)
async function getClient() {
  const { MongoClient } = await import('mongodb');
  const client = new MongoClient(COSMOSDB_URI!);
  await client.connect();
  return client;
}

export async function POST(req: NextRequest) {
  let client;
  try {
    const body = await req.json();
    client = await getClient();
    const db = client.db(COSMOSDB_DBNAME);
    const collection = db.collection(COSMOSDB_COLLECTION!);
    const result = await collection.insertOne(body);
    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error: any) {
    console.error("Kids Build API POST error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  } finally {
    if (client) await client.close();
  }
}

export async function GET() {
  let client;
  try {
    client = await getClient();
    const db = client.db(COSMOSDB_DBNAME);
    const collection = db.collection(COSMOSDB_COLLECTION!);
    const prompts = await collection.find({}).toArray();
    return NextResponse.json({ success: true, prompts });
  } catch (error: any) {
    console.error("Kids Build API GET error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  } finally {
    if (client) await client.close();
  }
}
