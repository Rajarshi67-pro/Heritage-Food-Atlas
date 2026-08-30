'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useI18n, SupportedLocale } from '@/lib/i18n/context';
import { useAuth } from '@/lib/auth-context';
import {
  Compass,
  MapPin,
  Sparkles,
  BookOpen,
  Calendar,
  Layers,
  Mic,
  Route,
  User,
  ShieldCheck,
  Menu,
  X,
  Languages,
  LogOut,
  PlusCircle,
} from 'lucide-react';

export default function Navbar() {
  const { locale, setLocale, t } = useI18n();
  const { user, logout, isAdmin } = useAuth();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const navLinks = [
    { href: '/map', label: t('nav.map'), icon: MapPin },
    { href: '/explore', label: t('nav.explore'), icon: Compass },
    { href: '/festivals', label: t('nav.festivals'), icon: Calendar },
    { href: '/ingredients', label: t('nav.ingredients'), icon: Layers },
    { href: '/stories', label: t('nav.stories'), icon: Mic },
    { href: '/trails', label: t('nav.trails'), icon: Route },
    { href: '/ai/recognize', label: t('nav.ai_vision'), icon: Sparkles, highlight: true },
    { href: '/ai/storyteller', label: t('nav.ai_storyteller'), icon: BookOpen },
  ];

  const languages: { code: SupportedLocale; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिन्दी (Hindi)' },
    { code: 'bn', label: 'বাংলা (Bengali)' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#EADECA] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#C84B31] to-[#FF7B54] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <span className="text-2xl">🍛</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif font-bold text-xl text-[#1E1B18] tracking-tight group-hover:text-[#C84B31] transition-colors">
                  {t('app_name')}
                </span>
                <span className="text-xs bg-[#FF7B54]/10 text-[#C84B31] font-semibold px-2 py-0.5 rounded-full border border-[#FF7B54]/20">
                  🇮🇳
                </span>
              </div>
              <p className="text-[11px] text-[#7A3E26] font-medium hidden sm:block">
                Cultural Culinary Preservation
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#C84B31] text-white shadow-sm'
                      : link.highlight
                      ? 'bg-[#FF7B54]/10 text-[#C84B31] hover:bg-[#FF7B54]/20'
                      : 'text-[#1E1B18]/80 hover:text-[#C84B31] hover:bg-[#F5EFEB]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : link.highlight ? 'text-[#C84B31]' : 'text-[#7A3E26]'}`} />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#EADECA] bg-white text-xs font-medium text-[#1E1B18] hover:border-[#C84B31] transition-colors"
                title="Change Language"
              >
                <Languages className="w-3.5 h-3.5 text-[#C84B31]" />
                <span className="uppercase font-bold text-[11px]">{locale}</span>
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-[#EADECA] py-1 z-50 animate-in fade-in zoom-in-95">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLocale(l.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#F5EFEB] transition-colors ${
                        locale === l.code ? 'font-bold text-[#C84B31] bg-[#FDFBF7]' : 'text-[#1E1B18]'
                      }`}
                    >
                      <span>{l.label}</span>
                      {locale === l.code && <span className="w-1.5 h-1.5 rounded-full bg-[#C84B31]"></span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Contribute CTA */}
            <Link
              href="/contribute"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#C84B31]/30 text-[#C84B31] bg-[#C84B31]/5 hover:bg-[#C84B31] hover:text-white text-xs font-semibold transition-all"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              {t('nav.contribute')}
            </Link>

            {/* Auth Menu */}
            {user ? (
              <div className="flex items-center gap-2">
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#2A9D8F] text-white text-xs font-semibold hover:bg-[#238276] transition-colors"
                    title="Curator Admin Panel"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Admin
                  </Link>
                )}
                <Link
                  href="/profile"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F5EFEB] border border-[#EADECA] text-xs font-semibold text-[#1E1B18] hover:border-[#C84B31]"
                >
                  <User className="w-3.5 h-3.5 text-[#C84B31]" />
                  <span className="max-w-[90px] truncate">{user.name.split(' ')[0]}</span>
                </Link>
                <button
                  onClick={logout}
                  className="p-1.5 rounded-lg text-neutral-500 hover:text-[#C84B31] hover:bg-[#F5EFEB]"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/auth/login"
                  className="px-3 py-1.5 text-xs font-semibold text-[#1E1B18] hover:text-[#C84B31]"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  href="/auth/register"
                  className="px-3 py-1.5 rounded-lg bg-[#C84B31] text-white text-xs font-semibold hover:bg-[#A33B24] transition-colors shadow-xs"
                >
                  {t('nav.register')}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => {
                const nextLocale: Record<SupportedLocale, SupportedLocale> = { en: 'hi', hi: 'bn', bn: 'en' };
                setLocale(nextLocale[locale]);
              }}
              className="px-2 py-1 rounded border border-[#EADECA] text-xs font-bold uppercase text-[#C84B31]"
            >
              {locale}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#1E1B18] hover:bg-[#F5EFEB]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#EADECA] bg-[#FDFBF7] px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold ${
                  isActive ? 'bg-[#C84B31] text-white' : 'text-[#1E1B18] hover:bg-[#F5EFEB]'
                }`}
              >
                <Icon className="w-4 h-4" />
                {link.label}
              </Link>
            );
          })}

          <div className="pt-3 border-t border-[#EADECA] space-y-2">
            <Link
              href="/contribute"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold bg-[#C84B31]/10 text-[#C84B31]"
            >
              <PlusCircle className="w-4 h-4" />
              {t('nav.contribute')}
            </Link>
            {user ? (
              <>
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-[#1E1B18] hover:bg-[#F5EFEB]"
                >
                  <User className="w-4 h-4 text-[#C84B31]" />
                  {t('nav.profile')} ({user.name})
                </Link>
                {isAdmin && (
                  <Link
                    href="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold bg-[#2A9D8F] text-white"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    {t('nav.admin')}
                  </Link>
                )}
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4" />
                  {t('nav.logout')}
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link
                  href="/auth/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 rounded-xl border border-[#EADECA] text-sm font-semibold"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  href="/auth/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 rounded-xl bg-[#C84B31] text-white text-sm font-semibold"
                >
                  {t('nav.register')}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
