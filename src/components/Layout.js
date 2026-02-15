'use client';

import { Sparkles, Heart, Users } from 'lucide-react';
import styles from './Layout.module.css';

export default function Layout({ children, showHeader = true, showFooter = true }) {
  return (
    <div className={styles.container}>
      {/* Background Effects */}
      <div className={styles.background}>
        <div className={`${styles.orb} ${styles.orb1}`} />
        <div className={`${styles.orb} ${styles.orb2}`} />
        <div className={`${styles.orb} ${styles.orb3}`} />
      </div>

      {/* Header */}
      {showHeader && (
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.logo}>
              <div className={styles.logoIcon}>
                <Sparkles className={styles.sparkles} />
              </div>
              <div>
                <h1 className={styles.title}>RelationCheck 16</h1>
                <p className={styles.subtitle}>16タイプ関係性診断</p>
              </div>
            </div>
            <div className={styles.headerIcons}>
              <Users className={styles.icon} />
              <Heart className={`${styles.icon} ${styles.heart}`} />
            </div>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className={styles.main}>
        {children}
      </main>

      {/* Footer */}
      {showFooter && (
        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <p className={styles.footerText}>
              RelationCheck 16 &copy; 2024 - 16タイプ関係性診断システム
            </p>
            <p className={styles.footerSubtext}>
              4軸スコアリングによる精密診断
            </p>
          </div>
        </footer>
      )}
    </div>
  );
}
