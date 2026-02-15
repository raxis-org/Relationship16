'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { RefreshCw, Share2 } from 'lucide-react';
import Layout from '../../components/Layout';
import { getSession } from '../../lib/db';
import { diagnose } from '../../logic/diagnostic';
import { relationTypes } from '../../data/relationTypes';
import styles from './page.module.css';

// アイコンマッピング
import {
  Flame, Swords, Briefcase, Users, Sparkles, Coffee,
  Heart, Leaf, Ghost, ArrowRight, Zap, Candy, Scale, Mask, Anchor
} from 'lucide-react';

const iconMap = {
  Flame, Swords, Briefcase, Users, Sparkles, Coffee,
  Heart, Leaf, Ghost, ArrowRight, Zap, Candy, Scale, Mask, Anchor,
};

export default function Result() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sid = searchParams.get('sid');
  
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!sid) {
      router.push('/');
      return;
    }

    loadResult();
  }, [sid, router]);

  const loadResult = async () => {
    try {
      const session = await getSession(sid);
      
      if (!session.completed) {
        setError('相手の回答がまだ完了していません');
        setLoading(false);
        return;
      }

      // 診断実行
      const diagnosis = diagnose(
        session.host_answers,
        session.guest_answers,
        session.host_name,
        session.guest_name
      );

      setResult({
        type: diagnosis.type,
        syncRate: diagnosis.syncRate,
        divergence: diagnosis.divergence,
        hostName: session.host_name,
        guestName: session.guest_name,
        hostScores: diagnosis.user1.scores,
        guestScores: diagnosis.user2.scores,
      });
    } catch (err) {
      console.error(err);
      setError('データの読み込みに失敗しました');
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert('結果のURLをコピーしました！');
    });
  };

  if (loading) {
    return (
      <Layout>
        <div className={styles.container}>
          <div className={styles.loading}>読み込み中...</div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className={styles.container}>
          <div className={`glass ${styles.errorCard}`}>
            <h1>{error}</h1>
            <Link href="/" className={styles.backButton}>
              トップに戻る
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const IconComponent = iconMap[result.type.icon] || Briefcase;

  return (
    <Layout>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.partners}>
            <span>{result.hostName}</span>
            <span>×</span>
            <span>{result.guestName}</span>
          </div>
        </div>

        {/* Main Result */}
        <div className={`glass ${styles.mainCard}`}>
          <code className={styles.typeCode}>{result.type.code}</code>
          
          <div className={styles.iconWrapper} style={{ background: result.type.color }}>
            <IconComponent className={styles.icon} />
          </div>

          <h1 className={styles.typeName}>{result.type.name}</h1>
          <p className={styles.tagline}>{result.type.tagline}</p>
          <p className={styles.description}>{result.type.description}</p>

          <div className={styles.syncRate}>
            <span>シンクロ率</span>
            <span className={styles.syncRateValue}>{result.syncRate}%</span>
          </div>
        </div>

        {/* Strengths & Weaknesses */}
        <div className={styles.detailsGrid}>
          <div className={`glass ${styles.detailCard}`}>
            <h3>強み</h3>
            <ul>
              {result.type.strengths.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>
          <div className={`glass ${styles.detailCard}`}>
            <h3>弱点</h3>
            <ul>
              {result.type.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
            </ul>
          </div>
        </div>

        {/* Advice & Activity */}
        <div className={styles.detailsGrid}>
          <div className={`glass ${styles.detailCard}`}>
            <h3>アドバイス</h3>
            <p>{result.type.advice}</p>
          </div>
          <div className={`glass ${styles.detailCard}`}>
            <h3>おすすめの過ごし方</h3>
            <p>{result.type.activity}</p>
          </div>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <button onClick={handleShare} className={styles.shareButton}>
            <Share2 className={styles.actionIcon} />
            結果をシェア
          </button>
          <Link href="/" className={styles.restartButton}>
            <RefreshCw className={styles.actionIcon} />
            もう一度診断する
          </Link>
        </div>
      </div>
    </Layout>
  );
}
