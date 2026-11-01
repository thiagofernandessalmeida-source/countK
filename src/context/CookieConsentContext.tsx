'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type ConsentStatus = 'accepted' | 'rejected' | 'pending';

interface CookieConsentContextType {
  consent: ConsentStatus;
  acceptCookies: () => void;
  rejectCookies: () => void;
}

const CookieConsentContext = createContext<CookieConsentContextType>({
  consent: 'pending',
  acceptCookies: () => {},
  rejectCookies: () => {},
});

const STORAGE_KEY = 'user_ad_cookie_consent';

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<ConsentStatus>('pending');

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'accepted' || stored === 'rejected') {
        setConsent(stored);
      }
    } catch {
      // Se o localStorage estiver bloqueado, mantém como pending/rejeitado sem quebrar
      setConsent('rejected');
    }
  }, []);

  const acceptCookies = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'accepted');
    } catch {
      // Falha silenciosa se armazenamento estiver inacessível
    }
    setConsent('accepted');
  };

  const rejectCookies = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'rejected');
    } catch {
      // Falha silenciosa
    }
    setConsent('rejected');
  };

  return (
    <CookieConsentContext.Provider value={{ consent, acceptCookies, rejectCookies }}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  return useContext(CookieConsentContext);
}

