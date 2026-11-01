'use client';

import React, { useEffect } from 'react';
import Script from 'next/script';
import { siteConfig } from '@/config/site';
import { useCookieConsent } from '@/context/CookieConsentContext';

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

interface AdSlotProps {
  slotId: string;
  className?: string;
}

export default function AdSlot({ slotId, className = '' }: AdSlotProps) {
  const { consent } = useCookieConsent();

  // Verifica se o AdSense está ativo, com ID real (não placeholder) e se o usuário deu consentimento
  const isConfigured =
    siteConfig.ads.enabled &&
    siteConfig.ads.publisherId &&
    siteConfig.ads.publisherId.trim() !== '' &&
    !siteConfig.ads.publisherId.includes('XXXXXXXXXXXXXXXX') &&
    slotId &&
    slotId.trim() !== '';

  const shouldRenderAd = isConfigured && consent === 'accepted';

  useEffect(() => {
    if (shouldRenderAd && typeof window !== 'undefined') {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        // Ignora erros comuns de inicialização do AdSense
        console.debug('AdSense init error:', e);
      }
    }
  }, [shouldRenderAd, slotId]);

  // Se a configuração estiver desligada/vazia ou cookies não foram aceitos, não renderiza absolutamente NADA
  if (!shouldRenderAd) {
    return null;
  }

  return (
    <div className={`w-full my-6 flex flex-col items-center justify-center ${className}`}>
      {/* Carrega o script do AdSense após o consentimento e somente se houver IDs válidos */}
      <Script
        id={`adsbygoogle-script-${siteConfig.ads.publisherId}`}
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${siteConfig.ads.publisherId}`}
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />

      <span className="text-[10px] tracking-wider uppercase text-gray-400 font-semibold mb-1">
        Publicidade
      </span>

      {/* Altura mínima reservada para evitar Cumulative Layout Shift (CLS) */}
      <div className="w-full min-h-[100px] sm:min-h-[250px] bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%' }}
          data-ad-client={siteConfig.ads.publisherId}
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}

