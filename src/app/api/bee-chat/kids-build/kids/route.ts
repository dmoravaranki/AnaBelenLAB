import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

const DB_NAME = "beechat-database";
const KIDS_COLLECTION = "kids";

// GET: List all kids
export async function GET() {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const collection = db.collection(KIDS_COLLECTION);
  try {
    const kids = await collection.find({}).toArray();
    return NextResponse.json({ success: true, kids });
  } catch (error: any) {
    console.error("Kids Registry API GET error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST: Add a new kid (if not exists)
export async function POST(req: NextRequest) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const collection = db.collection(KIDS_COLLECTION);
  try {
    const { name } = await req.json();
    if (!name) return NextResponse.json({ success: false, error: "Missing name" }, { status: 400 });
    const existing = await collection.findOne({ name });
    if (existing) {
      return NextResponse.json({ success: true, kid: existing });
    }
    const result = await collection.insertOne({ name });
    return NextResponse.json({ success: true, kid: { _id: result.insertedId, name } });
  } catch (error: any) {
    console.error("Kids Registry API POST error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
