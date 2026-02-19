'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Users, ArrowRight } from 'lucide-react';
import Layout from '../../../components/Layout';
import Toast from '../../../components/Toast';
import { getSession } from '../../../lib/db';
import styles from './page.module.css';

function User2LandingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sid = searchParams.get('sid');
  
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hostName, setHostName] = useState('');
  const [checking, setChecking] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!sid) {
      router.push('/');
      return;
    }

    getSession(sid).then(session => {
      setHostName(session.host_name);
      setChecking(false);
    }).catch(() => {
      setToast({ message: '無効なURLです', type: 'error' });
      setTimeout(() => router.push('/'), 1500);
    });
  }, [sid, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('名前を入力してください');
      return;
    }

    setLoading(true);
    localStorage.setItem(`user2_name_${sid}`, name.trim());
    router.push(`/diagnose/user2/questions?sid=${sid}`);
  };

  if (checking) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>読み込み中...</div>
      </div>
    );
  }

  return (
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

      {/* トースト通知 */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default function User2Landing() {
  return (
    <Layout>
      <Suspense fallback={<div className={styles.container}><div className={styles.loading}>読み込み中...</div></div>}>
        <User2LandingContent />
      </Suspense>
    </Layout>
  );
}
