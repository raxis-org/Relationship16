'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, ChevronLeft, ChevronRight } from 'lucide-react';
import Layout from '../../../../components/Layout';
import ScaleSelector from '../../../../components/ScaleSelector';
import { useDiagnose } from '../../../../context/DiagnoseContext';
import { questions, TOTAL_QUESTIONS } from '../../../../data/questions';
import styles from './page.module.css';

export default function User2Questions() {
  const router = useRouter();
  const { user1Name, user2Name, user2Answers, setUser2Answer } = useDiagnose();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!user1Name) {
      router.push('/diagnose');
      return;
    }
    if (!user2Name) {
      router.push('/diagnose/user2');
    }
  }, [user1Name, user2Name, router]);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / TOTAL_QUESTIONS) * 100;

  const handleAnswer = (value) => {
    setUser2Answer(currentQuestion.id, value);
    if (currentIndex < TOTAL_QUESTIONS - 1) {
      setTimeout(() => setCurrentIndex(prev => prev + 1), 300);
    }
  };

  const handleNext = () => {
    if (currentIndex < TOTAL_QUESTIONS - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      router.push('/diagnose/loading');
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const currentAnswer = user2Answers[currentQuestion?.id];

  const getAxisInfo = (q) => {
    const axisNames = {
      temperature: { name: '熱量', icon: '🔥' },
      balance: { name: '重心', icon: '⚖️' },
      purpose: { name: '目的', icon: '🎯' },
      sync: { name: '同期', icon: '🔗' },
    };
    const directionLabels = {
      hot: '熱い', cold: '冷たい',
      equal: '対等', lean: '偏り',
      value: '価値', loose: '緩やか',
      sync: '同期', desync: '非同期',
    };
    const perspectiveLabels = { self: '自分', other: '相手' };
    
    const axis = axisNames[q.axis];
    return {
      ...axis,
      direction: directionLabels[q.direction],
      perspective: perspectiveLabels[q.perspective],
    };
  };

  if (!user1Name || !user2Name || !currentQuestion) return null;

  const axisInfo = getAxisInfo(currentQuestion);

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.progress}>
          <div className={styles.progressHeader}>
            <span className={styles.progressText}>
              質問 {currentIndex + 1} / {TOTAL_QUESTIONS}
            </span>
            <span className={styles.userBadge}>
              <User className={styles.userIcon} />
              {user2Name}
            </span>
          </div>
          <div className={styles.progressBar}>
            <div className={`${styles.progressFill} ${styles.progressFillPurple}`} style={{ width: `${progress}%` }} />
          </div>
          <div className={styles.axisIndicator}>
            <span className={styles.axisIcon}>{axisInfo.icon}</span>
            <span className={styles.axisName}>{axisInfo.name}軸</span>
            <span className={styles.axisDirection}>({axisInfo.direction}・{axisInfo.perspective})</span>
          </div>
        </div>

        <div className={`glass ${styles.card}`}>
          <h2 className={styles.question}>{currentQuestion.text}</h2>
          <ScaleSelector value={currentAnswer} onChange={handleAnswer} />
          
          <div className={styles.navigation}>
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`${styles.navButton} ${styles.navButtonSecondary} ${currentIndex === 0 ? styles.navButtonHidden : ''}`}
            >
              <ChevronLeft className={styles.navIcon} />
              前へ
            </button>

            {currentAnswer !== undefined && currentIndex === TOTAL_QUESTIONS - 1 && (
              <button onClick={handleNext} className={`${styles.navButton} ${styles.navButtonPrimary}`}>
                回答完了
                <ChevronRight className={styles.navIcon} />
              </button>
            )}
          </div>
        </div>

        <div className={styles.dots}>
          {questions.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`${styles.dot} ${idx === currentIndex ? styles.dotActive : ''} ${user2Answers[questions[idx].id] !== undefined ? styles.dotAnswered : ''}`}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
