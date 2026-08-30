'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { User, Mail, Lock, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('USER');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      login(data.token, data.user);
      router.push('/profile');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#C84B31] to-[#FF7B54] text-white flex items-center justify-center text-2xl mx-auto shadow-md">
          🍛
        </div>
        <h1 className="font-serif font-bold text-3xl text-[#1E1B18]">
          Join the Heritage Mission
        </h1>
        <p className="text-xs text-neutral-600">
          Create an account to preserve family recipes and explore India&apos;s culinary heritage.
        </p>
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
            <label className="text-xs font-bold text-[#1E1B18] block mb-1">Full Name *</label>
            <div className="relative">
              <User className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Aparna Sen"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-[#EADECA] text-xs focus:border-[#C84B31]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-[#1E1B18] block mb-1">Email Address *</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="aparna@example.in"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-[#EADECA] text-xs focus:border-[#C84B31]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-[#1E1B18] block mb-1">Password *</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-[#EADECA] text-xs focus:border-[#C84B31]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-[#1E1B18] block mb-1">Account Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#EADECA] text-xs focus:border-[#C84B31]"
            >
              <option value="USER">Heritage Explorer (Read & Bookmark)</option>
              <option value="CONTRIBUTOR">Community Contributor (Submit Recipes & Oral Stories)</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-[#C84B31] hover:bg-[#A33B24] disabled:opacity-50 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>{loading ? 'Creating Account...' : 'Register'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-neutral-500 pt-4 border-t border-[#EADECA]">
          Already have an account?{' '}
          <Link href="/auth/login" className="font-bold text-[#C84B31] hover:underline">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
