'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Layout from '../components/Layout';
import styles from './page.module.css';

export default function Home() {
  return (
    <Layout>
      {/* Hero Banner */}
      <section className={styles.heroBanner}>
        <div className={styles.bannerImageContainer}>
          <Image 
            src="/assets/main_hero.png" 
            alt="RelationCheck 16 - 16の関係性タイプ" 
            fill
            className={styles.bannerImage}
            priority
          />
          <div className={styles.bannerOverlay} />
        </div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>あなたの関係性タイプは？</h1>
          <p className={styles.heroSubtitle}>
            16問の診断で、二人の関係性を科学的に分析します
          </p>
          <Link href="/diagnose" className={styles.startButton}>
            診断を開始する
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className={styles.featuresSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>4つの評価軸</h2>
          <div className={styles.axesGrid}>
            <div className={styles.axisCard}>
              <div className={styles.axisIcon} style={{ background: '#ff6b6b' }}>
                <span>P</span>
              </div>
              <h3>Power</h3>
              <p>権力均衡</p>
              <span className={styles.axisLabels}>Hierarchical ↔ Equal</span>
            </div>
            <div className={styles.axisCard}>
              <div className={styles.axisIcon} style={{ background: '#feca57' }}>
                <span>M</span>
              </div>
              <h3>Motive</h3>
              <p>関与動機</p>
              <span className={styles.axisLabels}>Instrumental ↔ Being</span>
            </div>
            <div className={styles.axisCard}>
              <div className={styles.axisIcon} style={{ background: '#1dd1a1' }}>
                <span>G</span>
              </div>
              <h3>Goal</h3>
              <p>目的整合</p>
              <span className={styles.axisLabels}>Autonomous ↔ Synergetic</span>
            </div>
            <div className={styles.axisCard}>
              <div className={styles.axisIcon} style={{ background: '#54a0ff' }}>
                <span>V</span>
              </div>
              <h3>Value</h3>
              <p>価値共感</p>
              <span className={styles.axisLabels}>Diverse ↔ Congruent</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <h2 className={styles.ctaTitle}>あなたと大切な人の関係性を知る</h2>
          <p className={styles.ctaText}>
            16の関係性タイプから、あなたたちに最も適した<br />
            コミュニケーション方法や過ごし方を見つけましょう
          </p>
          <Link href="/diagnose" className={styles.ctaButton}>
            無料で診断を始める
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
