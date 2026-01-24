
import React, { useState, useEffect, useLayoutEffect, useCallback, useMemo, useRef } from 'react';
import { AppStep, UserSession, TestType, Question } from './types';
import { TEST_CONFIGS } from './data';
import { getCurrentPath, navigate, listenToRouteChanges, getRouterMode } from './router';
import { obterResultado, startTestSession } from './api';
import Home from './components/Home';
import Landing from './components/Landing';
import Quiz from './components/Quiz';
import Preview from './components/Preview';
import Payment from './components/Payment';
import FullResult from './components/FullResult';

const SESSION_KEY = 'perfily_v1_session';
const GENERIC_API_ERROR_MESSAGE = 'Não foi possível se conectar à API ou carregar o teste. Tente novamente.';
const BUILD_TIME = __BUILD_TIME__;

const App: React.FC = () => {
  const [session, setSession] = useState<UserSession>(() => {
    try {
      const saved = localStorage.getItem(SESSION_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          id: parsed.id || '', 
          answers: parsed.answers || {},
          testType: parsed.testType,
          result: parsed.result,
          apiVersion: parsed.apiVersion,
          apiStatus: parsed.apiStatus
        };
      }
    } catch (e) { console.warn("Session error:", e); }
    return { id: '', answers: {} };
  });

  const answersRef = useRef<Record<number, string>>({});
  useEffect(() => {
    answersRef.current = session.answers;
  }, [session.answers]);

  const [step, setStep] = useState<AppStep>(AppStep.HOME);
  const [loading, setLoading] = useState(false);
  const [apiQuestions, setApiQuestions] = useState<Question[] | null>(null);
  const [apiQuestionsTestType, setApiQuestionsTestType] = useState<TestType | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  
  // Debug mode no console para verificar ambiente
  useEffect(() => {
    console.log(`[Router] Mode: ${getRouterMode()}`);
  }, []);

  // --- HYBRID ROUTER LOGIC ---
  const syncRoute = useCallback(() => {
    // Pega o caminho unificado do router (ex: "/carreira")
    const fullPath = getCurrentPath(); 
    // Remove a barra inicial para pegar o slug
    const slug = fullPath.replace(/^\//, '') as TestType;
    
    // Se o path for vazio ou raiz, volta pra home
    if (fullPath === '/' || !slug) {
       setStep(AppStep.HOME);
       return;
    }

    if (TEST_CONFIGS[slug]) {
      setSession(prev => {
        // Evita resetar se já estiver no teste correto (com sessão da API)
        if (prev.testType === slug && prev.id) return prev;
        
        return { 
          ...prev, 
          id: '',
          testType: slug, 
          answers: {}, 
          result: undefined,
          apiVersion: undefined,
          apiStatus: undefined
        };
      });
      setStep(AppStep.LANDING);
    } else {
      // Rota desconhecida -> Home
      setStep(AppStep.HOME);
    }
  }, []);

  useEffect(() => {
    // Sincroniza na montagem inicial
    syncRoute();
    
    // Registra listener unificado (hash ou history)
    const unsubscribe = listenToRouteChanges(syncRoute);
    
    return () => unsubscribe();
  }, [syncRoute]);
  // ----------------------------------

  useEffect(() => {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }, [session]);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  // Função centralizada para carregar sessão da API (usada na Home e no Refresh da Landing)
  const loadTestSession = async (slug: string) => {
    if (!TEST_CONFIGS[slug]) return;
    const config = TEST_CONFIGS[slug];

    setLoading(true);
    setApiError(null);
    try {
      // Chamada à API real
      const apiResponse = await startTestSession(config.apiCode);
      
      // Atualiza a sessão com ID da API imediatamente
      setSession(prev => ({
        ...prev,
        id: apiResponse.sessao.identificador,
        testType: slug as TestType,
        answers: {},
        result: undefined,
        apiVersion: apiResponse.sessao.version,
        apiStatus: apiResponse.sessao.status
      }));

      // Transforma perguntas da API para formato do Front
      const mappedQuestions: Question[] = apiResponse.teste.perguntas.map((q) => {
        const optionsFromAlternativas = q.alternativas?.map((alt) => ({
          label: alt.texto,
          value: alt.letra.toUpperCase()
        }));

        const optionsFromOpcoes = q.opcoes?.map((opt) => ({
          label: opt.texto,
          value: String(opt.valor).toUpperCase()
        }));

        const options = optionsFromAlternativas || optionsFromOpcoes;

        if (!options || options.length === 0) {
          throw new Error(`API não retornou alternativas/opções para a pergunta ${q.idPergunta}`);
        }

        return {
          id: q.idPergunta,
          text: q.descricao,
          options
        };
      });

      setApiQuestions(mappedQuestions);
      setApiQuestionsTestType(slug as TestType);

    } catch (error) {
      console.error("Erro ao iniciar teste na API:", error);
      setApiError(GENERIC_API_ERROR_MESSAGE);
      setApiQuestions(null);
      setApiQuestionsTestType(null);
      setSession(prev => ({ ...prev, id: '', apiVersion: undefined, apiStatus: undefined }));
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Handler para seleção na Home: Carrega API -> Navega
  const handleHomeSelect = async (path: string) => {
    const slug = path.replace(/^\//, '') as TestType;
    if (TEST_CONFIGS[slug]) {
      try {
        await loadTestSession(slug);
        navigate(path);
      } catch {
        // Erro já tratado com mensagem genérica (apiError)
      }
      return;
    }
    navigate(path);
  };

  // Handler para botão "Começar" na Landing: Só vai pro Quiz (API já carregada ou carrega se refresh)
  const handleLandingStart = async () => {
    if (!session.testType) return;
    
    // Se houve refresh na Landing, apiQuestions estará null, então carrega agora
    const needsLoad = !apiQuestions || apiQuestions.length === 0 || apiQuestionsTestType !== session.testType;
    if (needsLoad) {
      try {
        await loadTestSession(session.testType);
      } catch {
        return;
      }
    }
    setStep(AppStep.QUIZ);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const isSubmittingResultRef = useRef(false);

  const handleAnswer = (questionId: number, alternativaLetra: string) => {
    const letra = alternativaLetra.toUpperCase();
    answersRef.current = { ...answersRef.current, [questionId]: letra };

    setSession(prev => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: letra }
    }));
  };

  const submitResult = async () => {
    if (isSubmittingResultRef.current) return;
    if (!session.testType) return;

    const config = TEST_CONFIGS[session.testType];
    if (!config) return;

    const respostas = Object.entries(answersRef.current)
      .map(([idPergunta, alternativaLetra]) => ({
        idPergunta: Number(idPergunta),
        alternativaLetra: String(alternativaLetra).toUpperCase()
      }))
      .sort((a, b) => a.idPergunta - b.idPergunta);

    if (respostas.length === 0) return;

    isSubmittingResultRef.current = true;
    setLoading(true);
    setApiError(null);
    try {
      const result = await obterResultado({ tipoTeste: config.apiCode, respostas });

      setSession(prev => ({ ...prev, result }));
      setStep(result.informacoesCompletas ? AppStep.RESULT : AppStep.PREVIEW);
    } catch (error) {
      console.error("Erro ao obter resultado na API:", error);
      setApiError(GENERIC_API_ERROR_MESSAGE);
      setStep(AppStep.LANDING);
    } finally {
      setLoading(false);
      isSubmittingResultRef.current = false;
    }
  };

  const activeConfig = useMemo(() => 
    session.testType ? TEST_CONFIGS[session.testType] : null
  , [session.testType]);

  const renderContent = () => {
    switch (step) {
      case AppStep.HOME: 
        return <Home onSelect={handleHomeSelect} isLoading={loading} />;
      case AppStep.LANDING: 
        // Passa handleLandingStart que agora é mais leve ou recupera estado
        return activeConfig ? <Landing config={activeConfig} onStart={handleLandingStart} isLoading={loading} /> : <Home onSelect={handleHomeSelect} isLoading={loading} />;
      case AppStep.QUIZ: {
        if (!activeConfig || !session.testType) {
          return <Home onSelect={handleHomeSelect} isLoading={loading} />;
        }

        const hasValidApiQuestions =
          apiQuestions && apiQuestions.length > 0 && apiQuestionsTestType === session.testType;

        if (!hasValidApiQuestions) {
          return (
            <div className="py-10 text-center">
              <p className="text-slate-600 font-medium">
                Não foi possível carregar as perguntas do teste.
              </p>
              <button
                onClick={() => setStep(AppStep.LANDING)}
                className="mt-6 inline-flex items-center justify-center px-5 py-3 rounded-2xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-colors"
              >
                Voltar
              </button>
            </div>
          );
        }

        return (
          <Quiz
            questions={apiQuestions}
            themeColor={activeConfig.color}
            onAnswer={handleAnswer}
            onFinish={submitResult}
          />
        );
      }
      case AppStep.PREVIEW: {
        if (!session.result) {
          return (
            <div className="py-10 text-center">
              <p className="text-slate-600 font-medium">
                Não foi possível carregar o resultado do teste.
              </p>
              <button
                onClick={() => setStep(AppStep.LANDING)}
                className="mt-6 inline-flex items-center justify-center px-5 py-3 rounded-2xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-colors"
              >
                Voltar
              </button>
            </div>
          );
        }

        if (session.result.informacoesCompletas) {
          return session.testType ? (
            <FullResult result={session.result} testType={session.testType} />
          ) : (
            <Home onSelect={handleHomeSelect} isLoading={loading} />
          );
        }

        return <Preview perfil={session.result.perfil} frase={session.result.frase} onUnlock={() => setStep(AppStep.PAYMENT)} />;
      }
      case AppStep.PAYMENT: {
        if (!session.result || !session.testType) {
          return <Home onSelect={handleHomeSelect} isLoading={loading} />;
        }

        const checkUnlock = async () => {
          if (isSubmittingResultRef.current) return false;

          const config = TEST_CONFIGS[session.testType as TestType];
          if (!config) return false;

          const respostas = Object.entries(answersRef.current)
            .map(([idPergunta, alternativaLetra]) => ({
              idPergunta: Number(idPergunta),
              alternativaLetra: String(alternativaLetra).toUpperCase()
            }))
            .sort((a, b) => a.idPergunta - b.idPergunta);

          if (respostas.length === 0) return false;

          isSubmittingResultRef.current = true;
          setLoading(true);
          setApiError(null);
          try {
            const result = await obterResultado({ tipoTeste: config.apiCode, respostas });
            setSession(prev => ({ ...prev, result }));

            if (result.informacoesCompletas) {
              setStep(AppStep.RESULT);
              return true;
            }

            return false;
          } catch (error) {
            console.error("Erro ao verificar desbloqueio na API:", error);
            setApiError(GENERIC_API_ERROR_MESSAGE);
            return false;
          } finally {
            setLoading(false);
            isSubmittingResultRef.current = false;
          }
        };

        return (
          <Payment
            onCheck={checkUnlock}
            onCancel={() => setStep(AppStep.PREVIEW)}
          />
        );
      }
      case AppStep.RESULT: {
        if (!session.result || !session.testType) {
          return (
            <div className="py-10 text-center">
              <p className="text-slate-600 font-medium">
                Não foi possível carregar o resultado completo.
              </p>
              <button
                onClick={() => setStep(AppStep.HOME)}
                className="mt-6 inline-flex items-center justify-center px-5 py-3 rounded-2xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-colors"
              >
                Voltar ao início
              </button>
            </div>
          );
        }

        if (!session.result.informacoesCompletas) {
          return <Preview perfil={session.result.perfil} frase={session.result.frase} onUnlock={() => setStep(AppStep.PAYMENT)} />;
        }

        return <FullResult result={session.result} testType={session.testType} />;
      }
      default: 
        return <Home onSelect={handleHomeSelect} isLoading={loading} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-slate-50 text-slate-900 overflow-x-hidden pb-10">
      <header className="w-full max-w-2xl px-6 py-6 flex justify-between items-center sticky top-0 bg-slate-50/90 backdrop-blur-xl z-[999] border-b border-slate-100/50">
        <div onClick={() => handleNavigate('/')} className="flex items-center gap-2.5 cursor-pointer group active:scale-95 transition-transform">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold italic shadow-lg shadow-indigo-100 group-hover:bg-indigo-700">P</div>
          <span className="text-2xl font-black text-slate-800 tracking-tighter uppercase">PER<span className="text-indigo-600">FILY</span></span>
        </div>
        
        {step !== AppStep.HOME && session.id && (
          <div className="text-[9px] text-slate-400 font-black tracking-widest bg-white px-3 py-1.5 rounded-full border shadow-inner uppercase">
            ID: {session.id.slice(0, 8)}
          </div>
        )}
      </header>
      <main className="w-full max-w-2xl px-4 flex-1">
        {apiError && (
          <div className="mt-6 mb-2 rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-rose-900">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-4a1 1 0 00-1 1v3a1 1 0 002 0V7a1 1 0 00-1-1zm0 8a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-sm font-bold">Ops! Algo deu errado.</p>
                  <p className="text-sm text-rose-800">{apiError}</p>
                </div>
              </div>
              <button
                onClick={() => setApiError(null)}
                className="text-rose-700 hover:text-rose-900 text-sm font-bold"
              >
                Fechar
              </button>
            </div>
          </div>
        )}
        {renderContent()}
      </main>
      <footer className="w-full max-w-2xl p-10 text-center text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em] border-t border-slate-100/50 mt-10">
        &copy; 2024 Perfily Behavioral Systems
        <div className="mt-2 text-[9px] font-medium tracking-[0.25em] uppercase text-slate-300">
          build {BUILD_TIME}
        </div>
      </footer>
    </div>
  );
};

export default App;
