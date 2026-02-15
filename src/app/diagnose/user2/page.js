'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Users, User, HelpCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import Layout from '../../../components/Layout';
import { useDiagnose } from '../../../context/DiagnoseContext';
import { questions } from '../../../data/questions';
import styles from './page.module.css';

export default function User2Questions() {
  const router = useRouter();
  const { user1Name, user2Name, setUser2Name, user2Answers, setUser2Answer } = useDiagnose();
  const [name, setName] = useState(user2Name);
  const [showNameInput, setShowNameInput] = useState(!user2Name);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user1Name) {
      router.push('/diagnose');
    }
  }, [user1Name, router]);

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('名前を入力してください');
      return;
    }
    setUser2Name(name.trim());
    setShowNameInput(false);
  };

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleAnswer = (value) => {
    setUser2Answer(currentQuestion.id, value);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
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

  if (!user1Name) return null;

  // Name Input Mode
  if (showNameInput) {
    return (
      <Layout>
        <div className={styles.container}>
          <div className={`glass ${styles.card} animate-fade-in`}>
            <div className={styles.header}>
              <div className={`${styles.iconBox} ${styles.iconPurple}`}>
                <Users className={styles.icon} />
              </div>
              <div>
                <h2 className={styles.title}>パートナーB</h2>
                <p className={styles.subtitle}>{user1Name}さんとの関係性を診断します</p>
              </div>
            </div>

            <form onSubmit={handleNameSubmit} className={styles.form}>
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

  // Question Mode
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
              {user2Name}の回答
            </span>
          </div>
          <div className={styles.progressBar}>
            <div
              className={`${styles.progressFill} ${styles.progressFillPurple}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className={`glass ${styles.card} animate-slide-up`}>
          <div className={styles.axisBadge}>
            <span className={`${styles.badge} ${styles.badgePurple}`}>
              {getAxisLabel(currentQuestion.axis)}
            </span>
            <HelpCircle className={styles.helpIcon} />
          </div>

          <h2 className={styles.question}>{currentQuestion.text}</h2>

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
                  {currentAnswer === option.value && <div className={styles.radioDot} />}
                </div>
                <span className={styles.optionLabel}>{option.label}</span>
              </button>
            ))}
          </div>

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
