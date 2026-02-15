'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import Layout from '../../../components/Layout';
import { useDiagnose } from '../../../context/DiagnoseContext';
import styles from './page.module.css';

export default function User2Page() {
  const router = useRouter();
  const { 
    user1Name, 
    user2Name, 
    setUser2Name, 
    getCompletedBlockCount,
  } = useDiagnose();

  const [name, setName] = useState('');

  useEffect(() => {
    if (!user1Name) {
      router.push('/diagnose');
      return;
    }

    // 名前が入力済みの場合は自動遷移
    if (user2Name) {
      const completedCount = getCompletedBlockCount('user2');
      
      if (completedCount >= 4) {
        router.push('/diagnose/loading');
      } else {
        const axisOrder = ['temperature', 'balance', 'purpose', 'sync'];
        const nextAxis = axisOrder[completedCount];
        router.push(`/diagnose/user2/block/${nextAxis}`);
      }
    }
  }, [user1Name, user2Name, getCompletedBlockCount, router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      setUser2Name(name.trim());
    }
  };

  if (!user1Name) return null;

  // 入力済みの場合はローディング表示
  if (user2Name) {
    return (
      <Layout>
        <div className={styles.loading}>読み込み中...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.container}>
        {/* Progress Steps */}
        <div className={styles.steps}>
          <div className={styles.stepComplete}>✓</div>
          <div className={styles.stepLineComplete}></div>
          <div className={styles.stepActive}>2</div>
          <div className={styles.stepLine}></div>
          <div className={styles.stepInactive}>3</div>
        </div>

        {/* Card */}
        <div className={styles.card}>
          <div className={styles.header}>
            <span className={styles.badge}>パートナーB</span>
            <h1 className={styles.title}>相手の名前を入力</h1>
            <p className={styles.description}>
              もう一方のパートナーのお名前を教えてください
            </p>
          </div>

          <div className={styles.partnerInfo}>
            <span className={styles.partnerLabel}>パートナーA</span>
            <span className={styles.partnerName}>{user1Name}</span>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>お名前（ニックネーム可）</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="例：田中花子"
                className={styles.input}
                autoFocus
              />
            </div>

            <button
              type="submit"
              disabled={!name.trim()}
              className={styles.submitButton}
            >
              診断を開始する
              <ArrowRight className={styles.submitIcon} />
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
