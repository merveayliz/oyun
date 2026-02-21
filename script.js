// --- DEĞİŞKENLER (Hafıza Kartı Oyunu İçin) ---
let acilanKartlar = [];
let eslesenCiftSayisi = 0;
const toplamCift = 3; // 🚀, 👽, ☢️ olmak üzere 3 çiftimiz var

// --- 1. ADIM: EKRAN YÖNETİMİ ---

// Giriş ekranından Menüye geçiş
function menuyuGoster() {
    const form = document.querySelector('.glass-form');
    // CSS'deki büyütme efektini çalıştırıyoruz
    form.classList.add('zoom-out-exit');

    // Animasyon (0.6s) bitince ekranları değiştir
    setTimeout(() => {
        document.getElementById('welcome-screen').classList.add('hidden');
        document.getElementById('menu-screen').classList.remove('hidden');
    }, 600);
}

// Menüden seçilen oyuna giriş
function oyunuBaslat(oyunTipi) {
    document.getElementById('menu-screen').classList.add('hidden');
    document.getElementById('game-container').classList.remove('hidden');
    
    // IF-ELSE kullanarak hangi oyunun açılacağına karar veriyoruz
    if (oyunTipi === 'hafiza') {
        document.getElementById('memory-game').classList.remove('hidden');
        document.getElementById('ball-game').classList.add('hidden');
        hafizaBaslat(); // Hafıza oyununu kuran fonksiyonu çağır
    } else if (oyunTipi === 'toplar') {
        document.getElementById('ball-game').classList.remove('hidden');
        document.getElementById('memory-game').classList.add('hidden');
        topOyunuBaslat(); // Top oyununu kuran fonksiyonu çağır
    }
}

// --- 2. ADIM: HAFIZA KARTLARI OYUN MANTIĞI ---

function hafizaBaslat() {
    const memoryArea = document.getElementById('memory-game');
    memoryArea.innerHTML = '<div class="grid" id="card-grid"></div>'; // Grid'i oluştur
    
    const semboller = ['🚀', '🚀', '👽', '👽', '☢️', '☢️'];
    // Kartları karıştırıyoruz
    const karisik = semboller.sort(() => Math.random() - 0.5); 
    
    const grid = document.getElementById('card-grid');
    
    karisik.forEach(sembol => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="card-front">?</div>
            <div class="card-back">${sembol}</div>
        `;
        card.onclick = () => kartCevir(card, sembol);
        grid.appendChild(card);
    });
}

function kartCevir(card, sembol) {
    // Aynı karta tekrar basılmasını veya 2'den fazla kart açılmasını engelle
    if (acilanKartlar.length < 2 && !card.classList.contains('flipped')) {
        card.classList.add('flipped');
        acilanKartlar.push({ card, sembol });

        // Eğer 2 kart açıldıysa kontrol et
        if (acilanKartlar.length === 2) {
            if (acilanKartlar[0].sembol === acilanKartlar[1].sembol) {
                // EŞLEŞME OLDU!
                eslesenCiftSayisi++;
                acilanKartlar = [];
                // Eğer tüm çiftler bittiyse tebrik et
                if (eslesenCiftSayisi === toplamCift) {
                    setTimeout(tebrikEt, 500);
                }
            } else {
                // EŞLEŞME OLMADI, kartları geri kapat
                setTimeout(() => {
                    acilanKartlar[0].card.classList.remove('flipped');
                    acilanKartlar[1].card.classList.remove('flipped');
                    acilanKartlar = [];
                }, 1000);
            }
        }
    }
}


// --- 4. ADIM: SONUÇ VE GERİ DÖNÜŞ ---

function tebrikEt() {
    document.getElementById('win-modal').classList.remove('hidden');
}

function anaMenuyeDon() {
    // Sayfayı yenileyerek tüm değişkenleri ve ekranları sıfırlar
    location.reload(); 
}
// --- 5. ADIM: BALON PATLATMA OYUNU ---
let patlayanBalon = 0;
const hedefBalon = 10;

function topOyunuBaslat() {
    const ballArea = document.getElementById('ball-game');
    ballArea.innerHTML = `
        <div style="text-align:center;">
            <h3>&#x1F388; Hızlı Ol! 10 Balon Patlat</h3>
            <div id="ball-stage" style="width:100%; height:300px; position:relative; background:rgba(0,0,0,0.3); border-radius:15px; overflow:hidden; margin-top:10px;"></div>
        </div>
    `;
    patlayanBalon = 0; // Sıfırla
    balonOlustur();
}

function balonOlustur() {
    // Eğer 10 balon patladıysa oyunu bitir (if-else şovu!)
    if (patlayanBalon >= hedefBalon) {
        tebrikEt();
        return; // Fonksiyonu durdur
    }

    const stage = document.getElementById('ball-stage');
    if (!stage) return; // Eğer oyundan çıkıldıysa durdur

    const ball = document.createElement('div');
    ball.innerHTML = "&#x1F388;";
    ball.style.position = "absolute";
    ball.style.fontSize = "2rem";
    ball.style.cursor = "pointer";
    ball.style.transition = "all 0.2s";
    
    // Rastgele konum hesaplama (Math.random kullanarak)
    const x = Math.random() * (stage.clientWidth - 40);
    const y = Math.random() * (stage.clientHeight - 40);
    
    ball.style.left = x + "px";
    ball.style.top = y + "px";

    // Balona tıklandığında (Patlatma)
    ball.onclick = function() {
        patlayanBalon++; // Skoru artır
        ball.style.transform = "scale(0)"; // Küçülerek yok ol
        setTimeout(() => ball.remove(), 200); // 0.2 saniye sonra HTML'den sil
        balonOlustur(); // Yeni balon çıkar
    };

    stage.appendChild(ball);

    // Eğer patlatılmazsa 1.5 saniye sonra kendi kendine silinsin ve yenisi gelsin
    setTimeout(() => {
        if (ball.parentNode) {
            ball.remove();
            balonOlustur();
        }
    }, 1500);
}