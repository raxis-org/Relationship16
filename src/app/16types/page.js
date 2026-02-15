'use client';

import Link from 'next/link';
import { Crown, Swords, Briefcase, Users, Sparkles, Coffee, Heart, Leaf, Dog, Eye, UserCircle, Anchor, Ghost, ArrowRight, UserX, Bot, ChevronLeft, Grid3X3 } from 'lucide-react';
import Layout from '../../components/Layout';
import { relationTypes } from '../../data/relationTypes';
import styles from './page.module.css';

const iconMap = {
  Crown, Swords, Briefcase, Users, Sparkles, Coffee,
  Heart, Leaf, Dog, Eye, Mask: UserCircle, Anchor,
  UFO: Ghost, ArrowRight, UserX, Bot,
};

const rankGroups = [
  { rank: 'SS', label: 'SSランク', description: '究極の相性' },
  { rank: 'S', label: 'Sランク', description: '最高のパートナー' },
  { rank: 'A', label: 'Aランク', description: '素晴らしい関係' },
  { rank: 'B', label: 'Bランク', description: '安定した関係' },
  { rank: 'C', label: 'Cランク', description: '要注意' },
  { rank: 'D', label: 'Dランク', description: '改善が必要' },
  { rank: 'E', label: 'Eランク', description: '深刻な状況' },
  { rank: 'F', label: 'Fランク', description: '危険水域' },
];

const getRankColor = (rank) => {
  if (rank.startsWith('S')) return '#facc15';
  if (rank.startsWith('A')) return '#22d3ee';
  if (rank.startsWith('B')) return '#4ade80';
  if (rank.startsWith('C')) return '#fb923c';
  if (rank.startsWith('D')) return '#f87171';
  if (rank.startsWith('E')) return '#c084fc';
  return '#6b7280';
};

export default function TypesList() {
  return (
    <Layout>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <Link href="/" className={styles.backLink}>
            <ChevronLeft className={styles.backIcon} />
            戻る
          </Link>
          <h1 className={styles.title}>
            <Grid3X3 className={styles.titleIcon} />
            16タイプ一覧
          </h1>
          <p className={styles.subtitle}>
            4軸スコアリングによって分類される16種類の関係性タイプ
          </p>
        </div>

        {/* Rank Groups */}
        {rankGroups.map((group) => {
          const types = relationTypes.filter(t => 
            group.rank === 'S' 
              ? t.rank.startsWith('S') 
              : t.rank.startsWith(group.rank)
          );
          
          if (types.length === 0) return null;

          return (
            <section key={group.rank} className={styles.rankSection}>
              <div className={styles.rankHeader}>
                <span 
                  className={styles.rankBadge}
                  style={{ color: getRankColor(group.rank), borderColor: getRankColor(group.rank) }}
                >
                  {group.label}
                </span>
                <span className={styles.rankDescription}>{group.description}</span>
              </div>
              
              <div className={styles.typeGrid}>
                {types.map((type) => {
                  const IconComponent = iconMap[type.icon] || Bot;
                  return (
                    <Link
                      key={type.id}
                      href={`/16types/${type.slug}`}
                      className={styles.typeCard}
                    >
                      <div 
                        className={styles.iconWrapper}
                        style={{ background: type.color }}
                      >
                        <IconComponent className={styles.icon} />
                      </div>
                      <div className={styles.typeInfo}>
                        <span 
                          className={styles.typeRank}
                          style={{ color: getRankColor(type.rank) }}
                        >
                          {type.rank}
                        </span>
                        <h3 className={styles.typeName}>{type.name}</h3>
                        <p className={styles.typeDesc}>{type.description.slice(0, 40)}...</p>
                        <div className={styles.syncRate}>
                          シンクロ率: {type.syncRate.min}~{type.syncRate.max}%
                        </div>
                      </div>
                      <div className={styles.arrow}>→</div>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}

        {/* Matrix View Link */}
        <div className={styles.matrixSection}>
          <Link href="/16types/matrix" className={styles.matrixLink}>
            <Grid3X3 className={styles.matrixIcon} />
            マトリックス表示で見る
          </Link>
        </div>
      </div>
    </Layout>
  );
}
