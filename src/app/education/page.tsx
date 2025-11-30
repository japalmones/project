"use client";

import { useState, useEffect } from "react";
import { Kaushan_Script } from 'next/font/google';
const kaushan = Kaushan_Script({ subsets: ['latin'], weight: '400' });

export default function Education() {
  const [mounted, setMounted] = useState(false);

  const education = [
    {
      title: "Elementary",
      details: ["School: Naga Central School I", "Year: 2012 – 2018"]
    },
    {
      title: "High School",
      details: ["School: Camarines Sur National High School", "Year: 2018 – 2022"]
    },
    {
      title: "Senior High School",
      details: ["School: Camarines Sur National High School", "Strand: General Academic Strand", "Year: 2022 – 2024"]
    },
    {
      title: "College",
      details: ["School: Naga College Foundation Inc.", "Course: Bachelor of Science in Information Technology", "Year: 2024 – present"]
    }
  ];

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
        <div className="absolute inset-0 bg-purple-900/20"></div> 
      </div>

      <nav className="flex gap-6 fixed top-6 right-6 z-20">
        {["Home", "About", "Contact", "Hobbies"].map((text) => (
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

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8 text-white">

        <h1 className={`${kaushan.className} text-5xl md:text-6xl text-purple-200 mb-12 drop-shadow-2xl animate-fadeUp`}>
          My Education
        </h1>

        <div className="grid md:grid-cols-2 gap-10 max-w-5xl w-full">
          {education.map((edu, index) => (
            <div 
              key={index}
              className="bg-purple-800/50 p-6 rounded-xl shadow-xl border border-purple-600 relative animate-fadeUp"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="absolute -inset-1 bg-purple-500 opacity-20 blur-3xl rounded-xl -z-10"></div>

              <h2 className={`${kaushan.className} text-3xl font-semibold text-purple-300 mb-2`}>{edu.title}</h2>
              <p className="text-lg leading-relaxed">
                {edu.details.map((line, i) => (
                  <span key={i}>{line}<br/></span>
                ))}
              </p>
            </div>
          ))}
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
          @keyframes fadeUp {
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>

    </div>
  );
}
