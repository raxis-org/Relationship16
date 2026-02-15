// DB接続テスト用
import { supabase } from './supabase'

export async function testConnection() {
  try {
    // テストクエリ実行
    const { data, error } = await supabase
      .from('sessions')
      .select('count')
      .limit(1)
    
    if (error) {
      console.error('DB接続エラー:', error.message)
      return { success: false, error: error.message }
    }
    
    console.log('✅ DB接続成功！')
    return { success: true }
  } catch (err) {
    console.error('接続エラー:', err)
    return { success: false, error: err.message }
  }
}
