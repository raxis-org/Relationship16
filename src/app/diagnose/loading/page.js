'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles } from 'lucide-react';
import Layout from '../../../components/Layout';
import { useDiagnose } from '../../../context/DiagnoseContext';
import { diagnose } from '../../../logic/diagnostic';
import styles from './page.module.css';

export default function Loading() {
  const router = useRouter();
  const { user1Name, user2Name, user1Answers, user2Answers, setResult } = useDiagnose();

  useEffect(() => {
    if (!user1Name || !user2Name || Object.keys(user1Answers).length === 0) {
      router.push('/diagnose');
      return;
    }

    // Simulate diagnosis calculation
    const timer = setTimeout(() => {
      const result = diagnose(user1Answers, user2Answers, user1Name, user2Name);
      setResult(result);
      router.push('/result');
    }, 2500);

    return () => clearTimeout(timer);
  }, [user1Name, user2Name, user1Answers, user2Answers, setResult, router]);

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.spinnerWrapper}>
            <div className={styles.spinnerGlow} />
            <Sparkles className={styles.spinner} />
          </div>
          
          <h2 className={styles.title}>診断中...</h2>
          <p className={styles.text}>4軸スコアを計算しています</p>
          <p className={styles.subtext}>熱量・重心・目的・同期</p>
          
          <div className={styles.dots}>
            <div className={`${styles.dot} ${styles.dot1}`} />
            <div className={`${styles.dot} ${styles.dot2}`} />
            <div className={`${styles.dot} ${styles.dot3}`} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
