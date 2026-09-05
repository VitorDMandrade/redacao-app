const EIXOS_MESTRES = [
    {
        nome: "1. Saúde mental/trabalho",
        repertorios: [
            { obra: "Sociedade do Cansaço (Livro)", autor: "Byung-Chul Han", resumo: "Aborda como a cobrança excessiva por produtividade gera doenças como depressão e burnout.", uso: "Excelente para temas de excesso de trabalho, medicalização e esgotamento moderno." },
            { obra: "Modernidade Líquida", autor: "Zygmunt Bauman", resumo: "As relações sociais, incluindo as laborais, tornaram-se fluidas, instáveis e passageiras, gerando ansiedade crônica.", uso: "Uso em temas sobre uberização do trabalho, relações efêmeras e solidão." },
            { obra: "Tempos Modernos (Filme)", autor: "Charles Chaplin", resumo: "Crítica à alienação do trabalho industrial e à coisificação do trabalhador.", uso: "Perfeito para temas sobre precarização do trabalho e perda da humanidade." }
        ]
    },
    {
        nome: "2. Violência/Bullying",
        repertorios: [
            { obra: "Banalidade do Mal (Conceito)", autor: "Hannah Arendt", resumo: "Quando a violência e o erro se tornam sistêmicos, indivíduos comuns param de refletir sobre suas ações, aceitando-as como normais.", uso: "Aplicável à normalização do bullying nas escolas ou violência policial." },
            { obra: "Laranja Mecânica (Filme/Livro)", autor: "Stanley Kubrick / Anthony Burgess", resumo: "Trata da ultraviolência juvenil e dos limites do Estado em condicionar o comportamento humano.", uso: "Temas sobre criminalidade entre jovens e métodos punitivos." },
            { obra: "Foucault e o Panóptico (Conceito)", autor: "Michel Foucault", resumo: "A sociedade atual vigia e pune constantemente, gerando uma auto-vigilância que pode ser opressora.", uso: "Pode ser usado em temas sobre cultura do cancelamento e bullying virtual." }
        ]
    },
    {
        nome: "3. Meio Ambiente",
        repertorios: [
            { obra: "Princípio Responsabilidade (Livro)", autor: "Hans Jonas", resumo: "Afirma que a humanidade tem a obrigação ética de preservar a natureza para garantir a vida das gerações futuras.", uso: "Essencial para qualquer tema ambiental (crise climática, desmatamento)." },
            { obra: "A Queda do Céu (Livro)", autor: "Davi Kopenawa", resumo: "Alerta indígena sobre a destruição da floresta pelos 'homens da mercadoria' (capitalismo predador).", uso: "Temas sobre povos originários, garimpo ilegal e preservação da Amazônia." },
            { obra: "A Era do Capitaloceno (Conceito)", autor: "Jason W. Moore", resumo: "Critica o sistema capitalista como principal motor da degradação ambiental global, focando no lucro acima da vida.", uso: "Agronegócio, descarte de lixo, e priorização do lucro sobre a natureza." },
            { obra: "Ideias para Adiar o Fim do Mundo (Livro)", autor: "Ailton Krenak", resumo: "Critica a ilusão antropocêntrica de separar a humanidade da natureza, denunciando que a conversão dos bens naturais em mercadoria esgota a vida no planeta.", uso: "Uso em temas de crise climática, visão eurocêntrica e desmatamento." },
            { obra: "Wall-E (Animação)", autor: "Pixar", resumo: "Mostra uma Terra inabitável devido ao acúmulo extremo de lixo e ao consumismo desenfreado da humanidade, que precisou fugir para o espaço.", uso: "Perfeito para introduzir temas sobre obsolescência programada, poluição e consumismo." },
            { obra: "Avatar (Filme)", autor: "James Cameron", resumo: "Aborda a exploração predatória de recursos naturais por corporações em detrimento da vida e da cultura de povos nativos.", uso: "Introdução para temas de mineração ilegal, povos originários e ganância corporativa." }
        ]
    },
    {
        nome: "4. Educação",
        repertorios: [
            { obra: "Pedagogia do Oprimido (Livro)", autor: "Paulo Freire", resumo: "Crítica à 'educação bancária' (mera transferência de dados). A educação deve ser emancipadora e formar senso crítico.", uso: "Temas sobre evasão escolar, analfabetismo funcional e reforma do ensino." },
            { obra: "Os Miseráveis (Livro)", autor: "Victor Hugo", resumo: "Ilustra como a miséria e a falta de oportunidades (e educação) empurram o indivíduo para a marginalidade.", uso: "Educação como ferramenta de ressocialização e combate ao crime." },
            { obra: "Constituição Federal de 1988 (Art. 205)", autor: "Assembleia Constituinte", resumo: "A educação é direito de todos e dever do Estado e da família.", uso: "Coringão para introdução de qualquer tema educacional." },
            { obra: "Sociedade dos Poetas Mortos (Filme)", autor: "Peter Weir", resumo: "Um professor usa a poesia para encorajar seus alunos a pensarem por si mesmos e desafiarem as rígidas regras da escola.", uso: "Introdução sobre o papel transformador da escola, metodologias ativas e pensamento crítico." }
        ]
    },
    {
        nome: "5. Preconceito/Racismo",
        repertorios: [
            { obra: "O Mito da Democracia Racial", autor: "Florestan Fernandes", resumo: "Descontrói a ilusão de que no Brasil há convivência harmônica entre as raças, evidenciando o racismo estrutural mascarado.", uso: "Qualquer tema de racismo, desigualdade racial e cotas." },
            { obra: "Quarto de Despejo (Livro)", autor: "Carolina Maria de Jesus", resumo: "Diário de uma mulher negra e favelada, retratando a fome, o racismo e a invisibilidade social.", uso: "Fome, marginalização, racismo estrutural e papel da mulher negra." },
            { obra: "Casa-Grande & Senzala (Livro)", autor: "Gilberto Freyre", resumo: "Obra fundadora sobre a formação do Brasil, mostrando a profunda herança escravocrata nas relações sociais (usar criticamente).", uso: "Heranças históricas do preconceito no país." },
            { obra: "Estrelas Além do Tempo (Filme)", autor: "Theodore Melfi", resumo: "Conta a história real de cientistas negras na NASA que enfrentaram dupla discriminação (raça e gênero) nos anos 60.", uso: "Introdução para temas de invisibilidade, racismo no mercado de trabalho e meritocracia ilusória." }
        ]
    },
    {
        nome: "6. Tecnologia/Fake News",
        repertorios: [
            { obra: "1984 (Livro)", autor: "George Orwell", resumo: "Ilustra o perigo da vigilância extrema e manipulação da verdade através da teletela e do 'Ministério da Verdade'.", uso: "Desinformação, fake news, manipulação de massas pela internet." },
            { obra: "O Dilema das Redes (Documentário)", autor: "Jeff Orlowski", resumo: "O design viciante das redes monetiza a atenção e polariza a sociedade por meio de algoritmos.", uso: "Vício em telas, polarização política online, cyberbullying." },
            { obra: "Simulacros e Simulação", autor: "Jean Baudrillard", resumo: "A mídia e a tecnologia criam uma realidade artificial (hiper-realidade) que substitui o mundo real.", uso: "Filtros de Instagram, vida de aparências, deepfakes." }
        ]
    },
    {
        nome: "7. Invisibilidade/Desigualdade",
        repertorios: [
            { obra: "Cidadania de Papel (Livro)", autor: "Gilberto Dimenstein", resumo: "Mostra como muitos direitos previstos em lei não se aplicam na prática para as classes marginalizadas.", uso: "Excelente para apontar a falha do Estado em garantir direitos básicos." },
            { obra: "Vidas Secas (Livro)", autor: "Graciliano Ramos", resumo: "Retrata a desumanização do sertanejo e a opressão cíclica pela seca e pelo descaso político.", uso: "Fome, pobreza extrema, refugiados climáticos." },
            { obra: "Capitães da Areia (Livro)", autor: "Jorge Amado", resumo: "Meninos de rua marginalizados em Salvador, mostrando como a sociedade prefere punir a acolher.", uso: "Menores infratores, adoção, invisibilidade infantil." },
            { obra: "Parasita (Filme)", autor: "Bong Joon-ho", resumo: "Retrata o abismo social e financeiro entre duas famílias, revelando a falta de mobilidade e a crueldade da estrutura de classes.", uso: "Introdução para desigualdade social, invisibilidade arquitetônica e precarização." }
        ]
    },
    {
        nome: "8. Estado/Política",
        repertorios: [
            { obra: "O Leviatã (Livro)", autor: "Thomas Hobbes", resumo: "O Estado deve ser forte para garantir a paz e evitar a 'guerra de todos contra todos'.", uso: "Quando o Estado falha na segurança pública ou na mediação de conflitos." },
            { obra: "Contrato Social (Conceito)", autor: "Jean-Jacques Rousseau", resumo: "O povo abre mão de parte de sua liberdade em troca da proteção e garantia do bem comum pelo Estado.", uso: "Quebra do contrato social (corrupção, descaso com saúde/educação)." },
            { obra: "Utopia (Livro)", autor: "Thomas More", resumo: "Descreve uma sociedade ideal, organizada e sem desigualdades, que contrasta com as falhas do mundo real.", uso: "Contraste entre o que deveria ser feito politicamente e a realidade." },
            { obra: "Jogos Vorazes (Série)", autor: "Suzanne Collins", resumo: "O governo da Capital explora os distritos pobres e usa a miséria como espetáculo para manter o controle totalitário.", uso: "Introdução para alienação, opressão estatal e negligência social." }
        ]
    }
];

const BANCAS = {
    "ENEM": {
        nome: "ENEM",
        notaMaxima: 1000,
        exigeTitulo: false,
        limiteLinhas: { min: 8, max: 30 },
        generosPermitidos: ['dissertativo'],
        criterios: [
            { id: "c1", nome: "Domínio da Modalidade Escrita Formal", pontuacao: 200, desc: "Avalia a estrutura sintática e os desvios gramaticais/convenções da escrita." },
            { id: "c2", nome: "Compreensão da Proposta e Repertório", pontuacao: 200, desc: "Compreender o tema, adequar-se ao tipo textual e mobilizar repertório sociocultural legitimado e produtivo." },
            { id: "c3", nome: "Seleção, Relação, Organização e Interpretação", pontuacao: 200, desc: "Projeto de texto, consistência da argumentação, defesa do ponto de vista e autoria." },
            { id: "c4", nome: "Conhecimento dos Mecanismos Linguísticos", pontuacao: 200, desc: "Coesão interparágrafos e intraparágrafos, uso de conectivos e adequação vocabular." },
            { id: "c5", nome: "Elaboração de Proposta de Intervenção", pontuacao: 200, desc: "Elaborar proposta com Agente, Ação, Meio/Modo, Efeito/Finalidade e Detalhamento, respeitando os direitos humanos." }
        ],
        orientacoes: "A redação zera se tiver menos de 8 linhas ou fugir totalmente ao tema. Proposta de intervenção completa é obrigatória.",
        resumoPratico: "Priorize a construção de propostas de intervenção detalhadas (5 elementos) e repertórios coringas legitimados. Modelo interventivo-holístico.",
        eixosTematicos: EIXOS_MESTRES
    },
    "UEMA": {
        nome: "UEMA (PAES)",
        notaMaxima: 10.0,
        exigeTitulo: true,
        limiteLinhas: { min: 15, max: 30 },
        generosPermitidos: ['dissertativo'],
        criterios: [
            { id: "c1", nome: "Atendimento ao Tema Proposto", pontuacao: 2.0, desc: "Mede a fidelidade ao recorte temático, punindo abordagens superficiais." },
            { id: "c2", nome: "Atendimento ao Tipo de Texto Proposto", pontuacao: 2.0, desc: "Construção do texto dissertativo-argumentativo e sustentação autoral." },
            { id: "c3", nome: "Coerência dos Argumentos", pontuacao: 2.0, desc: "Consistência lógica da tese e relevância das evidências mobilizadas." },
            { id: "c4", nome: "Coesão entre as Partes do Texto", pontuacao: 2.0, desc: "Mecanismos linguísticos de referenciação e sequenciação." },
            { id: "c5", nome: "Domínio do Padrão Culto Escrito da Língua", pontuacao: 2.0, desc: "Correção sintática, ortográfica, pontuação, regência e concordância." }
        ],
        orientacoes: "Foque na obra literária indicada no edital para embasamento. É essencial fugir de 'repertórios coringas' e 'modelos prontos'. A intervenção social nos moldes do ENEM NÃO é exigida.",
        resumoPratico: "A UEMA é uma banca tradicional que repudia o 'Enemês'. Exige a utilização autoral dos dilemas das obras de leitura obrigatória. O fechamento deve ser uma síntese reflexiva ou crítica, sem propostas de intervenção padronizadas.",
        eixosTematicos: [
            {
                nome: "Filosofia, Existencialismo e Relações Humanas",
                topicos: ["Dilemas como 'viver na igualdade x solidariedade'", "o diálogo nas relações", "conceito de cidadania."]
            },
            {
                nome: "Identidade Cultural e Sociedade",
                topicos: ["Construção da identidade do brasileiro", "o papel do brincar no desenvolvimento humano", "perigos da exposição nas redes virtuais."]
            },
            {
                nome: "Memória e Formação da Identidade",
                topicos: ["Revisitando lembranças do passado para compreender o presente", "apagamento histórico de grupos vulneráveis."]
            },
            {
                nome: "Práticas Autoritaristas e Educação",
                topicos: ["Impactos do autoritarismo e da violência na formação", "contrapondo o medo à construção de autonomia."]
            },
            {
                nome: "Cultura Popular e Tradições Regionais",
                topicos: ["Preservação dos saberes e manifestações populares do Nordeste e do Maranhão diante da era digital."]
            }
        ]
    },
    "EXATO_DISSERTATIVO": {
        nome: "Processo Seletivo Exato (UFT/UFNT) - Dissertativo",
        notaMaxima: 100.0,
        exigeTitulo: false,
        limiteLinhas: { min: 8, max: 30 },
        generosPermitidos: ['dissertativo'],
        criterios: [
            { id: "c1", nome: "Domínio da Norma Culta da Língua Portuguesa", pontuacao: 20, desc: "Fidelidade às convenções gramaticais, precisão vocabular e construção sintática." },
            { id: "c2", nome: "Compreensão do Tema e Estrutura Dissertativa", pontuacao: 20, desc: "Entendimento do tema e cumprimento do gênero discursivo em prosa." },
            { id: "c3", nome: "Seleção, Organização e Interpretação de Argumentos", pontuacao: 20, desc: "Capacidade de formular tese clara e sustentá-la mediante fatos e inferências." },
            { id: "c4", nome: "Mecanismos Linguísticos de Coesão", pontuacao: 20, desc: "Estruturação inter e intraparágrafos com uso variado de conectores." },
            { id: "c5", nome: "Proposta de Intervenção Social", pontuacao: 20, desc: "Exigência de apresentação de uma solução para o problema discutido." }
        ],
        orientacoes: "Nota mínima exigida é 30,0 pontos, senão há desclassificação. A intervenção social é obrigatória no modelo COPESE.",
        resumoPratico: "A banca segue um modelo interventivo-holístico, exigindo uma proposta de intervenção nos moldes do ENEM. O candidato deve focar na clareza da solução social e na articulação textual.",
        eixosTematicos: EIXOS_MESTRES
    },
    "EXATO_CARTA": {
        nome: "Processo Seletivo Exato (UFT/UFNT) - Carta do Leitor",
        notaMaxima: 100.0,
        exigeTitulo: false,
        limiteLinhas: { min: 8, max: 30 },
        generosPermitidos: ['carta'],
        criterios: [
            { id: "c1", nome: "Domínio da Norma Culta da Língua Portuguesa", pontuacao: 20, desc: "Fidelidade às convenções gramaticais, precisão vocabular e construção sintática correta." },
            { id: "c2", nome: "Adequação ao Gênero Epistolar (Carta do Leitor)", pontuacao: 20, desc: "Presença obrigatória de vocativo, corpo argumentativo (Opinião + Argumentação), fechamento e assinatura fictícia. NÃO é carta pessoal." },
            { id: "c3", nome: "Argumentação e Interlocução", pontuacao: 20, desc: "Capacidade de argumentar diretamente com o destinatário (ex: 'Prezados editores') com fatos e exemplos. O autor participa de uma discussão pública, não conta sua vida." },
            { id: "c4", nome: "Mecanismos Linguísticos de Coesão", pontuacao: 20, desc: "Estruturação inter e intraparágrafos, progressão fluida das ideias com conectivos adequados." },
            { id: "c5", nome: "Encaminhamentos e Adequação Social", pontuacao: 20, desc: "Encaminhamento de reflexão ou possível solução adaptada à realidade do interlocutor. Proposta de intervenção NÃO é obrigatória (mas pode ser sugerida como possível solução)." }
        ],
        orientacoes: `📌 CARTA DO LEITOR ≠ CARTA PESSOAL!
— É um gênero argumentativo voltado para discussão pública.
— O autor se manifesta sobre uma notícia, reportagem ou artigo publicado.
— Antes de escrever, faça 3 perguntas: (1) Qual meu papel nessa situação comunicativa? (2) Para quem estou escrevendo? (3) Qual é o assunto?
— O tema será sempre um dos 3 eixos da prova (Meio Ambiente / Tecnologia / Diversidade Cultural).
— Evite introduções genéricas como "Desde o início dos tempos...". Vá direto ao tema com seu posicionamento.
— Não assine seu nome real.`,
        resumoPratico: `ESTRUTURA OBRIGATÓRIA:
I. Introdução → Interlocução + assunto + posicionamento (sua opinião)
II. Desenvolvimento 1 → Argumento + explicação + exemplo/repertório + relação com o tema
III. Desenvolvimento 2 → Segundo argumento + explicação + exemplo/repertório + relação com o tema
IV. Fechamento → Retomada da posição + conclusão/reflexão (ou sugestão de solução)
V. Assinatura → Nome fictício (ex: "Leitor Interessado", "Um Estudante de Palmas")

🧩 MODELO DE PARÁGRAFO DE DESENVOLVIMENTO (4 partes):
→ Parte 1 (Argumento): "Um dos obstáculos à inclusão digital dos idosos é a falta de formação adequada."
→ Parte 2 (Explicação): "Muitas pessoas idosas que não tiveram contato frequente com tecnologias ao longo da vida encontram dificuldades para compreender interfaces e procedimentos digitais."
→ Parte 3 (Exemplo/Repertório): "Isso pode ser observado, por exemplo, na dificuldade enfrentada por parte da população idosa para utilizar aplicativos bancários e serviços públicos digitais."
→ Parte 4 (Amarração): Relate o argumento com o tema e com o posicionamento da introdução.

💡 EXEMPLO DE INTRODUÇÃO REAL:
"Prezados editores, a discussão sobre o acesso da população à tecnologia precisa considerar também as desigualdades sociais que dificultam a inclusão digital."`,
        eixosTematicos: [
            {
                nome: "Eixo 1: Meio ambiente, sustentabilidade, clima e meios de produção",
                repertorios: [
                    { obra: "Agenda 2030 (ONU)", autor: "ONU", resumo: "17 Objetivos de Desenvolvimento Sustentável para erradicar a pobreza e proteger o planeta até 2030.", uso: "Qualquer argumento ambiental que envolva ação global ou políticas públicas." },
                    { obra: "Constituição Federal de 1988", autor: "Assembleia Constituinte", resumo: "Art. 225: todos têm direito ao meio ambiente ecologicamente equilibrado.", uso: "Embasamento jurídico para temas ambientais." },
                    { obra: "Ailton Krenak / Chico Mendes / Milton Santos", autor: "Referências", resumo: "Pensadores brasileiros sobre território, natureza e sustentabilidade.", uso: "Humanização do argumento ambiental com perspectiva nacional." }
                ]
            },
            {
                nome: "Eixo 2: Tecnologia e inovação na sociedade contemporânea",
                repertorios: [
                    { obra: "Pierre Lévy / Castells", autor: "Teóricos", resumo: "Análise da sociedade em rede e do ciberespaço como espaço de participação e exclusão digital.", uso: "Inclusão/exclusão digital, hiperconectividade, algoritmos." },
                    { obra: "Byung-Chul Han / Admirável Mundo Novo", autor: "Referências", resumo: "Crítica à sociedade do desempenho, controle algorítmico e perda da privacidade.", uso: "IA, vigilância digital, vício em telas, desinformação." }
                ]
            },
            {
                nome: "Eixo 3: Diversidade cultural, território, povos originários e comunidades tradicionais",
                repertorios: [
                    { obra: "Ailton Krenak / Darcy Ribeiro", autor: "Autores Brasileiros", resumo: "Defesa da cultura indígena, saberes tradicionais e crítica ao apagamento cultural.", uso: "Povos indígenas, quilombolas, identidade, patrimônio cultural." },
                    { obra: "Convenção 169 da OIT / Constituição Federal (Art. 231)", autor: "Legislação", resumo: "Garantia de direitos territoriais e culturais dos povos originários.", uso: "Base jurídica para argumentos sobre povos indígenas e quilombolas." },
                    { obra: "Estatuto da Igualdade Racial / Estatuto do Índio", autor: "Legislação Brasileira", resumo: "Instrumentos legais de proteção às culturas e identidades de grupos vulneráveis.", uso: "Conflitos fundiários, apagamento cultural, preservação dos modos de vida." }
                ]
            }
        ]
    },
    "UFG": {
        nome: "UFG (Instituto Verbena)",
        notaMaxima: 24.0,
        exigeTitulo: false,
        limiteLinhas: { min: 8, max: 30 },
        generosPermitidos: ['dissertativo'],
        criterios: [
            { id: "c1", nome: "Adequação ao Tema", pontuacao: 9.0, desc: "Apreensão completa do tema e profundidade crítica da discussão, sem tangenciamento." },
            { id: "c2", nome: "Adequação ao Gênero Textual", pontuacao: 5.0, desc: "Domínio da estrutura dissertativo-argumentativa, clareza da tese e articulação dos parágrafos." },
            { id: "c3", nome: "Adequação à Modalidade Escrita", pontuacao: 5.0, desc: "Exame da norma-padrão (correção gramatical, concordância, ortografia)." },
            { id: "c4", nome: "Coesão e Coerência", pontuacao: 5.0, desc: "Continuidade temática, encadeamento lógico e uso correto de articuladores textuais." }
        ],
        orientacoes: "O tema representa 37,5% da nota. Zera-se com nota inferior a 10,0. Rompa com a 'estrutura ENEM': abandone repertórios de bolso, teses prontas e a proposta de intervenção.",
        resumoPratico: "A UFG exige redação madura, autoral e técnica. O desenvolvimento deve seguir o modelo 4/5 (Tópico frasal forte, progressão sociológica, repertório conectado e fechamento crítico). Conclusão deve ser síntese cíclica/reflexiva. O rigor gramatical é o diferencial. Um título criativo e nominalizado atua como um excelente cartão de visitas (2 a 5 palavras).",
        eixosTematicos: EIXOS_MESTRES
    },
    "UNITINS": {
        nome: "UNITINS",
        notaMaxima: 20.0,
        exigeTitulo: true, // Though strictly PDF says 'indicar expressamente a opção do tema demarcado', treating as title/marker requirement is safe
        limiteLinhas: { min: 8, max: 30 },
        generosPermitidos: ['dissertativo'],
        criterios: [
            { id: "c1", nome: "Atendimento ao Tema Proposto", pontuacao: 4.0, desc: "O texto responde a um dos dois temas propostos, evitando tangenciamento." },
            { id: "c2", nome: "Estruturação do Texto e Repertório", pontuacao: 4.0, desc: "Domínio da estrutura em prosa e mobilização de repertório sociocultural pertinente." },
            { id: "c3", nome: "Coerência", pontuacao: 4.0, desc: "Articulação conceitual, consistência lógica da tese e ausência de contradições." },
            { id: "c4", nome: "Coesão Textual", pontuacao: 4.0, desc: "Uso adequado de conectores e pronomes na transição de parágrafos e frases." },
            { id: "c5", nome: "Domínio da Modalidade Escrita Padrão", pontuacao: 4.0, desc: "Ortografia, regência, concordância, descontando rasuras e ilegibilidade." }
        ],
        orientacoes: "Você DEVE marcar o tema escolhido entre as 2 opções da prova. Textos com 7 linhas ou menos são zerados. Evite teses genéricas (ex: negligência estatal) e repertórios de bolso.",
        resumoPratico: "Banca acadêmico-analítica: intervenção não obrigatória. Indique o tema escolhido. Demanda altíssimo rigor com a norma culta, autoria na argumentação e um fechamento crítico ao invés da tradicional proposta do ENEM.",
        eixosTematicos: EIXOS_MESTRES
    }
};
