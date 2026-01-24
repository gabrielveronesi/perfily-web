
import React, { useMemo, useState } from 'react';
import { ApiObterResultadoResponse, TestType } from '../types';

interface FullResultProps {
  result: ApiObterResultadoResponse;
  testType: TestType;
}

const FullResult: React.FC<FullResultProps> = ({ result, testType }) => {
  const colorMap = { personalidade: 'indigo', carreira: 'emerald', relacionamento: 'rose', qi: 'amber' } as const;
  const color = colorMap[testType] || 'indigo';
  const [copied, setCopied] = useState(false);

  const blocks = useMemo(
    () => [
      { title: 'Pontos Fortes', items: result.pontosFortes },
      { title: 'Pontos de Atenção', items: result.pontosDeAtencao },
      { title: 'Dicas Práticas', items: result.dicasPraticas },
      { title: 'Compatibilidades', items: result.compatibilidades },
      { title: 'Sugestões de Hobby', items: result.sugestoesDeHobby },
      { title: 'Sugestões de Carreira', items: result.sugestoesDeCarreira }
    ],
    [result]
  );

  const plano7Dias = result.plano7Dias || null;
  const ambienteIdeal = result.ambienteIdeal || null;
  const ambienteEvitar = result.ambienteEvitar || null;

  const handleCopyResumo = async () => {
    if (!result.resumoCompartilhavel) return;
    try {
      await navigator.clipboard.writeText(result.resumoCompartilhavel);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="py-4 space-y-6 animate-fade-in-up">
      <header className={`bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl text-center`}>
        <div className={`inline-flex items-center gap-2 mb-4 px-4 py-1.5 bg-${color}-50 text-${color}-700 rounded-full text-[10px] font-black uppercase tracking-[0.2em]`}>
          Diagnóstico Perfily: {testType}
        </div>
        <h1 className="text-4xl font-black text-slate-900 mb-2 leading-tight">{result.perfil}</h1>
        <p className="text-slate-500 italic">"{result.frase}"</p>
      </header>

      {result.informacoesCompletas ? (
        <>
          <section className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
            <h2 className={`text-[10px] font-black text-${color}-600 uppercase tracking-widest mb-4`}>
              Visão Geral
            </h2>
            <p className="text-slate-700 leading-relaxed whitespace-pre-line">
              {result.texto || 'Resumo indisponível no momento.'}
            </p>
          </section>

          {result.resumoCompartilhavel && (
            <section className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h2 className={`text-[10px] font-black text-${color}-600 uppercase tracking-widest mb-2`}>
                    Resumo Compartilhável
                  </h2>
                  <p className="text-slate-700 leading-relaxed text-sm">{result.resumoCompartilhavel}</p>
                </div>
                <button
                  type="button"
                  onClick={handleCopyResumo}
                  className={`shrink-0 text-xs font-black uppercase tracking-widest text-${color}-600 hover:text-${color}-700`}
                >
                  {copied ? 'Copiado!' : 'Copiar'}
                </button>
              </div>
            </section>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blocks.map((block) =>
              block.items && block.items.length > 0 ? (
                <section key={block.title} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                  <h2 className={`text-[10px] font-black text-${color}-600 uppercase tracking-widest mb-4`}>
                    {block.title}
                  </h2>
                  <ul className="space-y-2">
                    {block.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 leading-relaxed">
                        <span className={`mt-1 inline-flex h-2 w-2 rounded-full bg-${color}-600`}></span>
                        <span className="flex-1">{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null
            )}
          </div>

          {plano7Dias && plano7Dias.length > 0 && (
            <section className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
              <h2 className={`text-[10px] font-black text-${color}-600 uppercase tracking-widest mb-4`}>
                Plano de 7 Dias
              </h2>
              <ol className="space-y-2">
                {plano7Dias.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 leading-relaxed">
                    <span className={`inline-flex h-7 w-7 items-center justify-center rounded-xl bg-${color}-50 text-${color}-700 text-xs font-black`}>
                      {idx + 1}
                    </span>
                    <span className="flex-1 pt-1">{item}</span>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {(ambienteIdeal || ambienteEvitar) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ambienteIdeal && (
                <section className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                  <h2 className={`text-[10px] font-black text-${color}-600 uppercase tracking-widest mb-3`}>
                    Ambiente Ideal
                  </h2>
                  <p className="text-sm text-slate-700 leading-relaxed">{ambienteIdeal}</p>
                </section>
              )}
              {ambienteEvitar && (
                <section className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                  <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">
                    Ambiente a Evitar
                  </h2>
                  <p className="text-sm text-slate-700 leading-relaxed">{ambienteEvitar}</p>
                </section>
              )}
            </div>
          )}
        </>
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
