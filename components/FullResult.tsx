
import React from 'react';
import { ApiObterResultadoResponse, TestType } from '../types';

interface FullResultProps {
  result: ApiObterResultadoResponse;
  testType: TestType;
}

const FullResult: React.FC<FullResultProps> = ({ result, testType }) => {
  const colorMap = { personalidade: 'indigo', carreira: 'emerald', relacionamento: 'rose', qi: 'amber' } as const;
  const color = colorMap[testType] || 'indigo';

  return (
    <div className="py-4 space-y-6 animate-fade-in-up">
      <header className={`bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-${color}-100/20 text-center`}>
        <div className={`inline-flex items-center gap-2 mb-4 px-4 py-1.5 bg-${color}-50 text-${color}-700 rounded-full text-[10px] font-black uppercase tracking-[0.2em]`}>
          Diagnóstico Perfily: {testType}
        </div>
        <h1 className="text-4xl font-black text-slate-900 mb-2 leading-tight">{result.perfil}</h1>
        <p className="text-slate-500 italic">"{result.frase}"</p>
      </header>

      {result.informacoesCompletas ? (
        <section className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
          <h2 className={`text-[10px] font-black text-${color}-600 uppercase tracking-widest mb-4`}>
            Resultado Completo
          </h2>
          <p className="text-slate-700 leading-relaxed whitespace-pre-line">
            {result.texto || 'Resultado completo indisponível no momento.'}
          </p>
        </section>
      ) : (
        <section className="bg-slate-50 p-8 rounded-[2rem] border border-slate-200 border-dashed text-center">
          <h2 className="text-lg font-extrabold text-slate-900 mb-2">Relatório Completo Bloqueado</h2>
          <p className="text-sm text-slate-600">
            O resultado completo não está liberado para esta sessão.
          </p>
        </section>
      )}

      <div className="text-center py-8">
        <button
          onClick={() => window.print()}
          className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-colors"
        >
          Salvar Resultado em PDF
        </button>
      </div>
    </div>
  );
};

export default FullResult;
