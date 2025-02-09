"use client";
import { HiHome } from "react-icons/hi2";
import { IoInformationCircleSharp } from "react-icons/io5";
import { IoMdContact } from "react-icons/io";
import { useRouter } from "next/navigation";

interface SmoothScrollProps {
  id: string;
}

export default function Navbar() {
  const router = useRouter();

  const handleSmoothScroll = ({ id }: SmoothScrollProps): void => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/");
      setTimeout(() => {
        const newElement = document.getElementById(id);
        if (newElement) {
          newElement.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  return (
    <div className="absolute w-full bottom-0 sm:top-5 h-fit">
      <div className="w-96 h-fit sm:h-24 sm:rounded-2xl bg-navbar text-navbar-text flex justify-around sm:flex-col items-center px-5 sticky my-auto sm:mx-auto">
        <div className="hidden sm:block">
          <span className="text-2xl font-bold">CyberGeek</span>
        </div>
        <div className="flex w-full justify-around sm:gap-5 ">
          <div onClick={()=>{handleSmoothScroll({ id: "home" })}} className="flex flex-col items-center cursor-pointer">
            <HiHome size={40} className="block sm:hidden"/>
            <span className="text-base sm:text-xl sm:font-bold">Home</span>
          </div>
          <div onClick={()=>{handleSmoothScroll({ id: "about" })}} className="flex flex-col items-center cursor-pointer">
            <IoInformationCircleSharp size={40} className="block sm:hidden"/>
            <span className="text-base sm:text-xl sm:font-bold">About</span>
          </div>
          <div onClick={()=>{handleSmoothScroll({ id: "contact" })}} className="flex flex-col items-center cursor-pointer">
            <IoMdContact size={40} className="block sm:hidden"/>
            <span className="text-base sm:text-xl sm:font-bold">contact</span>
          </div>
        </div>
      </div>
    </div>
  );
}
