/**
 * 関係性診断質問データ（5段階評価版）
 * 
 * 【設計方針】
 * - 各軸：2方向（正・負）× 2視点（自分・相手）× 2問 = 32問
 * - 回答：5段階（+2, +1, 0, -1, -2）
 *   +2: はい（大丸）
 *   +1: どちらかというとはい（中丸）
 *   0: どちらでもない（小丸）
 *   -1: どちらかというといいえ（中丸）
 *   -2: いいえ（大丸）
 * 
 * 【4軸定義】
 * - temperature（熱量）: 感情的・能動的 ↔ 冷静・ドライ
 * - balance（重心）: 対等・相互 ↔ 依存・一方通行
 * - purpose（目的）: 成長・生産性 ↔ 安心・安定
 * - sync（同期）: 価値観一致 ↔ 価値観相違
 */

/**
 * 回答オプション定義
 */
export const answerOptions = [
  { value: 2, label: 'はい', size: 'large', type: 'positive-strong' },
  { value: 1, label: 'どちらか\nというと\nはい', size: 'medium', type: 'positive-weak' },
  { value: 0, label: 'どちらで\nもない', size: 'small', type: 'neutral' },
  { value: -1, label: 'どちらか\nというと\nいいえ', size: 'medium', type: 'negative-weak' },
  { value: -2, label: 'いいえ', size: 'large', type: 'negative-strong' },
];

export const questions = [
  // ============================================
  // 熱量軸（Hot/Cold）- 8問
  // ============================================
  
  // --- Hot方向（自分）---
  {
    id: 1,
    axis: 'temperature',
    direction: 'hot',
    perspective: 'self',
    text: '相手と過ごした後、帰り道にふと笑顔になっている自分に気づくことがある',
  },
  {
    id: 2,
    axis: 'temperature',
    direction: 'hot',
    perspective: 'self',
    text: '相手の話を聞いていると、つい身振り手振りが大きくなってしまう',
  },
  
  // --- Cold方向（自分）---
  {
    id: 3,
    axis: 'temperature',
    direction: 'cold',
    perspective: 'self',
    text: '相手といる時、時計を気にせずゆっくり時間が過ぎる感覚がある',
  },
  {
    id: 4,
    axis: 'temperature',
    direction: 'cold',
    perspective: 'self',
    text: '相手との会話中、感情のまま言葉を発する前に一度考える時間が生まれる',
  },
  
  // --- Hot方向（相手）---
  {
    id: 5,
    axis: 'temperature',
    direction: 'hot',
    perspective: 'other',
    text: '相手は話す時、目を輝かせて身を乗り出すことが多い',
  },
  {
    id: 6,
    axis: 'temperature',
    direction: 'hot',
    perspective: 'other',
    text: '相手は思い立ったらすぐ行動に移すタイプだと感じる',
  },
  
  // --- Cold方向（相手）---
  {
    id: 7,
    axis: 'temperature',
    direction: 'cold',
    perspective: 'other',
    text: '相手は物事を分析する時、まるで他人事のように客観的に語ることがある',
  },
  {
    id: 8,
    axis: 'temperature',
    direction: 'cold',
    perspective: 'other',
    text: '相手は感情が高ぶっている時でも、声のトーンがあまり変わらない',
  },

  // ============================================
  // 重心軸（Equal/Lean）- 8問
  // ============================================
  
  // --- Equal方向（自分）---
  {
    id: 9,
    axis: 'balance',
    direction: 'equal',
    perspective: 'self',
    text: '相手に頼み事をする時、断られることを気にせず気軽に言える',
  },
  {
    id: 10,
    axis: 'balance',
    direction: 'equal',
    perspective: 'self',
    text: '二人で何かを決める時、どちらかが我慢している感覚がない',
  },
  
  // --- Lean方向（自分）---
  {
    id: 11,
    axis: 'balance',
    direction: 'lean',
    perspective: 'self',
    text: '相手の意見を聞くと、自分の考えが自然と後回しになってしまうことがある',
  },
  {
    id: 12,
    axis: 'balance',
    direction: 'lean',
    perspective: 'self',
    text: '相手が困っている時、自分が助けないと気が済まない感覚がある',
  },
  
  // --- Equal方向（相手）---
  {
    id: 13,
    axis: 'balance',
    direction: 'equal',
    perspective: 'other',
    text: '相手は自分の意見に対して、必ず「どう思う？」と聞いてくる',
  },
  {
    id: 14,
    axis: 'balance',
    direction: 'equal',
    perspective: 'other',
    text: '相手は自分が拒否した時、同等の拒否を恐れない様子を見せる',
  },
  
  // --- Lean方向（相手）---
  {
    id: 15,
    axis: 'balance',
    direction: 'lean',
    perspective: 'other',
    text: '相手は自分の前では、少し子供っぽく見える面がある',
  },
  {
    id: 16,
    axis: 'balance',
    direction: 'lean',
    perspective: 'other',
    text: '相手は自分の決断を待っているような、期待に満ちた視線を向けることがある',
  },

  // ============================================
  // 目的軸（Value/Loose）- 8問
  // ============================================
  
  // --- Value方向（自分）---
  {
    id: 17,
    axis: 'purpose',
    direction: 'value',
    perspective: 'self',
    text: '相手と会うと、普段やらない新しいことに挑戦したくなる',
  },
  {
    id: 18,
    axis: 'purpose',
    direction: 'value',
    perspective: 'self',
    text: 'この関係を「成長の機会」と感じる瞬間がある',
  },
  
  // --- Loose方向（自分）---
  {
    id: 19,
    axis: 'purpose',
    direction: 'loose',
    perspective: 'self',
    text: '相手といると、何も考えずにぼーっとしたくなる',
  },
  {
    id: 20,
    axis: 'purpose',
    direction: 'loose',
    perspective: 'self',
    text: '相手との時間は、成果を求められない「逃げ場」のような感覚がある',
  },
  
  // --- Value方向（相手）---
  {
    id: 21,
    axis: 'purpose',
    direction: 'value',
    perspective: 'other',
    text: '相手は「次は何をしようか」と積極的に提案してくる',
  },
  {
    id: 22,
    axis: 'purpose',
    direction: 'value',
    perspective: 'other',
    text: '相手は二人で「何かを成し遂げたい」という言葉を口にする',
  },
  
  // --- Loose方向（相手）---
  {
    id: 23,
    axis: 'purpose',
    direction: 'loose',
    perspective: 'other',
    text: '相手は「何もしない時間」こそが大切だと語ることがある',
  },
  {
    id: 24,
    axis: 'purpose',
    direction: 'loose',
    perspective: 'other',
    text: '相手は今の関係を「変えたい」とはあまり言わない',
  },

  // ============================================
  // 同期軸（Sync/Desync）- 8問
  // ============================================
  
  // --- Sync方向（自分）---
  {
    id: 25,
    axis: 'sync',
    direction: 'sync',
    perspective: 'self',
    text: '相手が言いかけたことを、自分も同時に言おうとしていたことがある',
  },
  {
    id: 26,
    axis: 'sync',
    direction: 'sync',
    perspective: 'self',
    text: '相手の好きなものを、理由を説明せずに「わかる」と感じる',
  },
  
  // --- Desync方向（自分）---
  {
    id: 27,
    axis: 'sync',
    direction: 'desync',
    perspective: 'self',
    text: '相手が感動している時、自分はそこまで感じていないことがある',
  },
  {
    id: 28,
    axis: 'sync',
    direction: 'desync',
    perspective: 'self',
    text: '相手の価値観に、どこか違和感を覚える部分がある',
  },
  
  // --- Sync方向（相手）---
  {
    id: 29,
    axis: 'sync',
    direction: 'sync',
    perspective: 'other',
    text: '相手は自分の言葉の「間」や「言わない部分」を読み取ってくれる',
  },
  {
    id: 30,
    axis: 'sync',
    direction: 'sync',
    perspective: 'other',
    text: '相手は「そうそう、それ！」と自分の感覚を肯定してくれることが多い',
  },
  
  // --- Desync方向（相手）---
  {
    id: 31,
    axis: 'sync',
    direction: 'desync',
    perspective: 'other',
    text: '相手は自分が面白いと思う話を、別の角度から解釈することがある',
  },
  {
    id: 32,
    axis: 'sync',
    direction: 'desync',
    perspective: 'other',
    text: '相手は自分が気にしないことを、意外と気にしている様子を見せる',
  },
];

/**
 * 質問の総数
 */
export const TOTAL_QUESTIONS = questions.length;

/**
 * 軸ごとの質問数
 */
export const QUESTIONS_PER_AXIS = 8;

export default questions;
