const CardsPool_1 = [
  {
    group: '通用',
    shape: '5-6-1-10',
  },
  {
    group: '通用',
    shape: '5-6-0-11',
  },
  {
    group: '通用',
    shape: '1-6-0-7',
  },
  {
    group: '通用',
    shape: '1-6-2-5',
  },
  {
    group: '通用',
    shape: '6-5-7-2',
  },
  {
    group: '通用',
    shape: '6-5-7-10',
  },
  {
    group: '通用',
    shape: '6-1-11-10',
  },
  {
    group: '通用',
    shape: '6-1-11-2',
  },
  {
    group: '通用',
    shape: '6-5-7-1',
  },
  {
    group: '通用',
    shape: '6-5-7-11',
  },
  {
    group: '通用',
    shape: '6-1-11-7',
  },
  {
    group: '通用',
    shape: '6-1-11-5',
  },
  {
    group: '通用',
    shape: '1-0-6',
    effect: new DamageOtherPlayer({
      name: '打出: 對敵方造成 1 點傷害',
      trigger: 'onplace',
      damage: 1,
    }),
  },
  {
    group: '通用',
    shape: '1-0-5',
    effect: new DamageOtherPlayer({
      name: '打出: 對敵方造成 1 點傷害',
      trigger: 'onplace',
      damage: 1,
    }),
    },
  {
    group: '通用',
    shape: '1-0-5-6',
    effect: new DamageOtherPlayer({
      name: '打出: 對敵方造成 1 點傷害',
      trigger: 'onplace',
      damage: 1,
    }),
  },
  {
    group: '通用',
    shape: '6-1-2-3-5-8-9-11-12-13',
    effect: new DrawCard({
      name: '打出: 抽一張牌',
      trigger: 'onplace',
      n: 1,
    })
  },
  {
    group: '通用',
    shape: '11-1-16-6-21-5-7-15-17',
    effect: new DrawCard({
      name: '打出: 抽一張牌',
      trigger: 'onplace',
      n: 1,
    })
    },
  {
    group: '通用',
    shape: '7-2-3-4-10-11-12',
    effect: new DrawCard({
      name: '打出: 抽一張牌',
      trigger: 'onplace',
      n: 1,
    })
  },
];

const CardsPool_2 = [
  {
    group: '疫苗',
    shape: '1-0-6',
    effect: new TransformTile({
      name: '打出: 指定與此方塊相鄰的一個敵方格，將其轉化為我方格。',
      trigger: 'onplace',
      target: 'adjacent',
      method: 'playerChoose',
      quantity: 1,
    }),
  },
  {
    group: '疫苗',
    shape: '6-7-2-10-11',
    effect: new TransformTile({
      name: '打出: 指定與此方塊不相鄰的一個敵方格，將其轉化為我方格。',
      trigger: 'onplace',
      target: 'anti-adjacent',
      method: 'playerChoose',
      quantity: 1,
    }),
  },
  {
    group: '疫苗',
    shape: '5-0-10-15',
    effect: new TransformTile({
      name: '打出: 隨機將此方塊周圍的兩個敵方格，轉化為我方格。',
      trigger: 'onplace',
      target: 'adjacent',
      method: 'random',
      quantity: 2,
    }),
  },
  {
    group: '疫苗',
    shape: '5-0-6-7',
    effect: new Regenerate({
      name: '打出: 對我方回復2點生命',
      trigger: 'onplace',
      hp: 2,
    }),
  },
  {
    group: '疫苗',
    shape: '5-0-10-11',
    effect: new Regenerate({
      name: '消除: 對我方回復3點生命',
      trigger: 'onclear',
      pivot: 10,
      hp: 3,
    }),
  },
  {
    group: '疫苗',
    shape: '1-0-2-5-7',
    effect: new Regenerate({
      name: '填滿【N 任意】: 回復我方 2 x N 點生命',
      trigger: 'onfill',
      hp: (n = 0) => n * 2,
    }),
  },
  {
    group: '疫苗',
    shape: '6-5-1-11-12',
    effect: new Enhance({
      name: '存在: 我方每次回復生命時，額外回復 1 點。',
      trigger: 'exist',
      pivot: 6,
      enhaceTarget: 'regenerate',
      enhance: (hp = 0) => hp + 1,
    }),
  },
  {
    group: '疫苗',
    shape: '6-0-5-10-2-7-12',
    effect: new Enhance({
      name: '存在: 我方每次回復生命時，對敵方造成 1 點傷害。',
      trigger: 'exist',
      pivot: 6,
      enhaceTarget: 'regenerate',
      enhance: (hp = 0) => hp,
      createSideEffect: ({game}) => (({player}) => game.applyDamageToOther(player, 1)),
    }),
  },
  {
    group: '疫苗',
    shape: '6-1-11-5-7',
    effect: new Enhance({
      name: '存在: 每當我方打出一張疫苗方塊，回復我方 1 點生命。',
      trigger: 'exist',
      pivot: 6,
      enhaceTarget: 'onplace',
      constrain: (card) => card.group === '疫苗',
      createSideEffect: ({game}) => (({player}) => game.regenerate(player, 1)),
    }),
  },
  {
    group: '疫苗',
    shape: '6-5-7-8-2',
    effect: new TransformTile({
      name: '消除: 將相鄰且未被消除的所有方格，轉化為我方格。',
      trigger: 'onclear',
      pivot: 2,
      target: 'adjacent',
      method: 'all',
    }),
  },
];
