'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Grid3X3, Share2, Users, Sparkles } from 'lucide-react';
import Layout from '../components/Layout';
import styles from './page.module.css';

export default function Home() {
  return (
    <Layout>
      {/* Hero Section with Background Image */}
      <section className={styles.heroSection}>
        <div className={styles.heroImageWrapper}>
          <Image 
            src="/assets/main_hero.png"
            alt="RelationCheck 16"
            fill
            className={styles.heroImage}
            priority
          />
          <div className={styles.heroOverlay} />
        </div>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <Sparkles size={14} />
            16の関係性タイプ診断
          </div>
          <h1 className={styles.heroTitle}>
            あなたの関係性タイプは？
          </h1>
          <p className={styles.heroSubtitle}>
            32問の診断で、2人の関係性を16タイプに分類します。
            <br />
            科学的アプローチで、より良い関係性を築きましょう。
          </p>
          <div className={styles.heroActions}>
            <Link href="/diagnose" className={styles.primaryButton}>
              診断を開始する
              <ArrowRight size={18} />
            </Link>
            <Link href="/16types" className={styles.secondaryButton}>
              <Grid3X3 size={18} />
              16タイプ一覧
            </Link>
          </div>
          <p className={styles.heroNote}>所要時間: 約5分 · ログイン不要</p>
        </div>
      </section>

      <div className={styles.container}>
        {/* Flow Section */}
        <section className={styles.flowSection}>
          <h2 className={styles.sectionTitle}>診断の流れ</h2>
          <div className={styles.flowGrid}>
            <div className={styles.flowCard}>
              <div className={styles.stepBadge}>01</div>
              <div className={styles.stepIconWrapper}>
                <Users className={styles.stepIcon} />
              </div>
              <h3>あなたが回答</h3>
              <p>32問に回答して、セッションを作成します</p>
            </div>
            <div className={styles.flowArrow}>→</div>
            <div className={styles.flowCard}>
              <div className={styles.stepBadge}>02</div>
              <div className={styles.stepIconWrapper}>
                <Share2 className={styles.stepIcon} />
              </div>
              <h3>URLを共有</h3>
              <p>生成されたURLを相手に送信します</p>
            </div>
            <div className={styles.flowArrow}>→</div>
            <div className={styles.flowCard}>
              <div className={styles.stepBadge}>03</div>
              <div className={styles.stepIconWrapper}>
                <Sparkles className={styles.stepIcon} />
              </div>
              <h3>結果を確認</h3>
              <p>2人の回答から関係性タイプを判定</p>
            </div>
          </div>
        </section>

        {/* 4 Axes Section */}
        <section className={styles.axesSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>4つの評価軸</h2>
            <p className={styles.sectionSubtitle}>4つの軸で関係性を多角的に分析</p>
          </div>
          <div className={styles.axesGrid}>
            <div className={styles.axisCard} data-axis="temperature">
              <div className={styles.axisVisual}>
                <div className={styles.axisGradient} style={{ background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)' }} />
                <span className={styles.axisLetter}>P</span>
              </div>
              <div className={styles.axisInfo}>
                <h3>熱量軸</h3>
                <p>Passion - 感情の温度</p>
                <div className={styles.axisRange}>
                  <span>Hot</span>
                  <div className={styles.axisLine} />
                  <span>Cold</span>
                </div>
              </div>
            </div>
            <div className={styles.axisCard} data-axis="balance">
              <div className={styles.axisVisual}>
                <div className={styles.axisGradient} style={{ background: 'linear-gradient(135deg, #feca57 0%, #ff9ff3 100%)' }} />
                <span className={styles.axisLetter}>M</span>
              </div>
              <div className={styles.axisInfo}>
                <h3>重心軸</h3>
                <p>Motive - 関与の動機</p>
                <div className={styles.axisRange}>
                  <span>Equal</span>
                  <div className={styles.axisLine} />
                  <span>Lean</span>
                </div>
              </div>
            </div>
            <div className={styles.axisCard} data-axis="purpose">
              <div className={styles.axisVisual}>
                <div className={styles.axisGradient} style={{ background: 'linear-gradient(135deg, #1dd1a1 0%, #10ac84 100%)' }} />
                <span className={styles.axisLetter}>G</span>
              </div>
              <div className={styles.axisInfo}>
                <h3>目的軸</h3>
                <p>Goal - 目的の整合性</p>
                <div className={styles.axisRange}>
                  <span>Value</span>
                  <div className={styles.axisLine} />
                  <span>Loose</span>
                </div>
              </div>
            </div>
            <div className={styles.axisCard} data-axis="sync">
              <div className={styles.axisVisual}>
                <div className={styles.axisGradient} style={{ background: 'linear-gradient(135deg, #54a0ff 0%, #5f27cd 100%)' }} />
                <span className={styles.axisLetter}>V</span>
              </div>
              <div className={styles.axisInfo}>
                <h3>同期軸</h3>
                <p>Value - 価値観の共鳴</p>
                <div className={styles.axisRange}>
                  <span>Sync</span>
                  <div className={styles.axisLine} />
                  <span>Desync</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <h2>あなたの関係性を科学的に分析</h2>
            <p>16の関係性タイプから、あなたたちに最適なコミュニケーション方法を見つけましょう</p>
            <Link href="/diagnose" className={styles.ctaButton}>
              無料で診断を始める
              <ArrowRight size={20} />
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}
