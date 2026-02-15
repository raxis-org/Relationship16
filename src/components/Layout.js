'use client';

import Link from 'next/link';
import { Sparkles, Heart, Users, Grid3X3 } from 'lucide-react';
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
            <nav className={styles.nav}>
              <Link href="/16types" className={styles.navLink}>
                <Grid3X3 className={styles.navIcon} />
                <span>16タイプ</span>
              </Link>
              <Link href="/diagnose" className={styles.navLink}>
                <Users className={styles.navIcon} />
                <span>診断</span>
              </Link>
            </nav>
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
