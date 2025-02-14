import { random } from "lodash";
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

export async function GET() {
  try {
    await connect();
    const database = client.db("EventCode");
    const collection = database.collection("Code");
    const result = await collection.find({ available: true }).toArray();
    console.log(result);
    const ran = await random(0, result.length - 1);
    console.log("Random: ", ran);
    await disconnect();
    return NextResponse.json({code :result[ran].code}, {
      headers: {
        "Content-Type": "application/json",
      },
    });
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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const list = body.list;
    console.log(body);
    await connect();
    const database = client.db("EventCode");
    const collection = database.collection("Code");
    const result = await collection.insertMany(list);
    console.log(result);
    await disconnect();
    return NextResponse.json(
      {},
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

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const password = body.password;

    if (password !== "RESET_CODE_DANGER") {
      return NextResponse.json(
        { error: "Unauthorized" },
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    await connect();
    const database = client.db("EventCode");
    const collection = database.collection("Code");
    const result = await collection.updateMany(
      {},
      { $set: { available: true } }
    );
    console.log(result);
    await disconnect();
    return NextResponse.json(
      { message: "All codes have been reset to available" },
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
