import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

// Helper functions for session management
export async function createSession(hostName) {
  const { data, error } = await supabase
    .from('sessions')
    .insert([{ host_name: hostName, completed: false }])
    .select()
    .single()
  return { data, error }
}

export async function updateHostAnswers(sessionId, answers, scores) {
  const { data, error } = await supabase
    .from('sessions')
    .update({ host_answers: answers, host_scores: scores })
    .eq('id', sessionId)
    .select()
    .single()
  return { data, error }
}

export async function getSession(sessionId) {
  const { data, error } = await supabase
    .from('sessions')
    .select('*')
    .eq('id', sessionId)
    .single()
  return { data, error }
}

// 後方互換性のために残す（単一ゲスト回答用）
export async function completeSession(sessionId, guestData, result) {
  const { data, error } = await supabase
    .from('sessions')
    .update({
      guest_name: guestData.name,
      guest_answers: guestData.answers,
      guest_scores: guestData.scores,
      result_type_id: result.type.id,
      sync_rate: result.syncRate,
      completed: true
    })
    .eq('id', sessionId)
    .select()
    .single()
  return { data, error }
}

// ============ 複数ゲスト回答対応の新関数 ============

/**
 * ゲスト回答を新規作成（複数人回答対応）
 * @param {string} sessionId - セッションID
 * @param {Object} guestData - { name, answers, scores }
 * @param {Object} result - { type, syncRate }
 * @returns {Promise<{data: Object, error: Error}>} - 作成されたゲスト回答（idを含む）
 */
export async function createGuestResponse(sessionId, guestData, result) {
  const { data, error } = await supabase
    .from('guest_responses')
    .insert([{
      session_id: sessionId,
      guest_name: guestData.name,
      guest_answers: guestData.answers,
      guest_scores: guestData.scores,
      result_type_id: result.type.id,
      sync_rate: result.syncRate
    }])
    .select()
    .single()
  return { data, error }
}

/**
 * 特定のゲスト回答を取得
 * @param {string} responseId - ゲスト回答ID
 * @returns {Promise<{data: Object, error: Error}>}
 */
export async function getGuestResponse(responseId) {
  const { data, error } = await supabase
    .from('guest_responses')
    .select('*')
    .eq('id', responseId)
    .single()
  return { data, error }
}

/**
 * セッションに紐づく全ゲスト回答を取得
 * @param {string} sessionId - セッションID
 * @returns {Promise<{data: Array, error: Error}>}
 */
export async function getGuestResponsesBySession(sessionId) {
  const { data, error } = await supabase
    .from('guest_responses')
    .select('*')
    .eq('session_id', sessionId)
    .order('created_at', { ascending: false })
  return { data, error }
}

/**
 * セッションとゲスト回答を一緒に取得（結果表示用）
 * @param {string} sessionId - セッションID
 * @param {string} responseId - ゲスト回答ID
 * @returns {Promise<{data: {session: Object, guestResponse: Object}, error: Error}>}
 */
export async function getSessionWithGuestResponse(sessionId, responseId) {
  // 並列で取得
  const [sessionResult, guestResult] = await Promise.all([
    getSession(sessionId),
    getGuestResponse(responseId)
  ])

  if (sessionResult.error) return { data: null, error: sessionResult.error }
  if (guestResult.error) return { data: null, error: guestResult.error }

  return {
    data: {
      session: sessionResult.data,
      guestResponse: guestResult.data
    },
    error: null
  }
}
