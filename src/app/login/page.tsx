'use client';

import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';
import { saveToken } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Kaushan_Script } from 'next/font/google';
import { API_BASE } from '@/lib/config';

const kaushan = Kaushan_Script({ subsets: ['latin'], weight: '400' });

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!username || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.accessToken) {
        setError(
          data.error === 'USERNAME_NOT_FOUND'
            ? 'Invalid username'
            : data.error === 'WRONG_PASSWORD'
            ? 'Wrong password'
            : 'Invalid credentials. Please create an account.'
        );
        setLoading(false);
        return;
      }

      saveToken(data.accessToken);
      router.push('/dashboard');
    } catch {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 via-purple-500 to-purple-400 relative overflow-hidden">
      
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

      <Card className="relative z-10 w-full max-w-md p-8 rounded-[30px] bg-gradient-to-br from-white/70 via-purple-100/50 to-white/60 backdrop-blur-2xl shadow-[0_10px_50px_rgba(150,90,255,0.25)] border border-purple-300 animate-slideUpFade">
        <CardContent className="space-y-6">
          <h1 className={`${kaushan.className} text-5xl text-center text-purple-700 drop-shadow-md`}>
            Welcome!
          </h1>

          <p className="text-center text-purple-600 text-sm -mt-2">
          Shop your fave art stuff here!
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-purple-100 border-purple-400 text-purple-800 rounded-2xl placeholder-purple-400 focus:ring-2 focus:ring-purple-500 transition-all"
            />

            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-purple-100 border-purple-400 text-purple-800 rounded-2xl placeholder-purple-400 focus:ring-2 focus:ring-purple-500 transition-all"
            />

            {error && (
              <p className="text-purple-700 text-sm text-center animate-shake">
                {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className={`w-full rounded-2xl text-lg py-3 font-bold text-white shadow-lg transition-all ${
                loading
                  ? 'bg-purple-900 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-800 to-purple-900 hover:from-purple-700 hover:to-purple-800'
              }`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          <Button
            variant="link"
            className="w-full text-purple-700 hover:text-purple-900 transition-all"
            onClick={() => router.push('/register')}
          >
            Create an account
          </Button>
        </CardContent>
      </Card>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-5px); }
          40% { transform: translateX(5px); }
          60% { transform: translateX(-5px); }
          80% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.4s;
        }

        @keyframes slideUpFade {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-slideUpFade {
          animation: slideUpFade 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}
