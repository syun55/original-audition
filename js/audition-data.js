(function () {
  "use strict";

  // 全募集に共通するサンプル設定
  const defaults = {
    fee: "無料（架空の設定）",
    activityTerms:
      "活動時の費用・報酬は、活動内容の説明時に確認する想定です。",
    steps: [
      {
        title: "プロフィール提出",
        text: "プロフィールと指定の資料を提出する想定です。",
      },
      {
        title: "資料審査・オンライン面談",
        text: "提出資料を確認し、活動への思いや希望を伺う想定です。",
      },
      {
        title: "結果の案内",
        text: "選考結果と、今後の活動について案内する想定です。",
      },
    ],
    faq: [
      {
        question: "ほかの仕事や学業と両立できますか？",
        answer:
          "活動の頻度や日程を面談で確認し、参加できる範囲を相談する設定です。",
      },
      {
        question: "実際に応募できますか？",
        answer:
          "このサイトはポートフォリオ用です。掲載している募集への応募は受け付けていません。",
      },
    ],
  };

  const auditions = {
    reading: {
      title: "朗読プロジェクト・キャスト募集",
      category: "声優",
      categoryKey: "voice",
      visualTitle: "YOUR VOICE",
      tone: "blue",
      beginner: true,
      deadline: "2026-12-20",
      area: "全国・オンライン",
      organizer: "STAGE NOTE READING PROJECT（架空）",
      description:
        "声で物語を届けてみませんか。演技経験は問いません。好きな作品や表現への思いを聞かせてください。",
      overview:
        "短い物語を声で届ける、オリジナル朗読作品のキャストを募集する設定です。\n一人ひとりの声の個性や、言葉を届ける姿勢を大切にします。配役や表現について相談しながら、作品をつくっていくプロジェクトです。",
      points: [
        "未経験から朗読に挑戦できる設定",
        "オンラインでの面談・練習を想定",
        "自分の声を活かして物語を届ける活動",
      ],
      qualification:
        "朗読や声の表現に興味があり、オンラインの練習に参加できる方。経験不問。",
      materials:
        "プロフィール、自己PR、1分程度の朗読音声を想定しています。",
      after:
        "オリエンテーション、台本の読み合わせ、配役の相談を経て収録を行う設定です。完成した作品を振り返り、次の表現につなげます。",
    },

    vocal: {
      title: "新人ボーカルオーディション",
      category: "音楽",
      categoryKey: "music",
      visualTitle: "FIRST VOICE",
      tone: "purple",
      beginner: true,
      deadline: "2026-11-30",
      area: "全国・オンライン",
      organizer: "STAGE NOTE MUSIC PROJECT（架空）",
      description:
        "歌うことが好き。その気持ちを、最初のステージへ。自分の声で表現したい方を募集します。",
      overview:
        "歌の表現に挑戦したい方を対象に、ボーカルメンバーを募集する設定です。\n得意な曲や好きな音楽を通して、あなたらしい声や表現を見つけていきます。",
      points: [
        "歌への思いを大切にする選考を想定",
        "オンラインでの参加を想定",
        "自分の声を活かす活動プラン",
      ],
      qualification:
        "歌うことが好きで、練習や制作に継続して参加できる方。経験不問。",
      materials: "プロフィール、自己PR、歌唱音源を想定しています。",
      after:
        "目標の相談と歌唱練習を行い、デモ音源の制作や発表に取り組む設定です。",
    },

    model: {
      title: "福岡発・新人モデルオーディション",
      category: "モデル",
      categoryKey: "model",
      visualTitle: "NEW FACE",
      tone: "pink",
      beginner: true,
      deadline: "2026-12-15",
      area: "福岡",
      organizer: "STAGE NOTE MODEL PROJECT（架空）",
      description:
        "自分らしい表情や個性を活かしたい方へ。初めての撮影やウォーキングにも挑戦できる架空の募集です。",
      overview:
        "福岡で活動する新人モデルを募集する設定です。\nポートレート撮影や衣装の紹介を通じて、自分らしい表情と見せ方を探します。",
      points: [
        "初めてのモデル活動を想定",
        "福岡での撮影・レッスンを想定",
        "表情や個性を大切にする企画",
      ],
      qualification:
        "福岡での撮影や練習に参加でき、モデル活動に興味がある方。経験不問。",
      materials: "プロフィール、顔写真、全身写真を想定しています。",
      after:
        "撮影の基本やポージングを学び、プロフィール撮影に取り組む設定です。",
    },

    idol: {
      title: "新しいユニットのメンバー募集",
      category: "アイドル",
      categoryKey: "idol",
      visualTitle: "FIRST LIGHT",
      tone: "pink",
      beginner: true,
      deadline: "2026-12-25",
      area: "東京",
      organizer: "STAGE NOTE UNIT PROJECT（架空）",
      description:
        "歌やダンスが好きな方へ。仲間と一緒に新しいステージをつくるメンバーを募集します。",
      overview:
        "オリジナルユニットの立ち上げメンバーを募集する設定です。\n歌やダンスに取り組みながら、仲間と協力してステージをつくっていきます。",
      points: [
        "新しいユニットの立ち上げを想定",
        "歌・ダンスの基礎練習からスタート",
        "チームでつくるステージ",
      ],
      qualification:
        "東京での練習に参加でき、チーム活動に意欲がある方。経験不問。",
      materials:
        "プロフィール、自己PR、歌またはダンスの動画を想定しています。",
      after:
        "メンバーで活動の方向性を話し合い、歌とダンスの練習、発表準備を行う設定です。",
    },

    actor: {
      title: "短編映画「はじまりの日」出演者募集",
      category: "俳優・女優",
      categoryKey: "actor",
      visualTitle: "NEXT SCENE",
      tone: "blue",
      beginner: true,
      deadline: "2027-01-10",
      area: "大阪",
      organizer: "STAGE NOTE FILM PROJECT（架空）",
      description:
        "物語の中で、新しい自分に出会う。短編映画に出演するキャストを募集します。",
      overview:
        "新しい一歩を踏み出す人を描く、オリジナル短編映画の出演者を募集する設定です。\n台本の読み合わせを通じて役柄を理解し、作品づくりに参加します。",
      points: [
        "オリジナル短編映画への出演を想定",
        "台本の読み合わせから参加",
        "大阪での撮影を想定",
      ],
      qualification:
        "大阪での読み合わせ・撮影に参加できる方。演技経験不問。",
      materials:
        "プロフィール、写真、短いセリフ動画を想定しています。",
      after:
        "配役決定後、読み合わせとリハーサルを行い、撮影に参加する設定です。",
    },

    vtuber: {
      title: "バーチャル配信者オーディション",
      category: "VTuber / VLiver",
      categoryKey: "vtuber",
      visualTitle: "HELLO WORLD",
      tone: "purple",
      beginner: true,
      deadline: "2027-01-15",
      area: "全国・オンライン",
      organizer: "STAGE NOTE VIRTUAL PROJECT（架空）",
      description:
        "好きなことを、バーチャルの世界で届けよう。自分らしい配信に挑戦したい方を募集します。",
      overview:
        "アバターを使った配信や動画制作に取り組むメンバーを募集する設定です。\nトーク、ゲーム、歌など、好きなテーマから活動の方向性を考えます。",
      points: [
        "バーチャル配信の準備からスタート",
        "好きなテーマを軸に活動",
        "オンラインでの活動を想定",
      ],
      qualification:
        "配信に興味があり、オンラインで継続して活動できる方。経験不問。",
      materials:
        "プロフィール、自己PR音声、配信してみたいテーマを想定しています。",
      after:
        "キャラクターと活動テーマを相談し、機材確認とテスト配信を行う設定です。",
    },

    liver: {
      title: "トーク配信プロジェクト・新メンバー募集",
      category: "ライバー",
      categoryKey: "liver",
      visualTitle: "LIVE TOGETHER",
      tone: "purple",
      beginner: true,
      deadline: "2026-11-15",
      area: "全国・オンライン",
      organizer: "STAGE NOTE TALK PROJECT（架空）",
      description:
        "日常の小さな出来事を、誰かと分かち合う。トーク配信に挑戦するメンバーを募集します。",
      overview:
        "趣味や日常をテーマにしたトーク配信のメンバーを募集する設定です。\n会話を楽しむ気持ちを大切にし、無理のない活動ペースを考えます。",
      points: [
        "初めてのトーク配信を想定",
        "自分の趣味をテーマにできる活動",
        "配信内容の相談からスタート",
      ],
      qualification:
        "会話や発信に興味があり、継続して配信準備に取り組める方。",
      materials:
        "プロフィール、自己PR、配信テーマの案を想定しています。",
      after:
        "活動ペースを相談し、話題の準備とテスト配信を行う設定です。",
    },

    stage: {
      title: "小劇場公演・アンサンブルキャスト募集",
      category: "映画・舞台",
      categoryKey: "movie",
      visualTitle: "ON THE STAGE",
      tone: "pink",
      beginner: false,
      deadline: "2026-11-20",
      area: "東京",
      organizer: "STAGE NOTE THEATER PROJECT（架空）",
      description:
        "舞台の空気を、仲間とつくる。小劇場公演に参加するキャストを募集します。",
      overview:
        "オリジナル舞台のアンサンブルキャストを募集する設定です。\n共演者と連携しながら、場面ごとの演技や動きを組み立てます。",
      points: [
        "小劇場公演への参加を想定",
        "演技経験を活かす活動",
        "共演者と協力してつくる舞台",
      ],
      qualification:
        "演技経験があり、東京での稽古と公演に参加できる方。",
      materials:
        "プロフィール、出演歴、演技動画を想定しています。",
      after:
        "読み合わせ、立ち稽古、通し稽古を経て公演に参加する設定です。",
    },

    creator: {
      title: "日常の魅力を届けるクリエイター募集",
      category: "インフルエンサー",
      categoryKey: "influencer",
      visualTitle: "YOUR STYLE",
      tone: "blue",
      beginner: true,
      deadline: "2026-12-10",
      area: "全国・オンライン",
      organizer: "STAGE NOTE CREATOR PROJECT（架空）",
      description:
        "好きなものを、自分の視点で。日常の魅力を発信するクリエイターを募集します。",
      overview:
        "写真や短い動画で、暮らしや趣味の魅力を発信するメンバーを募集する設定です。\n自分らしいテーマを見つけ、投稿の企画と制作に取り組みます。",
      points: [
        "自分の好きなテーマで発信",
        "写真・ショート動画の制作",
        "オンラインでの活動を想定",
      ],
      qualification:
        "SNSでの発信に興味があり、投稿制作に取り組める方。",
      materials:
        "プロフィール、投稿サンプル、発信したいテーマを想定しています。",
      after:
        "発信テーマと制作ペースを決め、投稿企画を作成する設定です。",
    },

    talent: {
      title: "地域イベント・新人タレント募集",
      category: "タレント",
      categoryKey: "talents",
      visualTitle: "BE YOURSELF",
      tone: "purple",
      beginner: true,
      deadline: "2026-11-25",
      area: "福岡",
      organizer: "STAGE NOTE EVENT PROJECT（架空）",
      description:
        "地域のイベントを、あなたの笑顔で盛り上げる。新人タレントを募集します。",
      overview:
        "福岡の地域イベントで、進行や紹介に参加するメンバーを募集する設定です。\n人と話すことや地域の魅力を伝えることに挑戦します。",
      points: [
        "福岡の地域イベントを想定",
        "トークや進行に挑戦",
        "事前の練習から参加",
      ],
      qualification:
        "福岡での活動に参加でき、人前での表現に興味がある方。",
      materials:
        "プロフィール、写真、自己紹介動画を想定しています。",
      after:
        "進行の練習とイベント内容の確認を行い、出演に向けた準備をする設定です。",
    },

    brand: {
      title: "ブランド紹介動画・出演モデル募集",
      category: "案件",
      categoryKey: "work",
      visualTitle: "CREATE MORE",
      tone: "pink",
      beginner: false,
      deadline: "2026-12-05",
      area: "大阪",
      organizer: "STAGE NOTE CREATIVE PROJECT（架空）",
      description:
        "ブランドの世界観を、表情と動きで届ける。紹介動画の出演モデルを募集します。",
      overview:
        "架空ブランドの商品紹介動画に出演するモデルを募集する設定です。\n撮影の意図を理解し、表情や動きを通して商品の魅力を表現します。",
      points: [
        "ブランド紹介動画への出演を想定",
        "撮影経験を活かす活動",
        "大阪での撮影を想定",
      ],
      qualification:
        "撮影経験があり、大阪での打ち合わせと撮影に参加できる方。",
      materials:
        "プロフィール、写真、出演実績を想定しています。",
      after:
        "撮影内容の説明、衣装の確認、リハーサルを経て撮影する設定です。",
    },

    reporter: {
      title: "街の魅力を伝える番組リポーター募集",
      category: "メディア",
      categoryKey: "media",
      visualTitle: "LOCAL STORY",
      tone: "blue",
      beginner: true,
      deadline: "2026-12-18",
      area: "福岡",
      organizer: "STAGE NOTE LOCAL PROJECT（架空）",
      description:
        "街の小さな発見を、言葉にして届ける。地域番組のリポーターを募集します。",
      overview:
        "福岡のお店や地域の魅力を紹介する、架空番組のリポーターを募集する設定です。\n取材先の話を聞き、自分の言葉で伝える活動に取り組みます。",
      points: [
        "福岡の地域情報を紹介",
        "取材やリポートに挑戦",
        "伝え方の練習から参加",
      ],
      qualification:
        "福岡での取材に参加でき、地域や人の話に関心がある方。",
      materials:
        "プロフィール、自己紹介動画、紹介したい場所を想定しています。",
      after:
        "取材の準備とリポート練習を行い、撮影に参加する設定です。",
    },
  };

  // 共通設定と、それぞれの募集内容をまとめる
  window.STAGE_NOTE_AUDITIONS = Object.fromEntries(
    Object.entries(auditions).map(function ([id, audition]) {
      return [id, { ...defaults, ...audition }];
    })
  );
})();