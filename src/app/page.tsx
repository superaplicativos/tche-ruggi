'use client';

import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import BioSection from '@/components/BioSection';
import CatalogoSection from '@/components/CatalogoSection';
import LojaSection from '@/components/LojaSection';
import CamisetasSection from '@/components/CamisetasSection';
import FooterSection from '@/components/FooterSection';

// Dynamic import for Three.js hero — no SSR
const Hero3D = dynamic(() => import('@/components/Hero3D'), {
  ssr: false,
  loading: () => (
    <section className="w-full h-screen flex items-center justify-center bg-[#0a0a0a]">
      <div className="text-center">
        <div className="inline-block w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin mb-4" />
        <p className="text-gold/40 text-xs uppercase tracking-[0.3em]">
          Carregando...
        </p>
      </div>
    </section>
  ),
});

// Geometric divider between sections
function GeoDivider() {
  return (
    <div className="relative py-2">
      <div className="flex items-center justify-center gap-4">
        <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent to-gold/20" />
        <div className="w-2 h-2 rotate-45 border border-gold/30" />
        <div className="w-1.5 h-1.5 rotate-45 bg-gold/20" />
        <div className="w-2 h-2 rotate-45 border border-gold/30" />
        <div className="h-px flex-1 max-w-[120px] bg-gradient-to-l from-transparent to-gold/20" />
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <Hero3D />

      <GeoDivider />

      <BioSection />

      <GeoDivider />

      <CatalogoSection />

      <GeoDivider />

      <LojaSection />

      <GeoDivider />

      <CamisetasSection />

      <FooterSection />
    </main>
  );
}
