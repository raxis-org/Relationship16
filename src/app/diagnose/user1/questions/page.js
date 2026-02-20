'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { User, ChevronLeft, ChevronRight, Share2, Check, ArrowRight } from 'lucide-react';
import Layout from '../../../../components/Layout';
import ScaleSelector from '../../../../components/ScaleSelector';
import Toast from '../../../../components/Toast';
import ShareMenu from '../../../../components/ShareMenu';
import { questions, TOTAL_QUESTIONS } from '../../../../data/questions';
import { updateHostAnswers, getSession } from '../../../../lib/db';
import { calculateAxisScores } from '../../../../logic/diagnostic';
import styles from './page.module.css';

function QuestionsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sid = searchParams.get('sid');
  
  const [sessionId, setSessionId] = useState(sid);
  const [user1Name, setUser1Name] = useState('');
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false); // 連打防止用
  const [toast, setToast] = useState(null); // トースト通知

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
      await saveAndShowShare();
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

  const saveAndShowShare = async () => {
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
      const scores = calculateAxisScores(answers);
      await updateHostAnswers(sessionId, answers, scores);
      
      const url = `${window.location.origin}/diagnose/user2?sid=${sessionId}`;
      setShareUrl(url);
      setShowCompleteModal(true);
    } catch (err) {
      console.error(err);
      setToast({ message: '保存に失敗しました', type: 'error' });
      setSaving(false);
    } finally {
      setLoading(false);
    }
  };

  const handleShareMenuClose = () => {
    setShowShareMenu(false);
  };

  const handleCopySuccess = () => {
    setToast({ message: 'URLをコピーしました', type: 'success' });
  };

  const handleOpenShareMenu = () => {
    setShowCompleteModal(false);
    setTimeout(() => setShowShareMenu(true), 300);
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

  if (!currentQuestion) {
    return null;
  }

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
            {user1Name || 'あなた'}
          </span>
        </div>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
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

      {/* 完了モーダル */}
      {showCompleteModal && (
        <div className={styles.modalBackdrop} onClick={() => setShowCompleteModal(false)}>
          <div className={styles.modalContent}>
            <div className={styles.modalIcon}>
              <Check className={styles.modalCheckIcon} />
            </div>
            <h2 className={styles.modalTitle}>回答が完了しました！</h2>
            <p className={styles.modalText}>
              相手にリンクを送信してください
            </p>
            <button 
              className={styles.modalShareButton}
              onClick={handleOpenShareMenu}
            >
              <Share2 className={styles.modalShareIcon} />
              リンクを共有する
              <ArrowRight className={styles.modalArrowIcon} />
            </button>
            <button 
              className={styles.modalCloseButton}
              onClick={() => setShowCompleteModal(false)}
            >
              閉じる
            </button>
          </div>
        </div>
      )}

      {/* シェアメニュー */}
      <ShareMenu
        url={shareUrl}
        title="PMGV診断 - 4軸16タイプ関係性診断"
        text={`${user1Name}さんがあなたを関係性診断に招待しています`}
        isOpen={showShareMenu}
        onClose={handleShareMenuClose}
        onCopy={handleCopySuccess}
      />

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

export default function User1Questions() {
  return (
    <Layout>
      <Suspense fallback={<div className={styles.container}><div className={styles.loading}>読み込み中...</div></div>}>
        <QuestionsContent />
      </Suspense>
    </Layout>
  );
}
