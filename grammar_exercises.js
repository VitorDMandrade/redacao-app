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
    }
];