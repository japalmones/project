'use client';
import { useRouter } from 'next/navigation';
import { getToken, logoutUser } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Kaushan_Script } from 'next/font/google';
import { useEffect, useState } from 'react';

const kaushan = Kaushan_Script({ subsets: ['latin'], weight: '400' });

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getToken();

    if (!token) {
      router.push('/login');
    } else {
      setIsLoading(false);
    }
  }, []);

  function handleLogout() {
    logoutUser();
    router.push('/login');
  }

  if (isLoading) return null; 

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-purple-300 via-purple-500 to-purple-700 text-gray-900 font-sans relative overflow-hidden">
    
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>


      <div className="absolute top-16 left-1/4 w-2 h-2 bg-white rounded-full opacity-70 animate-ping-slow"></div>
      <div className="absolute top-10 right-1/3 w-3 h-3 bg-white rounded-full opacity-50 animate-ping-slow"></div>
      <div className="absolute top-24 right-1/4 w-1.5 h-1.5 bg-white rounded-full opacity-60 animate-ping-slow"></div>

    
      <header className="flex justify-between items-center mb-8 relative z-10 p-4 bg-white/30 backdrop-blur-xl rounded-2xl shadow-lg border border-white/40 animate-fadeIn">
        <h1 className={`${kaushan.className} text-4xl md:text-5xl font-bold text-purple-900 drop-shadow-md relative`}>
          💜 Art Materials
          <span className="absolute -top-2 -right-2 w-2 h-2 bg-white rounded-full opacity-80 animate-pulse"></span>
        </h1>

        <Button
          className="bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 px-4 rounded-lg shadow-lg shadow-purple-300/40 transition-all duration-300 hover:scale-105"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </header>

      <main className="relative z-10">
        {children}
      </main>
    </div>
  );
}
