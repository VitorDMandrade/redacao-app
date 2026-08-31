const fs = require('fs');

const bancasCode = fs.readFileSync('bancas.js', 'utf8').replace(/const BANCAS/, 'var BANCAS').replace(/const EIXOS_MESTRES/, 'var EIXOS_MESTRES');
eval(bancasCode);

const introKeywords = ['INTRODUÇÃO', 'CINEMA', 'SÉRIE', 'ANIMAÇÃO', 'DOCUMENTÁRIO', 'FILME', 'MÚSICA', 'FICÇÃO', 'ROMANCE'];
const introsByEixo = {};
EIXOS_MESTRES.forEach(e => { 
    introsByEixo[e.nome] = e.repertorios ? e.repertorios.filter(rep => 
        (rep.obra && introKeywords.some(k => rep.obra.toUpperCase().includes(k))) || 
        (rep.uso && rep.uso.includes('Introdução'))
    ) : []; 
});

const ailton2 = {
    obra: 'AILTON KRENAK (IDEIAS PARA ADIAR O FIM DO MUNDO)',
    autor: 'Escritor, filósofo, ativista socioambiental e líder indígena brasileiro, no livro "Ideias para Adiar o Fim do Mundo" (2019).',
    resumo: 'Critica a ilusão antropocêntrica ocidental de separar a humanidade da natureza, denunciando que a conversão dos bens naturais em mercadoria explorável esgota as bases da vida no planeta; sustenta que "adiar o fim do mundo" exige reatar o vínculo cósmico com a Terra e valorizar as cosmovisões tradicionais.',
    uso: 'Meio Ambiente e Clima: Exploração predatória de recursos, desmatamento e crise ecológica.; Povos Originários: Invasão de terras demarcadas e desrespeito a modos de vida sustentáveis.; Consumismo: Fetiche do acúmulo material acima da preservação da vida e do planeta.',
    frase: 'No livro "Ideias para Adiar o Fim do Mundo", o líder indígena Ailton Krenak critica a ilusão antropocêntrica ocidental que separa a humanidade da natureza. Sob essa perspectiva, nota-se que [TEMA] decorre da prevalência de uma mentalidade utilitarista, na qual o Estado e o mercado negligenciam a sustentabilidade.'
};

if(introsByEixo['3. Meio Ambiente']) {
    introsByEixo['3. Meio Ambiente'].push(ailton2);
}

let repCode = fs.readFileSync('repertories.js', 'utf8');

const match = repCode.match(/(const REPERTORIOS_MAPEADOS = )(\[.*?\]);/s);
if (match) {
    const mapeados = eval(match[2]);
    mapeados.forEach(m => {
        let eixoName = m.nome;
        if (eixoName.includes('Saúde mental')) eixoName = '1. Saúde mental/trabalho';
        if (eixoName.includes('Violência')) eixoName = '2. Violência/Bullying';
        if (eixoName.includes('Meio Ambiente')) eixoName = '3. Meio Ambiente';
        if (eixoName.includes('Educação')) eixoName = '4. Educação';
        if (eixoName.includes('Preconceito')) eixoName = '5. Preconceito/Racismo';
        if (eixoName.includes('Tecnologia')) eixoName = '6. Tecnologia/Fake News';
        if (eixoName.includes('Política')) eixoName = '8. Estado/Política';

        const intros = introsByEixo[eixoName] || [];
        
        const existingObras = new Set(m.repertorios.map(r => r.obra));
        intros.forEach(i => {
            if(!existingObras.has(i.obra)) {
                // Prepend so they appear at the top
                m.repertorios.unshift(i);
            }
        });
    });
    
    const newMapeadosStr = match[1] + JSON.stringify(mapeados, null, 4) + ';';
    const newRepCode = repCode.replace(match[0], newMapeadosStr);
    fs.writeFileSync('repertories.js', newRepCode, 'utf8');
    console.log('Successfully updated repertories.js');
} else {
    console.log('Could not find REPERTORIOS_MAPEADOS');
}
