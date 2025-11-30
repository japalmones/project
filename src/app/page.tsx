"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Kaushan_Script } from 'next/font/google';

const kaushan = Kaushan_Script({ subsets: ['latin'], weight: '400' });

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative h-screen font-sans overflow-hidden">

      {/* BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/bg1.jpg')" }}
      ></div>

      {/* TOP NAVIGATION */}
      <nav className="flex gap-6 fixed top-6 right-6 z-20">

        {/* DEFAULT NAV BUTTONS */}
        {["About", "Contact", "Education", "Hobbies"].map((text) => (
          <div key={text} className="relative group">
            <div className="absolute -inset-1 bg-purple-400 rounded-xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity pointer-events-none"></div>

            <a
              href={`/${text.toLowerCase()}`}
              className="relative px-6 py-2 bg-purple-600 text-white text-lg rounded-xl font-medium 
                        shadow-lg hover:bg-purple-700 hover:shadow-xl transition-all z-10"
            >
              {text}
            </a>
          </div>
        ))}

        {/* STYLISH LOGIN BUTTON */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 rounded-full blur opacity-0 group-hover:opacity-70 transition-opacity pointer-events-none"></div>

          <a
            href="/login"
            className="relative px-6 py-2 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 
                       text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-[0_0_20px_rgba(139,92,246,0.7)]
                       transform hover:scale-105 transition-all z-10"
          >
            Login
          </a>
        </div>

      </nav>

      {/* MAIN CONTENT */}
      <div className="relative flex flex-col md:flex-row items-center justify-center h-screen px-4 sm:px-6 md:px-10 bg-purple-900/20 animate-fadeIn">

        {/* PROFILE IMAGE */}
        <div className="relative flex justify-center mb-10 md:mb-0 md:mr-16">
          <div className="absolute w-[350px] h-[500px] rounded-[60px] bg-purple-500/60 blur-[90px] opacity-90"></div>
          <div className="absolute w-[350px] h-[500px] rounded-[60px] bg-purple-300/40 blur-[120px] opacity-70"></div>

          <div className="relative w-[330px] h-[480px] rounded-[60px] overflow-hidden shadow-2xl">
            <Image
              src="/profile.jpg"
              alt="Profile Picture"
              width={330}
              height={480}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* TEXT SECTION */}
        <div className="text-center md:text-left max-w-lg">
          <h1 className={`${kaushan.className} text-6xl md:text-7xl text-purple-100 drop-shadow-2xl tracking-wide`}>
            Joyce Anne Quiñones Palmones
          </h1>

          <p className="text-2xl mt-2 text-purple-200 font-light">“Jaja”</p>

          <p className="text-xl mt-4 text-purple-300 italic">
            “My art? A mix of heart, chaos, and magic.”
          </p>

          <p className="text-lg mt-6 text-purple-200 opacity-90 leading-relaxed">
            Hi, I’m Jaja, a creative soul who loves drawing and exploring new ideas.
            Feel free to explore and learn more about me.
          </p>
        </div>
      </div>

      {/* FADE-IN ANIMATION */}
      <style>{`
        .animate-fadeIn {
          opacity: 0;
          animation: fadeIn 1.2s ease-in-out forwards;
        }
        @keyframes fadeIn {
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
