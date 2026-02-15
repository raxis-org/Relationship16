'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { User, ChevronLeft, ChevronRight, Share2, Check } from 'lucide-react';
import Layout from '../../../../components/Layout';
import ScaleSelector from '../../../../components/ScaleSelector';
import { questions, TOTAL_QUESTIONS } from '../../../../data/questions';
import { updateHostAnswers, getSession } from '../../../../lib/db';
import { calculateAxisScores } from '../../../../logic/diagnostic';
import styles from './page.module.css';

export default function User1Questions() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sid = searchParams.get('sid');
  
  const [sessionId, setSessionId] = useState(sid);
  const [user1Name, setUser1Name] = useState('');
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [showShare, setShowShare] = useState(false);

  useEffect(() => {
    if (!sid) {
      router.push('/diagnose');
      return;
    }
    
    setSessionId(sid);
    getSession(sid).then(session => {
      setUser1Name(session.host_name);
    }).catch(() => {
      router.push('/diagnose');
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
      await saveAndShowShare();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const saveAndShowShare = async () => {
    setLoading(true);
    try {
      const scores = calculateAxisScores(answers);
      await updateHostAnswers(sessionId, answers, scores);
      
      const url = `${window.location.origin}/diagnose/user2?sid=${sessionId}`;
      setShareUrl(url);
      setShowShare(true);
    } catch (err) {
      console.error(err);
      alert('保存に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert('URLをコピーしました！LINEで送信してください。');
    } catch (err) {
      const input = document.createElement('input');
      input.value = shareUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      alert('URLをコピーしました！LINEで送信してください。');
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

  if (!currentQuestion || showShare) {
    if (showShare) {
      return (
        <Layout>
          <div className={styles.container}>
            <div className={`glass ${styles.shareCard}`}>
              <div className={styles.shareIcon}>
                <Check className={styles.checkIcon} />
              </div>
              <h1 className={styles.shareTitle}>回答が完了しました！</h1>
              <p className={styles.shareText}>
                以下のURLをコピーして、相手に送信してください。<br />
                相手が回答すると、結果を見ることができます。
              </p>
              
              <div className={styles.urlBox}>
                <input type="text" value={shareUrl} readOnly className={styles.urlInput} />
                <button onClick={copyToClipboard} className={styles.copyButton}>
                  <Share2 className={styles.copyIcon} />
                  コピー
                </button>
              </div>

              <div className={styles.shareHint}>
                <p>💡 LINEで送る場合:</p>
                <ol>
                  <li>「コピー」ボタンをタップ</li>
                  <li>LINEを開く</li>
                  <li>相手のチャットに貼り付け</li>
                </ol>
              </div>
            </div>
          </div>
        </Layout>
      );
    }
    return null;
  }

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
              {user1Name || 'あなた'}
            </span>
          </div>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${progress}%` }} />
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
              <button onClick={handleNext} className={`${styles.navButton} ${styles.navButtonPrimary}`} disabled={loading}>
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
