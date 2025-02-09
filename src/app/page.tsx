import Link from "next/link";
import About from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

// Code: Home page
export default function Home() {
  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory ">
      <div id="home" className="h-screen snap-start">
        <div className="w-full h-screen flex flex-col justify-center items-center">
          <h1 className="text-xl font-bold">เข้าร่วมกิจกรรม</h1>
          <Link href="/register" className="px-6 py-3 mt-5 bg-slate-800 rounded-xl">เข้าร่วม</Link>
        </div>
      </div>
      <div id="about" className="h-screen snap-start">
        <About />
      </div>
      <div id="contact" className="h-screen snap-start">
        <ContactPage />
      </div>
    </div>
  );
}
