'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../../../components/Layout';
import { useDiagnose } from '../../../context/DiagnoseContext';

export default function User1Redirect() {
  const router = useRouter();
  const { user1Name, getCompletedBlockCount } = useDiagnose();

  useEffect(() => {
    if (!user1Name) {
      router.push('/diagnose');
      return;
    }

    // 完了済みのブロック数に基づいて次のブロックへ自動遷移
    const completedCount = getCompletedBlockCount('user1');
    const axisOrder = ['temperature', 'balance', 'purpose', 'sync'];
    
    if (completedCount >= 4) {
      // 全ブロック完了 → パートナーBへ
      router.push('/diagnose/user2');
    } else {
      // 次の未完了ブロックへ
      const nextAxis = axisOrder[completedCount];
      router.push(`/diagnose/user1/block/${nextAxis}`);
    }
  }, [user1Name, getCompletedBlockCount, router]);

  return (
    <Layout>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '60vh',
        fontSize: '1.125rem',
        color: '#636e72'
      }}>
        読み込み中...
      </div>
    </Layout>
  );
}
