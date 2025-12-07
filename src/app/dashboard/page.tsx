'use client';

import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { getToken, logoutUser } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { API_BASE } from '@/lib/config';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

interface Position {
  position_id?: number;
  position_code: string;
  position_name: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [positionCode, setPositionCode] = useState('');
  const [positionName, setPositionName] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const listRef = useRef<HTMLDivElement>(null);
  const rowHeightRef = useRef<number>(0);
  const [maxListHeight, setMaxListHeight] = useState<string | undefined>(undefined);

  useLayoutEffect(() => {
    const row = listRef.current?.querySelector('tbody tr');
    if (row) {
      rowHeightRef.current = (row as HTMLElement).offsetHeight;
      if (positions.length > 4) {
        setMaxListHeight(`${rowHeightRef.current * 4}px`);
      } else {
        setMaxListHeight('auto');
      }
    }
  }, [positions]);

  useEffect(() => {
    if (!getToken()) {
      router.push('/login');
      return;
    }
    fetchPositions();
  }, [router]);

  function authHeaders() {
    const token = getToken();
    return {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    };
  }

  async function fetchPositions() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/positions`, {
        method: 'GET',
        headers: authHeaders(),
      });

      if (res.status === 401) {
        logoutUser();
        router.push('/login');
        return;
      }

      if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);

      const data = await res.json();
      setPositions(data);
    } catch (e: any) {
      setError(e.message || 'Failed to fetch positions');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  async function handleCreateOrUpdate(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const payload: Position = {
      position_code: positionCode,
      position_name: positionName,
    };

    try {
      let res: Response;

      if (editingId) {
        res = await fetch(`${API_BASE}/positions/${editingId}`, {
          method: 'PUT',
          headers: authHeaders(),
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`${API_BASE}/positions`, {
          method: 'POST',
          headers: authHeaders(),
          body: JSON.stringify(payload),
        });
      }

      if (res.status === 401) {
        logoutUser();
        router.push('/login');
        return;
      }

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message || `Request failed: ${res.status}`);
      }

      setPositionCode('');
      setPositionName('');
      setEditingId(null);
      await fetchPositions();
    } catch (e: any) {
      setError(e?.message || 'Save failed');
    }
  }

  function startEdit(p: Position) {
    setEditingId(p.position_id ?? null);
    setPositionCode(p.position_code);
    setPositionName(p.position_name);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleDelete(id?: number) {
    if (!id) return;
    if (!confirm('Delete this position?')) return;

    try {
      const res = await fetch(`${API_BASE}/positions/${id}`, {
        method: 'DELETE',
        headers: authHeaders(),
      });

      if (res.status === 401) {
        logoutUser();
        router.push('/login');
        return;
      }

      if (!res.ok) throw new Error(`Delete failed: ${res.status}`);

      await fetchPositions();
    } catch (e: any) {
      setError(e?.message || 'Delete failed');
    }
  }

  function handleCancelEdit() {
    setEditingId(null);
    setPositionCode('');
    setPositionName('');
  }

  function handleLogout() {
    logoutUser();
    router.push('/login');
  }

  function handleRefresh() {
    setRefreshing(true);
    fetchPositions();
  }

  return (
    <div className="relative min-h-screen p-8 font-sans text-white">
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm"
        style={{ backgroundImage: `url('/bg22.jpg')` }}
      />

      <div className="relative z-10 max-w-7xl mx-auto mt-20">
        <header className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-widest animate-pulse font-serif bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 drop-shadow-purple-glow">
            Positions Dashboard
          </h1>
          <div className="flex gap-3">
            <Button
              onClick={handleRefresh}
              className="bg-gradient-to-r from-blue-500 to-purple-600 font-bold"
            >
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </Button>
            <Button
              onClick={handleLogout}
              className="bg-gradient-to-r from-purple-600 to-blue-500 font-bold"
            >
              Logout
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
          <section className="lg:col-span-2">
            <h2 className="text-lg font-mono font-bold mb-2 uppercase tracking-wide text-white drop-shadow-purple-glow leading-tight">
              Positions List
            </h2>
            <Card className="w-full bg-black border border-white/20 shadow-purple-glow p-6">
              <CardContent
                ref={listRef}
                className="overflow-y-auto"
                style={{ maxHeight: maxListHeight }}
              >
                <table className="w-full text-left table-auto border-collapse text-white">
                  <thead>
                    <tr className="border-b border-white/30">
                      <th className="px-6 py-3 uppercase font-bold">ID</th>
                      <th className="px-6 py-3 uppercase font-bold">Code</th>
                      <th className="px-6 py-3 uppercase font-bold">Name</th>
                      <th className="px-6 py-3 uppercase font-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {positions.length === 0 && !loading && (
                      <tr>
                        <td colSpan={4} className="px-6 py-10 text-center font-semibold">
                          No positions found.
                        </td>
                      </tr>
                    )}
                    {positions.map((p, idx) => (
                      <tr
                        key={p.position_id}
                        className="border-b border-white/30 hover:bg-purple-700 hover:bg-opacity-30 transition"
                        style={{
                          backgroundColor:
                            idx % 2 === 0 ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.1)',
                        }}
                      >
                        <td className="px-6 py-3 font-mono font-bold">{p.position_id}</td>
                        <td className="px-6 py-3 font-bold">{p.position_code}</td>
                        <td className="px-6 py-3 font-semibold">{p.position_name}</td>
                        <td className="px-6 py-3">
                          <div className="flex gap-3">
                            <button
                              onClick={() => startEdit(p)}
                              className="border-2 border-purple-300 text-white font-bold px-3 py-1 rounded-lg uppercase hover:bg-purple-500 hover:text-white transition"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(p.position_id)}
                              className="border-2 border-blue-300 text-white font-bold px-3 py-1 rounded-lg uppercase hover:bg-blue-500 hover:text-white transition"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </section>

        
          <section className="flex flex-col items-center lg:items-start">
            <h2 className="text-lg font-mono font-bold mb-2 uppercase tracking-wide text-white drop-shadow-purple-glow leading-tight">
              {editingId ? 'Edit Position' : 'Create Position'}
            </h2>

            <Card
              className="w-full max-w-sm p-6 bg-black border border-white/20 shadow-purple-glow"
              id="createPositionCard"
            >
              <CardContent>
                <form onSubmit={handleCreateOrUpdate} className="space-y-4">
                  <div className="flex flex-col">
                    <label htmlFor="positionCode" className="mb-1 font-semibold text-white">
                      Position Code
                    </label>
                    <Input
                      id="positionCode"
                      autoComplete="off"
                      value={positionCode}
                      onChange={(e) => setPositionCode(e.target.value)}
                      className="bg-gray-800 text-white focus:ring-blue-400"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="positionName" className="mb-1 font-semibold text-white">
                      Position Name
                    </label>
                    <Input
                      id="positionName"
                      autoComplete="off"
                      value={positionName}
                      onChange={(e) => setPositionName(e.target.value)}
                      className="bg-gray-800 text-white focus:ring-blue-400"
                    />
                  </div>

                  {error && <p className="text-red-400 text-sm">{error}</p>}

                  <div className="flex gap-4">
                    <Button className="flex-1 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-blue-500 hover:to-purple-600 text-white shadow-lg">
                      {editingId ? 'Update' : 'Create'}
                    </Button>
                    {editingId && (
                      <Button
                        type="button"
                        onClick={handleCancelEdit}
                        className="flex-1 border-2 border-purple-300 rounded-lg uppercase font-bold text-white hover:bg-purple-500 hover:text-white transition"
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>

      <style jsx global>{`
        .shadow-purple-glow {
          box-shadow: 0 0 15px 4px rgba(143, 0, 255, 0.6),
            0 0 25px 6px rgba(0, 198, 255, 0.4);
        }
        .drop-shadow-purple-glow {
          text-shadow: 0 0 8px rgba(143, 0, 255, 0.8),
            0 0 12px rgba(0, 198, 255, 0.5);
        }
      `}</style>
    </div>
  );
}
