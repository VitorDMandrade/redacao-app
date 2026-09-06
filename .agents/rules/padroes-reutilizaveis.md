# Aprendizados de Sprint — Padrões Reutilizáveis para Futuros Projetos

> **Origem:** Projeto Simulador de Redação Medicina (ADR-12 a ADR-19)
> **Data de destilação:** 2026-09-05

---

## 1. PADRÃO ARQUITETURAL: STRANGLER FIG (O ESTRANGULADOR)

**Regra:** Nunca refatorar um monólito (`script.js`, etc.) enquanto ele estiver em produção.

**Como aplicar:**
- Cada nova funcionalidade vive em um módulo satélite isolado em `/js/`.
- A comunicação entre módulos e o monólito se dá exclusivamente via **Fachada Global Imutável**:

```js
window.__APP_BRIDGE__ = Object.freeze({ renderResults, showView });
```

- **Jamais:** simular `el.click()` em elementos do monólito. Isso cria acoplamento frágil sem stack trace.

---

## 2. DOCUMENTAÇÃO ARQUITETURAL: ADR (ARCHITECTURE DECISION RECORDS)

**Regra:** Toda decisão técnica não-trivial deve ser registrada como um ADR numerado.

**Formato mínimo:**
```
[ADR-NN] YYYY-MM-DD: Descrição da decisão
- Contexto / Decisão / Alternativas descartadas / Consequências
```

---

## 3. PERSISTÊNCIA LOCAL SEM BIBLIOTECAS: IndexedDB NATIVO

**Regra:** Nunca use `localStorage` para dados estruturados > 5KB. Use IndexedDB nativo.

**Padrões obrigatórios:**
- `getDB()` idempotente — uma única instância compartilhada.
- Sempre expor `exportFullDatabaseBackup()` + `importFullDatabaseBackup()` para soberania de dados.
- Sempre expor `deleteItem(id)` para gestão pelo usuário.
- Autosave via `debounce(fn, 5000)` com verificação de diff antes de gravar.

---

## 4. ALGORITMOS NATIVOS: ZERO DEPENDÊNCIA EXTERNA

**Regra:** Antes de instalar qualquer pacote, pergunte: "isso pode ser feito em 50 linhas de JS puro?"

| Funcionalidade | Pacote evitado | Solução nativa |
|---|---|---|
| Diff de texto | `diff`, `jsdiff` | LCS em DP — O(N×M) |
| Persistência | `Dexie.js` | IndexedDB nativo com Promises |
| Service Worker | `Workbox` | SW vanilla com Stale-While-Revalidate |
| PDF | `jsPDF` | `window.print()` + `@media print` CSS |

---

## 5. SERVICE WORKER: AS TRÊS REGRAS IMUTÁVEIS

1. **Bypass para não-GET:** `if (request.method !== 'GET') return;`
2. **Bypass para origens externas (APIs, CDNs):** `if (!url.startsWith(self.location.origin)) return;`
3. **Stale-While-Revalidate:** responda do cache imediatamente, atualize em background.

---

## 6. PWA: CHECKLIST MÍNIMA DE INSTALABILIDADE

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
<meta name="theme-color" content="#1e293b">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<link rel="manifest" href="manifest.webmanifest">
```

`manifest.webmanifest` mínimo: `name`, `short_name`, `start_url`, `scope`, `display: "standalone"`, `background_color`, `theme_color`, `icons` (com `purpose: "maskable"`).

---

## 7. RESPONSIVIDADE MOBILE: REGRAS TOUCH-FIRST

```css
/* Alvos mínimos de toque (WCAG + Apple HIG) */
@media (hover: none) and (pointer: coarse) {
  button, .btn { min-height: 44px; min-width: 44px; }
}

/* Anti-zoom iOS (CRÍTICO — sem isso o Safari zooma ao focar inputs) */
textarea, input { font-size: 16px !important; }

/* Contenção de overflow raiz */
html, body { overflow-x: hidden; }
```

**Inspeção de overflow via DevTools:**
```js
document.querySelectorAll('*').forEach(el => {
  if(el.scrollWidth > document.body.clientWidth)
    console.log(el.tagName, el.className, el.scrollWidth);
});
```

---

## 8. SERVIDOR HTTP LOCAL PARA TESTES MOBILE

**Regra:** Nunca testar módulos ES6 via `file://`. Sempre servir via HTTP.

```bash
npx -y serve -l tcp://0.0.0.0:3000
ipconfig | Select-String "IPv4"   # descobrir IP local (Windows)
```

Acesse no tablet/celular: `http://[SEU-IP]:3000`

---

## 9. PROTOCOLO DE TRABALHO COM TECH LEAD EXTERNO (NEXUS)

**Fluxo:**
1. Agente executa + valida autonomamente.
2. Agente → usuário: relatório de status com dados objetivos.
3. Usuário → Nexus: cola o relatório para arbitragem.
4. Nexus → usuário: retorna ADR + Prompt de Réplica formatado com `[TOUCH-LIST]` e `[NON-GOALS]`.
5. Usuário → Agente: cola o Prompt de Réplica.
6. Agente executa com escopo fechado.

---

## 10. WEB WORKER: QUANDO USAR

**Regra:** Mova para um Worker qualquer operação que possa bloquear o thread principal por > 50ms.

**Casos obrigatórios:** análise léxica de textos longos, parsing de JSON grande, algoritmos de diff > 1.000 tokens.

---

## 11. CICLO DE VALIDAÇÃO AUTÔNOMA (OBRIGATÓRIO ANTES DE ENTREGAR)

```
1. node --check arquivo.js               → zero erros sintáticos
2. node --test tests/arquivo.test.js     → 100% passando
3. DevTools → Console                    → zero exceções não tratadas
4. DevTools → Network                    → zero 404 em assets próprios
5. DevTools → body.scrollWidth === body.clientWidth → zero overflow horizontal
6. git commit -m "tipo(escopo): mensagem"
```

Nunca entregar sem passar por todos os 6 passos.
