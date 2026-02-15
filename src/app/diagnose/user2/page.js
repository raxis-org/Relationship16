'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Users, ChevronRight } from 'lucide-react';
import Layout from '../../../components/Layout';
import { useDiagnose } from '../../../context/DiagnoseContext';
import styles from './page.module.css';

export default function User2NameInput() {
  const router = useRouter();
  const { user1Name, user2Name, setUser2Name } = useDiagnose();
  const [name, setName] = useState(user2Name || '');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user1Name) {
      router.push('/diagnose');
    }
  }, [user1Name, router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('名前を入力してください');
      return;
    }
    setUser2Name(name.trim());
    router.push('/diagnose/user2/questions');
  };

  if (!user1Name) return null;

  return (
    <Layout>
      <div className={styles.container}>
        <div className={`glass ${styles.card}`}>
          <div className={styles.header}>
            <div className={`${styles.iconBox} ${styles.iconPurple}`}>
              <Users className={styles.icon} />
            </div>
            <div>
              <h2 className={styles.title}>パートナーB</h2>
              <p className={styles.subtitle}>{user1Name}さんとの関係性を診断します</p>
            </div>
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
                placeholder="佐藤花子"
                className={styles.input}
                autoFocus
              />
              {error && <p className={styles.error}>{error}</p>}
            </div>

            <div className={styles.infoBox}>
              <p className={styles.infoText}>
                <span className={styles.infoHighlight}>{user1Name}</span> さんと
                <span className={styles.infoHighlightPurple}> {name || 'パートナー'}</span> さんの
                関係性を診断します。
              </p>
            </div>

            <button
              type="submit"
              disabled={!name.trim()}
              className={styles.submitButton}
            >
              診断を始める
              <ChevronRight className={styles.submitIcon} />
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
