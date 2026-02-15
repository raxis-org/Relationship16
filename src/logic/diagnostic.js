/**
 * RelationCheck 16 - 診断ロジック
 * 4軸スコアリングシステム
 * 
 * 4軸：
 * P: Power (権力均衡) - H: Hierarchical / E: Equal
 * M: Motive (関与動機) - I: Instrumental / B: Being  
 * G: Goal (目的整合) - A: Autonomous / S: Synergetic
 * V: Value (価値共感) - D: Diverse / C: Congruent
 */

import { QUESTIONS, REVERSE_ITEMS, getQuestionsByAxis } from '../data/questions';
import { getTypeByCode, generateTypeCode } from '../data/relationTypes';

/**
 * 回答を処理（逆転項目を変換）
 * 1-5の回答を処理し、逆転項目は6-Rに変換
 */
export function processAnswer(questionId, value) {
  if (REVERSE_ITEMS.includes(questionId)) {
    return 6 - value;
  }
  return value;
}

/**
 * 生スコアを計算
 * 各軸の生の平均スコアを算出
 */
export function calculateRawScores(answers) {
  const scores = { P: [], M: [], G: [], V: [] };
  
  // 0以上ならpositive、0未満ならnegative（neutralはない）
  return score >= 0 ? 'positive' : 'negative';
}

/**
 * タイプコードを生成（NEUTRALなし）
 * @param {Object} labels - 各軸の分類（'positive' | 'negative'）
 * @param {number} totalDivergence - 総合乖離度
 * @returns {string} タイプコード
 * 
 * 16タイプのうちの1つに必ず該当する（2^4 = 16パターン）
 */
function generateTypeCode(labels, totalDivergence) {
  // 乖離度が高い場合（40%以上）、SyncをDesyncに傾ける
  // ただしneutralにはしない（必ずSYNCまたはDESYNCのどちらか）
  let syncLabel = labels.sync;
  if (totalDivergence > 40 && labels.sync === 'positive') {
    // 高乖離度でSyncの場合、Desyncに変更（ただしスコアが同点の場合のみ）
    syncLabel = 'negative';
  }

  // 2値マッピング（NEUTRALはなし）
  const tempMap = { positive: 'HOT', negative: 'COLD' };
  const balanceMap = { positive: 'EQUAL', negative: 'LEAN' };
  const purposeMap = { positive: 'VALUE', negative: 'LOOSE' };
  const syncMap = { positive: 'SYNC', negative: 'DESYNC' };

  return `${tempMap[labels.temperature]}-${balanceMap[labels.balance]}-${purposeMap[labels.purpose]}-${syncMap[syncLabel]}`;
}

/**
 * タイプコードから16タイプを特定
 * @param {string} typeCode - タイプコード
 * @returns {Object} 関係性タイプ
 */
function findRelationType(typeCode) {
  // 完全一致を探す
  let match = relationTypes.find(t => t.code === typeCode);
  
  if (!match) {
    // 近似タイプを探す
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
      
      if (score > bestScore) {
        bestScore = score;
        bestMatch = type;
      }
    }
    
    match = bestMatch || relationTypes[0];
  }
  
  return result;
}

/**
 * ペアスコアを計算
 * 二人のスコアを統合
 */
export function calculatePairScores(scores1, scores2) {
  const pair = {};
  const gap = {};
  
  for (const axis of ['P', 'M', 'G', 'V']) {
    pair[axis] = (scores1[axis] + scores2[axis]) / 2;
    gap[axis] = Math.abs(scores1[axis] - scores2[axis]);
  }
  
  return { pair, gap };
}

/**
 * シンクロ率を計算
 * 二人の回答の一致度を算出
 */
export function calculateSyncRate(answers1, answers2) {
  let totalDiff = 0;
  let count = 0;
  
  QUESTIONS.forEach(q => {
    const a1 = answers1[q.id];
    const a2 = answers2[q.id];
    
    if (a1 !== undefined && a2 !== undefined) {
      const p1 = processAnswer(q.id, a1);
      const p2 = processAnswer(q.id, a2);
      totalDiff += Math.abs(p1 - p2);
      count++;
    }
  });
  
  if (count === 0) return 50;
  
  // 最大差4を基準にシンクロ率を計算
  const avgDiff = totalDiff / count;
  const syncRate = Math.round((1 - avgDiff / 4) * 100);
  
  return Math.max(0, Math.min(100, syncRate));
}

/**
 * 軸詳細情報を生成
 */
export function generateAxisDetails(pairScores, gapScores) {
  const details = {};
  
  const axisConfig = {
    P: { name: 'Power', nameJa: '権力均衡', left: 'H', right: 'E', threshold: 3.0 },
    M: { name: 'Motive', nameJa: '関与動機', left: 'I', right: 'B', threshold: 3.0 },
    G: { name: 'Goal', nameJa: '目的整合', left: 'A', right: 'S', threshold: 3.0 },
    V: { name: 'Value', nameJa: '価値共感', left: 'D', right: 'C', threshold: 3.0 },
  };
  
  for (const [axis, config] of Object.entries(axisConfig)) {
    const score = pairScores[axis];
    const isRight = score >= config.threshold;
    
    details[axis] = {
      score,
      gap: gapScores[axis],
      label: isRight ? config.right : config.left,
      description: isRight 
        ? getRightDescription(axis)
        : getLeftDescription(axis),
      isRight,
      threshold: config.threshold,
    };
  }
  
  return details;
}

function getRightDescription(axis) {
  const descriptions = {
    P: '対等なパワーバランス。お互いの意見を平等に尊重し、協力して意思決定を行います。',
    M: '存在的な関与。相手の存在そのものを愛し、条件付けられない深い絆があります。',
    G: '共鳴的な目標。二人で同じビジョンを追い求め、協力して達成しようとします。',
    V: '一致した価値観。根本的な考え方や感性が似ており、自然と気が合います。',
  };
  return descriptions[axis];
}

function getLeftDescription(axis) {
  const descriptions = {
    P: '主従関係。どちらか一方がリードし、もう一方が従う形が自然です。',
    M: '手段的な関与。利害関係や目的達成のために関係を維持しています。',
    G: '独立した目標。それぞれが個別の目標を持ち、互いに干渉しすぎません。',
    V: '多様な価値観。異なる価値観を持ち、それを尊重し合っています。',
  };
  return descriptions[axis];
}

/**
 * 回答比較データを生成
 */
export function generateAnswerComparison(answers1, answers2) {
  return QUESTIONS.map(q => {
    const a1 = answers1[q.id];
    const a2 = answers2[q.id];
    const p1 = processAnswer(q.id, a1);
    const p2 = processAnswer(q.id, a2);
    
    return {
      questionId: q.id,
      axis: q.axis,
      code: q.code,
      text: q.text,
      user1: { raw: a1, processed: p1 },
      user2: { raw: a2, processed: p2 },
      gap: Math.abs(p1 - p2),
    };
  });
}

/**
 * 診断を実行
 */
export function diagnose(answers1, answers2, user1Name = 'パートナーA', user2Name = 'パートナーB') {
  // 各ユーザーの軸スコアを計算
  const scores1 = calculateAxisScores(answers1);
  const scores2 = calculateAxisScores(answers2);

  // 乖離度を計算
  const divergence = calculateDivergence(answers1, answers2);

  // シンクロ率を計算（乖離度ベース）
  const syncRate = calculateSyncRate(divergence, scores1, scores2);

  // 各軸を分類
  const labels = {
    temperature: classifyAxis((scores1.temperature + scores2.temperature) / 2, 'temperature'),
    balance: classifyAxis((scores1.balance + scores2.balance) / 2, 'balance'),
    purpose: classifyAxis((scores1.purpose + scores2.purpose) / 2, 'purpose'),
    sync: classifyAxis((scores1.sync + scores2.sync) / 2, 'sync'),
  };

  // タイプコードを生成
  const typeCode = generateTypeCode(labels, divergence.total);

  // 16タイプを特定
  const relationType = findRelationType(typeCode);

  // 詳細結果を生成
  const details = generateResultDetails(relationType, syncRate, scores1, scores2, divergence);

  return {
    type,
    typeCode,
    syncRate,
    scores: {
      user1: rawScores1,
      user2: rawScores2,
      pair: pairScores,
      gap: gapScores,
      axisDetails,
    },
    details: {
      axisDetails,
      analysisComments: generateAnalysisComments(axisDetails, syncRate),
    },
    answerComparison,
    users: {
      user1: { name: user1Name },
      user2: { name: user2Name },
    },
    timestamp: new Date().toISOString(),
  };
}

/**
 * 分析コメントを生成
 */
function generateAnalysisComments(axisDetails, syncRate) {
  const comments = [];
  
  // シンクロ率に基づくコメント
  if (syncRate >= 80) {
    comments.push('二人の認識は驚くほど一致しています。深い相互理解がある関係です。');
  } else if (syncRate >= 60) {
    comments.push('概ね共通の認識を持ち、良好なコミュニケーションが取れています。');
  } else if (syncRate >= 40) {
    comments.push('認識に一定の差異があります。対話を通じて相互理解を深める余地があります。');
  } else {
    comments.push('認識の違いが大きいです。意図的なコミュニケーションが重要です。');
  }
  
  // 各軸の分析
  const pDetail = axisDetails.P;
  if (pDetail.isRight) {
    comments.push('対等な関係で、お互いの意見を尊重し合っています。');
  } else {
    comments.push('どちらかがリードし、もう一方がサポートする形が自然です。');
  }
  
  const mDetail = axisDetails.M;
  if (mDetail.isRight) {
    comments.push('相手の存在そのものを大切にする、深い絆があります。');
  } else {
    comments.push('目的や利害関係をベースにした実利的な関係です。');
  }
  
  return comments;
}

export default {
  diagnose,
  calculateRawScores,
  calculatePairScores,
  calculateSyncRate,
  processAnswer,
};
