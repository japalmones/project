"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Kaushan_Script } from 'next/font/google';
const kaushan = Kaushan_Script({ subsets: ['latin'], weight: '400' });

export default function Contact() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); 
  }, []);

  if (!mounted) return null; 

  return (
    <div className="relative h-screen font-sans overflow-hidden">

      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-sm brightness-90"
          style={{ backgroundImage: "url('/bg1.jpg')" }}
        ></div>

        <div className="absolute inset-0 bg-purple-900/20"></div>
      </div>

      <nav className="flex gap-6 fixed top-6 right-6 z-20">
        {["Home", "About", "Education", "Hobbies"].map((text) => (
          <a
            key={text}
            href={`/${text.toLowerCase() === 'home' ? '' : text.toLowerCase()}`}
            className="relative px-6 py-2 bg-purple-600 text-white text-lg rounded-xl font-medium 
                       shadow-lg hover:bg-purple-700 hover:shadow-xl transition-all
                       before:absolute before:inset-0 before:rounded-xl before:bg-purple-400/20 before:blur-md before:opacity-0 hover:before:opacity-100"
          >
            {text}
          </a>
        ))}
      </nav>

      <div className="relative z-10 flex flex-col items-center justify-center h-screen px-10 text-center">

        <h1 className={`${kaushan.className} text-5xl md:text-6xl text-purple-200 drop-shadow-2xl mb-6 animate-fadeUp`}>
          Contact Me
        </h1>

        <p className="text-xl md:text-2xl text-purple-100 max-w-2xl mb-8 animate-fadeUp delay-200">
          Feel free to reach out via any of the following:
        </p>

        <div className="text-purple-100 text-lg md:text-xl space-y-3 mb-8 animate-fadeUp delay-400">
          <p><strong>Email:</strong> japalmones@gbox.ncf.edu.ph</p>
          <p><strong>Phone:</strong> +63 9858 802 6944</p>
          <p><strong>Location:</strong> Mangga st. Liboton Naga City</p>
        </div>

        <div className="relative animate-fadeUp delay-600">
          <div className="absolute w-[220px] h-[220px] bg-purple-500 blur-3xl opacity-30 rounded-full -z-10"></div>
          <Image
            src="/profile1.jpg"
            alt="Profile Picture"
            width={200}
            height={200}
            className="rounded-full shadow-2xl border-4 border-purple-500 hover:scale-105 transition-transform"
          />
        </div>

      </div>

      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 opacity-20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-16 w-80 h-80 bg-purple-600 opacity-20 rounded-full blur-3xl animate-pulse delay-300"></div>

      <style>
        {`
          .animate-fadeUp {
            opacity: 0;
            transform: translateY(20px);
            animation: fadeUp 1s ease forwards;
          }
          .animate-fadeUp.delay-200 { animation-delay: 0.2s; }
          .animate-fadeUp.delay-400 { animation-delay: 0.4s; }
          .animate-fadeUp.delay-600 { animation-delay: 0.6s; }
          @keyframes fadeUp {
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>

    </div>
  );
}
