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
