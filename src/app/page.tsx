import React from 'react';
import Header from '@/components/Header';
import Calculator from '@/components/Calculator';
import HowWeCalculate from '@/components/HowWeCalculate';
import TipsSection from '@/components/TipsSection';
import FaqSection from '@/components/FaqSection';
import ContactSection from '@/components/ContactSection';
import DisclaimerBanner from '@/components/DisclaimerBanner';
import Footer from '@/components/Footer';
import StructuredData from '@/components/StructuredData';
import { ShieldCheck, Sparkles, Zap, Heart, ExternalLink } from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-gray-900 selection:bg-brand-100 selection:text-brand-900">
      <StructuredData />
      <Header />

      <main className="flex-1">
        {/* Hero Section com a identidade do Personal Rafa Machado */}
        <section className="pt-8 pb-6 sm:pt-12 sm:pb-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200/80 text-brand-700 text-xs font-semibold mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" aria-hidden="true" />
            <span>Metodologia Rafa Machado • Definição Feminina 35+</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-950 tracking-tight leading-tight sm:leading-none">
            Calculadora de Calorias & Gasto Energético Diário
          </h1>

          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Descubra com precisão científica sua Taxa Metabólica Basal (TMB), Gasto Energético Total (GET) e a meta diária de calorias para secar a barriga, combater a flacidez e acelerar sua definição corporal em casa ou na academia.
          </p>

          {/* Selos de segurança e metodologia */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-gray-500 font-medium">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-brand-600" aria-hidden="true" />
              <span>100% no seu navegador: dados protegidos</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-brand-600" aria-hidden="true" />
              <span>Fórmulas científicas validadas</span>
            </div>
            <a
              href={siteConfig.officialSiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-brand-600 hover:text-brand-700 font-semibold underline underline-offset-2"
            >
              <span>Conhecer o site oficial</span>
              <ExternalLink className="w-3 h-3" aria-hidden="true" />
            </a>
          </div>
        </section>

        {/* Bloco Central: Calculadora Interativa */}
        <section aria-label="Calculadora de Calorias" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
          <Calculator />
        </section>

        {/* Faixa de Aviso Legal Visível Obrigatória */}
        <DisclaimerBanner />

        {/* Como Calculamos (Fórmulas Científicas + AdSlot) */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <HowWeCalculate />
        </div>

        {/* Dicas Práticas de Hidratação, Treino e Medição */}
        <TipsSection />

        {/* Perguntas Frequentes (FAQ Acordeão Acessível) */}
        <FaqSection />

        {/* Bloco de Contato do Personal com WhatsApp e Site Oficial */}
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
