import React, { useState, useMemo } from 'react';
import { Question } from '../types';

interface QuizProps {
  questions: Question[];
  themeColor: string;
  onAnswer: (id: number, alternativaLetra: string) => void;
  onFinish: () => void;
}

const Quiz: React.FC<QuizProps> = ({ questions, themeColor = 'indigo', onAnswer, onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentQuestion = questions[currentIndex];
  
  // Progresso relativo ao número de perguntas
  const progress = useMemo(() => 
    Math.round(((currentIndex) / questions.length) * 100)
  , [currentIndex, questions.length]);

  const handleOptionSelect = (alternativaLetra: string) => {
    onAnswer(currentQuestion.id, alternativaLetra);
    
    // Pequeno delay para feedback visual antes da próxima pergunta
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        onFinish();
      }
    }, 150);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  if (!currentQuestion) return null;

  return (
    <div className="py-8 animate-fade-in-up w-full">
      <div className="mb-10">
        <div className="flex justify-between items-center mb-2">
          <span className={`text-[10px] font-black text-${themeColor}-600 uppercase tracking-widest`}>Progresso do Mapeamento</span>
          <span className="text-xs font-bold text-slate-400">{currentIndex + 1} / {questions.length}</span>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className={`h-full bg-${themeColor}-600 rounded-full transition-all duration-500 ease-out shadow-lg shadow-${themeColor}-200`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="bg-white p-6 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-100/50">
        <div className="flex justify-between items-center mb-4">
          <span className="inline-block text-[10px] font-black text-slate-400 uppercase tracking-widest">Questão {currentIndex + 1}</span>
          
          {currentIndex > 0 && (
            <button 
              onClick={handlePrevious}
              className="text-[10px] font-bold text-slate-400 hover:text-slate-600 uppercase tracking-widest flex items-center gap-1 transition-colors group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
              Voltar
            </button>
          )}
        </div>

        <h2 className="text-2xl font-black text-slate-900 mb-8 leading-tight">
          {currentQuestion.text}
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {currentQuestion.options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleOptionSelect(option.value)}
              className={`w-full text-left p-5 border-2 border-slate-50 rounded-2xl hover:border-${themeColor}-500 hover:bg-${themeColor}-50/30 transition-all duration-200 group active:scale-[0.98]`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-${themeColor}-600 group-hover:text-white group-hover:border-${themeColor}-600 font-black transition-all`}>
                  {option.value.toUpperCase()}
                </div>
                <span className="text-slate-700 font-bold group-hover:text-slate-900 leading-tight flex-1">
                  {option.label}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
      
      <div className="mt-8 text-center text-slate-300 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        Segurança Perfily Protocol Ativado
      </div>
    </div>
  );
};

export default Quiz;
