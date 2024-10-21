"use client";
import React from "react";
import Link from "next/link";
import NavBar from "./NavBar";
import { useRouter } from "next/navigation";

const AsideBar = ({}) => {
  const router = useRouter();

  return (
    <div>
      <div className="h-screen w-64  bg-white text-black font-bold font-3xl flex flex-col py-6  justify-center">
        <nav className="flex-2">
          <ul className="space-y-2 mt-10">
            <li>
              <Link href="/" className="block p-4 hover:bg-gray-700">
                Home
              </Link>
            </li>
            <li>
              <Link href="/admin" className="block p-4 hover:bg-gray-700">
                Admin
              </Link>
            </li>
            <li>
              <Link href="/consultant" className="block p-4 hover:bg-gray-700">
                Consultant
              </Link>
            </li>
            <li>
              <Link href="/staff" className="block p-4 hover:bg-gray-700">
                Staff Member
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default AsideBar;
