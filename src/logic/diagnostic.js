/**
 * RelationCheck 16 - 診断ロジック（改良版）
 * 
 * 【4軸の定義】
 * P軸（Power/権力均衡）: H(Hierarchical/階層的) vs E(Equal/対等的)
 * M軸（Motive/関与動機）: I(Instrumental/手段的) vs B(Being/存在的)
 * G軸（Goal/目的整合）: A(Autonomous/自律的) vs S(Synergetic/共鳴的)
 * V軸（Value/価値共感）: D(Diverse/多様的) vs C(Congruent/一致的)
 * 
 * 【16タイプのコード】
 * 例: EBSC = Equal + Being + Synergetic + Congruent
 */

import { relationTypes } from '../data/relationTypes';
import { QUESTIONS, REVERSE_ITEMS, AXES } from '../data/questions';

/**
 * 回答値を正規化（1-5 → -2〜+2）
 * @param {number} value - 元の回答値（1-5）
 * @param {boolean} isReverse - 逆転項目かどうか
 * @returns {number} - 正規化された値（-2〜+2）
 */
function normalizeAnswer(value, isReverse = false) {
  if (value === undefined || value === null) return 0;
  
  // 1-5 → -2〜+2 に変換
  // 1 → -2, 2 → -1, 3 → 0, 4 → +1, 5 → +2
  let normalized = value - 3;
  
  // 逆転項目は符号を反転
  if (isReverse) {
    normalized = -normalized;
  }
  
  return normalized;
}

/**
 * 各軸のスコアを計算
 * @param {Object} answers - { questionId: number (1-5) }
 * @returns {Object} 各軸のスコア (-3 〜 +3)
 */
export function calculateAxisScores(answers) {
  const scores = {
    P: 0, // Power: H(-) vs E(+)
    M: 0, // Motive: I(-) vs B(+)
    G: 0, // Goal: A(-) vs S(+)
    V: 0, // Value: D(-) vs C(+)
  };

  // 各軸ごとに計算
  for (const axis of ['P', 'M', 'G', 'V']) {
    const axisQuestions = QUESTIONS.filter(q => q.axis === axis);
    let sum = 0;
    let count = 0;

    for (const q of axisQuestions) {
      const answer = answers[q.id];
      if (answer !== undefined && answer !== null) {
        const isReverse = REVERSE_ITEMS.includes(q.id);
        const normalized = normalizeAnswer(answer, isReverse);
        sum += normalized;
        count++;
      }
    }

    // 平均を計算し、-3〜+3の範囲にスケーリング
    // 最大: 8問 × 2 = 16 → 8問とも+2なら +3
    // 最小: 8問 × (-2) = -16 → 8問とも-2なら -3
    if (count > 0) {
      const average = sum / count; // -2〜+2
      scores[axis] = Math.round(average * 1.5 * 10) / 10; // -3〜+3、小数点第1位
    } else {
      scores[axis] = 0;
    }
  }

  return scores;
}

/**
 * 乖離度を計算（二人の回答の差）
 * @param {Object} answers1 - ユーザー1の回答
 * @param {Object} answers2 - ユーザー2の回答
 * @returns {Object} 各軸の乖離度と総合乖離度
 */
export function calculateDivergence(answers1, answers2) {
  const divergenceByAxis = {};

  for (const axis of ['P', 'M', 'G', 'V']) {
    const axisQuestions = QUESTIONS.filter(q => q.axis === axis);
    let diffSum = 0;

    for (const q of axisQuestions) {
      const a1 = normalizeAnswer(answers1[q.id], REVERSE_ITEMS.includes(q.id));
      const a2 = normalizeAnswer(answers2[q.id], REVERSE_ITEMS.includes(q.id));
      // 回答の差の絶対値を加算（最大4）
      diffSum += Math.abs(a1 - a2);
    }

    // 軸ごとの乖離度（0-100%）
    // 最大差: 8問 × 4 = 32
    divergenceByAxis[axis] = Math.min(100, Math.round((diffSum / 32) * 100));
  }

  // 総合乖離度（全質問での差）
  let totalDiff = 0;
  for (const q of QUESTIONS) {
    const a1 = normalizeAnswer(answers1[q.id], REVERSE_ITEMS.includes(q.id));
    const a2 = normalizeAnswer(answers2[q.id], REVERSE_ITEMS.includes(q.id));
    totalDiff += Math.abs(a1 - a2);
  }
  // 最大差: 32問 × 4 = 128
  const totalDivergence = Math.min(100, Math.round((totalDiff / 128) * 100));

  return {
    byAxis: divergenceByAxis,
    total: totalDivergence,
  };
}

/**
 * シンクロ率を計算
 * @param {Object} divergence - 乖離度データ
 * @param {Object} scores1 - ユーザー1の軸スコア
 * @param {Object} scores2 - ユーザー2の軸スコア
 * @returns {number} シンクロ率（0-100%）
 */
export function calculateSyncRate(divergence, scores1, scores2) {
  // 基本シンクロ率 = 100 - 総合乖離度
  let syncRate = 100 - divergence.total;

  // 軸スコアの差によるペナルティ
  const pDiff = Math.abs(scores1.P - scores2.P);
  const mDiff = Math.abs(scores1.M - scores2.M);
  const gDiff = Math.abs(scores1.G - scores2.G);
  const vDiff = Math.abs(scores1.V - scores2.V);

  // スコア差の合計 × 3をペナルティとして減算
  const scorePenalty = (pDiff + mDiff + gDiff + vDiff) * 3;
  syncRate -= scorePenalty;

  // V軸（価値共感）の乖離度が特に重視される
  const vAxisPenalty = divergence.byAxis.V * 0.4;
  syncRate -= vAxisPenalty;

  // 範囲を0-100に制限
  return Math.max(0, Math.min(100, Math.round(syncRate)));
}

/**
 * 軸スコアからタイプを判定
 * @param {number} score - 軸スコア（-3 〜 +3）
 * @returns {string} 'positive' | 'negative'
 */
function classifyAxis(score) {
  // 0の場合、微小なランダム性を加える（同点回避）
  if (score === 0) {
    const randomOffset = (Math.random() - 0.5) * 0.1;
    score += randomOffset;
  }
  
  // 0以上ならpositive（右側）、0未満ならnegative（左側）
  return score >= 0 ? 'positive' : 'negative';
}

/**
 * スコアからタイプコードを生成
 * @param {Object} scores - 各軸のスコア
 * @param {number} totalDivergence - 総合乖離度
 * @returns {string} 4文字のタイプコード（例: EBSC）
 */
function generateTypeCode(scores, totalDivergence) {
  // 各軸を分類
  const classifications = {
    P: classifyAxis(scores.P), // H(-) vs E(+)
    M: classifyAxis(scores.M), // I(-) vs B(+)
    G: classifyAxis(scores.G), // A(-) vs S(+)
    V: classifyAxis(scores.V), // D(-) vs C(+)
  };

  // マッピング: positive → 右側のコード, negative → 左側のコード
  const codeMap = {
    P: { positive: 'E', negative: 'H' },
    M: { positive: 'B', negative: 'I' },
    G: { positive: 'S', negative: 'A' },
    V: { positive: 'C', negative: 'D' },
  };

  // 乖離度が高い場合（45%以上）、V軸をDiverseに傾ける傾向
  // 価値観が大きく異なる場合は、一致ではなく多様として扱う
  let vCode = codeMap.V[classifications.V];
  if (totalDivergence > 45 && classifications.V === 'positive' && scores.V < 0.5) {
    vCode = 'D'; // わずかにプラスでも乖離度が高ければDiverseに
  }

  // タイプコードを生成（P-M-G-Vの順）
  return codeMap.P[classifications.P] + 
         codeMap.M[classifications.M] + 
         codeMap.G[classifications.G] + 
         vCode;
}

/**
 * タイプコードから16タイプを特定
 * @param {string} typeCode - タイプコード（4文字）
 * @returns {Object} 関係性タイプ
 */
function findRelationType(typeCode) {
  // 完全一致を探す
  let match = relationTypes.find(t => t.code === typeCode);
  
  if (!match) {
    // 部分一致で最も近いタイプを探す
    let bestMatch = null;
    let bestScore = -1;
    
    for (const type of relationTypes) {
      let score = 0;
      for (let i = 0; i < 4; i++) {
        if (type.code[i] === typeCode[i]) score += 2;
      }
      
      if (score > bestScore) {
        bestScore = score;
        bestMatch = type;
      }
    }
    
    match = bestMatch || relationTypes[0];
  }
  
  return match;
}

/**
 * 二人の平均スコアを計算
 * @param {Object} scores1 - ユーザー1のスコア
 * @param {Object} scores2 - ユーザー2のスコア
 * @returns {Object} 平均スコア
 */
function calculateAverageScores(scores1, scores2) {
  return {
    P: (scores1.P + scores2.P) / 2,
    M: (scores1.M + scores2.M) / 2,
    G: (scores1.G + scores2.G) / 2,
    V: (scores1.V + scores2.V) / 2,
  };
}

/**
 * メイン診断関数
 * @param {Object} answers1 - ユーザー1の回答 { questionId: number (1-5) }
 * @param {Object} answers2 - ユーザー2の回答
 * @param {string} user1Name - ユーザー1の名前
 * @param {string} user2Name - ユーザー2の名前
 * @returns {Object} 診断結果
 */
export function diagnose(answers1, answers2, user1Name = 'パートナーA', user2Name = 'パートナーB') {
  // 各ユーザーの軸スコアを計算
  const scores1 = calculateAxisScores(answers1);
  const scores2 = calculateAxisScores(answers2);

  // 平均スコア（関係性の特徴を決定）
  const avgScores = calculateAverageScores(scores1, scores2);

  // 乖離度を計算
  const divergence = calculateDivergence(answers1, answers2);

  // シンクロ率を計算
  const syncRate = calculateSyncRate(divergence, scores1, scores2);

  // タイプコードを生成（平均スコアから）
  const typeCode = generateTypeCode(avgScores, divergence.total);

  // 16タイプを特定
  const relationType = findRelationType(typeCode);

  // 結果を返す
  return {
    type: relationType,
    typeCode: typeCode,
    syncRate: syncRate,
    divergence: divergence.total,
    user1: {
      name: user1Name,
      scores: scores1,
    },
    user2: {
      name: user2Name,
      scores: scores2,
    },
    details: {
      avgScores,
      divergence,
    },
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
    typeCode: result.type.code,
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
    const type = relationTypes.find(t => t.code === data.typeCode);
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
