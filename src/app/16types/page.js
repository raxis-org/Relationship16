'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, Grid3X3 } from 'lucide-react';
import Layout from '../../components/Layout';
import { relationTypes, getTypeAssetPath } from '../../data/relationTypes';
import styles from './page.module.css';

// 4軸の組み合わせでグループ化
// 4軸（P, M, G, V）でグループ化
const axisGroups = [
  { 
    key: 'E-B', 
    label: '対等 × 存在的', 
    description: '対等な立場で相手の存在を大切にする関係',
    filter: (t) => t.code.startsWith('EB')
  },
  { 
    key: 'E-I', 
    label: '対等 × 手段的', 
    description: '対等な立場で目的を重視する関係',
    filter: (t) => t.code.startsWith('EI')
  },
  { 
    key: 'H-B', 
    label: '階層的 × 存在的', 
    description: '上下関係で相手の存在を大切にする関係',
    filter: (t) => t.code.startsWith('HB')
  },
  { 
    key: 'H-I', 
    label: '階層的 × 手段的', 
    description: '上下関係で目的を重視する関係',
    filter: (t) => t.code.startsWith('HI')
  },
];

const getGroupColor = (key) => {
  if (key.startsWith('E')) return '#3498db';
  return '#9b59b6';
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
          const types = relationTypes.filter(group.filter);
          
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
                  const iconPath = getTypeAssetPath(type.code);
                  return (
                    <Link
                      key={type.code}
                      href={`/16types/${type.code}`}
                      className={styles.typeCard}
                    >
                      <div className={styles.iconWrapper}>
                        <Image
                          src={iconPath}
                          alt={type.name}
                          width={56}
                          height={56}
                          className={styles.typeIcon}
                        />
                      </div>
                      <div className={styles.typeInfo}>
                        <span className={styles.typeRank} style={{ color: type.rankColor }}>
                          {type.rank}ランク
                        </span>
                        <h3 className={styles.typeName}>{type.name}</h3>
                        <p className={styles.typeNameEn}>{type.nameEn}</p>
                      </div>
                      <div className={styles.arrow}>→</div>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}


      </div>
    </Layout>
  );
}
