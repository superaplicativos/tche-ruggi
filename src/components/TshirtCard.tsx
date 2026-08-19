'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import type { TshirtDesign } from '@/data/artworks';

interface TshirtCardProps {
  tshirt: TshirtDesign;
  index?: number;
}

export default function TshirtCard({ tshirt, index = 0 }: TshirtCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
      className="group relative"
    >
      <div className="relative overflow-hidden bg-[#111] border border-gold/10 hover:border-gold/30 transition-all duration-500">
        {/* T-shirt visual area */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]">
          {/* Art print preview */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-[70%] h-[70%]">
              <Image
                src={tshirt.image}
                alt={tshirt.name}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover rounded-sm opacity-90 group-hover:opacity-100 transition-opacity duration-500"
              />
            </div>
          </div>
          {/* T-shirt shape overlay */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-x-[10%] top-[5%] bottom-[5%] border-2 border-white/10 rounded-full" />
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-sm text-foreground">{tshirt.name}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Arte por Tché Ruggi</p>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-gold">{tshirt.price}</span>
            <span className="text-xs text-muted-foreground">P · M · G · GG</span>
          </div>

          <a
            href={`https://wa.me/5511982109567?text=Olá! Quero comprar a camiseta: ${tshirt.name} - Tam: [ESCOLHA] - Cor: [ESCOLHA]`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-medium border border-gold/30 text-gold hover:bg-gold hover:text-[#0a0a0a] transition-all duration-300 uppercase tracking-wider"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Comprar via WhatsApp
          </a>
        </div>
      </div>
    </motion.div>
  );
}
