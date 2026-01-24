
export type TestType = 'personalidade' | 'carreira' | 'relacionamento' | 'qi';

export enum AppStep {
  HOME = 'HOME',
  LANDING = 'LANDING',
  QUIZ = 'QUIZ',
  PREVIEW = 'PREVIEW',
  PAYMENT = 'PAYMENT',
  RESULT = 'RESULT'
}

export interface QuestionOption {
  label: string;
  value: string; // Letra da alternativa (ex: "A", "B", "C"...)
}

export interface Question {
  id: number;
  text: string;
  options: QuestionOption[];
}

export interface UserSession {
  id: string; // GUID da sessão na API
  testType?: TestType;
  answers: Record<number, string>; // Resposta por pergunta (letra da alternativa)
  result?: ApiObterResultadoResponse;
  apiVersion?: number;
  apiStatus?: string;
}

export interface ProfileResult {
  title: string;
  subtitle: string;
  shortDescription: string;
  fullDescription: string;
  strengths: string[];
  attentionPoints: string[];
  howItWorks: {
    label1: string;
    val1: string;
    label2: string;
    val2: string;
  };
  relationships?: {
    compatible: string;
    conflicts: string;
  };
  career?: {
    environments: string[];
    roles: string[];
  };
  partnerProfile?: {
    idealType: string;
    emotionalStyle: string;
    dynamics: string;
  };
  insights: string[];
  scores: {
    v1: number;
    v2: number;
    v3: number;
    v4: number;
    labels: [string, string, string, string];
  };
}

export interface TestConfig {
  title: string;
  slug: TestType;
  apiCode: string; // Código para API (PE, CA, AG, QI)
  description: string;
  icon: string;
  color: string;
  ctaLabel?: string;
  questions: Question[];
  results: Record<string, ProfileResult>;
}

// Interfaces da API
export interface ApiQuestion {
  idPergunta: number;
  aceitaMaisdeUmaResposta: boolean;
  descricao: string;
  alternativas?: {
    letra: string;
    texto: string;
  }[];
  // Opções com perfil retornadas pela API (usadas para calcular o resultado sem fallback local)
  opcoes?: {
    texto: string;
    valor: string;
    perfil: string;
  }[];
}

export interface ApiStartResponse {
  sessao: {
    identificador: string;
    version: number;
    status: string;
    horarioInicio: string;
  };
  teste: {
    titulo: string;
    descricao: string;
    minutosEstimados: number;
    quantidadeTotalPergunta: number;
    perguntas: ApiQuestion[];
  };
}

export interface ApiObterResultadoRequest {
  tipoTeste: string;
  respostas: {
    idPergunta: number;
    alternativaLetra: string;
  }[];
}

export interface ApiObterResultadoResponse {
  informacoesCompletas: boolean;
  perfil: string;
  frase: string;
  texto?: string;
}
