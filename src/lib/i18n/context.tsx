'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '@/locales/en.json';
import hi from '@/locales/hi.json';
import bn from '@/locales/bn.json';

export type SupportedLocale = 'en' | 'hi' | 'bn';

const translations: Record<SupportedLocale, any> = {
  en,
  hi,
  bn,
};

interface I18nContextType {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextType>({
  locale: 'en',
  setLocale: () => {},
  t: (key: string) => key,
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<SupportedLocale>('en');

  useEffect(() => {
    const saved = localStorage.getItem('hfa_locale') as SupportedLocale;
    if (saved && (saved === 'en' || saved === 'hi' || saved === 'bn')) {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = (newLocale: SupportedLocale) => {
    setLocaleState(newLocale);
    localStorage.setItem('hfa_locale', newLocale);
  };

  const t = (key: string, params?: Record<string, string | number>): string => {
    const keys = key.split('.');
    let current: any = translations[locale];
    let fallback: any = translations.en;

    for (const k of keys) {
      if (current && current[k] !== undefined) {
        current = current[k];
      } else {
        current = undefined;
      }

      if (fallback && fallback[k] !== undefined) {
        fallback = fallback[k];
      } else {
        fallback = undefined;
      }
    }

    let result = typeof current === 'string' ? current : typeof fallback === 'string' ? fallback : key;

    if (params) {
      Object.entries(params).forEach(([pKey, pVal]) => {
        result = result.replace(new RegExp(`{${pKey}}`, 'g'), String(pVal));
      });
    }

    return result;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
