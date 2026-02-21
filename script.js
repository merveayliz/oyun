
let acilanKartlar = [];
let eslesenCiftSayisi = 0;
const toplamCift = 3; // 🚀, 👽, ☢️ 




function menuyuGoster() {
    const form = document.querySelector('.glass-form');
    
    form.classList.add('zoom-out-exit');

   
    setTimeout(() => {
        document.getElementById('welcome-screen').classList.add('hidden');
        document.getElementById('menu-screen').classList.remove('hidden');
    }, 600);
}


function oyunuBaslat(oyunTipi) {
    document.getElementById('menu-screen').classList.add('hidden');
    document.getElementById('game-container').classList.remove('hidden');
    
   
    if (oyunTipi === 'hafiza') {
        document.getElementById('memory-game').classList.remove('hidden');
        document.getElementById('ball-game').classList.add('hidden');
        hafizaBaslat();
    } else if (oyunTipi === 'toplar') {
        document.getElementById('ball-game').classList.remove('hidden');
        document.getElementById('memory-game').classList.add('hidden');
        topOyunuBaslat(); 
    }
}



function hafizaBaslat() {
    const memoryArea = document.getElementById('memory-game');
    memoryArea.innerHTML = '<div class="grid" id="card-grid"></div>'; 
    
    const semboller = ['🚀', '🚀', '👽', '👽', '☢️', '☢️'];
 
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
   
    if (acilanKartlar.length < 2 && !card.classList.contains('flipped')) {
        card.classList.add('flipped');
        acilanKartlar.push({ card, sembol });

       
        if (acilanKartlar.length === 2) {
            if (acilanKartlar[0].sembol === acilanKartlar[1].sembol) {
              
                eslesenCiftSayisi++;
                acilanKartlar = [];
            
                if (eslesenCiftSayisi === toplamCift) {
                    setTimeout(tebrikEt, 500);
                }
            } else {
               
                setTimeout(() => {
                    acilanKartlar[0].card.classList.remove('flipped');
                    acilanKartlar[1].card.classList.remove('flipped');
                    acilanKartlar = [];
                }, 1000);
            }
        }
    }
}



function tebrikEt() {
    document.getElementById('win-modal').classList.remove('hidden');
}

function anaMenuyeDon() {
   
    location.reload(); 
}

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
    patlayanBalon = 0;
    balonOlustur();
}

function balonOlustur() {
   
    if (patlayanBalon >= hedefBalon) {
        tebrikEt();
        return; 
    }

    const stage = document.getElementById('ball-stage');
    if (!stage) return;

    const ball = document.createElement('div');
    ball.innerHTML = "&#x1F388;";
    ball.style.position = "absolute";
    ball.style.fontSize = "2rem";
    ball.style.cursor = "pointer";
    ball.style.transition = "all 0.2s";
    
   
    const x = Math.random() * (stage.clientWidth - 40);
    const y = Math.random() * (stage.clientHeight - 40);
    
    ball.style.left = x + "px";
    ball.style.top = y + "px";

  
    ball.onclick = function() {
        patlayanBalon++;
        ball.style.transform = "scale(0)"; 
        setTimeout(() => ball.remove(), 200); 
        balonOlustur(); 
    };

    stage.appendChild(ball);


    
    setTimeout(() => {
        if (ball.parentNode) {
            ball.remove();
            balonOlustur();
        }
    }, 1500);

}
