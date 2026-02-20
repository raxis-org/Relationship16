'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Grid3X3, Share2, Users, Sparkles, Flame, Scale, Target, Heart, ChevronRight } from 'lucide-react';
import Layout from '../components/Layout';
import styles from './page.module.css';

// 構造化データ（Schema.org）
const schemaData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "PMGV診断",
  "description": "Passion・Motive・Goal・Valueの4軸で二人の関係性を分析する16タイプ相性診断",
  "applicationCategory": "LifestyleApplication",
  "operatingSystem": "Any",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "JPY"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.5",
    "ratingCount": "1000"
  }
};

// 4軸の定義
const AXES_DATA = [
  {
    letter: 'P',
    name: 'Passion',
    jaName: 'パッション軸',
    left: 'Hot',
    right: 'Cool',
    desc: '感情の温度。情熱的か、それとも冷静か',
    icon: Flame,
    leftColor: '#ff6b6b',
    rightColor: '#54a0ff'
  },
  {
    letter: 'M',
    name: 'Motive',
    jaName: 'モチーフ軸',
    left: 'Equal',
    right: 'Lean',
    desc: '関与の動機。対等か、それとも偏りがあるか',
    icon: Scale,
    leftColor: '#feca57',
    rightColor: '#a29bfe'
  },
  {
    letter: 'G',
    name: 'Goal',
    jaName: 'ゴール軸',
    left: 'Value',
    right: 'Loose',
    desc: '目的の整合性。価値重視か、それとも緩やかか',
    icon: Target,
    leftColor: '#1dd1a1',
    rightColor: '#fd79a8'
  },
  {
    letter: 'V',
    name: 'Value',
    jaName: 'バリュー軸',
    left: 'Sync',
    right: 'Desync',
    desc: '価値観の共鳴。価値観が一致するか、それとも異なるか',
    icon: Heart,
    leftColor: '#00b894',
    rightColor: '#e17055'
  }
];

export default function Home() {
  return (
    <Layout>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroImageWrapper}>
          <Image 
            src="/assets/main_hero.png"
            alt="PMGV診断 - 4軸16タイプ関係性診断"
            fill
            className={styles.heroImage}
            priority
          />
          <div className={styles.heroOverlay} />
        </div>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <Sparkles size={14} />
            4軸16タイプ相性診断
          </div>
          <h1 className={styles.heroTitle}>
            PMGV診断
          </h1>
          <p className={styles.heroSubtitle}>
            Passion・Motive・Goal・Valueの4軸で、<br />
            二人の関係性を科学的に分析します。<br />
            16タイプの特性から、あなたと相手に最適な<br />
            コミュニケーション方法を見つけましょう。
          </p>
          <div className={styles.heroActions}>
            <Link href="/diagnose" className={styles.primaryButton}>
              無料で診断を始める
              <ArrowRight size={18} />
            </Link>
            <Link href="/16types" className={styles.secondaryButton}>
              <Grid3X3 size={18} />
              16タイプを見る
            </Link>
          </div>
          <div className={styles.heroStats}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>4</span>
              <span className={styles.statLabel}>評価軸</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <span className={styles.statNumber}>16</span>
              <span className={styles.statLabel}>関係性タイプ</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <span className={styles.statNumber}>32</span>
              <span className={styles.statLabel}>診断質問</span>
            </div>
          </div>
          <p className={styles.heroNote}>所要時間: 約5分 · ログイン不要 · 完全無料</p>
        </div>
      </section>

      <div className={styles.container}>
        {/* About Section */}
        <section className={styles.aboutSection}>
          <div className={styles.aboutContent}>
            <h2 className={styles.aboutTitle}>
              PMGV診断とは？
            </h2>
            <p className={styles.aboutText}>
              PMGV診断は、<strong>Passion（感情の温度）</strong>、<strong>Motive（関与の動機）</strong>、
              <strong>Goal（目的の整合性）</strong>、<strong>Value（価値観の共鳴）</strong>の
              4つの軸から、二人の関係性を多角的に分析する相性診断ツールです。
            </p>
            <p className={styles.aboutText}>
              32問の質問に答えるだけで、あなたと相手の関係性が16タイプの中から自動的に判定されます。
              恋人、友人、家族、仕事仲間――どんな関係性でも、より深く理解し、より良い関係を築くための
              ヒントが見つかります。
            </p>
          </div>
        </section>

        {/* 4 Axes Section */}
        <section className={styles.axesSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>4つの評価軸</h2>
            <p className={styles.sectionSubtitle}>
              PMGVの4軸で関係性を多角的に分析
            </p>
          </div>
          <div className={styles.axesGrid}>
            {AXES_DATA.map((axis) => {
              const Icon = axis.icon;
              return (
                <div key={axis.letter} className={styles.axisCard}>
                  <div className={styles.axisHeader}>
                    <div className={styles.axisIconWrapper}>
                      <Icon className={styles.axisIcon} />
                    </div>
                    <div className={styles.axisTitleArea}>
                      <span className={styles.axisLetter}>{axis.letter}</span>
                      <span className={styles.axisName}>{axis.name}</span>
                    </div>
                  </div>
                  <p className={styles.axisJaName}>{axis.jaName}</p>
                  <p className={styles.axisDesc}>{axis.desc}</p>
                  <div className={styles.axisRange}>
                    <span style={{ color: axis.leftColor }}>{axis.left}</span>
                    <div className={styles.axisLine}>
                      <div 
                        className={styles.axisGradient} 
                        style={{ 
                          background: `linear-gradient(90deg, ${axis.leftColor}, ${axis.rightColor})` 
                        }} 
                      />
                    </div>
                    <span style={{ color: axis.rightColor }}>{axis.right}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* How It Works */}
        <section className={styles.flowSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>診断の流れ</h2>
            <p className={styles.sectionSubtitle}>簡単3ステップで関係性が分かる</p>
          </div>
          <div className={styles.flowGrid}>
            <div className={styles.flowCard}>
              <div className={styles.stepBadge}>01</div>
              <div className={styles.stepIconWrapper}>
                <Users className={styles.stepIcon} />
              </div>
              <h3>あなたが回答</h3>
              <p>32問の質問に答えて、あなたの関係性傾向を測定します</p>
            </div>
            <div className={styles.flowArrow}>
              <ChevronRight size={32} />
            </div>
            <div className={styles.flowCard}>
              <div className={styles.stepBadge}>02</div>
              <div className={styles.stepIconWrapper}>
                <Share2 className={styles.stepIcon} />
              </div>
              <h3>URLを共有</h3>
              <p>生成されたリンクを相手に送信。相手も同じ質問に回答します</p>
            </div>
            <div className={styles.flowArrow}>
              <ChevronRight size={32} />
            </div>
            <div className={styles.flowCard}>
              <div className={styles.stepBadge}>03</div>
              <div className={styles.stepIconWrapper}>
                <Sparkles className={styles.stepIcon} />
              </div>
              <h3>結果を確認</h3>
              <p>二人の回答を分析し、16タイプの特性とアドバイスを表示</p>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className={styles.useCaseSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>こんな方におすすめ</h2>
          </div>
          <div className={styles.useCaseGrid}>
            <div className={styles.useCaseCard}>
              <div className={styles.useCaseIcon}>💑</div>
              <h3>パートナーと</h3>
              <p>恋人・夫婦関係をより深く理解し、円満な関係を築きたい</p>
            </div>
            <div className={styles.useCaseCard}>
              <div className={styles.useCaseIcon}>👥</div>
              <h3>友人と</h3>
              <p>親友との相性を知り、長続きする友情を育みたい</p>
            </div>
            <div className={styles.useCaseCard}>
              <div className={styles.useCaseIcon}>👨‍👩‍👧‍👦</div>
              <h3>家族と</h3>
              <p>家族との関係性を改善し、より良いコミュニケーションを取りたい</p>
            </div>
            <div className={styles.useCaseCard}>
              <div className={styles.useCaseIcon}>💼</div>
              <h3>仕事仲間と</h3>
              <p>職場の人間関係を円滑にし、チームワークを向上させたい</p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className={styles.featuresSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>PMGV診断の特徴</h2>
          </div>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureNumber}>01</div>
              <h3>科学的アプローチ</h3>
              <p>4軸の評価システムにより、関係性を客観的に分析。感情的な判断ではなく、データに基づいた洞察を提供します。</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureNumber}>02</div>
              <h3>16タイプの詳細分析</h3>
              <p>単なる相性の良し悪しではなく、各タイプの強み・弱み、おすすめの接し方など具体的なアドバイスを提供。</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureNumber}>03</div>
              <h3>完全無料・ログイン不要</h3>
              <p>個人情報の登録なしで、今すぐ診断を始めることができます。面倒な会員登録は一切不要です。</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureNumber}>04</div>
              <h3>シェアしやすい</h3>
              <p>LINEやSNSで簡単に共有できるURLを生成。遠方に住む友人やパートナーとも簡単に診断できます。</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <h2>あなたの関係性を診断してみませんか？</h2>
            <p>
              PMGV診断で、二人の関係性を新しい視点から理解し、<br />
              より良い関係を築く第一歩を踏み出しましょう。
            </p>
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
