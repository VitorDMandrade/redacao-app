// Compêndio de Repertórios Socioculturais (33 Obras Fundamentais + Áudios de Resumo)
// Organizado segundo os 5 Blocos Analíticos do Guia Analítico para Redação.

const BLOCO_1_FILOSOFIA = [
    {
        obra: "THEODOR ADORNO — A INDÚSTRIA CULTURAL (1947)",
        autor: "Filósofo e teórico crítico alemão (com Max Horkheimer, em 'Dialética do Esclarecimento').",
        resumo: "A transformação da cultura, da arte e do entretenimento em mercadorias fabricadas em escala industrial para consumo rápido e lucro, padronizando o pensamento e anestesiando o senso crítico.",
        uso: "Tecnologia e Inovação: Meios de comunicação e algoritmos reproduzindo padrões de consumo.; Diversidade e Sociedade: Homogeneização de gostos e alienação cultural.",
        frase: "Sob a ótica do filósofo alemão Theodor Adorno, em sua teoria sobre a 'Indústria Cultural', a conversão dos bens simbólicos em mercadorias padronizadas atrofia o senso crítico e condiciona o indivíduo ao consumo passivo. Essa dinâmica manifesta-se no tocante a [TEMA], cenário no qual lógicas comerciais e algoritmos moldam o comportamento coletivo, enfraquecendo a autonomia reflexiva dos cidadãos.",
        audio: "arquivos de audio para repertório/Como_usar_Adorno_na_redação_do_ENEM.m4a",
        tipo: "dev"
    },
    {
        obra: "ULRICH BECK & ZYGMUNT BAUMAN — AS INSTITUIÇÕES ZUMBIS (1986–2001)",
        autor: "Sociólogos Ulrich Beck e Zygmunt Bauman (Sociologia da Modernidade e Teoria Social).",
        resumo: "Instituições fundamentais (Estado, escola, justiça) que preservam sua estrutura formal e burocrática, mas perderam a capacidade real de proteger e amparar a sociedade, transferindo os riscos coletivos ao indivíduo.",
        uso: "Omissão Estatal: Lentidão e ineficácia burocrática em políticas públicas.; Meio Ambiente e Território: Falha na prevenção e resposta a desastres climáticos e desigualdade de direitos.",
        frase: "Consoante o conceito de 'instituições zumbis', formulado por Ulrich Beck e expandido por Zygmunt Bauman, órgãos públicos frequentemente mantêm sua fachada formal enquanto esvaziam sua função protetiva real. No Brasil, essa inoperância explica a persistência de [TEMA], visto que o Estado transfere aos cidadãos a gestão individual de crises coletivas, perpetuando o desamparo estrutural.",
        audio: "arquivos de audio para repertório/Instituições_zumbis_como_repertório_para_redação.m4a",
        tipo: "dev"
    },
    {
        obra: "PIERRE BOURDIEU — TEORIA DO CAPITAL CULTURAL (1979)",
        autor: "Sociólogo francês, na obra 'A Distinção' (Sociologia da Educação e Cultura).",
        resumo: "O sistema escolar não é neutro: ele consagra os códigos culturais herdados pelas classes dominantes, convertendo privilégios de berço em suposto mérito individual e perpetuando a desigualdade.",
        uso: "Educação e Sociedade: Falsa meritocracia escolar e violência simbólica.; Desigualdade Estrutural: Acesso desigual a bens culturais e ensino superior.",
        frase: "De acordo com o sociólogo francês Pierre Bourdieu, na obra 'A Distinção', a escola tende a legitimar desigualdades sociais ao tratar o capital cultural herdado como mérito estritamente individual. Sob esse prisma, a problemática de [TEMA] evidencia como a carência de acesso equitativo a bens formativos marginaliza estudantes populares, reproduzindo historicamente a estratificação de classes.",
        audio: "arquivos de audio para repertório/Bourdieu_e_a_falsa_meritocracia_escolar.m4a",
        tipo: "dev"
    },
    {
        obra: "BYUNG-CHUL HAN — A SOCIEDADE DO CANSAÇO (2010)",
        autor: "Filósofo sul-coreano-alemão (Filosofia Contemporânea / Sociologia).",
        resumo: "A transição da sociedade disciplinar para a sociedade do desempenho, regida pelo imperativo do 'você pode', na qual o excesso de estímulos e a autoexploração voluntária geram burnout, ansiedade e depressão.",
        uso: "Saúde Mental e Trabalho: Esgotamento psíquico, sobrecarga e cobrança por produtividade.; Tecnologia: Hiperconectividade, fadiga digital e falta de pausa reflexiva.",
        frase: "Para o filósofo Byung-Chul Han, em 'A Sociedade do Cansaço', a busca incessante por desempenho transforma o sujeito em explorador de si mesmo, gerando adoecimento neuronal pelo excesso de estímulos. No cenário contemporâneo, tal diagnóstico reflete-se em [TEMA], uma vez que a pressão contínua por rendimento e a hiperconectividade corroem o equilíbrio psíquico e a qualidade de vida.",
        audio: "arquivos de audio para repertório/Sociedade_do_Cansaço_na_redação_do_ENEM.m4a",
        tipo: "dev"
    },
    {
        obra: "GUY DEBORD — A SOCIEDADE DO ESPETÁCULO (1967)",
        autor: "Filósofo e teórico crítico francês (Internacional Situacionista).",
        resumo: "Na contemporaneidade, as relações sociais são mediadas por imagens e pelo fetichismo da mercadoria, deslocando a existência humana do 'ser' para o 'ter' e, por fim, para o mero 'parecer'.",
        uso: "Redes Sociais e Aparência: Espetacularização da vida privada e ditadura estética.; Consumo e Cidadania: Passividade política e redução de debates públicos a entretenimento.",
        frase: "Conforme analisa o pensador francês Guy Debord em 'A Sociedade do Espetáculo', a mediação excessiva das imagens subordina a vivência autêntica à lógica da aparência e do consumo. Essa crítica se atualiza diante de [TEMA], conjuntura na qual a superexposição midiática e a validação estética superficial esvaziam a reflexão cidadã.",
        audio: "arquivos de audio para repertório/Sociedade_do_Espetáculo_na_redação_do_ENEM.m4a",
        tipo: "intro"
    },
    {
        obra: "MILTON SANTOS — AS CIDADANIAS MUTILADAS (1997)",
        autor: "Geógrafo e pensador brasileiro (Geografia Humana / Sociologia Política).",
        resumo: "A cidadania no Brasil manifesta-se de forma incompleta para as classes populares: o acesso efetivo a direitos constitucionais é hierarquizado pela renda e pela localização espacial ('cidadania pelo CEP').",
        uso: "Segregação Urbana: Falta de saneamento, transporte e equipamentos públicos nas periferias.; Desigualdade Social: Distância entre direitos formais ('cidadãos de papel') e realidade concreta.",
        frase: "O geógrafo brasileiro Milton Santos, ao formular o conceito de 'cidadanias mutiladas', demonstra que a efetivação dos direitos no Brasil é condicionada pelo território e pelo poder aquisitivo. Em consonância com essa tese, observa-se que [TEMA] aprofunda a segregação socioespacial, privando populações periféricas das garantias essenciais previstas na Constituição.",
        audio: "arquivos de audio para repertório/Milton_Santos_e_a_cidadania_pelo_CEP.m4a",
        tipo: "dev"
    },
    {
        obra: "ACHILLE MBEMBE — NECROPOLÍTICA (2003)",
        autor: "Filósofo e cientista político camaronês (Teoria Social).",
        resumo: "A soberania contemporânea opera não apenas promovendo a vida, mas decidindo quem pode viver e quem é exposto à morte ou ao abandono institucional em territórios periféricos e marginalizados.",
        uso: "Violência e Segurança: Letalidade seletiva e abandono de periferias.; Omissão Estatal Grave: Desproteção estrutural de grupos racializados e vulneráveis.",
        frase: "Segundo o filósofo camaronês Achille Mbembe, o conceito de 'necropolítica' expõe como o poder estatal seleciona, por ação ou abandono deliberado, quais vidas recebem proteção e quais são relegadas à vulnerabilidade extrema. Esse mecanismo elucida a gravidade de [TEMA], dado que a inércia dos serviços públicos em áreas marginalizadas naturaliza violações severas à dignidade humana.",
        audio: "arquivos de audio para repertório/Como_usar_Necropolítica_na_redação_do_ENEM.m4a",
        tipo: "dev"
    },
    {
        obra: "ERIC HOBSBAWM — A PRIMAVERA DOS POVOS / REVOLUÇÕES DE 1848",
        autor: "Historiador britânico, em 'A Era das Revoluções' e 'A Era do Capital'.",
        resumo: "O ciclo de insurreições populares de 1848 marcou a entrada das massas trabalhadoras como protagonistas da história política moderna, reivindicando democracia, soberania e direitos sociais.",
        uso: "Mobilização Popular: Conquista histórica de direitos civis, trabalhistas e cidadania.; Desigualdade Histórica: Resistência das elites à democratização do poder.",
        frase: "Na historiografia de Eric Hobsbawm, a 'Primavera dos Povos' de 1848 simbolizou o despertar político das camadas populares na luta por direitos trabalhistas e participação democrática. Ao relacionar esse marco histórico a [TEMA], percebe-se que a consolidação da cidadania plena depende continuamente da mobilização social diante da resistência de estruturas excludentes.",
        audio: "arquivos de audio para repertório/A_Primavera_dos_Povos_segundo_Eric_Hobsbawm.m4a",
        tipo: "intro"
    }
];

const BLOCO_2_LITERATURA = [
    {
        obra: "ALUÍSIO DE AZEVEDO — O CORTIÇO (1890)",
        autor: "Escritor naturalista brasileiro (Romance Naturalista).",
        resumo: "Retrata uma habitação coletiva precária no Rio de Janeiro do século XIX para demonstrar como o meio físico insalubre e a exploração econômica degradam e zoomorfizam os moradores.",
        uso: "Moradia e Território: Insalubridade habitacional, falta de saneamento e especulação urbana.; Pós-Abolição e Classe Trabalhadora: Exploração e marginalização periférica.",
        frase: "No romance naturalista 'O Cortiço', Aluísio de Azevedo demonstra como a precarização do espaço habitacional e a ganância econômica degradam a dignidade dos trabalhadores. De modo semelhante, no Brasil contemporâneo, a negligência diante de [TEMA] perpetua ambientes urbanos excludentes que comprometem a qualidade de vida da população vulnerável.",
        audio: "arquivos de audio para repertório/O_Cortiço_como_repertório_para_redação.m4a",
        tipo: "intro"
    },
    {
        obra: "CAROLINA MARIA DE JESUS — QUARTO DE DESPEJO (1960)",
        autor: "Escritora brasileira, na obra 'Quarto de Despejo: Diário de uma Favelada'.",
        resumo: "Diário testemunhal de uma catadora de papel na Favela do Canindé que denuncia a fome e cria a metáfora da periferia como o 'quarto de despejo' ocultado pela cidade formal ('sala de visitas').",
        uso: "Fome e Pobreza: Segurança alimentar, saneamento e reciclagem sob subsistência.; Interseccionalidade: Silenciamento e resistência de mulheres negras periféricas.",
        frase: "Em 'Quarto de Despejo', a escritora Carolina Maria de Jesus denuncia a segregação urbana ao comparar a favela ao depósito onde a cidade oculta seus cidadãos marginalizados. Fora das páginas literárias, a persistência de [TEMA] atualiza essa fratura social, evidenciando o abandono estatal enfrentado por comunidades historicamente invisibilizadas.",
        audio: "arquivos de audio para repertório/Quarto_de_Despejo_na_redação_do_Enem.m4a",
        tipo: "intro"
    },
    {
        obra: "GEORGE ORWELL — 1984 (1949)",
        autor: "Escritor britânico (Romance Distópico).",
        resumo: "Retrata um regime totalitário que aniquila a liberdade individual e a verdade mediante vigilância onipresente ('teletelas'), manipulação histórica e redução linguística ('Novilíngua').",
        uso: "Tecnologia e Privacidade: Vigilância digital, controle algorítmico e espionagem de dados.; Desinformação: Manipulação da verdade, censura e polarização.",
        frase: "Na distopia '1984', George Orwell alerta para os riscos do controle contínuo da informação e da vigilância sobre a autonomia dos indivíduos. Transposta para a era digital, essa advertência ilumina o debate acerca de [TEMA], visto que a coleta abusiva de dados e a manipulação informacional ameaçam o pensamento crítico e a democracia.",
        audio: "arquivos de audio para repertório/1984_como_repertório_coringa_na_redação.m4a",
        tipo: "intro"
    },
    {
        obra: "GRACILIANO RAMOS — VIDAS SECAS (1938)",
        autor: "Escritor modernista brasileiro (Romance Regionalista da Geração de 30).",
        resumo: "Narra a trajetória de uma família de retirantes nordestinos acuada pela seca, pela fome e pelo analfabetismo, exposta à exploração patronal e à truculência institucional sem defesa jurídica.",
        uso: "Clima e Migração: Secas extremas, escassez hídrica e retirantes ambientais.; Educação e Cidadania: Analfabetismo e incapacidade de reivindicar direitos perante o Estado.",
        frase: "No clássico 'Vidas Secas', Graciliano Ramos retrata a desumanização de retirantes privados de água, instrução formal e amparo jurídico. De maneira paralela, a continuidade de [TEMA] no país revela como a carência de políticas estruturais condena parcelas vulneráveis da população à exclusão e à subcidadania.",
        audio: "arquivos de audio para repertório/Vidas_Secas_como_coringa_na_redação.m4a",
        tipo: "intro"
    },
    {
        obra: "JORGE AMADO — CAPITÃES DA AREIA (1937)",
        autor: "Escritor modernista brasileiro (Geração de 30).",
        resumo: "Expõe o abandono de crianças e adolescentes em situação de rua em Salvador, denunciando a hipocrisia social que criminaliza a pobreza em vez de assegurar educação, afeto e proteção.",
        uso: "Infância e Juventude: Violação ao ECA, evasão escolar e trabalho infantil.; Desigualdade Social: Estigmatização de jovens periféricos e ausência de acolhimento.",
        frase: "Em 'Capitães da Areia', Jorge Amado denuncia a negligência estatal e a criminalização de menores abandonados nas ruas de Salvador. Analogamente, ao examinar [TEMA], nota-se que a ausência de políticas preventivas de acolhimento e educação perpetua a vulnerabilidade infantojuvenil no Brasil.",
        audio: "arquivos de audio para repertório/Capitães_da_Areia_como_repertório_para_redação.m4a",
        tipo: "intro"
    },
    {
        obra: "JOSÉ SARAMAGO — ENSAIO SOBRE A CEGUEIRA (1995)",
        autor: "Escritor português, Prêmio Nobel de Literatura (Romance e Alegoria Social).",
        resumo: "A epidemia da 'cegueira branca' expõe a fragilidade dos laços civilizatórios e a 'cegueira moral' coletiva, agravada pelo confinamento punitivo e pelo abandono sanitário promovido pelo Estado.",
        uso: "Alteridade e Saúde Pública: Perda de empatia em crises, indiferença social e descaso sanitário.; Direitos Humanos: Exclusão de pessoas doentes e vulneráveis.",
        frase: "Na alegoria 'Ensaio sobre a Cegueira', José Saramago evidencia como a indiferença ética e o abandono institucional destroem a solidariedade em momentos de crise. Tal reflexão aplica-se a [TEMA], porquanto a falta de empatia coletiva e a omissão do poder público aprofundam o desamparo dos grupos mais frágeis.",
        audio: "arquivos de audio para repertório/Ensaio_sobre_a_Cegueira_como_repertório.m4a",
        tipo: "intro"
    },
    {
        obra: "PAULO LINS — CIDADE DE DEUS (1997)",
        autor: "Escritor brasileiro (Romance Social / Realismo Marginal).",
        resumo: "Documenta como a segregação socioespacial, a falta de infraestrutura urbana e a ausência do Estado em conjuntos habitacionais periféricos empurram a juventude para o crime organizado e a violência.",
        uso: "Segurança e Periferia: Marginalização juvenil, estigma territorial e violência urbana.; Omissão Estatal: Vácuo de serviços públicos básicos em áreas segregadas.",
        frase: "No romance 'Cidade de Deus', Paulo Lins evidencia que a violência endêmica nas periferias decorre da segregação socioespacial e da ausência histórica de investimentos públicos em educação e infraestrutura. Essa lógica elucida [TEMA], mostrando que a carência de perspectivas sociais perpetua ciclos de exclusão e vulnerabilidade juvenil.",
        audio: "arquivos de audio para repertório/Cidade_de_Deus_na_redação_do_Enem.m4a",
        tipo: "intro"
    }
];

const BLOCO_3_ARTES_CINEMA = [
    {
        obra: "CANDIDO PORTINARI — OS RETIRANTES (1944)",
        autor: "Pintor modernista brasileiro (Pintura Expressionista Social).",
        resumo: "A tela denuncia o êxodo forçado de famílias nordestinas expulsas pela seca e pela miséria, retratando a desnutrição, a dor coletiva e o desarraigamento provocado pelo abandono do semiárido.",
        uso: "Meio Ambiente e Seca: Refugiados climáticos, escassez hídrica e fome.; Desigualdade Regional: Migração forçada e vulnerabilidade social.",
        frase: "Na célebre tela expressionista 'Os Retirantes', Candido Portinari materializa o drama de famílias expulsas de suas terras pela seca e pela desassistência estatal. Em paralelo à obra pictórica, a persistência de [TEMA] expõe como a desigualdade regional e os extremos climáticos continuam vulnerabilizando populações desprovidas de proteção pública.",
        audio: "arquivos de audio para repertório/Como_usar_Os_Retirantes_na_redação.m4a",
        tipo: "intro"
    },
    {
        obra: "CHARLIE CHAPLIN — TEMPOS MODERNOS (1936)",
        autor: "Cineasta britânico (Cinema / Sociologia do Trabalho).",
        resumo: "Sátira contundente à mecanização industrial e ao ritmo alienante das linhas de montagem, denunciando a coisificação do trabalhador, a vigilância patronal e o esgotamento físico e psíquico.",
        uso: "Trabalho e Automação: Precarização laboral, burnout e desemprego estrutural.; Tecnologia: Submissão da saúde humana ao ritmo das máquinas e metas.",
        frase: "No clássico cinematográfico 'Tempos Modernos', Charlie Chaplin critica a submissão do trabalhador à cadência exaustiva da produção industrial, denunciando sua desumanização. Na contemporaneidade, tal crítica mantém-se atual perante [TEMA], haja vista que metas abusivas e novas ferramentas digitais frequentemente sobrepõem o lucro à saúde laboral.",
        audio: "arquivos de audio para repertório/Tempos_Modernos_na_redação_do_ENEM.m4a",
        tipo: "intro"
    },
    {
        obra: "ESTELA RENNER & MARCOS NISTI — ARUANAS (2019–PRESENTE)",
        autor: "Série dramática e investigativa brasileira (Cinema / Meio Ambiente).",
        resumo: "Expõe a engrenagem de impunidade nos crimes socioambientais na Amazônia, revelando a aliança entre grandes interesses predatórios e fragilidade da fiscalização contra povos da floresta e ativistas.",
        uso: "Meio Ambiente: Desmatamento, garimpo ilegal, contaminação hídrica por mercúrio e crise climática.; Direitos Humanos: Proteção a comunidades indígenas, quilombolas e defensores ambientais.",
        frase: "A série brasileira 'Aruanas' retrata os conflitos socioambientais na Amazônia, expondo como o enfraquecimento da fiscalização favorece crimes ecológicos e ameaça comunidades tradicionais. Essa denúncia ecoa no debate sobre [TEMA], contexto em que interesses econômicos imediatistas violam o direito constitucional ao meio ambiente equilibrado.",
        audio: "arquivos de audio para repertório/Aruanas_como_repertório_para_a_redação.m4a",
        tipo: "intro"
    },
    {
        obra: "ILANA CASOY & RAPHAEL MONTES — BOM DIA, VERÔNICA (2016)",
        autor: "Escritores brasileiros (Literatura / Série — Criminologia e Sociologia).",
        resumo: "Disseca a violência de gênero, o abuso doméstico e a conivência institucional nos aparelhos de segurança pública, evidenciando o pacto de silêncio e a revitimização de mulheres.",
        uso: "Violência de Gênero: Feminicídio, violência doméstica e psicológica.; Omissão Institucional: Falhas na aplicação da Lei Maria da Penha e desamparo às vítimas.",
        frase: "Na obra 'Bom Dia, Verônica', Ilana Casoy e Raphael Montes revelam como a negligência burocrática e o machismo institucionalizado silenciam vítimas de violência de gênero. Analogamente, a realidade em torno de [TEMA] evidencia a insuficiência de redes de acolhimento eficazes para transformar a proteção legal em segurança real.",
        audio: "arquivos de audio para repertório/Bom_Dia_Verônica_como_repertório_para_redações.m4a",
        tipo: "intro"
    },
    {
        obra: "JAMES LEBRECHT & NICOLE NEWNHAM — CRIP CAMP (2020)",
        autor: "Documentário 'Crip Camp: A Revolução pela Inclusão' (Direitos Civis).",
        resumo: "Resgata o acampamento inclusivo Camp Jened na década de 1970 e a mobilização de jovens com deficiência contra o capacitismo, culminando na conquista de leis históricas de acessibilidade.",
        uso: "Inclusão e Acessibilidade: Luta anticapacitista, desenho universal e direitos de PCDs.; Mobilização Cívica: Protagonismo político de grupos marginalizados.",
        frase: "O documentário 'Crip Camp' demonstra como a organização coletiva de pessoas com deficiência rompeu a lógica assistencialista para conquistar direitos efetivos de acessibilidade. Aplicado a [TEMA], esse marco evidencia que a inclusão plena exige políticas concretas que garantam autonomia nos espaços públicos, educacionais e laborais.",
        audio: "arquivos de audio para repertório/Como_usar_Crip_Camp_na_redação.m4a",
        tipo: "intro"
    },
    {
        obra: "JORGE FURTADO & ANDRUCHA WADDINGTON — SOB PRESSÃO (2017–2022)",
        autor: "Série dramática brasileira sobre Saúde Pública (Cineasta Jorge Furtado e Andrucha Waddington).",
        resumo: "Retrata o cotidiano de uma emergência pública marcada pelo subfinanciamento e pela falta de insumos, obrigando profissionais de saúde a exercerem uma 'medicina de guerra' e refletindo as chagas sociais da cidade.",
        uso: "Saúde Pública e SUS: Precarização hospitalar, burnout dos profissionais e desigualdade no acesso à saúde.; Determinantes Sociais: Reflexo da violência e da pobreza no atendimento médico.",
        frase: "Na série nacional 'Sob Pressão', a carência crônica de insumos e leitos impõe aos profissionais da linha de frente o exercício extenuante de uma 'medicina de guerra'. Esse retrato dialoga diretamente com [TEMA], expondo como a fragilidade do financiamento público e as desigualdades territoriais comprometem o direito universal à saúde.",
        audio: "arquivos de audio para repertório/Medicina_de_guerra_em_Sob_Pressão.m4a",
        tipo: "intro"
    },
    {
        obra: "TARSILA DO AMARAL — OS OPERÁRIOS (1933)",
        autor: "Pintora modernista brasileira (Modernismo — Fase Social).",
        resumo: "A pintura retrata uma pirâmide de rostos operários sobrepostos, diversos etnicamente e sem expressão individual diante das chaminés fabris, denunciando a massificação e exploração do trabalho.",
        uso: "Trabalho e Migração: Diversidade étnica operária, exaustão laboral e perda de identidade.; Urbanização Industrial: Crescimento econômico erguido sobre desigualdade.",
        frase: "Na tela 'Os Operários', Tarsila do Amaral simboliza, por meio de rostos sobrepostos diante das chaminés industriais, a massificação e a exaustão da classe trabalhadora. Essa representação contribui para analisar [TEMA], revelando como modelos produtivos excludentes frequentemente apagam a singularidade e a dignidade dos trabalhadores.",
        audio: "arquivos de audio para repertório/Como_citar_Os_Operários_na_redação.m4a",
        tipo: "intro"
    },
    {
        obra: "TARSILA DO AMARAL — SEGUNDA CLASSE (1933)",
        autor: "Pintora modernista brasileira (Modernismo — Fase Social).",
        resumo: "Documenta famílias camponesas retirantes diante de um vagão ferroviário de 'segunda classe', denunciando o êxodo rural compulsório e o estatuto de subcidadania imposto aos migrantes pobres.",
        uso: "Mobilidade e Território: Êxodo rural, precariedade do transporte e segregação periférica.; Desigualdade Histórica: Estigmatização de migrantes internos.",
        frase: "Em 'Segunda Classe', Tarsila do Amaral retrata famílias migrantes aguardando um vagão precário rumo às metrópoles, traduzindo visualmente a condição de subcidadania imposta aos vulneráveis. Sob essa perspectiva, [TEMA] reflete disparidades socioespaciais persistentes que negam condições dignas de mobilidade e permanência territorial.",
        audio: "arquivos de audio para repertório/Segunda_Classe_e_a_desigualdade_urbana.m4a",
        tipo: "intro"
    },
    {
        obra: "WALTER SALLES — CENTRAL DO BRASIL (1998)",
        autor: "Cineasta brasileiro (Cinema Nacional / Drama e Crítica Social).",
        resumo: "A jornada da escrevente de cartas Dora e do garoto Josué expõe o analfabetismo funcional que torna milhares de brasileiros dependentes de terceiros para exercer cidadania, contrapondo frieza urbana e solidariedade.",
        uso: "Educação e Letramento: Analfabetismo estrutural e invisibilidade civil.; Desigualdade Regional: Abandono infantojuvenil e contraste entre metrópoles e sertão.",
        frase: "No filme 'Central do Brasil', Walter Salles retrata indivíduos que dependem de terceiros para escrever cartas devido ao analfabetismo estrutural, evidenciando como a privação educacional mutila a cidadania. De modo análogo, a persistência de [TEMA] interdita a participação plena de milhões de brasileiros na vida social.",
        audio: "arquivos de audio para repertório/Central_do_Brasil_como_repertório_no_ENEM.m4a",
        tipo: "intro"
    },
    {
        obra: "ANNA MUYLAERT — QUE HORAS ELA VOLTA? (2015)",
        autor: "Cineasta brasileira (Drama Social / Estratificação e Gênero).",
        resumo: "Expõe o falso paternalismo no trabalho doméstico ('ela é quase da família') e as fronteiras invisíveis de classe na casa patronal, rompidas pela filha Jéssica ao reivindicar ensino superior e igualdade.",
        uso: "Trabalho e Classe: Precarização do trabalho doméstico/cuidado e elitismo.; Educação e Mobilidade: Acesso universitário como instrumento contra hierarquias coloniais.",
        frase: "No longa-metragem 'Que Horas Ela Volta?', Anna Muylaert desmascara o falso paternalismo que naturaliza a subordinação nas relações domésticas brasileiras. Transposta essa crítica para [TEMA], percebe-se a sobrevivência de hierarquias sociais arcaicas que resistem à democratização dos espaços e oportunidades.",
        audio: "arquivos de audio para repertório/Falso_paternalismo_em_Que_Horas_Ela_Volta.m4a",
        tipo: "intro"
    }
];

const BLOCO_4_TECNOLOGIA = [
    {
        obra: "ALVIN TOFFLER — O CHOQUE DO FUTURO (1970)",
        autor: "Sociólogo e futurista norte-americano.",
        resumo: "Analisa a sobrecarga psicológica e a desorientação social causadas quando o ritmo acelerado das inovações tecnológicas e a avalanche informacional ultrapassam a capacidade humana de adaptação.",
        uso: "Tecnologia e IA: Aceleração digital, obsolescência e fadiga informacional.; Saúde Mental: Ansiedade crônica e dificuldade institucional de regulação.",
        frase: "Em 'O Choque do Futuro', o teórico Alvin Toffler adverte que mudanças tecnológicas vertiginosas tendem a superar a capacidade de adaptação psíquica e institucional da sociedade. Essa tese esclarece os impasses ligados a [TEMA], nos quais o avanço acelerado das ferramentas digitais não é acompanhado por preparo educativo e marcos regulatórios adequados.",
        audio: "arquivos de audio para repertório/Choque_do_Futuro_na_Redação_do_ENEM.m4a",
        tipo: "dev"
    },
    {
        obra: "JEFF ORLOWSKI-YANG — O DILEMA DAS REDES (2020)",
        autor: "Cineasta norte-americano (Documentário / Sociologia Digital).",
        resumo: "Revela a engenharia comportamental das plataformas digitais: modelos preditivos monetizam o foco do usuário ('se você não paga pelo produto, você é o produto') e alimentam vício, bolhas e polarização.",
        uso: "Redes e Algoritmos: Dependência digital, fake news, polarização política e proteção infantil.; Regulação Digital: Urgência de transparência e responsabilidade das big techs.",
        frase: "O documentário 'O Dilema das Redes' expõe como arquiteturas algorítmicas exploram vulnerabilidades psicológicas para maximizar o engajamento e o lucro publicitário. No cenário contemporâneo, tal mecanismo agrava [TEMA], incentivando a dependência digital, o isolamento em bolhas e a circulação veloz de desinformação.",
        audio: "arquivos de audio para repertório/Use_O_Dilema_das_Redes_na_redação.m4a",
        tipo: "intro"
    },
    {
        obra: "PIERRE LÉVY — CIBERCULTURA (1997)",
        autor: "Filósofo e sociólogo da comunicação francês.",
        resumo: "Embora o ciberespaço possibilite a 'inteligência coletiva' em rede, a exclusão digital — tanto por falta de infraestrutura quanto pelo analfabetismo informacional — converte a tecnologia em motor de segregação.",
        uso: "Exclusão Digital: Falta de internet/equipamentos e déficit de letramento digital crítico nas escolas.; Cidadania Digital: Acesso desigual ao trabalho e aos serviços públicos online.",
        frase: "Segundo o filósofo francês Pierre Lévy, em 'Cibercultura', a consolidação de uma 'inteligência coletiva' democrática exige não apenas conectividade material, mas também letramento informacional. Sob esse viés, [TEMA] revela uma fratura digital persistente que aparta populações desconectadas da economia e da cidadania contemporânea.",
        audio: "arquivos de audio para repertório/Pierre_Lévy_e_o_analfabetismo_digital.m4a",
        tipo: "dev"
    }
];

const BLOCO_5_EDUCACAO_MEIO_AMBIENTE = [
    {
        obra: "AILTON KRENAK — IDEIAS PARA ADIAR O FIM DO MUNDO (2019)",
        autor: "Filósofo, escritor e líder indígena brasileiro (Academia Brasileira de Letras).",
        resumo: "Critica a ilusão ocidental de separar humanidade e natureza ('humanidade exclusiva') e a mercantilização da Terra, propondo a valorização das cosmovisões indígenas para 'adiar o fim do mundo'.",
        uso: "Meio Ambiente: Crise climática, biodiversidade e desmatamento.; Povos Originários e Saberes: Descolonização do pensamento e respeito a territórios ancestrais.",
        frase: "Na obra 'Ideias para Adiar o Fim do Mundo', o pensador indígena Ailton Krenak denuncia a visão utilitarista que separa o ser humano da natureza e reduz o planeta a mercadoria. Esse alerta mostra-se urgente diante de [TEMA], conjuntura na qual a exploração predatória e o silenciamento de saberes tradicionais aceleram o colapso socioambiental.",
        audio: "arquivos de audio para repertório/Ailton_Krenak_na_Redação_do_ENEM.m4a",
        tipo: "dev"
    },
    {
        obra: "CHIMAMANDA NGOZI ADICHIE — O PERIGO DE UMA HISTÓRIA ÚNICA (2009)",
        autor: "Escritora nigeriana (Palestra TED Talk & Ensaio).",
        resumo: "Demonstra como narrativas hegemônicas ('Nkali' — o poder de narrar e fixar uma versão definitiva) reduzem povos e grupos a estereótipos unilaterais, perpetuando preconceitos e invisibilidade.",
        uso: "Preconceito e Estereótipos: Racismo, xenofobia e silenciamento de vozes plurais.; Educação e Mídia: Necessidade de representatividade diversificada e crítica cultural.",
        frase: "Como adverte a escritora nigeriana Chimamanda Ngozi Adichie em 'O Perigo de uma História Única', a imposição de narrativas unilaterais cristaliza estereótipos e apaga a pluralidade humana. Essa análise evidencia os entraves em torno de [TEMA], nos quais discursos hegemônicos reduzem grupos vulnerabilizados e legitimam exclusões históricas.",
        audio: "arquivos de audio para repertório/História_Única_de_Chimamanda_no_ENEM.m4a",
        tipo: "intro"
    },
    {
        obra: "LUIZ GONZAGA & AGUINALDO BATISTA — XOTE ECOLÓGICO (1989)",
        autor: "Compositores brasileiros (Música Popular / Ativismo Ambiental).",
        resumo: "Manifesto musical que denuncia a destruição da terra, da água e do ar pelo progresso ganancioso, conectando o colapso ambiental à violência contra defensores da floresta como Chico Mendes.",
        uso: "Crise Hídrica e Poluição: Degradação de mananciais, desertificação e perda de terras cultiváveis.; Conflitos no Campo: Defesa socioambiental e proteção a comunidades ribeirinhas.",
        frase: "Na emblemática canção 'Xote Ecológico', Luiz Gonzaga e Aguinaldo Batista denunciam o esgotamento dos recursos vitais e o ataque aos defensores ambientais em nome de um progresso predatório. Essa crítica artística dialoga com [TEMA], ressaltando que a degradação dos ecossistemas ameaça simultaneamente o clima e a subsistência humana.",
        audio: "arquivos de audio para repertório/Xote_Ecológico_na_redação_do_ENEM.m4a",
        tipo: "intro"
    },
    {
        obra: "PAULO FREIRE — PEDAGOGIA DO OPRIMIDO (1968)",
        autor: "Educador e filósofo brasileiro, patrono da educação brasileira.",
        resumo: "Opõe a 'educação bancária' (mera transferência passiva de conteúdos) à 'educação libertadora' baseada na dialogicidade, em temas geradores da realidade e na formação da consciência crítica.",
        uso: "Educação Básica e Crítica: Evasão escolar, formação cidadã e alfabetização digital emancipadora.; Desigualdade Social: Superação da passividade e resgate de vozes oprimidas.",
        frase: "Para o educador brasileiro Paulo Freire, em 'Pedagogia do Oprimido', a educação autêntica deve superar o modelo 'bancário' conteudista para promover dialogicidade e consciência crítica. Diante de [TEMA], percebe-se que fragilidades formativas ainda limitam a capacidade dos cidadãos de analisar criticamente e transformar a realidade.",
        audio: "arquivos de audio para repertório/Pedagogia_do_Oprimido_na_redação_do_ENEM.m4a",
        tipo: "dev"
    },
    {
        obra: "WILLIAM KAMKWAMBA & BRYAN MEALER — O MENINO QUE DESCOBRIU O VENTO (2009)",
        autor: "Biografia de William Kamkwamba (Ciência, Tecnologia e Inclusão).",
        resumo: "Narra como o jovem William, afastado da escola pela pobreza no Malawi rural, estudou em uma biblioteca local e construiu um moinho de vento com sucata para irrigar plantações e combater a fome.",
        uso: "Educação e Bibliotecas: Poder emancipatório da democratização do saber e protagonismo juvenil.; Meio Ambiente e Tecnologia Social: Energias renováveis acessíveis e justiça climática.",
        frase: "Na obra biográfica 'O Menino que Descobriu o Vento', a trajetória de William Kamkwamba demonstra o potencial transformador da democratização do conhecimento científico aliado à tecnologia social acessível. Em contrapartida, a realidade de [TEMA] expõe como a falta de infraestrutura educacional e hídrica ainda freia soluções sustentáveis em regiões vulneráveis.",
        audio: "arquivos de audio para repertório/William_Kamkwamba_como_repertório_no_ENEM.m4a",
        tipo: "intro"
    }
];

const REPERTORIOS_COMPLETOS = [
    ...BLOCO_1_FILOSOFIA,
    ...BLOCO_2_LITERATURA,
    ...BLOCO_3_ARTES_CINEMA,
    ...BLOCO_4_TECNOLOGIA,
    ...BLOCO_5_EDUCACAO_MEIO_AMBIENTE
];

const REPERTORIOS_MAPEADOS = [
    {
        nome: "1. Filosofia, Teoria Social e Crítica Institucional",
        repertorios: BLOCO_1_FILOSOFIA
    },
    {
        nome: "2. Literatura Brasileira e Distopias",
        repertorios: BLOCO_2_LITERATURA
    },
    {
        nome: "3. Artes Visuais, Cinema e Dramaturgia Social",
        repertorios: BLOCO_3_ARTES_CINEMA
    },
    {
        nome: "4. Tecnologia, Cibercultura e Sociedade da Informação",
        repertorios: BLOCO_4_TECNOLOGIA
    },
    {
        nome: "5. Educação, Sustentabilidade e Direitos Humanos",
        repertorios: BLOCO_5_EDUCACAO_MEIO_AMBIENTE
    }
];

if (typeof EIXOS_MESTRES !== 'undefined') {
    EIXOS_MESTRES.length = 0;
    EIXOS_MESTRES.push({ nome: '0. Compêndio Completo (33 Repertórios)', repertorios: REPERTORIOS_COMPLETOS });
    REPERTORIOS_MAPEADOS.forEach(eixo => EIXOS_MESTRES.push(eixo));
}

if (typeof window !== 'undefined') {
    window.REPERTORIOS_COMPLETOS = REPERTORIOS_COMPLETOS;
    window.REPERTORIOS_MAPEADOS = REPERTORIOS_MAPEADOS;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        REPERTORIOS_COMPLETOS,
        REPERTORIOS_MAPEADOS
    };
}
