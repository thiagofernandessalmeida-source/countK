import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { Activity, Mail, MessageCircle, Shield, ExternalLink, Instagram } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
    siteConfig.contact.whatsappDefaultMessage
  )}`;

  return (
    <footer className="bg-gray-950 text-gray-400 py-12 border-t border-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-gray-800">
          {/* Coluna 1: Marca & Descrição */}
          <div>
            <div className="flex items-center gap-2.5 text-white font-bold text-lg mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-600 to-brand-700 flex items-center justify-center text-white shrink-0">
                <Activity className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
              </div>
              <span>{siteConfig.brand.tradeName}</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed mb-2">
              {siteConfig.brand.subtitle}
            </p>
            <p className="text-xs text-brand-400 font-medium mb-3">
              {siteConfig.brand.bio}
            </p>
            {/* Link direto para o site oficial */}
            <a
              href={siteConfig.officialSiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-white hover:text-brand-400 font-semibold underline underline-offset-4 transition-colors"
            >
              <span>Acessar {siteConfig.officialSiteUrl.replace('https://', '')}</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>

          {/* Coluna 2: Navegação & Metodologia */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-200 mb-3">
              Navegação & Conteúdo
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/#como-calculamos"
                  className="hover:text-white transition-colors"
                >
                  Fórmulas e Metodologia Científica
                </Link>
              </li>
              <li>
                <Link
                  href="/#dicas"
                  className="hover:text-white transition-colors"
                >
                  Dicas de Hidratação e Treino
                </Link>
              </li>
              <li>
                <Link
                  href="/#faq"
                  className="hover:text-white transition-colors"
                >
                  Perguntas Frequentes (FAQ)
                </Link>
              </li>
              <li>
                <Link
                  href="/politica-de-privacidade"
                  className="text-brand-400 hover:text-brand-300 font-medium flex items-center gap-1.5 transition-colors"
                >
                  <Shield className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Política de Privacidade & Cookies</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Redes & Contato Direto */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-200 mb-3">
              Canais Oficiais do Rafa
            </h4>
            <div className="space-y-2.5 text-xs">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-300 hover:text-brand-400 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-500 shrink-0" aria-hidden="true" />
                <span>WhatsApp: (21) 99127-8444</span>
              </a>

              <a
                href={siteConfig.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-300 hover:text-pink-400 transition-colors"
              >
                <Instagram className="w-4 h-4 text-pink-500 shrink-0" aria-hidden="true" />
                <span>Instagram: {siteConfig.contact.instagramHandle} (108k)</span>
              </a>

              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-2 text-gray-300 hover:text-brand-400 transition-colors"
              >
                <Mail className="w-4 h-4 text-brand-500 shrink-0" aria-hidden="true" />
                <span>E-mail: {siteConfig.contact.email}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Rodapé inferior */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>
            © {currentYear} {siteConfig.brand.name} ({siteConfig.brand.tradeName}). Todos os direitos reservados.
          </p>
          <p className="text-center sm:text-right">
            Estimativa calórica e energética desenvolvida para a metodologia do Personal Rafa Machado.
          </p>
        </div>
      </div>
    </footer>
  );
}
