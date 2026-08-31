const grammarExercises = [
    // CRASE
    {
        category: "Crase",
        question: "O governo deve garantir o acesso ___ educação básica para todos.",
        options: ["a", "à"],
        correctOptionIndex: 1,
        explanation: "Quem garante acesso, garante acesso A algo. 'Educação' é feminino e aceita o artigo A. Ocorre fusão (a + a = à).",
        correctSide: "O uso de 'à' está correto porque há a fusão da preposição 'a' exigida por 'acesso' com o artigo feminino 'a' de 'educação'.",
        wrongSide: "Usar apenas 'a' sem crase seria um erro de regência, pois omitiria o artigo definido exigido pelo substantivo específico 'educação' ou a preposição exigida por 'acesso'.",
        concept: "Regência Nominal",
        conceptExplanation: "É a relação de dependência entre um nome (substantivo, adjetivo ou advérbio) e o seu complemento. Exemplo: quem tem 'acesso', tem acesso **a** alguma coisa. O nome 'acesso' pede a preposição 'a'."
    },
    {
        category: "Crase",
        question: "O combate ___ desigualdade deve ser tratado como prioridade pelo Estado.",
        options: ["a", "à"],
        correctOptionIndex: 1,
        explanation: "O termo 'combate' exige preposição 'a', e 'desigualdade' é palavra feminina que aceita o artigo 'a'. Ocorre fusão (à).",
        correctSide: "É correto porque 'combate a' (preposição) se junta com 'a desigualdade' (artigo feminino).",
        wrongSide: "A falta da crase ignora a presença do artigo definido 'a' que acompanha o substantivo 'desigualdade', configurando erro sintático grave.",
        concept: "Artigo Definido",
        conceptExplanation: "Palavra que vem antes do substantivo para determiná-lo de forma precisa (o, a, os, as). A crase só acontece se a palavra seguinte aceitar o artigo 'a' (feminino)."
    },
    {
        category: "Crase",
        question: "Devido ___ falta de investimentos, a educação sofre graves prejuízos.",
        options: ["a", "à"],
        correctOptionIndex: 1,
        explanation: "A locução 'Devido a' exige preposição 'a'. 'Falta' é substantivo feminino que aceita artigo. Método Cachorrão: Devido AO problema (se deu 'ao', tem crase).",
        correctSide: "Correto, pois há preposição exigida por 'devido' e artigo feminino acompanhando 'falta'.",
        wrongSide: "Sem crase, você comete erro de regência nominal (não atende à regência de 'devido').",
        concept: "Locução Prepositiva",
        conceptExplanation: "Conjunto de duas ou mais palavras que têm o mesmo valor de uma preposição. Ex: 'devido a', 'em frente a', 'graças a'."
    },
    {
        category: "Crase",
        question: "A população começa ___ sofrer os impactos das mudanças climáticas.",
        options: ["a", "à"],
        correctOptionIndex: 0,
        explanation: "Nunca ocorre crase antes de verbos no infinitivo. 'Sofrer' é verbo.",
        correctSide: "Usar apenas 'a' (preposição) está correto porque verbos não aceitam artigo feminino antes deles.",
        wrongSide: "Colocar crase ('à') antes de verbo é considerado um erro primário, já que verbos não são acompanhados por artigos.",
        concept: "Verbo no Infinitivo",
        conceptExplanation: "É o verbo em seu estado natural, sem conjugação, terminado em -AR, -ER, ou -IR (ex: sofrer, amar, partir). Verbos não têm gênero (masculino/feminino), logo não aceitam artigo 'a', tornando impossível a crase."
    },
    {
        category: "Crase",
        question: "Medidas devem ser tomadas, ___ fim de mitigar o problema.",
        options: ["a", "à"],
        correctOptionIndex: 0,
        explanation: "'Fim' é uma palavra masculina. Não há crase antes de palavras masculinas em regras gerais.",
        correctSide: "O correto é 'a fim', pois 'fim' é um substantivo masculino e só admite artigo masculino 'o'.",
        wrongSide: "Crase antes de palavra masculina é erro grave, indicando desconhecimento da regra fundamental (crase é a+a, não a+o).",
        concept: "Substantivo Masculino",
        conceptExplanation: "Palavras que aceitam o artigo 'o' (o fim, o amor, o homem). Como a crase é a fusão de preposição 'a' + artigo feminino 'a', ela nunca acontece antes de palavras masculinas."
    },
    {
        category: "Crase",
        question: "O investimento em segurança pública deve chegar ___ todas as regiões.",
        options: ["a", "à"],
        correctOptionIndex: 0,
        explanation: "'Todas' é um pronome indefinido que repele o artigo. Logo, o 'a' é apenas preposição.",
        correctSide: "A preposição pura 'a' está correta pois pronomes indefinidos (como 'todas', 'alguma', 'nenhuma') não admitem artigo feminino antes.",
        wrongSide: "Colocar crase aqui ('à todas') é um erro clássico, punido duramente pela banca, pois o artigo feminino plural seria 'as', não 'a'.",
        concept: "Pronome Indefinido",
        conceptExplanation: "Palavras que se referem a algo ou alguém de forma vaga, imprecisa (todas, algumas, nenhuma, ninguém, qualquer). A maioria deles recusa o uso do artigo feminino 'a' antes deles."
    },
    {
        category: "Crase",
        question: "O projeto é semelhante ___ que foi aprovado no ano passado.",
        options: ["a", "ao"],
        correctOptionIndex: 1,
        explanation: "Semelhante exige preposição 'a'. Como o pronome demonstrativo oculto é 'aquilo' ou o pronome 'o' (masculino), a fusão é 'ao'.",
        correctSide: "O uso de 'ao' está correto, pois temos a preposição 'a' e o pronome demonstrativo 'o' (=aquele).",
        wrongSide: "Escrever 'semelhante a' omitindo o 'o' deixa a frase incompleta e com erro de paralelismo pronominal.",
        concept: "Pronome Demonstrativo",
        conceptExplanation: "Neste caso, o 'o/a' e 'os/as' funcionam como pronomes demonstrativos quando podem ser substituídos por 'aquele', 'aquela' ou 'aquilo'. Ex: 'semelhante a(quilo) que'."
    },
    {
        category: "Crase",
        question: "As políticas públicas visam ___ inclusão de minorias.",
        options: ["a", "à"],
        correctOptionIndex: 1,
        explanation: "O verbo 'visar' (no sentido de objetivar) exige preposição 'a'. 'Inclusão' é feminino. Ocorre crase.",
        correctSide: "O correto é 'à inclusão', pois quem visa (objetiva), visa A alguma coisa. 'Inclusão' aceita artigo A.",
        wrongSide: "A falta da crase transforma o verbo 'visar' em transitivo direto (sentido de assinar/mirar), o que muda o sentido e gera erro de regência na redação.",
        concept: "Verbo Transitivo Indireto",
        conceptExplanation: "É o verbo que precisa de um complemento ligado a ele obrigatoriamente por uma preposição. O verbo 'visar' (desejar) exige a preposição 'a'."
    },

    // VÍRGULA
    {
        category: "Vírgula",
        question: "Atualmente, no Brasil ___ o preconceito ainda é um desafio.",
        options: ["(sem vírgula)", ","],
        correctOptionIndex: 1,
        explanation: "'Atualmente' e 'no Brasil' são adjuntos adverbiais deslocados (tempo e lugar). Devem ser isolados.",
        correctSide: "O uso da vírgula após 'no Brasil' isola o grande bloco adverbial deslocado para o início da frase, garantindo clareza sintática.",
        wrongSide: "A ausência da vírgula deixa o adjunto adverbial grudado no sujeito ('o preconceito'), prejudicando o ritmo da leitura e violando a regra de pontuação para adjuntos longos.",
        concept: "Adjunto Adverbial Deslocado",
        conceptExplanation: "O adjunto adverbial é um termo que indica circunstância (tempo, lugar, modo, causa). A ordem natural dele na frase é no final. Quando ele é 'deslocado' para o início ou meio da frase, deve ser isolado por vírgulas. Exemplo: 'No Brasil (lugar), isso acontece'."
    },
    {
        category: "Vírgula",
        question: "O Ministério da Educação órgão responsável pelo ensino no país ___ deve intervir.",
        options: ["(sem vírgula)", ","],
        correctOptionIndex: 1,
        explanation: "A expressão é um aposto explicativo e deve estar entre vírgulas. Faltava a segunda vírgula.",
        correctSide: "A vírgula fechando o aposto explicativo garante que a explicação termine e a frase retome seu fluxo para o verbo ('deve').",
        wrongSide: "Sem a vírgula de fechamento, você comete o erro da 'Vírgula Suicida': separa o sujeito ('Ministério da Educação') do seu verbo ('deve'), o que tira muito ponto na C1.",
        concept: "Aposto Explicativo",
        conceptExplanation: "É um termo que explica, esclarece ou detalha um substantivo dito anteriormente. Na redação, é muito usado para apresentar quem é um filósofo ou o que é um órgão público. Ex: 'Paulo Freire, grande educador brasileiro, disse que...'. Deve sempre vir entre duas vírgulas."
    },
    {
        category: "Vírgula",
        question: "Muitos cidadãos, que não têm acesso à internet, sofrem com a exclusão digital.",
        options: ["Correto", "Incorreto"],
        correctOptionIndex: 0,
        explanation: "Correto. As vírgulas isolam uma oração subordinada adjetiva explicativa, indicando que todos os cidadãos em questão sofrem disso.",
        correctSide: "A vírgula dupla isola a explicação, fazendo sentido lógico e sintático na construção do argumento.",
        wrongSide: "Se retirássemos as vírgulas, a oração viraria 'restritiva', dando a entender que existem alguns cidadãos que não têm internet e outros que têm.",
        concept: "Oração Subordinada Adjetiva Explicativa",
        conceptExplanation: "É uma frase inteira (que contém verbo) que serve para dar uma explicação genérica sobre o sujeito, agindo como um grande adjetivo. Por ser explicativa, precisa estar isolada por vírgulas. Sem vírgulas, vira 'restritiva' (limitando o sentido apenas a um grupo específico)."
    },
    {
        category: "Vírgula",
        question: "No cenário atual ___ observa-se que as redes sociais influenciam comportamentos.",
        options: ["(sem vírgula)", ","],
        correctOptionIndex: 1,
        explanation: "Adjunto adverbial deslocado (No cenário atual) com três palavras. A vírgula é altamente recomendada/obrigatória.",
        correctSide: "A vírgula separa o adjunto adverbial deslocado do resto da oração, organizando a leitura.",
        wrongSide: "Ignorar a vírgula em adjuntos com três ou mais palavras é considerado erro pelo Enem e vestibulares.",
        concept: "Extensão do Adjunto Adverbial",
        conceptExplanation: "A gramática diz que se o adjunto adverbial deslocado for 'curto' (1 ou 2 palavras, ex: 'Hoje,'), a vírgula é opcional. Mas se for longo (3 ou mais palavras, ex: 'No cenário atual,'), a vírgula passa a ser obrigatória para não confundir o leitor."
    },
    {
        category: "Vírgula",
        question: "A escola, portanto, precisa ser um ambiente acolhedor.",
        options: ["Correto", "Incorreto"],
        correctOptionIndex: 0,
        explanation: "Correto. O conectivo 'portanto' está deslocado (entre o sujeito e o verbo), logo, deve ficar entre vírgulas.",
        correctSide: "Conectivos conclusivos/adversativos deslocados devem OBRIGATORIAMENTE ser isolados por duas vírgulas.",
        wrongSide: "Colocar apenas uma vírgula (antes ou depois) seria a famosa 'Vírgula Suicida', separando sujeito do verbo indevidamente.",
        concept: "Conectivo Deslocado",
        conceptExplanation: "Os conectivos (porém, portanto, logo) costumam vir no início da frase ('Portanto, a escola...'). Quando o autor decide colocá-los no meio da frase, depois do sujeito, eles devem vir presos entre duas vírgulas."
    },
    {
        category: "Vírgula",
        question: "É imperativo que, o Ministério da Saúde crie novas políticas de assistência.",
        options: ["Correto", "Incorreto"],
        correctOptionIndex: 1,
        explanation: "Incorreto. Não se separa a conjunção integrante ('que') da oração subordinada que ela introduz, a menos que haja um elemento intercalado.",
        correctSide: "O correto seria 'É imperativo que o Ministério...'. A frase corre fluida e a sintaxe é preservada.",
        wrongSide: "A vírgula logo após o 'que' quebra violentamente a relação de subordinação (oração principal com a subjetiva). É um erro gravíssimo.",
        concept: "Conjunção Integrante",
        conceptExplanation: "Palavras como 'que' ou 'se' introduzem uma oração subordinada substantiva (ex: 'É necessário QUE você estude'). Separar o 'que' do resto da oração com vírgula quebra a frase no meio."
    },
    {
        category: "Vírgula",
        question: "Segundo Zygmunt Bauman, a modernidade é líquida.",
        options: ["Correto", "Incorreto"],
        correctOptionIndex: 0,
        explanation: "Correto. Orações ou expressões conformativas deslocadas (Segundo fulano, Conforme ciclano) exigem vírgula.",
        correctSide: "A vírgula após a citação marca o fim da expressão conformativa deslocada.",
        wrongSide: "Sem a vírgula, a leitura ficaria confusa, fundindo o autor com o sujeito da oração principal.",
        concept: "Expressão Conformativa",
        conceptExplanation: "Indica conformidade com o que alguém disse (Segundo..., Conforme..., De acordo com...). Muito usada na introdução de repertórios na redação. Quando aparece no início da frase, exige vírgula."
    },

    // CONECTIVOS E REGÊNCIA
    {
        category: "Conectivos e Regência",
        question: "O autor não concorda ___ visão otimista sobre a globalização.",
        options: ["com a", "a"],
        correctOptionIndex: 0,
        explanation: "Quem concorda, concorda COM algo ou alguém. Regência do verbo concordar.",
        correctSide: "O uso da preposição 'com' atende à transitividade indireta do verbo concordar.",
        wrongSide: "Usar apenas o artigo 'a' transforma 'concordar' em transitivo direto, o que na norma padrão do português constitui erro crasso.",
        concept: "Regência Verbal",
        conceptExplanation: "Regência verbal é a relação entre o verbo e seus complementos. Cada verbo 'pede' (rege) uma preposição específica. Por exemplo, quem 'gosta', gosta DE. Quem 'concorda', concorda COM."
    },
    {
        category: "Conectivos e Regência",
        question: "Nesse sentido, medidas são necessárias, ___ a conscientização da população.",
        options: ["destacando-se", "sendo que"],
        correctOptionIndex: 0,
        explanation: "'Destacando-se' é mais polido. 'Sendo que' é uma expressão coloquial e malvista em redações nota 1000.",
        correctSide: "A oração reduzida de gerúndio ('destacando-se') atua de forma elegante e correta para especificar uma das medidas.",
        wrongSide: "O uso de 'sendo que' é vício de linguagem coloquial, o que tira nota na Competência 1 e empobrece a coesão.",
        concept: "Coloquialismo",
        conceptExplanation: "Marcas de oralidade (jeito falado) que não devem ser usadas na escrita formal dissertativa. 'Sendo que', 'tipo assim', 'né' são exemplos que descontam ponto na C1."
    },
    {
        category: "Conectivos e Regência",
        question: "O Estado assiste ___ pessoas em situação de vulnerabilidade?",
        options: ["as", "às"],
        correctOptionIndex: 0,
        explanation: "No sentido de dar assistência (ajudar), o verbo 'assistir' aceita transitividade direta (as) e indireta, mas recomenda-se a direta para evitar ambiguidades com o sentido de 'ver' (às).",
        correctSide: "Ambas as formas são aceitas gramaticalmente, mas 'as' evita confusão na leitura rápida do corretor.",
        wrongSide: "Se usar 'às', o corretor pode interpretar pelo viés comum de 'assistir a um filme' (sentido de presenciar) e marcar como erro de coesão.",
        concept: "Ambiguidade Sintática",
        conceptExplanation: "Quando uma estrutura gramatical permite duas interpretações. O verbo 'assistir' pode ser transitivo direto (ajudar) ou transitivo indireto (ver). Usar a regência certa define o sentido."
    },
    {
        category: "Conectivos e Regência",
        question: "O filme retrata a desigualdade, ___ é um problema histórico.",
        options: ["onde", "o qual"],
        correctOptionIndex: 1,
        explanation: "'Onde' só pode ser usado para indicar LUGAR físico. 'A desigualdade' não é um lugar.",
        correctSide: "Usar 'o qual' (ou que) retoma perfeitamente o termo anterior sem desviar o sentido.",
        wrongSide: "Usar 'onde' para situações, épocas ou conceitos abstratos é o famoso 'queísmo de lugar' (erro gravíssimo de coesão).",
        concept: "Pronome Relativo",
        conceptExplanation: "Pronomes que retomam um termo anterior (antecedente) para não repeti-lo na frase seguinte (que, o qual, onde, cujo). Cada um tem uma regra de uso específica."
    },
    {
        category: "Conectivos e Regência",
        question: "A desinformação prolifera rápido, ___ prejudica o debate público.",
        options: ["fator que", "o que"],
        correctOptionIndex: 0,
        explanation: "'Fator que' ou 'situação que' são retomadas pronominais de alta performance.",
        correctSide: "'Fator que' funciona como um elemento coesivo forte e vocabulário erudito, garantindo pontos na C4.",
        wrongSide: "Usar apenas 'o que' soa mais oral e simples, empobrecendo a elegância estrutural do texto.",
        concept: "Coesão Referencial de Retomada",
        conceptExplanation: "Técnica de reescrever ou retomar uma ideia dita anteriormente usando um substantivo abstrato (fator, cenário, contexto) em vez de apenas pronomes simples, demonstrando amplo vocabulário."
    },
    {
        category: "Conectivos e Regência",
        question: "Portanto, o Governo deve agir, ___ o MEC promova palestras.",
        options: ["a fim de que", "para"],
        correctOptionIndex: 0,
        explanation: "Com o verbo no subjuntivo ('promova'), deve-se usar a locução conjuntiva 'a fim de que'.",
        correctSide: "A locução 'a fim de que' introduz uma oração adverbial final com verbo no subjuntivo (promova).",
        wrongSide: "Escrever 'para o MEC promova' cria uma anomalia sintática grotesca. Mistura o uso de preposição simples com o verbo conjugado de forma incompatível.",
        concept: "Oração Subordinada Adverbial Final",
        conceptExplanation: "Frase que indica a finalidade/objetivo da ação principal. Muito usada no detalhamento e finalidade da proposta de intervenção. Pode ser construída com 'para' + Infinitivo (para promover) ou 'a fim de que' + Subjuntivo (a fim de que promova)."
    },
    {
        category: "Conectivos e Regência",
        question: "A população prefere entretenimento ___ informação de qualidade.",
        options: ["a", "do que"],
        correctOptionIndex: 0,
        explanation: "O verbo 'preferir' exige a preposição 'a' (preferir X a Y). Nunca use 'preferir X do que Y' na norma culta.",
        correctSide: "O uso da preposição 'a' está perfeitamente alinhado com a norma-padrão (prefiro uma coisa A outra).",
        wrongSide: "'Do que' é vício de linguagem oral. Colocar 'prefere isso do que aquilo' na redação é penalizado diretamente.",
        concept: "Norma Padrão Culta",
        conceptExplanation: "É o conjunto de regras oficiais da língua portuguesa (gramática). O Enem exige estrito seguimento dessa norma, distanciando o texto da forma como falamos livremente no dia a dia."
    },
    // USO DOS PORQUÊS
    {
        category: "Uso dos Porquês",
        question: "A mídia não explica ___ a violência urbana continua crescendo.",
        options: ["por que", "porque"],
        correctOptionIndex: 0,
        explanation: "Usa-se 'por que' (separado e sem acento) em perguntas diretas ou indiretas, quando puder ser substituído por 'por qual motivo' ou 'pelo qual'.",
        correctSide: "Correto, pois pode ser substituído por 'por qual motivo' (A mídia não explica por qual motivo...).",
        wrongSide: "Usar 'porque' (junto) indicaria uma resposta ou causa, o que não faz sentido sintático na frase.",
        concept: "Interrogativa Indireta",
        conceptExplanation: "É uma pergunta embutida dentro de uma frase declarativa. Não termina com ponto de interrogação, mas pede uma explicação ou motivo."
    },
    {
        category: "Uso dos Porquês",
        question: "O saneamento básico é fundamental ___ previne diversas doenças.",
        options: ["por que", "porque"],
        correctOptionIndex: 1,
        explanation: "Usa-se 'porque' (junto e sem acento) para introduzir uma explicação ou causa.",
        correctSide: "Correto, pois equivale a 'pois' ou 'já que'. A oração seguinte explica o motivo do saneamento ser fundamental.",
        wrongSide: "Usar 'por que' separado aqui é um erro gramatical que desestabiliza a coesão sequencial do texto.",
        concept: "Conjunção Explicativa",
        conceptExplanation: "Palavra que liga duas orações mostrando que a segunda explica a primeira."
    },
    // COLOCAÇÃO PRONOMINAL
    {
        category: "Colocação Pronominal",
        question: "Não ___ a gravidade do problema habitacional nas metrópoles.",
        options: ["se compreende", "compreende-se"],
        correctOptionIndex: 0,
        explanation: "A palavra 'Não' é um advérbio de negação, que atrai o pronome para antes do verbo (Próclise).",
        correctSide: "O uso da Próclise é obrigatório devido à presença da palavra atrativa negativa 'Não'.",
        wrongSide: "A ênclise (depois do verbo) está incorreta aqui porque a palavra negativa age como um ímã puxando o pronome para perto dela.",
        concept: "Próclise (Palavra Atrativa)",
        conceptExplanation: "A regra de colocação pronominal em que o pronome oblíquo fica antes do verbo. Advérbios (não, nunca) e pronomes relativos (que) atraem o pronome."
    },
    {
        category: "Colocação Pronominal",
        question: "A constituição assegura os direitos sociais, tornando-___ dever do Estado.",
        options: ["os", "los"],
        correctOptionIndex: 0,
        explanation: "O verbo 'tornar' (na forma tornando) não termina em r, s ou z, portanto não sofre a modificação para '-los'. O gerúndio pede ênclise normal: tornando-os.",
        correctSide: "A ênclise está correta e a forma pronominal 'os' foi mantida pois o verbo termina em vogal.",
        wrongSide: "Utilizar 'los' só é permitido quando o verbo termina em R, S ou Z (ex: torná-los).",
        concept: "Gerúndio e Ênclise",
        conceptExplanation: "O gerúndio (verbos terminados em -ndo) exige que o pronome venha após o verbo, desde que não haja palavra atrativa antes."
    }
];
