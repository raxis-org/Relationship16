'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../../../components/Layout';
import { useDiagnose } from '../../../context/DiagnoseContext';
import { diagnose } from '../../../logic/diagnostic';
import styles from './page.module.css';

export default function Loading() {
  const router = useRouter();
  const { 
    user1Name, 
    user2Name, 
    user1MBTI,
    user2MBTI,
    user1Age,
    user2Age,
    category,
    user1Answers, 
    user2Answers, 
    setResult 
  } = useDiagnose();

  useEffect(() => {
    if (!user1Name || !user2Name || Object.keys(user1Answers).length === 0) {
      router.push('/diagnose');
      return;
    }

    // 診断実行
    const timer = setTimeout(() => {
      const result = diagnose({
        answers1: user1Answers,
        answers2: user2Answers,
        user1Name,
        user2Name,
        user1MBTI,
        user2MBTI,
        user1Age: parseInt(user1Age) || 0,
        user2Age: parseInt(user2Age) || 0,
        category,
      });
      setResult(result);
      router.push('/result');
    }, 2000);

    return () => clearTimeout(timer);
  }, [
    user1Name, user2Name, user1MBTI, user2MBTI, user1Age, user2Age, category,
    user1Answers, user2Answers, setResult, router
  ]);

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.spinner} />
        <h2 className={styles.title}>診断中...</h2>
        <p className={styles.text}>32問の回答を分析しています</p>
      </div>
    </Layout>
  );
}
