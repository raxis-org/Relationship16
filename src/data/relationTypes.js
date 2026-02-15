/**
 * 16タイプ定義データ（純粋な4軸組み合わせ版）
 * 
 * 4軸 × 2値 = 16タイプ（2^4 = 16）
 * - 熱量軸: Hot / Cold
 * - 重心軸: Equal / Lean  
 * - 目的軸: Value / Loose
 * - 同期軸: Sync / Desync
 * 
 * ランク付けなし。純粋な分類システム。
 */

export const relationTypes = [
  // =====================================================
  // Hot（熱量）× Equal（重心）× Value（目的）× Sync（同期）
  // =====================================================
  {
    id: 1,
    slug: 'legend-buddy',
    code: 'HOT-EQUAL-VALUE-SYNC',
    axes: { temperature: 'hot', balance: 'equal', purpose: 'value', sync: 'sync' },
    name: '伝説のバディ',
    tagline: '熱い情熱と共通の目的で結ばれた究極のパートナー',
    description: '二人のエネルギーが完全にシンクロし、高い目標に向かって共に突き進む関係。言葉にしなくても意図が通じ、互いを高め合う相乗効果が生まれる。',
    strengths: ['意思疎通が完璧', '目標達成力が高い', '互いの成長を促進'],
    weaknesses: ['周囲との温度差', '休息を忘れがち', '他者からの過大評価'],
    advice: 'お互いの熱意は素晴らしいが、たまには周囲のペースも考慮して。',
    activity: '共同プロジェクト・スポーツ・冒険',
    color: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
    icon: 'Flame',
  },

  // =====================================================
  // Hot × Equal × Value × Desync
  // =====================================================
  {
    id: 2,
    slug: 'fated-rival',
    code: 'HOT-EQUAL-VALUE-DESYNC',
    axes: { temperature: 'hot', balance: 'equal', purpose: 'value', sync: 'desync' },
    name: '宿命のライバル',
    tagline: '同じ熱量で競い合う永遠の好敵手',
    description: 'お互いを認め合いながらも、方向性や方法論で競い合う関係。価値観は異なるが、情熱の強さは互角。その張り詰めた緊張感が二人を成長させる。',
    strengths: ['高い成長速度', '競争による活力', '互いの可能性を引き出す'],
    weaknesses: ['衝突が頻繁', '疲弊しやすい', '妥協点が見つかりにくい'],
    advice: '対立を恐れず、けれど相手を尊重する境界線を大切に。',
    activity: '競技・ディベート・共同制作（対抗形式）',
    color: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
    icon: 'Swords',
  },

  // =====================================================
  // Hot × Equal × Loose × Sync
  // =====================================================
  {
    id: 3,
    slug: 'soul-twin',
    code: 'HOT-EQUAL-LOOSE-SYNC',
    axes: { temperature: 'hot', balance: 'equal', purpose: 'loose', sync: 'sync' },
    name: '魂の双子',
    tagline: '言葉を超えて通じ合う鏡のような存在',
    description: '熱い共感と完璧な理解が特徴。生産性を求めず、ただそこにいるだけで満たされる。瞑想的な静寂の中で、深い安らぎを分かち合う関係。',
    strengths: ['圧倒的な安心感', '無言の理解', '深い癒し'],
    weaknesses: ['現実逃避になりがち', '他者からの誤解', '変化に弱い'],
    advice: '二人の世界は美しいが、時には外部との接点を持つことも。',
    activity: '瞑想・散歩・静かなカフェ・星空観測',
    color: 'linear-gradient(135deg, #c084fc 0%, #818cf8 100%)',
    icon: 'Sparkles',
  },

  // =====================================================
  // Hot × Equal × Loose × Desync
  // =====================================================
  {
    id: 4,
    slug: 'warm-sanctuary',
    code: 'HOT-EQUAL-LOOSE-DESYNC',
    axes: { temperature: 'hot', balance: 'equal', purpose: 'loose', sync: 'desync' },
    name: '温もりの聖域',
    tagline: '違いを受け入れながら慰め合う安全基地',
    description: '価値観は異なるが、お互いを温かく受け止める関係。生産性を求めず、ただ存在することを認め合う。甘やかし合いながらも対等な距離感を保つ。',
    strengths: ['無条件の受容', '癒しの空間', '対等な依存'],
    weaknesses: ['甘やかしすぎ', '成長が停滞', '現実逃避'],
    advice: '受け入れは美しいが、時には厳しい真実も伝える勇気を。',
    activity: '居酒屋・映画鑑賞・買い物・ダラダラ過ごす',
    color: 'linear-gradient(135deg, #f472b6 0%, #db2777 100%)',
    icon: 'Heart',
  },

  // =====================================================
  // Hot × Lean × Value × Sync
  // =====================================================
  {
    id: 5,
    slug: 'passionate-leader',
    code: 'HOT-LEAN-VALUE-SYNC',
    axes: { temperature: 'hot', balance: 'lean', purpose: 'value', sync: 'sync' },
    name: '情熱のリーダーと従者',
    tagline: '熱いビジョンに導かれる目的共同体',
    description: '片方が熱い情熱とビジョンを持ち、もう片方がそれに共感して従う関係。生産性を重視し、目標達成に向けて一心不乱に進む。完璧な連携が特徴。',
    strengths: ['高い実行力', '明確な役割分担', '目標達成率'],
    weaknesses: ['従属側の自己犠牲', 'リーダーへの過度な依存', 'バーンアウト'],
    advice: 'リーダーは従者の負担を常に確認し、従者は自己主張を大切に。',
    activity: '起業・活動・チャレンジ・目標達成',
    color: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
    icon: 'Zap',
  },

  // =====================================================
  // Hot × Lean × Value × Desync
  // =====================================================
  {
    id: 6,
    slug: 'one-way-passion',
    code: 'HOT-LEAN-VALUE-DESYNC',
    axes: { temperature: 'hot', balance: 'lean', purpose: 'value', sync: 'desync' },
    name: '一方通行の情熱',
    tagline: '届かない想いが燃え続ける悲劇的な片想い',
    description: '片方が熱く追いかけ、もう片方は冷淡に受け流す関係。価値観も異なり、生産性もない。しかし追う側は諦めず、追われる側は逃げ続ける。',
    strengths: ['追う側の情熱', '自問の機会'],
    weaknesses: ['噛み合わない会話', '一方的な消耗', '永遠の不満足'],
    advice: '追う側は引く時を知り、追われる側は明確な意思表示を。',
    activity: '距離を置く・自己研鑽・新しい出会いを探す',
    color: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)',
    icon: 'ArrowRight',
  },

  // =====================================================
  // Hot × Lean × Loose × Sync
  // =====================================================
  {
    id: 7,
    slug: 'sweet-dependence',
    code: 'HOT-LEAN-LOOSE-SYNC',
    axes: { temperature: 'hot', balance: 'lean', purpose: 'loose', sync: 'sync' },
    name: '甘やかしの共依存',
    tagline: '互いに依存しながら慰め合う温かい檻',
    description: '熱い共感と完璧な理解があり、お互いに甘やかし合う。生産性は求めず、ただ依存し合う。心地よいが、成長はない。対等でない温もりに安住する。',
    strengths: ['圧倒的な安心感', '深い理解', '癒し'],
    weaknesses: ['社会復帰困難', '成長ゼロ', '他者からの懸念'],
    advice: 'この温もりは尊いが、時には外の世界に一歩踏み出す勇気を。',
    activity: '家でのんびり・甘いものを食べる・愚痴を言い合う',
    color: 'linear-gradient(135deg, #fb7185 0%, #e11d48 100%)',
    icon: 'Candy',
  },

  // =====================================================
  // Hot × Lean × Loose × Desync
  // =====================================================
  {
    id: 8,
    slug: 'burning-obsession',
    code: 'HOT-LEAN-LOOSE-DESYNC',
    axes: { temperature: 'hot', balance: 'lean', purpose: 'loose', sync: 'desync' },
    name: '燃える執着',
    tagline: '束縛と嫉妬に燃える危険な愛',
    description: '熱い情熱が暴走し、執着と束縛に変わる関係。価値観は異なり、生産性もない。片方が追い、もう片方は逃げるが、離れられない歪んだ絆。',
    strengths: ['強い絆の錯覚'],
    weaknesses: ['精神的消耗', '成長の停滞', '互相手の不幸'],
    advice: 'この炎は美しいが、燃え尽きる前に専門家に相談を。',
    activity: '距離を置く・自己分析・カウンセリング',
    color: 'linear-gradient(135deg, #7f1d1d 0%, #450a0a 100%)',
    icon: 'Flame',
  },

  // =====================================================
  // Cold × Equal × Value × Sync
  // =====================================================
  {
    id: 9,
    slug: 'business-partner',
    code: 'COLD-EQUAL-VALUE-SYNC',
    axes: { temperature: 'cold', balance: 'equal', purpose: 'value', sync: 'sync' },
    name: '最強のビジネスパートナー',
    tagline: '合理性と効率で結ばれた信頼関係',
    description: '冷静かつ対等に、生産性を追求する関係。感情を排し、データと論理で意思決定。価値観が一致し、効率的な連携で高い成果を上げる。',
    strengths: ['高い効率性', '客観的な判断', '安定した成果'],
    weaknesses: ['人間味の欠如', '過度な合理主義', '創造性の低下'],
    advice: '効率は大切だが、時には非合理な遊びも関係を潤す。',
    activity: 'プロジェクト管理・投資・スキルアップ',
    color: 'linear-gradient(135deg, #3b82f6 0%, #0ea5e9 100%)',
    icon: 'Briefcase',
  },

  // =====================================================
  // Cold × Equal × Value × Desync
  // =====================================================
  {
    id: 10,
    slug: 'rational-compromise',
    code: 'COLD-EQUAL-VALUE-DESYNC',
    axes: { temperature: 'cold', balance: 'equal', purpose: 'value', sync: 'desync' },
    name: '合理性の共同体',
    tagline: '違う価値観を尊重しながら協力する',
    description: '冷静かつ対等に、生産性を追求するが、価値観は異なる。論理で妥協点を見つけ、効率的に協力する。感情を排した、実利的なパートナーシップ。',
    strengths: ['客観的な協力', '効率的な意思決定', '対等な関係'],
    weaknesses: ['深い共感の欠如', '形式的な関係', '創造性の制限'],
    advice: '合理性は大切だが、時には相手の価値観を深く理解する努力を。',
    activity: '共同研究・ビジネス・効率化プロジェクト',
    color: 'linear-gradient(135deg, #64748b 0%, #475569 100%)',
    icon: 'Scale',
  },

  // =====================================================
  // Cold × Equal × Loose × Sync
  // =====================================================
  {
    id: 11,
    slug: 'sunny-old-couple',
    code: 'COLD-EQUAL-LOOSE-SYNC',
    axes: { temperature: 'cold', balance: 'equal', purpose: 'loose', sync: 'sync' },
    name: '陽だまりの老夫婦',
    tagline: '時間を超えた安心感と静かな信頼',
    description: '冷静かつ対等に、生産性を求めず、ただそこにいる関係。価値観が一致し、言葉にしなくても理解し合う。年月を経たような安らぎがある。',
    strengths: ['圧倒的な安定感', '無言の理解', '長期的な信頼'],
    weaknesses: ['刺激の欠如', '変化への抵抗', '停滞感'],
    advice: 'この安定は尊いが、時には新しい挑戦も関係に潤す。',
    activity: '読書・園芸・散歩・静かなお茶会',
    color: 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)',
    icon: 'Coffee',
  },

  // =====================================================
  // Cold × Equal × Loose × Desync
  // =====================================================
  {
    id: 12,
    slug: 'hollow-shell',
    code: 'COLD-EQUAL-LOOSE-DESYNC',
    axes: { temperature: 'cold', balance: 'equal', purpose: 'loose', sync: 'desync' },
    name: '形だけの関係',
    tagline: '慣性で続く空虚なパートナーシップ',
    description: '冷静かつ対等だが、生産性も共感もない。価値観は異なり、ただ慣性や義務で続いている。激しい衝突はないが、充実感もない。',
    strengths: ['安定した関係', '激しいトラブルなし'],
    weaknesses: ['空虚感', '意味の欠如', '時間の浪費'],
    advice: 'この関係に意味を見出せないなら、別々の道を考える時かも。',
    activity: '関係の見直し・新しい共通点を探す・または解散',
    color: 'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)',
    icon: 'Ghost',
  },

  // =====================================================
  // Cold × Lean × Value × Sync
  // =====================================================
  {
    id: 13,
    slug: 'accomplice',
    code: 'COLD-LEAN-VALUE-SYNC',
    axes: { temperature: 'cold', balance: 'lean', purpose: 'value', sync: 'sync' },
    name: '師弟を超えた共犯者',
    tagline: '冷たい合理的思考で結ばれた完璧なタッグ',
    description: '冷静に生産性を追求し、片方が導き、片方が従う。価値観が一致し、効率的な連携で目標を達成する。感情を排した、プロフェッショナルな関係。',
    strengths: ['高い実行力', '明確な役割', '効率的な成果'],
    weaknesses: ['従属側の自己犠牲', '人間関係の冷たさ', '創造性の制限'],
    advice: '効率は大切だが、時には感謝の言葉も忘れずに。',
    activity: '秘密のプロジェクト・技術向上・目標達成',
    color: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
    icon: 'Users',
  },

  // =====================================================
  // Cold × Lean × Value × Desync
  // =====================================================
  {
    id: 14,
    slug: 'masked-alliance',
    code: 'COLD-LEAN-VALUE-DESYNC',
    axes: { temperature: 'cold', balance: 'lean', purpose: 'value', sync: 'desync' },
    name: '利害一致の仮面',
    tagline: '冷たい計算で結ばれた実利的な同盟',
    description: '冷静に生産性を追求するが、片方が主導権を握り、価値観は異なる。論理的な計算で利害が一致し、形式的に協力する。感情はない。',
    strengths: ['実利的な協力', '効率性', '明確な境界線'],
    weaknesses: ['信頼の欠如', '裏切りのリスク', '空虚感'],
    advice: 'この関係は実利的だが、信用の積み上げも大切に。',
    activity: '契約交渉・ビジネス・冠婚葬祭のみの付き合い',
    color: 'linear-gradient(135deg, #52525b 0%, #27272a 100%)',
    icon: 'Mask',
  },

  // =====================================================
  // Cold × Lean × Loose × Sync
  // =====================================================
  {
    id: 15,
    slug: 'quiet-haven',
    code: 'COLD-LEAN-LOOSE-SYNC',
    axes: { temperature: 'cold', balance: 'lean', purpose: 'loose', sync: 'sync' },
    name: '静かな避難所',
    tagline: '完璧な理解と受容がある安らぎの空間',
    description: '冷静に、生産性を求めず、片方が守り、片方が安らぐ。価値観が一致し、無言の理解がある。依存だが、温かく、毒のない関係。',
    strengths: ['深い安心感', '無条件の受容', '癒し'],
    weaknesses: ['依存の固定化', '成長の停滞', '社会復帰の困難'],
    advice: 'この安らぎは尊いが、時には自立の機会も与えること。',
    activity: '静かな読書・瞑想・散歩・心の保守',
    color: 'linear-gradient(135deg, #2dd4bf 0%, #0d9488 100%)',
    icon: 'Leaf',
  },

  // =====================================================
  // Cold × Lean × Loose × Desync
  // =====================================================
  {
    id: 16,
    slug: 'codependent-boat',
    code: 'COLD-LEAN-LOOSE-DESYNC',
    axes: { temperature: 'cold', balance: 'lean', purpose: 'loose', sync: 'desync' },
    name: '共依存の泥舟',
    tagline: '互いの欠陥を補いながら沈んでいく関係',
    description: '冷静だが、生産性も共感もない。片方が依存し、もう片方がそれを利用する（または逆）。互いの欠陥を補いながら、現実逃避し、どんどん沈んでいく。',
    strengths: ['現実からの逃避'],
    weaknesses: ['互相手の堕落', '成長の欠如', '社会復帰困難'],
    advice: 'この船は沈みます。助けを求める勇気を持ってください。',
    activity: 'カウンセリング・距離を置く・自己改善',
    color: 'linear-gradient(135deg, #57534e 0%, #292524 100%)',
    icon: 'Anchor',
  },
];

/**
 * タイプコードから16タイプを検索
 * @param {string} code - タイプコード（例: HOT-EQUAL-VALUE-SYNC）
 * @returns {Object|null} 関係性タイプ
 */
export function findTypeByCode(code) {
  return relationTypes.find(t => t.code === code) || null;
}

/**
 * 軸の値からタイプコードを生成
 * @param {Object} axes - { temperature, balance, purpose, sync }
 * @returns {string} タイプコード
 */
export function generateTypeCode(axes) {
  const temp = axes.temperature === 'hot' ? 'HOT' : 'COLD';
  const balance = axes.balance === 'equal' ? 'EQUAL' : 'LEAN';
  const purpose = axes.purpose === 'value' ? 'VALUE' : 'LOOSE';
  const sync = axes.sync === 'sync' ? 'SYNC' : 'DESYNC';
  return `${temp}-${balance}-${purpose}-${sync}`;
}

export default relationTypes;
