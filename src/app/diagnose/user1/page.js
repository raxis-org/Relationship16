'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, ChevronLeft, ChevronRight, Check, X } from 'lucide-react';
import Layout from '../../../components/Layout';
import { useDiagnose } from '../../../context/DiagnoseContext';
import { questions, TOTAL_QUESTIONS } from '../../../data/questions';
import styles from './page.module.css';

export default function User1Questions() {
  const router = useRouter();
  const { user1Name, user1Answers, setUser1Answer } = useDiagnose();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!user1Name) {
      router.push('/diagnose');
    }
  }, [user1Name, router]);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / TOTAL_QUESTIONS) * 100;

  const handleAnswer = (value) => {
    setUser1Answer(currentQuestion.id, value);
    // 自動で次へ（最後以外）
    if (currentIndex < TOTAL_QUESTIONS - 1) {
      setTimeout(() => setCurrentIndex(prev => prev + 1), 200);
    }
  };

  const handleNext = () => {
    if (currentIndex < TOTAL_QUESTIONS - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      router.push('/diagnose/user2');
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const currentAnswer = user1Answers[currentQuestion?.id];

  // 軸と方向の日本語表示
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

  if (!user1Name || !currentQuestion) return null;

  const axisInfo = getAxisInfo(currentQuestion);

  return (
    <Layout>
      <div className={styles.container}>
        {/* Progress */}
        <div className={styles.progress}>
          <div className={styles.progressHeader}>
            <span className={styles.progressText}>
              質問 {currentIndex + 1} / {TOTAL_QUESTIONS}
            </span>
            <span className={styles.userBadge}>
              <User className={styles.userIcon} />
              {user1Name}
            </span>
          </div>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className={styles.axisIndicator}>
            <span className={styles.axisIcon}>{axisInfo.icon}</span>
            <span className={styles.axisName}>{axisInfo.name}軸</span>
            <span className={styles.axisDirection}>({axisInfo.direction}・{axisInfo.perspective})</span>
          </div>
        </div>

        {/* Question Card */}
        <div className={`glass ${styles.card} animate-slide-up`}>
          {/* Question */}
          <h2 className={styles.question}>{currentQuestion.text}</h2>

          {/* Binary Options */}
          <div className={styles.options}>
            <button
              onClick={() => handleAnswer(true)}
              className={`${styles.option} ${styles.optionYes} ${
                currentAnswer === true ? styles.optionSelected : ''
              }`}
            >
              <div className={`${styles.radio} ${
                currentAnswer === true ? styles.radioSelected : ''
              }`}>
                <Check className={styles.radioIcon} />
              </div>
              <span className={styles.optionLabel}>はい</span>
            </button>

            <button
              onClick={() => handleAnswer(false)}
              className={`${styles.option} ${styles.optionNo} ${
                currentAnswer === false ? styles.optionSelected : ''
              }`}
            >
              <div className={`${styles.radio} ${
                currentAnswer === false ? styles.radioSelected : ''
              }`}>
                <X className={styles.radioIcon} />
              </div>
              <span className={styles.optionLabel}>いいえ</span>
            </button>
          </div>

          {/* Navigation */}
          <div className={styles.navigation}>
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`${styles.navButton} ${styles.navButtonSecondary} ${
                currentIndex === 0 ? styles.navButtonHidden : ''
              }`}
            >
              <ChevronLeft className={styles.navIcon} />
              前へ
            </button>

            {currentAnswer !== undefined && currentIndex === TOTAL_QUESTIONS - 1 && (
              <button
                onClick={handleNext}
                className={`${styles.navButton} ${styles.navButtonPrimary}`}
              >
                回答完了
                <ChevronRight className={styles.navIcon} />
              </button>
            )}
          </div>
        </div>

        {/* Progress Dots */}
        <div className={styles.dots}>
          {questions.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`${styles.dot} ${
                idx === currentIndex ? styles.dotActive : ''
              } ${user1Answers[questions[idx].id] !== undefined ? styles.dotAnswered : ''}`}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
