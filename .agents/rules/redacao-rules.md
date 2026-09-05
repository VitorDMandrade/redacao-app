---
name: regras-simulador-redacao
description: Regras obrigatórias de arquitetura, modificação e validação de código para o projeto do Simulador de Redação.
---

# Regras do Projeto Simulador de Redação

Sempre que atuar neste repositório (c:\Users\Vitor\REDAÇÃO\), você DEVE seguir rigorosamente as regras abaixo, sob pena de quebrar a arquitetura do projeto.

## 1. O Mapa de Arquivos é a Lei
Antes de iniciar qualquer nova feature pesada ou modificação estrutural, você **deve** consultar o arquivo `mapa_arquivos.md` (no artefato ou raiz, o que estiver mais atualizado) para entender onde a responsabilidade lógica reside no momento.
- Ao adicionar um novo arquivo JS, uma nova seção HTML, ou uma nova categoria de dados, você **É OBRIGADO** a atualizar o arquivo `mapa_arquivos.md`.

## 2. Padrão Arquitetural Módulos (ES Modules)
O projeto passou por uma refatoração e abandonou o uso de um arquivo JavaScript monolítico (`script.js`).
- Toda a lógica reside no diretório `/js/`.
- Cada arquivo `.js` atua como um módulo isolado e deve usar a sintaxe `import`/`export`.
- É proibido poluir o escopo global (`window.XYZ`) a menos que seja estritamente necessário para integração com bibliotecas de terceiros legadas que não suportem ESM.

## 3. Prevenção de Erros (TypeScript Suave)
- Todo arquivo JavaScript deve iniciar obrigatoriamente com o comentário `// @ts-check` na primeira linha, ativando a verificação de tipagem do VS Code/Node.
- Sempre documente os parâmetros vitais usando a sintaxe JSDoc (ex: `/** @param {string} texto */`) nas funções exportadas.

## 4. Teste de Auditoria
Existe um script de teste estrutural chamado `auditoria.js` na raiz.
Sempre que você alterar o layout em `index.html` que envolva a adição, remoção ou modificação de IDs vitais (`<div id="...">`, `<button id="...">`), você deve, **antes de considerar a tarefa finalizada**, rodar o comando:
```bash
node auditoria.js
```
Se o script retornar falhas, corrija o código JavaScript correspondente que depende daquele ID antes de entregar ao usuário.

## 5. Modificações na UI e UX
- **Nunca** utilize `alert()`, `confirm()` ou `prompt()` nativos do navegador. O projeto utiliza um sistema customizado de painel flutuante e modais para interagir com o usuário (verificar módulo UI).
- Toda nova funcionalidade adicionada à tela de redação principal deve ser limpa e não distrair o foco da escrita.
