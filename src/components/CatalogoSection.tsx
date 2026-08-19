'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArtworkCard from './ArtworkCard';
import { artworks, seriesList } from '@/data/artworks';

export default function CatalogoSection() {
  const [activeSeries, setActiveSeries] = useState<string>('all');

  const filtered =
    activeSeries === 'all'
      ? artworks
      : artworks.filter((a) => a.series === activeSeries);

  const seriesWithWorks = seriesList.filter((s) =>
    artworks.some((a) => a.series === s),
  );

  return (
    <section id="catalogo" className="relative py-24 sm:py-32">
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="text-gold/60 text-xs uppercase tracking-[0.4em] mb-3">
            Obras
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
            Catálogo <span className="text-gold-shimmer">Raisonné</span>
          </h2>
          <div className="mt-4 mx-auto w-20 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        </motion.div>
      </div>

      {/* Series filter tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          <button
            onClick={() => setActiveSeries('all')}
            className={`px-4 py-2 text-xs uppercase tracking-[0.15em] border transition-all duration-300 ${
              activeSeries === 'all'
                ? 'border-gold bg-gold/10 text-gold'
                : 'border-gold/10 text-muted-foreground hover:border-gold/30 hover:text-foreground'
            }`}
          >
            Todas
          </button>
          {seriesWithWorks.map((s) => (
            <button
              key={s}
              onClick={() => setActiveSeries(s)}
              className={`px-4 py-2 text-xs uppercase tracking-[0.15em] border transition-all duration-300 ${
                activeSeries === s
                  ? 'border-gold bg-gold/10 text-gold'
                  : 'border-gold/10 text-muted-foreground hover:border-gold/30 hover:text-foreground'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Artworks grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSeries}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {filtered.map((artwork, i) => (
              <ArtworkCard key={artwork.id} artwork={artwork} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-16">
            Nenhuma obra encontrada nesta série.
          </p>
        )}
      </div>
    </section>
  );
}
