'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, Grid3X3, ArrowRight, Flame, Scale, Target, Heart } from 'lucide-react';
import Layout from '../../components/Layout';
import { relationTypes } from '../../data/relationTypes';
import styles from './page.module.css';

// 4軸の説明
const AXES_INFO = [
  { 
    letter: 'P', 
    name: 'Passion', 
    left: 'Hot(H)', 
    right: 'Cool(C)', 
    desc: '感情の温度',
    icon: Flame,
    leftColor: '#ff6b6b',
    rightColor: '#54a0ff'
  },
  { 
    letter: 'M', 
    name: 'Motive', 
    left: 'Equal(E)', 
    right: 'Lean(L)', 
    desc: '関与の動機',
    icon: Scale,
    leftColor: '#feca57',
    rightColor: '#a29bfe'
  },
  { 
    letter: 'G', 
    name: 'Goal', 
    left: 'Value(V)', 
    right: 'Loose(L)', 
    desc: '目的の整合性',
    icon: Target,
    leftColor: '#1dd1a1',
    rightColor: '#fd79a8'
  },
  { 
    letter: 'V', 
    name: 'Value', 
    left: 'Sync(S)', 
    right: 'Desync(D)', 
    desc: '価値観の共鳴',
    icon: Heart,
    leftColor: '#00b894',
    rightColor: '#e17055'
  },
];

// 4つのグループに分類
const TYPE_GROUPS = [
  {
    key: 'cool',
    title: 'Cool系',
    subtitle: '冷静で落ち着いた関係',
    color: '#54a0ff',
    types: ['CEVS', 'CEVD', 'CELS', 'CELD', 'CLVS', 'CLVD', 'CLLS', 'CLLD']
  },
  {
    key: 'hot',
    title: 'Hot系',
    subtitle: '情熱的な関係',
    color: '#ff6b6b',
    types: ['HEVS', 'HEVD', 'HELS', 'HELD', 'HLVS', 'HLVD', 'HLLS', 'HLLD']
  }
];

export default function TypesList() {
  const getTypeInfo = (code) => relationTypes.find(t => t.code === code);

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

        {/* 4軸の説明 - 改善版 */}
        <section className={styles.axesSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>4つの評価軸</h2>
            <p className={styles.sectionSubtitle}>あなたの関係性を形作る4つの要素</p>
          </div>
          
          <div className={styles.axesGrid}>
            {AXES_INFO.map((axis) => {
              const Icon = axis.icon;
              return (
                <div key={axis.letter} className={styles.axisCard}>
                  <div className={styles.axisHeader}>
                    <div className={styles.axisIconWrapper}>
                      <Icon className={styles.axisIcon} />
                    </div>
                    <div className={styles.axisTitle}>
                      <span className={styles.axisLetter}>{axis.letter}</span>
                      <span className={styles.axisName}>{axis.name}</span>
                    </div>
                  </div>
                  <p className={styles.axisDesc}>{axis.desc}</p>
                  <div className={styles.axisRange}>
                    <span className={styles.axisEnd} style={{ color: axis.leftColor }}>
                      {axis.left}
                    </span>
                    <div className={styles.axisLine}>
                      <div className={styles.axisLineGradient} 
                        style={{ 
                          background: `linear-gradient(90deg, ${axis.leftColor}, ${axis.rightColor})` 
                        }} 
                      />
                    </div>
                    <span className={styles.axisEnd} style={{ color: axis.rightColor }}>
                      {axis.right}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* タイプコードの説明 */}
        <section className={styles.codeSection}>
          <div className={styles.codeCard}>
            <h3 className={styles.codeTitle}>タイプコードの読み方</h3>
            <p className={styles.codeDesc}>
              4文字のコードで表されます
            </p>
            <div className={styles.codeExample}>
              <div className={styles.codeBreakdown}>
                <div className={styles.codeItem}>
                  <span className={styles.codePart} style={{ background: '#ff6b6b' }}>C</span>
                  <span className={styles.codeLabel}>Cool</span>
                </div>
                <div className={styles.codeItem}>
                  <span className={styles.codePart} style={{ background: '#feca57' }}>E</span>
                  <span className={styles.codeLabel}>Equal</span>
                </div>
                <div className={styles.codeItem}>
                  <span className={styles.codePart} style={{ background: '#1dd1a1' }}>V</span>
                  <span className={styles.codeLabel}>Value</span>
                </div>
                <div className={styles.codeItem}>
                  <span className={styles.codePart} style={{ background: '#54a0ff' }}>S</span>
                  <span className={styles.codeLabel}>Sync</span>
                </div>
              </div>
              <div className={styles.codeArrow}>→</div>
              <div className={styles.codeResult}>
                <span className={styles.codeResultName}>運命の双子</span>
                <span className={styles.codeResultDesc}>冷静で対等、価値を共有し、価値観が一致する関係</span>
              </div>
            </div>
          </div>
        </section>

        {/* タイプ一覧 */}
        {TYPE_GROUPS.map((group) => (
          <section key={group.key} className={styles.groupSection}>
            <div className={styles.groupHeader}>
              <div 
                className={styles.groupIndicator}
                style={{ background: group.color }}
              />
              <div className={styles.groupTitleArea}>
                <h2 className={styles.groupTitle}>{group.title}</h2>
                <p className={styles.groupSubtitle}>{group.subtitle}</p>
              </div>
            </div>
            
            <div className={styles.typeGrid}>
              {group.types.map((code) => {
                const type = getTypeInfo(code);
                if (!type) return null;
                return (
                  <Link
                    key={code}
                    href={`/16types/${code}`}
                    className={styles.typeCard}
                  >
                    <div className={styles.typeImageWrapper}>
                      <Image
                        src={`/assets/${code}.png`}
                        alt={type.name}
                        width={100}
                        height={100}
                        className={styles.typeImage}
                      />
                    </div>
                    <div className={styles.typeInfo}>
                      <code className={styles.typeCode}>{code}</code>
                      <h3 className={styles.typeName}>{type.name}</h3>
                      <p className={styles.typeNameEn}>{type.nameEn}</p>
                    </div>
                    <ArrowRight className={styles.arrow} size={20} />
                  </Link>
                );
              })}
            </div>
          </section>
        ))}

        {/* CTA */}
        <section className={styles.ctaSection}>
          <Link href="/diagnose" className={styles.ctaButton}>
            診断を始める
            <ArrowRight size={20} />
          </Link>
        </section>
      </div>
    </Layout>
  );
}
