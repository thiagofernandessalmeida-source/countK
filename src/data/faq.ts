export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'O que é Taxa Metabólica Basal (TMB) e Gasto Energético Total (GET)?',
    answer:
      'A Taxa Metabólica Basal (TMB) representa a quantidade mínima de energia em calorias que seu organismo gasta em 24 horas apenas para manter as funções vitais em repouso absoluto, como respiração, bombeamento sanguíneo e regeneração celular. Já o Gasto Energético Total (GET) soma a sua TMB ao efeito térmico dos alimentos e a toda a atividade física do seu dia a dia (trabalho, caminhadas e sessões de treino).',
  },
  {
    question: 'Qual fórmula devo escolher para o meu cálculo metabólico?',
    answer:
      'Para a maioria das pessoas, a fórmula de Mifflin-St Jeor é a mais indicada por aliar alta precisão com dados fáceis de obter (peso, altura, idade e sexo). Caso você pratique musculação com frequência e tenha realizado uma avaliação física recente (por bioimpedância ou dobras cutâneas) conhecendo seu percentual de gordura, escolha Cunningham, pois ela calcula o metabolismo com base direta na sua massa magra. A FAO/OMS é uma alternativa tradicional baseada em faixas etárias populacionais.',
  },
  {
    question: 'Posso usar esta calculadora para montar meu próprio cardápio ou dieta?',
    answer:
      'Não. Esta ferramenta calcula unicamente uma estimativa teórica do seu gasto energético diário. No Brasil, conforme a Lei Federal nº 8.234/1991, a prescrição dietética, divisão de macronutrientes e montagem de planos alimentares são competências exclusivas do nutricionista registrado no CRN. Utilize estes números para entender sua demanda de energia e apresente-os ao seu nutricionista e ao seu personal trainer.',
  },
  {
    question: 'Por que a recomendação diária de água é calculada em 35 ml por quilo de peso?',
    answer:
      'A proporção de 35 ml por kg de peso corporal é a referência recomendada para adultos em repouso com temperatura amena. Ela assegura adequada volemia plasmática, transporte de micronutrientes, digestão e filtragem renal. Praticantes de atividade física devem ingerir um volume extra para repor a perda hídrica decorrente do suor durante as sessões de treino.',
  },
  {
    question: 'O que fazer se o meu peso na balança estagnar após algumas semanas?',
    answer:
      'Estagnações temporárias na balança são muito comuns e não significam necessariamente que você parou de queimar gordura. Ao treinar musculação, você pode estar desenvolvendo massa muscular ao mesmo tempo em que reduz tecido adiposo (recomposição corporal), além de oscilações normais causadas por retenção de água e glicogênio. Se o peso não alterar após 3 ou 4 semanas, seu personal trainer poderá ajustar o volume e a intensidade dos treinos, e seu nutricionista reavaliará o plano calórico.',
  },
  {
    question: 'Como um personal trainer pode me ajudar com base nesses números?',
    answer:
      'A alimentação fornece a energia e os nutrientes, mas é o treinamento físico que sinaliza ao organismo para manter a musculatura e utilizar o tecido adiposo como combustível. O personal trainer estrutura uma periodização inteligente, controla a progressão de cargas, corrige a execução dos movimentos e evita sobrecargas articulares, assegurando que o déficit calórico resulte em tônus muscular, postura e performance, e não em perda de massa magra.',
  },
];

