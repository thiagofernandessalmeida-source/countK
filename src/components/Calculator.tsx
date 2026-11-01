'use client';

import React, { useState, useRef } from 'react';
import {
  Sex,
  ActivityLevel,
  Formula,
  Goal,
  ValidationErrors,
  CalculationResult,
  ACTIVITY_FACTORS,
  ACTIVITY_LABELS,
  GOAL_LABELS,
  parseNumericInput,
  validateInputs,
  calculateNutrition,
} from '@/lib/calc';
import CalculatorResult from './CalculatorResult';
import { Calculator as CalcIcon, RotateCcw, CheckCircle2 } from 'lucide-react';

export default function Calculator() {
  // Estados do formulário
  const [age, setAge] = useState<string>('30');
  const [sex, setSex] = useState<Sex>('masculino');
  const [weight, setWeight] = useState<string>('80');
  const [height, setHeight] = useState<string>('180');
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('moderado');
  const [formula, setFormula] = useState<Formula>('mifflin');
  const [bodyFat, setBodyFat] = useState<string>('15');
  const [goal, setGoal] = useState<Goal>('manter');

  // Estados de controle e validação
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const resultRef = useRef<HTMLDivElement>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();

    const parsedAge = parseNumericInput(age);
    const parsedWeight = parseNumericInput(weight);
    const parsedHeight = parseNumericInput(height);
    const parsedBodyFat = formula === 'cunningham' ? parseNumericInput(bodyFat) : undefined;

    const validation = validateInputs({
      age: parsedAge,
      weight: parsedWeight,
      height: parsedHeight,
      formula,
      bodyFat: parsedBodyFat,
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      setTouched({
        age: true,
        weight: true,
        height: true,
        bodyFat: true,
      });
      return;
    }

    setErrors({});

    const calculation = calculateNutrition({
      age: parsedAge,
      sex,
      weight: parsedWeight,
      height: parsedHeight,
      activityLevel,
      formula,
      bodyFat: parsedBodyFat,
      goal,
    });

    setResult(calculation);

    // Rola suavemente até o resultado e move foco de acessibilidade
    setTimeout(() => {
      const el = document.getElementById('resultado-calculadora');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        el.focus();
      }
    }, 100);
  };

  const handleReset = () => {
    setAge('');
    setSex('masculino');
    setWeight('');
    setHeight('');
    setActivityLevel('moderado');
    setFormula('mifflin');
    setBodyFat('15');
    setGoal('manter');
    setErrors({});
    setResult(null);
    setTouched({});
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-8 lg:p-10 transition-all">
      <form onSubmit={handleCalculate} noValidate>
        <div className="space-y-8">
          {/* Seção 1: Dados Corporais Básicos */}
          <div>
            <div className="flex items-center gap-2 pb-3 mb-4 border-b border-gray-100">
              <span className="w-7 h-7 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-xs font-bold">
                1
              </span>
              <h3 className="text-lg font-bold text-gray-900">
                Seus Dados Físicos
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {/* Sexo */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Sexo Biológico
                </label>
                <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100/90 rounded-xl" role="radiogroup" aria-label="Sexo Biológico">
                  <button
                    type="button"
                    role="radio"
                    aria-checked={sex === 'masculino'}
                    onClick={() => setSex('masculino')}
                    className={`py-2.5 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                      sex === 'masculino'
                        ? 'bg-white text-brand-700 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Masculino
                  </button>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={sex === 'feminino'}
                    onClick={() => setSex('feminino')}
                    className={`py-2.5 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                      sex === 'feminino'
                        ? 'bg-white text-brand-700 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Feminino
                  </button>
                </div>
              </div>

              {/* Idade */}
              <div>
                <label
                  htmlFor="input-age"
                  className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2"
                >
                  Idade (anos)
                </label>
                <input
                  id="input-age"
                  type="text"
                  inputMode="numeric"
                  value={age}
                  placeholder="Ex: 30"
                  aria-invalid={!!errors.age}
                  aria-describedby={errors.age ? 'error-age' : undefined}
                  onChange={(e) => {
                    setAge(e.target.value);
                    if (errors.age) setErrors((prev) => ({ ...prev, age: undefined }));
                  }}
                  className={`w-full px-4 py-3 rounded-xl border text-sm sm:text-base font-medium text-gray-900 transition-colors focus:ring-2 focus:ring-brand-500 focus:outline-none ${
                    errors.age ? 'border-red-400 bg-red-50/50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                />
                {errors.age && (
                  <p id="error-age" className="mt-1.5 text-xs text-red-600 font-medium">
                    {errors.age}
                  </p>
                )}
              </div>

              {/* Peso */}
              <div>
                <label
                  htmlFor="input-weight"
                  className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2"
                >
                  Peso Atual (kg)
                </label>
                <input
                  id="input-weight"
                  type="text"
                  inputMode="decimal"
                  value={weight}
                  placeholder="Ex: 80 ou 80,5"
                  aria-invalid={!!errors.weight}
                  aria-describedby={errors.weight ? 'error-weight' : undefined}
                  onChange={(e) => {
                    setWeight(e.target.value);
                    if (errors.weight) setErrors((prev) => ({ ...prev, weight: undefined }));
                  }}
                  className={`w-full px-4 py-3 rounded-xl border text-sm sm:text-base font-medium text-gray-900 transition-colors focus:ring-2 focus:ring-brand-500 focus:outline-none ${
                    errors.weight ? 'border-red-400 bg-red-50/50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                />
                {errors.weight && (
                  <p id="error-weight" className="mt-1.5 text-xs text-red-600 font-medium">
                    {errors.weight}
                  </p>
                )}
              </div>

              {/* Altura */}
              <div>
                <label
                  htmlFor="input-height"
                  className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2"
                >
                  Altura (cm)
                </label>
                <input
                  id="input-height"
                  type="text"
                  inputMode="numeric"
                  value={height}
                  placeholder="Ex: 175"
                  aria-invalid={!!errors.height}
                  aria-describedby={errors.height ? 'error-height' : undefined}
                  onChange={(e) => {
                    setHeight(e.target.value);
                    if (errors.height) setErrors((prev) => ({ ...prev, height: undefined }));
                  }}
                  className={`w-full px-4 py-3 rounded-xl border text-sm sm:text-base font-medium text-gray-900 transition-colors focus:ring-2 focus:ring-brand-500 focus:outline-none ${
                    errors.height ? 'border-red-400 bg-red-50/50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                />
                {errors.height && (
                  <p id="error-height" className="mt-1.5 text-xs text-red-600 font-medium">
                    {errors.height}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Seção 2: Fórmula e Nível de Atividade */}
          <div>
            <div className="flex items-center gap-2 pb-3 mb-4 border-b border-gray-100">
              <span className="w-7 h-7 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-xs font-bold">
                2
              </span>
              <h3 className="text-lg font-bold text-gray-900">
                Fórmula Metabólica & Rotina
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Seleção de Fórmula */}
              <div>
                <label
                  htmlFor="select-formula"
                  className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2"
                >
                  Fórmula Científica de Cálculo
                </label>
                <select
                  id="select-formula"
                  value={formula}
                  onChange={(e) => setFormula(e.target.value as Formula)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm sm:text-base font-medium text-gray-900 hover:border-gray-300 transition-colors focus:ring-2 focus:ring-brand-500 focus:outline-none cursor-pointer"
                >
                  <option value="mifflin">Mifflin-St Jeor (Padrão mais recomendado)</option>
                  <option value="cunningham">Cunningham (Ideal para atletas com % gordura)</option>
                  <option value="fao_oms">FAO / OMS (Equações de Schofield)</option>
                </select>
                <p className="mt-1.5 text-xs text-gray-500">
                  {formula === 'mifflin' && 'Fórmula moderna validada com alta precisão populacional.'}
                  {formula === 'cunningham' && 'Calcula a TMB com base direta na massa magra corporal.'}
                  {formula === 'fao_oms' && 'Utiliza faixas etárias e peso corporal recomendados pela OMS.'}
                </p>
              </div>

              {/* Campo Condicional: Gordura Corporal (Apenas Cunningham) */}
              {formula === 'cunningham' ? (
                <div className="animate-in fade-in zoom-in-95 duration-200">
                  <label
                    htmlFor="input-bodyfat"
                    className="block text-xs font-semibold text-brand-700 uppercase tracking-wider mb-2 flex items-center justify-between"
                  >
                    <span>Percentual de Gordura (%) *</span>
                    <span className="text-[11px] font-normal text-gray-500 lowercase">
                      Bioimpedância, adipômetro ou DEXA
                    </span>
                  </label>
                  <input
                    id="input-bodyfat"
                    type="text"
                    inputMode="decimal"
                    value={bodyFat}
                    placeholder="Ex: 15 ou 18,5"
                    aria-invalid={!!errors.bodyFat}
                    aria-describedby={errors.bodyFat ? 'error-bodyfat' : undefined}
                    onChange={(e) => {
                      setBodyFat(e.target.value);
                      if (errors.bodyFat) setErrors((prev) => ({ ...prev, bodyFat: undefined }));
                    }}
                    className={`w-full px-4 py-3 rounded-xl border text-sm sm:text-base font-medium text-gray-900 transition-colors focus:ring-2 focus:ring-brand-500 focus:outline-none ${
                      errors.bodyFat ? 'border-red-400 bg-red-50/50' : 'border-brand-300 bg-brand-50/20'
                    }`}
                  />
                  {errors.bodyFat && (
                    <p id="error-bodyfat" className="mt-1.5 text-xs text-red-600 font-medium">
                      {errors.bodyFat}
                    </p>
                  )}
                </div>
              ) : (
                <div className="hidden md:flex items-center p-4 bg-gray-50/60 rounded-xl border border-dashed border-gray-200 text-xs text-gray-500">
                  A fórmula Mifflin-St Jeor não exige medição de percentual de gordura. Se você tiver avaliação física recente, mude para Cunningham para considerar sua massa magra.
                </div>
              )}
            </div>

            {/* Nível de Atividade */}
            <div className="mt-5">
              <label
                htmlFor="select-activity"
                className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2"
              >
                Nível de Atividade Física Semanal
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {(Object.keys(ACTIVITY_FACTORS) as ActivityLevel[]).map((level) => {
                  const meta = ACTIVITY_LABELS[level];
                  const factor = ACTIVITY_FACTORS[level];
                  const isSelected = activityLevel === level;

                  return (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setActivityLevel(level)}
                      className={`p-3.5 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                        isSelected
                          ? 'border-brand-600 bg-brand-50/60 text-brand-950 shadow-sm ring-1 ring-brand-500'
                          : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs sm:text-sm">{meta.title}</span>
                        <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                          isSelected ? 'bg-brand-600 text-white' : 'bg-gray-100 text-gray-600'
                        }`}>
                          x{factor}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500 leading-tight">
                        {meta.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Seção 3: Objetivo */}
          <div>
            <div className="flex items-center gap-2 pb-3 mb-4 border-b border-gray-100">
              <span className="w-7 h-7 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-xs font-bold">
                3
              </span>
              <h3 className="text-lg font-bold text-gray-900">
                Seu Objetivo Principal
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {(Object.keys(GOAL_LABELS) as Goal[]).map((goalKey) => {
                const meta = GOAL_LABELS[goalKey];
                const isSelected = goal === goalKey;

                return (
                  <button
                    key={goalKey}
                    type="button"
                    onClick={() => setGoal(goalKey)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-brand-600 bg-brand-50/70 shadow-sm ring-1 ring-brand-500'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-sm text-gray-900">{meta.title}</span>
                      <span className={`text-[11px] font-extrabold px-2 py-0.5 rounded-full ${
                        isSelected ? 'bg-brand-600 text-white' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {meta.badge}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {meta.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={handleReset}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors focus:ring-2 focus:ring-gray-300"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              <span>Limpar dados</span>
            </button>

            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl text-base font-bold text-white bg-brand-600 hover:bg-brand-700 active:bg-brand-800 shadow-lg shadow-brand-600/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 focus:ring-2 focus:ring-brand-500"
            >
              <CalcIcon className="w-5 h-5 shrink-0" aria-hidden="true" />
              <span>Calcular Gasto Energético</span>
            </button>
          </div>
        </div>
      </form>

      {/* Resultados da Calculadora */}
      <CalculatorResult
        result={result}
        selectedGoal={goal}
        userWeight={parseNumericInput(weight) || 0}
      />
    </div>
  );
}

