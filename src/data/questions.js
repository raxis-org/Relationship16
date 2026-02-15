/**
 * Kizuna-Mode（絆モード）診断用質問データ
 * 4軸（P/M/G/V）× 8問 = 32問
 * 
 * 回答形式: 1〜5の5段階
 * 逆転項目: 1, 4, 9, 24, 28（計算時に 6-R に変換）
 */

// 4軸コード定義
export const AXES = {
  P: {
    id: 'P',
    name: 'Power',
    nameJa: '権力均衡',
    left: { code: 'H', name: 'Hierarchical', nameJa: '主従・依存', desc: '主従・依存・先導' },
    right: { code: 'E', name: 'Equal', nameJa: '対等・共治', desc: '対等・共治・フラット' },
    color: '#e74c3c',
    bgColor: '#fdf2f2',
  },
  M: {
    id: 'M',
    name: 'Motive',
    nameJa: '関与動機',
    left: { code: 'I', name: 'Instrumental', nameJa: '手段的', desc: '目的達成の道具・利害' },
    right: { code: 'B', name: 'Being', nameJa: '存在的', desc: '相手の存在自体が目的・愛' },
    color: '#f1c40f',
    bgColor: '#fefcf3',
  },
  G: {
    id: 'G',
    name: 'Goal',
    nameJa: '目的整合',
    left: { code: 'A', name: 'Autonomous', nameJa: '独立', desc: '個別の目標・干渉しない' },
    right: { code: 'S', name: 'Synergetic', nameJa: '共鳴', desc: '同じ目標・ビジョンの共有' },
    color: '#27ae60',
    bgColor: '#f2f9f5',
  },
  V: {
    id: 'V',
    name: 'Value',
    nameJa: '価値共感',
    left: { code: 'D', name: 'Diverse', nameJa: '多様性', desc: '異なる価値観・補完関係' },
    right: { code: 'C', name: 'Congruent', nameJa: '一致', desc: '似た価値観・同質性' },
    color: '#3498db',
    bgColor: '#f0f7fb',
  },
};

// 逆転項目のID
export const REVERSE_ITEMS = [1, 4, 9, 24, 28];

// 質問データ
export const QUESTIONS = [
  // ===== P軸（Power/権力均衡）8問 =====
  { id: 1, axis: 'P', code: 'P1', text: '何か決める時、どちらか一方の意見が最終的に通ることが多い。', isReverse: true },
  { id: 2, axis: 'P', code: 'P2', text: '相手に対して、自分の本音を遠慮なく伝えることができる。', isReverse: false },
  { id: 3, axis: 'P', code: 'P3', text: '二人の関係において、パワーバランスは常に50:50であると感じる。', isReverse: false },
  { id: 4, axis: 'P', code: 'P4', text: '相手の顔色を伺って、自分の行動を無意識に変えてしまうことがある。', isReverse: true },
  { id: 5, axis: 'P', code: 'P5', text: 'お互いにお願いごとをされた時、断ることに心理的な抵抗がない。', isReverse: false },
  { id: 6, axis: 'P', code: 'P6', text: '二人は精神的に自立しており、過度に依存し合っていない。', isReverse: false },
  { id: 7, axis: 'P', code: 'P7', text: '相手の意見が自分と異なっていても、それを尊重し、受け入れることができる。', isReverse: false },
  { id: 8, axis: 'P', code: 'P8', text: '私は、この関係性において、より多くの責任や負担を担っていると感じる。', isReverse: false },

  // ===== M軸（Motive/関与動機）8問 =====
  { id: 9, axis: 'M', code: 'M1', text: '相手と一緒にいるのは、何らかの目的やメリットがあるからだ。', isReverse: true },
  { id: 10, axis: 'M', code: 'M2', text: '相手が何かを成し遂げた時、自分のことのように嬉しい。', isReverse: false },
  { id: 11, axis: 'M', code: 'M3', text: '相手の欠点や弱さも含めて、その人自身に深い興味がある。', isReverse: false },
  { id: 12, axis: 'M', code: 'M4', text: '二人で過ごす時間は、効率や目的達成よりも「ただ一緒にいる心地よさ」を重視している。', isReverse: false },
  { id: 13, axis: 'M', code: 'M5', text: 'たとえ相手に何のメリットも提供できなくなったとしても、この関係は続くと信じている。', isReverse: false },
  { id: 14, axis: 'M', code: 'M6', text: '相手が本当に困っているなら、自分を多少犠牲にしてでも助けたいと思う。', isReverse: false },
  { id: 15, axis: 'M', code: 'M7', text: '相手との関係は、恋愛や友情といった言葉だけでは表現できない、特別なつながりだと感じる。', isReverse: false },
  { id: 16, axis: 'M', code: 'M8', text: '相手の存在そのものが、自分の日々の活力になっている。', isReverse: false },

  // ===== G軸（Goal/目的整合）8問 =====
  { id: 17, axis: 'G', code: 'G1', text: '二人で共有している具体的な「目標」や「夢」が存在する。', isReverse: false },
  { id: 18, axis: 'G', code: 'G2', text: '私たちは「一つのチーム」として、共通の課題に取り組んでいる感覚がある。', isReverse: false },
  { id: 19, axis: 'G', code: 'G3', text: '個人の成功よりも、二人の共通の目標が達成されることを優先したい。', isReverse: false },
  { id: 20, axis: 'G', code: 'G4', text: '相手の夢や目標をサポートすることが、自分の喜びにも繋がっている。', isReverse: false },
  { id: 21, axis: 'G', code: 'G5', text: '二人が目指している将来の方向性は、驚くほど似ている。', isReverse: false },
  { id: 22, axis: 'G', code: 'G6', text: '困難に直面した時、二人の解決策は自然と同じ方向を向くことが多い。', isReverse: false },
  { id: 23, axis: 'G', code: 'G7', text: '二人の未来について具体的に話す時、ワクワクした気持ちになる。', isReverse: false },
  { id: 24, axis: 'G', code: 'G8', text: '正直なところ、二人の長期的な目標は異なっていると感じる。', isReverse: true },

  // ===== V軸（Value/価値共感）8問 =====
  { id: 25, axis: 'V', code: 'V1', text: '金銭感覚や時間の使い方が、相手と非常に近いと感じる。', isReverse: false },
  { id: 26, axis: 'V', code: 'V2', text: '大切にしている倫理観や道徳観が、根本的に一致している。', isReverse: false },
  { id: 27, axis: 'V', code: 'V3', text: 'ユーモアのセンスや笑いのツボが似ていて、一緒にいて心から笑える。', isReverse: false },
  { id: 28, axis: 'V', code: 'V4', text: '相手の考え方や価値観に、時々ついていけないと感じることがある。', isReverse: true },
  { id: 29, axis: 'V', code: 'V5', text: '「何が正しいか」という議論で、意見が真っ向から対立することは少ない。', isReverse: false },
  { id: 30, axis: 'V', code: 'V6', text: '生活のリズムや休日の過ごし方が似ており、一緒にいてストレスを感じない。', isReverse: false },
  { id: 31, axis: 'V', code: 'V7', text: '相手の持つ独特な価値観は、自分にとって新しい発見や刺激になっている。', isReverse: false },
  { id: 32, axis: 'V', code: 'V8', text: '相手の価値観を理解し、尊重することは、自分自身の成長にも繋がると感じる。', isReverse: false },
];

// 軸ごとの質問を取得
export function getQuestionsByAxis(axisId) {
  return QUESTIONS.filter(q => q.axis === axisId);
}

// 回答を処理（逆転項目を変換）
export function processAnswer(questionId, value) {
  const question = QUESTIONS.find(q => q.id === questionId);
  if (!question) return value;
  
  // 逆転項目は 6 - R に変換
  if (question.isReverse) {
    return 6 - value;
  }
  return value;
}

// 旧データ互換用（非推奨）
export const questions = QUESTIONS;
export const axes = AXES;
export default QUESTIONS;
