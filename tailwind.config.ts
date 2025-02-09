import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#00A8E8",  
        secondary: "#00FF87", 
        accent: "#6A0DAD",   
        navbar: "#0D1B2A",   
        "navbar-text": "#FFFFFF",
        bg: "#161B22",        
        text: "#E6EDF3",     
        "input-bg": "#1F2937",   
        "input-text": "#FFFFFF",
        "button-hover": "#008AC3",
        danger: "#D90429",
        success: "#00FF87",
        warning: "#FFA500",
        link: "#00A8E8",
      },
    },
  },
  plugins: [],
} satisfies Config;
