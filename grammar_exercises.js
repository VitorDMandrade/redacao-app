const grammarExercises = [
    // --- CRASE ---
    {
        category: "Crase",
        question: "A juíza não é favorável ___ revogação da prisão preventiva.",
        options: ["a", "à"],
        correctOptionIndex: 1,
        explanation: "REGRA DE OURO DA CRASE: A crase só ocorre quando há a fusão da preposição 'a' com o artigo definido feminino 'a'. \n\n1. O termo regente (favorável) exige preposição? Sim! Quem é favorável, é favorável 'a' alguma coisa.\n2. O termo regido (revogação) admite o artigo 'a'? Sim, 'revogação' é substantivo feminino.\n\nLogo: a (preposição) + a (artigo) = à."
    },
    {
        category: "Crase",
        question: "O governo repassou verbas ___ instituições carentes.",
        options: ["a", "às", "as"],
        correctOptionIndex: 1,
        explanation: "1. O verbo 'repassou' (no sentido de transferir) exige preposição 'a' (repassou algo A alguém).\n2. O substantivo feminino plural 'instituições' admite o artigo plural 'as'.\n\nLogo: a (preposição) + as (artigo plural) = às. Lembre-se: 'a' no singular antes de palavra no plural NÃO leva crase. Aqui, como usamos 'às', a crase é obrigatória!"
    },
    {
        category: "Crase",
        question: "O projeto de lei está vinculado ___ partir de uma nova perspectiva.",
        options: ["a", "à"],
        correctOptionIndex: 0,
        explanation: "NUNCA USE CRASE ANTES DE VERBO! A palavra 'partir' é um verbo no infinitivo. Como verbos não admitem artigo feminino ('a'), o 'a' que aparece antes deles é exclusivamente uma preposição. Assim, não existe a fusão que forma a crase."
    },
    {
        category: "Crase",
        question: "A proposta é idêntica ___ que foi apresentada ontem.",
        options: ["a", "à"],
        correctOptionIndex: 1,
        explanation: "CRASE ANTES DE PRONOME DEMONSTRATIVO: O 'que' aqui equivale a 'aquela' (A proposta é idêntica 'àquela' que foi apresentada). O termo regente 'idêntica' exige a preposição 'a'. O pronome demonstrativo 'a' (aquela) aceita a fusão. Logo: a (preposição) + a (pronome) = à."
    },
    // --- VÍRGULA ---
    {
        category: "Vírgula",
        question: "Os estudantes ___ que estudaram muito ___ foram aprovados.",
        options: ["sem vírgulas", "com vírgulas"],
        correctOptionIndex: 1,
        explanation: "Essa é uma Oração Subordinada Adjetiva Explicativa (com vírgulas). Significa que *todos* os estudantes (naquele contexto) estudaram muito e foram aprovados. A vírgula serve para 'explicar' o termo anterior. Se fosse sem vírgula (Restritiva), significaria que *apenas uma parte do grupo* (aqueles que estudaram muito) foi aprovada."
    },
    {
        category: "Vírgula",
        question: "No Brasil colonial ___ a economia era baseada na exportação de açúcar.",
        options: ["obrigatoriamente com vírgula", "facultativo", "proibido vírgula"],
        correctOptionIndex: 0,
        explanation: "O uso da vírgula aqui é OBRIGATÓRIO. 'No Brasil colonial' é um adjunto adverbial de tempo/lugar deslocado para o início da oração (ordem indireta). Como ele é 'longo' (3 ou mais palavras, segundo as bancas mais rígidas, como o CESPE e ENEM), a vírgula para marcá-lo é obrigatória."
    },
    {
        category: "Vírgula",
        question: "O relator do processo, decidiu arquivar a denúncia.",
        options: ["correto", "incorreto"],
        correctOptionIndex: 1,
        explanation: "INCORRETO! Você acaba de separar o SUJEITO ('O relator do processo') do VERBO ('decidiu'). A regra número 1 da pontuação em português é: NUNCA se separa por vírgula o sujeito e o verbo, nem o verbo de seus complementos diretos. Se quiser adicionar algo, tem que ser entre duas vírgulas (ex: O relator, ontem, decidiu)."
    },
    // --- CONCORDÂNCIA E REGÊNCIA ---
    {
        category: "Concordância",
        question: "Faz ou Fazem dois anos que a lei foi aprovada?",
        options: ["Faz", "Fazem"],
        correctOptionIndex: 0,
        explanation: "VERBO FAZER (indicando tempo decorrido): É um verbo impessoal! Isso significa que ele não possui um sujeito com quem concordar. Por isso, DEVE ficar sempre cristalizado na 3ª pessoa do singular, independentemente de o tempo (dois anos) estar no plural."
    },
    {
        category: "Concordância",
        question: "Houve ou Houveram muitos problemas na gestão?",
        options: ["Houve", "Houveram"],
        correctOptionIndex: 0,
        explanation: "VERBO HAVER (no sentido de existir, ocorrer ou acontecer): É impessoal! Exatamente como o verbo 'fazer' indicando tempo, o 'haver' fica travado na 3ª pessoa do singular. A palavra 'problemas' funciona como objeto direto, e não como sujeito da oração."
    },
    {
        category: "Regência",
        question: "Assistir o filme ou Assistir ao filme?",
        options: ["Assistir o filme", "Assistir ao filme"],
        correctOptionIndex: 1,
        explanation: "REGÊNCIA VERBAL: O verbo ASSISTIR no sentido de VER/PRESENCIAR é transitivo indireto e exige a preposição 'a'. Você assiste 'a' algo. Portanto, o correto é 'assistir ao filme'. A forma 'assistir o filme' estaria correta apenas se o sentido fosse de prestar assistência/ajudar."
    },
    {
        category: "Regência",
        question: "A medida implica ___ novas contratações.",
        options: ["em", "∅ (nada)"],
        correctOptionIndex: 1,
        explanation: "O verbo IMPLICAR (no sentido de acarretar, trazer como consequência) é TRANSITIVO DIRETO. Isso significa que ele não pede preposição (em). O correto é 'A medida implica novas contratações'. Dizer 'implica em' é um vício de linguagem comum, mas penalizado em redações."
    },
    // --- CONECTIVOS ---
    {
        category: "Conectivos",
        question: "Qual conectivo usar para introduzir uma ideia de concessão (uma exceção que não anula a regra)?",
        options: ["Porquanto", "Conquanto", "Por conseguinte", "Destarte"],
        correctOptionIndex: 1,
        explanation: "'Conquanto' é um conectivo concessivo (sinônimo de 'embora', 'mesmo que', 'ainda que'). A concessão apresenta uma oposição que não é forte o suficiente para anular a ideia principal. \nEx: 'Conquanto houvesse leis (oposição menor), o crime persistia (ideia principal)'.\n'Porquanto' = causa/explicação.\n'Destarte' = conclusão."
    },
    {
        category: "Conectivos",
        question: "O conectivo 'Outrossim' tem valor semântico de:",
        options: ["Oposição", "Conclusão", "Adição", "Causa"],
        correctOptionIndex: 2,
        explanation: "'Outrossim' é um conectivo de ADIÇÃO, funcionando de forma semelhante a 'igualmente', 'do mesmo modo', 'além disso'. É um termo clássico e elegante para iniciar um segundo argumento no desenvolvimento da sua redação (D2)."
    },
    {
        category: "Conectivos",
        question: "Qual conectivo usar para indicar uma oposição forte a um argumento anterior?",
        options: ["Ademais", "Por conseguinte", "Entretanto", "Nesse sentido"],
        correctOptionIndex: 2,
        explanation: "O conectivo 'Entretanto' é um operador argumentativo de OPOSIÇÃO (adversativo). Ele quebra a expectativa do que foi dito antes. \n- 'Ademais' soma argumentos (adição).\n- 'Por conseguinte' indica consequência/conclusão.\n- 'Nesse sentido' indica continuação/conformidade."
    },
    // --- USO DO INFINITIVO E OUTROS ---
    {
        category: "Uso do Infinitivo",
        question: "É correto dizer: 'Para mim fazer o trabalho' ou 'Para eu fazer o trabalho'?",
        options: ["Para mim fazer", "Para eu fazer"],
        correctOptionIndex: 1,
        explanation: "MIM NÃO CONJUGA VERBO! 'Mim' é pronome oblíquo tônico e, sintaticamente, costuma atuar como complemento. Ele não pode ser sujeito de uma ação. O verbo no infinitivo ('fazer') exige um sujeito no caso reto. Logo, quem faz a ação sou 'EU' (Para eu fazer)."
    },
    {
        category: "Uso do Infinitivo",
        question: "Devem existir ou Deve existir casos isolados?",
        options: ["Devem existir", "Deve existir"],
        correctOptionIndex: 0,
        explanation: "O verbo 'existir' NÃO É IMPESSOAL (ao contrário de 'haver'). Ele possui sujeito, e o sujeito aqui é 'casos isolados'. Em uma locução verbal ('devem existir'), o verbo auxiliar ('devem') concorda com o sujeito da oração. Logo, como 'casos' está no plural, o correto é 'Devem existir casos'."
    },
    {
        category: "Uso do Infinitivo",
        question: "A equipe está disposta ___ contribuir com o projeto.",
        options: ["a", "à"],
        correctOptionIndex: 0,
        explanation: "NUNCA USE CRASE ANTES DE VERBO NO INFINITIVO. 'Contribuir' é verbo. A palavra 'disposta' exige a preposição 'a' (disposto a algo), mas como não existe artigo feminino antes de verbo, temos apenas a preposição 'a'. Sem artigo, sem crase."
    },
    {
        category: "Uso do Infinitivo",
        question: "Eles foram obrigados a ___ (recuar / recuarem) diante da crise.",
        options: ["recuar (Infinitivo impessoal)", "recuarem (Infinitivo pessoal flexionado)"],
        correctOptionIndex: 0,
        explanation: "Quando o verbo no infinitivo forma uma locução com um verbo auxiliar ou está precedido de preposição formando uma oração reduzida que se refere ao MESMO sujeito da oração principal ('Eles'), o uso do infinitivo impessoal (sem flexão, 'recuar') é a forma recomendada e mais elegante. Flexionar ('recuarem') não é estritamente errado aqui, mas soa redundante."
    },
    {
        category: "Regência",
        question: "O diretor visava ___ lucro máximo para a empresa.",
        options: ["o", "ao"],
        correctOptionIndex: 1,
        explanation: "O verbo 'visar' com sentido de 'ter como objetivo / almejar' é transitivo INDIreto, exigindo a preposição 'a'. Quem visa (almeja), visa 'a' alguma coisa. Portanto: visa + a (preposição) + o (artigo de lucro) = visava ao lucro."
    },
    {
        category: "Regência",
        question: "Ele sempre obedeceu ___ regras da escola.",
        options: ["as", "às"],
        correctOptionIndex: 1,
        explanation: "O verbo 'obedecer' é transitivo indireto (quem obedece, obedece 'A' alguém ou 'A' algo). Como a palavra 'regras' é feminina plural, aceita o artigo 'as'. Logo, preposição 'a' + artigo 'as' = 'às' (com crase obrigatória)."
    },
    {
        category: "Conectivos",
        question: "Na redação, qual a diferença prática entre 'Portanto' e 'Todavia'?",
        options: ["'Portanto' conclui uma ideia; 'Todavia' introduz uma quebra de expectativa (oposição).", "'Portanto' adiciona um argumento; 'Todavia' explica uma causa."],
        correctOptionIndex: 0,
        explanation: "'Portanto' é clássico para iniciar o parágrafo de Conclusão, pois amarra logicamente tudo o que foi dito e anuncia o fim do raciocínio. 'Todavia' tem exatamente a mesma força do 'Mas / Porém', servindo para quebrar o argumento anterior e apresentar um obstáculo."
    },
    {
        category: "Conectivos",
        question: "Para iniciar o Desenvolvimento 1 (D1), qual desses conectivos é mais estratégico?",
        options: ["Em suma", "Sob esse viés", "Diante desse cenário"],
        correctOptionIndex: 2,
        explanation: "'Diante desse cenário' (ou 'Nesse contexto', 'A priori') é ideal para o D1 porque ele conecta a sua Tese (deixada na introdução) com o início do seu primeiro argumento. 'Em suma' só serve para a conclusão. 'Sob esse viés' é ótimo para o D2 (pois puxa o viés discutido no D1)."
    },
    {
        category: "Concordância",
        question: "A maior parte dos brasileiros ___ (acredita / acreditam) na melhora econômica.",
        options: ["apenas 'acredita'", "apenas 'acreditam'", "ambas estão corretas"],
        correctOptionIndex: 2,
        explanation: "Expressões partitivas ('a maior parte de', 'a maioria de', 'grande número de') acompanhadas de um plural ('brasileiros') aceitam DUAS concordâncias: a lógica, que concorda com o partitivo singular ('A maior parte... acredita'), ou a atrativa, que concorda com o termo mais próximo plural ('...brasileiros acreditam'). Ambas são gramaticalmente irretocáveis na redação."
    },
    // --- NOVAS QUESTÕES ---
    {
        category: "Crase",
        question: "Fui ___ Bahia nas férias e depois retornei ___ Roma.",
        options: ["a / a", "à / à", "à / a", "a / à"],
        correctOptionIndex: 2,
        explanation: "DICA INFALÍVEL: 'Vou A, volto DA = crase há! Vou A, volto DE = crase pra quê?'\nVolto DA Bahia (logo, 'à Bahia').\nVolto DE Roma (logo, 'a Roma')."
    },
    {
        category: "Crase",
        question: "O pagamento do veículo foi feito ___ vista, mas o financiamento ___ prazo foi recusado.",
        options: ["a / a", "à / a", "à / à"],
        correctOptionIndex: 1,
        explanation: "Locuções adverbiais femininas ('à vista', 'às pressas', 'à medida que') levam crase OBRIGATÓRIA. Já locuções com palavras masculinas ('a prazo', 'a pé', 'a cavalo') NÃO aceitam crase, pois não há artigo feminino envolvido."
    },
    {
        category: "Vírgula",
        question: "Goiânia ___ 15 de abril de 2024.",
        options: ["com vírgula", "sem vírgula"],
        correctOptionIndex: 0,
        explanation: "Em datas (cabeçalhos de documentos e cartas), a vírgula é OBRIGATÓRIA para separar o nome do lugar da data."
    },
    {
        category: "Vírgula",
        question: "O candidato estudou muito ___ logo, foi aprovado com louvor.",
        options: [", (vírgula)", "sem vírgula"],
        correctOptionIndex: 0,
        explanation: "A vírgula é OBRIGATÓRIA antes de conjunções conclusivas (logo, portanto, por conseguinte) que introduzem uma oração coordenada."
    },
    {
        category: "Concordância",
        question: "___ -se casas elegantes neste bairro.",
        options: ["Aluga", "Alugam"],
        correctOptionIndex: 1,
        explanation: "O 'se' atua como Partícula Apassivadora. A frase equivale a 'Casas elegantes SÃO ALUGADAS'. Como 'casas' é o sujeito (paciente) e está no plural, o verbo DEVE ir para o plural ('Alugam-se')."
    },
    {
        category: "Concordância",
        question: "Mais de um candidato ___ (recorreu / recorreram) da decisão da banca.",
        options: ["recorreu", "recorreram"],
        correctOptionIndex: 0,
        explanation: "A expressão 'mais de um' faz o verbo concordar SEMPRE no singular (concorda com o numeral 'um'). A exceção é apenas se houver ideia de reciprocidade (ex: Mais de um aluno se abraçaram)."
    },
    {
        category: "Regência",
        question: "Muitos jovens preferem as redes sociais ___ ler um livro clássico.",
        options: ["do que", "a"],
        correctOptionIndex: 1,
        explanation: "A regência clássica e exigida pelas bancas para o verbo PREFERIR é 'Preferir uma coisa A outra', e nunca 'do que' ou 'mais que'. O correto é: 'preferem as redes sociais A ler um livro'."
    },
    {
        category: "Regência",
        question: "A aprovação na prova custou ___ muito esforço e dedicação.",
        options: ["o aluno", "ao aluno"],
        correctOptionIndex: 1,
        explanation: "No sentido de 'dar trabalho' ou 'exigir', o verbo CUSTAR tem como sujeito a coisa (A aprovação custou) e como objeto indireto a pessoa que sofre o trabalho (ao aluno). Logo, 'A aprovação custou AO aluno (a + o) muito esforço'."
    },
    {
        category: "Conectivos",
        question: "___ a chuva forte, decidimos manter o cronograma de estudos.",
        options: ["Malgrado", "Consoante", "Por conseguinte"],
        correctOptionIndex: 0,
        explanation: "'Malgrado' é um conectivo CONCESSIVO, sendo sinônimo perfeito de 'Apesar de', 'Embora', 'A despeito de'. 'Consoante' indica conformidade (segundo/conforme) e 'Por conseguinte' indica conclusão."
    },
    {
        category: "Conectivos",
        question: "Qual conectivo é adequado para introduzir uma ideia de FINALIDADE (propósito) no parágrafo de Proposta de Intervenção (Enem)?",
        options: ["Na medida em que", "À medida que", "A fim de que"],
        correctOptionIndex: 2,
        explanation: "'A fim de que' introduz finalidade/objetivo. 'Na medida em que' expressa causa (porque/visto que). E 'À medida que' expressa proporção (à proporção que)."
    },
    // --- NOVOS EXERCÍCIOS DE ALTA DENSIDADE & CONECTIVOS AVANÇADOS ---
    {
        category: "Conectivos",
        question: "Em relação ao tempo e pontuação, assinale a construção gramaticalmente correta para iniciar um argumento na redação:",
        options: [
            "Desde a promulgação da Constituição de 1988 a saúde é garantida como direito universal.",
            "Desde a promulgação da Constituição de 1988, a saúde é garantida como direito universal."
        ],
        correctOptionIndex: 1,
        explanation: "Adjunto adverbial temporal de grande extensão (três ou mais palavras) deslocado para o início da oração exige vírgula OBRIGATÓRIA.",
        correctSide: "Desde a promulgação da Constituição de 1988, a saúde...",
        wrongSide: "Desde a promulgação da Constituição de 1988 a saúde...",
        concept: "Adjunto Adverbial Temporal Deslocado",
        conceptExplanation: "Quando a circunstância de tempo vem anteposta à oração principal, a pontuação isola o termo para garantir clareza e hierarquia sintática.",
        linoTip: "👨‍🏫 Lino Tip: Toda alusão histórica na introdução ('Na Idade Média,', 'No século XXI,') exige vírgula logo após o bloco temporal!"
    },
    {
        category: "Conectivos",
        question: "Para citar um sociólogo ou pensador na redação, qual regência do conectivo de conformidade está gramaticalmente correta?",
        options: [
            "Segundo ao pensamento de Zygmunt Bauman, a sociedade é líquida.",
            "Segundo o pensamento de Zygmunt Bauman, a sociedade é líquida."
        ],
        correctOptionIndex: 1,
        explanation: "As conjunções conformativas 'segundo' e 'conforme' NÃO admitem preposição 'a'. Diz-se 'Segundo o autor' ou 'Conforme o sociólogo'.",
        correctSide: "Segundo o sociólogo Zygmunt Bauman...",
        wrongSide: "Segundo ao sociólogo Zygmunt Bauman...",
        concept: "Conectivos de Conformidade",
        conceptExplanation: "Estabelecem equivalência lógica e respaldo de autoridade entre a tese do estudante e o pensamento de um filósofo ou lei.",
        linoTip: "👨‍🏫 Lino Tip: Consoante, Segundo e Conforme nunca pedem crase nem 'ao'! Guarde: 'Segundo o autor,'."
    },
    {
        category: "Conectivos",
        question: "Assinale a opção com a correlação verbal correta para o conectivo condicional 'Caso':",
        options: [
            "Caso o governo não intervir, a desigualdade aumentará.",
            "Caso o governo não intervenha, a desigualdade aumentará."
        ],
        correctOptionIndex: 1,
        explanation: "A conjunção condicional 'Caso' exige o verbo no PRESENTE DO SUBJUNTIVO ('intervenha'). O futuro do subjuntivo ('intervier') é usado apenas com 'Se' ('Se o governo não intervier'). 'Intervir' é infinitivo e gera erro gramatical grave.",
        correctSide: "Caso o governo não intervenha...",
        wrongSide: "Caso o governo não intervir...",
        concept: "Modo Subjuntivo com Conectivos Condicionais",
        conceptExplanation: "Conectivos como 'Caso', 'Contanto que' e 'Desde que' exigem subjuntivo obrigatório para marcar a hipótese.",
        linoTip: "👨‍🏫 Lino Tip: 'Caso faça', mas 'Se fizer'. Nunca use o infinitivo após conjunção condicional!"
    },
    {
        category: "Conectivos",
        question: "Qual das opções representa a locução proporcional correta segundo a norma-padrão da língua portuguesa?",
        options: [
            "À medida em que a tecnologia avança, novos dilemas surgem.",
            "À medida que a tecnologia avança, novos dilemas surgem.",
            "Na medida que a tecnologia avança, novos dilemas surgem."
        ],
        correctOptionIndex: 1,
        explanation: "A única locução proporcional aceita na norma culta é 'À MEDIDA QUE' (com crase e sem 'em'). 'À medida em que' é um hibridismo errôneo comum que zera o critério de precisão das bancas. 'Na medida em que' expressa causa e não proporção.",
        correctSide: "À medida que a tecnologia avança...",
        wrongSide: "À medida em que a tecnologia avança...",
        concept: "Diferença entre Proporção e Causa",
        conceptExplanation: "'À medida que' = proporção/simultaneidade. 'Na medida em que' = causa/visto que. A forma 'à medida em que' é erro gramatical grave.",
        linoTip: "👨‍🏫 Lino Tip: memorize: À MEDIDA QUE (proporção). Nunca misture o 'à' com o 'em'!"
    },
    {
        category: "Conectivos",
        question: "No parágrafo de proposta de intervenção, para indicar o propósito da ação, qual grafia está correta?",
        options: [
            "Afim de combater a intolerância, o Ministério deve agir.",
            "A fim de combater a intolerância, o Ministério deve agir."
        ],
        correctOptionIndex: 1,
        explanation: "A locução de finalidade escreve-se SEMPRE SEPARADA: 'A fim de' (= com o objetivo de). 'Afim' junto é adjetivo que significa semelhante (ex: interesses afins).",
        correctSide: "A fim de mitigar o problema...",
        wrongSide: "Afim de mitigar o problema...",
        concept: "Locução Prepositiva de Finalidade",
        conceptExplanation: "'A fim de' introduz a meta/propósito na oração reduzida de infinitivo. O termo junto 'afim' denota afinidade/parentesco.",
        linoTip: "👨‍🏫 Lino Tip: Na redação é sempre 'A FIM DE' (separado, 3 palavras)! O corretor do ENEM caça 'afim' para descontar na C1."
    },
    {
        category: "Conectivos",
        question: "Assinale a pontuação e estrutura correta para estabelecer uma comparação com repertório literário:",
        options: [
            "Assim como retratado em '1984', a manipulação algorítmica cerceia a autonomia do cidadão.",
            "Assim como retratado em '1984' a manipulação algorítmica cerceia a autonomia do cidadão."
        ],
        correctOptionIndex: 0,
        explanation: "Orações subordinadas comparativas antepostas à oração principal exigem vírgula obrigatória para isolar a analogia antes da tese central.",
        correctSide: "Assim como em '1984', a manipulação...",
        wrongSide: "Assim como em '1984' a manipulação...",
        concept: "Oração Comparativa Anteposta",
        conceptExplanation: "Conectivos comparativos ('Assim como', 'À semelhança de') antepostos estruturam a analogia do repertório e devem ser isolados por vírgula.",
        linoTip: "👨‍🏫 Lino Tip: Fechou a comparação com o livro/filme? Coloque a vírgula antes de entrar no Brasil de hoje!"
    },
    {
        category: "Conectivos",
        question: "Qual das frases utiliza adequadamente o conectivo concessivo clássico 'Conquanto'?",
        options: [
            "Conquanto a Constituição garante direitos, a prática é falha.",
            "Conquanto a Constituição garanta direitos, a prática é falha."
        ],
        correctOptionIndex: 1,
        explanation: "'Conquanto' (= embora) é uma conjunção concessiva subordinativa e EXIGE o verbo obrigatoriamente no modo SUBJUNTIVO ('garanta'). O uso do indicativo ('garante') é desvio grave.",
        correctSide: "Conquanto a lei garanta...",
        wrongSide: "Conquanto a lei garante...",
        concept: "Conjunção Concessiva e Modo Verbal",
        conceptExplanation: "A concessão introduz uma oposição que não anula a oração principal e rege estritamente o modo subjuntivo (presente ou imperfeito).",
        linoTip: "👨‍🏫 Lino Tip: 'Conquanto', 'embora' e 'mesmo que' puxam subjuntivo sempre! 'Conquanto haja', nunca 'conquanto há'."
    },
    {
        category: "Conectivos",
        question: "Como pontuar o operador asseverativo 'indubitavelmente' ao iniciar o período argumentativo?",
        options: [
            "Indubitavelmente a inércia estatal agrava a crise.",
            "Indubitavelmente, a inércia estatal agrava a crise."
        ],
        correctOptionIndex: 1,
        explanation: "Advérbios e operadores asseverativos que modalizam a frase inteira ('Indubitavelmente,', 'Com efeito,', 'De fato,') exigem vírgula obrigatória ao abrirem o período.",
        correctSide: "Indubitavelmente, a omissão...",
        wrongSide: "Indubitavelmente a omissão...",
        concept: "Modalizadores Asseverativos",
        conceptExplanation: "Operadores que expressam certeza autoral e ênfase na tese. Funcionam como articuladores discursivos isolados por vírgula.",
        linoTip: "👨‍🏫 Lino Tip: Asseverativos iniciam período sempre com vírgula: 'Com efeito,', 'De fato,', 'Certamente,'."
    },
    {
        category: "Paralelismo",
        question: "Qual das frases respeita o princípio do paralelismo sintático com o conectivo aditivo correlativo 'não só... mas também'?",
        options: [
            "A educação deve não só formar cidadãos conscientes, mas também capacitar profissionais éticos.",
            "A educação deve não só a formação de cidadãos conscientes, mas também capacitar profissionais éticos."
        ],
        correctOptionIndex: 0,
        explanation: "O paralelismo sintático exige que as estruturas coordenadas tenham a mesma forma gramatical: verbo no infinitivo ('formar') coordenado com verbo no infinitivo ('capacitar'). Misturar substantivo com verbo quebra o paralelismo.",
        correctSide: "não só formar... mas também capacitar...",
        wrongSide: "não só a formação... mas também capacitar...",
        concept: "Paralelismo Sintático Correlativo",
        conceptExplanation: "Conectivos duplos ('não só... mas também', 'tanto... quanto') exigem estrita identidade morfológica nas duas pontas da oração.",
        linoTip: "👨‍🏫 Lino Tip: Se colocou verbo depois de 'não só', obrigue-se a colocar verbo depois de 'mas também'!"
    },
    {
        category: "Conectivos",
        question: "Identifique a alternativa que evita o vício de linguagem combatido pelas bancas no uso da coesão referencial:",
        options: [
            "O ministro apresentou a proposta e o mesmo defendeu sua aprovação.",
            "O ministro apresentou a proposta e este defendeu sua aprovação."
        ],
        correctOptionIndex: 1,
        explanation: "A gramática normativa e os manuais do ENEM e UEMA condenam o uso de 'o mesmo' com função de pronome pessoal para retomar pessoas. Deve-se usar o pronome demonstrativo ('este'), relativo ('o qual') ou a elipse do sujeito.",
        correctSide: "O ministro... e este defendeu...",
        wrongSide: "O ministro... e o mesmo defendeu...",
        concept: "Emprego Correto de Pronomes Anafóricos",
        conceptExplanation: "'O mesmo' é pronome de reforço ('ele mesmo fez'), nunca pronome pessoal substituto de substantivo anterior.",
        linoTip: "👨‍🏫 Lino Tip: Banha o 'o mesmo' do seu texto! Troque por 'este', 'ele', 'o qual' ou simplesmente corte."
    },
    {
        category: "Vírgula",
        question: "Para expressar CONCLUSÃO com o conectivo 'pois', qual a posição e pontuação correta?",
        options: [
            "A evasão escolar é prejudicial, pois prejudica o futuro do país.",
            "A evasão escolar é prejudicial; deve, pois, ser combatida pelo Estado."
        ],
        correctOptionIndex: 1,
        explanation: "O conectivo 'pois' só tem valor CONCLUSIVO quando vem DESLOCADO após o verbo da oração, obrigatoriamente entre duas vírgulas. Quando vem antes do verbo, tem valor EXPLICATIVO/CAUSAL.",
        correctSide: "deve, pois, ser combatida...",
        wrongSide: "pois deve ser combatida (com sentido de conclusão)...",
        concept: "Polissemia e Pontuação do 'Pois'",
        conceptExplanation: "'Pois' anteposto ao verbo = causal/explicativo. 'Pois' posposto ao verbo (intercalado) = estritamente conclusivo (= portanto).",
        linoTip: "👨‍🏫 Lino Tip: Quer impressionar a banca na conclusão? Use o 'pois' após o verbo: 'Cabe, pois, ao Ministério agir'."
    },
    {
        category: "Conectivos",
        question: "Qual o valor semântico exato do conectivo clássico 'Porquanto'?",
        options: [
            "Conclusão (sinônimo de 'portanto')",
            "Causa / Explicação (sinônimo de 'já que', 'porque')",
            "Concessão (sinônimo de 'embora')"
        ],
        correctOptionIndex: 1,
        explanation: "Muitos alunos confundem 'Porquanto' com 'Portanto'. 'Porquanto' expressa CAUSA/EXPLICAÇÃO (equivale a 'porque', 'visto que'). 'Portanto' expressa CONCLUSÃO.",
        correctSide: "A medida falhou, porquanto faltou fiscalização (causa).",
        wrongSide: "Faltou fiscalização, porquanto a medida falhou (inversão errada).",
        concept: "Distinção entre Porquanto e Portanto",
        conceptExplanation: "Conjunção subordinativa causal de registro culto. Estabelece a razão do fato enunciado na oração principal.",
        linoTip: "👨‍🏫 Lino Tip: PorQUANTO = causa (porquê). PorTANTO = conclusão (portanto)."
    },

    // --- NOVOS MICRO-TREINOS: PARALELISMO SINTÁTICO ---
    {
        category: "Paralelismo",
        question: "Qual redação respeita o paralelismo sintático ao listar ações da proposta de intervenção?",
        options: [
            "Cabe ao Ministério da Educação investir em infraestrutura e garantindo a capacitação docente.",
            "Cabe ao Ministério da Educação investir em infraestrutura e garantir a capacitação docente."
        ],
        correctOptionIndex: 1,
        explanation: "As duas ações coordenadas dependem da mesma preposição/verbo auxiliar. Portanto, ambas devem conservar a mesma forma verbal no infinitivo: 'investir' e 'garantir'. Trocar para gerúndio ('garantindo') quebra a simetria gramatical.",
        correctSide: "investir em infraestrutura e garantir...",
        wrongSide: "investir em infraestrutura e garantindo...",
        concept: "Simetria de Formas Nominais",
        conceptExplanation: "Ações listadas em sequência na proposta de intervenção devem compartilhar a mesma classe gramatical e tempo verbal.",
        linoTip: "Lino Tip: Se começou com verbo no infinitivo, termine com verbo no infinitivo!"
    },
    {
        category: "Paralelismo",
        question: "Em relação ao paralelismo de regência com verbos distintos, qual construção é gramaticalmente impecável?",
        options: [
            "O cidadão entrou e saiu da sessão plenária sem se manifestar.",
            "O cidadão entrou na sessão plenária e saiu dela sem se manifestar."
        ],
        correctOptionIndex: 1,
        explanation: "O verbo 'entrar' rege a preposição 'em' (entrar EM algo), enquanto 'sair' rege a preposição 'de' (sair DE algo). Atribuir um único complemento ('da sessão') a verbos de regências diferentes quebra o paralelismo sintático.",
        correctSide: "entrou na sessão... e saiu dela...",
        wrongSide: "entrou e saiu da sessão...",
        concept: "Paralelismo de Regência Verbal",
        conceptExplanation: "Verbos com preposições distintas exigem complementos próprios; não podem compartilhar o mesmo termo regido.",
        linoTip: "Lino Tip: Cuidado ao juntar verbos que pedem preposições diferentes. Dê a cada um seu respectivo complemento!"
    },
    {
        category: "Paralelismo",
        question: "Identifique a sentença que preserva o paralelismo prepositivo em enumerações ternárias:",
        options: [
            "O país necessita de reformas estruturais, investimentos em saúde e que a população seja consciente.",
            "O país necessita de reformas estruturais, de investimentos em saúde e de conscientização popular."
        ],
        correctOptionIndex: 1,
        explanation: "Na enumeração regida pelo verbo 'necessitar', todos os núcleos devem manter a mesma estrutura preposicionada ('de reformas', 'de investimentos', 'de conscientização'). Misturar oração subordinada com substantivo quebra o ritmo do texto.",
        correctSide: "de reformas, de investimentos e de conscientização...",
        wrongSide: "de reformas, investimentos e que a população...",
        concept: "Paralelismo Prepositivo Ternário",
        conceptExplanation: "Se a preposição 'de' foi repetida no início de termos coordenados, deve manter o padrão em toda a cadeia de argumentos.",
        linoTip: "Lino Tip: Mantenha a preposição em todos os elementos da lista para dar elegância rítmica ao D1 e D2."
    },
    {
        category: "Paralelismo",
        question: "No uso de conectivos correlativos 'tanto... quanto', qual frase mantém a simetria morfológica exata?",
        options: [
            "O entrave decorre tanto pela ausência de leis quanto o descaso das autoridades.",
            "O entrave decorre tanto da ausência de leis quanto do descaso das autoridades."
        ],
        correctOptionIndex: 1,
        explanation: "O verbo 'decorrer' rege a preposição 'de' (decorre DE algo). Ao usar 'tanto... quanto', a preposição 'de' contraída com o artigo deve figurar em ambas as pontas: 'tanto DA ausência... quanto DO descaso'.",
        correctSide: "tanto da ausência... quanto do descaso...",
        wrongSide: "tanto pela ausência... quanto o descaso...",
        concept: "Correlação Bipolar Simétrica",
        conceptExplanation: "Estruturas com conectivos bipolares ('tanto... quanto', 'não só... mas também') exigem rigorosa paridade morfológica.",
        linoTip: "Lino Tip: 'Tanto DA...' exige 'quanto DO...'. Não misture 'pela' com 'o'!"
    },
    {
        category: "Paralelismo",
        question: "Qual alternativa respeita o paralelismo de orações subordinadas substantivas na tese da introdução?",
        options: [
            "Defende-se que as políticas públicas sejam ampliadas e a punição mais rigorosa aos infratores.",
            "Defende-se que as políticas públicas sejam ampliadas e que a punição aos infratores seja mais rigorosa."
        ],
        correctOptionIndex: 1,
        explanation: "A oração principal 'Defende-se' introduz orações subordinadas substantivas subjetivas coordenadas. Ambas devem manter a conjunção integrante 'que' e o verbo conjugado: 'que sejam ampliadas e que a punição seja mais rigorosa'.",
        correctSide: "que as políticas sejam... e que a punição seja...",
        wrongSide: "que as políticas sejam... e a punição mais rigorosa...",
        concept: "Paralelismo de Orações Subordinadas",
        conceptExplanation: "Coordenar uma oração desenvolvida com um sintagma nominal quebrado gera defeito de paralelismo severamente punido na C1 e C4 do ENEM.",
        linoTip: "Lino Tip: Se colocou 'que [verbo]', repita 'e que [verbo]' na segunda parte da sua tese!"
    },
    {
        category: "Paralelismo",
        question: "Assinale a opção em que a correlação de tempo e modo verbal (paralelismo modal) é estritamente mantida:",
        options: [
            "Se o governo investisse na base escolar, o Brasil colheria frutos duradouros.",
            "Se o governo investisse na base escolar, o Brasil colherá frutos duradouros."
        ],
        correctOptionIndex: 0,
        explanation: "O pretérito imperfeito do subjuntivo ('investisse') correlaciona-se obrigatoriamente com o futuro do pretérito do indicativo ('colheria'). O futuro do presente ('colherá') só combinaria com o futuro do subjuntivo ('se investir').",
        correctSide: "Se investisse... colheria...",
        wrongSide: "Se investisse... colherá...",
        concept: "Correlação Temporal e Modal",
        conceptExplanation: "A harmonia entre hipótese no subjuntivo e consequência no indicativo é fundamental para a coerência lógica do argumento.",
        linoTip: "Lino Tip: '-sse' combina com '-ria': 'Se fizesse, colheria'. 'Se fizer, colherá'."
    },

    // --- NOVOS MICRO-TREINOS: CRASE ---
    {
        category: "Crase",
        question: "Qual frase exige acento indicativo de crase por conter locução conjuntiva proporcional feminina?",
        options: [
            "À medida que a tecnologia avança, novos dilemas éticos surgem.",
            "A medida que a tecnologia avança, novos dilemas éticos surgem."
        ],
        correctOptionIndex: 0,
        explanation: "Locuções conjuntivas, prepositivas e adverbiais femininas ('à medida que', 'à proporção que', 'à luz de', 'à noite') levam crase obrigatória por convenção histórica da língua portuguesa.",
        correctSide: "À medida que a tecnologia avança...",
        wrongSide: "A medida que a tecnologia avança...",
        concept: "Crase em Locuções Femininas",
        conceptExplanation: "Todas as locuções formadas por núcleo substantivo feminino recebem o sinal grave indicativo de crase.",
        linoTip: "Lino Tip: 'À medida que' e 'À proporção que' sempre começam com crase no início do período!"
    },
    {
        category: "Crase",
        question: "No trecho 'A diretriz ___ qual o autor se referiu no livro', a forma correta é:",
        options: [
            "a",
            "à"
        ],
        correctOptionIndex: 1,
        explanation: "Quem se refere, refere-se A alguma coisa (preposição exigida pelo verbo). O pronome relativo 'a qual' possui o artigo feminino 'a'. A fusão da preposição 'a' com o artigo 'a' gera a crase: 'à qual'.",
        correctSide: "a diretriz à qual o autor se referiu...",
        wrongSide: "a diretriz a qual o autor se referiu...",
        concept: "Crase Diante de Pronome Relativo 'A qual'",
        conceptExplanation: "O verbo posposto 'referir-se' rege preposição 'a', fundindo-se com o artigo do pronome relativo antecedente.",
        linoTip: "Lino Tip: Olhe o verbo depois do pronome: se ele pedir preposição 'a', use 'à qual'!"
    },
    {
        category: "Crase",
        question: "Em expressões com substantivos repetidos, como 'frente a frente', o uso da crase é:",
        options: [
            "Proibido ('frente a frente')",
            "Obrigatório ('frente à frente')"
        ],
        correctOptionIndex: 0,
        explanation: "Em locuções com palavras repetidas ('frente a frente', 'cara a cara', 'gota a gota', 'dia a dia'), o 'a' intermediário é pura preposição; não há artigo definido feminino presente. Logo, a crase é proibida.",
        correctSide: "frente a frente, cara a cara, dia a dia",
        wrongSide: "frente à frente, cara à cara, dia à dia",
        concept: "Proibição da Crase em Palavras Repetidas",
        conceptExplanation: "Não existe artigo diante do segundo termo em expressões idênticas e simétricas.",
        linoTip: "Lino Tip: Palavras gêmeas com 'a' no meio nunca levam crase! 'Dia a dia', 'gota a gota'."
    },
    {
        category: "Crase",
        question: "Em cartas ou textos dirigidos a autoridades ('Dirijo-me ___ Vossa Senhoria'), a crase é:",
        options: [
            "Proibida ('Dirijo-me a Vossa Senhoria')",
            "Obrigatória ('Dirijo-me à Vossa Senhoria')"
        ],
        correctOptionIndex: 0,
        explanation: "Pronomes de tratamento em geral (Vossa Excelência, Vossa Senhoria, Você) rejeitam artigo definido feminino. Havendo apenas a preposição 'a', não ocorre a fusão que caracterizaria a crase. (Exceções: Senhora, Senhorita e Dona).",
        correctSide: "Dirijo-me a Vossa Senhoria / a Vossa Excelência",
        wrongSide: "Dirijo-me à Vossa Senhoria / à Vossa Excelência",
        concept: "Crase com Pronomes de Tratamento",
        conceptExplanation: "A imensa maioria dos pronomes de tratamento não aceita artigo; logo, não ocorre crase.",
        linoTip: "Lino Tip: Na Carta do Leitor, 'Vossa Senhoria' e 'Vossa Excelência' nunca aceitam crase!"
    },
    {
        category: "Crase",
        question: "Diante de pronome possessivo feminino singular ('submeteu a proposta ___ sua equipe'), a crase é:",
        options: [
            "Obrigatória",
            "Facultativa (tanto 'a sua equipe' quanto 'à sua equipe' estão corretos)"
        ],
        correctOptionIndex: 1,
        explanation: "Antes de pronomes possessivos femininos no singular ('minha', 'tua', 'sua', 'nossa'), o uso do artigo feminino é facultativo na língua portuguesa. Como o artigo é opcional, a crase também se torna facultativa.",
        correctSide: "à sua equipe OU a sua equipe (ambos aceitos)",
        wrongSide: "considerar uma delas erro em prova",
        concept: "Casos Facultativos de Crase",
        conceptExplanation: "Pronomes possessivos femininos singulares permitem o artigo opcional, tornando o acento grave facultativo.",
        linoTip: "Lino Tip: Antes de 'minha', 'sua', 'nossa', você escolhe se coloca crase ou não!"
    },
    {
        category: "Crase",
        question: "Na oração 'O autor escreveu uma crônica ___ Machado de Assis', ocorre crase porque:",
        options: [
            "Não ocorre crase, pois 'Machado de Assis' é nome masculino.",
            "Ocorre crase ('à Machado de Assis') porque está subentendida a expressão feminina 'à moda de'."
        ],
        correctOptionIndex: 1,
        explanation: "Mesmo diante de nome masculino, se a expressão feminina 'à moda de' ou 'à maneira de' estiver elíptica (subentendida), a crase é obrigatória: 'escreveu à [moda de] Machado de Assis'.",
        correctSide: "à Machado de Assis (= à moda de Machado)",
        wrongSide: "a Machado de Assis (quando o sentido for o estilo/modo)",
        concept: "Crase Elíptica 'À Moda de'",
        conceptExplanation: "A elipse do termo feminino 'moda' justifica a presença do artigo e da preposição fundidos.",
        linoTip: "Lino Tip: Expressões que significam 'no estilo de' levam crase mesmo antes de homem: 'à Machado', 'à Pelé'."
    },

    // --- NOVOS MICRO-TREINOS: VÍRGULA ---
    {
        category: "Vírgula",
        question: "Na oração adjetiva restritiva 'Os médicos que atuam no interior recebem incentivos', as vírgulas são:",
        options: [
            "Proibidas, pois a oração restringe apenas uma parcela específica dos médicos.",
            "Obrigatórias, pois toda oração adjetiva deve vir entre vírgulas."
        ],
        correctOptionIndex: 0,
        explanation: "Orações adjetivas restritivas delimitam o sentido do substantivo (apenas os médicos que atuam no interior, não todos os médicos). O uso de vírgulas transformaria a oração em explicativa, alterando o sentido lógico da frase.",
        correctSide: "Os médicos que atuam no interior recebem... (restritiva, sem vírgula)",
        wrongSide: "Os médicos, que atuam no interior, recebem... (explicativa, generalizando)",
        concept: "Restritiva vs Explicativa na Pontuação",
        conceptExplanation: "Com vírgulas = explica todos; sem vírgulas = restringe a um subgrupo. Mudar a pontuação altera o sentido argumentativo.",
        linoTip: "Lino Tip: Se quiser falar de TODOS, use vírgulas. Se quiser falar de APENAS ALGUNS, corte as vírgulas!"
    },
    {
        category: "Vírgula",
        question: "Quando o conectivo aditivo 'e' une duas orações coordenadas com SUJEITOS DIFERENTES, a vírgula é:",
        options: [
            "Recomendada e elegante: 'O parlamento aprovou a proposta, e o presidente sancionou a lei.'",
            "Proibida em qualquer circunstância antes da conjunção 'e'."
        ],
        correctOptionIndex: 0,
        explanation: "A gramática normativa recomenda o uso de vírgula antes da conjunção 'e' quando as orações coordenadas possuem sujeitos distintos (Sujeito 1: 'O parlamento'; Sujeito 2: 'o presidente'), evitando confusão sintática para o leitor.",
        correctSide: "O parlamento aprovou a proposta, e o presidente sancionou...",
        wrongSide: "proibir a vírgula antes do 'e' com sujeitos diferentes",
        concept: "Vírgula Antes do 'E' com Sujeitos Distintos",
        conceptExplanation: "Sujeitos diferentes em orações aditivas pedem vírgula para clareza e demarcação sintática.",
        linoTip: "Lino Tip: Sujeitos diferentes antes e depois do 'e'? Coloque vírgula antes do 'e' sem medo!"
    },
    {
        category: "Vírgula",
        question: "Na elipse ou omissão proposital de um verbo já citado no período anterior, utiliza-se:",
        options: [
            "Vírgula vicária: 'O primeiro argumento aborda as causas; o segundo, as consequências.'",
            "Nenhum sinal de pontuação ou parênteses."
        ],
        correctOptionIndex: 0,
        explanation: "A vírgula vicária (ou vírgula de zeugma) é empregada para marcar a elipse de um verbo anteriormente expresso, evitando repetição desnecessária e demonstrando altíssimo domínio sintático.",
        correctSide: "O primeiro debate as causas; o segundo, as consequências.",
        wrongSide: "O primeiro debate as causas; o segundo as consequências (sem vírgula).",
        concept: "Vírgula Vicária (Zeugma)",
        conceptExplanation: "Recurso de estilo da norma culta que substitui o verbo omitido para manter a concisão.",
        linoTip: "Lino Tip: Omitiu o verbo para não repetir? Marque o lugar dele com uma vírgula elegante!"
    },
    {
        category: "Vírgula",
        question: "Em redações de vestibular do gênero Carta (ou em correspondências formais), o vocativo deve vir:",
        options: [
            "Obrigatoriamente isolado por vírgula: 'Prezados editores, venho manifestar meu ponto de vista...'",
            "Sem qualquer pontuação após o chamamento."
        ],
        correctOptionIndex: 0,
        explanation: "O vocativo é um termo sintático independente que expressa chamamento ou interpelação direta ao interlocutor. Deve vir SEMPRE isolado por vírgula no início, meio ou fim da frase.",
        correctSide: "Prezados editores, venho manifestar...",
        wrongSide: "Prezados editores venho manifestar...",
        concept: "Pontuação Obrigatória do Vocativo",
        conceptExplanation: "Vocativo sem vírgula é falha grave de convenção e desconta pontos de estrutura de gênero e norma culta.",
        linoTip: "Lino Tip: Chamou alguém pelo nome ou cargo? Vírgula obrigatória logo após!"
    },
    {
        category: "Vírgula",
        question: "A frase 'O autor da célebre obra modernista, destacou as mazelas do sertão' cometeu qual erro?",
        options: [
            "Separou o sujeito ('O autor da célebre obra modernista') do predicado por vírgula.",
            "Não cometeu erro; a vírgula é estilística para respirar."
        ],
        correctOptionIndex: 0,
        explanation: "Jamais se separa o sujeito do predicado por vírgula única, não importa quão longo seja o sujeito. Vírgula NÃO é pausa para respirar; é organizador de blocos sintáticos.",
        correctSide: "O autor da célebre obra modernista destacou as mazelas...",
        wrongSide: "O autor da célebre obra modernista, destacou as mazelas...",
        concept: "Proibição da Separação Sujeito-Predicado",
        conceptExplanation: "A ligação entre o agente e a ação principal não pode ser fraturada por vírgula isolada.",
        linoTip: "Lino Tip: 'Vírgula do infarto' = colocar vírgula entre o sujeito e o verbo. Proibido!"
    },
    {
        category: "Vírgula",
        question: "Na frase 'A sociedade brasileira tem sede de justiça', colocar vírgula antes da preposição ('tem sede, de justiça') é:",
        options: [
            "Erro grave: é proibido separar o nome do seu complemento nominal por vírgula.",
            "Recurso facultativo de ênfase estilística."
        ],
        correctOptionIndex: 0,
        explanation: "Termos ligados por dependência nominal imediata (substantivo e seu complemento nominal: 'sede' + 'de justiça') nunca podem ser separados por vírgula.",
        correctSide: "tem sede de justiça (sem vírgula)",
        wrongSide: "tem sede, de justiça",
        concept: "Inseparabilidade do Complemento Nominal",
        conceptExplanation: "O complemento nominal integra o significado do nome e deve permanecer adjacente a ele.",
        linoTip: "Lino Tip: Nunca coloque vírgula antes do complemento que completa o sentido de um substantivo ou adjetivo."
    },

    // --- NOVOS MICRO-TREINOS: CONCORDÂNCIA ---
    {
        category: "Concordância",
        question: "Com o verbo impessoal 'haver' no sentido de existir ou ocorrer, a concordância correta na oração é:",
        options: [
            "Havia muitas divergências entre os juristas sobre a constitucionalidade da matéria.",
            "Haviam muitas divergências entre os juristas sobre a constitucionalidade da matéria."
        ],
        correctOptionIndex: 0,
        explanation: "O verbo 'haver', quando tem sentido de 'existir' ou 'acontecer', é impessoal: não possui sujeito gramatical com quem concordar. Portanto, permanece estritamente na 3ª pessoa do singular ('Havia', 'Houve', 'Há').",
        correctSide: "Havia muitas divergências...",
        wrongSide: "Haviam muitas divergências...",
        concept: "Impessoalidade do Verbo Haver",
        conceptExplanation: "'Haver' com sentido existencial não flexiona para o plural. 'Muitas divergências' é objeto direto dele, não sujeito.",
        linoTip: "Lino Tip: Troque por 'existir' na sua cabeça: 'Existiam problemas' = 'HAVIA problemas' (sempre singular!)."
    },
    {
        category: "Concordância",
        question: "Na expressão 'trata-se de', acompanhada de termo no plural, a forma correta na norma culta é:",
        options: [
            "Tratam-se de graves problemas estruturais.",
            "Trata-se de graves problemas estruturais."
        ],
        correctOptionIndex: 1,
        explanation: "O 'se' aqui é Índice de Indeterminação do Sujeito junto a verbo transitivo indireto (rege preposição 'de'). O verbo fica OBRIGATORIAMENTE na 3ª pessoa do singular. A forma 'tratam-se de' não existe na norma padrão.",
        correctSide: "Trata-se de graves problemas...",
        wrongSide: "Tratam-se de graves problemas...",
        concept: "Índice de Indeterminação do Sujeito",
        conceptExplanation: "Verbo transitivo indireto acompanhado de partícula apassivadora/indeterminadora 'se' permanece no singular.",
        linoTip: "Lino Tip: Tem 'de' depois de 'trata-se'? Fica SEMPRE no singular: 'Trata-se de medidas urgentes'."
    },
    {
        category: "Concordância",
        question: "Com expressões partitivas seguidas de adjunto no plural ('A maioria dos jovens ___ do processo'), a regra aceita:",
        options: [
            "Apenas o singular ('participa').",
            "Tanto o singular ('participa', concordando com 'a maioria') quanto o plural ('participam', concordando com 'jovens')."
        ],
        correctOptionIndex: 1,
        explanation: "Diante de expressões partitivas ('a maioria de', 'grande parte de', 'uma parcela de') seguidas de termo no plural, a gramática normativa admite concordância lógica no singular (com o núcleo) ou atrativa no plural (com o adjunto).",
        correctSide: "A maioria participa OU A maioria participam (ambas válidas)",
        wrongSide: "penalizar uma das construções como incorreta",
        concept: "Concordância com Expressões Partitivas",
        conceptExplanation: "Flexibilidade sintática aceita pelas 6 bancas, desde que mantida a coerência no parágrafo.",
        linoTip: "Lino Tip: Você pode escolher: concordar com 'a maioria' (singular) ou com 'dos jovens' (plural). Ambas tiram nota máxima!"
    },
    {
        category: "Concordância",
        question: "Quando o sujeito composto vem ANTES do verbo ('O ministro e o secretário ___ à solenidade'), o verbo deve:",
        options: [
            "Ficar obrigatoriamente no plural: 'compareceram'.",
            "Concordar apenas com o termo mais próximo: 'compareceu'."
        ],
        correctOptionIndex: 0,
        explanation: "Sujeito composto anteposto ao verbo exige concordância estrita no plural ('O ministro e o secretário compareceram'). A concordância atrativa com o núcleo mais próximo só é permitida quando o verbo vem antes do sujeito.",
        correctSide: "O ministro e o secretário compareceram...",
        wrongSide: "O ministro e o secretário compareceu...",
        concept: "Sujeito Composto Anteposto",
        conceptExplanation: "A soma de dois ou mais agentes antes do predicado impõe a flexão plural obrigatória.",
        linoTip: "Lino Tip: Dois sujeitos antes do verbo? O verbo vai para o plural sem exceção!"
    },
    {
        category: "Concordância",
        question: "Nas expressões 'é proibido' / 'é necessário', quando o substantivo vem DESACOMPANHADO de artigo, a forma correta é:",
        options: [
            "É proibido entrada de pessoas estranhas.",
            "É proibida entrada de pessoas estranhas."
        ],
        correctOptionIndex: 0,
        explanation: "Sem artigo determinante, o adjetivo predicativo permanece invariável no masculino singular: 'É proibido entrada'. Se houvesse artigo feminino ('a entrada'), flexionaria para o feminino: 'É proibida A entrada'.",
        correctSide: "É proibido entrada / É proibida a entrada",
        wrongSide: "É proibida entrada (sem artigo)",
        concept: "Invariabilidade de Expressões Predicativas",
        conceptExplanation: "A presença ou ausência do artigo definido determina a concordância do adjetivo que compõe o predicado nominal.",
        linoTip: "Lino Tip: Sem artigo = masculino singular ('É proibido entrada'). Com artigo = feminino ('É proibida A entrada')."
    },
    {
        category: "Concordância",
        question: "Na concordância com percentual seguido de especificador no singular ('30% da população ___ de saneamento básico'):",
        options: [
            "O verbo pode concordar tanto no singular ('carece') com o especificador quanto no plural ('carecem') com o numeral.",
            "O verbo deve ficar obrigatoriamente no plural sempre."
        ],
        correctOptionIndex: 0,
        explanation: "Quando a porcentagem no plural é seguida de substantivo no singular ('da população'), o verbo pode concordar com o número ('carecem') ou por atração com o substantivo singular ('carece'). Ambas são formas cultas legítimas.",
        correctSide: "30% da população carece OU carecem",
        wrongSide: "reputar a concordância atrativa como errada",
        concept: "Concordância com Numerais Percentuais",
        conceptExplanation: "Dupla possibilidade de concordância facultada pela norma padrão em estruturas com partitivo percentual.",
        linoTip: "Lino Tip: '30% da população carece' soa muito natural e elegante em redações dissertativas!"
    },

    // --- NOVOS MICRO-TREINOS: REGÊNCIA ---
    {
        category: "Regência",
        question: "Qual a regência culta do verbo 'implicar' no sentido de acarretar/trazer como consequência?",
        options: [
            "A omissão estatal implicará em severos prejuízos à sociedade.",
            "A omissão estatal implicará severos prejuízos à sociedade."
        ],
        correctOptionIndex: 1,
        explanation: "No padrão culto, o verbo 'implicar' com sentido de 'acarretar' é Transitivo Direto: não admite a preposição 'em'. Dizer 'implicará em prejuízos' é vício comum penalizado na C1 do ENEM e bancas como UEMA e UFG.",
        correctSide: "implicará severos prejuízos...",
        wrongSide: "implicará em severos prejuízos...",
        concept: "Transitividade Direta do Verbo Implicar",
        conceptExplanation: "Verbo transitivo direto exige objeto direto sem preposição. Cortar a preposição 'em' é imperativo.",
        linoTip: "Lino Tip: Delete o 'em' depois do verbo implicar! Diga 'implicará mudanças', nunca 'implicará em mudanças'."
    },
    {
        category: "Regência",
        question: "O verbo 'visar' no sentido de almejar/ter por objetivo rege:",
        options: [
            "Preposição 'a': 'As políticas públicas devem visar ao bem-estar coletivo.'",
            "Sem preposição: 'As políticas públicas devem visar o bem-estar coletivo.'"
        ],
        correctOptionIndex: 0,
        explanation: "'Visar' sem preposição significa mirar (com arma) ou apor visto (em documento). Quando significa 'almejar', 'ter como meta', é estritamente Transitivo Indireto e rege a preposição 'a' ('visar ao bem-estar').",
        correctSide: "visar ao bem-estar coletivo...",
        wrongSide: "visar o bem-estar coletivo...",
        concept: "Regência Indireta do Verbo Visar",
        conceptExplanation: "A mudança de regência acarreta alteração semântica profunda do verbo na norma culta.",
        linoTip: "Lino Tip: Visar no sentido de ter como meta pede 'AO' ou 'À': 'visar ao sucesso', 'visar à igualdade'."
    },
    {
        category: "Regência",
        question: "Com o verbo 'assistir' no sentido de presenciar/ver, a forma padrão recomendada é:",
        options: [
            "A população assistiu o debate estarrecida.",
            "A população assistiu ao debate estarrecida."
        ],
        correctOptionIndex: 1,
        explanation: "'Assistir o' significa prestar assistência/cuidar ('O médico assiste o paciente'). 'Assistir AO' significa presenciar/ver. Como a população viu o debate, a regência correta é com preposição 'a'.",
        correctSide: "assistiu ao debate / assistiu ao filme",
        wrongSide: "assistiu o debate / assistiu o filme",
        concept: "Dupla Regência do Verbo Assistir",
        conceptExplanation: "Distinção entre sentido de assistência médica (VTD) e sentido de contemplação visual (VTI).",
        linoTip: "Lino Tip: Assistir no sentido de ver sempre pede 'ao' ou 'à': 'assistir ao documentário'."
    },
    {
        category: "Regência",
        question: "O verbo 'obedecer' e seu antônimo 'desobedecer' são classificados na norma culta como:",
        options: [
            "Transitivos indiretos: regem a preposição 'a' ('obedecer às leis', 'desobedecer ao regulamento').",
            "Transitivos diretos: não admitem preposição ('obedecer as leis')."
        ],
        correctOptionIndex: 0,
        explanation: "Os verbos 'obedecer' e 'desobedecer' exigem obrigatoriamente a preposição 'a'. Portanto, com termos femininos, ocorre crase: 'obedecer às normas constitucionais'.",
        correctSide: "obedecer às leis / desobedecer ao estatuto",
        wrongSide: "obedecer as leis / desobedecer o estatuto",
        concept: "Transitividade do Verbo Obedecer",
        conceptExplanation: "Exige objeto indireto regido pela preposição 'a'. Seu uso como transitivo direto é erro gramatical.",
        linoTip: "Lino Tip: Quem obedece, obedece A algo: 'obedecer às regras', 'obedecer aos princípios'."
    },
    {
        category: "Regência",
        question: "Na construção com o verbo 'preferir', qual alternativa obedece rigorosamente à norma padrão?",
        options: [
            "O jovem prefere mais as redes sociais do que a leitura de livros.",
            "O jovem prefere as redes sociais à leitura de livros."
        ],
        correctOptionIndex: 1,
        explanation: "O verbo 'preferir' já contém carga comparativa em si mesmo. Rejeita advérbios de intensidade ('mais', 'mil vezes') e conectivos comparativos ('do que'). Rege a preposição 'a': 'preferir X a Y'.",
        correctSide: "prefere o diálogo ao confronto violento",
        wrongSide: "prefere mais o diálogo do que o confronto",
        concept: "Regência Pura do Verbo Preferir",
        conceptExplanation: "Proíbe 'mais' e 'do que'. A correlação correta é 'preferir uma coisa A outra'.",
        linoTip: "Lino Tip: Nunca diga 'prefiro mais... do que'. Diga: 'prefiro o estudo ao descanso'."
    },
    {
        category: "Regência",
        question: "Com o verbo 'aspirar' no sentido de desejar ardentemente/almejar, a construção correta é:",
        options: [
            "O cidadão aspira à justiça social plena.",
            "O cidadão aspira a justiça social plena (sem crase)."
        ],
        correctOptionIndex: 0,
        explanation: "'Aspirar o' significa sugar/inalar ('aspirar o ar puro'). 'Aspirar A' significa almejar/pretender ('aspirar ao cargo', 'aspirar à justiça'). Havendo palavra feminina com artigo, a crase é obrigatória.",
        correctSide: "aspira à estabilidade / aspira ao cargo",
        wrongSide: "aspira a estabilidade (sem crase, com sentido de almejar)",
        concept: "Regência Semântica do Verbo Aspirar",
        conceptExplanation: "A presença da preposição 'a' define o sentido de meta ou aspiração pessoal/social.",
        linoTip: "Lino Tip: Aspirar no sentido de ter um sonho pede 'a': 'aspirar à vaga', 'aspirar ao progresso'."
    },

    // --- NOVOS MICRO-TREINOS: USO DO INFINITIVO ---
    {
        category: "Uso do Infinitivo",
        question: "Quando o sujeito da oração reduzida de infinitivo for diferente do sujeito da principal ('O Estado criou bolsas para os jovens ___'), a flexão é:",
        options: [
            "Obrigatória: 'para os jovens estudarem'.",
            "Proibida: 'para os jovens estudar'."
        ],
        correctOptionIndex: 0,
        explanation: "Quando o infinitivo possui sujeito próprio e explícito ('os jovens'), que não coincide com o sujeito da oração principal ('O Estado'), a flexão do infinitivo no plural é obrigatória para clareza sintática.",
        correctSide: "para os jovens estudarem...",
        wrongSide: "para os jovens estudar...",
        concept: "Infinitivo com Sujeito Próprio Distinto",
        conceptExplanation: "O infinitivo flexionado evidencia o agente da oração subordinada reduzida adverbial final.",
        linoTip: "Lino Tip: Sujeito explícito no plural logo antes do infinitivo? Flexione o verbo: 'para eles entenderem'."
    },
    {
        category: "Uso do Infinitivo",
        question: "Diante de preposição regendo complemento de valor genérico ou substantivado ('O dever de ___ a fauna'), o infinitivo deve:",
        options: [
            "Permanecer no singular (não flexionado): 'O dever de proteger a fauna.'",
            "Flexionar no plural: 'O dever de protegerem a fauna.'"
        ],
        correctOptionIndex: 0,
        explanation: "Quando o infinitivo é regido de preposição formando complemento de substantivo ('dever de', 'capacidade de') com sentido amplo e indeterminado, a regra culta prescreve o infinitivo não flexionado.",
        correctSide: "o dever de proteger / o direito de participar",
        wrongSide: "o dever de protegerem (em sentido geral)",
        concept: "Infinitivo Impessoal Regido de Preposição",
        conceptExplanation: "Em locuções com substantivos abstratos de sentido geral, o infinitivo atua como nome e não deve flexionar.",
        linoTip: "Lino Tip: 'O dever de combater', 'a obrigação de agir': mantenha no singular neutro!"
    },
    {
        category: "Uso do Infinitivo",
        question: "Em locuções verbais compostas por verbo auxiliar + infinitivo ('Os órgãos competentes devem ___ a fiscalização'), a flexão ocorre em:",
        options: [
            "Apenas no verbo auxiliar: 'Os órgãos competentes devem intensificar a fiscalização.'",
            "Em ambos os verbos: 'Os órgãos competentes devem intensificarem a fiscalização.'"
        ],
        correctOptionIndex: 0,
        explanation: "Em locuções verbais, apenas o verbo auxiliar flexiona em número e pessoa concordando com o sujeito ('devem'). O verbo principal permanece na sua forma nominal infinitiva neutra ('intensificar').",
        correctSide: "devem intensificar / podem agir",
        wrongSide: "devem intensificarem / podem agirem",
        concept: "Locuções Verbais com Infinitivo",
        conceptExplanation: "O verbo auxiliar carrega todas as marcas morfológicas de tempo, modo e pessoa da oração.",
        linoTip: "Lino Tip: Nunca flexione o segundo verbo de uma locução: 'Eles devem agir', nunca 'devem agirem'!"
    },
    {
        category: "Uso do Infinitivo",
        question: "Nas orações com verbos causativos (mandar, deixar, fazer) e sensitivos (ver, ouvir) seguidos de pronome oblíquo ('Deixei-os ___'), a forma elegante é:",
        options: [
            "Infinitivo não flexionado: 'Deixei-os sair sem restrições.'",
            "Infinitivo flexionado: 'Deixei-os saírem sem restrições.'"
        ],
        correctOptionIndex: 0,
        explanation: "Com verbos causativos e sensitivos acompanhados de pronome oblíquo átono funcionando como sujeito acusativo ('os'), a tradição gramatical recomenda o infinitivo sem flexão ('Deixei-os sair', 'Vi-os passar').",
        correctSide: "Deixei-os sair / Mandei-os entrar",
        wrongSide: "Deixei-os saírem / Mandei-os entrarem",
        concept: "Infinitivo com Verbos Causativos e Sensitivos",
        conceptExplanation: "O pronome atua como sujeito da oração reduzida e o infinitivo permanece tradicionalmente invariável.",
        linoTip: "Lino Tip: Depois de 'deixar', 'fazer', 'ver': 'Deixou-os falar', 'Fez-nos pensar'."
    },

    // --- NOVOS MICRO-TREINOS: CONECTIVOS & COESÃO ---
    {
        category: "Conectivos",
        question: "O pronome relativo 'onde' só pode ser legitimamente empregado na redação quando seu antecedente for:",
        options: [
            "Lugar físico ou espacial concreto ('O hospital onde atua', 'O município onde reside').",
            "Qualquer contexto conceitual ou abstrato ('A sociedade onde vivemos', 'A lei onde prevê igualdade')."
        ],
        correctOptionIndex: 0,
        explanation: "O pronome 'onde' é de base exclusivamente espacial. Empregar 'onde' para retomar 'sociedade', 'filme', 'época', 'situação' ou 'lei' é considerado desvio coesivo grave pelas bancas (UFG, ENEM, UEMA). Use 'em que', 'no qual' ou 'na qual'.",
        correctSide: "A sociedade em que vivemos / A lei na qual se prevê...",
        wrongSide: "A sociedade onde vivemos / A lei onde prevê...",
        concept: "Restrição Semântica do Pronome Onde",
        conceptExplanation: "Pronome relativo que denota estritamente posição espacial concreta com endereço ou limites físicos.",
        linoTip: "Lino Tip: Sociedade e lei não têm CEP no GPS! Troque 'onde' por 'em que' ou 'no qual'."
    },
    {
        category: "Conectivos",
        question: "A expressão argumentativa de reforço 'haja vista' apresenta qual comportamento na norma culta?",
        options: [
            "É invariável: 'Haja vista os inúmeros desafios contemporâneos.'",
            "Flexiona obrigatoriamente para o plural: 'Hajam vistas aos desafios contemporâneos.'"
        ],
        correctOptionIndex: 0,
        explanation: "A locução 'haja vista' tem valor adverbial/prepositivo e permanece invariavelmente no singular ('haja vista os problemas'). A flexão 'hajam vistas' é repudiada pela norma culta e penalizada em bancas rigorosas.",
        correctSide: "Haja vista os desafios...",
        wrongSide: "Hajam vistas aos desafios...",
        concept: "Invariabilidade da Locução Haja Vista",
        conceptExplanation: "Locução consagrada que opera como 'veja-se' ou 'considere-se', sem flexão de número.",
        linoTip: "Lino Tip: 'Haja vista' nunca muda: nem 'hajam', nem 'vistas'. É sempre 'Haja vista'!"
    },
    {
        category: "Conectivos",
        question: "A locução clássica 'Posto que' possui qual valor sintático e semântico exato na redação?",
        options: [
            "Concessivo (sinônimo de 'embora', 'ainda que'), exigindo verbo no subjuntivo.",
            "Causal (sinônimo de 'já que', 'porque'), exigindo verbo no indicativo."
        ],
        correctOptionIndex: 0,
        explanation: "Na tradição gramatical rigorosa (especialmente cobrada na UEMA e UFG), 'posto que' é estritamente CONCESSIVA ('Posto que existam leis, falta fiscalização'). Usá-la com sentido causal é um equívoco estilístico frequente.",
        correctSide: "Posto que existam leis... (= embora existam)",
        wrongSide: "Posto que faltou verba, o projeto parou (usado como 'já que')",
        concept: "Valor Concessivo de Posto Que",
        conceptExplanation: "Conjunção subordinativa concessiva de alta erudição que estabelece ressalva à oração principal.",
        linoTip: "Lino Tip: 'Posto que' = 'Embora'. Rege sempre o modo subjuntivo!"
    },
    {
        category: "Conectivos",
        question: "Qual a diferença de sentido e uso entre 'ao invés de' e 'em vez de'?",
        options: [
            "'Ao invés de' expressa oposição absoluta (antônimos); 'em vez de' indica substituição geral.",
            "São termos estritamente sinônimos e indiferentes em qualquer oração."
        ],
        correctOptionIndex: 0,
        explanation: "'Ao invés de' significa 'ao contrário de' e só pode ser usado entre ideias diametralmente opostas ('Ao invés de subir, desceu'). Para simples substituição ou troca ('Em vez de estudar, dormiu'), a forma correta é 'em vez de'.",
        correctSide: "Em vez de incentivar a leitura, cortou os investimentos.",
        wrongSide: "Ao invés de incentivar a leitura, cortou os investimentos (não são opostos exatos).",
        concept: "Distinção entre Ao Invés De e Em Vez De",
        conceptExplanation: "'Ao invés de' = oposição vetorial. 'Em vez de' = substituição (cabe em todas as situações).",
        linoTip: "Lino Tip: Na dúvida na redação, use sempre 'Em vez de'! Ele nunca erra."
    },
    {
        category: "Conectivos",
        question: "Para indicar que alguém está plenamente informado e ciente de uma questão na redação, a locução correta é:",
        options: [
            "Estar a par das demandas sociais.",
            "Estar ao par das demandas sociais."
        ],
        correctOptionIndex: 0,
        explanation: "'Estar a par' significa estar informado, ciente, atualizado. 'Estar ao par' é termo técnico financeiro/cambial que indica equivalência monetária (como o câmbio de moedas em paridade).",
        correctSide: "O cidadão deve estar a par das leis...",
        wrongSide: "O cidadão deve estar ao par das leis...",
        concept: "Precisão Semântica em Locuções Idiomáticas",
        conceptExplanation: "A seleção vocabular correta entre 'a par' e 'ao par' demonstra repertório linguístico refinado.",
        linoTip: "Lino Tip: Estar informado = 'a par'. Trocar por 'ao par' soa artificial e errado!"
    }
];

// Exportação universal: Navegador (window) e Node.js (module.exports)
if (typeof window !== 'undefined') {
    window.grammarExercises = grammarExercises;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = grammarExercises;
    module.exports.grammarExercises = grammarExercises;
}