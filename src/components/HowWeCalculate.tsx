import React from 'react';
import { BookOpen, Calculator, CheckCircle2, Scale } from 'lucide-react';
import AdSlot from './AdSlot';
import { siteConfig } from '@/config/site';

export default function HowWeCalculate() {
  return (
    <section id="como-calculamos" className="py-12 sm:py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-50 text-brand-700 text-xs font-bold rounded-full mb-3">
            <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Fundamentação Científica</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Como Calculamos o Seu Gasto Energético
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Nossa calculadora utiliza fórmulas validadas na literatura científica de nutrição esportiva e fisiologia do exercício para estimar com rigor sua Taxa Metabólica Basal (TMB) e Gasto Energético Total (GET).
          </p>
        </div>

        <div className="space-y-6">
          {/* Card 1: Mifflin-St Jeor */}
          <article className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-7 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-brand-100 text-brand-700 rounded-xl">
                  <Calculator className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Fórmula de Mifflin-St Jeor (1990)
                  </h3>
                  <span className="text-xs text-brand-700 font-semibold bg-brand-50 px-2 py-0.5 rounded">
                    Recomendada para a população geral
                  </span>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              Estudos comparativos apontam a fórmula de Mifflin-St Jeor como uma das mais confiáveis para homens e mulheres adultos saudáveis. Ela prevê a TMB considerando peso, altura, idade e sexo biológico com margem de erro reduzida.
            </p>

            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 font-mono text-xs sm:text-sm text-gray-800 space-y-2">
              <p className="font-semibold text-gray-900">Equações de Mifflin-St Jeor:</p>
              <div className="p-2.5 bg-white rounded-lg border border-gray-200">
                <span className="text-brand-700 font-bold">Homens:</span> TMB = 10 × peso (kg) + 6,25 × altura (cm) - 5 × idade (anos) + 5
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-gray-200">
                <span className="text-brand-700 font-bold">Mulheres:</span> TMB = 10 × peso (kg) + 6,25 × altura (cm) - 5 × idade (anos) - 161
              </div>
            </div>
          </article>

          {/* Card 2: Cunningham */}
          <article className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-7 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-amber-100 text-amber-700 rounded-xl">
                  <Scale className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Fórmula de Cunningham (1980)
                  </h3>
                  <span className="text-xs text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded">
                    Recomendada para praticantes de musculação e atletas
                  </span>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              Diferente das fórmulas convencionais, a equação de Cunningham baseia o cálculo exclusivamente na <strong>massa livre de gordura (massa magra)</strong>. Como o músculo esquelético é metabolicamente muito mais ativo do que o tecido adiposo, essa fórmula é a mais precisa para quem treina com pesos e já realizou uma avaliação física com bioimpedância ou adipômetro.
            </p>

            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 font-mono text-xs sm:text-sm text-gray-800 space-y-2">
              <p className="font-semibold text-gray-900">Equação de Cunningham:</p>
              <div className="p-2.5 bg-white rounded-lg border border-gray-200">
                <span className="text-amber-700 font-bold">Massa Magra (kg)</span> = Peso × (1 - Gordura% / 100)
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-gray-200">
                <span className="text-amber-700 font-bold">TMB</span> = 500 + 22 × Massa Magra (kg)
              </div>
            </div>
          </article>

          {/* Slot de Anúncio AdSense no meio da explicação */}
          <AdSlot slotId={siteConfig.ads.slots.midExplanation} />

          {/* Card 3: FAO/OMS */}
          <article className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-7 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-100 text-blue-700 rounded-xl">
                  <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Fórmula da FAO / OMS (Equações de Schofield)
                  </h3>
                  <span className="text-xs text-blue-700 font-semibold bg-blue-50 px-2 py-0.5 rounded">
                    Referência internacional dividida por faixas etárias
                  </span>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              Proposta pela Organização das Nações Unidas para a Alimentação e a Agricultura (FAO) em conjunto com a Organização Mundial da Saúde (OMS), esta equação divide o metabolismo por faixas etárias específicas, sendo amplamente adotada em estudos populacionais e diretrizes internacionais de saúde pública.
            </p>

            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 font-mono text-xs text-gray-800 space-y-3">
              <div>
                <p className="font-bold text-blue-800 mb-1.5">Homens (Equações por faixa etária):</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="p-2 bg-white rounded border border-gray-200">10 a 17 anos: 17,686 × peso + 658,2</div>
                  <div className="p-2 bg-white rounded border border-gray-200">18 a 29 anos: 15,057 × peso + 692,2</div>
                  <div className="p-2 bg-white rounded border border-gray-200">30 a 59 anos: 11,472 × peso + 873,1</div>
                  <div className="p-2 bg-white rounded border border-gray-200">60+ anos: 11,711 × peso + 587,7</div>
                </div>
              </div>

              <div>
                <p className="font-bold text-blue-800 mb-1.5">Mulheres (Equações por faixa etária):</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="p-2 bg-white rounded border border-gray-200">10 a 17 anos: 13,384 × peso + 692,6</div>
                  <div className="p-2 bg-white rounded border border-gray-200">18 a 29 anos: 14,818 × peso + 486,6</div>
                  <div className="p-2 bg-white rounded border border-gray-200">30 a 59 anos: 8,126 × peso + 845,6</div>
                  <div className="p-2 bg-white rounded border border-gray-200">60+ anos: 9,082 × peso + 658,5</div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

