'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  RefreshCw, 
  Share2, 
  ChevronDown, 
  ChevronUp,
  Heart,
  Users,
  Zap,
  Shield,
  Lightbulb,
  MessageCircle,
  TrendingUp,
  Award
} from 'lucide-react';
import Layout from '../../components/Layout';
import { useDiagnose } from '../../context/DiagnoseContext';
import { AXES } from '../../data/questions';
import { getTypeAssetPath } from '../../data/relationTypes';
import styles from './page.module.css';

export default function Result() {
  const router = useRouter();
  const { result, reset, user1Name, user2Name } = useDiagnose();
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    if (!result) {
      router.push('/diagnose');
    }
  }, [result, router]);

  if (!result) return null;

  const { type, syncRate, details } = result;

  // タイプアイコンのパスを生成
  const typeIconPath = getTypeAssetPath(type.code);

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert('結果のURLをコピーしました！');
    });
  };

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  // スコアを0-100%に変換
  const normalizeScore = (score) => Math.min(100, Math.max(0, ((score - 1) / 4) * 100));

  const axisData = [
    { key: 'P', ...AXES.P },
    { key: 'M', ...AXES.M },
    { key: 'G', ...AXES.G },
    { key: 'V', ...AXES.V },
  ];

  return (
    <Layout>
      <div className={styles.container}>
        {/* Hero Section */}
        <section className={styles.hero} style={{ background: type.gradient }}>
          <div className={styles.heroContent}>
            <div className={styles.typeBadge}>{type.code}</div>
            <h1 className={styles.typeName}>{type.name}</h1>
            <p className={styles.typeNameEn}>{type.nameEn}</p>
            <div className={styles.partners}>
              <span>{user1Name}</span>
              <Heart className={styles.heartIcon} />
              <span>{user2Name}</span>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.typeIconContainer}>
              <Image 
                src={typeIconPath}
                alt={type.name}
                width={200}
                height={200}
                className={styles.typeIcon}
              />
            </div>
          </div>
        </section>

        {/* Main Description */}
        <section className={styles.mainDescription}>
          <div className={styles.rankBadge} style={{ background: type.rankColor }}>
            <Award size={16} />
            {type.rank}ランク
          </div>
          <div className={styles.descriptionText}>
            {type.description.split('\n\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </section>

        {/* Scores Overview */}
        <section className={styles.scoresSection}>
          <h2 className={styles.sectionTitle}>
            <Zap size={24} />
            関係性スコア
          </h2>
          <div className={styles.scoresGrid}>
            <div className={styles.scoreCard}>
              <div className={styles.scoreValue} style={{ color: '#9b59b6' }}>
                {syncRate}%
              </div>
              <div className={styles.scoreLabel}>シンクロ率</div>
              <div className={styles.scoreBar}>
                <div 
                  className={styles.scoreFill} 
                  style={{ width: `${syncRate}%`, background: '#9b59b6' }}
                />
              </div>
            </div>
            {details.axisDetails && Object.entries(details.axisDetails).map(([key, detail]) => (
              <div key={key} className={styles.scoreCard}>
                <div className={styles.scoreValue} style={{ color: axisData.find(a => a.key === key)?.color }}>
                  {detail.label}
                </div>
                <div className={styles.scoreLabel}>{AXES[key].nameJa}</div>
                <div className={styles.scoreDesc}>{detail.description}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 4 Axis Detail */}
        <section className={styles.axisSection}>
          <h2 className={styles.sectionTitle}>
            <TrendingUp size={24} />
            4軸の詳細分析
          </h2>
          <div className={styles.axisGrid}>
            {axisData.map((axis) => {
              const detail = details.axisDetails?.[axis.key];
              if (!detail) return null;
              
              const score = normalizeScore(detail.score);
              
              return (
                <div key={axis.key} className={styles.axisCard}>
                  <div className={styles.axisHeader}>
                    <span className={styles.axisCode} style={{ color: axis.color }}>
                      {axis.key}
                    </span>
                    <span className={styles.axisName}>{axis.nameJa}</span>
                    <span className={styles.axisResult}>
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
                          left: `${normalizeScore(detail.user1)}%`,
                          background: '#666',
                        }}
                        title={`${user1Name}: ${detail.user1.toFixed(1)}`}
                      />
                      <div 
                        className={styles.axisMarker}
                        style={{ 
                          left: `${normalizeScore(detail.user2)}%`,
                          background: axis.color,
                        }}
                        title={`${user2Name}: ${detail.user2.toFixed(1)}`}
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
                        {user1Name}
                      </span>
                      <span className={styles.legendItem}>
                        <span className={styles.legendDot} style={{ background: axis.color }} />
                        {user2Name}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Characteristics */}
        {type.characteristics && (
          <section className={styles.characteristicsSection}>
            <h2 className={styles.sectionTitle}>
              <Lightbulb size={24} />
              この関係性の特徴
            </h2>
            <div className={styles.characteristicsGrid}>
              {type.characteristics.map((char, idx) => (
                <div key={idx} className={styles.characteristicCard}>
                  <h3>{char.title}</h3>
                  <p>{char.content}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Strengths & Weaknesses */}
        <section className={styles.swSection}>
          <div className={styles.swGrid}>
            <div className={styles.swCard}>
              <h3 className={styles.swTitle} style={{ color: '#27ae60' }}>
                <TrendingUp size={20} />
                強み
              </h3>
              <ul className={styles.swList}>
                {type.strengths?.map((strength, idx) => (
                  <li key={idx}>{strength}</li>
                ))}
              </ul>
            </div>
            <div className={styles.swCard}>
              <h3 className={styles.swTitle} style={{ color: '#e74c3c' }}>
                <Shield size={20} />
                注意点
              </h3>
              <ul className={styles.swList}>
                {type.weaknesses?.map((weakness, idx) => (
                  <li key={idx}>{weakness}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Daily Scenes */}
        {type.dailyScenes && (
          <section className={styles.dailySection}>
            <h2 className={styles.sectionTitle}>
              <Heart size={24} />
              二人の日常の風景
            </h2>
            <div className={styles.dailyGrid}>
              {type.dailyScenes.map((scene, idx) => (
                <div key={idx} className={styles.dailyCard}>
                  <span className={styles.dailyNumber}>{idx + 1}</span>
                  <p>{scene}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Recommendations */}
        <section className={styles.recommendSection}>
          <div className={styles.recommendCard} style={{ borderLeftColor: '#27ae60' }}>
            <h3>
              <Zap size={20} />
              おすすめの過ごし方
            </h3>
            <p>{type.recommendedActivity}</p>
          </div>
          <div className={styles.recommendCard} style={{ borderLeftColor: '#e74c3c' }}>
            <h3>
              <Shield size={20} />
              避けるべきこと
            </h3>
            <p>{type.badActivity}</p>
          </div>
        </section>

        {/* Communication Tips */}
        {type.communicationTips && (
          <section className={styles.tipsSection}>
            <h2 className={styles.sectionTitle}>
              <MessageCircle size={24} />
              コミュニケーションのアドバイス
            </h2>
            <div className={styles.tipsCard}>
              <p>{type.communicationTips}</p>
            </div>
          </section>
        )}

        {/* Growth Challenges */}
        {type.growthChallenges && (
          <section className={styles.growthSection}>
            <h2 className={styles.sectionTitle}>
              <TrendingUp size={24} />
              成長のための課題
            </h2>
            <div className={styles.growthCard}>
              <p>{type.growthChallenges}</p>
            </div>
          </section>
        )}

        {/* Famous Pairs */}
        {type.famousPairs && type.famousPairs.length > 0 && (
          <section className={styles.famousSection}>
            <h2 className={styles.sectionTitle}>
              <Users size={24} />
              参考にできるペア
            </h2>
            <div className={styles.famousGrid}>
              {type.famousPairs.map((pair, idx) => (
                <div key={idx} className={styles.famousCard}>
                  <h4>{pair.name}</h4>
                  <p>{pair.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Comparison Toggle */}
        <section className={styles.comparisonSection}>
          <button 
            className={styles.comparisonToggle}
            onClick={() => toggleSection('comparison')}
          >
            <span>質問ごとの回答比較を見る</span>
            {activeSection === 'comparison' ? <ChevronUp /> : <ChevronDown />}
          </button>
          
          {activeSection === 'comparison' && result.answerComparison && (
            <div className={styles.comparisonContent}>
              {['P', 'M', 'G', 'V'].map(axisKey => {
                const axis = AXES[axisKey];
                const axisQuestions = result.answerComparison.filter(q => q.axis === axisKey);
                
                return (
                  <div key={axisKey} className={styles.comparisonAxis}>
                    <div 
                      className={styles.comparisonAxisHeader}
                      style={{ borderLeftColor: axis.color }}
                    >
                      <span className={styles.comparisonAxisCode}>{axisKey}</span>
                      <span className={styles.comparisonAxisName}>{axis.nameJa}</span>
                    </div>
                    <div className={styles.comparisonQuestions}>
                      {axisQuestions.map((q) => (
                        <div key={q.questionId} className={styles.comparisonRow}>
                          <div className={styles.comparisonQ}>{q.code}</div>
                          <div className={styles.comparisonText}>{q.text}</div>
                          <div className={styles.comparisonValues}>
                            <div className={styles.comparisonUser}>
                              <span className={styles.userLabel}>{user1Name}</span>
                              <span 
                                className={styles.valueBadge}
                                style={{ background: '#666' }}
                              >
                                {q.user1.raw}
                              </span>
                            </div>
                            <div className={styles.comparisonUser}>
                              <span className={styles.userLabel}>{user2Name}</span>
                              <span 
                                className={styles.valueBadge}
                                style={{ background: axis.color }}
                              >
                                {q.user2.raw}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Actions */}
        <section className={styles.actions}>
          <button onClick={handleShare} className={styles.shareButton}>
            <Share2 size={18} />
            結果をシェア
          </button>
          <Link href="/" onClick={reset} className={styles.restartButton}>
            <RefreshCw size={18} />
            もう一度診断する
          </Link>
        </section>
      </div>
    </Layout>
  );
}
