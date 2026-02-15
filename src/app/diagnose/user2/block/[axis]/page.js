'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowRight, Check } from 'lucide-react';
import Layout from '../../../../../components/Layout';
import { useDiagnose } from '../../../../../context/DiagnoseContext';
import { axes, getQuestionsByAxis } from '../../../../../data/questions';
import styles from './page.module.css';

// 6段階のスケール値
const SCALE_VALUES = [-3, -2, -1, 1, 2, 3];

export default function AxisBlock() {
  const router = useRouter();
  const params = useParams();
  const axisId = params.axis;
  
  const { 
    user1Name,
    user2Name, 
    user2Answers, 
    setUser2Answer, 
    markBlockComplete,
    getCompletedBlockCount,
  } = useDiagnose();

  useEffect(() => {
    if (!axes[axisId]) {
      router.push('/diagnose/user2');
    }
  }, [axisId, router]);

  useEffect(() => {
    if (!user2Name) {
      router.push('/diagnose/user2');
    }
  }, [user2Name, router]);

  const axis = axes[axisId];
  const questions = axis ? getQuestionsByAxis(axisId) : [];
  
  const axisOrder = ['temperature', 'balance', 'purpose', 'sync'];
  const axisIndex = axisOrder.indexOf(axisId);
  const completedCount = getCompletedBlockCount('user2');

  const allAnswered = questions.every(q => user2Answers[q.id] !== undefined);

  const handleAnswer = (questionId, value) => {
    setUser2Answer(questionId, value);
  };

  const handleNext = () => {
    if (!allAnswered) return;
    
    markBlockComplete('user2', axisId);
    
    const nextIndex = axisIndex + 1;
    if (nextIndex < axisOrder.length) {
      router.push(`/diagnose/user2/block/${axisOrder[nextIndex]}`);
    } else {
      router.push('/diagnose/loading');
    }
  };

  if (!axis) return null;

  return (
    <Layout>
      <div className={styles.container}>
        {/* Partners */}
        <div className={styles.partners}>
          <span className={styles.partner}>{user1Name}</span>
          <span className={styles.vs}>×</span>
          <span className={styles.partnerActive}>{user2Name}</span>
        </div>

        {/* Progress */}
        <div className={styles.progress}>
          <div className={styles.progressBar}>
            {axisOrder.map((id, idx) => (
              <div
                key={id}
                className={`${styles.progressStep} ${
                  idx < completedCount ? styles.progressComplete : ''
                } ${idx === axisIndex ? styles.progressCurrent : ''}`}
                style={{
                  background: idx < completedCount ? axis.color : undefined,
                  borderColor: idx === axisIndex ? axis.color : undefined,
                }}
              >
                {idx < completedCount && <Check className={styles.progressCheck} />}
              </div>
            ))}
          </div>
          <div className={styles.progressLabels}>
            <span>ブロック {axisIndex + 1} / 4</span>
            <span style={{ color: axis.color }}>{axis.name}</span>
          </div>
        </div>

        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>{axis.name}</h1>
          <p className={styles.subtitle}>{axis.description}</p>
          <div className={styles.scaleInfo}>
            <span>{axis.leftLabel}</span>
            <span className={styles.arrow}>←→</span>
            <span>{axis.rightLabel}</span>
          </div>
        </div>

        {/* Questions */}
        <div className={styles.questions}>
          {questions.map((question, index) => {
            const currentAnswer = user2Answers[question.id];
            
            return (
              <div key={question.id} className={styles.questionCard}>
                <div className={styles.questionHeader}>
                  <span className={styles.questionNumber}>Q{index + 1}</span>
                  {currentAnswer !== undefined && (
                    <span className={styles.answeredBadge} style={{ background: axis.color }}>
                      <Check className={styles.answeredIcon} />
                    </span>
                  )}
                </div>
                
                <h3 className={styles.questionText}>{question.text}</h3>
                <p className={styles.questionDesc}>{question.description}</p>
                
                <div className={styles.scale}>
                  {SCALE_VALUES.map((value) => (
                    <button
                      key={value}
                      onClick={() => handleAnswer(question.id, value)}
                      className={`${styles.scaleButton} ${
                        currentAnswer === value ? styles.scaleSelected : ''
                      }`}
                      style={{
                        background: currentAnswer === value ? axis.color : undefined,
                        borderColor: currentAnswer === value ? axis.color : undefined,
                      }}
                    >
                      {value > 0 ? `+${value}` : value}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Next Button */}
        <div className={styles.nextSection}>
          <div className={styles.answeredCount}>
            回答済み: {questions.filter(q => user2Answers[q.id] !== undefined).length} / {questions.length}
          </div>
          
          <button
            onClick={handleNext}
            disabled={!allAnswered}
            className={styles.nextButton}
            style={{
              background: allAnswered ? axis.color : undefined,
            }}
          >
            {axisIndex === 3 ? '診断結果を見る' : '次のブロックへ'}
            <ArrowRight className={styles.nextIcon} />
          </button>
          
          {!allAnswered && (
            <p className={styles.hint}>すべての質問に回答してください</p>
          )}
        </div>
      </div>
    </Layout>
  );
}
