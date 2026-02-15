'use client';

import { createContext, useContext, useState, useCallback } from 'react';

const DiagnoseContext = createContext(null);

export function DiagnoseProvider({ children }) {
  const [user1Name, setUser1Name] = useState('');
  const [user2Name, setUser2Name] = useState('');
  const [user1Answers, setUser1Answers] = useState({});
  const [user2Answers, setUser2Answers] = useState({});
  const [result, setResult] = useState(null);

  const reset = useCallback(() => {
    setUser1Name('');
    setUser2Name('');
    setUser1Answers({});
    setUser2Answers({});
    setResult(null);
  }, []);

  const setUser1Answer = useCallback((questionId, value) => {
    setUser1Answers(prev => ({ ...prev, [questionId]: value }));
  }, []);

  const setUser2Answer = useCallback((questionId, value) => {
    setUser2Answers(prev => ({ ...prev, [questionId]: value }));
  }, []);

  const value = {
    user1Name,
    setUser1Name,
    user2Name,
    setUser2Name,
    user1Answers,
    setUser1Answers,
    user2Answers,
    setUser2Answers,
    setUser1Answer,
    setUser2Answer,
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
