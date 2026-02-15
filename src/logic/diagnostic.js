/**
 * 新診断ロジック（5段階評価版）
 * 
 * 【評価システム】
 * - 回答形式: 5段階（+2, +1, 0, -1, -2）
 *   +2: はい（大丸）
 *   +1: どちらかというとはい（中丸）
 *   0: どちらでもない（小丸）
 *   -1: どちらかというといいえ（中丸）
 *   -2: いいえ（大丸）
 * - 各軸: -3 〜 +3 のスコア
 * - 乖離度: 二人の回答の差を考慮した評価
 * 
 * 【計算手順】
 * 1. 各軸の正・負方向の回答値の合計を計算
 * 2. 軸スコア = (正方向合計 - 負方向合計) / 8問 × 1.5
 * 3. 乖離度 = Σ|自分の回答 - 相手の回答| / (質問数 × 4) × 100%
 * 4. タイプ判定 = 軸スコアの符号と乖離度から決定
 */

import { relationTypes } from '../data/relationTypes';
import { questions } from '../data/questions';

/**
 * 各軸のスコアを計算
 * @param {Object} answers - { questionId: number (-2〜+2) }
 * @returns {Object} 各軸のスコア (-3 〜 +3)
 */
export function calculateAxisScores(answers) {
  const axes = {
    temperature: { positive: 'hot', negative: 'cold', score: 0 },
    balance: { positive: 'equal', negative: 'lean', score: 0 },
    purpose: { positive: 'value', negative: 'loose', score: 0 },
    sync: { positive: 'sync', negative: 'desync', score: 0 },
  };

  for (const [axisName, axisConfig] of Object.entries(axes)) {
    // 正方向の質問（自分視点・相手視点 各2問）
    const positiveQs = questions.filter(
      q => q.axis === axisName && q.direction === axisConfig.positive
    );
    // 負方向の質問
    const negativeQs = questions.filter(
      q => q.axis === axisName && q.direction === axisConfig.negative
    );

    // 回答値の合計を計算（-2〜+2）
    const positiveSum = positiveQs.reduce((sum, q) => {
      const answer = answers[q.id];
      return sum + (answer !== undefined ? answer : 0);
    }, 0);
    
    const negativeSum = negativeQs.reduce((sum, q) => {
      const answer = answers[q.id];
      return sum + (answer !== undefined ? answer : 0);
    }, 0);

    // スコア計算: (正方向合計 - 負方向合計) / 8問 × 1.5
    // 最大: (4問×2 + 4問×2) / 8 × 1.5 = 3
    // 最小: -(4問×2 + 4問×2) / 8 × 1.5 = -3
    const rawScore = ((positiveSum - negativeSum) / 8) * 1.5;
    axisConfig.score = Math.round(rawScore * 10) / 10; // 小数点第1位まで
  }

  return {
    temperature: axes.temperature.score,
    balance: axes.balance.score,
    purpose: axes.purpose.score,
    sync: axes.sync.score,
  };
}

/**
 * 乖離度を計算（二人の回答の差）
 * 5段階評価（-2〜+2）の差を考慮
 * @param {Object} answers1 - ユーザー1の回答
 * @param {Object} answers2 - ユーザー2の回答
 * @returns {Object} 各軸の乖離度と総合乖離度
 */
export function calculateDivergence(answers1, answers2) {
  const axes = ['temperature', 'balance', 'purpose', 'sync'];
  const divergenceByAxis = {};

  for (const axis of axes) {
    const axisQuestions = questions.filter(q => q.axis === axis);
    let diffSum = 0;

    axisQuestions.forEach(q => {
      const a1 = answers1[q.id] || 0;
      const a2 = answers2[q.id] || 0;
      // 回答の差の絶対値を加算（最大4）
      diffSum += Math.abs(a1 - a2);
    });

    // 軸ごとの乖離度（0-100%）
    // 最大差: 8問 × 4 = 32
    divergenceByAxis[axis] = Math.round((diffSum / 32) * 100);
  }

  // 総合乖離度（全質問での差）
  let totalDiff = 0;
  questions.forEach(q => {
    const a1 = answers1[q.id] || 0;
    const a2 = answers2[q.id] || 0;
    totalDiff += Math.abs(a1 - a2);
  });
  // 最大差: 32問 × 4 = 128
  const totalDivergence = Math.round((totalDiff / 128) * 100);

  return {
    byAxis: divergenceByAxis,
    total: totalDivergence,
  };
}

/**
 * シンクロ率を計算（乖離度から逆算）
 * @param {Object} divergence - 乖離度データ
 * @param {Object} scores1 - ユーザー1の軸スコア
 * @param {Object} scores2 - ユーザー2の軸スコア
 * @returns {number} シンクロ率（0-100%）
 */
export function calculateSyncRate(divergence, scores1, scores2) {
  // 基本シンクロ率 = 100 - 総合乖離度
  let syncRate = 100 - divergence.total;

  // 軸スコアの差によるペナルティ
  const tempDiff = Math.abs(scores1.temperature - scores2.temperature);
  const balanceDiff = Math.abs(scores1.balance - scores2.balance);
  const purposeDiff = Math.abs(scores1.purpose - scores2.purpose);
  const syncDiff = Math.abs(scores1.sync - scores2.sync);

  // スコア差の合計 × 2をペナルティとして減算
  const scorePenalty = (tempDiff + balanceDiff + purposeDiff + syncDiff) * 2;
  syncRate -= scorePenalty;

  // 同期軸の乖離度が特に重視される
  const syncAxisPenalty = divergence.byAxis.sync * 0.3;
  syncRate -= syncAxisPenalty;

  // 範囲を0-100に制限
  return Math.max(0, Math.min(100, Math.round(syncRate)));
}

/**
 * 軸スコアからラベルを取得（2値のみ）
 * @param {number} score - 軸スコア（-3 〜 +3）
 * @returns {string} 'positive' | 'negative'
 * 
 * 【重要】neutralは存在しない。必ず16タイプのどれかに分類される。
 * スコアが0の場合は、微小なランダム性を加えて振り分ける。
 */
function classifyAxis(score) {
  // 0ちょうどの場合、微小なランダム性を加える（同点回避）
  // これにより必ずpositiveまたはnegativeのどちらかになる
  if (score === 0) {
    // -0.05 〜 +0.05 のランダム値を加える
    const randomOffset = (Math.random() - 0.5) * 0.1;
    score += randomOffset;
  }
  
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
 * @param {number} syncRate - シンクロ率
 * @returns {Object} 関係性タイプ
 */
function findRelationType(typeCode, syncRate) {
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
      
      // シンクロ率の範囲も考慮
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

/**
 * 診断結果の詳細を生成
 * @param {Object} type - 関係性タイプ
 * @param {number} syncRate - シンクロ率
 * @param {Object} scores1 - ユーザー1の軸スコア
 * @param {Object} scores2 - ユーザー2の軸スコア
 * @param {Object} divergence - 乖離度データ
 * @returns {Object} 詳細な診断結果
 */
function generateResultDetails(type, syncRate, scores1, scores2, divergence) {
  const analysisComments = [];
  
  // 熱量分析（neutralなし）
  const avgTemp = (scores1.temperature + scores2.temperature) / 2;
  if (avgTemp >= 0) {
    analysisComments.push('二人の間には熱い情熱が流れています。感情の高ぶりを共有している関係です。');
  } else {
    analysisComments.push('冷静で落ち着いた関係です。感情的にならず、安定したやり取りが特徴です。');
  }

  // 重心分析（neutralなし）
  const avgBalance = (scores1.balance + scores2.balance) / 2;
  if (avgBalance >= 0) {
    analysisComments.push('対等なパートナー関係です。お互いに尊重し合っています。');
  } else {
    analysisComments.push('どちらかがリードし、もう一方が従う構図です。依存関係が見られます。');
  }

  // 目的分析（neutralなし）
  const avgPurpose = (scores1.purpose + scores2.purpose) / 2;
  if (avgPurpose >= 0) {
    analysisComments.push('共に成長し、何かを生み出すことを目指しています。前向きな関係です。');
  } else {
    analysisComments.push('心地よさを大切にする、リラックスした関係です。無理のない付き合いが特徴です。');
  }

  // 同期分析（乖離度を考慮）
  if (syncRate >= 80) {
    analysisComments.push('驚くほど価値観や感性が一致しています。言葉にしなくても通じ合っています。');
  } else if (syncRate >= 50) {
    analysisComments.push('部分的に共通点がありますが、異なる部分も認め合っている関係です。');
  } else {
    analysisComments.push(`価値観や感性に違いがあるようです（乖離度${divergence.total}%）。互いの違いを理解することが課題です。`);
  }

  // 乖離度コメント
  if (divergence.total > 50) {
    analysisComments.push('二人の感じ方や考え方に大きな差があります。相手の視点を理解する努力が必要かもしれません。');
  } else if (divergence.total < 30) {
    analysisComments.push('二人は非常に似た感覚を持っています。高い共感が得られる関係です。');
  }

  const axisDetails = {
    temperature: {
      score: avgTemp,
      user1: scores1.temperature,
      user2: scores2.temperature,
      // neutralなし：0以上ならHot、0未満ならCold
      label: avgTemp >= 0 ? 'Hot' : 'Cold',
      description: avgTemp >= 0 ? '情熱的で感情的' : '冷静でドライ',
      divergence: divergence.byAxis.temperature,
    },
    balance: {
      score: avgBalance,
      user1: scores1.balance,
      user2: scores2.balance,
      label: avgBalance >= 0 ? 'Equal' : 'Lean',
      description: avgBalance >= 0 ? '対等な関係' : 'どちらかに偏りあり',
      divergence: divergence.byAxis.balance,
    },
    purpose: {
      score: avgPurpose,
      user1: scores1.purpose,
      user2: scores2.purpose,
      label: avgPurpose >= 0 ? 'Value' : 'Loose',
      description: avgPurpose >= 0 ? '成長・生産性重視' : '心地よさ・安定重視',
      divergence: divergence.byAxis.purpose,
    },
    sync: {
      score: syncRate / 100 * 3 - 1.5, // -1.5 ~ +1.5に変換
      // neutralなし：55%以上ならSync、それ未満ならDesync
      label: syncRate >= 55 ? 'Sync' : 'Desync',
      description: syncRate >= 55 ? '高い同期' : '非同期',
      divergence: divergence.byAxis.sync,
    },
  };

  return {
    analysisComments,
    axisDetails,
    divergence,
  };
}

/**
 * メイン診断関数
 * @param {Object} answers1 - ユーザー1の回答 { questionId: number (-2〜+2) }
 * @param {Object} answers2 - ユーザー2の回答
 * @param {string} user1Name - ユーザー1の名前
 * @param {string} user2Name - ユーザー2の名前
 * @returns {Object} 診断結果
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
  const relationType = findRelationType(typeCode, syncRate);

  // 詳細結果を生成
  const details = generateResultDetails(relationType, syncRate, scores1, scores2, divergence);

  return {
    type: relationType,
    syncRate,
    typeCode,
    divergence: divergence.total,
    user1: {
      name: user1Name,
      scores: scores1,
    },
    user2: {
      name: user2Name,
      scores: scores2,
    },
    details,
    timestamp: new Date().toISOString(),
  };
}

/**
 * 診断結果をシリアライズ
 * @param {Object} result - 診断結果
 * @returns {string} Base64エンコードされた結果
 */
export function serializeResult(result) {
  const data = {
    typeId: result.type.id,
    syncRate: result.syncRate,
    divergence: result.divergence,
    user1Name: result.user1.name,
    user2Name: result.user2.name,
    timestamp: result.timestamp,
  };
  return btoa(JSON.stringify(data));
}

/**
 * シリアライズされた結果をデシリアライズ
 * @param {string} serialized - Base64エンコードされた結果
 * @returns {Object} 診断結果
 */
export function deserializeResult(serialized) {
  try {
    const data = JSON.parse(atob(serialized));
    const type = relationTypes.find(t => t.id === data.typeId);
    return {
      type,
      syncRate: data.syncRate,
      divergence: data.divergence,
      user1: { name: data.user1Name },
      user2: { name: data.user2Name },
      timestamp: data.timestamp,
    };
  } catch (e) {
    return null;
  }
}

const diagnostic = {
  diagnose,
  calculateAxisScores,
  calculateDivergence,
  calculateSyncRate,
  serializeResult,
  deserializeResult,
};

export default diagnostic;
