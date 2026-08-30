import type { Metadata } from 'next';
import './globals.css';
import { I18nProvider } from '@/lib/i18n/context';
import { AuthProvider } from '@/lib/auth-context';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Heritage Food Atlas — Preserving India\'s Culinary Traditions',
  description:
    'An AI-powered digital platform for discovering, documenting, preserving, and celebrating India\'s living gastronomic heritage, regional foodways, oral histories, and festival food lore.',
  keywords: [
    'Indian food heritage',
    'traditional Indian dishes',
    'culinary history India',
    'GI tag Indian foods',
    'Patishapta',
    'Pakhala Bhata',
    'Onam Sadya',
    'grandparents oral food history',
    'AI food recognition',
    'India food map',
  ],
  openGraph: {
    title: 'Heritage Food Atlas — Preserving India\'s Living Foodways',
    description: 'Preserving not just what India eats, but why India eats it.',
    url: 'https://heritagefoodatlas.in',
    siteName: 'Heritage Food Atlas',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#1E1B18] antialiased selection:bg-[#FF7B54]/20 selection:text-[#C84B31]">
        <AuthProvider>
          <I18nProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </I18nProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
