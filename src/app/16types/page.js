'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, Grid3X3, Sparkles, ArrowRight } from 'lucide-react';
import Layout from '../../components/Layout';
import { relationTypes, getTypeAssetPath, TYPE_CATEGORIES, CATEGORY_LABELS, AXES } from '../../data/relationTypes';
import styles from './page.module.css';

const axisInfo = [
  {
    code: 'P',
    name: '権力均衡',
    nameEn: 'Power',
    left: 'H（階層的）',
    right: 'E（対等的）',
    description: '二人の関係における力のバランス',
    color: '#e74c3c',
  },
  {
    code: 'M',
    name: '関与動機',
    nameEn: 'Motive',
    left: 'I（手段的）',
    right: 'B（存在的）',
    description: '相手を大切にする理由の根本',
    color: '#f39c12',
  },
  {
    code: 'G',
    name: '目的整合',
    nameEn: 'Goal',
    left: 'A（自律的）',
    right: 'S（共鳴的）',
    description: '二人の目標や将来のビジョンの一致度',
    color: '#27ae60',
  },
  {
    code: 'V',
    name: '価値共感',
    nameEn: 'Value',
    left: 'D（多様的）',
    right: 'C（一致的）',
    description: '物事の考え方や優先順位の近さ',
    color: '#3498db',
  },
];

export default function TypesList() {
  // カテゴリ別にグループ化
  const typesByCategory = {};
  for (const cat of TYPE_CATEGORIES) {
    const types = relationTypes.filter(t => t.code.startsWith(cat));
    if (types.length > 0) {
      typesByCategory[cat] = types;
    }
  }

  return (
    <Layout>
      <div className={styles.container}>
        {/* Hero Section */}
        <div className={styles.hero}>
          <Link href="/" className={styles.backLink}>
            <ChevronLeft className={styles.backIcon} />
            戻る
          </Link>
          <h1 className={styles.heroTitle}>
            <Sparkles className={styles.heroIcon} />
            16の関係性タイプ
          </h1>
          <p className={styles.heroSubtitle}>
            4つの軸で診断される、あなたたちだけの関係性を見つけよう
          </p>
        </div>

        {/* 4軸解説セクション */}
        <section className={styles.axisSection}>
          <h2 className={styles.sectionTitle}>4つの診断軸</h2>
          <p className={styles.sectionSubtitle}>
            それぞれの軸が2つの方向を持ち、2×2×2×2 = 16タイプの関係性が生まれます
          </p>
          <div className={styles.axisGrid}>
            {axisInfo.map((axis) => (
              <div key={axis.code} className={styles.axisCard}>
                <div className={styles.axisHeader}>
                  <span className={styles.axisCode} style={{ backgroundColor: axis.color }}>
                    {axis.code}
                  </span>
                  <div>
                    <h3 className={styles.axisName}>{axis.name}</h3>
                    <span className={styles.axisNameEn}>{axis.nameEn}</span>
                  </div>
                </div>
                <p className={styles.axisDescription}>{axis.description}</p>
                <div className={styles.axisScale}>
                  <span className={styles.axisLeft}>{axis.left}</span>
                  <div className={styles.axisBar} style={{ background: `linear-gradient(90deg, ${axis.color}44, ${axis.color})` }} />
                  <span className={styles.axisRight}>{axis.right}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* タイプ一覧セクション */}
        <section className={styles.typesSection}>
          <h2 className={styles.sectionTitle}>全16タイプ一覧</h2>
          <p className={styles.sectionSubtitle}>
            どのタイプにもそれぞれ固有の魅力と強みがあります。あなたたちの関係性を見つけよう
          </p>

          {TYPE_CATEGORIES.map((cat) => {
            const types = typesByCategory[cat];
            if (!types) return null;
            const catInfo = CATEGORY_LABELS[cat];

            return (
              <div key={cat} className={styles.rankGroup}>
                <div className={styles.rankHeader}>
                  <span
                    className={styles.rankBadge}
                    style={{ backgroundColor: catInfo.color }}
                  >
                    {cat}
                  </span>
                  <span className={styles.rankDescription}>{catInfo.label}</span>
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
                        <div className={styles.cardImageWrapper}>
                          <Image
                            src={iconPath}
                            alt={type.name}
                            width={120}
                            height={120}
                            className={styles.cardImage}
                          />
                        </div>
                        <div className={styles.cardContent}>
                          <div className={styles.cardCode}>{type.code}</div>
                          <h3 className={styles.cardName}>{type.name}</h3>
                          <p className={styles.cardNameEn}>{type.nameEn}</p>
                          <p className={styles.cardDescription}>
                            {type.shortDescription}
                          </p>
                          <div className={styles.cardFooter}>
                            <span className={styles.cardLink}>
                              詳しく見る <ArrowRight size={14} />
                            </span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </section>

        {/* CTA */}
        <section className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>あなたたちの関係性は？</h2>
          <p className={styles.ctaText}>
            32の質問に答えて、二人の関係性タイプを診断しよう
          </p>
          <Link href="/diagnose" className={styles.ctaButton}>
            診断を始める
            <ArrowRight size={18} />
          </Link>
        </section>
      </div>
    </Layout>
  );
}
