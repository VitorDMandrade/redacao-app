// @ts-check

/**
 * @fileoverview Motor de Persistência Estruturada — IndexedDB Nativo (ADR-12)
 * Módulo assíncrono puro que encapsula o ciclo de vida completo do IndexedDB em Promises.
 * NÃO utiliza bibliotecas externas (sem Dexie.js, sem localForage).
 *
 * Object Stores (schemaVersion: 1):
 *  - redacoes_rascunhos : snapshots automáticos da digitação
 *  - correcoes_historico: payloads completos retornados pela IA
 *  - arena_analytics    : métricas de desempenho por categoria gramatical
 */

const DB_NAME = 'RedacaoMedicinaDB';
const DB_VERSION = 1;

/** @type {IDBDatabase|null} */
let _dbInstance = null;

/**
 * Inicializa (ou reaproveita) a instância do banco de dados.
 * Idempotente: chamadas subsequentes retornam a mesma instância aberta.
 * @returns {Promise<IDBDatabase>}
 */
export function getDB() {
  if (_dbInstance) return Promise.resolve(_dbInstance);

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);

    request.onupgradeneeded = (event) => {
      const db = /** @type {IDBOpenDBRequest} */ (event.target).result;

      // Store 1: Rascunhos automáticos
      if (!db.objectStoreNames.contains('redacoes_rascunhos')) {
        const store = db.createObjectStore('redacoes_rascunhos', {
          keyPath: 'id',
          autoIncrement: true,
        });
        store.createIndex('timestamp', 'timestamp', { unique: false });
        store.createIndex('tema', 'tema', { unique: false });
      }

      // Store 2: Histórico de correções completas da IA
      if (!db.objectStoreNames.contains('correcoes_historico')) {
        const store = db.createObjectStore('correcoes_historico', {
          keyPath: 'id',
          autoIncrement: true,
        });
        store.createIndex('timestamp', 'timestamp', { unique: false });
        store.createIndex('banca', 'banca', { unique: false });
      }

      // Store 3: Analytics da Arena Gramatical (chave única por categoria)
      if (!db.objectStoreNames.contains('arena_analytics')) {
        db.createObjectStore('arena_analytics', { keyPath: 'categoria' });
      }
    };

    request.onsuccess = (event) => {
      _dbInstance = /** @type {IDBOpenDBRequest} */ (event.target).result;
      _dbInstance.onerror = (e) => console.error('[DB] Erro no banco:', e);
      resolve(_dbInstance);
    };
  });
}

// ─────────────────────────────────────────
//   RASCUNHOS
// ─────────────────────────────────────────

/**
 * @typedef {Object} DraftSnapshot
 * @property {string} texto
 * @property {string} tema
 * @property {string} banca
 * @property {number} totalPalavras
 * @property {number} linhasEstimadas
 * @property {string} [timestamp]
 */

/**
 * Persiste um snapshot do rascunho atual.
 * @param {DraftSnapshot} draft
 * @returns {Promise<IDBValidKey>}
 */
export async function saveDraft(draft) {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('redacoes_rascunhos', 'readwrite');
    const req = tx.objectStore('redacoes_rascunhos').add({
      ...draft,
      timestamp: new Date().toISOString(),
    });
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

/**
 * Recupera o rascunho mais recente salvo.
 * @returns {Promise<DraftSnapshot|undefined>}
 */
export async function getLatestDraft() {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('redacoes_rascunhos', 'readonly');
    const store = tx.objectStore('redacoes_rascunhos');
    const index = store.index('timestamp');
    // Cursor em ordem decrescente: pega o mais recente
    const req = index.openCursor(null, 'prev');
    req.onsuccess = () => {
      const cursor = req.result;
      resolve(cursor ? cursor.value : undefined);
    };
    req.onerror = () => reject(req.error);
  });
}

// ─────────────────────────────────────────
//   HISTÓRICO DE CORREÇÕES
// ─────────────────────────────────────────

/**
 * @typedef {Object} CorrectionPayload
 * @property {Record<string, number>} notas
 * @property {string} diagnostico
 * @property {string} [banca]
 * @property {string} [tema]
 * @property {string} [textoOriginal]
 */

/**
 * Persiste o payload completo de uma correção retornado pela IA.
 * @param {CorrectionPayload} payload
 * @returns {Promise<IDBValidKey>}
 */
export async function saveCorrectionPayload(payload) {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('correcoes_historico', 'readwrite');
    const req = tx.objectStore('correcoes_historico').add({
      ...payload,
      timestamp: new Date().toISOString(),
    });
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

/**
 * Retorna o histórico de correções ordenado da mais recente para a mais antiga.
 * @param {number} [limit=10]
 * @returns {Promise<CorrectionPayload[]>}
 */
export async function getCorrectionHistory(limit = 10) {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('correcoes_historico', 'readonly');
    const index = tx.objectStore('correcoes_historico').index('timestamp');
    const results = /** @type {CorrectionPayload[]} */ ([]);
    const req = index.openCursor(null, 'prev');

    req.onsuccess = () => {
      const cursor = req.result;
      if (cursor && results.length < limit) {
        results.push(cursor.value);
        cursor.continue();
      } else {
        resolve(results);
      }
    };
    req.onerror = () => reject(req.error);
  });
}

// ─────────────────────────────────────────
//   ANALYTICS DA ARENA
// ─────────────────────────────────────────

/**
 * @typedef {Object} GrammarMetric
 * @property {string} categoria
 * @property {number} acertos
 * @property {number} erros
 */

/**
 * Incrementa os acertos ou erros de uma categoria gramatical na Arena.
 * Utiliza put() com merge manual para preservar o histórico existente.
 * @param {string} categoria
 * @param {boolean} acerto - true = acerto, false = erro
 * @returns {Promise<void>}
 */
export async function updateGrammarMetric(categoria, acerto) {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('arena_analytics', 'readwrite');
    const store = tx.objectStore('arena_analytics');

    const getReq = store.get(categoria);
    getReq.onsuccess = () => {
      /** @type {GrammarMetric} */
      const existing = getReq.result || { categoria, acertos: 0, erros: 0 };
      if (acerto) existing.acertos += 1;
      else existing.erros += 1;

      const putReq = store.put(existing);
      putReq.onsuccess = () => resolve();
      putReq.onerror = () => reject(putReq.error);
    };
    getReq.onerror = () => reject(getReq.error);
  });
}

// ─────────────────────────────────────────
//   BACKUP & RESTORE
// ─────────────────────────────────────────

/**
 * Lê todas as object stores e retorna um objeto de backup completo.
 * @returns {Promise<Object>}
 */
export async function exportFullDatabaseBackup() {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const backup = {
      timestamp: new Date().toISOString(),
      version: DB_VERSION,
      redacoes_rascunhos: [],
      correcoes_historico: [],
      arena_analytics: []
    };

    const tx = db.transaction(['redacoes_rascunhos', 'correcoes_historico', 'arena_analytics'], 'readonly');

    const readStore = (storeName) => {
      return new Promise((res, rej) => {
        const req = tx.objectStore(storeName).getAll();
        req.onsuccess = () => { backup[storeName] = req.result; res(); };
        req.onerror = () => rej(req.error);
      });
    };

    Promise.all([
      readStore('redacoes_rascunhos'),
      readStore('correcoes_historico'),
      readStore('arena_analytics')
    ])
    .then(() => resolve(backup))
    .catch(reject);
  });
}

/**
 * Importa um objeto de backup para the IndexedDB em uma única transação.
 * @param {Object} backupObj 
 * @returns {Promise<void>}
 */
export async function importFullDatabaseBackup(backupObj) {
  if (!backupObj || !backupObj.timestamp || !backupObj.version) {
    throw new Error('Formato de backup inválido.');
  }

  const db = await getDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(['redacoes_rascunhos', 'correcoes_historico', 'arena_analytics'], 'readwrite');
    let errorOccurred = false;

    tx.oncomplete = () => { if (!errorOccurred) resolve(); };
    tx.onerror = (e) => { errorOccurred = true; reject(tx.error || e); };
    tx.onabort = () => { errorOccurred = true; reject(new Error('Transação abortada.')); };

    const writeStore = (storeName, dataList) => {
      if (!dataList || !Array.isArray(dataList)) return;
      const store = tx.objectStore(storeName);
      store.clear(); // Limpa os dados existentes para restaurar completamente
      dataList.forEach(item => {
        store.put(item);
      });
    };

    try {
      writeStore('redacoes_rascunhos', backupObj.redacoes_rascunhos);
      writeStore('correcoes_historico', backupObj.correcoes_historico);
      writeStore('arena_analytics', backupObj.arena_analytics);
    } catch (e) {
      errorOccurred = true;
      tx.abort();
      reject(e);
    }
  });
}
