const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const outDir = path.join(__dirname, 'logos-instituto');

const simbolos = [
  // ═══ 1: BÚSSOLA ═══
  {
    name: 'simbolo-1-bussola',
    svg: `<svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Círculo externo -->
      <circle cx="200" cy="200" r="180" stroke="#1B3B5F" stroke-width="2.5"/>
      <!-- Marcas cardeais externas -->
      <line x1="200" y1="20" x2="200" y2="40" stroke="#1B3B5F" stroke-width="2"/>
      <line x1="200" y1="360" x2="200" y2="380" stroke="#1B3B5F" stroke-width="2"/>
      <line x1="20" y1="200" x2="40" y2="200" stroke="#1B3B5F" stroke-width="2"/>
      <line x1="360" y1="200" x2="380" y2="200" stroke="#1B3B5F" stroke-width="2"/>
      <!-- Marcas intercadeais -->
      <line x1="73" y1="73" x2="86" y2="86" stroke="#1B3B5F" stroke-width="1" opacity="0.4"/>
      <line x1="314" y1="73" x2="327" y2="86" stroke="#1B3B5F" stroke-width="1" opacity="0.4"/>
      <line x1="73" y1="327" x2="86" y2="314" stroke="#1B3B5F" stroke-width="1" opacity="0.4"/>
      <line x1="314" y1="327" x2="327" y2="314" stroke="#1B3B5F" stroke-width="1" opacity="0.4"/>
      <!-- Círculo interno -->
      <circle cx="200" cy="200" r="140" stroke="#D4AF37" stroke-width="1" opacity="0.3"/>
      <!-- Círculo decorativo -->
      <circle cx="200" cy="200" r="100" stroke="#1B3B5F" stroke-width="0.5" opacity="0.15" stroke-dasharray="4 4"/>
      <!-- Cruzes cardeais finas -->
      <line x1="200" y1="60" x2="200" y2="340" stroke="#1B3B5F" stroke-width="0.8" opacity="0.2"/>
      <line x1="60" y1="200" x2="340" y2="200" stroke="#1B3B5F" stroke-width="0.8" opacity="0.2"/>
      <!-- Diagonais -->
      <line x1="100" y1="100" x2="300" y2="300" stroke="#1B3B5F" stroke-width="0.4" opacity="0.1"/>
      <line x1="300" y1="100" x2="100" y2="300" stroke="#1B3B5F" stroke-width="0.4" opacity="0.1"/>
      <!-- Agulha Norte (dourada) -->
      <polygon points="200,45 210,175 190,175" fill="#D4AF37"/>
      <polygon points="200,45 210,175 200,165" fill="#C49B2F"/>
      <!-- Agulha Sul -->
      <polygon points="200,355 210,225 190,225" fill="#1B3B5F" opacity="0.25"/>
      <polygon points="200,355 210,225 200,235" fill="#1B3B5F" opacity="0.15"/>
      <!-- Agulha Leste -->
      <polygon points="355,200 225,190 225,210" fill="#1B3B5F" opacity="0.2"/>
      <!-- Agulha Oeste -->
      <polygon points="45,200 175,190 175,210" fill="#1B3B5F" opacity="0.2"/>
      <!-- Centro -->
      <circle cx="200" cy="200" r="18" fill="#FDFCF8" stroke="#D4AF37" stroke-width="2"/>
      <circle cx="200" cy="200" r="8" fill="#D4AF37"/>
      <circle cx="200" cy="200" r="3" fill="#1B3B5F"/>
      <!-- Letras cardeais -->
      <text x="200" y="18" text-anchor="middle" font-family="'Montserrat',sans-serif" font-size="14" font-weight="700" fill="#D4AF37">N</text>
      <text x="200" y="398" text-anchor="middle" font-family="'Montserrat',sans-serif" font-size="12" font-weight="500" fill="#1B3B5F" opacity="0.4">S</text>
      <text x="395" y="205" text-anchor="middle" font-family="'Montserrat',sans-serif" font-size="12" font-weight="500" fill="#1B3B5F" opacity="0.4">L</text>
      <text x="7" y="205" text-anchor="middle" font-family="'Montserrat',sans-serif" font-size="12" font-weight="500" fill="#1B3B5F" opacity="0.4">O</text>
    </svg>`
  },

  // ═══ 2: ESCUDO HERÁLDICO ═══
  {
    name: 'simbolo-2-escudo',
    svg: `<svg width="340" height="420" viewBox="0 0 340 420" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Escudo externo -->
      <path d="M 170 10 L 320 60 L 320 220 Q 320 350, 170 410 Q 20 350, 20 220 L 20 60 Z"
            stroke="#1B3B5F" stroke-width="3" fill="none"/>
      <!-- Escudo interno -->
      <path d="M 170 28 L 300 72 L 300 215 Q 300 332, 170 388 Q 40 332, 40 215 L 40 72 Z"
            stroke="#D4AF37" stroke-width="1" fill="none" opacity="0.3"/>
      <!-- Faixa horizontal -->
      <line x1="60" y1="180" x2="280" y2="180" stroke="#D4AF37" stroke-width="1.5" opacity="0.5"/>
      <line x1="60" y1="240" x2="280" y2="240" stroke="#D4AF37" stroke-width="1.5" opacity="0.5"/>
      <!-- Letras IMB -->
      <text x="108" y="222" font-family="'Playfair Display',serif" font-size="52" font-weight="700" fill="#1B3B5F" opacity="0.9">I</text>
      <text x="140" y="222" font-family="'Playfair Display',serif" font-size="52" font-weight="700" fill="#1B3B5F" opacity="0.9">M</text>
      <text x="200" y="222" font-family="'Playfair Display',serif" font-size="52" font-weight="700" fill="#1B3B5F" opacity="0.9">B</text>
      <!-- Coroa/detalhes superiores -->
      <path d="M 120 110 L 170 80 L 220 110" stroke="#D4AF37" stroke-width="1.5" fill="none"/>
      <circle cx="170" cy="78" r="5" fill="#D4AF37"/>
      <circle cx="120" cy="112" r="3" fill="#D4AF37" opacity="0.5"/>
      <circle cx="220" cy="112" r="3" fill="#D4AF37" opacity="0.5"/>
      <!-- Cruz decorativa no topo -->
      <line x1="170" y1="100" x2="170" y2="145" stroke="#1B3B5F" stroke-width="1" opacity="0.3"/>
      <line x1="150" y1="125" x2="190" y2="125" stroke="#1B3B5F" stroke-width="1" opacity="0.3"/>
      <!-- Estrela inferior -->
      <polygon points="170,280 175,296 192,296 178,306 183,322 170,312 157,322 162,306 148,296 165,296"
               fill="#D4AF37" opacity="0.6"/>
      <!-- Ramos decorativos -->
      <path d="M 100 320 Q 130 300, 145 310 Q 155 316, 160 330" stroke="#1B3B5F" stroke-width="0.8" fill="none" opacity="0.2"/>
      <path d="M 240 320 Q 210 300, 195 310 Q 185 316, 180 330" stroke="#1B3B5F" stroke-width="0.8" fill="none" opacity="0.2"/>
    </svg>`
  },

  // ═══ 3: ESTRELA DE DAVI ═══
  {
    name: 'simbolo-3-estrela',
    svg: `<svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Triângulo apontando pra cima -->
      <polygon points="200,40 350,300 50,300"
               stroke="#1B3B5F" stroke-width="2.5" fill="none" stroke-linejoin="round"/>
      <!-- Triângulo apontando pra baixo -->
      <polygon points="200,360 350,100 50,100"
               stroke="#1B3B5F" stroke-width="2.5" fill="none" stroke-linejoin="round"/>
      <!-- Hexágono central (interseção) -->
      <polygon points="200,100 300,157 300,243 200,300 100,243 100,157"
               stroke="#D4AF37" stroke-width="0.8" fill="none" opacity="0.3"/>
      <!-- Círculo interno -->
      <circle cx="200" cy="200" r="60" stroke="#D4AF37" stroke-width="1" fill="none" opacity="0.25"/>
      <!-- Centro -->
      <circle cx="200" cy="200" r="22" fill="none" stroke="#D4AF37" stroke-width="1.5"/>
      <circle cx="200" cy="200" r="8" fill="#D4AF37"/>
      <circle cx="200" cy="200" r="3" fill="#1B3B5F"/>
      <!-- Pontos nas pontas -->
      <circle cx="200" cy="40" r="4" fill="#D4AF37" opacity="0.6"/>
      <circle cx="200" cy="360" r="4" fill="#D4AF37" opacity="0.6"/>
      <circle cx="350" cy="300" r="4" fill="#D4AF37" opacity="0.4"/>
      <circle cx="50" cy="300" r="4" fill="#D4AF37" opacity="0.4"/>
      <circle cx="350" cy="100" r="4" fill="#D4AF37" opacity="0.4"/>
      <circle cx="50" cy="100" r="4" fill="#D4AF37" opacity="0.4"/>
      <!-- Detalhes sutis de luz -->
      <line x1="200" y1="140" x2="200" y2="110" stroke="#D4AF37" stroke-width="0.5" opacity="0.3"/>
      <line x1="200" y1="260" x2="200" y2="290" stroke="#D4AF37" stroke-width="0.5" opacity="0.3"/>
    </svg>`
  },

  // ═══ 4: LIVRO / TORÁH ═══
  {
    name: 'simbolo-4-livro',
    svg: `<svg width="420" height="360" viewBox="0 0 420 360" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Página esquerda -->
      <path d="M 210 80 Q 130 60, 40 90 L 40 290 Q 130 260, 210 280"
            stroke="#1B3B5F" stroke-width="2.5" fill="none" stroke-linejoin="round"/>
      <!-- Página direita -->
      <path d="M 210 80 Q 290 60, 380 90 L 380 290 Q 290 260, 210 280"
            stroke="#1B3B5F" stroke-width="2.5" fill="none" stroke-linejoin="round"/>
      <!-- Lombada -->
      <line x1="210" y1="80" x2="210" y2="280" stroke="#D4AF37" stroke-width="3"/>
      <!-- Linhas de texto esquerda -->
      <line x1="70" y1="130" x2="180" y2="120" stroke="#1B3B5F" stroke-width="0.8" opacity="0.2"/>
      <line x1="70" y1="150" x2="180" y2="140" stroke="#1B3B5F" stroke-width="0.8" opacity="0.2"/>
      <line x1="70" y1="170" x2="180" y2="160" stroke="#1B3B5F" stroke-width="0.8" opacity="0.2"/>
      <line x1="70" y1="190" x2="160" y2="182" stroke="#1B3B5F" stroke-width="0.8" opacity="0.15"/>
      <line x1="70" y1="210" x2="180" y2="200" stroke="#1B3B5F" stroke-width="0.8" opacity="0.2"/>
      <line x1="70" y1="230" x2="170" y2="222" stroke="#1B3B5F" stroke-width="0.8" opacity="0.15"/>
      <!-- Linhas de texto direita -->
      <line x1="240" y1="120" x2="350" y2="130" stroke="#1B3B5F" stroke-width="0.8" opacity="0.2"/>
      <line x1="240" y1="140" x2="350" y2="150" stroke="#1B3B5F" stroke-width="0.8" opacity="0.2"/>
      <line x1="240" y1="160" x2="350" y2="170" stroke="#1B3B5F" stroke-width="0.8" opacity="0.2"/>
      <line x1="240" y1="182" x2="330" y2="190" stroke="#1B3B5F" stroke-width="0.8" opacity="0.15"/>
      <line x1="240" y1="200" x2="350" y2="210" stroke="#1B3B5F" stroke-width="0.8" opacity="0.2"/>
      <line x1="240" y1="222" x2="340" y2="230" stroke="#1B3B5F" stroke-width="0.8" opacity="0.15"/>
      <!-- Raios de luz/sabedoria -->
      <line x1="210" y1="30" x2="210" y2="65" stroke="#D4AF37" stroke-width="1.5"/>
      <line x1="185" y1="38" x2="195" y2="68" stroke="#D4AF37" stroke-width="1" opacity="0.6"/>
      <line x1="235" y1="38" x2="225" y2="68" stroke="#D4AF37" stroke-width="1" opacity="0.6"/>
      <line x1="165" y1="50" x2="182" y2="72" stroke="#D4AF37" stroke-width="0.7" opacity="0.4"/>
      <line x1="255" y1="50" x2="238" y2="72" stroke="#D4AF37" stroke-width="0.7" opacity="0.4"/>
      <!-- Chama/ponto central -->
      <path d="M 210 35 Q 205 45, 210 55 Q 215 45, 210 35" fill="#D4AF37" opacity="0.8"/>
      <circle cx="210" cy="30" r="4" fill="#D4AF37"/>
      <!-- Base decorativa -->
      <path d="M 140 300 Q 210 320, 280 300" stroke="#D4AF37" stroke-width="1" fill="none" opacity="0.3"/>
      <path d="M 160 310 Q 210 326, 260 310" stroke="#D4AF37" stroke-width="0.5" fill="none" opacity="0.2"/>
    </svg>`
  },

  // ═══ 5: PILAR / COLUNA ═══
  {
    name: 'simbolo-5-pilar',
    svg: `<svg width="280" height="440" viewBox="0 0 280 440" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Base inferior -->
      <rect x="30" y="400" width="220" height="20" rx="3" stroke="#1B3B5F" stroke-width="2" fill="none"/>
      <rect x="50" y="380" width="180" height="20" rx="2" stroke="#1B3B5F" stroke-width="1.5" fill="none"/>
      <rect x="60" y="365" width="160" height="15" rx="2" stroke="#1B3B5F" stroke-width="1" fill="none"/>
      <!-- Coluna principal -->
      <rect x="80" y="110" width="120" height="255" rx="3" stroke="#1B3B5F" stroke-width="2" fill="none"/>
      <!-- Caneluras da coluna -->
      <line x1="100" y1="115" x2="100" y2="360" stroke="#1B3B5F" stroke-width="0.5" opacity="0.2"/>
      <line x1="120" y1="115" x2="120" y2="360" stroke="#1B3B5F" stroke-width="0.5" opacity="0.2"/>
      <line x1="140" y1="115" x2="140" y2="360" stroke="#1B3B5F" stroke-width="0.5" opacity="0.2"/>
      <line x1="160" y1="115" x2="160" y2="360" stroke="#1B3B5F" stroke-width="0.5" opacity="0.2"/>
      <line x1="180" y1="115" x2="180" y2="360" stroke="#1B3B5F" stroke-width="0.5" opacity="0.2"/>
      <!-- Capitel superior -->
      <rect x="60" y="95" width="160" height="15" rx="2" stroke="#1B3B5F" stroke-width="1" fill="none"/>
      <rect x="50" y="75" width="180" height="20" rx="2" stroke="#1B3B5F" stroke-width="1.5" fill="none"/>
      <rect x="40" y="60" width="200" height="15" rx="3" stroke="#1B3B5F" stroke-width="2" fill="none"/>
      <!-- Volutas do capitel -->
      <path d="M 50 75 Q 35 65, 40 55 Q 45 48, 55 52" stroke="#1B3B5F" stroke-width="1.2" fill="none" opacity="0.4"/>
      <path d="M 230 75 Q 245 65, 240 55 Q 235 48, 225 52" stroke="#1B3B5F" stroke-width="1.2" fill="none" opacity="0.4"/>
      <!-- Coroa dourada -->
      <path d="M 90 48 L 110 18 L 140 38 L 170 18 L 190 48"
            stroke="#D4AF37" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="110" cy="16" r="4" fill="#D4AF37"/>
      <circle cx="140" cy="36" r="3" fill="#D4AF37" opacity="0.6"/>
      <circle cx="170" cy="16" r="4" fill="#D4AF37"/>
      <circle cx="140" cy="12" r="5" fill="#D4AF37"/>
      <!-- Detalhes na coluna -->
      <line x1="90" y1="200" x2="190" y2="200" stroke="#D4AF37" stroke-width="0.5" opacity="0.2"/>
      <line x1="90" y1="270" x2="190" y2="270" stroke="#D4AF37" stroke-width="0.5" opacity="0.2"/>
      <!-- Diamante central -->
      <rect x="132" y="228" width="16" height="16" rx="1" transform="rotate(45 140 236)" stroke="#D4AF37" stroke-width="1" fill="none" opacity="0.4"/>
    </svg>`
  }
];

(async () => {
  const browser = await chromium.launch();

  for (const s of simbolos) {
    const page = await browser.newPage({ viewport: { width: 500, height: 500 } });
    await page.setContent(`<!DOCTYPE html><html><head>
      <meta charset="UTF-8">
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Montserrat:wght@400;500;700&display=swap" rel="stylesheet">
      <style>*{margin:0;padding:0;box-sizing:border-box;}body{background:#FDFCF8;display:flex;align-items:center;justify-content:center;width:500px;height:500px;}</style>
    </head><body>${s.svg}</body></html>`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(outDir, s.name + '.png'), type: 'png' });
    await page.close();
  }

  await browser.close();
  console.log('Símbolos gerados!');
})();
