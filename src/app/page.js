'use client';

import Link from 'next/link';
import { ArrowRight, Grid3X3 } from 'lucide-react';
import Layout from '../components/Layout';
import styles from './page.module.css';

export default function Home() {
  return (
    <Layout>
      <div className={styles.container}>
        {/* Hero Section */}
        <div className={styles.hero}>
          <h1 className={styles.title}>あなたの関係性タイプは？</h1>
          <p className={styles.subtitle}>
            30問の診断で、2人の関係性を16タイプに分類します
          </p>
        </div>

        {/* 4 Axes */}
        <div className={styles.axesSection}>
          <h2 className={styles.sectionTitle}>4つの評価軸</h2>
          <div className={styles.axesGrid}>
            <div className={styles.axisCard}>
              <div className={styles.axisColor} style={{ background: '#e74c3c' }} />
              <div className={styles.axisContent}>
                <div className={styles.axisName}>熱量軸</div>
                <div className={styles.axisLabels}>Hot ↔ Cold</div>
              </div>
            </div>
            <div className={styles.axisCard}>
              <div className={styles.axisColor} style={{ background: '#f1c40f' }} />
              <div className={styles.axisContent}>
                <div className={styles.axisName}>重心軸</div>
                <div className={styles.axisLabels}>Equal ↔ Lean</div>
              </div>
            </div>
            <div className={styles.axisCard}>
              <div className={styles.axisColor} style={{ background: '#27ae60' }} />
              <div className={styles.axisContent}>
                <div className={styles.axisName}>目的軸</div>
                <div className={styles.axisLabels}>Value ↔ Loose</div>
              </div>
            </div>
            <div className={styles.axisCard}>
              <div className={styles.axisColor} style={{ background: '#3498db' }} />
              <div className={styles.axisContent}>
                <div className={styles.axisName}>同期軸</div>
                <div className={styles.axisLabels}>Sync ↔ Desync</div>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className={styles.buttonsSection}>
          <Link href="/diagnose" className={styles.startButton}>
            診断を開始する
            <ArrowRight className={styles.startIcon} />
          </Link>
          <Link href="/16types" className={styles.typesButton}>
            <Grid3X3 className={styles.typesIcon} />
            16タイプ一覧を見る
          </Link>
        </div>
        <p className={styles.timeEstimate}>所要時間: 約5分</p>
      </div>
    </Layout>
  );
}
