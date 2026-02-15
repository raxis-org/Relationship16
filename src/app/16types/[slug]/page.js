'use client';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useParams } from 'next/navigation';
import {
  Crown, Swords, Briefcase, Users, Sparkles, Coffee,
  Heart, Leaf, Dog, Eye, UserCircle, Anchor, Ghost, ArrowRight,
  UserX, Bot, ChevronLeft, ChevronRight, Share2, Activity
} from 'lucide-react';
import Layout from '../../../components/Layout';
import { relationTypes } from '../../../data/relationTypes';
import styles from './page.module.css';

const iconMap = {
  Crown, Swords, Briefcase, Users, Sparkles, Coffee,
  Heart, Leaf, Dog, Eye, Mask: UserCircle, Anchor,
  UFO: Ghost, ArrowRight, UserX, Bot,
};

const axisLabels = {
  temperature: { hot: 'Hot（熱い）', cold: 'Cold（冷たい）', neutral: 'Neutral（普通）' },
  balance: { equal: 'Equal（対等）', lean: 'Lean（偏り）', neutral: 'Neutral（普通）' },
  purpose: { value: 'Value（価値重視）', loose: 'Loose（緩やか）', neutral: 'Neutral（普通）' },
  sync: { sync: 'Sync（同期）', desync: 'Desync（非同期）', neutral: 'Neutral（普通）' },
};

const getRankColor = (rank) => {
  if (rank.startsWith('S')) return '#facc15';
  if (rank.startsWith('A')) return '#22d3ee';
  if (rank.startsWith('B')) return '#4ade80';
  if (rank.startsWith('C')) return '#fb923c';
  if (rank.startsWith('D')) return '#f87171';
  if (rank.startsWith('E')) return '#c084fc';
  return '#6b7280';
};

export default function TypeDetail() {
  const params = useParams();
  const { slug } = params;

  const type = relationTypes.find(t => t.slug === slug);
  
  if (!type) {
    notFound();
  }

  const IconComponent = iconMap[type.icon] || Bot;
  const currentIndex = relationTypes.findIndex(t => t.slug === slug);
  const prevType = currentIndex > 0 ? relationTypes[currentIndex - 1] : null;
  const nextType = currentIndex < relationTypes.length - 1 ? relationTypes[currentIndex + 1] : null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('URLをコピーしました！');
  };

  return (
    <Layout>
      <div className={styles.container}>
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb}>
          <Link href="/" className={styles.breadcrumbLink}>ホーム</Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <Link href="/16types" className={styles.breadcrumbLink}>16タイプ</Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbCurrent}>{type.name}</span>
        </nav>

        {/* Main Card */}
        <div className={`glass ${styles.mainCard}`}>
          {/* Rank Badge */}
          <div 
            className={styles.rankBadge}
            style={{ color: getRankColor(type.rank), borderColor: getRankColor(type.rank) }}
          >
            {type.rank}ランク
          </div>

          {/* Icon */}
          <div 
            className={styles.iconWrapper}
            style={{ background: type.color }}
          >
            <IconComponent className={styles.icon} />
          </div>

          {/* Type Name */}
          <h1 className={styles.typeName}>{type.name}</h1>

          {/* Code */}
          <code className={styles.typeCode}>{type.code}</code>

          {/* Description */}
          <p className={styles.description}>{type.description}</p>

          {/* Sync Rate */}
          <div className={styles.syncRate}>
            <Activity className={styles.syncIcon} />
            <span>シンクロ率: <strong>{type.syncRate.min}~{type.syncRate.max}%</strong></span>
          </div>
        </div>

        {/* Details Grid */}
        <div className={styles.detailsGrid}>
          {/* Recommended Activity */}
          <div className={`glass ${styles.detailCard}`}>
            <h2 className={styles.detailTitle}>
              <Sparkles className={styles.detailIcon} />
              おすすめの過ごし方
            </h2>
            <p className={styles.detailContent}>{type.recommendedActivity}</p>
          </div>

          {/* Sarcastic Advice */}
          <div className={`glass ${styles.detailCard}`}>
            <h2 className={styles.detailTitle}>
              <Swords className={styles.detailIconPink} />
              毒舌アドバイス
            </h2>
            <p className={styles.adviceContent}>「{type.sarcasticAdvice}」</p>
          </div>
        </div>

        {/* 4 Axes Analysis */}
        <div className={`glass ${styles.axesCard}`}>
          <h2 className={styles.axesTitle}>4軸分析</h2>
          <div className={styles.axesGrid}>
            <div className={styles.axisItem}>
              <span className={styles.axisEmoji}>🔥</span>
              <span className={styles.axisLabel}>熱量軸</span>
              <span className={styles.axisValue}>
                {axisLabels.temperature[type.axes.temperature] || type.axes.temperature}
              </span>
            </div>
            <div className={styles.axisItem}>
              <span className={styles.axisEmoji}>⚖️</span>
              <span className={styles.axisLabel}>重心軸</span>
              <span className={styles.axisValue}>
                {axisLabels.balance[type.axes.balance] || type.axes.balance}
              </span>
            </div>
            <div className={styles.axisItem}>
              <span className={styles.axisEmoji}>🎯</span>
              <span className={styles.axisLabel}>目的軸</span>
              <span className={styles.axisValue}>
                {axisLabels.purpose[type.axes.purpose] || type.axes.purpose}
              </span>
            </div>
            <div className={styles.axisItem}>
              <span className={styles.axisEmoji}>🔗</span>
              <span className={styles.axisLabel}>同期軸</span>
              <span className={styles.axisValue}>
                {axisLabels.sync[type.axes.sync] || type.axes.sync}
              </span>
            </div>
          </div>
        </div>

        {/* Characteristics */}
        <div className={`glass ${styles.characteristicsCard}`}>
          <h2 className={styles.characteristicsTitle}>このタイプの特徴</h2>
          <ul className={styles.characteristicsList}>
            <li>
              <strong>シンクロ率:</strong> {type.syncRate.min}~{type.syncRate.max}% - 
              {type.syncRate.max >= 80 ? '非常に高い同期' : 
               type.syncRate.max >= 60 ? '高い同期' :
               type.syncRate.max >= 40 ? '中程度の同期' :
               type.syncRate.max >= 20 ? '低い同期' : '非常に低い同期'}
            </li>
            <li>
              <strong>熱量:</strong> {type.axes.temperature === 'hot' ? '感情的・能動的' : 
                           type.axes.temperature === 'cold' ? '冷静・ドライ' : 'バランス型'}
            </li>
            <li>
              <strong>重心:</strong> {type.axes.balance === 'equal' ? '対等な関係' : 
                           type.axes.balance === 'lean' ? 'どちらかに偏りあり' : 'バランス型'}
            </li>
            <li>
              <strong>目的:</strong> {type.axes.purpose === 'value' ? '成長・生産性重視' : 
                           type.axes.purpose === 'loose' ? '心地よさ・惰性重視' : 'バランス型'}
            </li>
            <li>
              <strong>同期:</strong> {type.axes.sync === 'sync' ? '価値観が一致' : 
                           type.axes.sync === 'desync' ? '価値観が異なる' : 'バランス型'}
            </li>
          </ul>
        </div>

        {/* Navigation */}
        <div className={styles.navigation}>
          {prevType ? (
            <Link href={`/16types/${prevType.slug}`} className={styles.navButton}>
              <ChevronLeft className={styles.navIcon} />
              <div className={styles.navContent}>
                <span className={styles.navLabel}>前のタイプ</span>
                <span className={styles.navName}>{prevType.name}</span>
              </div>
            </Link>
          ) : (
            <div className={styles.navButtonDisabled}>
              <ChevronLeft className={styles.navIcon} />
              <span>最初のタイプ</span>
            </div>
          )}

          <button onClick={handleShare} className={styles.shareButton}>
            <Share2 className={styles.shareIcon} />
            共有
          </button>

          {nextType ? (
            <Link href={`/16types/${nextType.slug}`} className={`${styles.navButton} ${styles.navButtonNext}`}>
              <div className={`${styles.navContent} ${styles.navContentNext}`}>
                <span className={styles.navLabel}>次のタイプ</span>
                <span className={styles.navName}>{nextType.name}</span>
              </div>
              <ChevronRight className={styles.navIcon} />
            </Link>
          ) : (
            <div className={`${styles.navButtonDisabled} ${styles.navButtonNext}`}>
              <span>最後のタイプ</span>
              <ChevronRight className={styles.navIcon} />
            </div>
          )}
        </div>

        {/* CTA */}
        <div className={styles.cta}>
          <Link href="/diagnose" className={styles.ctaButton}>
            この診断を受ける →
          </Link>
        </div>
      </div>
    </Layout>
  );
}
