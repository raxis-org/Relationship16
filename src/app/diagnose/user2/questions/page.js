'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { User, ChevronLeft, ChevronRight } from 'lucide-react';
import Layout from '../../../../components/Layout';
import ScaleSelector from '../../../../components/ScaleSelector';
import Toast from '../../../../components/Toast';
import { questions, TOTAL_QUESTIONS } from '../../../../data/questions';
import { createGuestResponse, getSession } from '../../../../lib/db';
import { calculateAxisScores, diagnose } from '../../../../logic/diagnostic';
import styles from './page.module.css';

function User2QuestionsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sid = searchParams.get('sid');
  
  const [sessionId, setSessionId] = useState(sid);
  const [user1Name, setUser1Name] = useState('');
  const [user2Name, setUser2Name] = useState('');
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false); // 連打防止用
  const [toast, setToast] = useState(null); // トースト通知

  useEffect(() => {
    if (!sid) {
      router.push('/');
      return;
    }
    
    setSessionId(sid);
    getSession(sid).then(session => {
      setUser1Name(session.host_name);
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
    // 連打防止：処理中は無視
    if (isProcessing || saving) return;
    
    setIsProcessing(true);
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
    
    if (currentIndex < TOTAL_QUESTIONS - 1) {
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
        setIsProcessing(false);
      }, 300);
    } else {
      // 最後の質問の場合は処理完了
      setIsProcessing(false);
    }
  };

  const handleNext = async () => {
    // 保存中または連打防止中は無視
    if (saving || isProcessing) return;
    
    if (currentIndex < TOTAL_QUESTIONS - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      await completeAndShowResult();
    }
  };

  const handlePrev = () => {
    // 保存中は操作無効
    if (saving) return;
    
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  // 全質問に回答済みかチェック
  const isAllAnswered = () => {
    return questions.every(q => answers[q.id] !== undefined);
  };

  // 回答済み質問数
  const answeredCount = Object.keys(answers).length;

  const completeAndShowResult = async () => {
    // 全質問回答済みチェック
    if (!isAllAnswered()) {
      const unanswered = questions.filter(q => answers[q.id] === undefined);
      setToast({
        message: `未回答の質問が ${unanswered.length} 問あります`,
        type: 'error'
      });
      // 最初の未回答質問に移動
      const firstUnanswered = questions.findIndex(q => answers[q.id] === undefined);
      if (firstUnanswered !== -1) {
        setCurrentIndex(firstUnanswered);
      }
      return;
    }

    // 既に保存中なら無視（二重送信防止）
    if (saving) return;

    setSaving(true);
    setLoading(true);
    
    try {
      const session = await getSession(sessionId);
      const hostAnswers = session.host_answers;
      
      const guestScores = calculateAxisScores(answers);
      
      const result = diagnose(hostAnswers, answers, session.host_name, user2Name);
      
      const guestData = {
        name: user2Name,
        answers: answers,
        scores: guestScores
      };
      
      // 複数人回答対応：新しいゲスト回答を作成（既存データを上書きしない）
      const guestResponse = await createGuestResponse(sessionId, guestData, result);
      
      // 結果ページにはセッションIDとゲスト回答IDの両方を渡す
      router.push(`/result?sid=${sessionId}&gid=${guestResponse.id}`);
    } catch (err) {
      console.error(err);
      setToast({ message: '保存に失敗しました', type: 'error' });
      setSaving(false);
      setLoading(false);
    }
    // saving と loading はリセットしない（遷移中のため）
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
        </div>
      </div>

      <div className={`glass ${styles.card}`}>
        <h2 className={styles.question}>{currentQuestion.text}</h2>
        <ScaleSelector 
          value={currentAnswer} 
          onChange={handleAnswer}
          disabled={isProcessing || saving}
        />
        
        <div className={styles.navigation}>
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0 || saving}
            className={`${styles.navButton} ${styles.navButtonSecondary} ${currentIndex === 0 ? styles.navButtonHidden : ''}`}
          >
            <ChevronLeft className={styles.navIcon} />
            前へ
          </button>

          {currentIndex === TOTAL_QUESTIONS - 1 && (
            <button 
              onClick={handleNext} 
              className={`${styles.navButton} ${styles.navButtonPrimary}`}
              disabled={saving || isProcessing || !isAllAnswered()}
            >
              {saving ? '保存中...' : `回答を完了する (${answeredCount}/${TOTAL_QUESTIONS})`}
              <ChevronRight className={styles.navIcon} />
            </button>
          )}
        </div>
      </div>

      <div className={styles.dots}>
        {questions.map((_, idx) => (
          <button
            key={idx}
            onClick={() => !saving && !isProcessing && setCurrentIndex(idx)}
            disabled={saving || isProcessing}
            className={`${styles.dot} ${idx === currentIndex ? styles.dotActive : ''} ${answers[questions[idx].id] !== undefined ? styles.dotAnswered : ''}`}
          />
        ))}
      </div>

      {/* トースト通知 */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default function User2Questions() {
  return (
    <Layout>
      <Suspense fallback={<div className={styles.container}><div className={styles.loading}>読み込み中...</div></div>}>
        <User2QuestionsContent />
      </Suspense>
    </Layout>
  );
}
