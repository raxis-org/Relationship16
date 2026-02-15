'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, HelpCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import Layout from '../../../components/Layout';
import { useDiagnose } from '../../../context/DiagnoseContext';
import { questions } from '../../../data/questions';
import styles from './page.module.css';

export default function User1Questions() {
  const router = useRouter();
  const { user1Name, user1Answers, setUser1Answer } = useDiagnose();
  const [currentIndex, setCurrentIndex] = useState(0);

  // 未ログイン時はリダイレクト
  useEffect(() => {
    if (!user1Name) {
      router.push('/diagnose');
    }
  }, [user1Name, router]);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleAnswer = (value) => {
    setUser1Answer(currentQuestion.id, value);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // 全質問終了 → パートナーBの名前入力へ
      router.push('/diagnose/user2');
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const currentAnswer = user1Answers[currentQuestion?.id];

  if (!user1Name || !currentQuestion) return null;

  return (
    <Layout>
      <div className={styles.container}>
        {/* Progress */}
        <div className={styles.progress}>
          <div className={styles.progressHeader}>
            <span className={styles.progressText}>
              質問 {currentIndex + 1} / {questions.length}
            </span>
            <span className={styles.userBadge}>
              <User className={styles.userIcon} />
              {user1Name}の回答
            </span>
          </div>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className={`glass ${styles.card} animate-slide-up`}>
          {/* Axis Badge */}
          <div className={styles.axisBadge}>
            <span className={`${styles.badge} ${styles.badgeBlue}`}>
              {getAxisLabel(currentQuestion.axis)}
            </span>
            <HelpCircle className={styles.helpIcon} />
          </div>

          {/* Question */}
          <h2 className={styles.question}>{currentQuestion.text}</h2>

          {/* Options */}
          <div className={styles.options}>
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option.value)}
                className={`${styles.option} ${
                  currentAnswer === option.value ? styles.optionSelected : ''
                }`}
              >
                <div className={`${styles.radio} ${
                  currentAnswer === option.value ? styles.radioSelected : ''
                }`}>
                  {currentAnswer === option.value && (
                    <div className={styles.radioDot} />
                  )}
                </div>
                <span className={styles.optionLabel}>{option.label}</span>
              </button>
            ))}
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

            <button
              onClick={handleNext}
              disabled={currentAnswer === undefined}
              className={`${styles.navButton} ${styles.navButtonPrimary} ${
                currentAnswer === undefined ? styles.navButtonDisabled : ''
              }`}
            >
              {currentIndex === questions.length - 1 ? '回答完了' : '次へ'}
              <ChevronRight className={styles.navIcon} />
            </button>
          </div>
        </div>

        {/* Axis Description */}
        <p className={styles.description}>{getAxisDescription(currentQuestion.axis)}</p>
      </div>
    </Layout>
  );
}

function getAxisLabel(axis) {
  const labels = {
    temperature: '熱量軸',
    balance: '重心軸',
    purpose: '目的軸',
    sync: '同期軸',
    compatibility: '互換性',
  };
  return labels[axis] || axis;
}

function getAxisDescription(axis) {
  const descriptions = {
    temperature: '感情的・能動的か、冷静・ドライか',
    balance: '対等か、どちらかに偏っているか',
    purpose: '高め合い・生産性か、心地よさ・惰性か',
    sync: '二人の回答内容が一致しているか、ズレているか',
    compatibility: '価値観や感性の近さを測定します',
  };
  return descriptions[axis] || '';
}
