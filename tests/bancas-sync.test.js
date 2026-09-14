const { test, describe } = require('node:test');
const assert = require('node:assert/strict');

// Importa os módulos principais
const BANCAS = require('../bancas.js');
const { validateEssay, estimateLines } = require('../js/validator.js');
const { SYSTEM_PROMPT, PROMPT_MEU_MODELO } = require('../prompt.js');

describe('Sincronização das 6 Bancas Examinadoras', () => {

    const EXPECTED_BANCAS = [
        { id: 'ENEM', nota: 1000, crits: 5, decimal: false, exigeTitulo: false, genero: 'dissertativo' },
        { id: 'UEMA', nota: 10, crits: 5, decimal: true, exigeTitulo: true, genero: 'dissertativo' },
        { id: 'EXATO_DISSERTATIVO', nota: 100, crits: 5, decimal: false, exigeTitulo: false, genero: 'dissertativo' },
        { id: 'EXATO_CARTA', nota: 100, crits: 5, decimal: false, exigeTitulo: false, genero: 'carta' },
        { id: 'UFG', nota: 24, crits: 4, decimal: true, exigeTitulo: false, genero: 'dissertativo' },
        { id: 'UNITINS', nota: 20, crits: 5, decimal: true, exigeTitulo: true, genero: 'dissertativo' }
    ];

    test('1. Todas as 6 bancas devem existir com chaves e metadados completos', () => {
        EXPECTED_BANCAS.forEach(b => {
            const banca = BANCAS[b.id];
            assert.ok(banca, `Banca ${b.id} deve existir no catálogo de bancas.`);
            assert.equal(banca.id, b.id);
            assert.ok(banca.nome, `Banca ${b.id} deve ter um nome legível.`);
            assert.ok(Array.isArray(banca.generosPermitidos), `Banca ${b.id} deve definir generosPermitidos.`);
            assert.equal(banca.generosPermitidos[0], b.genero);
            assert.ok(banca.limiteLinhas, `Banca ${b.id} deve ter limiteLinhas.`);
            assert.ok(banca.limiteLinhas.min >= 8, `Banca ${b.id} deve ter limite mínimo >= 8.`);
            assert.equal(banca.limiteLinhas.max, 30, `Banca ${b.id} deve ter limite máximo de 30 linhas.`);
            assert.ok(banca.resumoPratico, `Banca ${b.id} deve conter resumoPratico.`);
            assert.ok(banca.labelTreino, `Banca ${b.id} deve conter labelTreino.`);
            assert.ok(banca.labelFolha, `Banca ${b.id} deve conter labelFolha.`);
        });
    });

    test('2. Integridade Matemática: soma dos critérios deve ser estritamente igual à nota máxima', () => {
        EXPECTED_BANCAS.forEach(b => {
            const banca = BANCAS[b.id];
            assert.equal(banca.criterios.length, b.crits, `Banca ${b.id} deve ter exatamente ${b.crits} critérios.`);
            
            const soma = banca.criterios.reduce((acc, c) => acc + Number(c.pontuacao), 0);
            assert.equal(
                Math.round(soma * 10) / 10,
                b.nota,
                `Banca ${b.id}: soma dos critérios (${soma}) deve ser exatamente igual à nota máxima (${b.nota}).`
            );

            // Valida IDs dos critérios (c1..cn)
            banca.criterios.forEach((c, idx) => {
                assert.equal(c.id, `c${idx + 1}`, `Critério ${idx + 1} da banca ${b.id} deve ter id c${idx + 1}.`);
                assert.ok(c.nome, `Critério ${c.id} da banca ${b.id} deve ter nome descritivo.`);
                assert.ok(c.desc, `Critério ${c.id} da banca ${b.id} deve ter detalhamento explicativo.`);
            });
        });
    });

    test('3. Validador de Texto: conformidade de títulos e linhas mínimas', () => {
        const textoPadrao = `A questão do desenvolvimento social no Brasil contemporâneo exige análise crítica.\n\n` +
            `Em primeiro plano, nota-se a persistência de barreiras históricas que aprofundam as desigualdades.\n\n` +
            `Ademais, a ausência de políticas públicas integradas compromete a concretização dos direitos.\n\n` +
            `Portanto, medidas estruturantes são fundamentais para assegurar a dignidade humana no país.`;

        // UEMA exige título
        const erroUemaSemTitulo = validateEssay(textoPadrao, BANCAS['UEMA'], '');
        assert.ok(erroUemaSemTitulo && erroUemaSemTitulo.includes('exige um título'), 'UEMA sem título deve retornar erro.');

        // UNITINS exige título
        const erroUnitinsSemTitulo = validateEssay(textoPadrao, BANCAS['UNITINS'], '');
        assert.ok(erroUnitinsSemTitulo && erroUnitinsSemTitulo.includes('exige um título'), 'UNITINS sem título deve retornar erro.');

        // EXATO Carta do Leitor PROÍBE título
        const erroCartaComTitulo = validateEssay(textoPadrao, BANCAS['EXATO_CARTA'], 'Um Título Qualquer');
        assert.ok(erroCartaComTitulo && erroCartaComTitulo.includes('não utiliza título'), 'Carta do Leitor com título deve ser alertada.');
    });

    test('4. Validador de Texto: regras específicas de Carta do Leitor', () => {
        const cartaInvalida = `Palmas, 10 de maio de 2024.\n\n` +
            `Prezada editoria da Revista Opinião,\n\n` +
            `Venho por meio desta expor minhas reflexões sobre o artigo recente publicado sobre a mobilidade urbana.\n\n` +
            `É evidente que o transporte público necessita de investimentos urgentes para garantir a dignidade dos trabalhadores que dependem dos ônibus diariamente.\n\n` +
            `Ademais, as ciclovias integradas representam alternativa sustentável e economicamente viável para desafogar as grandes vias expressas da cidade.\n\n` +
            `Diante do exposto, solicito maior espaço editorial para debater essas soluções com a comunidade.\n\n` +
            `Atenciosamente,\nCarlos Silva`;
        const erroIdentificacao = validateEssay(cartaInvalida, BANCAS['EXATO_CARTA'], '');
        assert.ok(
            erroIdentificacao && (erroIdentificacao.includes('nome real') || erroIdentificacao.includes('DESCLASSIFICAÇÃO') || erroIdentificacao.includes('assine')),
            'Carta do Leitor com nome real deve retornar alerta de desclassificação imediata.'
        );

        const cartaValida = `São Paulo, 15 de maio de 2024.\n\nAo Ilustre Editor da Revista Opinião,\n\n` +
            `Venho por meio desta expressar minha preocupação acerca da recente matéria sobre avanços tecnológicos.\n\n` +
            `Conforme bem apontado pela equipe editorial, a rápida digitalização traz desafios inevitáveis à privacidade dos cidadãos.\n\n` +
            `Diante do exposto, reitero a importância de um debate transparente e contínuo sobre ética nas redes.\n\n` +
            `Com estima e consideração,\nUm leitor atento`;

        const erroCartaValida = validateEssay(cartaValida, BANCAS['EXATO_CARTA'], '');
        assert.equal(erroCartaValida, null, 'Carta do Leitor estruturada e com assinatura neutra não deve ter erros.');
    });

    test('5. Validador de Texto: mínimo de 15 linhas para UEMA', () => {
        // Texto curto (menos de 15 linhas estimadas)
        const textoCurto = `Introdução breve sobre o tema proposto.\n\nDesenvolvimento raso com poucas palavras.\n\nConclusão sumária.`;
        const erroLinhasUema = validateEssay(textoCurto, BANCAS['UEMA'], 'Título Obrigatório');
        assert.ok(
            erroLinhasUema && erroLinhasUema.includes('15 linhas'),
            'UEMA com menos de 15 linhas estimadas deve alertar penalidade de nota zero.'
        );
    });

    test('6. Prompts: SYSTEM_PROMPT e PROMPT_MEU_MODELO devem conter regras das 6 bancas', () => {
        assert.ok(SYSTEM_PROMPT.includes('UEMA'), 'SYSTEM_PROMPT deve citar a UEMA.');
        assert.ok(SYSTEM_PROMPT.includes('EXATO'), 'SYSTEM_PROMPT deve citar o vestibular EXATO.');
        assert.ok(SYSTEM_PROMPT.includes('UFG'), 'SYSTEM_PROMPT deve citar a UFG (Instituto Verbena).');
        assert.ok(SYSTEM_PROMPT.includes('UNITINS'), 'SYSTEM_PROMPT deve citar a UNITINS.');
        assert.ok(SYSTEM_PROMPT.toLowerCase().includes('carta do leitor'), 'SYSTEM_PROMPT deve detalhar Carta do Leitor.');

        // Validação da variável dinâmica de regras
        assert.ok(PROMPT_MEU_MODELO.includes('{REGRAS_BANCA}'), 'PROMPT_MEU_MODELO deve conter o placeholder {REGRAS_BANCA}.');
        assert.ok(PROMPT_MEU_MODELO.includes('{BANCA}'), 'PROMPT_MEU_MODELO deve conter o placeholder {BANCA}.');
        assert.ok(PROMPT_MEU_MODELO.includes('{TEMA}'), 'PROMPT_MEU_MODELO deve conter o placeholder {TEMA}.');
    });

    test('7. Formatação de notas: bancas decimais vs inteiras', () => {
        EXPECTED_BANCAS.forEach(b => {
            const isDecimal = b.nota <= 30;
            assert.equal(isDecimal, b.decimal, `Banca ${b.id} tem flag decimal esperado: ${b.decimal}`);
        });
    });

    test('8. Dicionário de Conectivos: conectivos para Carta do Leitor', () => {
        const fs = require('fs');
        const path = require('path');
        const scriptContent = fs.readFileSync(path.join(__dirname, '../script.js'), 'utf8');
        const htmlContent = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');

        // Valida no script.js
        assert.ok(scriptContent.includes('opiniao_carta'), 'script.js deve conter a categoria opiniao_carta');
        assert.ok(scriptContent.includes('interlocucao_carta'), 'script.js deve conter a categoria interlocucao_carta');
        assert.ok(scriptContent.includes('Considero') && scriptContent.includes('Defendo') && scriptContent.includes('Vejo'), 'script.js deve conter verbos de opinião em 1ª pessoa');
        assert.ok(scriptContent.includes('Veja bem') && scriptContent.includes('senhor(a) há de concordar') && scriptContent.includes('Pensemos'), 'script.js deve conter chamadas de interlocução');

        // Valida no index.html
        assert.ok(htmlContent.includes('data-cat="opiniao_carta"'), 'index.html deve conter botão para opiniao_carta');
        assert.ok(htmlContent.includes('data-cat="interlocucao_carta"'), 'index.html deve conter botão para interlocucao_carta');
    });

    test('9. Calibração Razoável e Justa para Todos os Modos e 6 Bancas', () => {
        const fs = require('fs');
        const path = require('path');
        const scriptContent = fs.readFileSync(path.join(__dirname, '../script.js'), 'utf8');
        const { PROMPT_CORRIGIR_DESAFIO, PROMPT_MEU_MODELO } = require('../prompt.js');

        // Valida que o SYSTEM_PROMPT tem diretriz de calibração para as 6 bancas
        assert.ok(SYSTEM_PROMPT.includes('Calibração Razoável da Nota'), 'SYSTEM_PROMPT deve conter seção de Calibração Razoável da Nota');
        assert.ok(SYSTEM_PROMPT.includes('REGRA DE OURO DA CALIBRAÇÃO DE NOTAS'), 'SYSTEM_PROMPT deve conter REGRA DE OURO DA CALIBRAÇÃO');
        assert.ok(SYSTEM_PROMPT.includes('Sem Penalização por Vocabulário Simples'), 'SYSTEM_PROMPT não deve penalizar vocabulário simples');

        // Valida presença de calibração para cada uma das 6 bancas no SYSTEM_PROMPT
        EXPECTED_BANCAS.forEach(b => {
            const regexBanca = new RegExp(b.id.replace('_', '[\\s\\S]*?'), 'i');
            assert.ok(regexBanca.test(SYSTEM_PROMPT), `SYSTEM_PROMPT deve referenciar ${b.id}`);
        });

        // Valida diretrizes nos modos em script.js
        assert.ok(scriptContent.includes('DIRETRIZ DE CALIBRAÇÃO (AVALIAÇÃO RAZOÁVEL E JUSTA)'), 'script.js Modo Redação Completa deve ter calibração');
        assert.ok(scriptContent.includes('DIRETRIZ DE AVALIAÇÃO RAZOÁVEL E JUSTA'), 'script.js Modo Treino por Partes e Repertório devem ter calibração');
        assert.ok(scriptContent.includes('DIRETRIZ DE AVALIAÇÃO RAZOÁVEL E ENCORAJADORA'), 'script.js Modo Tutorial deve ter calibração');
        assert.ok(scriptContent.includes('sem pedantismo ou erudição artificial'), 'script.js Modo Tutor Gramatical deve instruir resposta sem pedantismo');

        // Valida Meu Modelo e Desafio de Gramática
        assert.ok(PROMPT_MEU_MODELO.includes('sem pedantismo nem termos arcaicos'), 'PROMPT_MEU_MODELO deve orientar modelo sem pedantismo');
        assert.ok(PROMPT_CORRIGIR_DESAFIO.includes('Seja justo e razoável'), 'PROMPT_CORRIGIR_DESAFIO deve orientar avaliação justa e razoável');
    });
});


