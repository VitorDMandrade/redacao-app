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
        id: "ENEM",
        nome: "ENEM",
        notaMaxima: 1000,
        exigeTitulo: false,
        limiteLinhas: { min: 8, max: 30 },
        generosPermitidos: ['dissertativo'],
        labelTreino: "Treino por Partes",
        labelFolha: "Folha Oficial ENEM",
        criterios: [
            { id: "c1", nome: "Domínio da Modalidade Escrita Formal", pontuacao: 200, desc: "Avalia a estrutura sintática e os desvios gramaticais/convenções da escrita." },
            { id: "c2", nome: "Compreensão da Proposta e Repertório", pontuacao: 200, desc: "Compreender o tema, adequar-se ao tipo textual e mobilizar repertório sociocultural legitimado e produtivo." },
            { id: "c3", nome: "Seleção, Relação, Organização e Interpretação", pontuacao: 200, desc: "Projeto de texto, consistência da argumentação, defesa do ponto de vista e autoria." },
            { id: "c4", nome: "Conhecimento dos Mecanismos Linguísticos", pontuacao: 200, desc: "Coesão interparágrafos e intraparágrafos, uso de conectivos e adequação vocabular." },
            { id: "c5", nome: "Elaboração de Proposta de Intervenção", pontuacao: 200, desc: "Elaborar proposta com Agente, Ação, Meio/Modo, Efeito/Finalidade e Detalhamento, respeitando os direitos humanos." }
        ],
        orientacoes: "A redação zera se tiver menos de 8 linhas ou fugir totalmente ao tema. Proposta de intervenção completa com os 5 elementos (GOMIFES) é obrigatória.",
        resumoPratico: "Priorize a construção de propostas de intervenção detalhadas (5 elementos: Agente, Ação, Meio/Modo, Detalhamento, Efeito) e repertórios coringas legitimados. Modelo interventivo-holístico.",
        eixosTematicos: EIXOS_MESTRES
    },
    "UEMA": {
        id: "UEMA",
        nome: "UEMA (PAES)",
        notaMaxima: 10.0,
        exigeTitulo: true,
        limiteLinhas: { min: 15, max: 30 },
        generosPermitidos: ['dissertativo'],
        labelTreino: "Treino por Partes",
        labelFolha: "Folha Oficial UEMA",
        criterios: [
            { id: "c1", nome: "Atendimento ao Tema Proposto", pontuacao: 2.0, desc: "Mede a fidelidade ao recorte temático, punindo abordagens superficiais." },
            { id: "c2", nome: "Atendimento ao Tipo de Texto Proposto", pontuacao: 2.0, desc: "Construção do texto dissertativo-argumentativo e sustentação autoral." },
            { id: "c3", nome: "Coerência dos Argumentos", pontuacao: 2.0, desc: "Consistência lógica da tese e relevância das evidências mobilizadas." },
            { id: "c4", nome: "Coesão entre as Partes do Texto", pontuacao: 2.0, desc: "Mecanismos linguísticos de referenciação e sequenciação." },
            { id: "c5", nome: "Domínio do Padrão Culto Escrito da Língua", pontuacao: 2.0, desc: "Correção sintática, ortográfica, pontuação, regência e concordância." }
        ],
        orientacoes: "Foque na obra literária indicada no edital para embasamento. É essencial fugir de 'repertórios coringas' e 'modelos prontos'. Menos de 15 linhas resulta em NOTA ZERO. Título é obrigatório na Linha 1. A intervenção social nos moldes do ENEM NÃO é exigida (conclusão por síntese reflexiva).",
        resumoPratico: "A UEMA é uma banca tradicional que repudia o 'Enemês'. Exige a utilização autoral dos dilemas das obras de leitura obrigatória. O fechamento deve ser uma síntese reflexiva ou crítica, sem propostas de intervenção padronizadas. Título obrigatório na linha 1.",
        eixosTematicos: [
            {
                nome: "Filosofia, Existencialismo e Relações Humanas",
                topicos: ["Dilemas como 'viver na igualdade x solidariedade'", "o diálogo nas relações", "conceito de cidadania."],
                repertorios: [
                    { obra: "Memórias Póstumas de Brás Cubas (Livro)", autor: "Machado de Assis", resumo: "Retrata a hipocrisia das relações sociais burguesas e a primazia do interesse pessoal sobre a solidariedade humana.", uso: "Egoísmo social, fragilidade dos laços humanos e crítica à moral de aparências." },
                    { obra: "Modernidade Líquida (Livro)", autor: "Zygmunt Bauman", resumo: "As relações tornam-se fluidas e mercantilizadas, corroendo a solidariedade e o senso de comunidade.", uso: "Crise do diálogo, solidão moderna e efemeridade das relações afetivas." }
                ]
            },
            {
                nome: "Identidade Cultural e Sociedade",
                topicos: ["Construção da identidade do brasileiro", "o papel do brincar no desenvolvimento humano", "perigos da exposição nas redes virtuais."],
                repertorios: [
                    { obra: "O Povo Brasileiro (Livro)", autor: "Darcy Ribeiro", resumo: "Analisa a gestação étnica e cultural singular do brasileiro a partir do encontro e conflito de matrizes culturais.", uso: "Identidade nacional, miscigenação cultural e diversidade brasileira." },
                    { obra: "Casa-Grande & Senzala (Leitura Crítica)", autor: "Gilberto Freyre", resumo: "Mostra a formação das tradições culturais e as raízes da sociabilidade brasileira a partir do sincretismo.", uso: "Tradições populares, patrimônio cultural e herança histórica." }
                ]
            },
            {
                nome: "Memória e Formação da Identidade",
                topicos: ["Revisitando lembranças do passado para compreender o presente", "apagamento histórico de grupos vulneráveis."],
                repertorios: [
                    { obra: "Recordações do Escrivão Isaías Caminha (Livro)", autor: "Lima Barreto", resumo: "Evidencia os entraves ao reconhecimento social e o preconceito velado contra intelectuais negros e marginalizados.", uso: "Memória histórica, apagamento de vozes periféricas e racismo velado." },
                    { obra: "Quarto de Despejo (Livro)", autor: "Carolina Maria de Jesus", resumo: "Diário de resistência da mulher favelada, denunciando a fome e a invisibilidade sob uma perspectiva de quem viveu a dor.", uso: "Vozes silenciadas, memória social das periferias e desigualdade crônica." }
                ]
            },
            {
                nome: "Práticas Autoritaristas e Educação",
                topicos: ["Impactos do autoritarismo e da violência na formação", "contrapondo o medo à construção de autonomia."],
                repertorios: [
                    { obra: "Pedagogia da Autonomia (Livro)", autor: "Paulo Freire", resumo: "Ensina que a autoridade pedagógica genuína estimula a liberdade e o pensamento crítico, em oposição ao autoritarismo repressivo.", uso: "Educação emancipadora, combate ao medo e formação da autonomia cidadã." },
                    { obra: "Vidas Secas (Livro)", autor: "Graciliano Ramos", resumo: "A incapacidade de expressar seus direitos condena a família sertaneja à submissão perante o autoritarismo das instituições.", uso: "Autoritarismo policial/estatal, desumanização e privação de voz social." }
                ]
            },
            {
                nome: "Cultura Popular e Tradições Regionais",
                topicos: ["Preservação dos saberes e manifestações populares do Nordeste e do Maranhão diante da era digital."],
                repertorios: [
                    { obra: "Manifestações Populares e Resistência Maranhense", autor: "Patrimônio Cultural Imaterial", resumo: "O Bumba Meu Boi e o Tambor de Crioula articulam fé, arte e memória afro-indígena como resistência comunitária viva.", uso: "Preservação da cultura popular, tradições regionais e valorização da memória maranhense." },
                    { obra: "A Chave do Tamanho (Livro)", autor: "Monteiro Lobato", resumo: "Metáfora sobre a fragilidade humana e a necessidade de reexaminar tradições e saberes diante das transformações do mundo.", uso: "Identidade cultural, infância, preservação do brincar e tradição regional." }
                ]
            }
        ]
    },
    "EXATO_DISSERTATIVO": {
        id: "EXATO_DISSERTATIVO",
        nome: "Processo Seletivo Exato (UFT/UFNT) - Dissertativo",
        notaMaxima: 100.0,
        exigeTitulo: false,
        limiteLinhas: { min: 8, max: 30 },
        generosPermitidos: ['dissertativo'],
        labelTreino: "Treino por Partes",
        labelFolha: "Folha Oficial Exato",
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
        id: "EXATO_CARTA",
        nome: "Processo Seletivo Exato (UFT/UFNT) - Carta do Leitor",
        notaMaxima: 100.0,
        exigeTitulo: false,
        limiteLinhas: { min: 8, max: 30 },
        generosPermitidos: ['carta'],
        labelTreino: "Treino de Carta",
        labelFolha: "Folha de Carta Exato",
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
— Não assine seu nome real. Não utilize título.`,
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
        id: "UFG",
        nome: "UFG (Instituto Verbena)",
        notaMaxima: 24.0,
        exigeTitulo: false,
        limiteLinhas: { min: 8, max: 30 },
        generosPermitidos: ['dissertativo'],
        labelTreino: "Treino Modelo 04x05",
        labelFolha: "Folha Oficial UFG",
        criterios: [
            { id: "c1", nome: "Adequação ao Tema", pontuacao: 9.0, desc: "Apreensão completa do tema e profundidade crítica da discussão, sem tangenciamento." },
            { id: "c2", nome: "Adequação ao Gênero Textual", pontuacao: 5.0, desc: "Domínio da estrutura dissertativo-argumentativa, clareza da tese e articulação dos parágrafos." },
            { id: "c3", nome: "Adequação à Modalidade Escrita", pontuacao: 5.0, desc: "Exame da norma-padrão (correção gramatical, concordância, ortografia)." },
            { id: "c4", nome: "Coesão e Coerência", pontuacao: 5.0, desc: "Continuidade temática, encadeamento lógico e uso correto de articuladores textuais." }
        ],
        orientacoes: "O critério de maior peso é Adequação ao Tema (c1 = 9,0 pts / 37,5% da nota). Zera-se com menos de 8 linhas escritas. Desclassificado com nota total inferior a 10,0 pts. Rompa com a 'estrutura ENEM': abandone repertórios de bolso, teses prontas e a proposta de intervenção. Conclusão por síntese circular reflexiva. Um título criativo e nominalizado atua como excelente cartão de visitas.",
        resumoPratico: "A UFG exige redação madura, autoral e técnica. Priorize a profundidade crítica do tema (c1 = 37,5%). O desenvolvimento deve seguir o modelo 4/5 (Tópico frasal forte, progressão sociológica, repertório conectado e fechamento crítico). Conclusão deve ser síntese cíclica/reflexiva (PROIBIDO GOMIFES). Um título criativo e nominalizado atua como um excelente cartão de visitas (2 a 5 palavras).",
        eixosTematicos: EIXOS_MESTRES
    },
    "UNITINS": {
        id: "UNITINS",
        nome: "UNITINS",
        notaMaxima: 20.0,
        exigeTitulo: true,
        limiteLinhas: { min: 25, max: 30 },
        generosPermitidos: ['dissertativo'],
        labelTreino: "Treino por Partes",
        labelFolha: "Folha Oficial UNITINS",
        criterios: [
            { id: "c1", nome: "Domínio da Modalidade Escrita Formal da Língua Portuguesa", pontuacao: 4.0, desc: "Uso adequado da gramática, ortografia, morfossintaxe e pontuação (escala de 0,5 em 0,5; 4,0 = poucos ou nenhum desvio sem impacto na compreensão ou formalidade)." },
            { id: "c2", nome: "Tema e Compreensão", pontuacao: 4.0, desc: "Atendimento ao tema proposto, a partir dos textos motivadores, considerando pertinência, recorte temático e profundidade argumentativa." },
            { id: "c3", nome: "Estrutura (Gênero Dissertativo-Argumentativo)", pontuacao: 4.0, desc: "Organização do texto em introdução com tese clara, desenvolvimento organizado em parágrafos distintos e conclusão coerente e pertinente (sem exigir GOMIFES)." },
            { id: "c4", nome: "Consistência, Progressão Lógica e Autoria (Coerência/Argumentação)", pontuacao: 4.0, desc: "Clareza, fundamentação e progressão lógica com autoria própria (pune predomínio de cópia/paráfrases dos motivadores e generalizações) e adequação/integração do repertório." },
            { id: "c5", nome: "Coesão", pontuacao: 4.0, desc: "Uso expressivo e pertinente de conectivos, pronomes e retomadas que garantam a fluidez e a unidade textual." }
        ],
        orientacoes: "Matriz oficial Edital UNITINS 2027/1–05: 5 critérios de 0,0 a 4,0 em degraus de 0,5 ponto (Total: 20,0 pts). Marque o tema escolhido no campo de título. Extensão oficial nas propostas UNITINS: mínimo de 25 e máximo de 30 linhas. Foco temático em comportamento humano, tendências da atualidade e recortes conceituais, construídos a partir dos textos motivadores (ATENÇÃO: predomínio de cópia ou paráfrase dos textos motivadores reduz C4 para 1,0 pt; generalizações e repertório desconexo reduzem para 2,0 pts). Quando o tema for pergunta, responda diretamente já na tese da introdução e equilibre D1 (Potencial/Avanço) × D2 (Limite/Barreira). Conclusão padrão UNITINS em 3 passos (PROIBIDO modelo GOMIFES do ENEM): Retomada → Síntese da Tensão / Ratificação → Reflexão Final.",
        resumoPratico: "Edital UNITINS 2027/1 (25 a 30 linhas | 20,0 pts em degraus de 0,5): C1 Norma Culta, C2 Tema/Motivadores, C3 Estrutura (Tese + D1/D2 + Conclusão), C4 Consistência/Autoria/Repertório, C5 Coesão. Marque o tema no título. Responda a perguntas temáticas já na tese, evite cópia/paráfrase dos motivadores e estruture em tensão equilibrada (D1 Potencial/Avanço × D2 Limite/Barreira). Conclusão em 3 passos: Retomada → Síntese da Tensão → Reflexão Final (SEM GOMIFES).",
        eixosTematicos: [
            {
                nome: "1. Leitura, Telas e Comportamento Digital (UNITINS)",
                guiaModelo: {
                    tema: "Ler na tela é ler menos?",
                    polaridade: "Ampliação (Potencial) × Superficialidade (Limite)",
                    tesePossivel: "Ler na tela não significa necessariamente ler menos, pois os meios digitais ampliam o acesso a livros, notícias e conteúdos educativos; entretanto, a dinâmica acelerada das plataformas favorece uma leitura fragmentada, prejudicando a concentração e a compreensão aprofundada.",
                    d1: "Potencial (Ampliação): Democratização do acesso via celulares, leitores digitais e bibliotecas virtuais; superação de barreiras geográficas e econômicas.",
                    d2: "Limite (Superficialidade): Fragmentação do ato de ler, excesso de estímulos, rolagens contínuas, menor retenção/compreensão profunda em relação ao papel.",
                    cuidadoTema: "Responda à pergunta já na tese da introdução! Não fique em reflexão filosófica abstrata sem responder no desenvolvimento. O suporte digital não determina sozinho a qualidade da leitura.",
                    conclusao: "1. Retomada (ampliação do acesso × risco de fragmentação) → 2. Ratificação (ler na tela não é ler menos, mas tende à fragmentação) → 3. Reflexão (como transformar acesso em leitura profunda, contínua e crítica)."
                },
                repertorios: [
                    {
                        obra: "Televisão — Titãs (Música)",
                        autor: "Banda Titãs (Composição de Arnaldo Antunes, Marcelo Fromer e Toni Bellotto)",
                        resumo: "A canção critica a influência das telas sobre a percepção, a atenção e os hábitos cotidianos dos indivíduos.",
                        uso: "Permite questionar se o contato constante com conteúdos digitais representa efetivamente mais leitura ou apenas maior exposição a informações rápidas.",
                        frase: "Na canção 'Televisão', a banda brasileira Titãs critica a influência incessante das telas sobre a percepção e os hábitos cotidianos. De maneira análoga, ao discutir se [TEMA], percebe-se que o contato constante com conteúdos digitais nem sempre equivale a leitura crítica, podendo converter-se em mera exposição a estímulos rápidos.",
                        tipo: "intro"
                    },
                    {
                        obra: "A Era do Capitalismo de Vigilância (Livro)",
                        autor: "Shoshana Zuboff",
                        resumo: "As plataformas digitais utilizam dados e mecanismos de recomendação para capturar e reter a atenção do usuário pelo maior tempo possível.",
                        uso: "O ambiente digital disputa permanentemente a atenção do leitor, incentivando cliques, rolagens e leituras breves em lugar do aprofundamento.",
                        frase: "Segundo a socióloga Shoshana Zuboff, em 'A Era do Capitalismo de Vigilância', as plataformas digitais estruturam algoritmos voltados à captura permanente da atenção humana. Sob essa ótica, [TEMA] revela como o incentivo contínuo a cliques e rolagens favorece leituras breves e fragmentadas em detrimento da reflexão aprofundada.",
                        tipo: "intro"
                    },
                    {
                        obra: "Magnifica Humanitas (Encíclica / Reflexão 2026)",
                        autor: "Papa Leão XIV",
                        resumo: "A tecnologia deve ser avaliada pela capacidade de contribuir para o desenvolvimento humano, e não somente pela eficiência ou volume que proporciona.",
                        uso: "A leitura digital deve ser analisada pela qualidade da experiência formativa que oferece, e não apenas pela quantidade de textos disponíveis.",
                        frase: "Sob a perspectiva humanista de Papa Leão XIV, em 'Magnifica Humanitas', a tecnologia deve servir ao desenvolvimento humano integral, e não apenas à eficiência mecânica. Aplicado a [TEMA], esse princípio evidencia que a leitura em suportes digitais deve ser avaliada pela qualidade da experiência formativa, e não só pelo volume de textos acessados.",
                        tipo: "dev"
                    },
                    {
                        obra: "Meio Técnico-Científico-Informacional (Conceito)",
                        autor: "Milton Santos",
                        resumo: "A técnica e a informação passaram a organizar as relações sociais, o território e a circulação do conhecimento.",
                        uso: "D1 (Potencial): Celulares, leitores digitais e bibliotecas virtuais tornam livros, artigos e materiais educativos mais acessíveis, superando barreiras geográficas e econômicas.",
                        frase: "De acordo com o geógrafo brasileiro Milton Santos, o meio técnico-científico-informacional reorganiza a circulação do conhecimento por meio da técnica. No debate sobre [TEMA], nota-se o potencial democratizante das telas, visto que celulares e acervos virtuais ampliam o acesso a livros e artigos, superando barreiras geográficas e econômicas.",
                        audio: "arquivos de audio para repertório/Milton_Santos_e_a_cidadania_pelo_CEP.m4a",
                        tipo: "dev"
                    },
                    {
                        obra: "ODS 4 — Educação de Qualidade (Agenda 2030 / ONU)",
                        autor: "Organização das Nações Unidas (ONU)",
                        resumo: "Defende uma educação inclusiva, equitativa e capaz de ampliar oportunidades de aprendizagem ao longo da vida.",
                        uso: "D1 (Potencial): Recursos digitais democratizam o acesso à leitura quando escolas e bibliotecas oferecem dispositivos, conectividade e orientação.",
                        frase: "Em consonância com o Objetivo de Desenvolvimento Sustentável 4 da ONU, garantir educação inclusiva requer ampliar oportunidades concretas de aprendizagem. Nesse sentido, diante de [TEMA], ferramentas digitais tornam-se aliadas da formação de leitores quando integradas a conectividade, acesso a dispositivos e mediação pedagógica.",
                        tipo: "dev"
                    },
                    {
                        obra: "Sociedade do Desempenho / Cansaço (Livro)",
                        autor: "Byung-Chul Han",
                        resumo: "Analisa uma sociedade marcada pela aceleração, pelo excesso de estímulos e pela necessidade de permanecer continuamente ativo.",
                        uso: "D2 (Limite): Notificações, múltiplas abas e alternância constante de conteúdos dificultam a concentração necessária para a leitura prolongada e reflexiva.",
                        frase: "Conforme o filósofo Byung-Chul Han analisa em 'Sociedade do Cansaço', a hiperaceleração e o excesso de estímulos corroem a atenção contemplativa. No tocante a [TEMA], notificações constantes e alternância de abas dificultam o foco sustentado, tornando a leitura em tela mais fragmentada e superficial.",
                        audio: "arquivos de audio para repertório/Sociedade_do_Cansaço_na_redação_do_ENEM.m4a",
                        tipo: "dev"
                    },
                    {
                        obra: "Dados: Retratos da Leitura (6ª ed.) & Nielsen BookData (2026)",
                        autor: "Instituto Pró-Livro / USP / Nielsen BookData",
                        resumo: "53% dos brasileiros são não leitores (1ª vez maioria), mas 49% tiveram contato com leitura digital e 18 milhões passaram a ler mais no formato; a maior barreira é comportamental (vídeos/redes).",
                        uso: "Excelente para sustentar simultaneamente D1 (crescimento do consumo digital, sobretudo via celular) e D2 (fragmentação e competição com redes sociais).",
                        frase: "Segundo levantamentos recentes como 'Retratos da Leitura no Brasil' e a pesquisa Nielsen BookData, embora milhões de brasileiros tenham ampliado seu contato com textos via celular, a maioria da população ainda declara não ler livros com frequência, impactada pela competição com vídeos curtos e redes sociais.",
                        tipo: "dev"
                    }
                ]
            },
            {
                nome: "2. Representatividade Feminina e Democracia (UNITINS)",
                guiaModelo: {
                    tema: "Representatividade feminina e democracia no Brasil",
                    polaridade: "Avanço Democrático (D1) × Limites Persistentes (D2)",
                    tesePossivel: "Embora o Brasil tenha ampliado os mecanismos institucionais de incentivo à participação feminina e registrado crescimento da presença de mulheres no Congresso, a representatividade política ainda encontra limites na sub-representação e na permanência de obstáculos que tornam desigual o acesso feminino aos espaços de decisão.",
                    d1: "Avanço democrático (D1): Queda histórica de barreiras jurídicas, cota de 30% a 70% de candidaturas (Lei 12.034/2009), ampliação da bancada feminina (109 deputadas em 2026, ~21% da Câmara) e pluralidade de perspectivas.",
                    d2: "Limites persistentes (D2): Igualdade formal ≠ igualdade efetiva; barreiras partidárias, queda de 24% nas candidaturas femininas e violência política de gênero (177 processos no TSE em 2026).",
                    cuidadoTema: "Não reduza o tema a 'machismo genérico' nem a 'violência contra a mulher em geral': o recorte é representatividade política, participação democrática e violência política de gênero. Lembre também que mais mulheres eleitas não significa uniformidade ideológica.",
                    conclusao: "1. Retomada (representatividade feminina e qualidade democrática) → 2. Síntese da Tensão (avanços legais existem, mas a presença no poder segue baixa e cercada de obstáculos) → 3. Reflexão (representatividade envolve acesso, presença, permanência e condições reais de disputa)."
                },
                repertorios: [
                    {
                        obra: "Voto Feminino — Código Eleitoral de 1932",
                        autor: "Marco Histórico Brasileiro (Decreto nº 21.076/1932)",
                        resumo: "Conquista histórica que inaugurou a cidadania política formal das mulheres no Brasil.",
                        uso: "Contrastar a longa trajetória de conquista formal da cidadania política com a persistente sub-representação atual nos espaços de poder.",
                        frase: "Desde a conquista do voto feminino pelo Código Eleitoral de 1932, o Brasil deu passos decisivos rumo à ampliação da cidadania política das mulheres. Contudo, ao analisar [TEMA], nota-se que a igualdade jurídica conquistada ao longo do século XX ainda não se traduziu em paridade efetiva nos espaços de decisão.",
                        tipo: "intro"
                    },
                    {
                        obra: "Bertha Lutz e a Cidadania Política Feminina",
                        autor: "Bióloga, ativista e deputada federal brasileira",
                        resumo: "Liderança central na luta pelo sufrágio feminino e pela participação política das mulheres nas instituições brasileiras.",
                        uso: "Demonstrar a participação política como resultado de processo histórico contínuo, ainda inconcluso na efetivação de condições iguais.",
                        frase: "A atuação histórica de Bertha Lutz na defesa do sufrágio e da presença feminina no Parlamento evidencia que a participação política das mulheres decorre de um processo contínuo de reivindicação democrática. Sob essa ótica, o debate sobre [TEMA] expõe a necessidade de superar barreiras institucionais que ainda restringem o alcance desse legado.",
                        tipo: "intro"
                    },
                    {
                        obra: "Constituição Federal de 1988 — Igualdade Jurídica",
                        autor: "Assembleia Nacional Constituinte",
                        resumo: "Consagra a igualdade jurídica entre homens e mulheres e o princípio democrático como fundamentos da República.",
                        uso: "Contrastar a igualdade formal garantida pela lei (como as cotas eleitorais) com a desigualdade concreta de representação e acesso.",
                        frase: "Embora a Constituição Federal de 1988 assegure a igualdade jurídica entre homens e mulheres e a legislação eleitoral estabeleça cotas mínimas de candidaturas, a realidade em torno de [TEMA] revela o descompasso entre o direito formal de concorrer e a existência de condições efetivas de disputa.",
                        tipo: "dev"
                    },
                    {
                        obra: "Hannah Arendt — Espaço Público e Participação",
                        autor: "Filósofa e teórica política alemã",
                        resumo: "Valoriza a presença ativa, a pluralidade e a participação plural dos indivíduos no espaço público como essência da política democrática.",
                        uso: "Discutir a exclusão ou restrição da presença feminina e demonstrar que a democracia não se reduz ao ato de votar, exigindo pluralidade de vozes nas decisões.",
                        frase: "Para a filósofa política Hannah Arendt, a vitalidade da esfera pública depende da presença plural e da atuação livre dos cidadãos nas decisões coletivas. Aplicada a [TEMA], essa concepção demonstra que a democracia não se esgota no ato de votar, sendo empobrecida sempre que barreiras partidárias ou a violência política restringem a permanência das mulheres no poder.",
                        tipo: "dev"
                    },
                    {
                        obra: "Dados TSE & Câmara dos Deputados (2026)",
                        autor: "TSE / Câmara dos Deputados / Agência Brasil",
                        resumo: "Bancada feminina chegou a 109 deputadas (~21% de 513 cadeiras), mas houve queda de 24% nas candidaturas e alta de 127% nos processos de violência política de gênero no TSE.",
                        uso: "Sustentar com dados precisos a tensão entre o avanço numérico no Legislativo e a persistência de obstáculos concretos na disputa eleitoral.",
                        frase: "Dados da Câmara dos Deputados e do Tribunal Superior Eleitoral ilustram essa dualidade: conquanto a presença feminina no Legislativo tenha alcançado seu maior patamar histórico com 109 deputadas eleitas, o recuo no total de candidaturas e o aumento dos registros de violência política de gênero evidenciam entraves estruturais à igualdade democrática.",
                        tipo: "dev"
                    }
                ]
            },
            {
                nome: "3. Dinheiro Rápido, Juventude e Plataformas (UNITINS)",
                guiaModelo: {
                    tema: "Dinheiro rápido: oportunidade ou ilusão para os jovens?",
                    perguntaGuia: "A busca pelo dinheiro rápido pode representar uma oportunidade real para os jovens ou se transformar em uma ilusão?",
                    polaridade: "Novas Oportunidades de Renda (D1 · Potencial) × Ilusão do Enriquecimento Fácil (D2 · Limite)",
                    conceitosChave: "Oportunidade real (exige planejamento e trabalho) × Promessa fácil (pode ocultar riscos)",
                    tesePossivel: "As novas possibilidades digitais de geração de renda podem favorecer a autonomia financeira juvenil e o empreendedorismo, mas a promessa de enriquecimento fácil por meio de apostas e atalhos ilusórios também apresenta riscos severos aos projetos de futuro.",
                    d1: "Potencial (Novas oportunidades de renda): A tecnologia e a internet ampliam alternativas legítimas de trabalho, comércio eletrônico, serviços digitais e autonomia financeira fora de trajetórias convencionais.",
                    d2: "Limite (A ilusão do dinheiro fácil): Histórias de sucesso artificiais e promessas imediatistas estimulam decisões arriscadas, como apostas digitais, comprometendo a educação e o futuro (34% da ABMES).",
                    cuidadoTema: "Mantenha os dois desenvolvimentos focados no recorte da JUVENTUDE. Não generalize em extremos: não afirme que todo jovem que busca renda digital está iludido; diferencie oportunidade real (que exige planejamento e trabalho) de promessa fácil.",
                    conclusao: "1. Retomada (posição equilibrada sobre dinheiro rápido e juventude) → 2. Síntese (oportunidades legítimas × riscos das ilusões) → 3. Reflexão (equilíbrio entre autonomia financeira digital e planejamento sustentável frente a expectativas irreais)."
                },
                repertorios: [
                    {
                        obra: "O Choque do Futuro (Livro)",
                        autor: "Alvin Toffler",
                        resumo: "As rápidas transformações tecnológicas e sociais modificam o cotidiano, as formas de trabalho e exigem adaptação constante dos indivíduos.",
                        uso: "Contextualizar na introdução as mudanças aceleradas na maneira de trabalhar e gerar renda com a mediação da tecnologia.",
                        frase: "Em 'O Choque do Futuro', o escritor norte-americano Alvin Toffler analisa como a velocidade das inovações tecnológicas transforma profundamente as relações cotidianas e de trabalho. Nesse horizonte, ao avaliar [TEMA], observa-se que a economia digital reconfigura as vias de ganho financeiro dos jovens, oscilando entre novas formas de autonomia e a atração por atalhos ilusórios.",
                        audio: "arquivos de audio para repertório/Choque_do_Futuro_na_Redação_do_ENEM.m4a",
                        tipo: "intro"
                    },
                    {
                        obra: "Alone Together (Livro)",
                        autor: "Sherry Turkle",
                        resumo: "Investiga como a mediação tecnológica altera o comportamento humano, gerando vínculos mais imediatos, performáticos e vulneráveis à validação digital.",
                        uso: "Explicar na introdução ou D2 como a exibição contínua de estilos de vida e sucesso instantâneo nas redes molda expectativas juvenis irreais.",
                        frase: "A socióloga Sherry Turkle, em 'Alone Together', adverte que a mediação intensa das telas reconfigura expectativas sociais e comportamentais. Transposta essa análise para [TEMA], nota-se que a vitrine constante de enriquecimento instantâneo nas redes estimula jovens a confundirem performance digital com prosperidade sólida.",
                        tipo: "intro"
                    },
                    {
                        obra: "Texto I — Bernardo Soares (Visibilidade e Retorno Digital)",
                        autor: "Bernardo Soares (Coletânea Guia UNITINS)",
                        resumo: "As redes sociais podem gerar visibilidade, alcance comercial e retorno financeiro fora das trajetórias profissionais convencionais.",
                        uso: "D1 (Potencial): Fundamentar como as redes e o comércio digital ampliam alternativas legítimas de renda e autonomia juvenil quando há trabalho planejado.",
                        frase: "Como destaca Bernardo Soares ao analisar as novas dinâmicas digitais, as redes sociais podem gerar visibilidade e retorno financeiro fora das trajetórias convencionais. Diante de [TEMA], essa possibilidade amplia a autonomia econômica de jovens que utilizam o ambiente virtual para vender produtos e prestar serviços com planejamento.",
                        tipo: "dev"
                    },
                    {
                        obra: "ODS 8 — Trabalho Decente e Crescimento Econômico (Agenda 2030)",
                        autor: "Organização das Nações Unidas (ONU)",
                        resumo: "A Agenda 2030 da ONU defende ampliar oportunidades de trabalho digno, produtivo e empreendedorismo sustentável, especialmente para jovens.",
                        uso: "D1 (Potencial): Fundamentar como o comércio eletrônico, a prestação de serviços digitais e o trabalho online planejado podem gerar autonomia financeira juvenil.",
                        frase: "Sob a diretriz do Objetivo de Desenvolvimento Sustentável 8 da Agenda 2030 da ONU, a promoção de trabalho digno e empreendedorismo produtivo constitui pilar da autonomia juvenil. No contexto de [TEMA], plataformas de comércio eletrônico e serviços digitais representam oportunidades concretas de renda quando associadas a capacitação e planejamento.",
                        tipo: "dev"
                    },
                    {
                        obra: "Sociedade do Cansaço (Livro)",
                        autor: "Byung-Chul Han",
                        resumo: "A cobrança permanente por desempenho, visibilidade e sucesso rápido leva à exaustão e à busca desesperada por resultados imediatos.",
                        uso: "D2 (Limite): Explicar a pressão social sentida pelos jovens para alcançar sucesso financeiro cada vez mais cedo, subestimando riscos de promessas fáceis.",
                        frase: "Segundo o filósofo Byung-Chul Han, em 'Sociedade do Cansaço', a cobrança incessante por desempenho e sucesso precoce submete o indivíduo contemporâneo a uma lógica de urgência permanente. Diante de [TEMA], essa pressão impulsiona jovens a buscar atalhos financeiros imediatistas, subestimando os riscos de endividamento e frustração.",
                        audio: "arquivos de audio para repertório/Sociedade_do_Cansaço_na_redação_do_ENEM.m4a",
                        tipo: "dev"
                    },
                    {
                        obra: "Economia de Plataformas e Automação (Yanis Varoufakis / Yuval Noah Harari)",
                        autor: "Yanis Varoufakis / Yuval Noah Harari",
                        resumo: "Analisam a centralidade dos aplicativos, das plataformas algorítmicas e da automação na reconfiguração do trabalho e da renda no século XXI.",
                        uso: "Aprofundar a transição do emprego tradicional para a economia mediada por plataformas e os desafios da precarização e instabilidade para os jovens.",
                        frase: "Como analisam pensadores contemporâneos a exemplo de Yanis Varoufakis e Yuval Noah Harari, o avanço das plataformas digitais e da automação altera radicalmente as formas tradicionais de remuneração. No debate sobre [TEMA], essa reconfiguração amplia iniciativas independentes na rede, mas também expõe jovens à instabilidade e à sedução de ganhos especulativos.",
                        tipo: "dev"
                    },
                    {
                        obra: "Pesquisa ABMES (2026) — Apostas x Graduação",
                        autor: "Associação Brasileira de Mantenedoras de Ensino Superior (ABMES)",
                        resumo: "34% dos entrevistados afirmaram que precisariam interromper os gastos com apostas para conseguir iniciar uma graduação em 2026.",
                        uso: "D2 (Limite): Dado concreto mostrando como a promessa de ganho imediato em apostas compromete projetos educacionais e profissionais futuros dos jovens.",
                        frase: "Essa vulnerabilidade é corroborada por levantamento da ABMES, segundo o qual 34% dos entrevistados apontaram a necessidade de interromper gastos com apostas para viabilizar o ingresso no ensino superior — evidência clara de como a ilusão do retorno imediato compromete projetos formativos de longo prazo.",
                        tipo: "dev"
                    }
                ]
            },
            {
                nome: "4. Solidão Acompanhada e Máquinas que Conversam (UNITINS)",
                guiaModelo: {
                    tema: "A solidão acompanhada na era das máquinas que conversam",
                    perguntaGuia: "A inteligência artificial pode aliviar a solidão sem substituir as relações humanas?",
                    polaridade: "Acolhimento e Companhia Virtual (D1 · Potencial) × Substituição dos Vínculos Humanos (D2 · Limite)",
                    conceitosChave: "Companhia virtual (sistemas que simulam conversas e respostas acolhedoras) × Vínculo humano (reciprocidade, convivência e experiências compartilhadas)",
                    textosMotivadores: [
                        "Texto I (Sedigi/MJSP & Unicef): apps de AI Companions subiram de 16 (2022) para 128 (jul/2025), com 60 milhões de downloads no 1º sem/2025 e 72% dos adolescentes nos EUA (13–17); riscos de apego intenso, uso compulsivo, coleta de dados íntimos, privação de sono e queda escolar.",
                        "Texto II (CNN Brasil / Locomotiva): 60% relatam alívio na sensação de solidão, 30% já choraram com IA e 58% revelaram segredos inéditos (72% entre jovens de 18 a 24 anos). Nota crítica: relato de percepção, não prova de benefício duradouro.",
                        "Texto III (Jornal da USP / Glauco Arbix): 'Chatbot não é um amigo, é um robô'; usuários frequentes relatam vazio ainda maior; IA deve servir ao ser humano com senso crítico, supervisão e responsabilidade, sem substituir amizades recíprocas."
                    ],
                    tesePossivel: "A inteligência artificial apresenta potencial para amenizar momentaneamente a sensação de solidão ao oferecer escuta acessível e sem julgamento, mas seu uso como substituta das relações humanas pode comprometer vínculos afetivos autênticos e agravar o isolamento.",
                    d1: "Potencial (Acolhimento e companhia virtual): Disponível a qualquer hora e sem julgamento, a IA oferece espaço imediato de desabafo e alívio emocional percebido (60% na pesquisa CNN/Locomotiva; 72% dos jovens de 18 a 24 anos já confiaram questões íntimas à ferramenta).",
                    d2: "Limite (Substituição dos vínculos humanos): O apego intenso e a dependência emocional de máquinas ocupam o espaço da escuta cotidiana presencial, fragilizam o bem-estar e ampliam o vazio entre usuários frequentes (Sedigi/MJSP e Jornal da USP).",
                    cuidadoTema: "Tema com abordagem metafórica/paradoxo argumentativo ('solidão acompanhada') + recorte contextual ('máquinas que conversam'): os textos motivadores dão o direcionamento objetivo e cabe a você delimitar a tese. Diferencie sensação de companhia × reciprocidade humana e NÃO afirme que toda interação com IA causa dependência. Proposta de intervenção é opcional (use apenas reflexão crítica / conscientização social, sem receita GOMIFES).",
                    conclusao: "1. Retomada (sua posição sobre a IA como companhia) → 2. Síntese da Tensão (acolhimento momentâneo × limites da substituição dos laços) → 3. Reflexão Final (receber respostas simuladas × construir relações recíprocas; uso responsável e conscientização social opcional, SEM GOMIFES)."
                },
                repertorios: [
                    {
                        obra: "O Choque do Futuro (Livro)",
                        autor: "Alvin Toffler",
                        resumo: "A rapidez das transformações tecnológicas modifica comportamentos cotidianos, redefine vínculos e exige adaptação psíquica e social constante.",
                        uso: "Introdução: Mostrar que a velocidade da inovação fez a inteligência artificial deixar de ser apenas ferramenta técnica para participar de experiências emocionais.",
                        frase: "Em 'O Choque do Futuro', Alvin Toffler adverte que a aceleração tecnológica reconfigura rapidamente os hábitos e exige adaptação psíquica dos indivíduos. Ao analisar [TEMA], percebe-se que as máquinas deixaram de cumprir apenas funções técnicas para mediar também o desabafo e as experiências emocionais cotidianas.",
                        audio: "arquivos de audio para repertório/Choque_do_Futuro_na_Redação_do_ENEM.m4a",
                        tipo: "intro"
                    },
                    {
                        obra: "Alone Together — Sozinhos Juntos (Livro)",
                        autor: "Sherry Turkle",
                        resumo: "Analisa como as tecnologias interativas criam a sensação de companhia constante sem exigir a reciprocidade nem a vulnerabilidade das relações humanas profundas.",
                        uso: "Introdução ou D1: Explicar o paradoxo da 'solidão acompanhada' e por que as pessoas procuram máquinas disponíveis e sem julgamento para expressar sentimentos.",
                        frase: "Na obra 'Alone Together', a socióloga Sherry Turkle sintetiza o paradoxo contemporâneo em que a tecnologia simula proximidade afetiva sem sustentar vínculos humanos profundos. Sob essa perspectiva, [TEMA] expõe a tensão entre o alívio imediato propiciado por assistentes conversacionais e o risco de esvaziamento da convivência recíproca.",
                        tipo: "intro"
                    },
                    {
                        obra: "Pesquisa CNN Brasil / Instituto Locomotiva (Texto II · Coletânea)",
                        autor: "CNN Brasil / Instituto Locomotiva (Álvaro Machado Dias)",
                        resumo: "60% relatam redução da sensação de solidão ao conversar com IA, 30% já choraram nessas interações e 58% revelaram segredos inéditos — índice que sobe para 72% entre jovens de 18 a 24 anos.",
                        uso: "D1 (Potencial): Embasar a percepção de acolhimento imediato e sem julgamento, lembrando que se trata de relato de percepção momentânea, não prova de benefício duradouro.",
                        frase: "Levantamento conduzido pela CNN Brasil e pelo Instituto Locomotiva indica que 60% dos participantes percebem alívio momentâneo da solidão ao dialogar com sistemas de inteligência artificial, enquanto 72% dos jovens adultos já confiaram confidências à máquina — dado que evidencia o acolhimento imediato como percepção subjetiva, embora sem comprovar benefício afetivo duradouro.",
                        tipo: "dev"
                    },
                    {
                        obra: "Sociedade do Cansaço (Livro)",
                        autor: "Byung-Chul Han",
                        resumo: "A cobrança incessante por desempenho e o esgotamento contemporâneo levam o sujeito a evitar atritos relacionais e buscar interações imediatas e confortáveis.",
                        uso: "D2 (Limite): Explicar por que indivíduos esgotados substituem a paciência exigida pelo convívio humano pela disponibilidade ininterrupta e complacente das máquinas.",
                        frase: "Segundo o filósofo Byung-Chul Han, em 'Sociedade do Cansaço', o esgotamento decorrente da cobrança contínua enfraquece a disposição para lidar com a alteridade e o atrito próprios dos encontros humanos. Nesse cenário, [TEMA] revela como a busca por respostas imediatas e acríticas em chatbots pode substituir gradualmente a escuta cotidiana de familiares e amigos.",
                        audio: "arquivos de audio para repertório/Sociedade_do_Cansaço_na_redação_do_ENEM.m4a",
                        tipo: "dev"
                    },
                    {
                        obra: "Nota Técnica Sedigi/MJSP & Relatório Unicef (Texto I · Coletânea)",
                        autor: "Secretaria Nacional de Direitos Digitais (MJSP) / Unicef",
                        resumo: "Apps de AI Companions saltaram de 16 (2022) para 128 (jul/2025), com 60 milhões de downloads no 1º sem/2025 e adesão de 72% dos adolescentes nos EUA; aponta apego intenso, uso compulsivo e distanciamento presencial.",
                        uso: "D2 (Limite): Demonstrar com rigor institucional os riscos da dependência emocional, coleta excessiva de dados íntimos e prejuízos escolares e presenciais entre jovens.",
                        frase: "Conforme aponta nota técnica da Secretaria Nacional de Direitos Digitais do Ministério da Justiça, amparada em dados do Unicef, a multiplicação acelerada dos aplicativos de companhia artificial — que atingiram 60 milhões de downloads em apenas um semestre — associa-se a riscos concretos de apego compulsivo, privação de sono e afastamento das relações presenciais.",
                        tipo: "dev"
                    },
                    {
                        obra: "Jornal da USP / Glauco Arbix — 'Chatbot não é um amigo, é um robô' (Texto III)",
                        autor: "Jornal da USP / Prof. Glauco Arbix",
                        resumo: "Destaca aumento da solidão e sensação de vazio em usuários frequentes de chatbots, defendendo senso crítico, supervisão e consciência de que a IA não substitui amizades recíprocas.",
                        uso: "D2 (Limite) / Conclusão: Contrabalancear a ilusão de amizade artificial e defender a necessidade de conscientização social e uso crítico a serviço do ser humano.",
                        frase: "Em análise divulgada pelo Jornal da USP, o pesquisador Glauco Arbix adverte que interações artificiais recorrentes não substituem a reciprocidade das amizades e tendem a ampliar o vazio emocional em usuários frequentes. Logo, o enfrentamento de [TEMA] demanda senso crítico e conscientização social para manter a tecnologia a serviço do humano, e não no lugar de seus vínculos.",
                        tipo: "dev"
                    }
                ]
            },
            {
                nome: "5. Comportamento Humano, Risco e Sociedade Contemporânea (UNITINS)",
                guiaModelo: {
                    tema: "Recortes Filosóficos e Tendências da Atualidade (Perfil UNITINS)",
                    polaridade: "Progresso / Realidade Contemporânea × Riscos Éticos / Impactos Humanos",
                    tesePossivel: "Use a abordagem dialética característica da UNITINS: reconheça os avanços ou nuances legítimas do fenômeno no D1 e problematize os limites éticos, comportamentais ou sociais no D2, encerrando com Retomada → Síntese da Tensão → Reflexão.",
                    d1: "Avalie as contribuições, a relevância ou os avanços reais do fenômeno analisado, fundamentando com autores humanos ou marcos históricos.",
                    d2: "Problematize os efeitos colaterais, as desigualdades na exposição ao risco ou as contradições comportamentais sem cair em extremismos.",
                    cuidadoTema: "A UNITINS costuma cobrar tendências contemporâneas e dilemas humanos/conceituais (diferentes do recorte estrito de vulnerabilidade social do ENEM). Leia atentamente os textos motivadores e mantenha rigor conceitual.",
                    conclusao: "Fórmula de Ouro UNITINS: 1. Retomada do tema e da tese → 2. Síntese equilibrada da tensão (D1 × D2) → 3. Reflexão final prospectiva (SEM intervenção GOMIFES)."
                },
                repertorios: [
                    {
                        obra: "Sociedade de Risco (Livro)",
                        autor: "Ulrich Beck",
                        resumo: "Demonstra que a modernidade tardia produz riscos globais (climáticos, tecnológicos, sanitários e financeiros) que afetam os grupos sociais de forma desigual.",
                        uso: "Temas sobre eventos climáticos, impactos tecnológicos, saúde pública e vulnerabilidade desigual diante de crises contemporâneas.",
                        frase: "Para o sociólogo alemão Ulrich Beck, na obra 'Sociedade de Risco', a modernidade avançada gera ameaças sistêmicas cujos impactos se distribuem de maneira profundamente desigual. Sob esse prisma, a análise de [TEMA] evidencia que inovações e crises contemporâneas produzem benefícios concentrados, mas transferem seus riscos mais severos às parcelas desprotegidas.",
                        tipo: "intro"
                    },
                    {
                        obra: "A Vida Não É Útil (Livro)",
                        autor: "Ailton Krenak",
                        resumo: "Critica a sociedade que reduz a existência humana à utilidade produtiva, à eficiência incessante e ao lucro, apagando o sentido reflexivo e comunitário da vida.",
                        uso: "Saúde mental, redes sociais (existir para consumir/ser visto), meio ambiente, trabalho e invisibilidade de grupos não vistos como 'úteis'.",
                        frase: "Em 'A Vida Não É Útil', o pensador indígena brasileiro Ailton Krenak critica a racionalidade contemporânea que reduz o valor da existência humana à utilidade produtiva e ao consumo. Essa reflexão ilumina [TEMA], revelando que a subordinação dos hábitos e do tempo humano à lógica da performance corrói o equilíbrio psíquico e coletivo.",
                        audio: "arquivos de audio para repertório/Ailton_Krenak_na_Redação_do_ENEM.m4a",
                        tipo: "dev"
                    },
                    {
                        obra: "Laudato Si' (Encíclica, 2015 — § 138)",
                        autor: "Papa Francisco",
                        resumo: "Sustenta o princípio da ecologia integral ('tudo está interligado'), unindo degradação ambiental, desigualdade social, hábitos de consumo e dignidade humana.",
                        uso: "Temas socioambientais, adaptação climática, consumo consciente e responsabilidade intergeracional.",
                        frase: "Na encíclica 'Laudato Si'', o pontífice Papa Francisco sintetiza o princípio da ecologia integral ao afirmar que 'tudo está interligado'. Ao examinar [TEMA], percebe-se que as escolhas econômicas e comportamentais da atualidade impactam simultaneamente o equilíbrio ambiental e a dignidade das populações mais vulneráveis.",
                        tipo: "dev"
                    },
                    {
                        obra: "Sobre o Autoritarismo Brasileiro (Livro)",
                        autor: "Lilia Schwarcz",
                        resumo: "Explica como heranças históricas de desigualdade, patrimonialismo e discriminação estrutural persistem naturalizadas nas relações sociais e institucionais.",
                        uso: "Temas de cidadania, racismo estrutural, desigualdades persistentes e desafios à cultura democrática no Brasil.",
                        frase: "A historiadora e antropóloga Lilia Schwarcz, em 'Sobre o Autoritarismo Brasileiro', demonstra que estruturas históricas de hierarquia e exclusão tendem a se naturalizar no cotidiano institucional. Sob essa ótica, [TEMA] reflete entraves culturais profundos que ainda limitam a consolidação de práticas plenamente democráticas e igualitárias.",
                        tipo: "dev"
                    }
                ]
            }
        ]
    }
};

// Exportação universal: Navegador (window) e Node.js (module.exports)
if (typeof window !== 'undefined') {
    window.BANCAS = BANCAS;
    window.EIXOS_MESTRES = EIXOS_MESTRES;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BANCAS;
    module.exports.BANCAS = BANCAS;
    module.exports.EIXOS_MESTRES = EIXOS_MESTRES;
}
