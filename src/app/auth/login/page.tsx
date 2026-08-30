'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Lock, Mail, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Invalid credentials');
      }

      login(data.token, data.user);
      router.push('/profile');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const fillDemoAccount = (roleEmail: string) => {
    setEmail(roleEmail);
    setPassword('heritage123');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#C84B31] to-[#FF7B54] text-white flex items-center justify-center text-2xl mx-auto shadow-md">
          🍛
        </div>
        <h1 className="font-serif font-bold text-3xl text-[#1E1B18]">
          Sign in to Heritage Atlas
        </h1>
        <p className="text-xs text-neutral-600">
          Access your personal archive, bookmarked dishes, and oral contributions.
        </p>
      </div>

      {/* Demo Credentials Helper */}
      <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-2xl space-y-2 text-xs">
        <span className="font-bold text-amber-900 block flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-[#C84B31]" />
          Instant Demo Logins:
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => fillDemoAccount('admin@heritagefoodatlas.in')}
            className="px-2.5 py-1 bg-white border border-amber-300 rounded-lg text-xs font-semibold text-neutral-800 hover:bg-amber-100 transition-colors"
          >
            Admin (Curator)
          </button>
          <button
            type="button"
            onClick={() => fillDemoAccount('contributor@heritagefoodatlas.in')}
            className="px-2.5 py-1 bg-white border border-amber-300 rounded-lg text-xs font-semibold text-neutral-800 hover:bg-amber-100 transition-colors"
          >
            Contributor
          </button>
          <button
            type="button"
            onClick={() => fillDemoAccount('user@heritagefoodatlas.in')}
            className="px-2.5 py-1 bg-white border border-amber-300 rounded-lg text-xs font-semibold text-neutral-800 hover:bg-amber-100 transition-colors"
          >
            Member User
          </button>
        </div>
        <span className="text-[10px] text-amber-700 block">Password for demo: heritage123</span>
      </div>

      <div className="bg-white rounded-3xl border border-[#EADECA] p-6 sm:p-8 shadow-xs">
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-[#1E1B18] block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-[#EADECA] text-xs focus:border-[#C84B31]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-[#1E1B18] block mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-[#EADECA] text-xs focus:border-[#C84B31]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-[#C84B31] hover:bg-[#A33B24] disabled:opacity-50 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-neutral-500 pt-4 border-t border-[#EADECA]">
          Don&apos;t have an account yet?{' '}
          <Link href="/auth/register" className="font-bold text-[#C84B31] hover:underline">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
}
