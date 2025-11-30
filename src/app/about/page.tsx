"use client";

import { useState, useEffect } from "react";
import { Kaushan_Script } from 'next/font/google';
const kaushan = Kaushan_Script({ subsets: ['latin'], weight: '400' });

export default function About() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; 

  return (
    <div className="relative min-h-screen font-sans overflow-hidden">
      
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center filter blur-sm brightness-90"
          style={{ backgroundImage: "url('/bg1.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-purple-900/20"></div> {/* light overlay */}
      </div>

      <nav className="flex gap-6 fixed top-6 right-6 z-20">
        {["Home", "Contact", "Education", "Hobbies"].map((text) => (
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

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8">

        <h1 className={`${kaushan.className} text-5xl md:text-6xl text-purple-200 drop-shadow-2xl mb-8 text-center animate-fadeUp`}>
          About Me
        </h1>

        <p className="text-lg md:text-xl max-w-2xl text-center text-purple-100 leading-relaxed mb-12 animate-fadeUp delay-200">
          Hello! I'm <span className="text-purple-300 font-semibold">Joyce Anne Palmones</span>, but you can call me <span className="text-purple-300 font-semibold">Jaja</span>.  
          I am a passionate and creative person who loves expressing myself through <span className="text-purple-300 font-semibold">drawing and art</span>.<br /><br />
          I enjoy learning new things, improving my skills, and exploring ideas through simple projects.
        </p>

        <div className="bg-purple-800/50 p-8 rounded-2xl shadow-2xl max-w-xl text-center border border-purple-600 animate-fadeUp delay-400">
          <h2 className={`${kaushan.className} text-3xl md:text-4xl text-purple-300 mb-4`}>Who I Am</h2>
          <p className="text-lg md:text-xl text-purple-100 leading-relaxed">
            I'm someone who value creativity, simplicity, and meaningful moments.  
            I’m curious, motivated, and always looking to grow and express myself.  

          </p>
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
          @keyframes fadeUp {
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>

    </div>
  );
}
