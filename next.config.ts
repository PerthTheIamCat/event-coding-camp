import type { NextConfig } from "next";
import dotenv from "dotenv";

dotenv.config();

const nextConfig: NextConfig = {
  env: {
    PUSHER_APP_ID: process.env.PUSHER_APP_ID,
    PUSHER_KEY: process.env.PUSHER_KEY,
    PUSHER_SECRET: process.env.PUSHER_SECRET,
    PUSHER_CLUSTER: process.env.PUSHER_CLUSTER,
    MONGODB_URI: process.env.MONGODB_URI,
    APP_KEY: process.env.APP_KEY,
    CLUSTER: process.env.CLUSTER,
  },
};

export default nextConfig;
