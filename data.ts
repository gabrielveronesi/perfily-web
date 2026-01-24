
import { TestConfig } from './types';

export const TEST_CONFIGS: Record<string, TestConfig> = {
  personalidade: {
    title: "Teste de Personalidade",
    slug: "personalidade",
    apiCode: "PE",
    description: "Mapeie sua essência e entenda como você processa o mundo ao seu redor.",
    icon: "🎭",
    color: "indigo",
    ctaLabel: "Descobrir minha essência",
    questions: [],
    results: {
      analitico: {
        title: "Essência Analítica",
        subtitle: "A profundidade é sua maior virtude.",
        shortDescription: "Você busca a verdade nos detalhes e a segurança nos fatos.",
        fullDescription: "Sua personalidade é marcada por uma busca incessante por compreensão. Você não se contenta com o superficial e prefere ambientes onde a lógica prevalece sobre a impulsividade.",
        strengths: ["Observação Aguçada", "Foco Inabalável", "Precisão Lógica"],
        attentionPoints: ["Isolamento Social", "Excesso de Autocrítica", "Paralisia por Análise"],
        howItWorks: {
          label1: "Processamento", val1: "Lógico e sequencial",
          label2: "Energia", val2: "Recarrega-se na introspecção"
        },
        insights: ["Confie mais na sua intuição para decisões rápidas", "Compartilhe seus pensamentos com a equipe"],
        scores: { v1: 90, v2: 40, v3: 50, v4: 80, labels: ["Lógica", "Ação", "Emoção", "Plano"] }
      },
      comunicador: {
        title: "Perfil Comunicador",
        subtitle: "Sua energia contagia e move pessoas.",
        shortDescription: "Você é o elo que une grupos através do carisma e da visão.",
        fullDescription: "Como comunicador, sua força reside na influência. Você processa o mundo através das interações humanas.",
        strengths: ["Carisma Natural", "Poder de Persuasão", "Criatividade"],
        attentionPoints: ["Falta de Foco", "Dificuldade com Detalhes", "Necessidade de Aprovação"],
        howItWorks: {
          label1: "Processamento", val1: "Intuitivo e social",
          label2: "Energia", val2: "Recarrega-se entre pessoas"
        },
        insights: ["Crie rotinas para não perder o foco nos detalhes", "Pratique a escuta ativa"],
        scores: { v1: 40, v2: 60, v3: 95, v4: 30, labels: ["Lógica", "Ação", "Emoção", "Plano"] }
      },
      executor: {
        title: "Perfil Executor",
        subtitle: "Resultados são seu único norte.",
        shortDescription: "Você é movido por desafios e pela superação de obstáculos.",
        fullDescription: "Para você, o mundo é um conjunto de objetivos a serem conquistados. Sua determinação é sua maior ferramenta.",
        strengths: ["Determinação", "Foco em Resultados", "Coragem"],
        attentionPoints: ["Impaciência", "Rigidez excessiva"],
        howItWorks: {
          label1: "Processamento", val1: "Pragmático e direto",
          label2: "Energia", val2: "Recarrega-se ao vencer desafios"
        },
        insights: ["Lembre-se que as pessoas não são máquinas", "Celebre as pequenas vitórias"],
        scores: { v1: 60, v2: 95, v3: 40, v4: 50, labels: ["Lógica", "Ação", "Emoção", "Plano"] }
      },
      planejador: {
        title: "Perfil Planejador",
        subtitle: "Estabilidade e harmonia são seus pilares.",
        shortDescription: "Você é o arquiteto da previsibilidade e do bem-estar coletivo.",
        fullDescription: "Você valoriza a segurança e o ritmo constante. Sua habilidade de prever riscos garante a ordem.",
        strengths: ["Confiabilidade", "Organização", "Empatia"],
        attentionPoints: ["Medo de Mudanças", "Dificuldade em Confrontar"],
        howItWorks: {
          label1: "Processamento", val1: "Metódico e pacífico",
          label2: "Energia", val2: "Recarrega-se em ambientes calmos"
        },
        insights: ["Desafie-se a sair da zona de conforto", "Fale o que pensa mesmo sob tensão"],
        scores: { v1: 70, v2: 30, v3: 60, v4: 95, labels: ["Lógica", "Ação", "Emoção", "Plano"] }
      }
    }
  },
  carreira: {
    title: "Teste de Carreira",
    slug: "carreira",
    apiCode: "CA",
    description: "Descubra seu perfil profissional e os caminhos para sua próxima promoção.",
    icon: "💼",
    color: "emerald",
    ctaLabel: "Descobrir meu perfil profissional",
    questions: [],
    results: {
      lider: {
        title: "Perfil Liderança",
        subtitle: "Você nasceu para tracionar resultados.",
        shortDescription: "Sua visão é focada em impacto e velocidade de execução.",
        fullDescription: "No ambiente profissional, você é o motor que move a engrenagem para frente.",
        strengths: ["Tomada de Decisão", "Coragem Estratégica", "Visão de Impacto"],
        attentionPoints: ["Impaciência", "Falta de Escuta"],
        howItWorks: { label1: "Estilo", val1: "Comando e tracional", label2: "Fator X", val2: "Foco total em metas" },
        career: { environments: ["Corporativo", "Startups"], roles: ["Diretor", "Founder"] },
        insights: ["Valorize o processo tanto quanto o fim", "Mentorize outros"],
        scores: { v1: 60, v2: 95, v3: 30, v4: 50, labels: ["Análise", "Impacto", "Relações", "Processo"] }
      },
      especialista: {
        title: "Perfil Especialista",
        subtitle: "A maestria técnica é sua marca.",
        shortDescription: "Sua excelência vem da precisão e do conhecimento profundo.",
        fullDescription: "Você é a autoridade técnica. Seu foco na qualidade garante a perfeição.",
        strengths: ["Conhecimento Técnico", "Atenção ao Detalhe"],
        attentionPoints: ["Dificuldade em Delegar"],
        howItWorks: { label1: "Estilo", val1: "Execução Técnica", label2: "Fator X", val2: "Padrão de Qualidade" },
        career: { environments: ["Pesquisa", "Engenharia"], roles: ["Consultor", "Arquiteto"] },
        insights: ["Comunique sua expertise de forma simples"],
        scores: { v1: 95, v2: 40, v3: 30, v4: 70, labels: ["Análise", "Impacto", "Relações", "Processo"] }
      },
      articulador: {
        title: "Perfil Articulador",
        subtitle: "O poder das conexões profissionais.",
        shortDescription: "Você transforma relacionamentos em resultados tangíveis.",
        fullDescription: "Sua habilidade em ler pessoas e criar pontes é o seu maior diferencial competitivo.",
        strengths: ["Diplomacia", "Networking", "Influência"],
        attentionPoints: ["Superficialidade", "Dificuldade com prazos"],
        howItWorks: { label1: "Estilo", val1: "Relacional", label2: "Fator X", val2: "Diplomacia" },
        career: { environments: ["Comercial", "RH", "Relações Públicas"], roles: ["Business Developer", "Account Manager"] },
        insights: ["Foque em finalizar processos, não apenas iniciá-los"],
        scores: { v1: 30, v2: 50, v3: 95, v4: 40, labels: ["Análise", "Impacto", "Relações", "Processo"] }
      },
      gestor: {
        title: "Perfil Gestor",
        subtitle: "O arquiteto da ordem e eficiência.",
        shortDescription: "Você organiza o caos e cria sistemas escaláveis.",
        fullDescription: "Sua mente estruturada permite que projetos complexos sejam executados sem erros.",
        strengths: ["Organização", "Planejamento", "Método"],
        attentionPoints: ["Rigidez", "Aversão ao risco"],
        howItWorks: { label1: "Estilo", val1: "Estruturado", label2: "Fator X", val2: "Consistência" },
        career: { environments: ["Operações", "Logística"], roles: ["PMO", "Gerente de Operações"] },
        insights: ["Permita-se um pouco mais de flexibilidade criativa"],
        scores: { v1: 70, v2: 40, v3: 30, v4: 95, labels: ["Análise", "Impacto", "Relações", "Processo"] }
      }
    }
  },
  relacionamento: {
    title: "Perfil da Alma Gêmea",
    slug: "relacionamento",
    apiCode: "AG",
    description: "Mapeie o perfil ideal que complementa sua energia e valores.",
    icon: "❤️",
    color: "rose",
    ctaLabel: "Mapear meu match ideal",
    questions: [],
    results: {
      intelectual: {
        title: "O Parceiro Consciente",
        subtitle: "Sua conexão ideal nasce da mente.",
        shortDescription: "Sua alma gêmea é alguém que desafia seu intelecto.",
        fullDescription: "Você busca parceria mental e profundidade existencial.",
        strengths: ["Lealdade", "Diálogo", "Crescimento"],
        attentionPoints: ["Excesso de Racionalização"],
        howItWorks: { label1: "Linguagem", val1: "Tempo de Qualidade", label2: "Dinâmica", val2: "Troca mental" },
        partnerProfile: { idealType: "Maduro", emotionalStyle: "Calmo", dynamics: "Crescimento a dois" },
        insights: ["Permita-se viver momentos sensoriais"],
        scores: { v1: 95, v2: 30, v3: 50, v4: 70, labels: ["Mente", "Ação", "Emoção", "Ordem"] }
      },
      aventureiro: {
        title: "O Espírito Livre",
        subtitle: "A vida é uma jornada de descobertas.",
        shortDescription: "Você busca alguém que tope o inesperado com um sorriso.",
        fullDescription: "Para você, o amor é movimento e novas experiências compartilhadas.",
        strengths: ["Espontaneidade", "Coragem"],
        attentionPoints: ["Falta de Rotina"],
        howItWorks: { label1: "Linguagem", val1: "Toque Físico", label2: "Dinâmica", val2: "Exploração" },
        partnerProfile: { idealType: "Dinâmico", emotionalStyle: "Intenso", dynamics: "Aventura constante" },
        insights: ["Aprecie também a calma do cotidiano"],
        scores: { v1: 40, v2: 95, v3: 60, v4: 30, labels: ["Mente", "Ação", "Emoção", "Ordem"] }
      },
      romantico: {
        title: "O Protetor Afetivo",
        subtitle: "O carinho é a base de tudo.",
        shortDescription: "Você valoriza a sensibilidade e o cuidado mútuo.",
        fullDescription: "Sua conexão ideal é baseada na entrega emocional e no acolhimento constante.",
        strengths: ["Empatia", "Cuidado"],
        attentionPoints: ["Dependência Emocional"],
        howItWorks: { label1: "Linguagem", val1: "Palavras de Afirmação", label2: "Dinâmica", val2: "Suporte mútuo" },
        partnerProfile: { idealType: "Carinhoso", emotionalStyle: "Vulnerável", dynamics: "Conexão de alma" },
        insights: ["Mantenha sua individualidade dentro do nós"],
        scores: { v1: 30, v2: 40, v3: 95, v4: 50, labels: ["Mente", "Ação", "Emoção", "Ordem"] }
      },
      estavel: {
        title: "O Arquiteto de Futuro",
        subtitle: "Construindo uma base sólida.",
        shortDescription: "Você busca alguém para construir um império e uma família.",
        fullDescription: "A segurança e os valores compartilhados são inegociáveis para você.",
        strengths: ["Confiabilidade", "Visão de Longo Prazo"],
        attentionPoints: ["Rigidez com Planos"],
        howItWorks: { label1: "Linguagem", val1: "Atos de Serviço", label2: "Dinâmica", val2: "Planejamento" },
        partnerProfile: { idealType: "Responsável", emotionalStyle: "Seguro", dynamics: "Construção de vida" },
        insights: ["Nem tudo precisa estar sob controle o tempo todo"],
        scores: { v1: 60, v2: 50, v3: 40, v4: 95, labels: ["Mente", "Ação", "Emoção", "Ordem"] }
      }
    }
  },
  qi: {
    title: "Teste de QI",
    slug: "qi",
    apiCode: "QI",
    description: "Avalie sua capacidade lógica e de raciocínio com um teste rápido e objetivo.",
    icon: "🧠",
    color: "amber",
    ctaLabel: "Iniciar Teste de Lógica",
    questions: [],
    results: {
      logico: {
        title: "Mente Estratégica",
        subtitle: "Seu raciocínio é afiado e sequencial.",
        shortDescription: "Você tem facilidade em identificar padrões complexos e sequências numéricas.",
        fullDescription: "Sua mente opera como um processador de alta eficiência, buscando a lógica pura por trás de cada problema.",
        strengths: ["Raciocínio Matemático", "Dedução Lógica", "Foco"],
        attentionPoints: ["Impaciência com ambiguidade"],
        howItWorks: {
          label1: "Foco", val1: "Sequencial",
          label2: "Método", val2: "Dedutivo"
        },
        insights: ["Aplique sua lógica para resolver gargalos operacionais", "Exercite o pensamento lateral"],
        scores: { v1: 95, v2: 60, v3: 30, v4: 80, labels: ["Lógica", "Espacial", "Verbal", "Memória"] }
      },
      pragmatico: {
        title: "Analítico Pragmático",
        subtitle: "Você vê o mundo como ele é.",
        shortDescription: "Sua inteligência é voltada para a solução prática de problemas reais.",
        fullDescription: "Você não se perde em teorias; seu cérebro busca a resposta mais eficiente e aplicável ao mundo real.",
        strengths: ["Senso Comum Avançado", "Objetividade"],
        attentionPoints: ["Ceticismo excessivo"],
        howItWorks: {
          label1: "Foco", val1: "Prático",
          label2: "Método", val2: "Empírico"
        },
        insights: ["Confie nos dados, mas verifique o contexto", "Use sua praticidade para liderar"],
        scores: { v1: 70, v2: 50, v3: 60, v4: 90, labels: ["Lógica", "Espacial", "Verbal", "Memória"] }
      },
      visual: {
        title: "Visionário Espacial",
        subtitle: "Você pensa em imagens e estruturas.",
        shortDescription: "Sua capacidade de manipular objetos mentalmente é superior à média.",
        fullDescription: "Sua inteligência brilha quando é necessário visualizar soluções, mapas e estruturas complexas.",
        strengths: ["Imaginação", "Orientação Espacial"],
        attentionPoints: ["Dispersão"],
        howItWorks: {
          label1: "Foco", val1: "Visual",
          label2: "Método", val2: "Holístico"
        },
        insights: ["Utilize diagramas para explicar suas ideias", "Carreiras em design ou engenharia favorecem seu perfil"],
        scores: { v1: 50, v2: 95, v3: 40, v4: 60, labels: ["Lógica", "Espacial", "Verbal", "Memória"] }
      },
      padrao: {
        title: "Analista de Padrões",
        subtitle: "Nada escapa à sua observação.",
        shortDescription: "Você encontra conexões onde outros veem apenas caos.",
        fullDescription: "Sua mente está sempre buscando a regra oculta que rege os acontecimentos ao seu redor.",
        strengths: ["Intuição Lógica", "Curiosidade"],
        attentionPoints: ["Overthinking"],
        howItWorks: {
          label1: "Foco", val1: "Sistêmico",
          label2: "Método", val2: "Indutivo"
        },
        insights: ["Documente os padrões que você encontra", "Evite procurar significado em coincidências aleatórias"],
        scores: { v1: 80, v2: 70, v3: 70, v4: 50, labels: ["Lógica", "Espacial", "Verbal", "Memória"] }
      }
    }
  }
};
