'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, FormEvent } from 'react';
import { saveToken } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { API_BASE } from '@/lib/config';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!error || !mounted) return;
    setShake(true);
    const timer = setTimeout(() => setShake(false), 450);
    return () => clearTimeout(timer);
  }, [error, mounted]);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      setLoading(false);

      if (!res.ok || !data.accessToken) {
        setError(
          data.error === 'USERNAME_NOT_FOUND'
            ? 'Invalid username'
            : data.error === 'WRONG_PASSWORD'
            ? 'Wrong password'
            : 'Invalid credentials. Please create an account.'
        );
        return;
      }

      saveToken(data.accessToken);
      router.push('/dashboard');
    } catch {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  }

  const invalidInputClass = (value: string) =>
    !value && error === 'Please fill in all fields'
      ? 'border-red-500'
      : 'border-transparent';

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-screen bg-cover bg-center">
        <div className="bg-white/10 backdrop-blur-lg p-1 rounded-xl shadow-2xl fade-in">
          <Card className="w-full max-w-sm p-6 bg-gradient-to-br from-purple-700/30 to-blue-500/30 border border-white/20 shadow-purple-glow">
            <CardContent>
              <h1 className="text-2xl font-extrabold mb-4 text-white">Login</h1>
          
              <div className="space-y-4">
                <Input placeholder="Username" className="bg-purple-700/30 text-white border-transparent" disabled />
                <Input placeholder="Password" type="password" className="bg-purple-700/30 text-white border-transparent" disabled />
                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg" disabled>
                  Login
                </Button>
              </div>
              <Button variant="link" className="mt-2 w-full text-white" disabled>
                Create an account
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/bg23.jpg')" }}
    >
      <div className="bg-white/10 backdrop-blur-lg p-1 rounded-xl shadow-2xl fade-in">
        <Card className="w-full max-w-sm p-6 bg-gradient-to-br from-purple-700/30 to-blue-500/30 border border-white/20 shadow-purple-glow">
          <CardContent>
            <h1 className="text-2xl font-extrabold mb-4 text-white">Login</h1>

            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`bg-purple-700/30 text-white ${invalidInputClass(username)}`}
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`bg-purple-700/30 text-white ${invalidInputClass(password)}`}
              />

              <p className={`text-red-400 text-sm text-center ${shake ? 'shake-text' : ''}`}>
                {error || ' '}
              </p>

              <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg">
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </form>

            <Button
              variant="link"
              className="mt-2 w-full text-white hover:text-blue-200"
              onClick={() => router.push('/register')}
            >
              Create an account
            </Button>
          </CardContent>
        </Card>
      </div>

      <style jsx>{`
        @keyframes shakeText {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-4px); }
          40% { transform: translateX(4px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
        .shake-text {
          animation: shakeText 0.45s ease;
        }
      `}</style>
    </div>
  );
}
