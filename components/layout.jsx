"use client";
import AsideBar from "@/components/AsideBar";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
export default function Layout({ children }) {
  return (
    <div>
      <NavBar />
      <div className="flex">
        <AsideBar />
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
}
