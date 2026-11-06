// 설정값 (디자인의 props)
const config = {
    autoplay: true,   // 히어로 자동 슬라이드
    interval: 4,      // 슬라이드 간격(초)
    showNotice: true  // 하단 공지 표시
};

// 카드 색상 클래스 (색상 정의는 css/credit.css)
function themeClass(item) {
    return item.accent ? 'accent' : `pastel hue-${item.hue}`;
}

// ----- 데이터 -----
const heroCards = [
    { eyebrow: '내 소득구간은?', title: '월 850만원\n대상자', img: 'income illustration', foot: '소득 변동 여부를 확인하세요' },
    { eyebrow: '개인 신용은 봤다면', title: '우리 회사는?\n기업 신용평가', img: 'report illustration', foot: '사업자 신용 한눈에' },
    { eyebrow: '내 자산 현황은?', title: '총 자산\n3,250만원', img: 'asset illustration', foot: '계좌·카드 한 번에 연결' },
    { eyebrow: '이번 달 소비는?', title: '지난달보다\n12% 증가', img: 'spending chart', foot: '지난달 대비 소비 변화' }
];

const guards = [
    { badge: '신용을 지켜주세요!', eyebrow: '내 신용조회 차단', title: '해제 중' },
    { badge: '명의를 지켜주세요!', eyebrow: '내 명의도용 차단', title: '해제 중' }
];

const services = [
    { name: '점수 올리기', hue: 258 },
    { name: '연체 방지', hue: 30 },
    { name: '신용조회 차단', hue: 250 },
    { name: '명의도용 차단', hue: 290 },
    { name: '대출 가능 진단', hue: 258, tag: 'N' },
    { name: '카드 발급 진단', hue: 250 },
    { name: '보험 혜택 진단', hue: 30 },
    { name: '이름 어때', hue: 290, tag: 'HOT' }
];

const benefits = [
    { eyebrow: '개인/커플/사업자/집주인', title: '내 신용을 제출할 때\n신용보고서', hue: 250 },
    { eyebrow: '#이름분석 #이름랭킹', title: '나와 똑같은 이름\n전국에 몇 명?', hue: 290 },
    { eyebrow: '신용점수 예측하기', title: '대출 신규로 받으면\n내 신용점수는?', accent: true },
    { eyebrow: '무료 신용조회', title: '나의 신용점수\n무료로 조회해보세요', hue: 258 },
    { eyebrow: '제휴 저축은행 신용대출', title: '내 대출한도가\n도착했습니다!', hue: 30 },
    { eyebrow: '맞춤 채무조정', title: '해결되지 않는 연체\n회생·파산 무료 진단', hue: 80 }
];

const perks = [
    { eyebrow: '부동산 담보대출', title: '지금 가능한\n최대 한도는?', hue: 200 },
    { eyebrow: '맞춤 채무조정 솔루션', title: '채무나 연체\n있으신가요?', hue: 250 },
    { eyebrow: '보험 혜택 진단', title: '나에게 맞는\n혜택 받기', hue: 80 },
    { eyebrow: '맞춤형 대출상품', title: '내 신용점수로\n대출진단 받기', hue: 290 },
    { eyebrow: '맞춤형 카드상품', title: '내 신용에 맞는\n카드 찾기', hue: 350 }
];

// ----- 렌더링 -----
const heroTrack = document.querySelector('#heroTrack');
heroCards.forEach(c => {
    heroTrack.insertAdjacentHTML('beforeend', `
        <div class="swiper-slide">
            <div class="hero-card">
                <div class="eyebrow">${c.eyebrow}</div>
                <div class="title">${c.title}</div>
                <div class="placeholder">${c.img}</div>
                <div class="hero-foot">${c.foot}</div>
            </div>
        </div>`);
});

document.querySelector('#guards').innerHTML = guards.map(g => `
    <div class="guard">
        <span class="guard-badge">${g.badge}</span>
        <div class="eyebrow">${g.eyebrow}</div>
        <div class="title">${g.title} ›</div>
        <div class="spacer"></div>
        <div class="placeholder">icon</div>
    </div>`).join('');

document.querySelector('#services').innerHTML = services.map(s => `
    <div class="service">
        <div class="service-icon hue-${s.hue}">
            <i></i>
            ${s.tag ? `<span class="service-tag">${s.tag}</span>` : ''}
        </div>
        <span class="service-name">${s.name}</span>
    </div>`).join('');

document.querySelector('#benefits').innerHTML = benefits.map(b => `
    <div class="benefit ${themeClass(b)}">
        <div class="benefit-eyebrow">${b.eyebrow}</div>
        <div class="benefit-title">${b.title}</div>
        <div class="spacer"></div>
        <div class="benefit-img pastel-img"></div>
    </div>`).join('');

document.querySelector('#perks').innerHTML = perks.map(p => `
    <div class="perk ${themeClass(p)}">
        <div class="perk-img pastel-img"></div>
        <div class="perk-eyebrow">${p.eyebrow}</div>
        <div class="perk-title">${p.title}</div>
    </div>`).join('');

if (!config.showNotice) {
    document.querySelector('#notice').remove();
}

// ----- 히어로 캐러셀 (Swiper) -----
const heroSwiper = new Swiper('.hero-swiper', {
    loop: true,
    loopAdditionalSlides: 4,   // 카드 폭 고정(auto)이라 복제 슬라이드를 넉넉히 확보
    slidesPerView: 'auto',     // 기존 카드 폭(360px) 유지
    spaceBetween: 24,
    grabCursor: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        bulletClass: 'swiper-pagination-bullet',
        bulletActiveClass: 'swiper-pagination-bullet-active'
    },
    autoplay: config.autoplay ? { delay: config.interval * 1000, disableOnInteraction: false } : false
});

// ----- 메뉴 드롭다운 -----
const menuBtn = document.querySelector('.menu-btn');
const menuDropdown = document.querySelector('.menu-dropdown');
const menuItems = document.querySelectorAll('.menu-item');

menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    menuDropdown.classList.toggle('active');
});

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        menuDropdown.classList.remove('active');
    });
});

document.addEventListener('click', () => {
    menuDropdown.classList.remove('active');
});

// ----- 신용점수 탭 -----
const scoreData = {
    '대출': { label: '대출 신용점수', value: 750 },
    '카드': { label: '카드 신용점수', value: 820 },
    '연체': { label: '연체 신용점수', value: 950 }
};

const scoreTabs = document.querySelectorAll('.score-tab');
const scoreLabel = document.querySelector('#scoreLabel');
const scoreValue = document.querySelector('#scoreValue');

scoreTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const type = tab.dataset.type;
        scoreTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        scoreLabel.textContent = scoreData[type].label;
        scoreValue.textContent = scoreData[type].value;
    });
});

// ----- 검색 모달 -----
const searchBtn = document.querySelector('#search');
const searchModal = document.querySelector('#searchModal');
const searchOverlay = document.querySelector('#searchOverlay');
const searchClose = document.querySelector('#searchClose');
const searchInput = document.querySelector('.search-input');

searchBtn.addEventListener('click', () => {
    searchModal.classList.add('active');
    searchInput.focus();
});

searchClose.addEventListener('click', () => {
    searchModal.classList.remove('active');
});

searchOverlay.addEventListener('click', () => {
    searchModal.classList.remove('active');
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchModal.classList.contains('active')) {
        searchModal.classList.remove('active');
    }
});
