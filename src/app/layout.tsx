import type { Metadata, Viewport } from 'next';
import './globals.css';
import { siteConfig } from '@/config/site';
import { CookieConsentProvider } from '@/context/CookieConsentContext';
import CookieBanner from '@/components/CookieBanner';

export const viewport: Viewport = {
  themeColor: siteConfig.colors.brand600,
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: {
    default: siteConfig.seo.defaultTitle,
    template: siteConfig.seo.titleTemplate,
  },
  description: siteConfig.seo.description,
  alternates: {
    canonical: siteConfig.domain,
  },
  openGraph: {
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.description,
    url: siteConfig.domain,
    siteName: siteConfig.brand.name,
    locale: 'pt_BR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        {/* Injeta variáveis de cores do siteConfig diretamente no CSS Root */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root {
                --color-brand-50: ${siteConfig.colors.brand50};
                --color-brand-100: ${siteConfig.colors.brand100};
                --color-brand-200: ${siteConfig.colors.brand200};
                --color-brand-500: ${siteConfig.colors.brand500};
                --color-brand-600: ${siteConfig.colors.brand600};
                --color-brand-700: ${siteConfig.colors.brand700};
                --color-brand-800: ${siteConfig.colors.brand800};
                --color-brand-900: ${siteConfig.colors.brand900};
                --color-accent-500: ${siteConfig.colors.accent500};
                --color-accent-600: ${siteConfig.colors.accent600};
              }
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans antialiased text-gray-900 bg-slate-50 selection:bg-brand-100 selection:text-brand-900">
        <CookieConsentProvider>
          {children}
          <CookieBanner />
        </CookieConsentProvider>
      </body>
    </html>
  );
}

