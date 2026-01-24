
import { ApiObterResultadoRequest, ApiObterResultadoResponse, ApiStartResponse } from './types';

/**
 * Determina a Base URL da API com base no ambiente.
 * Regra:
 * - Localhost / 127.0.0.1 -> https://localhost:44311
 * - AI Studio / Preview / Prod / Cloud Run -> https://perfily-teste-de-perfil-api-678525805394.europe-west1.run.app
 */
const getApiBaseUrl = (): string => {
  if (typeof window === 'undefined') return 'https://perfily-teste-de-perfil-api-678525805394.europe-west1.run.app';

  const { hostname } = window.location;

  // Apenas usa localhost se o front-end estiver rodando explicitamente na máquina local.
  // Ambientes de preview do Google (usercontent.goog, ai.studio) não conseguem acessar localhost:44311
  // devido a restrições de rede/sandbox do iframe, então devem apontar para a API de produção.
  const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';

  if (isLocalhost) {
    console.log('[API] Localhost detectado. Usando https://localhost:44311');
    return 'https://localhost:44311';
  }

  console.log('[API] Ambiente Remoto (Prod/AI Studio) detectado. Usando Cloud Run.');
  return 'https://perfily-teste-de-perfil-api-678525805394.europe-west1.run.app';
};

const BASE_URL = getApiBaseUrl();

/**
 * Inicia uma nova sessão de teste na API.
 * @param tipoTeste Código do teste (PE, CA, AG, QI)
 */
export const startTestSession = async (tipoTeste: string): Promise<ApiStartResponse> => {
  const url = `${BASE_URL}/app/iniciar-teste`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tipoTeste }),
    });

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('[API Error] Falha ao iniciar teste:', error);
    throw error;
  }
};

/**
 * Obtém o resultado final do teste com base nas respostas.
 */
export const obterResultado = async (body: ApiObterResultadoRequest): Promise<ApiObterResultadoResponse> => {
  const url = `${BASE_URL}/app/obter-resultado`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('[API Error] Falha ao obter resultado:', error);
    throw error;
  }
};
