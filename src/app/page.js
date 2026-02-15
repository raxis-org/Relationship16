'use client';

import Link from 'next/link';
import { Sparkles, Heart, ArrowRight, Grid3X3 } from 'lucide-react';
import Layout from '../components/Layout';
import styles from './page.module.css';

export default function Home() {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Main Visual */}
          <div className={styles.visual}>
            <div className={styles.visualGlow} />
            <div className={styles.visualBox}>
              <span className={styles.visualIcon}>🔮</span>
            </div>
          </div>

          {/* Title */}
          <h1 className={styles.title}>RelationCheck 16</h1>
          <p className={styles.subtitle}>16タイプ関係性診断</p>

          {/* Description */}
          <div className={`glass ${styles.description}`}>
            <h2 className={styles.descriptionTitle}>
              <Sparkles className={styles.descriptionIcon} />
              4軸スコアリングシステム
            </h2>
            <div className={styles.axisGrid}>
              <div className={styles.axisItem}>
                <span className={styles.axisEmoji}>🔥</span>
                <div>
                  <div className={styles.axisName}>熱量軸</div>
                  <div className={styles.axisLabel}>Hot / Cold</div>
                </div>
              </div>
              <div className={styles.axisItem}>
                <span className={styles.axisEmoji}>⚖️</span>
                <div>
                  <div className={styles.axisName}>重心軸</div>
                  <div className={styles.axisLabel}>Equal / Lean</div>
                </div>
              </div>
              <div className={styles.axisItem}>
                <span className={styles.axisEmoji}>🎯</span>
                <div>
                  <div className={styles.axisName}>目的軸</div>
                  <div className={styles.axisLabel}>Value / Loose</div>
                </div>
              </div>
              <div className={styles.axisItem}>
                <span className={styles.axisEmoji}>🔗</span>
                <div>
                  <div className={styles.axisName}>同期軸</div>
                  <div className={styles.axisLabel}>Sync / Desync</div>
                </div>
              </div>
            </div>
          </div>

          {/* Type Matrix Preview */}
          <div className={`glass ${styles.matrix}`}>
            <h3 className={styles.matrixTitle}>16タイプ・マトリックス</h3>
            <div className={styles.matrixGrid}>
              {['伝説のバディ', '宿命のライバル', '魂の双子', '陽だまりの老夫婦'].map((name, i) => (
                <div key={i} className={styles.matrixItem}>{name}</div>
              ))}
              {['最強のビジネスパートナー', '師弟を超えた共犯者', '全肯定型サンクチュアリ', '放牧中の幼馴染'].map((name, i) => (
                <div key={i} className={styles.matrixItem}>{name}</div>
              ))}
              {['飼い主と忠犬', '相互監視型メンヘラ', '平行線を辿る宇宙人', '一方通行の片想い'].map((name, i) => (
                <div key={i} className={styles.matrixItem}>{name}</div>
              ))}
              {['利害一致の仮面夫婦', '共依存の泥舟', '昨日会った親友', 'NPCとプレイヤー'].map((name, i) => (
                <div key={i} className={styles.matrixItem}>{name}</div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className={styles.actionButtons}>
            <Link href="/diagnose" className={styles.startButton}>
              <Heart className={styles.startIcon} />
              診断を開始する
              <ArrowRight className={styles.startIcon} />
            </Link>
            
            <Link href="/16types" className={styles.typesButton}>
              <Grid3X3 className={styles.startIcon} />
              16タイプ一覧を見る
              <ArrowRight className={styles.startIcon} />
            </Link>
          </div>

          <p className={styles.timeEstimate}>所要時間: 約3分（1人16問）</p>
        </div>
      </div>
    </Layout>
  );
}
