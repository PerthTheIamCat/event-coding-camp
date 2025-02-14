import { MongoClient, ServerApiVersion } from "mongodb";
import { NextResponse, NextRequest } from "next/server";

const uri = process.env.MONGODB_URI!;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function connect() {
  try {
    await client.connect();
    console.log("Connected to the database");
  } catch (e) {
    console.error(e);
  }
}

export async function disconnect() {
  try {
    await client.close();
    console.log("Disconnected from the database");
  } catch (e) {
    console.error(e);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const code = body.code;

    await connect();
    const database = client.db("EventCode");
    const collection = database.collection("Code");
    await collection.updateOne(
        { code: code },
        { $set: { available : false } }
    )
    await disconnect();
    return NextResponse.json(
      { success: true },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(e, {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
