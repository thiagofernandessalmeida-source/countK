import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { Activity, MessageCircle, ExternalLink, Instagram } from 'lucide-react';

export default function Header() {
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
    siteConfig.contact.whatsappDefaultMessage
  )}`;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Marca & Identidade Rafa Machado */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded-lg p-1"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-600 to-brand-700 group-hover:from-brand-500 group-hover:to-brand-600 flex items-center justify-center text-white shadow-md shadow-brand-600/25 transition-all shrink-0">
            <Activity className="w-6 h-6 stroke-[2.2]" aria-hidden="true" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-gray-900 text-lg sm:text-xl tracking-tight leading-tight group-hover:text-brand-600 transition-colors">
              {siteConfig.brand.tradeName}
            </span>
            <span className="text-xs text-gray-500 font-medium hidden sm:inline-block line-clamp-1">
              {siteConfig.brand.subtitle}
            </span>
          </div>
        </Link>

        {/* Links externos: Site Oficial, Instagram e WhatsApp */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Link para o site oficial */}
          <a
            href={siteConfig.officialSiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Acessar site oficial do Personal Rafa Machado"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 hover:text-brand-700 border border-gray-200/80 rounded-lg transition-colors"
          >
            <span>Site Oficial</span>
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          </a>

          {/* Link para o Instagram */}
          <a
            href={siteConfig.contact.instagram}
            target="_blank"
            rel="noopener noreferrer"
            title="Seguir @personalrafamachado no Instagram"
            className="p-2 sm:px-3 sm:py-2 inline-flex items-center gap-1.5 text-xs font-semibold text-pink-700 bg-pink-50 hover:bg-pink-100 rounded-lg transition-colors"
          >
            <Instagram className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span className="hidden sm:inline">108k+ no Instagram</span>
          </a>

          {/* CTA de WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Conversar no WhatsApp com ${siteConfig.brand.name}`}
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 active:bg-brand-800 shadow-sm shadow-brand-600/20 transition-all focus:ring-2 focus:ring-brand-500"
          >
            <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span className="hidden xs:inline">Falar no WhatsApp</span>
            <span className="xs:hidden">WhatsApp</span>
          </a>
        </div>
      </div>
    </header>
  );
}
