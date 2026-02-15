'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { User, ChevronLeft, ChevronRight } from 'lucide-react';
import Layout from '../../../../components/Layout';
import ScaleSelector from '../../../../components/ScaleSelector';
import { questions, TOTAL_QUESTIONS } from '../../../../data/questions';
import { completeSession, getSession } from '../../../../lib/db';
import { calculateAxisScores, diagnose } from '../../../../logic/diagnostic';
import styles from './page.module.css';

export default function User2Questions() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sid = searchParams.get('sid');
  
  const [sessionId, setSessionId] = useState(sid);
  const [user1Name, setUser1Name] = useState('');
  const [user2Name, setUser2Name] = useState('');
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!sid) {
      router.push('/');
      return;
    }
    
    setSessionId(sid);
    getSession(sid).then(session => {
      setUser1Name(session.host_name);
      // user2ページで入力した名前がlocalStorageにあれば取得
      const storedName = localStorage.getItem(`user2_name_${sid}`);
      if (storedName) {
        setUser2Name(storedName);
      }
    }).catch(() => {
      router.push('/');
    });
  }, [sid, router]);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / TOTAL_QUESTIONS) * 100;

  const handleAnswer = (value) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
    if (currentIndex < TOTAL_QUESTIONS - 1) {
      setTimeout(() => setCurrentIndex(prev => prev + 1), 300);
    }
  };

  const handleNext = async () => {
    if (currentIndex < TOTAL_QUESTIONS - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      await completeAndShowResult();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const completeAndShowResult = async () => {
    setLoading(true);
    try {
      // ホストのデータを取得
      const session = await getSession(sessionId);
      const hostAnswers = session.host_answers;
      
      // ゲストのスコア計算
      const guestScores = calculateAxisScores(answers);
      
      // 診断実行
      const result = diagnose(hostAnswers, answers, session.host_name, user2Name);
      
      // DBに保存
      const guestData = {
        name: user2Name,
        answers: answers,
        scores: guestScores
      };
      await completeSession(sessionId, guestData, result);
      
      // 結果ページへ（user2は即座に結果を見る）
      router.push(`/result?sid=${sessionId}`);
    } catch (err) {
      console.error(err);
      alert('保存に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  const currentAnswer = answers[currentQuestion?.id];

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

  if (!currentQuestion) return null;

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
              {user2Name || '相手'}
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
              <button 
                onClick={handleNext} 
                className={`${styles.navButton} ${styles.navButtonPrimary}`}
                disabled={loading}
              >
                {loading ? '保存中...' : '回答を完了する'}
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
              className={`${styles.dot} ${idx === currentIndex ? styles.dotActive : ''} ${answers[questions[idx].id] !== undefined ? styles.dotAnswered : ''}`}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
