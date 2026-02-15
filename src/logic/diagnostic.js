/**
 * Kizuna-Mode 診断ロジック
 * 4軸（P/M/G/V）スコアリングシステム
 */

import { QUESTIONS, REVERSE_ITEMS, processAnswer, generateTypeCode, getTypeByCode } from '../data/questions';

/**
 * 個人の回答から各軸の生スコアを計算
 * @param {Object} answers - { questionId: answerValue }
 * @returns {Object} - { P: number, M: number, G: number, V: number }
 */
export function calculateRawScores(answers) {
  const axisScores = { P: [], M: [], G: [], V: [] };

  QUESTIONS.forEach((q) => {
    const answer = answers[q.id];
    if (answer !== undefined) {
      const processedValue = processAnswer(q.id, answer);
      axisScores[q.axis].push(processedValue);
    }
  });

  const averages = {};
  for (const [axis, scores] of Object.entries(axisScores)) {
    if (scores.length > 0) {
      averages[axis] = scores.reduce((a, b) => a + b, 0) / scores.length;
    } else {
      averages[axis] = 3.0; // デフォルト値
    }
  }

  return averages;
}

/**
 * MBTIに基づく補正値を計算
 * @param {string} mbti - 例: "INTJ"
 * @returns {Object} - { P: number, M: number, G: number, V: number }
 */
export function calculateMBTICorrection(mbti) {
  if (!mbti || mbti.length !== 4) {
    return { P: 0, M: 0, G: 0, V: 0 };
  }

  const corrections = { P: 0, M: 0, G: 0, V: 0 };
  const type = mbti.toUpperCase();

  // I/EによるP軸補正
  if (type[0] === 'I') corrections.P += 0.3;
  else if (type[0] === 'E') corrections.P -= 0.1;

  // T/FによるM軸補正
  if (type[2] === 'T') corrections.M += 0.25;
  else if (type[2] === 'F') corrections.M -= 0.1;

  // J/PによるG軸補正
  if (type[3] === 'J') corrections.G += 0.15;
  else if (type[3] === 'P') corrections.G -= 0.1;

  // S/NによるV軸補正
  if (type[1] === 'S') corrections.V += 0.1;
  else if (type[1] === 'N') corrections.V -= 0.1;

  return corrections;
}

/**
 * 年齢差に基づくP軸閾値補正
 * @param {number} age1 
 * @param {number} age2 
 * @returns {number} - 閾値への補正値
 */
export function calculateAgeGapCorrection(age1, age2) {
  if (!age1 || !age2) return 0;
  
  const ageDiff = Math.abs(age1 - age2);
  
  if (ageDiff <= 3) return 0;
  if (ageDiff <= 10) return -0.15;
  return -0.3;
}

/**
 * 調整済みスコアを計算
 * @param {Object} rawScores 
 * @param {Object} mbtiCorrections 
 * @returns {Object} - 調整済みスコア
 */
export function calculateAdjustedScores(rawScores, mbtiCorrections) {
  const adjusted = {};
  for (const axis of ['P', 'M', 'G', 'V']) {
    adjusted[axis] = Math.max(1.0, Math.min(5.0, 
      rawScores[axis] + (mbtiCorrections[axis] || 0)
    ));
  }
  return adjusted;
}

/**
 * ペアスコアを計算
 * @param {Object} scores1 - 調整済みスコアA
 * @param {Object} scores2 - 調整済みスコアB
 * @returns {Object} - { pair: {}, gap: {} }
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
 * 関係性カテゴリに基づく閾値を取得
 * @param {string} category - lover/friend/work/family
 * @returns {Object} - { P: number, M: number, G: number, V: number }
 */
export function getThresholdsByCategory(category) {
  const thresholds = {
    lover: { P: 3.0, M: 3.2, G: 3.0, V: 2.8 },
    friend: { P: 3.0, M: 2.8, G: 2.8, V: 3.0 },
    work: { P: 3.2, M: 2.5, G: 3.2, V: 2.8 },
    family: { P: 2.8, M: 3.0, G: 2.8, V: 3.0 },
  };
  return thresholds[category] || thresholds.friend;
}

/**
 * 総合スコアを計算
 * @param {Object} pairScores 
 * @param {Object} gapScores 
 * @param {Object} thresholds 
 * @returns {Object} - { fitScore, stabilityScore, kizunaScore }
 */
export function calculateOverallScores(pairScores, gapScores, thresholds) {
  // Fit Score: 各軸のスコアが閾値からどれだけ明確に離れているか
  let fitSum = 0;
  for (const axis of ['P', 'M', 'G', 'V']) {
    fitSum += Math.abs(pairScores[axis] - thresholds[axis]);
  }
  const fitScore = (fitSum / 4) / 2.0 * 100;

  // Stability Score: 認識のズレがどれだけ小さいか
  let stabilitySum = 0;
  for (const axis of ['P', 'M', 'G', 'V']) {
    stabilitySum += 1 - gapScores[axis] / 4.0;
  }
  const stabilityScore = (stabilitySum / 4) * 100;

  // Kizuna Score
  const kizunaScore = 0.4 * fitScore + 0.6 * stabilityScore;

  return {
    fitScore: Math.round(fitScore),
    stabilityScore: Math.round(stabilityScore),
    kizunaScore: Math.round(kizunaScore),
  };
}

/**
 * 診断を実行
 * @param {Object} params
 * @returns {Object} - 診断結果
 */
export function diagnose({
  answers1,
  answers2,
  user1Name = 'パートナーA',
  user2Name = 'パートナーB',
  user1MBTI = '',
  user2MBTI = '',
  user1Age = 0,
  user2Age = 0,
  category = 'friend',
}) {
  // 1. 生スコア計算
  const rawScores1 = calculateRawScores(answers1);
  const rawScores2 = calculateRawScores(answers2);

  // 2. MBTI補正
  const mbtiCorr1 = calculateMBTICorrection(user1MBTI);
  const mbtiCorr2 = calculateMBTICorrection(user2MBTI);

  // 3. 調整済みスコア
  const adjustedScores1 = calculateAdjustedScores(rawScores1, mbtiCorr1);
  const adjustedScores2 = calculateAdjustedScores(rawScores2, mbtiCorr2);

  // 4. ペアスコア
  const { pair: pairScores, gap: gapScores } = calculatePairScores(adjustedScores1, adjustedScores2);

  // 5. 閾値取得と年齢差補正
  const thresholds = { ...getThresholdsByCategory(category) };
  const ageCorrection = calculateAgeGapCorrection(user1Age, user2Age);
  thresholds.P += ageCorrection;

  // 6. タイプコード判定
  const typeCode = generateTypeCode({
    P: pairScores.P,
    M: pairScores.M,
    G: pairScores.G,
    V: pairScores.V,
  });

  // 7. タイプ情報取得
  const typeInfo = getTypeByCode(typeCode);

  // 8. 総合スコア計算
  const overallScores = calculateOverallScores(pairScores, gapScores, thresholds);

  // 9. 回答比較データ作成
  const answerComparison = QUESTIONS.map(q => {
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

  // 10. 軸ごとの詳細
  const axisDetails = {};
  for (const axis of ['P', 'M', 'G', 'V']) {
    axisDetails[axis] = {
      user1: adjustedScores1[axis],
      user2: adjustedScores2[axis],
      pair: pairScores[axis],
      gap: gapScores[axis],
      threshold: thresholds[axis],
      isRight: pairScores[axis] >= thresholds[axis],
    };
  }

  return {
    type: typeInfo,
    typeCode,
    codeDescription: `${pairScores.P >= thresholds.P ? 'E' : 'H'}${pairScores.M >= thresholds.M ? 'B' : 'I'}${pairScores.G >= thresholds.G ? 'S' : 'A'}${pairScores.V >= thresholds.V ? 'C' : 'D'}`,
    scores: {
      fitScore: overallScores.fitScore,
      stabilityScore: overallScores.stabilityScore,
      kizunaScore: overallScores.kizunaScore,
      axisDetails,
    },
    users: {
      user1: { name: user1Name, mbti: user1MBTI, age: user1Age },
      user2: { name: user2Name, mbti: user2MBTI, age: user2Age },
    },
    answerComparison,
    category,
    timestamp: new Date().toISOString(),
  };
}

export default {
  diagnose,
  calculateRawScores,
  calculateAdjustedScores,
  calculatePairScores,
  calculateOverallScores,
};
