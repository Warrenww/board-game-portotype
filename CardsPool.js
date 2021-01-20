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
  },
  {
    group: '通用',
    shape: '11-1-16-6-21-5-7-15-17',
    },
  {
    group: '通用',
    shape: '7-2-3-4-10-11-12',
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
];
