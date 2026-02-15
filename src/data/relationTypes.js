/**
 * 16タイプ定義データ
 * 診断ロジックの4軸（熱量・重心・目的・同期）に基づく16タイプ
 */

export const relationTypes = [
  // ========== タイプ1: 伝説のバディ ==========
  {
    id: 1,
    slug: 'legend-buddy',
    name: '伝説のバディ',
    code: 'HOT-EQUAL-VALUE-SYNC',
    axes: {
      temperature: 'hot',
      balance: 'equal',
      purpose: 'value',
      sync: 'sync',
    },
    syncRate: { min: 95, max: 100 },
    recommendedActivity: '起業・世界征服',
    sarcasticAdvice: '眩しすぎて周囲が迷惑しています。たまには凡人のフリをしてください。',
    description: '二人のエネルギーが完全にシンクロし、どんな困難も乗り越えられる究極のパートナーシップ。',
    color: 'linear-gradient(135deg, #fbbf24 0%, #f97316 50%, #ef4444 100%)',
    icon: 'Crown',
    rank: 'S+',
  },

  // ========== タイプ2: 宿命のライバル ==========
  {
    id: 2,
    slug: 'fated-rival',
    name: '宿命のライバル',
    code: 'HOT-EQUAL-VALUE-DESYNC',
    axes: {
      temperature: 'hot',
      balance: 'equal',
      purpose: 'value',
      sync: 'desync',
    },
    syncRate: { min: 80, max: 84 },
    recommendedActivity: '格闘技・徹夜の議論',
    sarcasticAdvice: '仲良くしようとするだけ時間の無駄。そのまま死ぬまで殴り合え。',
    description: 'お互いを高め合うライバル関係。方向性は違うが、燃える想いは同じ。',
    color: 'linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #be123c 100%)',
    icon: 'Swords',
    rank: 'S',
  },

  // ========== タイプ3: 最強のビジネスパートナー ==========
  {
    id: 3,
    slug: 'business-partner',
    name: '最強のビジネスパートナー',
    code: 'COLD-EQUAL-VALUE-SYNC',
    axes: {
      temperature: 'cold',
      balance: 'equal',
      purpose: 'value',
      sync: 'sync',
    },
    syncRate: { min: 70, max: 79 },
    recommendedActivity: '投資・タスク管理',
    sarcasticAdvice: '効率を求めすぎて人間味を忘れていませんか？たまには無駄な話をしろ。',
    description: '冷静かつ対等に、成果を追求する理想的なビジネス関係。',
    color: 'linear-gradient(135deg, #60a5fa 0%, #06b6d4 50%, #14b8a6 100%)',
    icon: 'Briefcase',
    rank: 'A+',
  },

  // ========== タイプ4: 師弟を超えた共犯者 ==========
  {
    id: 4,
    slug: 'accomplice',
    name: '師弟を超えた共犯者',
    code: 'COLD-LEAN-VALUE-SYNC',
    axes: {
      temperature: 'cold',
      balance: 'lean',
      purpose: 'value',
      sync: 'sync',
    },
    syncRate: { min: 60, max: 69 },
    recommendedActivity: '秘密のプロジェクト',
    sarcasticAdvice: '犯罪以外なら何でも成功しそうですね。あ、もう手遅れですか？',
    description: '師弟というより共犯者。片方が導き、片方が実践する完璧なタッグ。',
    color: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 50%, #4338ca 100%)',
    icon: 'Users',
    rank: 'A',
  },

  // ========== タイプ5: 魂の双子（ソウルツイン） ==========
  {
    id: 5,
    slug: 'soul-twin',
    name: '魂の双子（ソウルツイン）',
    code: 'HOT-EQUAL-LOOSE-SYNC',
    axes: {
      temperature: 'hot',
      balance: 'equal',
      purpose: 'loose',
      sync: 'sync',
    },
    syncRate: { min: 99, max: 100 },
    recommendedActivity: '瞑想・沈黙',
    sarcasticAdvice: '鏡を見ているだけでは？もはや二人でいる意味があるのかすら不明です。',
    description: '言葉を交わさずとも全てが通じ合う、まさに魂の双子。',
    color: 'linear-gradient(135deg, #f9a8d4 0%, #c084fc 50%, #6366f1 100%)',
    icon: 'Sparkles',
    rank: 'SS',
  },

  // ========== タイプ6: 陽だまりの老夫婦 ==========
  {
    id: 6,
    slug: 'sunny-old-couple',
    name: '陽だまりの老夫婦',
    code: 'COLD-EQUAL-LOOSE-SYNC',
    axes: {
      temperature: 'cold',
      balance: 'equal',
      purpose: 'loose',
      sync: 'sync',
    },
    syncRate: { min: 90, max: 94 },
    recommendedActivity: '縁側でお茶・盆栽',
    sarcasticAdvice: '安定感は抜群ですが、刺激がなさすぎてそのまま石化しないよう注意。',
    description: '年月を経たような安心感と安定感。言葉はいらない、ただそこにいるだけで良い。',
    color: 'linear-gradient(135deg, #fcd34d 0%, #fbbf24 50%, #fb923c 100%)',
    icon: 'Coffee',
    rank: 'S',
  },

  // ========== タイプ7: 全肯定型サンクチュアリ ==========
  {
    id: 7,
    slug: 'sanctuary',
    name: '全肯定型サンクチュアリ',
    code: 'HOT-EQUAL-LOOSE-DESYNC',
    axes: {
      temperature: 'hot',
      balance: 'equal',
      purpose: 'loose',
      sync: 'desync',
    },
    syncRate: { min: 85, max: 89 },
    recommendedActivity: '泥酔・甘やかし合い',
    sarcasticAdvice: 'お互い甘やかしすぎて、社会復帰できなくなる一歩手前ですよ。',
    description: 'どんな自分でも受け入れてくれる聖域。全肯定の温もりに包まれる関係。',
    color: 'linear-gradient(135deg, #fda4af 0%, #f472b6 50%, #d946ef 100%)',
    icon: 'Heart',
    rank: 'A+',
  },

  // ========== タイプ8: 放牧中の幼馴染 ==========
  {
    id: 8,
    slug: 'grazing-friend',
    name: '放牧中の幼馴染',
    code: 'COLD-EQUAL-LOOSE-DESYNC',
    axes: {
      temperature: 'cold',
      balance: 'equal',
      purpose: 'loose',
      sync: 'desync',
    },
    syncRate: { min: 75, max: 79 },
    recommendedActivity: '放置・別行動',
    sarcasticAdvice: '距離感が遠すぎて、たまに生存確認しないと関係が消滅しますよ。',
    description: '長い付き合いだからこその余裕。必要な時だけ会えば良い、解放的な関係。',
    color: 'linear-gradient(135deg, #86efac 0%, #34d399 50%, #14b8a6 100%)',
    icon: 'Leaf',
    rank: 'B+',
  },

  // ========== タイプ9: 飼い主と忠犬 ==========
  {
    id: 9,
    slug: 'master-dog',
    name: '飼い主と忠犬',
    code: 'HOT-LEAN-VALUE-SYNC',
    axes: {
      temperature: 'hot',
      balance: 'lean',
      purpose: 'value',
      sync: 'sync',
    },
    syncRate: { min: 40, max: 44 },
    recommendedActivity: '散歩・命令の遂行',
    sarcasticAdvice: '首輪が見えますね。片方がいなくなると、もう片方は餓死する運命です。',
    description: '片方が導き、片方が従う。一方通行だが、それが心地良い関係。',
    color: 'linear-gradient(135deg, #fb923c 0%, #f59e0b 50%, #eab308 100%)',
    icon: 'Dog',
    rank: 'C',
  },

  // ========== タイプ10: 相互監視型メンヘラ ==========
  {
    id: 10,
    slug: 'mutual-menhera',
    name: '相互監視型メンヘラ',
    code: 'HOT-LEAN-VALUE-DESYNC',
    axes: {
      temperature: 'hot',
      balance: 'lean',
      purpose: 'value',
      sync: 'desync',
    },
    syncRate: { min: 50, max: 54 },
    recommendedActivity: 'GPS共有・スマホ検閲',
    sarcasticAdvice: '愛ではなく執着です。そのエネルギーを少しは自分の人生に使ってください。',
    description: '束縛と執着に満ちた、歪んだ愛の形。離れられないが、近づけない。',
    color: 'linear-gradient(135deg, #dc2626 0%, #be123c 50%, #9f1239 100%)',
    icon: 'Eye',
    rank: 'D',
  },

  // ========== タイプ11: 利害一致の仮面夫婦 ==========
  {
    id: 11,
    slug: 'masked-couple',
    name: '利害一致の仮面夫婦',
    code: 'COLD-LEAN-VALUE-SYNC',
    axes: {
      temperature: 'cold',
      balance: 'lean',
      purpose: 'value',
      sync: 'sync',
    },
    syncRate: { min: 30, max: 34 },
    recommendedActivity: '冠婚葬祭・契約更新',
    sarcasticAdvice: '演技力だけは一流ですね。オスカー像でも二人で取りに行けばいかが？',
    description: '感情ではなく、合理的な計算で結ばれた関係。裏では何も感じていない。',
    color: 'linear-gradient(135deg, #94a3b8 0%, #64748b 50%, #52525b 100%)',
    icon: 'Mask',
    rank: 'C-',
  },

  // ========== タイプ12: 共依存の泥舟 ==========
  {
    id: 12,
    slug: 'codependent-boat',
    name: '共依存の泥舟',
    code: 'COLD-LEAN-VALUE-DESYNC',
    axes: {
      temperature: 'cold',
      balance: 'lean',
      purpose: 'value',
      sync: 'desync',
    },
    syncRate: { min: 20, max: 24 },
    recommendedActivity: '傷の舐め合い',
    sarcasticAdvice: '二人で沈むのも一つの愛ですが、たまには陸（現実）を見てください。',
    description: '互いの欠陥を補い合うが、改善はしない。どんどん沈んでいく関係。',
    color: 'linear-gradient(135deg, #78716c 0%, #57534e 50%, #44403c 100%)',
    icon: 'Anchor',
    rank: 'D-',
  },

  // ========== タイプ13: 平行線を辿る宇宙人 ==========
  {
    id: 13,
    slug: 'parallel-alien',
    name: '平行線を辿る宇宙人',
    code: 'COLD-LEAN-LOOSE-SYNC',
    axes: {
      temperature: 'cold',
      balance: 'lean',
      purpose: 'loose',
      sync: 'sync',
    },
    syncRate: { min: 10, max: 14 },
    recommendedActivity: '各自の趣味・深追い禁止',
    sarcasticAdvice: '会話が成立していないのに一緒にいられるのは、ある意味奇跡です。',
    description: '同じ空間にいても、全く異なる世界を生きている。交わることのない平行線。',
    color: 'linear-gradient(135deg, #818cf8 0%, #3b82f6 50%, #06b6d4 100%)',
    icon: 'Ghost',
    rank: 'E',
  },

  // ========== タイプ14: 一方通行の片想いごっこ ==========
  {
    id: 14,
    slug: 'one-way-love',
    name: '一方通行の片想いごっこ',
    code: 'HOT-LEAN-LOOSE-DESYNC',
    axes: {
      temperature: 'hot',
      balance: 'lean',
      purpose: 'loose',
      sync: 'desync',
    },
    syncRate: { min: 15, max: 19 },
    recommendedActivity: '献身・スルーの練習',
    sarcasticAdvice: '追う側はランナーズハイ、追われる側は無関心。一生噛み合いません。',
    description: '一方的な愛情が注がれるが、一向に届かない。悲劇的な片想いの関係。',
    color: 'linear-gradient(135deg, #a78bfa 0%, #8b5cf6 50%, #d946ef 100%)',
    icon: 'ArrowRight',
    rank: 'E+',
  },

  // ========== タイプ15: 昨日会ったばかりの親友 ==========
  {
    id: 15,
    slug: 'fake-friend',
    name: '昨日会ったばかりの親友',
    code: 'COLD-LEAN-LOOSE-DESYNC',
    axes: {
      temperature: 'cold',
      balance: 'lean',
      purpose: 'loose',
      sync: 'desync',
    },
    syncRate: { min: 45, max: 49 },
    recommendedActivity: '初対面のフリ',
    sarcasticAdvice: 'その「親友」設定、いつまで持ちますか？メッキが剥がれるのが楽しみ。',
    description: '表面的には親しいフリをするが、実はお互いを理解していない関係。',
    color: 'linear-gradient(135deg, #2dd4bf 0%, #06b6d4 50%, #0ea5e9 100%)',
    icon: 'UserX',
    rank: 'C+',
  },

  // ========== タイプ16: NPCとプレイヤー ==========
  {
    id: 16,
    slug: 'npc-player',
    name: 'NPCとプレイヤー',
    code: 'NEUTRAL-NEUTRAL-NEUTRAL-NEUTRAL',
    axes: {
      temperature: 'neutral',
      balance: 'neutral',
      purpose: 'neutral',
      sync: 'neutral',
    },
    syncRate: { min: 5, max: 9 },
    recommendedActivity: '今すぐ解散',
    sarcasticAdvice: '感情のやり取りを諦めていませんか？壁に向かって話しているのと同義。',
    description: '関係性らしい関係性がない。一方がNPCのように反応せず、会話が成立しない。',
    color: 'linear-gradient(135deg, #6b7280 0%, #4b5563 50%, #374151 100%)',
    icon: 'Bot',
    rank: 'F',
  },
];

export const axisThresholds = {
  temperature: { hot: 1.5, cold: 0.5, neutral: 1.0 },
  balance: { equal: 1.5, lean: 0.5, neutral: 1.0 },
  purpose: { value: 1.5, loose: 0.5, neutral: 1.0 },
  sync: { sync: 1.5, desync: 0.5, neutral: 1.0 },
};

export default relationTypes;
