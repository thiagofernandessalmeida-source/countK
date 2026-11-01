/**
 * ==============================================================================
 * CONFIGURAÇÃO CENTRAL DO SITE - PERSONAL RAFAEL MACHADO
 * ==============================================================================
 * 
 * Configuração personalizada com a marca e identidade visual do Personal Rafa Machado.
 * Especialista em Definição Feminina 35+, treinos em casa e na academia.
 * ==============================================================================
 */

export interface SiteConfig {
  brand: {
    name: string;
    tradeName: string;
    subtitle: string;
    cref: string;
    bio: string;
  };
  domain: string;
  officialSiteUrl: string;
  contact: {
    whatsappNumber: string; // Apenas dígitos com DDI
    whatsappDefaultMessage: string;
    email: string;
    instagram: string;
    instagramHandle: string;
  };
  colors: {
    brand50: string;
    brand100: string;
    brand200: string;
    brand500: string;
    brand600: string;
    brand700: string;
    brand800: string;
    brand900: string;
    accent500: string;
    accent600: string;
  };
  ads: {
    enabled: boolean;
    publisherId: string;
    slots: {
      belowResult: string;
      midExplanation: string;
    };
  };
  seo: {
    defaultTitle: string;
    titleTemplate: string;
    description: string;
  };
}

export const siteConfig: SiteConfig = {
  brand: {
    name: "Rafael Machado",
    tradeName: "Personal Rafa Machado",
    subtitle: "Personal Trainer | Especialista em Definição Feminina 35+",
    cref: "CREF Especialista",
    bio: "Ajudo mulheres 35+ a secarem a barriga, conquistarem definição corporal e eliminarem a flacidez com segurança, treinando em casa ou na academia.",
  },
  domain: "https://personalrafamachado.com.br",
  officialSiteUrl: "https://personalrafamachado.com.br",
  contact: {
    // WhatsApp comercial real do Personal Rafa Machado (DDD 21 - Rio de Janeiro)
    whatsappNumber: "5521991278444",
    whatsappDefaultMessage: "Olá Rafa! Calculei meu gasto calórico na sua calculadora e gostaria de saber mais sobre a consultoria de treino para o meu objetivo.",
    email: "contato@personalrafamachado.com.br",
    instagram: "https://www.instagram.com/personalrafamachado/",
    instagramHandle: "@personalrafamachado",
  },
  colors: {
    // Identidade visual inspirada na marca do Rafa Machado (Rose vibrante / Magenta de alta energia + Grafite esportivo)
    brand50: "#fff1f2",   // Rose ultra suave (fundos e tags)
    brand100: "#ffe4e6",  // Rose claro
    brand200: "#fecdd3",  // Rose bordas
    brand500: "#f43f5e",  // Rose/Coral atlético
    brand600: "#e11d48",  // Rose principal vibrante (botões e ações principais)
    brand700: "#be123c",  // Rose escuro (hover)
    brand800: "#9f1239",  // Rose profundo
    brand900: "#881337",  // Vinho/Rose fechado para contraste nobre
    accent500: "#f59e0b", // Âmbar de contraste
    accent600: "#d97706", // Âmbar hover
  },
  ads: {
    enabled: false,
    publisherId: "ca-pub-XXXXXXXXXXXXXXXX",
    slots: {
      belowResult: "1234567890",
      midExplanation: "0987654321",
    },
  },
  seo: {
    defaultTitle: "Calculadora de Calorias & Gasto Energético | Personal Rafa Machado",
    titleTemplate: "%s | Rafa Machado Personal",
    description: "Estime sua Taxa Metabólica Basal (TMB), Gasto Energético Total (GET) e meta calórica para secar a barriga e definir o corpo com a metodologia do Personal Rafa Machado.",
  },
};
