import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AlertCircle, ArrowLeft, ShieldCheck, Mail, Lock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Política de Privacidade e Termos de Uso',
  description:
    'Conheça nossa política de privacidade. Seus dados corporais inseridos na calculadora de calorias nunca são enviados ou armazenados.',
  alternates: {
    canonical: `${siteConfig.domain}/politica-de-privacidade/`,
  },
};

export default function PoliticaPrivacidadePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <Header />

      <main className="flex-1 py-10 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Botão de retorno */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800 mb-6 group focus:ring-2 focus:ring-brand-500 rounded p-1"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Voltar para a Calculadora</span>
          </Link>

          {/* Aviso Obrigatório de Modelo */}
          <div
            role="alert"
            className="mb-8 p-4 sm:p-5 bg-amber-50 border-l-4 border-amber-500 rounded-r-2xl text-amber-900 shadow-sm"
          >
            <div className="flex items-center gap-2.5 font-bold text-amber-950 mb-1">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" aria-hidden="true" />
              <span>Aviso Importante: Modelo. Revise antes de publicar.</span>
            </div>
            <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed">
              Este documento é uma base textual de conformidade com a LGPD (Lei Geral de Proteção de Dados - Lei nº 13.709/2018). O proprietário do site deve revisar os termos com uma assessoria jurídica especializada antes de publicar sua versão final definitiva.
            </p>
          </div>

          <article className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200/80 shadow-sm space-y-8">
            <header className="border-b border-gray-100 pb-6">
              <div className="flex items-center gap-2 text-brand-600 font-bold text-xs uppercase tracking-wider mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Transparência e Proteção de Dados</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                Política de Privacidade & Termos de Uso
              </h1>
              <p className="mt-2 text-xs text-gray-500">
                Última atualização: Novembro de 2026 • Versão 1.0
              </p>
            </header>

            {/* Seção 1 */}
            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                <Lock className="w-5 h-5 text-brand-600 shrink-0" />
                1. Princípio da Privacidade por Padrão: Cálculo 100% no Navegador
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Este site foi desenvolvido seguindo a arquitetura <strong>Privacy by Design</strong>. Todos os dados físicos que você digita na calculadora de calorias — incluindo <strong>idade, sexo biológico, peso, altura, nível de atividade física e percentual de gordura corporal</strong> — são processados <strong>exclusivamente na memória temporária do seu próprio navegador de internet</strong> (lado do cliente / JavaScript local).
              </p>
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs sm:text-sm text-emerald-950 font-medium">
                Nós <strong>NÃO</strong> enviamos, <strong>NÃO</strong> transmitimos para servidores, <strong>NÃO</strong> gravamos em banco de dados e <strong>NÃO</strong> compartilhamos com ninguém nenhuma informação biométrica ou de saúde digitada por você. Ao recarregar ou fechar a página, os dados são descartados.
              </div>
            </section>

            {/* Seção 2 */}
            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                2. Cookies e Publicidade (Google AdSense)
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Para manter a ferramenta gratuita para o público, o site pode exibir anúncios disponibilizados pela rede do <strong>Google AdSense</strong>.
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1.5 pl-2">
                <li>
                  <strong>Consentimento prévio:</strong> O script de publicidade do Google AdSense <strong>só é carregado após você clicar em "Aceitar Cookies"</strong> no banner de consentimento exibido em sua primeira visita.
                </li>
                <li>
                  <strong>Opção de recusa:</strong> Caso você clique em "Recusar", nenhum script de publicidade é executado, nenhum cookie de anúncio é criado em seu navegador e você pode utilizar a calculadora com total normalidade.
                </li>
                <li>
                  O Google e seus parceiros podem utilizar cookies para veicular anúncios com base em visitas anteriores a este ou a outros websites. Você pode desativar anúncios personalizados visitando as{' '}
                  <a
                    href="https://adssettings.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-600 underline font-medium"
                  >
                    Configurações de Anúncios do Google
                  </a>.
                </li>
              </ul>
            </section>

            {/* Seção 3 */}
            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                3. Armazenamento Local no Dispositivo (localStorage)
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Utilizamos o recurso de <code>localStorage</code> do seu navegador unicamente para registrar se você optou por aceitar ou recusar os cookies de anúncio. Nenhuma informação pessoal ou corporal é armazenada nesse mecanismo. Caso o seu navegador esteja configurado para bloquear o <code>localStorage</code> ou navegando em modo anônimo, o site continuará funcionando perfeitamente sem falhas.
              </p>
            </section>

            {/* Seção 4 */}
            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                4. Natureza Informativa e Limites Legais (Lei nº 8.234/1991)
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Os resultados fornecidos por esta calculadora constituem <strong>estimativas matemáticas e pedagógicas de gasto energético</strong> com base em equações descritas na literatura científica de fisiologia e nutrição esportiva.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Esta plataforma <strong>não prescreve dietas, planos alimentares, cardápios ou dosagens de macronutrientes</strong>, competências que, no Brasil, são <strong>privativas de profissionais nutricionistas legalmente habilitados e inscritos no Conselho Regional de Nutricionistas (CRN)</strong>, conforme estipulado pelo art. 3º da Lei Federal nº 8.234, de 17 de setembro de 1991. Antes de iniciar qualquer alteração drástica em seus hábitos alimentares ou rotina de treinos de alta intensidade, consulte um profissional médico e um nutricionista.
              </p>
            </section>

            {/* Seção 5 */}
            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                5. Seus Direitos (LGPD) e Contato do Responsável
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Nos termos da Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você possui o direito de confirmar a existência de tratamento de dados pessoais. Como este site <strong>não coleta dados biométricos em servidores</strong>, não mantemos perfis, cadastros ou históricos de usuários.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Para tirar dúvidas sobre esta política, solicitar esclarecimentos ou entrar em contato com a equipe responsável, envie um e-mail para:
              </p>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-600 shrink-0" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-brand-700 hover:text-brand-800 font-bold text-sm underline"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
            </section>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}

