'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import type { Artwork } from '@/data/artworks';

interface ArtworkCardProps {
  artwork: Artwork;
  index?: number;
}

export default function ArtworkCard({ artwork, index = 0 }: ArtworkCardProps) {
  const waLink = artwork.sold
    ? null
    : `https://wa.me/5511982109567?text=Olá! Tenho interesse na obra: ${artwork.title} - US$ ${artwork.price}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.08 }}
      className="group relative"
    >
      <div className="relative overflow-hidden bg-[#111] border border-gold/10 hover:border-gold/30 transition-colors duration-500">
        {/* Image */}
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={artwork.image}
            alt={artwork.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Sold badge */}
          {artwork.sold && (
            <div className="absolute top-3 left-3 z-10">
              <Badge className="bg-red-600/90 text-white border-0 text-xs uppercase tracking-wider">
                Vendido
              </Badge>
            </div>
          )}

          {/* Edition badge */}
          {artwork.edition && (
            <div className="absolute top-3 right-3 z-10">
              <Badge className="bg-gold/90 text-[#0a0a0a] border-0 text-xs font-semibold">
                {artwork.edition}
              </Badge>
            </div>
          )}

          {/* Info on hover overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-10">
            <p className="text-xs text-gold/80 mb-1">{artwork.technique}</p>
            <p className="text-xs text-foreground/60">{artwork.dimensions}</p>
          </div>
        </div>

        {/* Card content */}
        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-sm text-foreground leading-tight line-clamp-2">
            {artwork.title}
          </h3>
          <p className="text-xs text-muted-foreground">{artwork.technique}</p>
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-muted-foreground">{artwork.year}</span>
            {artwork.sold ? (
              <span className="text-xs text-red-400 font-medium uppercase tracking-wider">
                Vendido
              </span>
            ) : artwork.price ? (
              <span className="text-sm font-semibold text-gold">
                US$ {artwork.price.toLocaleString()}
              </span>
            ) : null}
          </div>

          {/* WhatsApp CTA */}
          {!artwork.sold && artwork.price && waLink && (
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 block w-full text-center py-2 text-xs font-medium border border-gold/30 text-gold hover:bg-gold hover:text-[#0a0a0a] transition-all duration-300 uppercase tracking-wider"
            >
              Comprar via WhatsApp
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
