/**
 * Módulo de cálculos metabólicos e energéticos (100% puro, sem dependência de React/DOM).
 * Implementa Mifflin-St Jeor, Cunningham e FAO/OMS (Schofield).
 */

export type Sex = 'masculino' | 'feminino';

export type ActivityLevel =
  | 'sedentario'
  | 'leve'
  | 'moderado'
  | 'muito_ativo'
  | 'extremamente_ativo';

export type Formula = 'mifflin' | 'cunningham' | 'fao_oms';

export type Goal =
  | 'perder_rapido'
  | 'perder_moderado'
  | 'manter'
  | 'ganhar_moderado'
  | 'ganhar_rapido';

export interface CalculatorInputs {
  age: number;
  sex: Sex;
  weight: number; // em kg
  height: number; // em cm
  activityLevel: ActivityLevel;
  formula: Formula;
  bodyFat?: number; // em %, obrigatório para Cunningham
  goal: Goal;
}

export interface ValidationErrors {
  age?: string;
  weight?: string;
  height?: string;
  bodyFat?: string;
  general?: string;
}

export interface CalculatorAlerts {
  below1500: boolean;
  belowTmb: boolean;
  fastLoss: boolean;
  under18: boolean;
}

export interface CalculationResult {
  tmb: number; // Taxa metabólica basal exata
  tmbDisplay: number; // Arredondada
  get: number; // Gasto energético total exato
  getDisplay: number; // Arredondado
  calorieTarget: number; // Meta calórica exata
  calorieTargetDisplay: number; // Arredondada
  waterLiters: number; // Litros de água por dia com 1 casa decimal
  alerts: CalculatorAlerts;
  goalsBreakdown: {
    perder_rapido: number;
    perder_moderado: number;
    manter: number;
    ganhar_moderado: number;
    ganhar_rapido: number;
  };
}

export const ACTIVITY_FACTORS: Record<ActivityLevel, number> = {
  sedentario: 1.2,
  leve: 1.375,
  moderado: 1.55,
  muito_ativo: 1.725,
  extremamente_ativo: 1.9,
};

export const ACTIVITY_LABELS: Record<ActivityLevel, { title: string; description: string }> = {
  sedentario: {
    title: 'Sedentário',
    description: 'Pouco ou nenhum exercício estruturado na semana',
  },
  leve: {
    title: 'Levemente ativo',
    description: 'Exercício leve ou treina de 1 a 3 dias por semana',
  },
  moderado: {
    title: 'Moderadamente ativo',
    description: 'Treinos moderados de 3 a 5 dias por semana',
  },
  muito_ativo: {
    title: 'Muito ativo',
    description: 'Treinos intensos de 6 a 7 dias por semana',
  },
  extremamente_ativo: {
    title: 'Extremamente ativo',
    description: 'Trabalho físico pesado ou rotina com 2 treinos por dia',
  },
};

export const GOAL_LABELS: Record<Goal, { title: string; badge: string; description: string }> = {
  perder_rapido: {
    title: 'Perder peso rápido',
    badge: '-35%',
    description: 'Déficit calórico agressivo (35% abaixo do GET)',
  },
  perder_moderado: {
    title: 'Perder peso moderado',
    badge: '-20%',
    description: 'Déficit sustentável (20% abaixo do GET) para preservar massa magra',
  },
  manter: {
    title: 'Manter o peso',
    badge: 'GET',
    description: 'Consumo igual ao seu gasto energético total diário',
  },
  ganhar_moderado: {
    title: 'Ganhar peso moderado',
    badge: '+500 kcal',
    description: 'Superávit controlado para hipertrofia com ganho mínimo de gordura',
  },
  ganhar_rapido: {
    title: 'Ganhar peso rápido',
    badge: '+1000 kcal',
    description: 'Superávit alto focado em ganho de volume e força',
  },
};

/**
 * Converte strings com vírgula ou ponto para número flutuante.
 */
export function parseNumericInput(val: string | number | undefined | null): number {
  if (typeof val === 'number') return val;
  if (!val) return NaN;
  const sanitized = val.toString().trim().replace(',', '.');
  return parseFloat(sanitized);
}

/**
 * Validação dos campos da calculadora.
 * Faixas:
 * - Idade: 10 a 100
 * - Peso: 30 a 300
 * - Altura: 100 a 250
 * - Gordura corporal: 5 a 50 (apenas para Cunningham)
 */
export function validateInputs(inputs: Partial<CalculatorInputs>): {
  isValid: boolean;
  errors: ValidationErrors;
} {
  const errors: ValidationErrors = {};

  // Idade
  if (inputs.age === undefined || isNaN(inputs.age)) {
    errors.age = 'Informe a sua idade.';
  } else if (inputs.age < 10 || inputs.age > 100) {
    errors.age = 'A idade deve estar entre 10 e 100 anos.';
  }

  // Peso
  if (inputs.weight === undefined || isNaN(inputs.weight)) {
    errors.weight = 'Informe o seu peso em kg.';
  } else if (inputs.weight < 30 || inputs.weight > 300) {
    errors.weight = 'O peso deve estar entre 30 e 300 kg.';
  }

  // Altura
  if (inputs.height === undefined || isNaN(inputs.height)) {
    errors.height = 'Informe a sua altura em cm.';
  } else if (inputs.height < 100 || inputs.height > 250) {
    errors.height = 'A altura deve estar entre 100 e 250 cm.';
  }

  // Gordura corporal (apenas para Cunningham)
  if (inputs.formula === 'cunningham') {
    if (inputs.bodyFat === undefined || isNaN(inputs.bodyFat)) {
      errors.bodyFat = 'Informe o percentual de gordura para a fórmula Cunningham.';
    } else if (inputs.bodyFat < 5 || inputs.bodyFat > 50) {
      errors.bodyFat = 'O percentual de gordura deve estar entre 5% e 50%.';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Calcula a Taxa Metabólica Basal (TMB) usando Mifflin-St Jeor:
 * Homem: 10 x peso + 6.25 x altura - 5 x idade + 5
 * Mulher: 10 x peso + 6.25 x altura - 5 x idade - 161
 */
export function calculateMifflin(weight: number, height: number, age: number, sex: Sex): number {
  const base = 10 * weight + 6.25 * height - 5 * age;
  return sex === 'masculino' ? base + 5 : base - 161;
}

/**
 * Calcula a TMB usando Cunningham:
 * Massa Magra = peso * (1 - gordura / 100)
 * TMB = 500 + 22 * Massa Magra
 */
export function calculateCunningham(weight: number, bodyFat: number): number {
  const leanMass = weight * (1 - bodyFat / 100);
  return 500 + 22 * leanMass;
}

/**
 * Calcula a TMB usando FAO/OMS (Equações de Schofield baseadas em peso e faixa etária):
 * Homem:
 * 10 a 17: 17.686 x peso + 658.2
 * 18 a 29: 15.057 x peso + 692.2
 * 30 a 59: 11.472 x peso + 873.1
 * 60+:     11.711 x peso + 587.7
 * Mulher:
 * 10 a 17: 13.384 x peso + 692.6
 * 18 a 29: 14.818 x peso + 486.6
 * 30 a 59:  8.126 x peso + 845.6
 * 60+:      9.082 x peso + 658.5
 */
export function calculateFaoOms(weight: number, age: number, sex: Sex): number {
  if (sex === 'masculino') {
    if (age <= 17) return 17.686 * weight + 658.2;
    if (age <= 29) return 15.057 * weight + 692.2;
    if (age <= 59) return 11.472 * weight + 873.1;
    return 11.711 * weight + 587.7;
  } else {
    if (age <= 17) return 13.384 * weight + 692.6;
    if (age <= 29) return 14.818 * weight + 486.6;
    if (age <= 59) return 8.126 * weight + 845.6;
    return 9.082 * weight + 658.5;
  }
}

/**
 * Calcula a hidratação diária recomendada em litros (peso * 35 ml).
 */
export function calculateHydrationLiters(weight: number): number {
  return Number(((weight * 35) / 1000).toFixed(1));
}

/**
 * Executa o cálculo completo preservando a precisão total e arredondando para exibição.
 */
export function calculateNutrition(inputs: CalculatorInputs): CalculationResult {
  const { age, sex, weight, height, activityLevel, formula, bodyFat, goal } = inputs;

  // 1. TMB
  let tmb = 0;
  if (formula === 'mifflin') {
    tmb = calculateMifflin(weight, height, age, sex);
  } else if (formula === 'cunningham') {
    tmb = calculateCunningham(weight, bodyFat ?? 0);
  } else if (formula === 'fao_oms') {
    tmb = calculateFaoOms(weight, age, sex);
  }

  // 2. GET
  const factor = ACTIVITY_FACTORS[activityLevel];
  const get = tmb * factor;

  // 3. Metas para todos os objetivos
  const goalsBreakdown = {
    perder_rapido: Math.round(get * 0.65),
    perder_moderado: Math.round(get * 0.80),
    manter: Math.round(get),
    ganhar_moderado: Math.round(get + 500),
    ganhar_rapido: Math.round(get + 1000),
  };

  // 4. Meta selecionada
  let calorieTarget = get;
  if (goal === 'perder_rapido') {
    calorieTarget = get * 0.65;
  } else if (goal === 'perder_moderado') {
    calorieTarget = get * 0.80;
  } else if (goal === 'manter') {
    calorieTarget = get;
  } else if (goal === 'ganhar_moderado') {
    calorieTarget = get + 500;
  } else if (goal === 'ganhar_rapido') {
    calorieTarget = get + 1000;
  }

  // 5. Hidratação
  const waterLiters = calculateHydrationLiters(weight);

  // 6. Alertas
  const alerts: CalculatorAlerts = {
    below1500: calorieTarget < 1500,
    belowTmb: calorieTarget < tmb,
    fastLoss: goal === 'perder_rapido',
    under18: age < 18,
  };

  return {
    tmb,
    tmbDisplay: Math.round(tmb),
    get,
    getDisplay: Math.round(get),
    calorieTarget,
    calorieTargetDisplay: Math.round(calorieTarget),
    waterLiters,
    alerts,
    goalsBreakdown,
  };
}

