import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

const DB_NAME = "beechat-database";
const COLLECTION = "prompts";

export async function GET() {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const collection = db.collection(COLLECTION);
  try {
    const prompts = await collection.find({}).toArray();
    return NextResponse.json({ success: true, prompts });
  } catch (error: any) {
    console.error("Kids Build API GET error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const collection = db.collection(COLLECTION);
  try {
    const body = await req.json();
    const doc = { ...body, votes: typeof body.votes === "number" ? body.votes : 0 };
    const result = await collection.insertOne(doc);
    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error: any) {
    console.error("Kids Build API POST error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const collection = db.collection(COLLECTION);
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ success: false, error: "Missing id" }, { status: 400 });
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $inc: { votes: 1 } },
      { returnDocument: "after" }
    );
    if (!result.value) {
      return NextResponse.json({ success: false, error: "Prompt not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, prompt: result.value });
  } catch (error: any) {
    console.error("Kids Build API PATCH error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
