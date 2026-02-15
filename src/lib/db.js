// データベース操作のラッパー
import { 
  createSession as createSessionDb, 
  updateHostAnswers as updateHostAnswersDb, 
  getSession as getSessionDb, 
  completeSession as completeSessionDb 
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

export async function completeSession(sessionId, guestData, result) {
  const { data, error } = await completeSessionDb(sessionId, guestData, result);
  if (error) throw error;
  return data;
}
