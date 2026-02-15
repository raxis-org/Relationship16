'use client';

import Link from 'next/link';
import { Flame, Swords, Briefcase, Users, Sparkles, Coffee, Heart, Leaf, Ghost, ArrowRight, Zap, Candy, Scale, Mask, Anchor, ChevronLeft, Grid3X3 } from 'lucide-react';
import Layout from '../../components/Layout';
import { relationTypes } from '../../data/relationTypes';
import styles from './page.module.css';

const iconMap = {
  Flame, Swords, Briefcase, Users, Sparkles, Coffee,
  Heart, Leaf, Ghost, ArrowRight, Zap, Candy, Scale, Mask, Anchor,
};

// 4軸の組み合わせでグループ化
const axisGroups = [
  { 
    key: 'hot-equal', 
    label: '熱量：Hot × 重心：Equal', 
    description: '情熱的で対等な関係',
    types: ['HOT-EQUAL-VALUE-SYNC', 'HOT-EQUAL-VALUE-DESYNC', 'HOT-EQUAL-LOOSE-SYNC', 'HOT-EQUAL-LOOSE-DESYNC']
  },
  { 
    key: 'hot-lean', 
    label: '熱量：Hot × 重心：Lean', 
    description: '情熱的で片方がリードする関係',
    types: ['HOT-LEAN-VALUE-SYNC', 'HOT-LEAN-VALUE-DESYNC', 'HOT-LEAN-LOOSE-SYNC', 'HOT-LEAN-LOOSE-DESYNC']
  },
  { 
    key: 'cold-equal', 
    label: '熱量：Cold × 重心：Equal', 
    description: '冷静で対等な関係',
    types: ['COLD-EQUAL-VALUE-SYNC', 'COLD-EQUAL-VALUE-DESYNC', 'COLD-EQUAL-LOOSE-SYNC', 'COLD-EQUAL-LOOSE-DESYNC']
  },
  { 
    key: 'cold-lean', 
    label: '熱量：Cold × 重心：Lean', 
    description: '冷静で片方がリードする関係',
    types: ['COLD-LEAN-VALUE-SYNC', 'COLD-LEAN-VALUE-DESYNC', 'COLD-LEAN-LOOSE-SYNC', 'COLD-LEAN-LOOSE-DESYNC']
  },
];

const getGroupColor = (key) => {
  if (key.startsWith('hot')) return '#f97316';
  return '#3b82f6';
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

        {/* Axis Groups */}
        {axisGroups.map((group) => {
          const types = relationTypes.filter(t => group.types.includes(t.code));
          
          return (
            <section key={group.key} className={styles.rankSection}>
              <div className={styles.rankHeader}>
                <span 
                  className={styles.rankBadge}
                  style={{ color: getGroupColor(group.key), borderColor: getGroupColor(group.key) }}
                >
                  {group.label}
                </span>
                <span className={styles.rankDescription}>{group.description}</span>
              </div>
              
              <div className={styles.typeGrid}>
                {types.map((type) => {
                  const IconComponent = iconMap[type.icon] || Briefcase;
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
                        <code className={styles.typeCode}>{type.code}</code>
                        <h3 className={styles.typeName}>{type.name}</h3>
                        <p className={styles.typeDesc}>{type.tagline}</p>
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
