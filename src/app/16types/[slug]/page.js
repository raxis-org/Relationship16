'use client';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useParams } from 'next/navigation';
import {
  Flame, Swords, Briefcase, Users, Sparkles, Coffee,
  Heart, Leaf, Ghost, ArrowRight, Zap, Candy, Scale,
  Mask, Anchor, ChevronLeft, ChevronRight, Share2, Activity
} from 'lucide-react';
import Layout from '../../../components/Layout';
import { relationTypes } from '../../../data/relationTypes';
import styles from './page.module.css';

const iconMap = {
  Flame, Swords, Briefcase, Users, Sparkles, Coffee,
  Heart, Leaf, Ghost, ArrowRight, Zap, Candy, Scale, Mask, Anchor,
};

const axisLabels = {
  temperature: { hot: 'Hot（熱い）', cold: 'Cold（冷たい）' },
  balance: { equal: 'Equal（対等）', lean: 'Lean（偏り）' },
  purpose: { value: 'Value（価値重視）', loose: 'Loose（緩やか）' },
  sync: { sync: 'Sync（同期）', desync: 'Desync（非同期）' },
};

export default function TypeDetail() {
  const params = useParams();
  const { slug } = params;

  const type = relationTypes.find(t => t.slug === slug);
  
  if (!type) {
    notFound();
  }

  const IconComponent = iconMap[type.icon] || Briefcase;
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
          {/* Type Code Badge */}
          <code className={styles.typeCodeBadge}>{type.code}</code>

          {/* Icon */}
          <div 
            className={styles.iconWrapper}
            style={{ background: type.color }}
          >
            <IconComponent className={styles.icon} />
          </div>

          {/* Type Name */}
          <h1 className={styles.typeName}>{type.name}</h1>

          {/* Tagline */}
          <p className={styles.tagline}>{type.tagline}</p>

          {/* Description */}
          <p className={styles.description}>{type.description}</p>
        </div>

        {/* Details Grid */}
        <div className={styles.detailsGrid}>
          {/* Strengths */}
          <div className={`glass ${styles.detailCard}`}>
            <h2 className={styles.detailTitle}>
              <Sparkles className={styles.detailIcon} />
              強み
            </h2>
            <ul className={styles.detailList}>
              {type.strengths.map((strength, idx) => (
                <li key={idx}>{strength}</li>
              ))}
            </ul>
          </div>

          {/* Weaknesses */}
          <div className={`glass ${styles.detailCard}`}>
            <h2 className={styles.detailTitle}>
              <Activity className={styles.detailIconPink} />
              弱点
            </h2>
            <ul className={styles.detailList}>
              {type.weaknesses.map((weakness, idx) => (
                <li key={idx}>{weakness}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Advice & Activity */}
        <div className={styles.detailsGrid}>
          {/* Advice */}
          <div className={`glass ${styles.detailCard}`}>
            <h2 className={styles.detailTitle}>
              <Swords className={styles.detailIconOrange} />
              アドバイス
            </h2>
            <p className={styles.detailContent}>{type.advice}</p>
          </div>

          {/* Activity */}
          <div className={`glass ${styles.detailCard}`}>
            <h2 className={styles.detailTitle}>
              <Coffee className={styles.detailIconBlue} />
              おすすめの過ごし方
            </h2>
            <p className={styles.detailContent}>{type.activity}</p>
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
          <h2 className={styles.characteristicsTitle}>このタイプの4軸属性</h2>
          <ul className={styles.characteristicsList}>
            <li>
              <strong>熱量軸:</strong> {type.axes.temperature === 'hot' ? 'Hot（感情的・能動的）' : 'Cold（冷静・ドライ）'}
            </li>
            <li>
              <strong>重心軸:</strong> {type.axes.balance === 'equal' ? 'Equal（対等な関係）' : 'Lean（どちらかに偏りあり）'}
            </li>
            <li>
              <strong>目的軸:</strong> {type.axes.purpose === 'value' ? 'Value（成長・生産性重視）' : 'Loose（心地よさ・安定重視）'}
            </li>
            <li>
              <strong>同期軸:</strong> {type.axes.sync === 'sync' ? 'Sync（価値観が一致）' : 'Desync（価値観が異なる）'}
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
