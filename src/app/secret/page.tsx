"use client";
import Image from "next/image";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import Pusher from "pusher-js";

interface Score {
  name: string;
  score: number;
}

export default function SecretPage() {
  const [click, setClick] = useState<number>(0);
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [showSecret, setShowSecret] = useState<boolean>(false);
  const [secret, setSecret] = useState<string>("");
  const [scoreboard, setScoreboard] = useState<Score[]>([]);
  const [lastClick, setLastClick] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [tempScore, setTempScore] = useState<number>(0);

  const getSecret = async () => {
    try {
      const response = await axios.get<{ code: string }>("/api/mongoDB");
      setSecret(response.data.code);
      const encryptedSecret = btoa(response.data.code);
      localStorage.setItem("secret", encryptedSecret);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const pusher = new Pusher("cbed6b927050fe805174", {
      cluster: "ap1",
    });

    const channel = pusher.subscribe("scoreboard");
    channel.bind("update", (data: Score[]) => {
      setScoreboard(data);
    });

    return () => {
      pusher.unsubscribe("scoreboard");
    };
  }, []);

  useEffect(() => {
    // Debounce POST request
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      try {
        await axios.post("/api/pusher", {
          name: name,
          score: tempScore,
        }).then((res) => {
          console.log(res);
        });
        console.log("Score updated (time):", tempScore);
      } catch (error) {
        console.error("Update error:", error);
      }
    }, 500);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [click, tempScore]); 

  const handleClick = () => {
    const now = Date.now();
    if (now - lastClick < 10) {
      alert("ห้ามโกง! กดเร็วเกินไป");
      return;
    }
    setLastClick(now);
  };

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      const message =
        "คุณต้องการออกจากหน้านี้หรือไม่? การเปลี่ยนแปลงจะไม่ได้รับการบันทึก";
      event.preventDefault();
      return message;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    if (click > 10 && !secret) {
      getSecret();
      setShowSecret(true);
    }
  }, [click, secret]);

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory ">
      <div
        id="secret"
        className="h-screen snap-start flex flex-col justify-center items-center"
      >
        {scoreboard && (
          <div>
            <h1>Scoreboard</h1>
            <ol>
              {scoreboard.map((score, index) => (
                <li key={index}>
                  {score.name} : {score.score}
                </li>
              ))}
            </ol>
          </div>
        )}
        <h1>POP Score : {click}</h1>
        <div
          className="h-96 w-96 bg-primary select-none"
          onMouseDown={() => {
            setIsMouseDown(true);
            setClick((prev) => prev + 1);
            setTempScore((prev) => prev + 1);
            handleClick();
          }}
          onMouseUp={() => setIsMouseDown(false)}
          onTouchStart={() => {
            setIsMouseDown(true);
            setClick((prev) => prev + 1);
            setTempScore((prev) => prev + 1);
            handleClick();
          }}
          onTouchEnd={() => setIsMouseDown(false)}
          draggable={false}
        >
          {isMouseDown ? (
            <Image
              src="/cat-open.jpeg"
              alt="cat-open"
              width={384}
              height={384}
              draggable={false}
            />
          ) : (
            <Image
              src="/cat-close.jpg"
              alt="cat-close"
              width={384}
              height={384}
              draggable={false}
            />
          )}
        </div>
        {showSecret && <h1>Secret {secret}</h1>}
      </div>
    </div>
  );
}