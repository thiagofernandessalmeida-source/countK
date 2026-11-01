'use client';

import React from 'react';
import { CalculationResult, GOAL_LABELS, Goal } from '@/lib/calc';
import { siteConfig } from '@/config/site';
import { 
  Flame, 
  Zap, 
  Target, 
  Droplets, 
  AlertTriangle, 
  Info, 
  MessageCircle,
  ExternalLink
} from 'lucide-react';
import AdSlot from './AdSlot';

interface CalculatorResultProps {
  result: CalculationResult | null;
  selectedGoal: Goal;
  userWeight: number;
}

export default function CalculatorResult({
  result,
  selectedGoal,
  userWeight,
}: CalculatorResultProps) {
  if (!result) return null;

  const currentGoalMeta = GOAL_LABELS[selectedGoal];

  // Prepara mensagem formatada para enviar ao personal no WhatsApp
  const shareMessage = `Olá Rafa! Acabei de fazer a estimativa calórica na sua calculadora:
- Peso: ${userWeight} kg
- Taxa Metabólica Basal (TMB): ${result.tmbDisplay} kcal
- Gasto Energético Total (GET): ${result.getDisplay} kcal
- Objetivo: ${currentGoalMeta.title} (${result.calorieTargetDisplay} kcal/dia)
- Hidratação diária: ${result.waterLiters} Litros

Gostaria de saber mais sobre a sua consultoria de treino para alcançar esse objetivo!`;

  const whatsappShareUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
    shareMessage
  )}`;

  return (
    <div
      id="resultado-calculadora"
      tabIndex={-1}
      aria-live="polite"
      className="mt-8 pt-8 border-t border-gray-100 focus:outline-none transition-all animate-in fade-in slide-in-from-bottom-4 duration-500"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full">
            Estimativa Energética Concluída
          </span>
          <h3 className="text-2xl font-extrabold text-gray-900 mt-2 tracking-tight">
            Seus Resultados Personalizados
          </h3>
        </div>
        <div className="text-xs text-gray-500 font-medium">
          Valores diários estimados
        </div>
      </div>

      {/* Grid de Métricas Principais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* TMB */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-brand-50 rounded-bl-full -mr-6 -mt-6 transition-transform group-hover:scale-110" />
          <div className="flex items-center gap-3 relative z-10 mb-3">
            <div className="p-2.5 bg-brand-100 text-brand-700 rounded-xl">
              <Flame className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Taxa Basal (TMB)
              </span>
              <p className="text-xs text-gray-400">Gasto em repouso absoluto</p>
            </div>
          </div>
          <div className="relative z-10 mt-2">
            <span className="text-3xl font-black text-gray-900 tracking-tight">
              {result.tmbDisplay.toLocaleString('pt-BR')}
            </span>
            <span className="text-sm font-semibold text-gray-500 ml-1.5">kcal/dia</span>
          </div>
        </div>

        {/* GET */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-bl-full -mr-6 -mt-6 transition-transform group-hover:scale-110" />
          <div className="flex items-center gap-3 relative z-10 mb-3">
            <div className="p-2.5 bg-amber-100 text-amber-700 rounded-xl">
              <Zap className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Gasto Total (GET)
              </span>
              <p className="text-xs text-gray-400">TMB + suas atividades diárias</p>
            </div>
          </div>
          <div className="relative z-10 mt-2">
            <span className="text-3xl font-black text-gray-900 tracking-tight">
              {result.getDisplay.toLocaleString('pt-BR')}
            </span>
            <span className="text-sm font-semibold text-gray-500 ml-1.5">kcal/dia</span>
          </div>
        </div>

        {/* Meta Calórica do Objetivo (Destaque Principal) */}
        <div className="bg-gradient-to-br from-brand-600 to-brand-700 text-white p-5 rounded-2xl shadow-lg shadow-brand-600/25 sm:col-span-2 lg:col-span-1 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl text-white">
                <Target className="w-5 h-5" aria-hidden="true" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-100">
                Meta do Objetivo
              </span>
            </div>
            <span className="text-xs font-extrabold bg-white text-brand-700 px-2.5 py-0.5 rounded-full shadow-sm">
              {currentGoalMeta.badge}
            </span>
          </div>
          <div className="mt-2">
            <span className="text-3xl font-black text-white tracking-tight">
              {result.calorieTargetDisplay.toLocaleString('pt-BR')}
            </span>
            <span className="text-sm font-medium text-brand-100 ml-1.5">kcal/dia</span>
          </div>
          <p className="text-xs text-brand-100/90 mt-2 line-clamp-1">
            {currentGoalMeta.title}
          </p>
        </div>

        {/* Hidratação Recomendada */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-6 -mt-6 transition-transform group-hover:scale-110" />
          <div className="flex items-center gap-3 relative z-10 mb-3">
            <div className="p-2.5 bg-blue-100 text-blue-700 rounded-xl">
              <Droplets className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Hidratação
              </span>
              <p className="text-xs text-gray-400">Base de 35 ml / kg / dia</p>
            </div>
          </div>
          <div className="relative z-10 mt-2">
            <span className="text-3xl font-black text-gray-900 tracking-tight">
              {result.waterLiters.toString().replace('.', ',')}
            </span>
            <span className="text-sm font-semibold text-gray-500 ml-1.5">Litros/dia</span>
          </div>
        </div>
      </div>

      {/* Tabela comparativa de metas calóricas */}
      <div className="mt-6 bg-gray-50/80 border border-gray-200/80 rounded-2xl p-4 sm:p-5">
        <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
          <Info className="w-4 h-4 text-brand-600" aria-hidden="true" />
          Comparativo de Metas Calóricas para seu Perfil:
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 text-center">
          <div className={`p-3 rounded-xl border transition-all ${selectedGoal === 'perder_rapido' ? 'bg-brand-50 border-brand-500 shadow-sm' : 'bg-white border-gray-200'}`}>
            <span className="block text-[11px] font-semibold text-gray-500 uppercase">Perder Rápido</span>
            <span className="text-lg font-black text-gray-900 mt-0.5 block">{result.goalsBreakdown.perder_rapido} kcal</span>
            <span className="text-[10px] text-gray-400 font-medium">-35% do GET</span>
          </div>

          <div className={`p-3 rounded-xl border transition-all ${selectedGoal === 'perder_moderado' ? 'bg-brand-50 border-brand-500 shadow-sm' : 'bg-white border-gray-200'}`}>
            <span className="block text-[11px] font-semibold text-gray-500 uppercase">Perder Moderado</span>
            <span className="text-lg font-black text-gray-900 mt-0.5 block">{result.goalsBreakdown.perder_moderado} kcal</span>
            <span className="text-[10px] text-brand-600 font-semibold">-20% (Recomendado)</span>
          </div>

          <div className={`p-3 rounded-xl border transition-all ${selectedGoal === 'manter' ? 'bg-brand-50 border-brand-500 shadow-sm' : 'bg-white border-gray-200'}`}>
            <span className="block text-[11px] font-semibold text-gray-500 uppercase">Manutenção</span>
            <span className="text-lg font-black text-gray-900 mt-0.5 block">{result.goalsBreakdown.manter} kcal</span>
            <span className="text-[10px] text-gray-400 font-medium">Equilíbrio (GET)</span>
          </div>

          <div className={`p-3 rounded-xl border transition-all ${selectedGoal === 'ganhar_moderado' ? 'bg-brand-50 border-brand-500 shadow-sm' : 'bg-white border-gray-200'}`}>
            <span className="block text-[11px] font-semibold text-gray-500 uppercase">Ganhar Moderado</span>
            <span className="text-lg font-black text-gray-900 mt-0.5 block">{result.goalsBreakdown.ganhar_moderado} kcal</span>
            <span className="text-[10px] text-brand-600 font-semibold">+500 kcal (Hipertrofia)</span>
          </div>

          <div className={`p-3 rounded-xl border transition-all col-span-2 sm:col-span-1 ${selectedGoal === 'ganhar_rapido' ? 'bg-brand-50 border-brand-500 shadow-sm' : 'bg-white border-gray-200'}`}>
            <span className="block text-[11px] font-semibold text-gray-500 uppercase">Ganhar Rápido</span>
            <span className="text-lg font-black text-gray-900 mt-0.5 block">{result.goalsBreakdown.ganhar_rapido} kcal</span>
            <span className="text-[10px] text-gray-400 font-medium">+1000 kcal (Volume)</span>
          </div>
        </div>
      </div>

      {/* Caixa de Alertas Especiais (Se houver algum ativo) */}
      {(result.alerts.below1500 ||
        result.alerts.belowTmb ||
        result.alerts.fastLoss ||
        result.alerts.under18) && (
        <div
          role="alert"
          className="mt-6 p-4 sm:p-5 bg-amber-50 border-l-4 border-amber-500 rounded-r-2xl text-amber-900 space-y-2 shadow-sm"
        >
          <div className="flex items-center gap-2 font-bold text-amber-950">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" aria-hidden="true" />
            <span>Observações e Alertas Importantes de Segurança</span>
          </div>
          <ul className="text-xs sm:text-sm space-y-1.5 list-disc list-inside text-amber-900/90 pl-1">
            {result.alerts.below1500 && (
              <li>
                <strong>Meta calórica muito baixa:</strong> Valores inferiores a 1500 kcal podem ser inadequados e pedem acompanhamento de um nutricionista.
              </li>
            )}
            {result.alerts.belowTmb && (
              <li>
                <strong>Abaixo da Taxa Metabólica Basal:</strong> Sua meta está abaixo do que seu corpo gasta para manter funções vitais. Não mantenha esse déficit prolongado sem acompanhamento profissional.
              </li>
            )}
            {result.alerts.fastLoss && (
              <li>
                <strong>Déficit agressivo (35%):</strong> Reduções severas devem ser utilizadas apenas por períodos curtos e com acompanhamento para evitar perda de massa muscular e lentidão metabólica.
              </li>
            )}
            {result.alerts.under18 && (
              <li>
                <strong>Menores de 18 anos:</strong> Para jovens em fase de desenvolvimento físico, este cálculo serve apenas como referência teórica. Procure um nutricionista ou pediatra.
              </li>
            )}
          </ul>
        </div>
      )}

      {/* Aviso Legal Visível Obrigatório */}
      <div className="mt-5 p-3.5 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-600 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" aria-hidden="true" />
        <p>
          <strong>Aviso Importante:</strong> O resultado é uma estimativa matemática baseada em equações científicas populacionais. Ele <strong>não substitui</strong> avaliação física individualizada, consulta médica ou planejamento dietético elaborado por um nutricionista habilitado (conforme a Lei Federal nº 8.234/1991).
        </p>
      </div>

      {/* Botões de Ação: WhatsApp e Link para Site Oficial */}
      <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
        <a
          href={whatsappShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white font-bold rounded-xl shadow-md shadow-brand-600/25 transition-all text-sm sm:text-base focus:ring-2 focus:ring-brand-500"
        >
          <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
          <span>Enviar Resultado para o Rafa no WhatsApp</span>
        </a>

        <a
          href={siteConfig.officialSiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-800 font-semibold rounded-xl transition-all text-sm focus:ring-2 focus:ring-gray-400"
        >
          <span>Conhecer o Site Oficial</span>
          <ExternalLink className="w-4 h-4 text-gray-600" aria-hidden="true" />
        </a>
      </div>

      {/* Slot de Anúncio AdSense logo abaixo do resultado */}
      <AdSlot slotId={siteConfig.ads.slots.belowResult} />
    </div>
  );
}
