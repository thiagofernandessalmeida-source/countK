import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function DisclaimerBanner() {
  return (
    <aside
      aria-label="Aviso legal sobre estimativas energéticas"
      className="bg-amber-50/80 border-y border-amber-200/80 py-4 px-4 sm:px-6"
    >
      <div className="max-w-4xl mx-auto flex items-center justify-center gap-3 text-center sm:text-left">
        <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 hidden sm:inline-block" aria-hidden="true" />
        <p className="text-xs sm:text-sm text-amber-900 leading-relaxed font-medium">
          <strong>Aviso Importante:</strong> O resultado apresentado nesta calculadora é uma estimativa energética teórica. Ele <strong>não substitui avaliação clínica de nutricionista ou médico</strong>, nem constitui prescrição de dietas ou cardápios (conforme Lei Federal nº 8.234/1991).
        </p>
      </div>
    </aside>
  );
}

