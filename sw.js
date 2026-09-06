// @ts-check
// sw.js — Service Worker Nativo (ADR-19)
// Estratégia: Stale-While-Revalidate para assets locais estáticos.
// BYPASS TOTAL para: métodos não-GET e origens externas (APIs de IA, CDNs, Fonts).

const CACHE_NAME = 'redacao-med-static-v1';

/** @type {string[]} Lista exaustiva de assets locais para pré-cache */
const STATIC_ASSETS = [
  './',
  './index.html',
  './style.css',
  './css/print.css',
  './manifest.webmanifest',
  './icons/icon-192.svg',
  './icons/icon-512.svg',
  // Monólito e scripts de dados
  './script.js',
  './bancas.js',
  './prompt.js',
  './repertories.js',
  './grammar_exercises.js',
  // Módulos satélites (Strangler Fig)
  './js/database.js',
  './js/feedback-realtime.js',
  './js/history-drawer.js',
  './js/arena-analytics.js',
  './js/diff-viewer.js',
  './js/pdf-export.js',
  './js/validator.js',
  './js/json-repair.js',
  // Utilitários internos
  './src/utils/essay-metrics.js',
  './src/utils/diff-engine.js',
  './js/workers/copilot.worker.js',
];

// ─────────────────────────────────────────
//   CICLO DE VIDA DO SERVICE WORKER
// ─────────────────────────────────────────

/**
 * INSTALL: Pré-cacheia todos os assets estáticos e força a ativação imediata.
 */
self.addEventListener('install', (event) => {
  console.log('[SW] Instalando... versão do cache:', CACHE_NAME);

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Pré-cacheando assets locais...');
        // addAll aborta e falha se qualquer asset der 404 — mantém cache íntegro
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[SW] Pré-cache concluído. Forçando ativação.');
        // @ts-ignore — skipWaiting existe no contexto do SW
        return self.skipWaiting();
      })
      .catch((err) => {
        console.error('[SW] Falha no pré-cache:', err);
      })
  );
});

/**
 * ACTIVATE: Remove caches de versões anteriores obsoletas e reivindica todos os clientes.
 */
self.addEventListener('activate', (event) => {
  console.log('[SW] Ativado. Limpando caches obsoletos...');

  event.waitUntil(
    caches.keys()
      .then((keys) => {
        return Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => {
              console.log('[SW] Deletando cache obsoleto:', key);
              return caches.delete(key);
            })
        );
      })
      .then(() => {
        console.log('[SW] Reivindicando todos os clientes.');
        // @ts-ignore — clients.claim() existe no contexto do SW
        return self.clients.claim();
      })
  );
});

/**
 * FETCH: Estratégia Stale-While-Revalidate para assets locais.
 * BYPASS TOTAL para requisições não-GET e origens externas.
 */
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = request.url;

  // ── REGRA 1: Bypass para não-GET (POST para IA, etc.) ──
  if (request.method !== 'GET') {
    return; // Deixa o navegador tratar normalmente, sem intercepção
  }

  // ── REGRA 2: Bypass para origens externas (APIs de IA, Google Fonts, CDNs) ──
  // @ts-ignore — self.location existe no contexto do SW
  if (!url.startsWith(self.location.origin)) {
    return; // Bypass total — nunca cacheia chamadas externas
  }

  // ── REGRA 3: Stale-While-Revalidate para assets locais ──
  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cachedResponse = await cache.match(request);

      // Dispara a busca de rede em paralelo (revalidação silenciosa)
      const networkFetchPromise = fetch(request)
        .then((networkResponse) => {
          // Atualiza o cache em segundo plano se a resposta for válida
          if (networkResponse && networkResponse.status === 200) {
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        })
        .catch(() => {
          // Rede falhou — silenciamos o erro, o cache cuida disso
          return /** @type {Response|undefined} */ (undefined);
        });

      // Responde imediatamente com o cache (stale) se disponível,
      // caso contrário aguarda a rede (primeiro acesso ou recurso novo)
      if (cachedResponse) {
        return cachedResponse; // Retorna rápido do cache, rede atualiza em background
      }

      // Sem cache: aguarda a rede
      const networkResponse = await networkFetchPromise;
      if (networkResponse) {
        return networkResponse;
      }

      // Última linha de defesa: resposta vazia limpa para não travar a UI
      return new Response('', { status: 503, statusText: 'Offline — recurso não disponível em cache.' });
    })
  );
});
