import { describe, it, expect } from 'vitest';
import {
  calculateNutrition,
  calculateMifflin,
  calculateCunningham,
  calculateFaoOms,
  validateInputs,
  calculateHydrationLiters,
  parseNumericInput,
} from './calc';

describe('Calculadora Metabólica e Energética', () => {
  // Caso de Teste 1:
  // Mifflin, homem, 30 anos, 80 kg, 180 cm, atividade 1,55:
  // TMB 1780, GET 2759; metas: perder rápido 1793, perder moderado 2207, manter 2759, ganhar moderado 3259, ganhar rápido 3759; água 2,8 L
  it('Caso 1: Mifflin, homem, 30 anos, 80 kg, 180 cm, atividade moderada (1.55)', () => {
    const res = calculateNutrition({
      age: 30,
      sex: 'masculino',
      weight: 80,
      height: 180,
      activityLevel: 'moderado',
      formula: 'mifflin',
      goal: 'manter',
    });

    expect(res.tmbDisplay).toBe(1780);
    expect(res.getDisplay).toBe(2759);
    expect(res.goalsBreakdown.perder_rapido).toBe(1793);
    expect(res.goalsBreakdown.perder_moderado).toBe(2207);
    expect(res.goalsBreakdown.manter).toBe(2759);
    expect(res.goalsBreakdown.ganhar_moderado).toBe(3259);
    expect(res.goalsBreakdown.ganhar_rapido).toBe(3759);
    expect(res.waterLiters).toBe(2.8);
  });

  // Caso de Teste 2:
  // Mifflin, mulher, 28 anos, 60 kg, 165 cm, atividade 1,375, objetivo perder moderado:
  // TMB 1330, GET 1829, meta 1463 (deve disparar o alerta de menos de 1500 kcal); água 2,1 L
  it('Caso 2: Mifflin, mulher, 28 anos, 60 kg, 165 cm, atividade leve (1.375), perder moderado', () => {
    const res = calculateNutrition({
      age: 28,
      sex: 'feminino',
      weight: 60,
      height: 165,
      activityLevel: 'leve',
      formula: 'mifflin',
      goal: 'perder_moderado',
    });

    expect(res.tmbDisplay).toBe(1330);
    expect(res.getDisplay).toBe(1829);
    expect(res.calorieTargetDisplay).toBe(1463);
    expect(res.alerts.below1500).toBe(true);
    expect(res.waterLiters).toBe(2.1);
  });

  // Caso de Teste 3:
  // Cunningham, 80 kg, 15% de gordura, atividade 1,2: TMB 1996, GET 2395
  it('Caso 3: Cunningham, 80 kg, 15% de gordura corporal, atividade sedentária (1.2)', () => {
    const res = calculateNutrition({
      age: 30,
      sex: 'masculino',
      weight: 80,
      height: 180,
      activityLevel: 'sedentario',
      formula: 'cunningham',
      bodyFat: 15,
      goal: 'manter',
    });

    expect(res.tmbDisplay).toBe(1996);
    expect(res.getDisplay).toBe(2395);
  });

  // Caso de Teste 4:
  // FAO/OMS, homem, 30 anos, 80 kg: TMB 1791 (faixa de 30 a 59 anos)
  it('Caso 4: FAO/OMS, homem, 30 anos, 80 kg', () => {
    const tmb = calculateFaoOms(80, 30, 'masculino');
    expect(Math.round(tmb)).toBe(1791);
  });

  // Caso de Teste 5:
  // FAO/OMS, mulher, 25 anos, 60 kg: TMB 1376 (faixa de 18 a 29 anos)
  it('Caso 5: FAO/OMS, mulher, 25 anos, 60 kg', () => {
    const tmb = calculateFaoOms(60, 25, 'feminino');
    expect(Math.round(tmb)).toBe(1376);
  });

  // Caso de Teste 6:
  // Validação: idade 9, peso 29, altura 99 e gordura 4 (com Cunningham) devem retornar erro;
  // os limites exatos (10, 30, 100, 5) devem ser aceitos
  it('Caso 6: Validação de limites inferiores e valores inválidos', () => {
    // Valores inválidos (abaixo do limite mínimo)
    const invalidCheck = validateInputs({
      age: 9,
      weight: 29,
      height: 99,
      bodyFat: 4,
      formula: 'cunningham',
    });

    expect(invalidCheck.isValid).toBe(false);
    expect(invalidCheck.errors.age).toBe('A idade deve estar entre 10 e 100 anos.');
    expect(invalidCheck.errors.weight).toBe('O peso deve estar entre 30 e 300 kg.');
    expect(invalidCheck.errors.height).toBe('A altura deve estar entre 100 e 250 cm.');
    expect(invalidCheck.errors.bodyFat).toBe('O percentual de gordura deve estar entre 5% e 50%.');

    // Limites exatos válidos
    const validExactMin = validateInputs({
      age: 10,
      weight: 30,
      height: 100,
      bodyFat: 5,
      formula: 'cunningham',
    });

    expect(validExactMin.isValid).toBe(true);
    expect(Object.keys(validExactMin.errors).length).toBe(0);

    // Limites exatos máximos válidos
    const validExactMax = validateInputs({
      age: 100,
      weight: 300,
      height: 250,
      bodyFat: 50,
      formula: 'cunningham',
    });

    expect(validExactMax.isValid).toBe(true);
    expect(Object.keys(validExactMax.errors).length).toBe(0);
  });

  it('Suporta separador decimal com vírgula ou ponto', () => {
    expect(parseNumericInput('75,5')).toBe(75.5);
    expect(parseNumericInput('75.5')).toBe(75.5);
    expect(parseNumericInput('80')).toBe(80);
    expect(parseNumericInput('')).toBeNaN();
  });

  it('Verifica disparos de alertas especiais (menor de 18, meta abaixo da TMB, perder rápido)', () => {
    const res = calculateNutrition({
      age: 16,
      sex: 'masculino',
      weight: 65,
      height: 175,
      activityLevel: 'sedentario',
      formula: 'mifflin',
      goal: 'perder_rapido',
    });

    // Menor de 18
    expect(res.alerts.under18).toBe(true);
    // Perder rápido
    expect(res.alerts.fastLoss).toBe(true);
    // Déficit de 35% em sedentário (GET = 1.2 * TMB => meta = 0.65 * 1.2 * TMB = 0.78 * TMB < TMB)
    expect(res.alerts.belowTmb).toBe(true);
  });
});

