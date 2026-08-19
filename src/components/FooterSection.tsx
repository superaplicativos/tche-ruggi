'use client';

import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  ExternalLink,
} from 'lucide-react';

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function FooterSection() {
  return (
    <footer id="footer" className="relative border-t border-gold/10">
      {/* Top decorative line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {/* Left column - Branding */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="space-y-4"
      >
        <h3 className="text-2xl font-bold text-gold-shimmer tracking-tight">
          Tché Ruggi
        </h3>
        <p className="text-xs text-muted-foreground uppercase tracking-[0.2em]">
          Geologiometria
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Arte contemporânea que transcende fronteiras entre grafite, abstração
          geométrica e escultura metálica.
        </p>
      </motion.div>

          {/* Center column - Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="space-y-4"
      >
        <h4 className="text-xs uppercase tracking-[0.3em] text-gold/60 mb-4">
          Contato
        </h4>
        <a
          href="https://wa.me/5511982109567"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-sm text-muted-foreground hover:text-gold transition-colors"
        >
          <Phone className="w-4 h-4 text-gold/50" />
          +55 11 98210-9567
        </a>
        <a
          href="mailto:tcheruggi@a7ma.art.br"
          className="flex items-center gap-3 text-sm text-muted-foreground hover:text-gold transition-colors"
        >
          <Mail className="w-4 h-4 text-gold/50" />
          tcheruggi@a7ma.art.br
        </a>
        <a
          href="https://www.instagram.com/tcheruggi.art"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-sm text-muted-foreground hover:text-gold transition-colors"
        >
          <InstagramIcon className="w-4 h-4 text-gold/50" />
          @tcheruggi.art
        </a>
      </motion.div>

          {/* Right column - Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-4"
      >
        <h4 className="text-xs uppercase tracking-[0.3em] text-gold/60 mb-4">
          Galeria
        </h4>
        <div className="flex items-start gap-3 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 text-gold/50 mt-0.5 shrink-0" />
          <div>
            <p className="font-medium text-foreground text-sm">A7MA Galeria</p>
            <p className="text-xs mt-1">
              Rua Medeiros de Albuquerque, 250
              <br />
              Vila Madalena, São Paulo — SP
            </p>
          </div>
        </div>
        <a
          href="https://a7ma.art.br"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-gold hover:text-gold-light transition-colors"
        >
          a7ma.art.br
          <ExternalLink className="w-3 h-3" />
        </a>
      </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-gold/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Tché Ruggi. Todos os direitos
            reservados.
          </p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-gold/40 animate-pulse-gold" />
            Geologiometria
          </div>
        </div>
      </div>
    </footer>
  );
}
