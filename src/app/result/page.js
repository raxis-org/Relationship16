'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { RefreshCw, Share2, ChevronDown, ChevronUp } from 'lucide-react';
import Layout from '../../components/Layout';
import { useDiagnose } from '../../context/DiagnoseContext';
import { AXES } from '../../data/questions';
import styles from './page.module.css';

export default function Result() {
  const router = useRouter();
  const { result, reset } = useDiagnose();
  const [showComparison, setShowComparison] = useState(false);

  useEffect(() => {
    if (!result) {
      router.push('/diagnose');
    }
  }, [result, router]);

  if (!result) return null;

  const { type, typeCode, scores, users, answerComparison } = result;

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert('結果のURLをコピーしました！');
    });
  };

  // 軸データ
  const axisData = [
    { key: 'P', ...AXES.P },
    { key: 'M', ...AXES.M },
    { key: 'G', ...AXES.G },
    { key: 'V', ...AXES.V },
  ];

  // スコアを0-100%に変換
  const normalizeScore = (score) => ((score - 1) / 4) * 100;

  return (
    <Layout>
      <div className={styles.container}>
        {/* Partners */}
        <div className={styles.partners}>
          <span>{users.user1.name}</span>
          <span className={styles.times}>×</span>
          <span>{users.user2.name}</span>
        </div>

        {/* Type Code */}
        <div className={styles.codeSection}>
          <div className={styles.typeCode}>{typeCode}</div>
          <div className={styles.codeLabel}>あなたたちの関係性タイプ</div>
        </div>

        {/* Main Result */}
        <div className={styles.mainCard}>
          <div className={styles.rank}>{type.rank}ランク</div>
          <h1 className={styles.typeName}>{type.name}</h1>
          <p className={styles.description}>{type.description}</p>
        </div>

        {/* Scores */}
        <div className={styles.scoresGrid}>
          <div className={styles.scoreCard}>
            <div className={styles.scoreLabel}>関係性フィット度</div>
            <div className={styles.scoreValue}>{scores.fitScore}%</div>
          </div>
          <div className={styles.scoreCard}>
            <div className={styles.scoreLabel}>関係性安定度</div>
            <div className={styles.scoreValue}>{scores.stabilityScore}%</div>
          </div>
          <div className={styles.scoreCard}>
            <div className={styles.scoreLabel}>絆スコア</div>
            <div className={styles.scoreValue}>{scores.kizunaScore}%</div>
          </div>
        </div>

        {/* 4 Axis Scores */}
        <div className={styles.axisSection}>
          <h2 className={styles.sectionTitle}>4軸分析</h2>
          <div className={styles.axisGrid}>
            {axisData.map((axis) => {
              const detail = scores.axisDetails[axis.key];
              const u1Pct = normalizeScore(detail.user1);
              const u2Pct = normalizeScore(detail.user2);
              
              return (
                <div key={axis.key} className={styles.axisCard}>
                  <div className={styles.axisHeader}>
                    <span className={styles.axisCode}>{axis.key}</span>
                    <span className={styles.axisName}>{axis.nameJa}</span>
                    <span 
                      className={styles.axisSide}
                      style={{ color: axis.color }}
                    >
                      {detail.isRight ? axis.right.code : axis.left.code}
                    </span>
                  </div>
                  <div className={styles.axisBarContainer}>
                    <div className={styles.axisLabels}>
                      <span>{axis.left.code}</span>
                      <span>{axis.right.code}</span>
                    </div>
                    <div className={styles.axisBar}>
                      <div 
                        className={styles.axisMarker}
                        style={{ 
                          left: `${u1Pct}%`,
                          background: '#666',
                        }}
                        title={`${users.user1.name}: ${detail.user1.toFixed(1)}`}
                      />
                      <div 
                        className={styles.axisMarker}
                        style={{ 
                          left: `${u2Pct}%`,
                          background: axis.color,
                        }}
                        title={`${users.user2.name}: ${detail.user2.toFixed(1)}`}
                      />
                      <div 
                        className={styles.axisThreshold}
                        style={{ 
                          left: `${normalizeScore(detail.threshold)}%`,
                        }}
                      />
                    </div>
                    <div className={styles.axisLegend}>
                      <span className={styles.legendItem}>
                        <span className={styles.legendDot} style={{ background: '#666' }} />
                        {users.user1.name}
                      </span>
                      <span className={styles.legendItem}>
                        <span className={styles.legendDot} style={{ background: axis.color }} />
                        {users.user2.name}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recommendations */}
        <div className={styles.recommendSection}>
          <div className={styles.recommendCard}>
            <h3>おすすめの過ごし方</h3>
            <p>{type.recommendedActivity}</p>
          </div>
          <div className={styles.recommendCard}>
            <h3>避けるべきこと</h3>
            <p>{type.badActivity}</p>
          </div>
        </div>

        {/* Answer Comparison */}
        <div className={styles.comparisonSection}>
          <button 
            className={styles.comparisonToggle}
            onClick={() => setShowComparison(!showComparison)}
          >
            <span>質問ごとの回答比較</span>
            {showComparison ? <ChevronUp /> : <ChevronDown />}
          </button>
          
          {showComparison && (
            <div className={styles.comparisonContent}>
              {['P', 'M', 'G', 'V'].map(axisKey => {
                const axis = AXES[axisKey];
                const axisQuestions = answerComparison.filter(q => q.axis === axisKey);
                
                return (
                  <div key={axisKey} className={styles.comparisonAxis}>
                    <div 
                      className={styles.comparisonAxisHeader}
                      style={{ borderLeftColor: axis.color }}
                    >
                      <span className={styles.comparisonAxisCode}>{axisKey}</span>
                      <span className={styles.comparisonAxisName}>{axis.nameJa}</span>
                      <span className={styles.comparisonAxisRange}>
                        {axis.left.code} ←→ {axis.right.code}
                      </span>
                    </div>
                    <div className={styles.comparisonQuestions}>
                      {axisQuestions.map((q) => (
                        <div key={q.questionId} className={styles.comparisonRow}>
                          <div className={styles.comparisonQ}>{q.code}</div>
                          <div className={styles.comparisonText}>{q.text}</div>
                          <div className={styles.comparisonValues}>
                            <div 
                              className={styles.comparisonValue}
                              style={{ background: '#666' }}
                            >
                              {q.user1.raw}
                            </div>
                            <div 
                                      className={styles.comparisonValue}
                                      style={{ background: axis.color }}
                                    >
                                      {q.user2.raw}
                                    </div>
                                  </div>
                                  <div 
                                    className={styles.comparisonGap}
                                    style={{ 
                                      color: q.gap > 2 ? '#e74c3c' : q.gap > 1 ? '#f1c40f' : '#27ae60'
                                    }}
                                  >
                                    差: {q.gap.toFixed(1)}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

        {/* Actions */}
        <div className={styles.actions}>
          <button onClick={handleShare} className={styles.shareButton}>
            <Share2 className={styles.actionIcon} />
            結果をシェア
          </button>
          <Link href="/" onClick={reset} className={styles.restartButton}>
            <RefreshCw className={styles.actionIcon} />
            もう一度診断する
          </Link>
        </div>
      </div>
    </Layout>
  );
}
