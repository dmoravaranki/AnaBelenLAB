import { NextRequest, NextResponse } from 'next/server';

// Cosmos DB connection setup
const COSMOSDB_URI = process.env.COSMOSDB_URI;
const COSMOSDB_DBNAME = process.env.COSMOSDB_DBNAME;
const COSMOSDB_COLLECTION = process.env.COSMOSDB_COLLECTION;

// Only import MongoClient on the server
let cachedClient: any = null;

async function getClient() {
  if (!cachedClient) {
    const { MongoClient } = await import('mongodb');
    cachedClient = new MongoClient(COSMOSDB_URI!);
    await cachedClient.connect();
  }
  return cachedClient;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const client = await getClient();
    const db = client.db(COSMOSDB_DBNAME);
    const collection = db.collection(COSMOSDB_COLLECTION!);
    const result = await collection.insertOne(body);
    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const client = await getClient();
    const db = client.db(COSMOSDB_DBNAME);
    const collection = db.collection(COSMOSDB_COLLECTION!);
    const prompts = await collection.find({}).toArray();
    return NextResponse.json({ success: true, prompts });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
