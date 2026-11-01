'use client';

import React from 'react';
import Link from 'next/link';
import { useCookieConsent } from '@/context/CookieConsentContext';
import { ShieldCheck } from 'lucide-react';

export default function CookieBanner() {
  const { consent, acceptCookies, rejectCookies } = useCookieConsent();

  // Se já foi aceito ou recusado, esconde o banner
  if (consent !== 'pending') {
    return null;
  }

  return (
    <aside
      aria-label="Aviso de cookies e privacidade"
      role="region"
      className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-5 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-2xl transition-all animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-brand-50 text-brand-600 rounded-lg shrink-0 mt-0.5">
            <ShieldCheck className="w-5 h-5" aria-hidden="true" />
          </div>
          <div className="text-sm text-gray-700 leading-relaxed">
            <p>
              Utilizamos cookies essenciais e, com seu consentimento, cookies de publicidade do Google AdSense para manter este site gratuito. 
              <strong> Nenhum dado inserido na calculadora de calorias é coletado, transmitido ou armazenado. </strong>
              Consulte nossa{' '}
              <Link
                href="/politica-de-privacidade"
                className="text-brand-600 hover:text-brand-700 underline font-medium focus:ring-2 focus:ring-brand-500 rounded"
              >
                Política de Privacidade
              </Link>.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0 justify-end">
          <button
            type="button"
            onClick={rejectCookies}
            className="flex-1 sm:flex-initial px-4 py-2.5 text-xs sm:text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 rounded-lg transition-colors focus:ring-2 focus:ring-gray-400"
          >
            Recusar
          </button>
          <button
            type="button"
            onClick={acceptCookies}
            className="flex-1 sm:flex-initial px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 active:bg-brand-800 rounded-lg shadow-sm transition-colors focus:ring-2 focus:ring-brand-500"
          >
            Aceitar Cookies
          </button>
        </div>
      </div>
    </aside>
  );
}

