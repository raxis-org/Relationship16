'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Users, ChevronRight } from 'lucide-react';
import Layout from '../../components/Layout';
import { useDiagnose } from '../../context/DiagnoseContext';
import styles from './page.module.css';

export default function DiagnoseStart() {
  const router = useRouter();
  const { user1Name, setUser1Name } = useDiagnose();
  const [name, setName] = useState(user1Name);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('名前を入力してください');
      return;
    }
    setUser1Name(name.trim());
    router.push('/diagnose/user1');
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={`glass ${styles.card} animate-fade-in`}>
          <div className={styles.header}>
            <div className={`${styles.iconBox} ${styles.iconBlue}`}>
              <Users className={styles.icon} />
            </div>
            <div>
              <h2 className={styles.title}>パートナーA</h2>
              <p className={styles.subtitle}>まずあなたの名前を教えてください</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>
                お名前（ニックネーム可）
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError('');
                }}
                placeholder="山田太郎"
                className={styles.input}
                autoFocus
              />
              {error && <p className={styles.error}>{error}</p>}
            </div>

            <button
              type="submit"
              disabled={!name.trim()}
              className={styles.submitButton}
            >
              次へ
              <ChevronRight className={styles.submitIcon} />
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
