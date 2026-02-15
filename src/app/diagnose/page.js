'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import Layout from '../../components/Layout';
import { useDiagnose } from '../../context/DiagnoseContext';
import styles from './page.module.css';

export default function DiagnoseStart() {
  const router = useRouter();
  const { setUser1Name } = useDiagnose();
  const [name, setName] = useState('');
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
        {/* Progress Steps */}
        <div className={styles.steps}>
          <div className={styles.stepActive}>1</div>
          <div className={styles.stepLine}></div>
          <div className={styles.stepInactive}>2</div>
          <div className={styles.stepLine}></div>
          <div className={styles.stepInactive}>3</div>
        </div>

        {/* Card */}
        <div className={styles.card}>
          <div className={styles.header}>
            <span className={styles.badge}>パートナーA</span>
            <h1 className={styles.title}>あなたの名前を入力</h1>
            <p className={styles.description}>
              診断を始める前に、まずあなたのお名前を教えてください
            </p>
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
                placeholder="例：山田太郎"
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
              次へ進む
              <ArrowRight className={styles.submitIcon} />
            </button>
          </form>
        </div>

        {/* Info */}
        <div className={styles.info}>
          <p>30問の質問に答えて、あなたと相手の関係性タイプを診断します</p>
        </div>
      </div>
    </Layout>
  );
}
