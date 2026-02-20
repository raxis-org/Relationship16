'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import styles from './Layout.module.css';

export default function Layout({ children, showHeader = true, showFooter = true }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className={styles.container}>
      {showHeader && (
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <Link href="/" className={styles.logo}>
              <Image 
                src="/assets/app_icon.png" 
                alt="PMGV診断" 
                width={40} 
                height={40}
                className={styles.logoIcon}
              />
              <div className={styles.logoTextWrapper}>
                <span className={styles.logoText}>PMGV</span>
                <span className={styles.logoSubtext}>診断</span>
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className={styles.nav}>
              <Link href="/" className={styles.navLink}>
                ホーム
              </Link>
              <Link href="/16types" className={styles.navLink}>
                16タイプ一覧
              </Link>
              <Link href="/diagnose" className={styles.navButton}>
                <Sparkles size={16} />
                診断を始める
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className={styles.mobileMenuButton}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="メニュー"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className={styles.mobileNav}>
              <Link 
                href="/" 
                className={styles.mobileNavLink}
                onClick={() => setMobileMenuOpen(false)}
              >
                ホーム
              </Link>
              <Link 
                href="/16types" 
                className={styles.mobileNavLink}
                onClick={() => setMobileMenuOpen(false)}
              >
                16タイプ一覧
              </Link>
              <Link 
                href="/diagnose" 
                className={styles.mobileNavButton}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Sparkles size={16} />
                診断を始める
              </Link>
            </nav>
          )}
        </header>
      )}

      <main className={styles.main}>
        {children}
      </main>

      {showFooter && (
        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <div className={styles.footerBrand}>
              <Image 
                src="/assets/app_icon.png" 
                alt="PMGV診断" 
                width={48} 
                height={48}
                className={styles.footerIcon}
              />
              <div className={styles.footerBrandText}>
                <h3 className={styles.footerTitle}>PMGV診断</h3>
                <p className={styles.footerTagline}>
                  Passion・Motive・Goal・Valueの4軸で、<br />
                  二人の関係性を科学的に分析
                </p>
              </div>
            </div>
            
            <nav className={styles.footerNav}>
              <Link href="/" className={styles.footerNavLink}>ホーム</Link>
              <Link href="/16types" className={styles.footerNavLink}>16タイプ一覧</Link>
              <Link href="/diagnose" className={styles.footerNavLink}>診断を始める</Link>
            </nav>

            <div className={styles.footerBottom}>
              <p className={styles.footerCopyright}>
                © 2026 PMGV診断. All rights reserved.
              </p>
              <p className={styles.footerDescription}>
                PMGV診断は、4軸（Passion・Motive・Goal・Value）の観点から<br className={styles.hideMobile} />
                二人の関係性を16タイプに分類する無料の相性診断サービスです。
              </p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
