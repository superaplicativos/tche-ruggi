'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Mail, MapPin } from 'lucide-react';

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function BioSection() {
  return (
    <section
      id="bio"
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      {/* Background geometric accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/[0.02] rotate-45 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-copper/[0.03] rotate-12 -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Photo side */}
          <div className="relative group">
            <div className="relative aspect-[3/4] overflow-hidden border border-gold/20">
              <Image
                src="/images/catalogo_p2_img1.jpeg"
                alt="Tché Ruggi"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/40 to-transparent" />
            </div>
            {/* Decorative frame corner */}
            <div className="absolute -top-3 -left-3 w-12 h-12 border-t-2 border-l-2 border-gold/40" />
            <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b-2 border-r-2 border-gold/40" />
          </div>

          {/* Text side */}
          <div className="space-y-8">
            <div>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-gold/60 text-xs uppercase tracking-[0.4em] mb-3"
              >
                O Artista
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground"
              >
                Marcelo Dalia{' '}
                <span className="text-gold-shimmer">Ruggi</span>
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-lg italic text-gold/80 border-l-2 border-gold/40 pl-4"
            >
              &ldquo;Sou formado pelo conjunto das minhas vivências.&rdquo;
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="space-y-4 text-muted-foreground text-sm leading-relaxed"
            >
              <p>
                Nascido em São Paulo, Tché Ruggi passou a infância em Minas
                Gerais, rodeado por minas e cristais — experiência que marcou
                profundamente sua poética visual e deu origem ao conceito de{' '}
                <span className="text-gold font-medium">Geologiometria</span>.
              </p>
              <p>
                Iniciou sua trajetória no grafite nos anos 2000, e em 2008
                fundou o{' '}
                <span className="text-foreground font-medium">Coletivo132</span>,
                grupo referência na cena urbana paulistana. Em 2012, consolidou
                sua visão ao fundar a{' '}
                <span className="text-foreground font-medium">
                  A7MA Galeria
                </span>{' '}
                na Vila Madalena, espaço que se tornou um polo de arte
                contemporânea independente.
              </p>
              <p>
                Suas obras transcendem o grafite tradicional, mesclando
                linguagem contemporânea com abstração geométrica. Trabalha com
                pinturas em esmalte e spray, esculturas em aço, cobre, madeira e
                espelho, criando peças que exploram a interseção entre geologia,
                geometria e energia.
              </p>
            </motion.div>

            {/* Quick links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <a
                href="https://www.instagram.com/tcheruggi.art"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs uppercase tracking-wider text-gold hover:text-gold-light transition-colors"
              >
                <InstagramIcon className="w-4 h-4" /> @tcheruggi.art
              </a>
              <a
                href="mailto:tcheruggi@a7ma.art.br"
                className="flex items-center gap-2 text-xs uppercase tracking-wider text-gold hover:text-gold-light transition-colors"
              >
                <Mail className="w-4 h-4" /> tcheruggi@a7ma.art.br
              </a>
              <span className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
                <MapPin className="w-4 h-4 text-gold/60" /> A7MA Galeria,
                Vila Madalena, SP
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
