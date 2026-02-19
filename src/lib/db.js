// データベース操作のラッパー
import { 
  createSession as createSessionDb, 
  updateHostAnswers as updateHostAnswersDb, 
  getSession as getSessionDb, 
  completeSession as completeSessionDb,
  createGuestResponse as createGuestResponseDb,
  getGuestResponse as getGuestResponseDb,
  getGuestResponsesBySession as getGuestResponsesBySessionDb,
  getSessionWithGuestResponse as getSessionWithGuestResponseDb
} from './supabase';

export async function createSession(hostName) {
  const { data, error } = await createSessionDb(hostName);
  if (error) throw error;
  return data;
}

export async function updateHostAnswers(sessionId, answers, scores) {
  const { data, error } = await updateHostAnswersDb(sessionId, answers, scores);
  if (error) throw error;
  return data;
}

export async function getSession(sessionId) {
  const { data, error } = await getSessionDb(sessionId);
  if (error) throw error;
  return data;
}

// 後方互換性のために残す（単一ゲスト回答用）
export async function completeSession(sessionId, guestData, result) {
  const { data, error } = await completeSessionDb(sessionId, guestData, result);
  if (error) throw error;
  return data;
}

// ============ 複数ゲスト回答対応の新関数 ============

/**
 * ゲスト回答を新規作成（複数人回答対応）
 * @param {string} sessionId - セッションID
 * @param {Object} guestData - { name, answers, scores }
 * @param {Object} result - { type, syncRate }
 * @returns {Promise<Object>} - 作成されたゲスト回答（idを含む）
 */
export async function createGuestResponse(sessionId, guestData, result) {
  const { data, error } = await createGuestResponseDb(sessionId, guestData, result);
  if (error) throw error;
  return data;
}

/**
 * 特定のゲスト回答を取得
 * @param {string} responseId - ゲスト回答ID
 * @returns {Promise<Object>}
 */
export async function getGuestResponse(responseId) {
  const { data, error } = await getGuestResponseDb(responseId);
  if (error) throw error;
  return data;
}

/**
 * セッションに紐づく全ゲスト回答を取得
 * @param {string} sessionId - セッションID
 * @returns {Promise<Array>}
 */
export async function getGuestResponsesBySession(sessionId) {
  const { data, error } = await getGuestResponsesBySessionDb(sessionId);
  if (error) throw error;
  return data;
}

/**
 * セッションとゲスト回答を一緒に取得（結果表示用）
 * @param {string} sessionId - セッションID
 * @param {string} responseId - ゲスト回答ID
 * @returns {Promise<{session: Object, guestResponse: Object}>}
 */
export async function getSessionWithGuestResponse(sessionId, responseId) {
  const { data, error } = await getSessionWithGuestResponseDb(sessionId, responseId);
  if (error) throw error;
  return data;
}
