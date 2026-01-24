
import React from 'react';
import { TestType } from '../types';

interface PreviewProps {
  perfil: string;
  frase: string;
  texto?: string | null;
  testType: TestType;
  onUnlock: () => void;
}

const CTA_BY_TEST: Record<TestType, string> = {
  personalidade: 'Como transformar seu perfil em hábitos que aumentam sua confiança, foco e resultados no dia a dia?',
  carreira: 'Qual é o melhor caminho de carreira para o seu perfil — e como ganhar mais e ser promovido?',
  relacionamento: 'Como usar seu perfil para melhorar a comunicação, reduzir atritos e fortalecer seus relacionamentos?',
  qi: 'O que seu resultado revela sobre seu raciocínio — e quais estratégias elevam sua performance em provas e trabalho?'
};

const Preview: React.FC<PreviewProps> = ({ perfil, frase, texto, testType, onUnlock }) => {
  const cta = CTA_BY_TEST[testType] ?? CTA_BY_TEST.carreira;
  return (
    <div className="py-6 animate-fade-in">
      <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 text-emerald-800 text-center mb-8 flex items-center justify-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span className="text-sm font-bold uppercase tracking-wide">Análise concluída com sucesso!</span>
      </div>

      <div className="text-center mb-10">
        <span className="text-slate-500 text-sm font-medium uppercase tracking-widest">Seu Perfil Principal é:</span>
        <h2 className="text-4xl font-black text-slate-900 mt-2">{perfil}</h2>
        <p className="text-lg text-slate-600 mt-4 leading-relaxed max-w-lg mx-auto italic">
          "{frase}"
        </p>
      </div>

      <div className="space-y-6">
        {/* Frase (Parte Liberada) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-md flex items-center justify-center text-xs">01</span>
            Frase do Perfil
          </h3>
          <p className="text-slate-600 leading-relaxed text-sm">"{frase}"</p>
        </div>

        {texto && (
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 bg-emerald-100 text-emerald-600 rounded-md flex items-center justify-center text-xs">02</span>
              Resumo do Perfil
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm">{texto}</p>
          </div>
        )}

        {/* ÁREA DE BLOQUEIO (Corrigida) */}
        <div className="relative rounded-3xl border border-slate-200 border-dashed bg-slate-50 min-h-[480px] flex items-center justify-center overflow-hidden p-4">
          
          {/* Conteúdo de Fundo (Borrado) */}
          <div className="absolute inset-0 p-8 blur-text opacity-30 select-none pointer-events-none">
            <h3 className="font-bold text-slate-800 mb-4">Pontos de Atenção e Melhoria</h3>
            <div className="space-y-4">
              <div className="h-4 bg-slate-300 rounded w-full"></div>
              <div className="h-4 bg-slate-300 rounded w-11/12"></div>
              <div className="h-4 bg-slate-300 rounded w-10/12"></div>
              <div className="h-4 bg-slate-300 rounded w-full"></div>
              <div className="h-4 bg-slate-300 rounded w-9/12"></div>
              <div className="h-4 bg-slate-300 rounded w-full"></div>
            </div>
            <h3 className="font-bold text-slate-800 mt-8 mb-4">Plano de Carreira 2024</h3>
            <div className="space-y-4">
              <div className="h-10 bg-slate-300 rounded-xl w-full"></div>
              <div className="h-10 bg-slate-300 rounded-xl w-full"></div>
            </div>
          </div>

          {/* Overlay de Gradiente para suavizar o blur */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/20 to-slate-50/80"></div>

          {/* Card de CTA (Sempre visível) */}
          <div className="relative z-20 bg-white p-6 md:p-8 rounded-3xl shadow-2xl border border-slate-100 text-center max-w-sm w-full transform transition-all hover:scale-[1.01]">
            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            
            <h4 className="text-xl font-extrabold text-slate-900 mb-3">Relatório Completo Bloqueado</h4>
            
            <p className="text-sm text-slate-500 mb-8 leading-relaxed">
              Você descobriu seu perfil, mas ainda falta o mais importante: <strong>{cta}</strong>
            </p>

            <div className="space-y-3">
              <button 
                onClick={onUnlock}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 px-6 rounded-2xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.97] flex items-center justify-center gap-2 text-lg"
              >
                <span>Desbloquear Resultado</span>
                <span className="text-indigo-200 text-sm font-normal">
                  | de <span className="line-through">R$ 12,00</span> por <span className="text-white font-black">R$ 5,50</span>
                </span>
              </button>
              
              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 uppercase font-bold tracking-widest">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Acesso Vitalício Imediato
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
