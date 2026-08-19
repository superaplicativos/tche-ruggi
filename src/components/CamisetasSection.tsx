'use client';

import { motion } from 'framer-motion';
import { Shirt } from 'lucide-react';
import TshirtCard from './TshirtCard';
import { tshirtDesigns } from '@/data/artworks';

export default function CamisetasSection() {
  return (
    <section id="camisetas" className="relative py-24 sm:py-32">
      {/* Background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,169,110,0.03)_0%,transparent_50%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <Shirt className="w-5 h-5 text-gold/60" />
            <p className="text-gold/60 text-xs uppercase tracking-[0.4em]">
              Wearable Art
            </p>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
            Camisetas <span className="text-gold-shimmer">Exclusivas</span>
          </h2>
          <div className="mt-4 mx-auto w-20 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
          <p className="mt-4 text-muted-foreground text-sm max-w-lg mx-auto">
            Use arte. Cada camiseta traz estampas de obras originais de Tché
            Ruggi, transformando geometria e abstração em moda urbana.
          </p>
        </motion.div>

        {/* Size/Color info */}
        <div className="flex flex-wrap justify-center gap-6 mb-12 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-black border border-white/20" />
            Preto
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-white border border-white/20" />
            Branco
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-gray-500 border border-white/20" />
            Cinza
          </div>
          <span className="border-l border-gold/20 pl-6">
            Tamanhos: P · M · G · GG
          </span>
        </div>

        {/* T-shirts grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {tshirtDesigns.map((tshirt, i) => (
            <TshirtCard key={tshirt.id} tshirt={tshirt} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
