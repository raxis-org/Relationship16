/**
 * Kizuna-Mode 16の関係性タイプ定義
 * 4軸（P/M/G/V）の組み合わせによる16タイプ
 */

export const RELATION_TYPES = {
  // E___系（Power: Equal）
  EBSC: {
    code: 'EBSC',
    name: '運命の双子',
    rank: 'SS',
    description: '全ての軸で調和が取れた理想的な関係。互いの価値観、目標、存在意義が完璧に一致し、対等な立場で深い絆を結んでいます。',
    recommendedActivity: '共同での創造活動、長期的なビジョン共有、互いの夢を応援し合う時間',
    badActivity: '些細な意見の対立を恐れて本音を隠すこと、過度な気遣いによる遠慮',
    color: '#9b59b6',
  },
  EBSD: {
    code: 'EBSD',
    name: '最強の相棒',
    rank: 'S',
    description: '価値観の違いを強みに変える戦友。目標と存在意義は共有しつつ、異なる価値観から新しい視点を得られる関係です。',
    recommendedActivity: '未知の分野への挑戦、健全なディベート、お互いの価値観を学び合う対話',
    badActivity: '自分の価値観を相手に無理強いすること、価値観の違いを争いの種にすること',
    color: '#3498db',
  },
  EASC: {
    code: 'EASC',
    name: '心地よい隣人',
    rank: 'A',
    description: '互いの独立性を尊重し合う、安定した関係。対等で価値観も一致しているが、個々の目標を大切にする健康的な距離感があります。',
    recommendedActivity: '同じ空間で別々の作業、定期的な近況報告会、お互いの個人時間を尊重すること',
    badActivity: '過度な干渉や相手のプライベートへの踏み込み、個人の目標を無視した束縛',
    color: '#27ae60',
  },
  EASD: {
    code: 'EASD',
    name: '知的な探検隊',
    rank: 'A',
    description: '個々の自由を尊重しつつ、知的好奇心で繋がる。対等で独立した関係でありながら、異なる価値観への関心が好奇心を刺激します。',
    recommendedActivity: '共通の趣味のサークル参加、新しいスキルの学習、互いの専門分野での情報交換',
    badActivity: '常に一緒に行動して一人の時間をなくすこと、価値観の違いから生じる誤解を放置すること',
    color: '#1abc9c',
  },
  EBAC: {
    code: 'EBAC',
    name: '良きライバル',
    rank: 'B+',
    description: '目的は違えど、互いの存在が成長の糧となる。対等で相手の存在自体を大切にしつつ、個別の目標で競い合う刺激的な関係です。',
    recommendedActivity: 'スキルアップのための勉強会、互いの成果発表、フレンドリーな競争',
    badActivity: '相手の成功を妬み足を引っ張ること、競争が過熱して関係を損なうこと',
    color: '#f1c40f',
  },
  EBAD: {
    code: 'EBAD',
    name: '刺激的な他者',
    rank: 'B',
    description: '異なる価値観と目標が、常に新鮮な発見を生む。対等で相手を大切にしつつ、全ての点で異なる価値観が新しい世界を開きます。',
    recommendedActivity: '海外旅行、普段行かない場所でのデート、互いの世界観を体験する活動',
    badActivity: '相手を自分の型にはめようとすること、価値観や目標の違いを否定すること',
    color: '#e67e22',
  },
  EIAC: {
    code: 'EIAC',
    name: '効率の賢者',
    rank: 'B',
    description: '合理的な判断で、無駄なく目的を達成するペア。対等で独立しており、利害関係として最適な協力関係を築きます。',
    recommendedActivity: '資産運用計画、プロジェクトの共同管理、効率的なタスク分担',
    badActivity: '感情的な慰めや共感を一方的に求めること、合理主義が過ぎて人間味を失うこと',
    color: '#95a5a6',
  },
  EIAD: {
    code: 'EIAD',
    name: '多角的同盟',
    rank: 'C+',
    description: '異なる視点とスキルで、複雑な問題を解決する。対等で独立し、異なる価値観を持ちながら利害関係で結ばれた実利的な関係です。',
    recommendedActivity: '事業戦略の立案、リスク分析、お互いの専門性を活かした協業',
    badActivity: '目的達成後に関係を維持する努力を怠ること、利便性のみでの付き合い',
    color: '#7f8c8d',
  },

  // H___系（Power: Hierarchical）
  HBSC: {
    code: 'HBSC',
    name: '師弟の絆',
    rank: 'A',
    description: '尊敬と信頼に基づき、知識やスキルが継承される。上下関係がありながら、相手の存在自体を大切にし、共通の目標と価値観で結ばれています。',
    recommendedActivity: 'メンタリング、弟子への具体的な指導、技術や知識の伝承',
    badActivity: '師匠が権威を振りかざし弟子が思考停止すること、一方的な教え方',
    color: '#8e44ad',
  },
  HBSD: {
    code: 'HBSD',
    name: '導きの手',
    rank: 'B+',
    description: '経験豊富な方が未熟な方をサポートし、共に成長する。上下関係があり、相手を大切にし、共通の目標を持ちつつも価値観は異なります。',
    recommendedActivity: '新しい趣味の紹介、人生相談、経験に基づくアドバイス',
    badActivity: 'サポートされる側が自立する努力を放棄すること、依存関係の固定化',
    color: '#2980b9',
  },
  HASC: {
    code: 'HASC',
    name: '守護と献身',
    rank: 'B',
    description: '安定した役割分担のもと、互いを支え合う関係。上下関係がありながら相手を大切にし、価値観も一致していますが、個別の目標を持ちます。',
    recommendedActivity: '家族行事の計画、家事の明確な役割分担、お互いの得意分野での支え合い',
    badActivity: '役割が固定化し感謝の気持ちを忘れること、上下関係から生じる不満の蓄積',
    color: '#16a085',
  },
  HASD: {
    code: 'HASD',
    name: '補完的ペア',
    rank: 'B',
    description: '互いの長所と短所がパズルのように噛み合う。上下関係があり相手を大切にしつつ、個別の目標と異なる価値観で補い合います。',
    recommendedActivity: '共同での家事、得意分野を活かした協力、互いの短所を補う連携',
    badActivity: '相手の苦手なことを責め改善を強要すること、上下関係の固定化',
    color: '#d35400',
  },
  HISC: {
    code: 'HISC',
    name: '鉄の結束組織',
    rank: 'C',
    description: '明確な目標と利益のために、強力な上下関係で結ばれる。リーダーとフォロワーの関係で、共通の目標と価値観によって強固な組織を形成します。',
    recommendedActivity: '期間限定のプロジェクト、規律あるチーム運営、明確な目標達成に向けた活動',
    badActivity: '個人の感情や意見を完全に無視すること、過度な権力行使',
    color: '#c0392b',
  },
  HISD: {
    code: 'HISD',
    name: '期間限定の同盟',
    rank: 'C-',
    description: '特定の目的達成のため、一時的に協力するドライな関係。上下関係と利害関係で結ばれ、目標達成が最優先の実利的な関係です。',
    recommendedActivity: '短期集中型のタスク、契約に基づく協業、明確な目的達成に向けた活動',
    badActivity: '契約以上の感情的なつながりや将来を期待すること、目的達成後の関係維持を強要',
    color: '#7f8c8d',
  },
  HIAC: {
    code: 'HIAC',
    name: '機能的支配',
    rank: 'D+',
    description: '明確な指示系統のもと、効率を最大化する関係。上下関係と利害関係で結ばれ、独立した目標を持ちながら効率を追求します。',
    recommendedActivity: '厳格なルールに基づいた共同作業、危機管理、効率的な業務分担',
    badActivity: '指示される側からの建設的な意見を封殺すること、人間性を無視した効率追求',
    color: '#2c3e50',
  },
  HIAD: {
    code: 'HIAD',
    name: '即興の舞台',
    rank: 'D',
    description: '危ういバランスの上に成り立つ、スリリングな関係。上下関係と利害関係で結ばれ、個別の目標と異なる価値観が緊張感を生み出します。',
    recommendedActivity: '即興演劇、予測不可能な冒険、スリリングな体験',
    badActivity: 'この関係が永続的であると誤解すること、過度な期待や依存',
    color: '#8e44ad',
  },
};

// コードからタイプを取得
export function getTypeByCode(code) {
  return RELATION_TYPES[code] || RELATION_TYPES['HIAD'];
}

// 全タイプを配列で取得
export function getAllTypes() {
  return Object.values(RELATION_TYPES);
}

// スコアから4文字コードを生成
export function generateTypeCode(scores) {
  // scores: { P: number, M: number, G: number, V: number }
  // 各軸の閾値は3.0（デフォルト）
  const code = [
    scores.P >= 3.0 ? 'E' : 'H',
    scores.M >= 3.0 ? 'B' : 'I',
    scores.G >= 3.0 ? 'S' : 'A',
    scores.V >= 3.0 ? 'C' : 'D',
  ].join('');
  return code;
}

// 旧データ互換用
export const relationTypes = Object.values(RELATION_TYPES);
export default RELATION_TYPES;
