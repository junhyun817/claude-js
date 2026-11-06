const fmt = n => n.toLocaleString('ko-KR');
const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

fetch('melon.json')
    .then(res => res.json())
    .then(songs => {
        songs.sort((a, b) => a.rank - b.rank);
        render(songs.slice(0, 12), songs.slice(12));
    })
    .catch(() => {
        document.querySelector('.wrap').insertAdjacentHTML('beforeend',
            '<p class="error">melon.json을 불러오지 못했습니다. 로컬 서버(Live Server 등)로 열어 주세요.</p>');
    });

function render(top, rest) {
    document.querySelector('#topTrack').innerHTML = top.map(s => `
        <div class="swiper-slide">
            <div class="card-cover">
                <img src="${s.albumCover}" alt="${esc(s.title)}" loading="lazy">
                <span class="card-rank">${s.rank}</span>
            </div>
            <div class="card-title">${esc(s.title)}</div>
            <div class="card-meta">${esc(s.artist)}</div>
            <div class="card-actions">
                <button class="like-btn"><span class="heart">♡</span>${fmt(s.likes)}</button>
                <button class="play-btn">재생</button>
            </div>
        </div>`).join('');

    document.querySelector('#chartList').innerHTML = rest.map(s => `
        <li>
            <span class="rank">${s.rank}</span>
            <img class="cover" src="${s.albumCover}" alt="${esc(s.title)}" loading="lazy">
            <div class="info">
                <div class="title">${esc(s.title)}</div>
                <div class="artist">${esc(s.artist)}</div>
                <div class="likes"><span class="heart">♥</span>${fmt(s.likes)}</div>
            </div>
            <div class="btns">
                <button class="btn-line">상세보기</button>
                <button class="btn-fill">재생</button>
            </div>
        </li>`).join('');

    new Swiper('.top-swiper', {
        slidesPerView: 'auto',
        spaceBetween: 24,
        grabCursor: true,
        navigation: { prevEl: '#topPrev', nextEl: '#topNext' }
    });

    document.querySelectorAll('.like-btn').forEach(btn => btn.addEventListener('click', () => {
        const on = btn.classList.toggle('on');
        btn.querySelector('.heart').textContent = on ? '♥' : '♡';
    }));
}
