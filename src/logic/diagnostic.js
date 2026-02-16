/**
 * 診断ロジック（5段階評価版 - 新4軸対応）
 * 
 * 【評価システム】
 * - 回答形式: 5段階（1-5）→ 内部処理では-2〜+2に変換
 * - 各軸: -3 〜 +3 のスコア
 * - 乖離度: 二人の回答の差を考慮した評価
 * 
 * 【4軸定義】
 * - P軸（Power/権力均衡）: E(Equal/対等的) vs H(Hierarchical/階層的)
 * - M軸（Motive/関与動機）: B(Being/存在的) vs I(Instrumental/手段的)
 * - G軸（Goal/目的整合）: S(Synergetic/共鳴的) vs A(Autonomous/自律的)
 * - V軸（Value/価値共感）: C(Congruent/一致的) vs D(Diverse/多様的)
 */

import { relationTypes, generateTypeCode } from '../data/relationTypes';
import { QUESTIONS, REVERSE_ITEMS } from '../data/questions';

/**
 * 回答値を変換（1-5 → -2〜+2）
 */
function normalizeAnswer(value) {
  return value - 3; // 1->-2, 2->-1, 3->0, 4->1, 5->2
}

/**
 * 各軸のスコアを計算
 * @param {Object} answers - { questionId: number (1-5) }
 * @returns {Object} 各軸のスコア (-3 〜 +3)
 */
export function calculateAxisScores(answers) {
  const axisScores = { P: 0, M: 0, G: 0, V: 0 };
  const axisCounts = { P: 0, M: 0, G: 0, V: 0 };

  // 各質問の回答を集計
  QUESTIONS.forEach((q) => {
    const answer = answers[q.id];
    if (answer === undefined) return;

    let normalizedScore = normalizeAnswer(answer);
    
    // 逆転項目の場合、スコアを反転
    if (REVERSE_ITEMS.includes(q.id)) {
      normalizedScore = -normalizedScore;
    }

    axisScores[q.axis] += normalizedScore;
    axisCounts[q.axis] += 1;
  });

  // 各軸の平均スコアを計算（-2〜+2 → -3〜+3 にスケーリング）
  Object.keys(axisScores).forEach((axis) => {
    const count = axisCounts[axis];
    if (count > 0) {
      // 平均を取ってから1.5倍して-3〜+3の範囲に
      axisScores[axis] = Math.round((axisScores[axis] / count) * 1.5 * 10) / 10;
    }
  });

  return axisScores;
}

/**
 * 乖離度を計算（二人の回答の差）
 * @param {Object} answers1 - ユーザー1の回答
 * @param {Object} answers2 - ユーザー2の回答
 * @returns {Object} 各軸の乖離度と総合乖離度
 */
export function calculateDivergence(answers1, answers2) {
  const axes = ['P', 'M', 'G', 'V'];
  const divergenceByAxis = {};

  for (const axis of axes) {
    const axisQuestions = QUESTIONS.filter(q => q.axis === axis);
    let diffSum = 0;

    axisQuestions.forEach(q => {
      const a1 = normalizeAnswer(answers1[q.id] || 3);
      const a2 = normalizeAnswer(answers2[q.id] || 3);
      // 回答の差の絶対値を加算（最大4）
      diffSum += Math.abs(a1 - a2);
    });

    // 軸ごとの乖離度（0-100%）
    // 最大差: 8問 × 4 = 32
    divergenceByAxis[axis] = Math.round((diffSum / 32) * 100);
  }

  // 総合乖離度（全質問での差）
  let totalDiff = 0;
  QUESTIONS.forEach(q => {
    const a1 = normalizeAnswer(answers1[q.id] || 3);
    const a2 = normalizeAnswer(answers2[q.id] || 3);
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
  const pDiff = Math.abs(scores1.P - scores2.P);
  const mDiff = Math.abs(scores1.M - scores2.M);
  const gDiff = Math.abs(scores1.G - scores2.G);
  const vDiff = Math.abs(scores1.V - scores2.V);

  // スコア差の合計 × 2をペナルティとして減算
  const scorePenalty = (pDiff + mDiff + gDiff + vDiff) * 2;
  syncRate -= scorePenalty;

  // 価値共感軸（V軸）の乖離度が特に重視される
  const vAxisPenalty = divergence.byAxis.V * 0.3;
  syncRate -= vAxisPenalty;

  // 範囲を0-100に制限
  return Math.max(0, Math.min(100, Math.round(syncRate)));
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
  
  // P軸（権力均衡）分析
  const avgP = (scores1.P + scores2.P) / 2;
  if (avgP >= 0) {
    analysisComments.push('二人は対等な立場で、お互いの意見を尊重し合っています。');
  } else {
    analysisComments.push('どちらかがリードし、もう一方が従う構図が見られます。');
  }

  // M軸（関与動機）分析
  const avgM = (scores1.M + scores2.M) / 2;
  if (avgM >= 0) {
    analysisComments.push('相手の存在そのものを大切にする、深い絆があります。');
  } else {
    analysisComments.push('目的や利害関係をベースにした実利的な関係です。');
  }

  // G軸（目的整合）分析
  const avgG = (scores1.G + scores2.G) / 2;
  if (avgG >= 0) {
    analysisComments.push('二人で同じ目標やビジョンを追い求めています。');
  } else {
    analysisComments.push('それぞれが独立した目標を持ち、自立した関係です。');
  }

  // V軸（価値共感）分析
  const avgV = (scores1.V + scores2.V) / 2;
  if (avgV >= 0) {
    analysisComments.push('似た価値観や考え方を持ち、気が合う関係です。');
  } else {
    analysisComments.push('異なる価値観を持ち、それを尊重し合っています。');
  }

  // 乖離度コメント
  if (divergence.total > 50) {
    analysisComments.push('二人の感じ方や考え方に大きな差があります。相手の視点を理解する努力が必要かもしれません。');
  } else if (divergence.total < 30) {
    analysisComments.push('二人は非常に似た感覚を持っています。高い共感が得られる関係です。');
  }

  const axisDetails = {
    P: {
      score: avgP,
      user1: scores1.P,
      user2: scores2.P,
      label: avgP >= 0 ? 'Equal' : 'Hierarchical',
      description: avgP >= 0 ? '対等な関係' : '階層的な関係',
      divergence: divergence.byAxis.P,
    },
    M: {
      score: avgM,
      user1: scores1.M,
      user2: scores2.M,
      label: avgM >= 0 ? 'Being' : 'Instrumental',
      description: avgM >= 0 ? '存在的動機' : '手段的動機',
      divergence: divergence.byAxis.M,
    },
    G: {
      score: avgG,
      user1: scores1.G,
      user2: scores2.G,
      label: avgG >= 0 ? 'Synergetic' : 'Autonomous',
      description: avgG >= 0 ? '共鳴的な目的' : '自律的な目的',
      divergence: divergence.byAxis.G,
    },
    V: {
      score: avgV,
      user1: scores1.V,
      user2: scores2.V,
      label: avgV >= 0 ? 'Congruent' : 'Diverse',
      description: avgV >= 0 ? '価値観が一致' : '価値観が多様',
      divergence: divergence.byAxis.V,
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

  // 乖離度を計算
  const divergence = calculateDivergence(answers1, answers2);

  // シンクロ率を計算（乖離度ベース）
  const syncRate = calculateSyncRate(divergence, scores1, scores2);

  // タイプコードを生成
  const typeCode = generateTypeCode({
    P: (scores1.P + scores2.P) / 2,
    M: (scores1.M + scores2.M) / 2,
    G: (scores1.G + scores2.G) / 2,
    V: (scores1.V + scores2.V) / 2,
  });

  // タイプを取得
  const type = relationTypes.find(t => t.code === typeCode) || relationTypes[0];

  // 詳細結果を生成
  const details = generateResultDetails(type, syncRate, scores1, scores2, divergence);

  return {
    type,
    typeCode,
    syncRate,
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
    typeCode: result.typeCode,
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
      typeCode: data.typeCode,
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
