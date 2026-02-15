'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Crown, Swords, Briefcase, Users, Sparkles, Coffee,
  Heart, Leaf, Dog, Eye, UserCircle, Anchor, Ghost, ArrowRight,
  UserX, Bot, Share2, RefreshCw, ChevronRight
} from 'lucide-react';
import Layout from '../../components/Layout';
import { useDiagnose } from '../../context/DiagnoseContext';
import styles from './page.module.css';

const iconMap = {
  Crown, Swords, Briefcase, Users, Sparkles, Coffee,
  Heart, Leaf, Dog, Eye, Mask: UserCircle, Anchor,
  UFO: Ghost, ArrowRight, UserX, Bot,
};

const typeNames = {
  1: '伝説のバディ',
  2: '宿命のライバル',
  3: '最強のビジネスパートナー',
  4: '師弟を超えた共犯者',
  5: '魂の双子',
  6: '陽だまりの老夫婦',
  7: '全肯定型サンクチュアリ',
  8: '放牧中の幼馴染',
  9: '飼い主と忠犬',
  10: '相互監視型メンヘラ',
  11: '利害一致の仮面夫婦',
  12: '共依存の泥舟',
  13: '平行線を辿る宇宙人',
  14: '一方通行の片想い',
  15: '昨日会った親友',
  16: 'NPCとプレイヤー',
};

export default function Result() {
  const router = useRouter();
  const { result, reset, user1Name, user2Name } = useDiagnose();

  useEffect(() => {
    if (!result) {
      router.push('/diagnose');
    }
  }, [result, router]);

  if (!result) return null;

  const { type, syncRate, details } = result;
  const IconComponent = iconMap[type.icon] || Bot;

  const getSyncRateColor = (rate) => {
    if (rate >= 80) return 'linear-gradient(90deg, #4ade80, #10b981)';
    if (rate >= 60) return 'linear-gradient(90deg, #60a5fa, #06b6d4)';
    if (rate >= 40) return 'linear-gradient(90deg, #fbbf24, #f97316)';
    if (rate >= 20) return 'linear-gradient(90deg, #f97316, #ef4444)';
    return 'linear-gradient(90deg, #ef4444, #be123c)';
  };

  const getRankColor = (rank) => {
    if (rank.startsWith('S')) return '#facc15';
    if (rank.startsWith('A')) return '#22d3ee';
    if (rank.startsWith('B')) return '#4ade80';
    if (rank.startsWith('C')) return '#fb923c';
    if (rank.startsWith('D')) return '#f87171';
    if (rank.startsWith('E')) return '#c084fc';
    return '#6b7280';
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert('結果のURLをコピーしました！');
    });
  };

  return (
    <Layout>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.partners}>
            <span>診断結果</span>
            <span>|</span>
            <span className={styles.partnerBlue}>{user1Name}</span>
            <span>×</span>
            <span className={styles.partnerPurple}>{user2Name}</span>
          </div>
        </div>

        {/* Main Result Card */}
        <div className={`glass ${styles.mainCard}`}>
          {/* Rank */}
          <div className={styles.rank} style={{ color: getRankColor(type.rank) }}>
            {type.rank}
          </div>

          {/* Type Name */}
          <h1 className={styles.typeName}>{type.name}</h1>

          {/* Type Code */}
          <code className={styles.typeCode}>{type.code}</code>

          {/* Icon */}
          <div className={styles.iconWrapper} style={{ background: type.color }}>
            <IconComponent className={styles.icon} />
          </div>

          {/* Description */}
          <p className={styles.description}>{type.description}</p>

          {/* Sync Rate */}
          <div className={styles.syncRate}>
            <div className={styles.syncRateHeader}>
              <span>シンクロ率</span>
              <span className={styles.syncRateValue}>{syncRate}%</span>
            </div>
            <div className={styles.syncRateBar}>
              <div
                className={styles.syncRateFill}
                style={{ 
                  width: `${syncRate}%`,
                  background: getSyncRateColor(syncRate)
                }}
              />
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className={styles.detailsGrid}>
          <div className={`glass ${styles.detailCard}`}>
            <div className={styles.detailHeader}>
              <Sparkles className={styles.detailIconBlue} />
              <h3>おすすめの過ごし方</h3>
            </div>
            <p>{type.recommendedActivity}</p>
          </div>

          <div className={`glass ${styles.detailCard}`}>
            <div className={styles.detailHeader}>
              <Swords className={styles.detailIconPink} />
              <h3>毒舌アドバイス</h3>
            </div>
            <p className={styles.advice}>「{type.sarcasticAdvice}」</p>
          </div>
        </div>

        {/* 4 Axis Analysis */}
        <div className={`glass ${styles.axisCard}`}>
          <h3 className={styles.axisTitle}>4軸分析</h3>
          
          <div className={styles.axisGrid}>
            {renderAxisCard('temperature', '熱量', details.axisDetails.temperature)}
            {renderAxisCard('balance', '重心', details.axisDetails.balance)}
            {renderAxisCard('purpose', '目的', details.axisDetails.purpose)}
            {renderAxisCard('sync', '同期', details.axisDetails.sync)}
          </div>

          <div className={styles.comments}>
            <h4>分析コメント</h4>
            <ul>
              {details.analysisComments.map((comment, index) => (
                <li key={index}>
                  <ChevronRight className={styles.commentIcon} />
                  <span>{comment}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Type Matrix */}
        <div className={`glass ${styles.matrixCard}`}>
          <h3 className={styles.matrixTitle}>16タイプ・マトリックス</h3>
          <div className={styles.matrixGrid}>
            {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16].map((id) => (
              <div
                key={id}
                className={`${styles.matrixItem} ${
                  id === type.id ? styles.matrixItemActive : ''
                }`}
              >
                {typeNames[id]}
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <button onClick={handleShare} className={styles.shareButton}>
            <Share2 className={styles.actionIcon} />
            結果をシェア
          </button>
          <Link href="/" onClick={reset} className={styles.restartButton}>
            <RefreshCw className={styles.actionIcon} />
            もう一度診断する
          </Link>
        </div>
      </div>
    </Layout>
  );
}

function renderAxisCard(key, label, detail) {
  const colors = {
    temperature: 'linear-gradient(135deg, #ef4444, #f97316)',
    balance: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
    purpose: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
    sync: 'linear-gradient(135deg, #22c55e, #10b981)',
  };

  const emojis = {
    temperature: '🔥',
    balance: '⚖️',
    purpose: '🎯',
    sync: '🔗',
  };

  return (
    <div className={styles.axisItem}>
      <div className={styles.axisItemHeader}>
        <span className={styles.axisEmoji}>{emojis[key]}</span>
        <span className={styles.axisLabel}>{label}</span>
      </div>
      <div
        className={styles.axisValue}
        style={{ background: colors[key], WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
      >
        {detail.label}
      </div>
      <div className={styles.axisDesc}>{detail.description}</div>
      <div className={styles.axisBar}>
        <div
          className={styles.axisBarFill}
          style={{ width: `${(detail.score / 2) * 100}%`, background: colors[key] }}
        />
      </div>
    </div>
  );
}
