import React from 'react';
import { Droplet, Activity, TrendingDown, Calendar, Lightbulb } from 'lucide-react';

export default function TipsSection() {
  const tips = [
    {
      icon: Droplet,
      iconBg: 'bg-blue-100 text-blue-700',
      title: 'Quando Aumentar o Consumo de Água',
      text: 'A recomendação base de 35 ml por kg atende ao repouso e rotina moderada. Em dias de calor intenso, treinos extenuantes com alta taxa de suor, ambientes secos ou uso de suplementos osmóticos como a creatina, adicione de 500 ml a 1000 ml extras ao longo do dia para manter a performance e a recuperação celular.',
    },
    {
      icon: Activity,
      iconBg: 'bg-emerald-100 text-emerald-700',
      title: 'Como Medir sua Gordura Corporal',
      text: 'A balança convencional mede apenas o peso total, sem distinguir gordura de músculo. Para utilizar a equação de Cunningham com máxima fidelidade, busque uma avaliação periódica de composição corporal através de bioimpedância elétrica tetrapolar, dobras cutâneas com adipômetro (feita pelo personal ou nutricionista) ou exame de DEXA.',
    },
    {
      icon: TrendingDown,
      iconBg: 'bg-amber-100 text-amber-700',
      title: 'Ajuste Calórico Gradual e Seguro',
      text: 'Evite restrições agressivas repentinas. Cortar mais de 30% a 35% das calorias de uma vez desacelera o metabolismo (termogênese adaptativa) e provoca perda de massa muscular. Para emagrecimento sustentável, prefira um déficit moderado (15% a 20%), garantindo energia para manter a intensidade das cargas no treino.',
    },
    {
      icon: Calendar,
      iconBg: 'bg-purple-100 text-purple-700',
      title: 'Acompanhamento Semanal da Evolução',
      text: 'O peso corporal oscila naturalmente de 1 a 2 kg de um dia para o outro devido a retenção hídrica, ingestão de sódio e fluxo intestinal. Em vez de pesar-se diariamente, adote uma média semanal em jejum pela manhã, registre fotos com a mesma luz e avalie a circunferência da cintura e seu rendimento nos treinos.',
    },
  ];

  return (
    <section id="dicas" className="py-12 sm:py-16 bg-white border-y border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-800 text-xs font-bold rounded-full mb-3">
            <Lightbulb className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Dicas Práticas para o seu Dia a Dia</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Como Aplicar os Números na Sua Rotina
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
            Saber seu gasto calórico é apenas o primeiro passo. Veja as principais recomendações para otimizar seus resultados com segurança e consistência.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tips.map((tip, idx) => {
            const Icon = tip.icon;
            return (
              <div
                key={idx}
                className="bg-gray-50/80 hover:bg-white p-6 sm:p-7 rounded-2xl border border-gray-200/80 hover:border-brand-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className={`p-3 rounded-xl shrink-0 ${tip.iconBg}`}>
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
                      {tip.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {tip.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

