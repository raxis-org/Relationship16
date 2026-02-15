'use client';

import Link from 'next/link';
import styles from './Layout.module.css';

export default function Layout({ children, showHeader = true, showFooter = true }) {
  return (
    <div className={styles.container}>
      {/* Header */}
      {showHeader && (
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <Link href="/" className={styles.logo}>
              <span className={styles.logoText}>RelationCheck</span>
              <span className={styles.logoNumber}>16</span>
            </Link>
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
              RelationCheck 16 - 16タイプ関係性診断
            </p>
          </div>
        </footer>
      )}
    </div>
  );
}
