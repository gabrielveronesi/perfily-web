
import React from 'react';
import { TestConfig } from '../types';
import { UserAvatar } from './Icons';

interface LandingProps {
  config: TestConfig;
  onStart: () => void;
  isLoading?: boolean;
}

const Landing: React.FC<LandingProps> = ({ config, onStart, isLoading = false }) => {
  return (
    <div className="flex flex-col items-center text-center py-8 animate-fade-in">
      <div className={`mb-6 inline-flex items-center gap-2 px-3 py-1 bg-${config.color}-50 text-${config.color}-700 rounded-full text-sm font-semibold border border-${config.color}-100`}>
        <span className="relative flex h-2 w-2">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-${config.color}-400 opacity-75`}></span>
          <span className={`relative inline-flex rounded-full h-2 w-2 bg-${config.color}-500`}></span>
        </span>
        {config.title}
      </div>
      
      <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-4">
        {config.slug === 'personalidade' && <>Descubra sua <span className="text-indigo-600 underline decoration-indigo-200">verdadeira essência</span></>}
        {config.slug === 'carreira' && <>Destrave sua <span className="text-emerald-600 underline decoration-emerald-200">evolução profissional</span></>}
        {config.slug === 'relacionamento' && <>Encontre o <span className="text-rose-600 underline decoration-rose-200">seu match ideal</span></>}
        {config.slug === 'qi' && <>Avalie seu <span className="text-amber-600 underline decoration-amber-200">raciocínio lógico</span></>}
      </h1>
      
      <p className="text-lg text-slate-600 mb-10 max-w-lg leading-relaxed">
        {config.description} Receba um relatório completo e acionável em menos de 2 minutos.
      </p>

      <button
        onClick={onStart}
        disabled={isLoading}
        className={`w-full sm:w-auto bg-${config.color}-600 hover:bg-${config.color}-700 text-white font-bold py-4 px-10 rounded-2xl shadow-xl shadow-${config.color}-200 transition-all transform hover:scale-[1.02] active:scale-[0.98] text-lg mb-8 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[200px]`}
      >
        {isLoading ? (
          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        ) : (
          "Começar mapeamento"
        )}
      </button>

      <div className="flex flex-col items-center gap-4 opacity-75">
        <div className="flex -space-x-3 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <UserAvatar key={i} index={i} />
          ))}
        </div>
        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
          +12.000 diagnósticos realizados este mês
        </p>
      </div>
    </div>
  );
};

export default Landing;
