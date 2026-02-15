'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Layout from '../../components/Layout';
import { getAllTypes, getTypeAssetPath } from '../../data/relationTypes';
import styles from './page.module.css';

export default function TypesPage() {
  const types = getAllTypes();

  // ランクごとに分類
  const ssTypes = types.filter(t => t.rank === 'SS');
  const sTypes = types.filter(t => t.rank === 'S');
  const aTypes = types.filter(t => t.rank === 'A');
  const bTypes = types.filter(t => t.rank === 'B' || t.rank === 'B+');
  const cTypes = types.filter(t => t.rank === 'C' || t.rank === 'C-' || t.rank === 'C+');
  const dTypes = types.filter(t => t.rank === 'D' || t.rank === 'D+');

  const renderTypeSection = (title, typeList, color) => (
    <div className={styles.rankSection}>
      <h2 className={styles.rankTitle} style={{ color }}>{title}</h2>
      <div className={styles.typesGrid}>
        {typeList.map(type => (
          <Link 
            key={type.code} 
            href={`/16types/${type.code}`}
            className={styles.typeCard}
          >
            <div className={styles.typeImageContainer}>
              <Image 
                src={getTypeAssetPath(type.code)}
                alt={type.name}
                fill
                className={styles.typeImage}
              />
            </div>
            <div className={styles.typeInfo}>
              <span className={styles.typeCode}>{type.code}</span>
              <h3 className={styles.typeName}>{type.name}</h3>
              <p className={styles.typeDesc}>{type.description.slice(0, 60)}...</p>
            </div>
            <ArrowRight className={styles.arrowIcon} size={20} />
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <Layout>
      <div className={styles.container}>
        {/* Header */}
        <section className={styles.header}>
          <h1 className={styles.title}>16の関係性タイプ</h1>
          <p className={styles.subtitle}>
            4つの軸（P/M/G/V）の組み合わせによって、あなたたちの関係性を16タイプに分類します。
          </p>
        </section>

        {/* Type Grid */}
        <section className={styles.typesSection}>
          {ssTypes.length > 0 && renderTypeSection('SSランク - 理想的な関係', ssTypes, '#9b59b6')}
          {sTypes.length > 0 && renderTypeSection('Sランク - 素晴らしい関係', sTypes, '#3498db')}
          {aTypes.length > 0 && renderTypeSection('Aランク - 良好な関係', aTypes, '#27ae60')}
          {bTypes.length > 0 && renderTypeSection('Bランク - バランスの取れた関係', bTypes, '#f39c12')}
          {cTypes.length > 0 && renderTypeSection('Cランク - 課題を持つ関係', cTypes, '#e67e22')}
          {dTypes.length > 0 && renderTypeSection('Dランク - 困難な関係', dTypes, '#e74c3c')}
        </section>

        {/* CTA */}
        <section className={styles.cta}>
          <h2>あなたの関係性タイプを見つけよう</h2>
          <Link href="/diagnose" className={styles.ctaButton}>
            診断を始める
            <ArrowRight size={20} />
          </Link>
        </section>
      </div>
    </Layout>
  );
}
