'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Layout from '../../../components/Layout';
import { getTypeByCode, getAllTypes } from '../../../data/relationTypes';
import styles from './page.module.css';

export default function TypeDetailPage() {
  const params = useParams();
  const code = params.code;
  const type = getTypeByCode(code);
  const allTypes = getAllTypes();

  // 前後のタイプを取得
  const currentIndex = allTypes.findIndex(t => t.code === code);
  const prevType = currentIndex > 0 ? allTypes[currentIndex - 1] : null;
  const nextType = currentIndex < allTypes.length - 1 ? allTypes[currentIndex + 1] : null;

  if (!type) {
    return (
      <Layout>
        <div className={styles.notFound}>
          <h1>タイプが見つかりません</h1>
          <p>コード: {code}</p>
          <Link href="/16types" className={styles.backLink}>
            16タイプ一覧に戻る
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.container}>
        {/* Back Link */}
        <Link href="/16types" className={styles.backLink}>
          <ArrowLeft size={18} />
          16タイプ一覧に戻る
        </Link>

        {/* Hero */}
        <section className={styles.hero} style={{ background: type.gradient }}>
          <div className={styles.heroContent}>
            <div className={styles.typeBadge}>{type.code}</div>
            <h1 className={styles.typeName}>{type.name}</h1>
            <p className={styles.typeNameEn}>{type.nameEn}</p>
          </div>
          <div className={styles.heroImage}>
            <Image 
              src={`/assets/${type.code}.png`}
              alt={type.name}
              width={280}
              height={280}
              className={styles.typeIcon}
              priority
            />
          </div>
        </section>

        {/* Description */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>タイプの概要</h2>
          <div className={styles.description}>
            {type.description.split('\n\n').map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
        </section>

        {/* Strengths & Weaknesses */}
        <section className={styles.section}>
          <div className={styles.swGrid}>
            <div className={styles.swCard}>
              <h3 className={styles.swTitle} style={{ color: '#27ae60' }}>強み</h3>
              <ul className={styles.swList}>
                {type.strengths?.map((s, idx) => <li key={idx}>{s}</li>)}
              </ul>
            </div>
            <div className={styles.swCard}>
              <h3 className={styles.swTitle} style={{ color: '#e74c3c' }}>注意点</h3>
              <ul className={styles.swList}>
                {type.weaknesses?.map((w, idx) => <li key={idx}>{w}</li>)}
              </ul>
            </div>
          </div>
        </section>

        {/* Recommendations */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>おすすめの過ごし方</h2>
          <div className={styles.recommendCard}>
            <p>{type.recommendedActivity}</p>
          </div>
          <h2 className={styles.sectionTitle} style={{ marginTop: '32px' }}>避けるべきこと</h2>
          <div className={styles.recommendCard} style={{ borderLeftColor: '#e74c3c' }}>
            <p>{type.badActivity}</p>
          </div>
        </section>

        {/* Code Breakdown */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>タイプコードの意味</h2>
          <div className={styles.codeBreakdown}>
            <div className={styles.codeItem}>
              <span className={styles.codeLetter} style={{ background: '#ff6b6b' }}>{type.code[0]}</span>
              <span className={styles.codeLabel}>
                {type.code[0] === 'H' ? 'Hot (情熱的)' : 'Cool (冷静的)'}
              </span>
            </div>
            <div className={styles.codeItem}>
              <span className={styles.codeLetter} style={{ background: '#feca57' }}>{type.code[1]}</span>
              <span className={styles.codeLabel}>
                {type.code[1] === 'E' ? 'Equal (対等)' : 'Lean (偏り)'}
              </span>
            </div>
            <div className={styles.codeItem}>
              <span className={styles.codeLetter} style={{ background: '#1dd1a1' }}>{type.code[2]}</span>
              <span className={styles.codeLabel}>
                {type.code[2] === 'V' ? 'Value (価値重視)' : 'Loose (緩やか)'}
              </span>
            </div>
            <div className={styles.codeItem}>
              <span className={styles.codeLetter} style={{ background: '#54a0ff' }}>{type.code[3]}</span>
              <span className={styles.codeLabel}>
                {type.code[3] === 'S' ? 'Sync (同期)' : 'Desync (非同期)'}
              </span>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className={styles.navigation}>
          {prevType ? (
            <Link href={`/16types/${prevType.code}`} className={styles.navLink}>
              <ArrowLeft size={18} />
              <div>
                <span className={styles.navLabel}>前のタイプ</span>
                <span className={styles.navName}>{prevType.name}</span>
              </div>
            </Link>
          ) : (
            <div />
          )}
          
          {nextType ? (
            <Link href={`/16types/${nextType.code}`} className={`${styles.navLink} ${styles.navLinkNext}`}>
              <div>
                <span className={styles.navLabel}>次のタイプ</span>
                <span className={styles.navName}>{nextType.name}</span>
              </div>
              <ArrowRight size={18} />
            </Link>
          ) : (
            <div />
          )}
        </div>

        {/* CTA */}
        <section className={styles.cta}>
          <h2>このタイプかも？診断してみよう</h2>
          <Link href="/diagnose" className={styles.ctaButton}>
            診断を始める
            <ArrowRight size={20} />
          </Link>
        </section>
      </div>
    </Layout>
  );
}
