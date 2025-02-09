import { NextRequest } from "next/server";
import Pusher from "pusher";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
  useTLS: true,
});

interface Score {
  name: string;
  score: number;
}

let scoreboard: Score[] = [];

export async function POST(req: NextRequest) {
  try {
    const { name, score } = await req.json();
    console.log(name, score);

    if (!name || typeof score !== "number") {
      return Response.json(
        { success: false, error: "Invalid data" },
        { status: 400 }
      );
    }

    const existingEntry = scoreboard.find((entry) => entry.name === name);

    if (existingEntry) {
      existingEntry.score = score;
    } else {
      scoreboard.push({ name, score });
    }

    scoreboard = scoreboard.sort((a, b) => b.score - a.score).slice(0, 5);

    await pusher.trigger("scoreboard", "update", scoreboard);

    return Response.json({ success: true, scoreboard }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ success: false, error: error }, { status: 500 });
  }
}