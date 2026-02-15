'use client';

import Link from 'next/link';
import { ArrowRight, Grid3X3, Share2, Users } from 'lucide-react';
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
            32問の診断で、2人の関係性を16タイプに分類します
          </p>
        </div>

        {/* Flow */}
        <div className={styles.flowSection}>
          <h2 className={styles.sectionTitle}>診断の流れ</h2>
          <div className={styles.flowGrid}>
            <div className={styles.flowStep}>
              <div className={styles.stepNumber}>1</div>
              <Users className={styles.stepIcon} />
              <div className={styles.stepTitle}>あなたが回答</div>
              <div className={styles.stepDesc}>32問に回答して、セッションを作成</div>
            </div>
            <div className={styles.flowArrow}>→</div>
            <div className={styles.flowStep}>
              <div className={styles.stepNumber}>2</div>
              <Share2 className={styles.stepIcon} />
              <div className={styles.stepTitle}>URLを共有</div>
              <div className={styles.stepDesc}>生成されたURLを相手に送る</div>
            </div>
            <div className={styles.flowArrow}>→</div>
            <div className={styles.flowStep}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepIcon}>✨</div>
              <div className={styles.stepTitle}>結果を確認</div>
              <div className={styles.stepDesc}>2人の回答から関係性タイプを判定</div>
            </div>
          </div>
        </div>

        {/* 4 Axes */}
        <div className={styles.axesSection}>
          <h2 className={styles.sectionTitle}>4つの評価軸</h2>
          <div className={styles.axesGrid}>
            <div className={styles.axisCard}>
              <div className={styles.axisColor} style={{ background: 'linear-gradient(135deg, #e74c3c, #c0392b)' }} />
              <div className={styles.axisContent}>
                <div className={styles.axisName}>熱量軸</div>
                <div className={styles.axisLabels}>Hot ↔ Cold</div>
              </div>
            </div>
            <div className={styles.axisCard}>
              <div className={styles.axisColor} style={{ background: 'linear-gradient(135deg, #f1c40f, #f39c12)' }} />
              <div className={styles.axisContent}>
                <div className={styles.axisName}>重心軸</div>
                <div className={styles.axisLabels}>Equal ↔ Lean</div>
              </div>
            </div>
            <div className={styles.axisCard}>
              <div className={styles.axisColor} style={{ background: 'linear-gradient(135deg, #27ae60, #1e8449)' }} />
              <div className={styles.axisContent}>
                <div className={styles.axisName}>目的軸</div>
                <div className={styles.axisLabels}>Value ↔ Loose</div>
              </div>
            </div>
            <div className={styles.axisCard}>
              <div className={styles.axisColor} style={{ background: 'linear-gradient(135deg, #3498db, #2980b9)' }} />
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
        <p className={styles.timeEstimate}>所要時間: 約5分 · ログイン不要</p>
      </div>
    </Layout>
  );
}
