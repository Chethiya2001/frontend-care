import React from "react";
import Image from "next/image";

const NavBar = () => {
  return (
    <nav className="flex flex-col items-center pt-5">
      <div className="flex-grow"></div> {/* This creates the white space */}
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
