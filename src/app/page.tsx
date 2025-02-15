// import Link from "next/link";
// import About from "./pages/AboutPage";
// import ContactPage from "./pages/ContactPage";

// Code: Home page
// export default function Home() {
//   return (
//     <div className="h-screen overflow-y-scroll snap-y snap-mandatory ">
//       {/* <div id="home" className="h-screen snap-start">
//         <div className="w-full h-screen flex flex-col justify-center items-center">
//           <h1 className="text-xl font-bold">เข้าร่วมกิจกรรม</h1>
//           <Link href="/register" className="px-6 py-3 mt-5 bg-slate-800 rounded-xl">เข้าร่วม</Link>
//         </div>
//       </div>
//       <div id="about" className="h-screen snap-start">
//         <About />
//       </div>
//       <div id="contact" className="h-screen snap-start">
//         <ContactPage />
//       </div> */}

//     </div>
//   );
// }

"use client";
import Image from "next/image";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import Pusher from "pusher-js";

interface Score {
  name: string;
  score: number;
}

let audioContext: AudioContext | null = null;
let audioBuffer: AudioBuffer | null = null;
const targetScore = 10;

const loadAudio = async () => {
  audioContext = new window.AudioContext();
  const response = await fetch("/bg.mp3");
  const arrayBuffer = await response.arrayBuffer();
  audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
};

export default function SecretPage() {
  const [click, setClick] = useState<number>(0);
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [showSecret, setShowSecret] = useState<boolean>(false);
  const [secret, setSecret] = useState<string | null>(null);
  const [scoreboard, setScoreboard] = useState<Score[]>([]);
  const [lastClick, setLastClick] = useState(0);
  const [isAngry, setIsAngry] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const clickSequenceRef = useRef<number[]>([]);
  const [tempScore, setTempScore] = useState<number>(0);
  const [isRedeemed, setIsRedeemed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [name, setName] = useState<string>("");

  useEffect(() => {
    loadAudio();
    const secretValue = localStorage.getItem("secret");
    if (secretValue) {
      console.log("Secret loaded from local storage", atob(secretValue));
      setSecret(atob(secretValue));
      setShowSecret(true);
    }
    const redeemed = localStorage.getItem("redeemed");
    if (redeemed) {
      setIsRedeemed(true);
    }
  }, []);

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
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (name === "") {
      return;
    }
    timeoutRef.current = setTimeout(async () => {
      try {
        await axios
          .post("/api/pusher", {
            name: name,
            score: tempScore,
          })
          .then(() => {
            console.log("Score updated:", tempScore);
            setTempScore(0);
          });
      } catch (error) {
        console.error("Update error:", error);
      }
    }, 500);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [click, name, tempScore]);

  const isMobile =
    typeof window !== "undefined" && navigator.maxTouchPoints > 0;

  const playPartialAudio = () => {
    if (!audioContext || !audioBuffer) return;
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.start(1.25, 1.75, 0.5);
  };

  const getSecret = async () => {
    try {
      await axios.get<{ code: string }>("/api/mongoDB").then((res) => {
        setSecret(res.data.code);
        const encryptedSecret = btoa(res.data.code);
        localStorage.setItem("secret", encryptedSecret);
        setHasWon(true);
      });
      console.log("Secret updated");
    } catch (error) {
      alert("out of code");
      setSecret("sold out");
      console.log("Secret error:", error);
    }
  };

  const handleClick = () => {
    const now = Date.now();
    if (now - lastClick < 10) {
      alert("ห้ามโกง! กดเร็วเกินไป");
      return;
    }
    setLastClick(now);
    playPartialAudio();
    setClick((prev) => prev + 1);
    setTempScore((prev) => prev + 1);

    clickSequenceRef.current.push(now);
    clickSequenceRef.current = clickSequenceRef.current.filter(
      (time) => now - time < 5000
    );
    if (clickSequenceRef.current.length > 30) {
      setIsAngry(true);
    } else {
      setIsAngry(false);
    }
  };

  const handleRedeem = async () => {
    setLoading(true);
    try {
      await axios.put("/api/redeemcode", {
        code: secret,
      });
      alert("Redeemed! this code is no longer available");
      setIsRedeemed(true);
      localStorage.setItem("redeemed", "true");
      setLoading(false);
    } catch (error) {
      console.log("Redeem error:", error);
      alert("Redeem error");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (click > targetScore && !secret) {
      // console.log("Click:", click);
      setSecret("Loading...");
      getSecret();
      setShowSecret(true);
    }
  }, [click, secret]);

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center relative overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      >
        <source src="/bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute sm:inset-96 flex flex-col justify-center items-center">
        <div>
          <label htmlFor="faculty" className="text-2xl">
            คณะ
          </label>
          <select
            name="faculty"
            id="faculty"
            className="bg-input-bg text-input-text border border-gray-600 text-2xl"
            onChange={(e) => setName(e.target.value)}
            defaultValue=""
            disabled={name !== ""}
          >
            <option value="" disabled>
              เลือก
            </option>
            <option value="วิศวกรรมศาสตร์">วิศวกรรมศาสตร์</option>
            <option value="วืทยาการจัดการ">วืทยาการจัดการ</option>
            <option value="วืทยาศาสตร์">วืทยาศาสตร์</option>
            <option value="เศรษฐศาสตร์">เศรษฐศาสตร์</option>
            <option value="พาณิชยนาวีนานาชาติ">พาณิชยนาวีนานาชาติ</option>
          </select>
        </div>

        <div
          className={`w-full transition-transform duration-200 ${
            isMouseDown ? "scale-110" : "scale-100"
          }`}
        >
          <Image
            src={
              isMouseDown
                ? "/frog-open.png"
                : isAngry
                ? "/frog-angry.png"
                : hasWon
                ? "/frog-happy.png"
                : "/frog-close.png"
            }
            alt="Pop Frog"
            width={400}
            height={400}
            style={{ width: "100%", height: "auto" }}
            draggable={false}
            onMouseDown={() => {
              if (!isMobile) {
                handleClick();
                setIsMouseDown(true);
              }
            }}
            onTouchStart={() => {
              if (isMobile) {
                handleClick();
                setIsMouseDown(true);
              }
            }}
            onMouseUp={() => setIsMouseDown(false)}
            onTouchEnd={() => setIsMouseDown(false)}
          />
        </div>
      </div>
      <div className="absolute left-3 top-16 bg-black bg-opacity-50 p-3 rounded text-white">
        <h1 className="text-xs sm:text-xl font-bold">
          - เล่นให้ถึง {targetScore} แต้มเพิ่มรับโค้ด <br />
          - จำกัดให้กดโค้ดได้เครื่องละ 1 โค้ด <br />
          - ได้โค้ดแล้วยังสามารถเล่นต่อได้ <br />
        </h1>
      </div>
      <div className="absolute top-5 left-3 bg-black bg-opacity-50 p-3 rounded text-white text-sm sm:text-lg font-bold">
        POP Score : {click}
      </div>
      <div className="absolute top-5 right-3 bg-black bg-opacity-50 p-3 rounded text-white text-sm sm:text-lg">
        <h1>Scoreboard</h1>
        <ol>
          {scoreboard.map((score, index) => (
            <li key={index}>
              {score.name} : {score.score}
            </li>
          ))}
        </ol>
      </div>
      {showSecret && (
        <div className="absolute bottom-5 bg-black bg-opacity-50 p-3 rounded text-white text-lg">
          <h1>นำโค้ดไปกรอกที่</h1>
          <h1>Code: {secret}</h1>
          <button
            className={`${
              isRedeemed ? "bg-red-500" : "bg-green-500"
            } rounded-xl p-5 `}
            onClick={() => {
              handleRedeem();
            }}
            disabled={isRedeemed || loading}
          >
            {!isRedeemed ? "กดยืนยันว่าใช้โค้ดแล้ว" : "โค้ดถูกใช้แล้ว"}
          </button>
        </div>
      )}
      
    </div>
  );
}
