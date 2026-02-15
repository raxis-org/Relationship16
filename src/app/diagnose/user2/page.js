'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Users, ArrowRight } from 'lucide-react';
import Layout from '../../../components/Layout';
import { getSession } from '../../../lib/db';
import styles from './page.module.css';

export default function User2Landing() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sid = searchParams.get('sid');
  
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hostName, setHostName] = useState('');
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!sid) {
      router.push('/');
      return;
    }

    // セッション確認
    getSession(sid).then(session => {
      setHostName(session.host_name);
      setChecking(false);
    }).catch(() => {
      alert('無効なURLです');
      router.push('/');
    });
  }, [sid, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('名前を入力してください');
      return;
    }

    setLoading(true);
    // localStorageに保存
    localStorage.setItem(`user2_name_${sid}`, name.trim());
    router.push(`/diagnose/user2/questions?sid=${sid}`);
  };

  if (checking) {
    return (
      <Layout>
        <div className={styles.container}>
          <div className={styles.loading}>読み込み中...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.container}>
        <div className={`glass ${styles.card}`}>
          <div className={styles.header}>
            <div className={`${styles.iconBox} ${styles.iconPurple}`}>
              <Users className={styles.icon} />
            </div>
            <h1 className={styles.title}>{hostName}さんからの招待です</h1>
            <p className={styles.subtitle}>
              {hostName}さんとの関係性を診断します。<br />
              あなたの名前を入力してください。
            </p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>あなたの名前（ニックネーム可）</label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError('');
                }}
                placeholder="佐藤花子"
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
                  診断を始める
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
