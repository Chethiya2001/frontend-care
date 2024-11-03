"use client";
import React from "react";
import Image from "next/image";
import { BiArrowBack, BiArrowForward } from "react-icons/bi";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const router = useRouter();

  return (
    <nav className="flex flex-col items-center pt-5">
      <div className="flex-grow"></div> {/* This creates the white space */}
      {/* Back and Forward Buttons */}
      <div className="absolute top-5 left-5 flex space-x-2">
        <button
          onClick={() => router.back()}
          className="text-lg font-bold p-2 rounded hover:bg-gray-200"
        >
          &#8592; 
        </button>
        <button
          onClick={() => router.forward()}
          className="text-lg font-bold p-2 rounded hover:bg-gray-200"
        >
          &#8594;
        </button>
      </div>
      <Image
        src="/logo.png"
        alt="We care"
        width={50}
        height={50}
        className="mx-auto"
      />
      <p className="mt-2 text-center text-lg font-bold">WeCare</p>
      <p className=" text-center  font-medium">We Care Always</p>
      <div className="border-b w-full mt-5 border-black " />
    </nav>
  );
};

export default NavBar;
