const specials = [
  {
    title: '朝どれ鮮魚セット',
    label: '魚屋さん',
    copy: 'その日いちばんの魚を、会話しながら選べます。' 
  },
  {
    title: '旬の果物カゴ',
    label: '果物屋さん',
    copy: '完熟の香りが立つ、今だけの味をどうぞ。'
  },
  {
    title: '露地野菜の詰め合わせ',
    label: '野菜やさん',
    copy: '地元の畑から届く、元気な色の野菜たち。'
  },
  {
    title: 'しきびの朝束',
    label: 'しきび屋さん',
    copy: '丁寧に束ねた、日々の暮らしに寄り添う一品。'
  },
  {
    title: '牛乳とプリンの朝便',
    label: '牛乳屋さん',
    copy: '昔ながらのやさしい味で、土曜の朝をスタート。'
  },
  {
    title: '手作りアクセサリー',
    label: 'アクセサリー屋さん',
    copy: '若い作り手の色づかいが、昭和の空気に映えます。'
  }
];

const shops = [
  { name: '魚屋さん', category: 'food', info: '朝どれ・切り身・干物まで、今日は何が一番かを直接聞けます。' },
  { name: '化粧品・日用品', category: 'daily', info: '昔ながらの品揃えに、使いやすい生活雑貨が並びます。' },
  { name: 'しきび屋さん', category: 'season', info: 'お盆や季節の行事に欠かせない、ていねいな仕事。' },
  { name: 'アクセサリー屋さん', category: 'craft', info: '一点ものの手仕事が多く、若い出店者の感性も光ります。' },
  { name: '果物屋さん', category: 'food', info: '季節のフルーツを、見た目も香りも一緒に楽しめます。' },
  { name: '野菜やさん', category: 'food', info: '地元野菜を中心に、その日のおすすめをその場で案内。' },
  { name: '牛乳屋さん', category: 'food', info: '乳製品や朝食向きの品を、テンポよく買える定番の人気店。' },
  { name: 'おばあちゃんの手仕事', category: 'craft', info: '編み物、漬物、季節の保存食。会話ごと持ち帰りたくなる店先です。' }
];

const events = [
  {
    date: '今月の催し',
    title: '土曜ライブステージ',
    copy: '地元バンドや小さな歌声のイベントで、市場が少しお祭り気分になります。'
  },
  {
    date: '次回予定',
    title: '小学生の発表会',
    copy: '近くの子どもたちの発表で、家族連れにもやさしい時間が流れます。'
  },
  {
    date: '季節企画',
    title: '一日だけの特設出店',
    copy: '試し出店や限定屋台も歓迎。いつ来ても少し景色が変わるのが魅力です。'
  }
];

const videos = [
  {
    title: '魚屋さんの朝の仕込み',
    copy: '切り身を並べる手つきや、店主のひと言を短く切り取る想定です。'
  },
  {
    title: 'おばあちゃんの店先トーク',
    copy: '市場の空気が伝わる、やわらかな会話を見せるショート動画です。'
  },
  {
    title: '今日の特売ウォークスルー',
    copy: '朝いちの市場を1分で回遊できる、更新しやすい導線です。'
  }
];

const specialGrid = document.getElementById('specialGrid');
const shopGrid = document.getElementById('shopGrid');
const eventTimeline = document.getElementById('eventTimeline');
const videoStrip = document.getElementById('videoStrip');
const featuredTitle = document.getElementById('featured-title');
const featuredCopy = document.getElementById('featured-copy');
const shuffleButton = document.getElementById('shuffleSpecials');
const joinForm = document.getElementById('joinForm');
const joinStatus = document.getElementById('joinStatus');
const filterButtons = document.querySelectorAll('[data-filter]');

let activeSpecialIndex = 0;
let activeFilter = 'all';

function renderSpecials() {
  const visible = specials.slice(activeSpecialIndex, activeSpecialIndex + 4);
  const list = visible.length === 4 ? visible : visible.concat(specials.slice(0, 4 - visible.length));

  specialGrid.innerHTML = list
    .map(
      (item, index) => `
        <article class="special-card">
          <span class="badge">${index + 1} / 本日の推し</span>
          <h3>${item.title}</h3>
          <p><strong>${item.label}</strong></p>
          <p>${item.copy}</p>
        </article>
      `
    )
    .join('');

  const featured = specials[activeSpecialIndex % specials.length];
  featuredTitle.textContent = featured.title;
  featuredCopy.textContent = featured.copy;
}

function renderShops() {
  const filtered = activeFilter === 'all' ? shops : shops.filter((shop) => shop.category === activeFilter);

  shopGrid.innerHTML = filtered
    .map(
      (shop) => `
        <article class="shop-card">
          <div class="shop-card__top">
            <h3>${shop.name}</h3>
            <span>${categoryLabel(shop.category)}</span>
          </div>
          <p>${shop.info}</p>
        </article>
      `
    )
    .join('');
}

function renderEvents() {
  eventTimeline.innerHTML = events
    .map(
      (event) => `
        <article class="event-card" data-date="${event.date}">
          <h3>${event.title}</h3>
          <p>${event.copy}</p>
        </article>
      `
    )
    .join('');
}

function renderVideos() {
  videoStrip.innerHTML = videos
    .map(
      (video) => `
        <article class="video-card">
          <div class="video-card__preview" aria-hidden="true"></div>
          <h3>${video.title}</h3>
          <p>${video.copy}</p>
        </article>
      `
    )
    .join('');
}

function categoryLabel(category) {
  switch (category) {
    case 'food':
      return '食材';
    case 'craft':
      return '手仕事';
    case 'daily':
      return '日用品';
    case 'season':
      return '季節物';
    default:
      return '市場';
  }
}

function updateFilterButtons(nextFilter) {
  filterButtons.forEach((button) => {
    button.classList.toggle('is-active', button.dataset.filter === nextFilter);
  });
}

shuffleButton.addEventListener('click', () => {
  activeSpecialIndex = (activeSpecialIndex + 1) % specials.length;
  renderSpecials();
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    activeFilter = button.dataset.filter;
    updateFilterButtons(activeFilter);
    renderShops();
  });
});

joinForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(joinForm);
  const name = formData.get('name');
  const interest = formData.get('interest');

  joinStatus.textContent = `${name}さん、${interest}のお知らせを受け取る準備ができました。市場の最新情報をお届けします。`;
  joinForm.reset();
});

renderSpecials();
renderShops();
renderEvents();
renderVideos();
updateFilterButtons(activeFilter);

setInterval(() => {
  activeSpecialIndex = (activeSpecialIndex + 1) % specials.length;
  renderSpecials();
}, 7000);
