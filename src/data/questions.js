/**
 * RelationCheck 16 - 関係性診断質問データ（5段階評価版）
 * 4軸：P（権力均衡）/ M（関与動機）/ G（目的整合）/ V（価値共感）
 * 
 * 【回答オプション】
 * - 5段階（1-5）で回答
 * - 1: いいえ（強く反対）
 * - 3: どちらでもない
 * - 5: はい（強く同意）
 */

/**
 * 回答オプション定義
 */
export const answerOptions = [
  { value: 1, label: 'いいえ', emoji: '✕', description: '全くそう思わない' },
  { value: 2, label: 'どちらかと\nいえばいいえ', emoji: '△', description: 'あまりそう思わない' },
  { value: 3, label: 'どちらで\nもない', emoji: '◯', description: 'どちらともいえない' },
  { value: 4, label: 'どちらかと\nいえばはい', emoji: '◯', description: 'ややそう思う' },
  { value: 5, label: 'はい', emoji: '◎', description: '強くそう思う' },
];

/**
 * 逆転項目（高いスコアが左側を示す項目）
 */
export const REVERSE_ITEMS = [4, 11, 12, 20, 21, 28, 29];

/**
 * 質問データ
 * 32問（各軸8問）
 */
export const QUESTIONS = [
  // ============================================
  // P軸（Power: 権力均衡）- 8問
  // Left: H(Hierarchical/階層的) / Right: E(Equal/対等的)
  // ============================================
  {
    id: 1,
    code: 'P1',
    axis: 'P',
    text: '相手の意見に対して、自分から反論しにくいと感じることがある',
  },
  {
    id: 2,
    code: 'P2',
    axis: 'P',
    text: '二人で何かを決める時、お互いの意見を平等に扱っていると感じる',
  },
  {
    id: 3,
    code: 'P3',
    axis: 'P',
    text: '相手には自分が及ばない部分があり、その差を意識することがある',
  },
  {
    id: 4,
    code: 'P4',
    axis: 'P',
    text: '相手に意見を言う時、遠慮なく本音を言える',
  },
  {
    id: 5,
    code: 'P5',
    axis: 'P',
    text: '相手からのアドバイスや指導を受けることが多い',
  },
  {
    id: 6,
    code: 'P6',
    axis: 'P',
    text: '二人の関係で、どちらかがリードしているという感覚がない',
  },
  {
    id: 7,
    code: 'P7',
    axis: 'P',
    text: '自分の方が相手より知識や経験が豊富だと感じることがある',
  },
  {
    id: 8,
    code: 'P8',
    axis: 'P',
    text: '相手と対等な立場で意見を交換し合える',
  },

  // ============================================
  // M軸（Motive: 関与動機）- 8問
  // Left: I(Instrumental/手段的) / Right: B(Being/存在的)
  // ============================================
  {
    id: 9,
    code: 'M1',
    axis: 'M',
    text: '相手との関係は、自分にとって何かの利益やメリットがある',
  },
  {
    id: 10,
    code: 'M2',
    axis: 'M',
    text: '相手の存在そのものが、自分にとって大切だと感じる',
  },
  {
    id: 11,
    code: 'M3',
    axis: 'M',
    text: '相手と過ごす時間は、何かを得るための時間だと感じることが多い',
  },
  {
    id: 12,
    code: 'M4',
    axis: 'M',
    text: '相手といる理由を説明する必要がない、特別な存在だと感じる',
  },
  {
    id: 13,
    code: 'M5',
    axis: 'M',
    text: '相手からの支援や助けを期待している',
  },
  {
    id: 14,
    code: 'M6',
    axis: 'M',
    text: '相手の幸せを心から願い、そのために行動することがある',
  },
  {
    id: 15,
    code: 'M7',
    axis: 'M',
    text: '相手との関係を維持するのは、将来的な利益のためだと感じることがある',
  },
  {
    id: 16,
    code: 'M8',
    axis: 'M',
    text: '相手の存在が、自分の人生に意味や豊かさをもたらしている',
  },

  // ============================================
  // G軸（Goal: 目的整合）- 8問
  // Left: A(Autonomous/自律的) / Right: S(Synergetic/共鳴的)
  // ============================================
  {
    id: 17,
    code: 'G1',
    axis: 'G',
    text: '自分の目標は、相手の目標とは別に独立していると感じる',
  },
  {
    id: 18,
    code: 'G2',
    axis: 'G',
    text: '二人で同じ未来や目標を描いていると感じる',
  },
  {
    id: 19,
    code: 'G3',
    axis: 'G',
    text: '相手の目標達成は、自分の目標達成とは別の問題だと感じる',
  },
  {
    id: 20,
    code: 'G4',
    axis: 'G',
    text: '相手と一緒に何かを成し遂げたいという気持ちが強い',
  },
  {
    id: 21,
    code: 'G5',
    axis: 'G',
    text: '自分の人生設計に相手を含める必要はないと感じることがある',
  },
  {
    id: 22,
    code: 'G6',
    axis: 'G',
    text: '相手と協力し合って、共通の目標に向かっている',
  },
  {
    id: 23,
    code: 'G7',
    axis: 'G',
    text: 'それぞれが独立した道を歩むのが自然だと感じる',
  },
  {
    id: 24,
    code: 'G8',
    axis: 'G',
    text: '二人の夢や目標が重なり合っていると感じる',
  },

  // ============================================
  // V軸（Value: 価値共感）- 8問
  // Left: D(Diverse/多様的) / Right: C(Congruent/一致的)
  // ============================================
  {
    id: 25,
    code: 'V1',
    axis: 'V',
    text: '相手と価値観や考え方が似ていると感じる',
  },
  {
    id: 26,
    code: 'V2',
    axis: 'V',
    text: '相手の価値観は自分とは異なると感じることがある',
  },
  {
    id: 27,
    code: 'V3',
    axis: 'V',
    text: '大切にしていることが、相手と共通している',
  },
  {
    id: 28,
    code: 'V4',
    axis: 'V',
    text: '相手と自分では、物事の優先順位が異なると感じる',
  },
  {
    id: 29,
    code: 'V5',
    axis: 'V',
    text: '相手の考え方や感じ方が、自分とよく似ている',
  },
  {
    id: 30,
    code: 'V6',
    axis: 'V',
    text: '相手との間に価値観の違いを感じることがある',
  },
  {
    id: 31,
    code: 'V7',
    axis: 'V',
    text: '相手の言っていることが、自分の考えと一致することが多い',
  },
  {
    id: 32,
    code: 'V8',
    axis: 'V',
    text: '相手と自分では、物事の捉え方が異なると感じる',
  },
];

/**
 * 旧名でのエクスポート（互換性のため）
 */
export const questions = QUESTIONS;

/**
 * 質問の総数
 */
export const TOTAL_QUESTIONS = QUESTIONS.length;

/**
 * 軸ごとの質問数
 */
export const QUESTIONS_PER_AXIS = 8;

/**
 * 4軸定義
 */
export const AXES = {
  P: {
    id: 'P',
    code: 'P',
    name: 'Power',
    nameJa: '権力均衡',
    left: { code: 'H', nameJa: '階層的', description: 'どちらかがリードし、もう一方が従う関係' },
    right: { code: 'E', nameJa: '対等的', description: 'お互いに対等で、意見を尊重し合う関係' },
    color: '#e74c3c',
  },
  M: {
    id: 'M',
    code: 'M',
    name: 'Motive',
    nameJa: '関与動機',
    left: { code: 'I', nameJa: '手段的', description: '目的や利害関係をベースにした実利的な関係' },
    right: { code: 'B', nameJa: '存在的', description: '相手の存在そのものを大切にする深い絆' },
    color: '#f39c12',
  },
  G: {
    id: 'G',
    code: 'G',
    name: 'Goal',
    nameJa: '目的整合',
    left: { code: 'A', nameJa: '自律的', description: 'それぞれが独立した目標を持つ関係' },
    right: { code: 'S', nameJa: '共鳴的', description: '二人で同じ目標やビジョンを追い求める関係' },
    color: '#27ae60',
  },
  V: {
    id: 'V',
    code: 'V',
    name: 'Value',
    nameJa: '価値共感',
    left: { code: 'D', nameJa: '多様的', description: '異なる価値観を持ち、それを尊重し合う関係' },
    right: { code: 'C', nameJa: '一致的', description: '似た価値観や考え方を持ち、気が合う関係' },
    color: '#3498db',
  },
};

/**
 * 軸の順序
 */
export const AXIS_ORDER = ['P', 'M', 'G', 'V'];

/**
 * 軸ごとの質問を取得
 */
export function getQuestionsByAxis(axisId) {
  return QUESTIONS.filter(q => q.axis === axisId);
}

export default QUESTIONS;
