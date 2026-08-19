'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, SlidersHorizontal } from 'lucide-react';
import ArtworkCard from './ArtworkCard';
import {
  artworks,
  categoryLabels,
  type ArtworkCategory,
} from '@/data/artworks';

const categories: (ArtworkCategory | 'all')[] = [
  'all',
  'pintura',
  'escultura',
  'gravura',
  'mural',
];

export default function LojaSection() {
  const [activeCat, setActiveCat] = useState<ArtworkCategory | 'all'>('all');
  const [showSold, setShowSold] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return artworks.filter((a) => {
      if (a.sold && !showSold) return false;
      if (activeCat !== 'all' && a.category !== activeCat) return false;
      if (a.price !== null && (a.price < priceRange[0] || a.price > priceRange[1]))
        return false;
      return true;
    });
  }, [activeCat, showSold, priceRange]);

  return (
    <section id="loja" className="relative py-24 sm:py-32">
      {/* Background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(184,115,51,0.04)_0%,transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
          <ShoppingBag className="w-5 h-5 text-gold/60" />
          <p className="text-gold/60 text-xs uppercase tracking-[0.4em]">
            Adquira
          </p>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
            Loja <span className="text-gold-shimmer">Virtual</span>
          </h2>
          <div className="mt-4 mx-auto w-20 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
          <p className="mt-4 text-muted-foreground text-sm max-w-lg mx-auto">
            Adquira obras originais diretamente pelo WhatsApp. Todas as
            negociações são feitas de forma segura e personalizada.
          </p>
        </motion.div>

        {/* Filter bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {/* Category pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCat(cat)}
                  className={`px-4 py-2 text-xs uppercase tracking-[0.15em] border transition-all duration-300 ${
                    activeCat === cat
                      ? 'border-gold bg-gold/10 text-gold'
                      : 'border-gold/10 text-muted-foreground hover:border-gold/30 hover:text-foreground'
                  }`}
                >
                  {cat === 'all' ? 'Todas' : categoryLabels[cat]}
                </button>
              ))}
            </div>

            {/* Filter toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-3 py-2 text-xs text-gold border border-gold/20 hover:border-gold/40 transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Filtros</span>
            </button>
          </div>

          {/* Expandable filters */}
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border border-gold/10 bg-[#111] p-4 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showSold}
                    onChange={(e) => setShowSold(e.target.checked)}
                    className="accent-gold"
                  />
                  Mostrar vendidas
                </label>

                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>Preço:</span>
                  <span>US$ {priceRange[0]}</span>
                  <input
                    type="range"
                    min={0}
                    max={5000}
                    step={100}
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], Number(e.target.value)])
                    }
                    className="w-32 sm:w-48 accent-gold"
                  />
                  <span>US$ {priceRange[1]}</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Results count */}
        <p className="text-xs text-muted-foreground mb-6">
          {filtered.length} {filtered.length === 1 ? 'obra disponível' : 'obras disponíveis'}
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((artwork, i) => (
            <ArtworkCard key={artwork.id} artwork={artwork} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">
              Nenhuma obra corresponde aos filtros selecionados.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
