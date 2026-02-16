'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { RefreshCw, Share2, ChevronLeft, Users, Target, Heart, Zap } from 'lucide-react';
import Layout from '../../components/Layout';
import { getSession } from '../../lib/db';
import { diagnose } from '../../logic/diagnostic';
import { getTypeAssetPath, getTypeByCode, RELATION_TYPES } from '../../data/relationTypes';
import { QUESTIONS, AXES, getQuestionsByAxis } from '../../data/questions';
import styles from './page.module.css';

// 4軸の情報
const AXIS_INFO = {
  P: {
    name: '権力均衡',
    nameEn: 'Power',
    left: { label: '階層的', color: '#e74c3c', icon: '↓' },
    right: { label: '対等的', color: '#3498db', icon: '↔' },
  },
  M: {
    name: '関与動機',
    nameEn: 'Motive',
    left: { label: '手段的', color: '#95a5a6', icon: '⚙' },
    right: { label: '存在的', color: '#e91e63', icon: '♥' },
  },
  G: {
    name: '目的整合',
    nameEn: 'Goal',
    left: { label: '自律的', color: '#f39c12', icon: '○' },
    right: { label: '共鳴的', color: '#27ae60', icon: '◎' },
  },
  V: {
    name: '価値共感',
    nameEn: 'Value',
    left: { label: '多様的', color: '#9b59b6', icon: '◇' },
    right: { label: '一致的', color: '#00bcd4', icon: '◆' },
  },
};

// スコアを百分率に変換（-3〜+3 を 0〜100% に）
function scoreToPercent(score) {
  return Math.round(((score + 3) / 6) * 100);
}

// バーの位置を計算（-3〜+3 を 0〜100% に）
function scoreToBarPosition(score) {
  return Math.min(100, Math.max(0, ((score + 3) / 6) * 100));
}

// 回答オプションのラベル
const ANSWER_LABELS = {
  1: { label: 'いいえ', color: '#ef4444' },
  2: { label: 'ややいいえ', color: '#f97316' },
  3: { label: 'どちらとも', color: '#94a3b8' },
  4: { label: 'ややはい', color: '#22c55e' },
  5: { label: 'はい', color: '#10b981' },
};

function ResultContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sid = searchParams.get('sid');
  
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!sid) {
      router.push('/');
      return;
    }

    loadResult();
  }, [sid, router]);

  const loadResult = async () => {
    try {
      const session = await getSession(sid);
      
      if (!session.completed) {
        setError('相手の回答がまだ完了していません');
        setLoading(false);
        return;
      }

      const diagnosis = diagnose(
        session.host_answers,
        session.guest_answers,
        session.host_name,
        session.guest_name
      );

      setResult({
        type: diagnosis.type,
        typeCode: diagnosis.typeCode,
        syncRate: diagnosis.syncRate,
        divergence: diagnosis.divergence,
        hostName: session.host_name,
        guestName: session.guest_name,
        hostAnswers: session.host_answers,
        guestAnswers: session.guest_answers,
        hostScores: diagnosis.user1.scores,
        guestScores: diagnosis.user2.scores,
        details: diagnosis.details,
      });
    } catch (err) {
      console.error(err);
      setError('データの読み込みに失敗しました');
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert('結果のURLをコピーしました！');
    });
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>診断結果を読み込み中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.errorCard}>
          <h1>{error}</h1>
          <Link href="/" className={styles.backButton}>
            トップに戻る
          </Link>
        </div>
      </div>
    );
  }

  const relationType = getTypeByCode(result.typeCode);
  const iconPath = getTypeAssetPath(result.typeCode);
  
  // 4軸のスコア（平均）
  const axisScores = {
    P: (result.hostScores.P + result.guestScores.P) / 2,
    M: (result.hostScores.M + result.guestScores.M) / 2,
    G: (result.hostScores.G + result.guestScores.G) / 2,
    V: (result.hostScores.V + result.guestScores.V) / 2,
  };

  return (
    <div className={styles.container}>
      {/* Back Link */}
      <Link href="/" className={styles.backLink}>
        <ChevronLeft size={18} />
        トップに戻る
      </Link>

      {/* Hero Section */}
      <section className={styles.hero} style={{ background: relationType?.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <div className={styles.heroContent}>
          <div className={styles.partners}>
            <span>{result.hostName}</span>
            <span className={styles.multiply}>×</span>
            <span>{result.guestName}</span>
          </div>
          <div className={styles.typeBadge}>{result.typeCode}</div>
          <h1 className={styles.typeName}>{relationType?.name || '未知のタイプ'}</h1>
          <p className={styles.typeNameEn}>{relationType?.nameEn || 'Unknown Type'}</p>
          <div className={styles.rankBadge} style={{ background: relationType?.rankColor }}>
            {relationType?.rank}ランク
          </div>
        </div>
        <div className={styles.heroImage}>
          <Image 
            src={iconPath}
            alt={relationType?.name || 'タイプアイコン'}
            width={240}
            height={240}
            className={styles.typeIcon}
            priority
          />
        </div>
      </section>

      {/* Sync Rate Section */}
      <section className={styles.syncSection}>
        <div className={styles.syncHeader}>
          <Zap className={styles.syncIcon} />
          <h2>シンクロ率</h2>
        </div>
        <div className={styles.syncValueWrapper}>
          <div className={styles.syncRateValue} style={{ 
            color: result.syncRate >= 70 ? '#27ae60' : result.syncRate >= 50 ? '#f39c12' : '#e74c3c'
          }}>
            {result.syncRate}%
          </div>
          <div className={styles.syncBarBg}>
            <div 
              className={styles.syncBar} 
              style={{ 
                width: `${result.syncRate}%`,
                background: result.syncRate >= 70 ? '#27ae60' : result.syncRate >= 50 ? '#f39c12' : '#e74c3c'
              }}
            />
          </div>
        </div>
        <p className={styles.syncDescription}>
          {result.syncRate >= 80 ? '二人の感覚は驚くほど似ています。高い共感と理解が得られる関係です。' :
           result.syncRate >= 60 ? 'おおむね共通する感覚を持っています。良好な関係性を築けそうです。' :
           result.syncRate >= 40 ? '部分的に共通点がありますが、異なる部分も認め合う必要があります。' :
           '二人の感じ方や考え方に違いがあります。互いの違いを理解することが課題です。'}
        </p>
      </section>

      {/* 4軸分析 */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <Target className={styles.sectionIcon} />
          <h2 className={styles.sectionTitle}>4軸分析</h2>
        </div>
        <p className={styles.sectionDesc}>二人の関係性を4つの軸から分析しました</p>
        
        <div className={styles.axesGrid}>
          {Object.entries(AXIS_INFO).map(([axisKey, axisInfo]) => {
            const score = axisScores[axisKey];
            const barPosition = scoreToBarPosition(score);
            const isRight = score >= 0;
            
            return (
              <div key={axisKey} className={styles.axisCard}>
                <div className={styles.axisHeader}>
                  <span className={styles.axisName}>{axisInfo.name}</span>
                  <span className={styles.axisValue} style={{ color: isRight ? axisInfo.right.color : axisInfo.left.color }}>
                    {isRight ? axisInfo.right.label : axisInfo.left.label}
                  </span>
                </div>
                <div className={styles.axisBarContainer}>
                  <div className={styles.axisLabels}>
                    <span>{axisInfo.left.label}</span>
                    <span>{axisInfo.right.label}</span>
                  </div>
                  <div className={styles.axisBarBg}>
                    <div className={styles.axisBarCenter} />
                    <div 
                      className={styles.axisBarIndicator}
                      style={{ left: `${barPosition}%`, background: isRight ? axisInfo.right.color : axisInfo.left.color }}
                    />
                  </div>
                </div>
                <p className={styles.axisDesc}>
                  {axisKey === 'P' && (isRight ? '対等な立場で意見を尊重し合っています' : 'どちらかがリードし、もう一方が従う構図です')}
                  {axisKey === 'M' && (isRight ? '相手の存在そのものを大切にする深い絆があります' : '目的や利害関係をベースにした実利的な関係です')}
                  {axisKey === 'G' && (isRight ? '二人で同じ目標やビジョンを追い求めています' : 'それぞれが独立した目標を持つ関係です')}
                  {axisKey === 'V' && (isRight ? '似た価値観や考え方を持ち、気が合います' : '異なる価値観を持ち、それを尊重し合っています')}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 回答比較 */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <Users className={styles.sectionIcon} />
          <h2 className={styles.sectionTitle}>回答の比較</h2>
        </div>
        <p className={styles.sectionDesc}>32問の設問に対する二人の回答の違い</p>
        
        <div className={styles.questionsContainer}>
          {Object.entries(AXES).map(([axisKey, axisData]) => (
            <div key={axisKey} className={styles.axisQuestions}>
              <h3 className={styles.axisQuestionsTitle} style={{ color: axisData.color }}>
                {axisData.nameJa} ({axisData.code}軸)
              </h3>
              <div className={styles.questionsList}>
                {getQuestionsByAxis(axisKey).map((q, idx) => {
                  const hostAnswer = result.hostAnswers[q.id];
                  const guestAnswer = result.guestAnswers[q.id];
                  const diff = Math.abs(hostAnswer - guestAnswer);
                  const hostLabel = ANSWER_LABELS[hostAnswer];
                  const guestLabel = ANSWER_LABELS[guestAnswer];
                  
                  return (
                    <div key={q.id} className={styles.questionItem}>
                      <div className={styles.questionText}>
                        <span className={styles.questionNum}>{idx + 1}</span>
                        {q.text}
                      </div>
                      <div className={styles.answersRow}>
                        <div className={styles.answerBlock}>
                          <span className={styles.answerName}>{result.hostName}</span>
                          <span 
                            className={styles.answerBadge}
                            style={{ background: hostLabel?.color + '20', color: hostLabel?.color }}
                          >
                            {hostLabel?.label}
                          </span>
                        </div>
                        <div className={styles.answerDiff}>
                          {diff === 0 ? (
                            <span className={styles.matchBadge}>一致</span>
                          ) : (
                            <span className={styles.diffBadge}>±{diff}</span>
                          )}
                        </div>
                        <div className={styles.answerBlock}>
                          <span className={styles.answerName}>{result.guestName}</span>
                          <span 
                            className={styles.answerBadge}
                            style={{ background: guestLabel?.color + '20', color: guestLabel?.color }}
                          >
                            {guestLabel?.label}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 関係性の詳細 */}
      {relationType && (
        <>
          {/* 概要 */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <Heart className={styles.sectionIcon} />
              <h2 className={styles.sectionTitle}>関係性の概要</h2>
            </div>
            <div className={styles.descriptionCard}>
              {relationType.description.split('\n\n').map((para, idx) => (
                <p key={idx} className={styles.descriptionPara}>{para}</p>
              ))}
            </div>
          </section>

          {/* 特徴 */}
          {relationType.characteristics && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>特徴</h2>
              <div className={styles.characteristicsGrid}>
                {relationType.characteristics.map((char, idx) => (
                  <div key={idx} className={styles.characteristicCard}>
                    <h3>{char.title}</h3>
                    <p>{char.content}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 強みと注意点 */}
          <section className={styles.section}>
            <div className={styles.swGrid}>
              <div className={styles.swCard}>
                <h3 className={styles.swTitle} style={{ color: '#27ae60' }}>強み</h3>
                <ul className={styles.swList}>
                  {relationType.strengths?.map((s, idx) => <li key={idx}>{s}</li>)}
                </ul>
              </div>
              <div className={styles.swCard}>
                <h3 className={styles.swTitle} style={{ color: '#e74c3c' }}>注意点</h3>
                <ul className={styles.swList}>
                  {relationType.weaknesses?.map((w, idx) => <li key={idx}>{w}</li>)}
                </ul>
              </div>
            </div>
          </section>

          {/* おすすめの過ごし方 */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>おすすめの過ごし方</h2>
            <div className={styles.recommendCard}>
              <p>{relationType.recommendedActivity}</p>
            </div>
            <h2 className={styles.sectionTitle} style={{ marginTop: '32px' }}>避けるべきこと</h2>
            <div className={styles.recommendCard} style={{ borderLeftColor: '#e74c3c' }}>
              <p>{relationType.badActivity}</p>
            </div>
          </section>

          {/* コミュニケーションのコツ */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>コミュニケーションのコツ</h2>
            <div className={styles.recommendCard}>
              <p>{relationType.communicationTips}</p>
            </div>
          </section>

          {/* 成長のための課題 */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>成長のための課題</h2>
            <div className={styles.recommendCard}>
              <p>{relationType.growthChallenges}</p>
            </div>
          </section>
        </>
      )}

      {/* Actions */}
      <div className={styles.actions}>
        <button onClick={handleShare} className={styles.shareButton}>
          <Share2 className={styles.actionIcon} />
          結果をシェア
        </button>
        <Link href="/" className={styles.restartButton}>
          <RefreshCw className={styles.actionIcon} />
          もう一度診断する
        </Link>
      </div>
    </div>
  );
}

export default function Result() {
  return (
    <Layout>
      <Suspense fallback={<div className={styles.container}><div className={styles.loading}>読み込み中...</div></div>}>
        <ResultContent />
      </Suspense>
    </Layout>
  );
}
