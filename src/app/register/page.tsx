'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, FormEvent } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

import { API_BASE } from '@/lib/config';

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [contact, setContact] = useState('');
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!error || !mounted) return;
    setShake(true);
    const timer = setTimeout(() => setShake(false), 450);
    return () => clearTimeout(timer);
  }, [error, mounted]);

  async function handleRegister(e: FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    if (!username || !password || !contact) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, contact }),
      });

      if (!res.ok) {
        setError('Username already exists');
        setLoading(false);
        return;
      }

      setSuccess(true);
      setUsername('');
      setPassword('');
      setContact('');
      setError('');
      setLoading(false);

      const redirectDelay = 5000 + Math.floor(Math.random() * 2000);
      setTimeout(() => router.push('/login'), redirectDelay);
    } catch {
      setError('Username already exists');
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
        <div className="bg-white/10 backdrop-blur-lg p-1 rounded-xl shadow-2xl">
          <Card className="w-full max-w-sm p-6 bg-gradient-to-br from-purple-700/30 to-blue-500/30 border border-white/20 shadow-purple-glow">
            <CardContent>
              <h1 className="text-2xl font-extrabold mb-4 text-white">Register</h1>
              <div className="space-y-4">
                <Input placeholder="Username" className="bg-purple-700/30 text-white border-transparent" disabled />
                <Input placeholder="Password" type="password" className="bg-purple-700/30 text-white border-transparent" disabled />
                <Input placeholder="Contact" className="bg-purple-700/30 text-white border-transparent" disabled />
                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg" disabled>
                  Register
                </Button>
              </div>
              <Button variant="link" className="mt-2 w-full text-white" disabled>
                Back to Login
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
      style={{ backgroundImage: "url('/bg24.jpg')" }}
    >
      <div className="bg-white/10 backdrop-blur-lg p-1 rounded-xl shadow-2xl">
        <Card className="w-full max-w-sm p-6 bg-gradient-to-br from-purple-700/30 to-blue-500/30 border border-white/20 shadow-purple-glow">
          <CardContent>
            <h1 className="text-2xl font-extrabold mb-4 text-white drop-shadow-purple-glow">
              Register
            </h1>

            <form onSubmit={handleRegister} className="space-y-4">
              <Input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`bg-purple-700/30 text-white placeholder-purple-200/70 ${invalidInputClass(username)}`}
                disabled={loading || success}
              />

              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`bg-purple-700/30 text-white placeholder-purple-200/70 ${invalidInputClass(password)}`}
                disabled={loading || success}
              />

              <Input
                placeholder="Contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className={`bg-purple-700/30 text-white placeholder-purple-200/70 ${invalidInputClass(contact)}`}
                disabled={loading || success}
              />

      
              {error && !success && (
                <p className={`text-sm text-center shake-text text-red-400`}>
                  {error}
                </p>
              )}

              {success && (
                <p className="text-sm text-center bounce-text text-green-400">
                  Registered successfully!
                </p>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-blue-500 hover:to-purple-600 text-white shadow-lg flex items-center justify-center gap-2"
                disabled={loading || success}
              >
                {loading && (
                  <span className="loader-border loader-border-white h-4 w-4 rounded-full border-2 border-t-2 border-t-transparent animate-spin"></span>
                )}
                {loading ? 'Registering...' : success ? 'Registered!' : 'Register'}
              </Button>
            </form>

            <Button
              variant="link"
              className="mt-2 w-full text-white hover:text-blue-200"
              onClick={() => router.push('/login')}
              disabled={loading}
            >
              Back to Login
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

        @keyframes bounceText {
          0%, 100% { transform: translateY(0); }
          30% { transform: translateY(-8px); }
          50% { transform: translateY(-4px); }
          70% { transform: translateY(-2px); }
        }
        /* Continuous bouncing until redirect */
        .bounce-text {
          animation: bounceText 1s ease-in-out infinite;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in {
          animation: fadeIn 0.5s ease forwards;
        }

        .loader-border {
          border-style: solid;
        }
      `}</style>
    </div>
  );
}
