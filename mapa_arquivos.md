# Mapa de Arquivos e Arquitetura do Simulador de Redação

> **Status:** Atualizado com a Expansão do Dicionário Didático de Conectivos & Painel de Densidade Gramatical das 6 Bancas.
> **Data:** 2026-10-12

---

## 1. Visão Geral da Arquitetura

O projeto é uma Single Page Application (SPA) para treinamento, redação, simulação e correção de redações com inteligência artificial, parametrizada para 6 bancas examinadoras:
1. **ENEM** (Escala 0-1000, 5 Competências)
2. **UEMA** (Escala 0-10, Critérios A-D, mínimo 15 linhas)
3. **EXATO_DISSERTATIVO** (Escala 0-10)
4. **EXATO_CARTA** (Carta do Leitor, Escala 0-10, interlocução em 1ª pessoa e vocativo obrigatórios)
5. **UFG** (Escala 0-10)
6. **UNITINS** (Escala 0-10)

---

## 2. Mapa dos Arquivos Principais

| Arquivo | Responsabilidade | Tecnologias / Padrões |
|---|---|---|
| `index.html` | Estrutura principal da interface (Views: Redação Completa, Treino por Partes, Repertório, Gramática e Meu Modelo). Contém `#connectives-widget`, `#grammar-density-panel` e as 6 bancas no seletor `#banca-select`. | HTML5 Semântico, WCAG, PWA |
| `style.css` | Design system completo, paleta HSL/Hex escura (`#0f172a`), responsividade mobile/desktop, regras de não-transparência do dicionário de conectivos e tipografia moderna. | Vanilla CSS, CSS Grid, Flexbox, Animações |
| `script.js` | Monólito central (gerenciador de fluxo, eventos, dicionário de conectivos com guia didático `conectivosGuia`, busca em tempo real, integração do construtor livre). | JavaScript Vanilla, DOM API, LocalStorage/IndexedDB |
| `grammar_exercises.js` | Banco de dados de exercícios da Arena de Micro-Treinos Gramaticais. Contém desafios práticos categorizados (Regência, Crase, Pontuação, Paralelismo Sintático, Conectivos, etc.). | JavaScript, Objetos estruturados |
| `prompt.js` | Definição dos prompts de sistema e calibração das 6 bancas (`SYSTEM_PROMPT`, `PROMPT_MEU_MODELO`, `PROMPT_CORRIGIR_DESAFIO`). | JavaScript |
| `auditoria.js` | Guardião de integridade estrutural do `index.html`. Valida existência dos IDs cruciais antes de commits. | Node.js script de auditoria |
| `tests/bancas-sync.test.js` | Suite de testes automatizados das 6 bancas: integridade matemática de notas, validação de regras de gênero, categorias de conectivos e guia didático. | Node.js Test Runner nativo (`node --test`) |
| `manifest.webmanifest` | Configuração PWA (instalabilidade mobile e desktop). | JSON Web App Manifest |

---

## 3. Estrutura do Dicionário de Conectivos & Guia Didático 2.0

Localizado em `script.js` e renderizado em `#connectives-widget` (`index.html`):

### 3.1 Categorias Cadastradas:
- `adicao`: Conectivos de adição e soma cumulativa
- `oposicao`: Conectivos de oposição e quebra de expectativa
- `causa`: Conectivos de causa e motivo histórico/social
- `conclusao`: Conectivos de fechamento dedutivo
- `tempo`: Conectivos temporais e demarcação histórica
- `conformidade`: Conectivos conformativos para legitimação de repertório
- `condicao`: Conectivos condicionais para fechamento e advertência
- `proporcao`: Conectivos proporcionais e progressão lógica
- `finalidade`: Conectivos finais para propostas de intervenção
- `comparacao`: Conectivos comparativos e paralelos analógicos
- `concessivos`: Conectivos concessivos e argumento de ressalva
- `asseverativos`: Conectivos de ênfase e certeza assertiva
- `operadores`: Operadores argumentativos interparágrafos
- `referencial`: Pronomes e termos anafóricos/catafóricos
- `detalhamento`: Conectivos explicativos e exemplificativos
- `opiniao_carta`: Verbos e marcadores de 1ª pessoa (Carta do Leitor)
- `interlocucao_carta`: Fórmulas de apelo ao interlocutor (Carta do Leitor)
- `meus`: Conectivos personalizados salvos pelo usuário

### 3.2 Estrutura Didática por Categoria (`conectivosGuia`):
Cada categoria possui um painel didático fixo contendo:
1. **🔍 O que é:** Definição gramatical e conceitual.
2. **🎯 Para que serve na redação:** Função pragmática no texto dissertativo ou carta.
3. **✍️ Como usar de maneira gramaticalmente certa:** Regras de vírgula, posição na oração e armadilhas comuns.
4. **🏛️ Aplicação nas Bancas:** Orientações personalizadas para ENEM, UEMA, UFG, UNITINS e EXATO.

---

## 4. Arena de Micro-Treinos Gramaticais & Densidade

- Localizada em `#grammar-view`.
- Painel `#grammar-density-panel` apresenta o radar avaliativo das bancas com pílulas interativas de fixação rápida.
- Exercícios em `grammar_exercises.js` com justificativas profundas (`concept`, `conceptExplanation`, `correctSide`, `wrongSide`, `linoTip`).
