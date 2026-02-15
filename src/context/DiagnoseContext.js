'use client';

import { createContext, useContext, useState, useCallback } from 'react';

const DiagnoseContext = createContext(null);

export function DiagnoseProvider({ children }) {
  // ユーザー基本情報
  const [user1Name, setUser1Name] = useState('');
  const [user2Name, setUser2Name] = useState('');
  const [user1MBTI, setUser1MBTI] = useState('');
  const [user2MBTI, setUser2MBTI] = useState('');
  const [user1Age, setUser1Age] = useState('');
  const [user2Age, setUser2Age] = useState('');
  const [category, setCategory] = useState('friend');

  // 回答データ
  const [user1Answers, setUser1Answers] = useState({});
  const [user2Answers, setUser2Answers] = useState({});

  // ブロック完了状態
  const [completedBlocks, setCompletedBlocks] = useState({
    user1: [],
    user2: [],
  });

  // 結果
  const [result, setResult] = useState(null);

  const reset = useCallback(() => {
    setUser1Name('');
    setUser2Name('');
    setUser1MBTI('');
    setUser2MBTI('');
    setUser1Age('');
    setUser2Age('');
    setCategory('friend');
    setUser1Answers({});
    setUser2Answers({});
    setCompletedBlocks({ user1: [], user2: [] });
    setResult(null);
  }, []);

  const setUser1Answer = useCallback((questionId, value) => {
    setUser1Answers(prev => ({ ...prev, [questionId]: value }));
  }, []);

  const setUser2Answer = useCallback((questionId, value) => {
    setUser2Answers(prev => ({ ...prev, [questionId]: value }));
  }, []);

  const markBlockComplete = useCallback((user, axis) => {
    setCompletedBlocks(prev => ({
      ...prev,
      [user]: [...prev[user], axis],
    }));
  }, []);

  const getCompletedBlockCount = useCallback((user) => {
    return completedBlocks[user]?.length || 0;
  }, [completedBlocks]);

  const value = {
    // ユーザー情報
    user1Name,
    setUser1Name,
    user2Name,
    setUser2Name,
    user1MBTI,
    setUser1MBTI,
    user2MBTI,
    setUser2MBTI,
    user1Age,
    setUser1Age,
    user2Age,
    setUser2Age,
    category,
    setCategory,
    
    // 回答
    user1Answers,
    setUser1Answers,
    user2Answers,
    setUser2Answers,
    setUser1Answer,
    setUser2Answer,
    
    // ブロック管理
    completedBlocks,
    markBlockComplete,
    getCompletedBlockCount,
    
    // 結果
    result,
    setResult,
    reset,
  };

  return (
    <DiagnoseContext.Provider value={value}>
      {children}
    </DiagnoseContext.Provider>
  );
}

export function useDiagnose() {
  const context = useContext(DiagnoseContext);
  if (!context) {
    throw new Error('useDiagnose must be used within DiagnoseProvider');
  }
  return context;
}

export default DiagnoseContext;
