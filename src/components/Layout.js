'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './Layout.module.css';

export default function Layout({ children, showHeader = true, showFooter = true }) {
  return (
    <div className={styles.container}>
      {showHeader && (
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <Link href="/" className={styles.logo}>
              <Image 
                src="/assets/app_icon.png" 
                alt="RelationCheck 16" 
                width={40} 
                height={40}
                className={styles.logoIcon}
              />
              <span className={styles.logoText}>RelationCheck</span>
              <span className={styles.logoNumber}>16</span>
            </Link>
            <nav className={styles.nav}>
              <Link href="/" className={styles.navLink}>ホーム</Link>
              <Link href="/16types" className={styles.navLink}>16タイプ</Link>
            </nav>
          </div>
        </header>
      )}

      <main className={styles.main}>
        {children}
      </main>

      {showFooter && (
        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <Image 
              src="/assets/app_icon.png" 
              alt="RelationCheck 16" 
              width={48} 
              height={48}
              className={styles.footerIcon}
            />
            <p className={styles.footerText}>
              RelationCheck 16 - 二人の関係性を科学する
            </p>
            <p className={styles.footerCopyright}>
              © 2026 RelationCheck. All rights reserved.
            </p>
          </div>
        </footer>
      )}
    </div>
  );
}
