"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Kaushan_Script } from "next/font/google";
import { Button } from "@/components/ui/button";

const kaushan = Kaushan_Script({ subsets: ["latin"], weight: "400" });

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div
      className="relative h-screen w-full overflow-hidden bg-[#030014] text-white"
      style={{
        backgroundImage: "url('/bg22.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="absolute inset-0 -z-10 opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(#00eaff25 1px, transparent 1px), linear-gradient(90deg, #00eaff25 1px, transparent 1px)",
          backgroundSize: "50px 50px",
          animation: "moveGrid 10s linear infinite",
        }}
      />
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-6">
        <h1 className={`${kaushan.className} text-7xl mb-4`}>
          <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 bg-clip-text text-transparent text-9xl">
            Welcome
          </span>{" "}
          to{" "}
    
          <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-green-400 bg-clip-text text-transparent text-8xl font-bold">
            Positions Manager
          </span>
        </h1>

        <p className="bg-gradient-to-r from-teal-300 via-cyan-300 to-green-300 bg-clip-text text-transparent max-w-lg mb-6">
          Manage organizational positions.
        </p>

        <div className="flex gap-4">

          <Button
            onClick={() => router.push("/register")}
            className="bg-gradient-to-r from-green-400 via-cyan-400 to-teal-400 text-white hover:brightness-110"
          >
            Get Started
          </Button>

          <Button
            onClick={() => router.push("/login")}
            className="bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 text-white hover:brightness-110"
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}
