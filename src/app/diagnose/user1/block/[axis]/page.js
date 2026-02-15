'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowRight, Check } from 'lucide-react';
import Layout from '../../../../../components/Layout';
import { useDiagnose } from '../../../../../context/DiagnoseContext';
import { AXES, getQuestionsByAxis } from '../../../../../data/questions';
import styles from './page.module.css';

// 5段階の回答値
const SCALE_VALUES = [1, 2, 3, 4, 5];

export default function AxisBlock() {
  const router = useRouter();
  const params = useParams();
  const axisId = params.axis;
  
  const { 
    user1Name, 
    user1Answers, 
    setUser1Answer, 
    markBlockComplete,
    getCompletedBlockCount,
  } = useDiagnose();

  useEffect(() => {
    if (!AXES[axisId]) {
      router.push('/diagnose/user1');
    }
  }, [axisId, router]);

  useEffect(() => {
    if (!user1Name) {
      router.push('/diagnose');
    }
  }, [user1Name, router]);

  const axis = AXES[axisId];
  const questions = axis ? getQuestionsByAxis(axisId) : [];
  
  const axisOrder = ['P', 'M', 'G', 'V'];
  const axisIndex = axisOrder.indexOf(axisId);
  const completedCount = getCompletedBlockCount('user1');

  const allAnswered = questions.every(q => user1Answers[q.id] !== undefined);

  const handleAnswer = (questionId, value) => {
    setUser1Answer(questionId, value);
  };

  const handleNext = () => {
    if (!allAnswered) return;
    
    markBlockComplete('user1', axisId);
    
    const nextIndex = axisIndex + 1;
    if (nextIndex < axisOrder.length) {
      router.push(`/diagnose/user1/block/${axisOrder[nextIndex]}`);
    } else {
      router.push('/diagnose/user2');
    }
  };

  if (!axis) return null;

  return (
    <Layout>
      <div className={styles.container}>
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
            <span style={{ color: axis.color }}>{axis.nameJa}</span>
          </div>
        </div>

        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>{axis.nameJa}</h1>
          <p className={styles.subtitle}>{axis.name} - {axis.description}</p>
          <div className={styles.scaleInfo}>
            <span>{axis.left.nameJa}</span>
            <span className={styles.arrow}>←→</span>
            <span>{axis.right.nameJa}</span>
          </div>
        </div>

        {/* Questions */}
        <div className={styles.questions}>
          {questions.map((question, index) => {
            const currentAnswer = user1Answers[question.id];
            
            return (
              <div key={question.id} className={styles.questionCard}>
                <div className={styles.questionHeader}>
                  <span className={styles.questionNumber}>{question.code}</span>
                  {currentAnswer !== undefined && (
                    <span className={styles.answeredBadge} style={{ background: axis.color }}>
                      <Check className={styles.answeredIcon} />
                    </span>
                  )}
                </div>
                
                <h3 className={styles.questionText}>{question.text}</h3>
                
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
                      {value}
                    </button>
                  ))}
                </div>
                <div className={styles.scaleLabels}>
                  <span>1: 全く違う</span>
                  <span>5: 全くその通り</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Next Button */}
        <div className={styles.nextSection}>
          <div className={styles.answeredCount}>
            回答済み: {questions.filter(q => user1Answers[q.id] !== undefined).length} / {questions.length}
          </div>
          
          <button
            onClick={handleNext}
            disabled={!allAnswered}
            className={styles.nextButton}
            style={{
              background: allAnswered ? axis.color : undefined,
            }}
          >
            {axisIndex === 3 ? 'パートナーBの入力へ' : '次のブロックへ'}
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
