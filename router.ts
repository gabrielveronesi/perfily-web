/**
 * Router Híbrido para compatibilidade entre Cloud Run e AI Studio Preview.
 */

type RouterMode = 'hash' | 'history';

// Detecção de ambiente
const detectRouterMode = (): RouterMode => {
  if (typeof window === 'undefined') return 'history';
  
  const { origin, protocol, href } = window.location;

  // Critérios para forçar Hash Routing (Ambientes de Preview/Sandbox)
  const isPreview = 
    origin.includes('content.goog') || 
    origin.includes('googleusercontent') || 
    origin === 'null' || // Arquivos locais ou iframes restritos
    protocol === 'file:' ||
    href.startsWith('blob:');

  return isPreview ? 'hash' : 'history';
};

const MODE = detectRouterMode();

// Obtém o caminho atual normalizado (sempre começa com /)
export const getCurrentPath = (): string => {
  if (MODE === 'hash') {
    // Ex: "https://.../#/personalidade" -> "/personalidade"
    // Ex: "https://.../" -> "/"
    const hash = window.location.hash.slice(1); // Remove o primeiro #
    if (!hash) return '/';
    return hash.startsWith('/') ? hash : '/' + hash;
  }
  
  // Modo History: usa pathname
  return window.location.pathname;
};

// Navega para um novo caminho
export const navigate = (path: string) => {
  // Garante formato /caminho
  const cleanPath = path.startsWith('/') ? path : '/' + path;

  if (MODE === 'hash') {
    window.location.hash = cleanPath;
  } else {
    window.history.pushState({}, '', cleanPath);
    // Dispara evento customizado para o App saber que mudou (pushState não dispara popstate nativamente)
    window.dispatchEvent(new Event('pushstate'));
  }
};

// Escuta mudanças de rota
export const listenToRouteChanges = (callback: () => void) => {
  if (MODE === 'hash') {
    window.addEventListener('hashchange', callback);
    return () => window.removeEventListener('hashchange', callback);
  } else {
    // History API precisa ouvir popstate (voltar/avançar) e o nosso custom pushstate
    window.addEventListener('popstate', callback);
    window.addEventListener('pushstate', callback);
    
    return () => {
      window.removeEventListener('popstate', callback);
      window.removeEventListener('pushstate', callback);
    };
  }
};

// Retorna o modo atual (para debug se necessário)
export const getRouterMode = () => MODE;
