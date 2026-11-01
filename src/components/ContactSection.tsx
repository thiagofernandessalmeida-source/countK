import React from 'react';
import { siteConfig } from '@/config/site';
import { MessageCircle, Instagram, ExternalLink, Award, CheckCircle, Sparkles, Heart } from 'lucide-react';

export default function ContactSection() {
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
    siteConfig.contact.whatsappDefaultMessage
  )}`;

  return (
    <section id="contato" className="py-12 sm:py-16 bg-white border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-gray-950 via-gray-900 to-brand-950 rounded-3xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden border border-brand-900/40">
          {/* Fundo decorativo sutil com a nova cor da marca */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-brand-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-0 right-1/4 w-40 h-40 bg-pink-500/15 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
            <div className="flex-1 text-center md:text-left">
              {/* Badges do Rafa */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold text-brand-200">
                  <Award className="w-3.5 h-3.5 text-brand-400" aria-hidden="true" />
                  <span>{siteConfig.brand.tradeName}</span>
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-brand-500/20 text-brand-300 rounded-full text-xs font-bold">
                  <Heart className="w-3 h-3 text-brand-400" aria-hidden="true" />
                  <span>Definição Feminina 35+</span>
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Transforme sua estimativa calórica em definição real
              </h2>

              <p className="mt-3 text-sm sm:text-base text-gray-300 leading-relaxed max-w-xl">
                {siteConfig.brand.bio} Com o método certo, é possível secar a gordura abdominal mantendo o tônus firme, sem dietas malucas ou passar horas na academia.
              </p>

              {/* Diferenciais da consultoria do Rafa Machado */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-gray-200">
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <CheckCircle className="w-4 h-4 text-brand-400 shrink-0" aria-hidden="true" />
                  <span>Treino em casa ou na musculação</span>
                </div>
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <CheckCircle className="w-4 h-4 text-brand-400 shrink-0" aria-hidden="true" />
                  <span>Foco em queimar barriga e combater flacidez</span>
                </div>
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <CheckCircle className="w-4 h-4 text-brand-400 shrink-0" aria-hidden="true" />
                  <span>Ajustado para o metabolismo feminino 35+</span>
                </div>
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <CheckCircle className="w-4 h-4 text-brand-400 shrink-0" aria-hidden="true" />
                  <span>Comunidade com mais de 108k mulheres</span>
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="mt-8 flex flex-wrap items-center justify-center md:justify-start gap-3">
                {/* Botão WhatsApp */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Iniciar conversa no WhatsApp com ${siteConfig.brand.tradeName}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-brand-600 hover:bg-brand-500 active:bg-brand-700 text-white font-bold rounded-2xl shadow-lg shadow-brand-600/30 transition-all text-sm sm:text-base focus:ring-2 focus:ring-brand-400"
                >
                  <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
                  <span>Falar com o Rafa no WhatsApp</span>
                </a>

                {/* Botão Site Oficial */}
                <a
                  href={siteConfig.officialSiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-white/10 hover:bg-white/20 active:bg-white/30 text-white rounded-2xl text-xs sm:text-sm font-semibold transition-colors border border-white/10"
                >
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  <span>Site Oficial: personalrafamachado.com.br</span>
                </a>

                {/* Botão Instagram */}
                <a
                  href={siteConfig.contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-pink-600/20 hover:bg-pink-600/30 text-pink-200 hover:text-white rounded-2xl text-xs sm:text-sm font-semibold transition-colors border border-pink-500/20"
                >
                  <Instagram className="w-4 h-4" aria-hidden="true" />
                  <span>{siteConfig.contact.instagramHandle}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
