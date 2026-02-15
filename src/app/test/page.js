'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import styles from './page.module.css'

export default function TestPage() {
  const [status, setStatus] = useState('未接続')
  const [loading, setLoading] = useState(false)

  const testConnection = async () => {
    setLoading(true)
    setStatus('接続確認中...')
    
    try {
      const { data, error } = await supabase
        .from('sessions')
        .select('count')
        .limit(1)
      
      if (error) {
        setStatus(`❌ エラー: ${error.message}`)
      } else {
        setStatus('✅ DB接続成功！')
      }
    } catch (err) {
      setStatus(`❌ 例外: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const testInsert = async () => {
    setLoading(true)
    setStatus('テスト書き込み中...')
    
    try {
      const { data, error } = await supabase
        .from('sessions')
        .insert([{ host_name: 'テストユーザー', completed: false }])
        .select()
      
      if (error) {
        setStatus(`❌ 書き込みエラー: ${error.message}`)
      } else {
        setStatus(`✅ 書き込み成功！ID: ${data[0].id}`)
      }
    } catch (err) {
      setStatus(`❌ 例外: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <h1>Supabase接続テスト</h1>
      
      <div className={styles.statusBox}>
        <p>状態: <strong>{status}</strong></p>
        <p>URL: {process.env.NEXT_PUBLIC_SUPABASE_URL || '未設定'}</p>
      </div>
      
      <div className={styles.buttons}>
        <button onClick={testConnection} disabled={loading}>
          {loading ? '確認中...' : '接続テスト'}
        </button>
        <button onClick={testInsert} disabled={loading}>
          {loading ? '書き込み中...' : '書き込みテスト'}
        </button>
      </div>
      
      <div className={styles.help}>
        <h3>トラブルシューティング</h3>
        <ul>
          <li>URLとAPI Keyが.env.localに設定されているか確認</li>
          <li>Supabaseでsessionsテーブルが作成されているか確認</li>
          <li>RLSポリシーが設定されているか確認</li>
        </ul>
      </div>
    </div>
  )
}
