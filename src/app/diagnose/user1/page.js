'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, ArrowRight } from 'lucide-react';
import Layout from '../../../components/Layout';
import { createSession } from '../../../lib/db';
import styles from './page.module.css';

export default function User1NameInput() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('名前を入力してください');
      return;
    }

    setLoading(true);
    try {
      // DBにセッション作成
      const session = await createSession(name.trim());
      
      // 質問ページへ（セッションID付きURL）
      router.push(`/diagnose/user1/questions?sid=${session.id}`);
    } catch (err) {
      console.error(err);
      setError('エラーが発生しました。もう一度お試しください。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={`glass ${styles.card}`}>
          <div className={styles.header}>
            <div className={`${styles.iconBox} ${styles.iconBlue}`}>
              <User className={styles.icon} />
            </div>
            <h1 className={styles.title}>あなたの名前を入力</h1>
            <p className={styles.subtitle}>相手との関係性を診断します</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>お名前（ニックネーム可）</label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError('');
                }}
                placeholder="山田太郎"
                className={styles.input}
                disabled={loading}
                autoFocus
              />
              {error && <p className={styles.error}>{error}</p>}
            </div>

            <button
              type="submit"
              disabled={!name.trim() || loading}
              className={styles.submitButton}
            >
              {loading ? '読み込み中...' : (
                <>
                  次へ
                  <ArrowRight className={styles.submitIcon} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
