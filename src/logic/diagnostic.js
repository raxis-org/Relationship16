/**
 * 診断ロジック
 * 4軸スコアリングシステム: 熱量・重心・目的・同期
 */

import { relationTypes, axisThresholds } from '../data/relationTypes';
import questions from '../data/questions';

export function calculateAxisScores(answers) {
  const axisScores = {
    temperature: [],
    balance: [],
    purpose: [],
    sync: [],
    compatibility: [],
  };

  questions.forEach((q) => {
    const answer = answers[q.id];
    if (answer !== undefined && axisScores[q.axis] !== undefined) {
      axisScores[q.axis].push(answer);
    }
  });

  const averages = {};
  for (const [axis, scores] of Object.entries(axisScores)) {
    if (scores.length > 0) {
      averages[axis] = scores.reduce((a, b) => a + b, 0) / scores.length;
    } else {
      averages[axis] = 1;
    }
  }

  return averages;
}

function classifyAxis(score, axisType) {
  const thresholds = axisThresholds[axisType];
  if (!thresholds) return 'neutral';

  if (score >= thresholds.hot || score >= thresholds.equal || 
      score >= thresholds.value || score >= thresholds.sync) {
    return 'high';
  }
  if (score <= thresholds.cold || score <= thresholds.lean || 
      score <= thresholds.loose || score <= thresholds.desync) {
    return 'low';
  }
  return 'neutral';
}

function getAxisLabels(scores) {
  return {
    temperature: classifyAxis(scores.temperature, 'temperature'),
    balance: classifyAxis(scores.balance, 'balance'),
    purpose: classifyAxis(scores.purpose, 'purpose'),
    sync: classifyAxis(scores.sync, 'sync'),
  };
}

export function calculateSyncRate(answers1, answers2) {
  let totalMatch = 0;
  let totalQuestions = 0;
  let compatibilityScore = 0;
  let compatibilityCount = 0;

  const syncQuestions = questions.filter(q => q.axis === 'sync');
  syncQuestions.forEach((q) => {
    const a1 = answers1[q.id];
    const a2 = answers2[q.id];
    if (a1 !== undefined && a2 !== undefined) {
      const diff = Math.abs(a1 - a2);
      totalMatch += (2 - diff) / 2;
      totalQuestions++;
    }
  });

  const compatibilityQuestions = questions.filter(q => q.axis === 'compatibility');
  compatibilityQuestions.forEach((q) => {
    const a1 = answers1[q.id];
    const a2 = answers2[q.id];
    if (a1 !== undefined && a2 !== undefined) {
      compatibilityScore += a1 + a2;
      compatibilityCount += 2;
    }
  });

  const syncMatchRate = totalQuestions > 0 ? totalMatch / totalQuestions : 0.5;
  const compatibilityRate = compatibilityCount > 0 ? 
    compatibilityScore / compatibilityCount / 2 : 0.5;

  const rawSyncRate = (syncMatchRate * 0.6 + compatibilityRate * 0.4) * 100;

  const scores1 = calculateAxisScores(answers1);
  const scores2 = calculateAxisScores(answers2);
  
  const temperatureDiff = Math.abs(scores1.temperature - scores2.temperature);
  const purposeDiff = Math.abs(scores1.purpose - scores2.purpose);
  const penalty = (temperatureDiff + purposeDiff) * 5;
  
  let finalSyncRate = Math.max(5, Math.min(100, rawSyncRate - penalty));
  return Math.round(finalSyncRate);
}

function generateTypeCode(labels) {
  const tempMap = { high: 'HOT', neutral: 'NEUTRAL', low: 'COLD' };
  const balanceMap = { high: 'EQUAL', neutral: 'NEUTRAL', low: 'LEAN' };
  const purposeMap = { high: 'VALUE', neutral: 'NEUTRAL', low: 'LOOSE' };
  const syncMap = { high: 'SYNC', neutral: 'NEUTRAL', low: 'DESYNC' };

  return `${tempMap[labels.temperature]}-${balanceMap[labels.balance]}-${purposeMap[labels.purpose]}-${syncMap[labels.sync]}`;
}

function findRelationType(typeCode, syncRate) {
  let match = relationTypes.find(t => t.code === typeCode);
  
  if (!match) {
    const [temp, balance, purpose, sync] = typeCode.split('-');
    let bestMatch = null;
    let bestScore = -1;
    
    for (const type of relationTypes) {
      let score = 0;
      const [tTemp, tBalance, tPurpose, tSync] = type.code.split('-');
      
      if (tTemp === temp) score += 2;
      if (tBalance === balance) score += 2;
      if (tPurpose === purpose) score += 2;
      if (tSync === sync) score += 2;
      
      if (syncRate >= type.syncRate.min && syncRate <= type.syncRate.max) {
        score += 3;
      }
      
      if (score > bestScore) {
        bestScore = score;
        bestMatch = type;
      }
    }
    
    match = bestMatch || relationTypes[relationTypes.length - 1];
  }
  
  return match;
}

function generateResultDetails(type, syncRate, scores1, scores2) {
  const analysisComments = [];
  
  const avgTemp = (scores1.temperature + scores2.temperature) / 2;
  if (avgTemp >= 1.5) {
    analysisComments.push('二人の間には熱い情熱が流れています。');
  } else if (avgTemp <= 0.5) {
    analysisComments.push('冷静で理性的な関係です。');
  } else {
    analysisComments.push('適度な熱量でバランスが取れています。');
  }

  const avgBalance = (scores1.balance + scores2.balance) / 2;
  if (avgBalance >= 1.5) {
    analysisComments.push('対等なパートナー関係です。');
  } else if (avgBalance <= 0.5) {
    analysisComments.push('どちらかがリードする構図です。');
  }

  const avgPurpose = (scores1.purpose + scores2.purpose) / 2;
  if (avgPurpose >= 1.5) {
    analysisComments.push('共に成長し、何かを生み出すことを目指しています。');
  } else if (avgPurpose <= 0.5) {
    analysisComments.push('心地よさを大切にする、リラックスした関係です。');
  }

  if (syncRate >= 80) {
    analysisComments.push('驚くほど価値観や感性が一致しています。');
  } else if (syncRate >= 50) {
    analysisComments.push('部分的に共通点があります。');
  } else {
    analysisComments.push('価値観や感性に違いがあるようです。');
  }

  const axisDetails = {
    temperature: {
      score: avgTemp,
      label: avgTemp >= 1.5 ? 'Hot' : avgTemp <= 0.5 ? 'Cold' : 'Neutral',
      description: avgTemp >= 1.5 ? '情熱的で感情的' : avgTemp <= 0.5 ? '冷静でドライ' : 'バランス型',
    },
    balance: {
      score: avgBalance,
      label: avgBalance >= 1.5 ? 'Equal' : avgBalance <= 0.5 ? 'Lean' : 'Neutral',
      description: avgBalance >= 1.5 ? '対等な関係' : avgBalance <= 0.5 ? 'どちらかに偏りあり' : 'バランス型',
    },
    purpose: {
      score: avgPurpose,
      label: avgPurpose >= 1.5 ? 'Value' : avgPurpose <= 0.5 ? 'Loose' : 'Neutral',
      description: avgPurpose >= 1.5 ? '成長・生産性重視' : avgPurpose <= 0.5 ? '心地よさ・惰性重視' : 'バランス型',
    },
    sync: {
      score: syncRate / 100 * 2,
      label: syncRate >= 60 ? 'Sync' : syncRate <= 40 ? 'Desync' : 'Neutral',
      description: syncRate >= 60 ? '高い同期' : syncRate <= 40 ? '非同期' : '中庸',
    },
  };

  return {
    analysisComments,
    axisDetails,
  };
}

export function diagnose(answers1, answers2, user1Name = 'パートナーA', user2Name = 'パートナーB') {
  const scores1 = calculateAxisScores(answers1);
  const scores2 = calculateAxisScores(answers2);
  const syncRate = calculateSyncRate(answers1, answers2);

  const avgLabels = {
    temperature: classifyAxis((scores1.temperature + scores2.temperature) / 2, 'temperature'),
    balance: classifyAxis((scores1.balance + scores2.balance) / 2, 'balance'),
    purpose: classifyAxis((scores1.purpose + scores2.purpose) / 2, 'purpose'),
    sync: syncRate >= 60 ? 'high' : syncRate <= 40 ? 'low' : 'neutral',
  };

  const typeCode = generateTypeCode(avgLabels);
  const relationType = findRelationType(typeCode, syncRate);
  const details = generateResultDetails(relationType, syncRate, scores1, scores2);

  return {
    type: relationType,
    syncRate,
    typeCode,
    user1: { name: user1Name, scores: scores1 },
    user2: { name: user2Name, scores: scores2 },
    details,
    timestamp: new Date().toISOString(),
  };
}

export function serializeResult(result) {
  const data = {
    typeId: result.type.id,
    syncRate: result.syncRate,
    user1Name: result.user1.name,
    user2Name: result.user2.name,
    timestamp: result.timestamp,
  };
  return btoa(JSON.stringify(data));
}

export function deserializeResult(serialized) {
  try {
    const data = JSON.parse(atob(serialized));
    const type = relationTypes.find(t => t.id === data.typeId);
    return {
      type,
      syncRate: data.syncRate,
      user1: { name: data.user1Name },
      user2: { name: data.user2Name },
      timestamp: data.timestamp,
    };
  } catch (e) {
    return null;
  }
}

export default {
  diagnose,
  calculateAxisScores,
  calculateSyncRate,
  serializeResult,
  deserializeResult,
};
