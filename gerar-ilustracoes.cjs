const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const outDir = path.join(__dirname, 'logos-instituto');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const SIZE = 800;

// ═══════════════════════════════════════════════════════
// ILUSTRAÇÃO 1 — BÚSSOLA DETALHADA
// ═══════════════════════════════════════════════════════
const svg1 = `
<svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bg1" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#F8F6F0"/>
      <stop offset="100%" stop-color="#EDE8DC"/>
    </radialGradient>
    <linearGradient id="goldG1" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#E8C849"/>
      <stop offset="50%" stop-color="#D4AF37"/>
      <stop offset="100%" stop-color="#B8962E"/>
    </linearGradient>
    <linearGradient id="blueG1" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#2A5580"/>
      <stop offset="100%" stop-color="#1B3B5F"/>
    </linearGradient>
    <linearGradient id="needleN" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#E8C849"/>
      <stop offset="100%" stop-color="#C9A030"/>
    </linearGradient>
    <linearGradient id="needleS" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#8899AA"/>
      <stop offset="100%" stop-color="#6B7B8D"/>
    </linearGradient>
    <filter id="shadow1" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#1B3B5F" flood-opacity="0.15"/>
    </filter>
    <filter id="glow1">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <!-- Fundo -->
  <rect width="500" height="500" fill="url(#bg1)" rx="20"/>

  <!-- Anel externo com marcações -->
  <circle cx="250" cy="250" r="210" fill="none" stroke="url(#blueG1)" stroke-width="4" filter="url(#shadow1)"/>
  <circle cx="250" cy="250" r="205" fill="none" stroke="url(#blueG1)" stroke-width="1"/>
  <circle cx="250" cy="250" r="200" fill="none" stroke="url(#goldG1)" stroke-width="0.5" opacity="0.4"/>

  <!-- 360 graus - marcações finas -->
  ${Array.from({length: 72}, (_, i) => {
    const angle = i * 5 * Math.PI / 180;
    const isMajor = i % 18 === 0;
    const isMid = i % 9 === 0;
    const r1 = isMajor ? 190 : (isMid ? 195 : 198);
    const r2 = 205;
    const x1 = 250 + r1 * Math.sin(angle);
    const y1 = 250 - r1 * Math.cos(angle);
    const x2 = 250 + r2 * Math.sin(angle);
    const y2 = 250 - r2 * Math.cos(angle);
    const sw = isMajor ? 2 : (isMid ? 1.2 : 0.5);
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#1B3B5F" stroke-width="${sw}" opacity="${isMajor ? 1 : 0.5}"/>`;
  }).join('\n  ')}

  <!-- Letras cardeais -->
  <text x="250" y="30" text-anchor="middle" font-family="Georgia, serif" font-size="22" font-weight="700" fill="url(#goldG1)">N</text>
  <text x="250" y="478" text-anchor="middle" font-family="Georgia, serif" font-size="22" font-weight="700" fill="#1B3B5F">S</text>
  <text x="478" y="257" text-anchor="middle" font-family="Georgia, serif" font-size="22" font-weight="700" fill="#1B3B5F">L</text>
  <text x="22" y="257" text-anchor="middle" font-family="Georgia, serif" font-size="22" font-weight="700" fill="#1B3B5F">O</text>

  <!-- Letras intercardeais -->
  <text x="405" y="100" text-anchor="middle" font-family="Georgia, serif" font-size="13" fill="#8899AA">NE</text>
  <text x="95" y="100" text-anchor="middle" font-family="Georgia, serif" font-size="13" fill="#8899AA">NO</text>
  <text x="405" y="410" text-anchor="middle" font-family="Georgia, serif" font-size="13" fill="#8899AA">SE</text>
  <text x="95" y="410" text-anchor="middle" font-family="Georgia, serif" font-size="13" fill="#8899AA">SO</text>

  <!-- Anel interno dourado -->
  <circle cx="250" cy="250" r="170" fill="none" stroke="url(#goldG1)" stroke-width="1.5" opacity="0.6"/>
  <circle cx="250" cy="250" r="165" fill="none" stroke="url(#goldG1)" stroke-width="0.5" opacity="0.3"/>

  <!-- Rosa dos ventos - pétalas principais (N/S/L/O) -->
  <!-- Norte (dourada) -->
  <polygon points="250,80 265,230 250,220 235,230" fill="url(#needleN)" stroke="#B8962E" stroke-width="0.5" filter="url(#shadow1)"/>
  <!-- Sul (prata/cinza) -->
  <polygon points="250,420 265,270 250,280 235,270" fill="url(#needleS)" stroke="#5A6A7A" stroke-width="0.5"/>
  <!-- Leste -->
  <polygon points="420,250 270,235 280,250 270,265" fill="#2A5580" stroke="#1B3B5F" stroke-width="0.5"/>
  <!-- Oeste -->
  <polygon points="80,250 230,235 220,250 230,265" fill="#2A5580" stroke="#1B3B5F" stroke-width="0.5"/>

  <!-- Rosa dos ventos - pétalas secundárias (NE/NO/SE/SO) -->
  <polygon points="370,130 275,240 268,233" fill="#3A6590" opacity="0.7"/>
  <polygon points="130,130 225,240 232,233" fill="#3A6590" opacity="0.7"/>
  <polygon points="370,370 275,260 268,267" fill="#3A6590" opacity="0.7"/>
  <polygon points="130,370 225,260 232,267" fill="#3A6590" opacity="0.7"/>

  <!-- Centro da bússola -->
  <circle cx="250" cy="250" r="22" fill="#FDFCF8" stroke="url(#goldG1)" stroke-width="2.5"/>
  <circle cx="250" cy="250" r="16" fill="url(#goldG1)" stroke="#B8962E" stroke-width="1"/>
  <circle cx="250" cy="250" r="8" fill="#FDFCF8" stroke="url(#goldG1)" stroke-width="1.5"/>
  <circle cx="250" cy="250" r="3" fill="url(#goldG1)"/>

  <!-- Detalhes ornamentais nos cantos -->
  <path d="M 45 45 Q 55 55 45 65" fill="none" stroke="url(#goldG1)" stroke-width="1.5" opacity="0.4"/>
  <path d="M 455 45 Q 445 55 455 65" fill="none" stroke="url(#goldG1)" stroke-width="1.5" opacity="0.4"/>
  <path d="M 45 455 Q 55 445 45 435" fill="none" stroke="url(#goldG1)" stroke-width="1.5" opacity="0.4"/>
  <path d="M 455 455 Q 445 445 455 435" fill="none" stroke="url(#goldG1)" stroke-width="1.5" opacity="0.4"/>
</svg>`;

// ═══════════════════════════════════════════════════════
// ILUSTRAÇÃO 2 — ESCUDO HERÁLDICO DETALHADO
// ═══════════════════════════════════════════════════════
const svg2 = `
<svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bg2" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#F8F6F0"/>
      <stop offset="100%" stop-color="#EDE8DC"/>
    </radialGradient>
    <linearGradient id="goldG2" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#E8C849"/>
      <stop offset="50%" stop-color="#D4AF37"/>
      <stop offset="100%" stop-color="#B8962E"/>
    </linearGradient>
    <linearGradient id="blueG2" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#2A5580"/>
      <stop offset="100%" stop-color="#142D45"/>
    </linearGradient>
    <linearGradient id="shieldFill" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FDFCF8"/>
      <stop offset="80%" stop-color="#F5F0E5"/>
      <stop offset="100%" stop-color="#EDE8DC"/>
    </linearGradient>
    <filter id="shadow2" x="-5%" y="-5%" width="115%" height="115%">
      <feDropShadow dx="2" dy="4" stdDeviation="6" flood-color="#1B3B5F" flood-opacity="0.2"/>
    </filter>
    <clipPath id="shieldClip">
      <path d="M 250 30 L 420 80 Q 430 85 430 95 L 430 250 Q 430 350 350 410 L 250 470 L 150 410 Q 70 350 70 250 L 70 95 Q 70 85 80 80 Z"/>
    </clipPath>
  </defs>

  <rect width="500" height="500" fill="url(#bg2)" rx="20"/>

  <!-- Escudo principal -->
  <path d="M 250 30 L 420 80 Q 430 85 430 95 L 430 250 Q 430 350 350 410 L 250 470 L 150 410 Q 70 350 70 250 L 70 95 Q 70 85 80 80 Z"
        fill="url(#shieldFill)" stroke="url(#blueG2)" stroke-width="4" filter="url(#shadow2)"/>

  <!-- Borda interna do escudo -->
  <path d="M 250 48 L 410 93 Q 418 96 418 104 L 418 250 Q 418 342 342 398 L 250 452 L 158 398 Q 82 342 82 250 L 82 104 Q 82 96 90 93 Z"
        fill="none" stroke="url(#goldG2)" stroke-width="1.5"/>

  <!-- Divisão horizontal -->
  <line x1="100" y1="200" x2="400" y2="200" stroke="url(#goldG2)" stroke-width="1" opacity="0.5"/>
  <line x1="100" y1="320" x2="400" y2="320" stroke="url(#goldG2)" stroke-width="1" opacity="0.5"/>

  <!-- Coroa no topo -->
  <path d="M 190 130 L 200 90 L 215 115 L 230 80 L 250 120 L 270 80 L 285 115 L 300 90 L 310 130 Z"
        fill="url(#goldG2)" stroke="#B8962E" stroke-width="1"/>
  <!-- Joias da coroa -->
  <circle cx="215" cy="108" r="4" fill="#C94040" opacity="0.8"/>
  <circle cx="250" cy="98" r="5" fill="#4080C9" opacity="0.8"/>
  <circle cx="285" cy="108" r="4" fill="#C94040" opacity="0.8"/>
  <!-- Base da coroa -->
  <rect x="192" y="128" width="116" height="12" rx="2" fill="url(#goldG2)" stroke="#B8962E" stroke-width="0.5"/>
  <line x1="195" y1="134" x2="305" y2="134" stroke="#B8962E" stroke-width="0.5" opacity="0.5"/>

  <!-- Cruz central -->
  <rect x="244" y="155" width="12" height="50" rx="2" fill="url(#blueG2)"/>
  <rect x="230" y="168" width="40" height="12" rx="2" fill="url(#blueG2)"/>
  <!-- Detalhes da cruz -->
  <circle cx="250" cy="174" r="4" fill="url(#goldG2)"/>

  <!-- Letras IMB -->
  <text x="185" y="275" font-family="Georgia, serif" font-size="52" font-weight="700" fill="url(#blueG2)" letter-spacing="8">I</text>
  <text x="222" y="275" font-family="Georgia, serif" font-size="52" font-weight="700" fill="url(#blueG2)" letter-spacing="8">M</text>
  <text x="285" y="275" font-family="Georgia, serif" font-size="52" font-weight="700" fill="url(#blueG2)" letter-spacing="8">B</text>

  <!-- Serifas decorativas nas letras -->
  <line x1="178" y1="280" x2="320" y2="280" stroke="url(#goldG2)" stroke-width="1.5"/>
  <line x1="178" y1="225" x2="320" y2="225" stroke="url(#goldG2)" stroke-width="0.8" opacity="0.4"/>

  <!-- Estrela de Davi pequena embaixo -->
  <polygon points="250,340 262,360 238,360" fill="none" stroke="url(#goldG2)" stroke-width="1.5"/>
  <polygon points="250,370 262,350 238,350" fill="none" stroke="url(#goldG2)" stroke-width="1.5"/>

  <!-- Ramos de oliveira -->
  <!-- Ramo esquerdo -->
  <path d="M 160 400 Q 180 370 210 350" fill="none" stroke="#6B8E6B" stroke-width="1.5"/>
  <ellipse cx="175" cy="382" rx="8" ry="4" transform="rotate(-30 175 382)" fill="#7BA37B" opacity="0.7"/>
  <ellipse cx="185" cy="372" rx="8" ry="4" transform="rotate(-25 185 372)" fill="#7BA37B" opacity="0.7"/>
  <ellipse cx="195" cy="362" rx="8" ry="4" transform="rotate(-20 195 362)" fill="#7BA37B" opacity="0.7"/>
  <ellipse cx="165" cy="392" rx="7" ry="3.5" transform="rotate(-35 165 392)" fill="#7BA37B" opacity="0.6"/>
  <!-- Azeitonas -->
  <circle cx="170" cy="388" r="3" fill="#4A6B4A"/>
  <circle cx="190" cy="368" r="3" fill="#4A6B4A"/>

  <!-- Ramo direito -->
  <path d="M 340 400 Q 320 370 290 350" fill="none" stroke="#6B8E6B" stroke-width="1.5"/>
  <ellipse cx="325" cy="382" rx="8" ry="4" transform="rotate(30 325 382)" fill="#7BA37B" opacity="0.7"/>
  <ellipse cx="315" cy="372" rx="8" ry="4" transform="rotate(25 315 372)" fill="#7BA37B" opacity="0.7"/>
  <ellipse cx="305" cy="362" rx="8" ry="4" transform="rotate(20 305 362)" fill="#7BA37B" opacity="0.7"/>
  <ellipse cx="335" cy="392" rx="7" ry="3.5" transform="rotate(35 335 392)" fill="#7BA37B" opacity="0.6"/>
  <circle cx="330" cy="388" r="3" fill="#4A6B4A"/>
  <circle cx="310" cy="368" r="3" fill="#4A6B4A"/>

  <!-- Fita inferior -->
  <path d="M 150 430 Q 200 445 250 440 Q 300 445 350 430" fill="none" stroke="url(#goldG2)" stroke-width="2"/>
  <text x="250" y="447" text-anchor="middle" font-family="Georgia, serif" font-size="11" fill="#1B3B5F" letter-spacing="3">INSTITUTO</text>
</svg>`;

// ═══════════════════════════════════════════════════════
// ILUSTRAÇÃO 3 — ESTRELA DE DAVI ORNAMENTADA
// ═══════════════════════════════════════════════════════
const svg3 = `
<svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bg3" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#F8F6F0"/>
      <stop offset="100%" stop-color="#EDE8DC"/>
    </radialGradient>
    <linearGradient id="goldG3" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#E8C849"/>
      <stop offset="50%" stop-color="#D4AF37"/>
      <stop offset="100%" stop-color="#B8962E"/>
    </linearGradient>
    <linearGradient id="blueG3" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#2A5580"/>
      <stop offset="100%" stop-color="#1B3B5F"/>
    </linearGradient>
    <filter id="glow3">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="shadow3">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#1B3B5F" flood-opacity="0.15"/>
    </filter>
    <pattern id="bgPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
      <circle cx="10" cy="10" r="0.5" fill="#D4AF37" opacity="0.08"/>
    </pattern>
  </defs>

  <rect width="500" height="500" fill="url(#bg3)" rx="20"/>
  <rect width="500" height="500" fill="url(#bgPattern)" rx="20"/>

  <!-- Círculos ornamentais externos -->
  <circle cx="250" cy="250" r="230" fill="none" stroke="url(#goldG3)" stroke-width="0.5" opacity="0.3"/>
  <circle cx="250" cy="250" r="220" fill="none" stroke="url(#goldG3)" stroke-width="1" opacity="0.2" stroke-dasharray="3 8"/>

  <!-- Anel ornamental -->
  <circle cx="250" cy="250" r="200" fill="none" stroke="url(#blueG3)" stroke-width="2" opacity="0.15"/>

  <!-- Estrela de Davi principal -->
  <!-- Triângulo apontando pra cima -->
  <polygon points="250,60 420,355 80,355"
           fill="none" stroke="url(#blueG3)" stroke-width="4" stroke-linejoin="round" filter="url(#shadow3)"/>
  <!-- Preenchimento sutil do triângulo de cima -->
  <polygon points="250,60 420,355 80,355"
           fill="url(#blueG3)" opacity="0.04"/>

  <!-- Triângulo apontando pra baixo -->
  <polygon points="250,440 420,145 80,145"
           fill="none" stroke="url(#blueG3)" stroke-width="4" stroke-linejoin="round" filter="url(#shadow3)"/>
  <polygon points="250,440 420,145 80,145"
           fill="url(#blueG3)" opacity="0.04"/>

  <!-- Hexágono central (interseção) -->
  <polygon points="250,145 340,197 340,302 250,355 160,302 160,197"
           fill="url(#goldG3)" opacity="0.08" stroke="url(#goldG3)" stroke-width="1"/>

  <!-- Hexágono interno menor -->
  <polygon points="250,185 305,220 305,280 250,315 195,280 195,220"
           fill="none" stroke="url(#goldG3)" stroke-width="1.5" opacity="0.5"/>

  <!-- Centro: círculos concêntricos com brilho -->
  <circle cx="250" cy="250" r="40" fill="url(#goldG3)" opacity="0.08"/>
  <circle cx="250" cy="250" r="30" fill="none" stroke="url(#goldG3)" stroke-width="1.5" filter="url(#glow3)"/>
  <circle cx="250" cy="250" r="20" fill="none" stroke="url(#goldG3)" stroke-width="1"/>
  <circle cx="250" cy="250" r="8" fill="url(#goldG3)" filter="url(#glow3)"/>
  <circle cx="250" cy="250" r="3" fill="#FDFCF8"/>

  <!-- Detalhes nos vértices do triângulo de cima -->
  <circle cx="250" cy="60" r="6" fill="url(#goldG3)" filter="url(#glow3)"/>
  <circle cx="420" cy="355" r="6" fill="url(#goldG3)" filter="url(#glow3)"/>
  <circle cx="80" cy="355" r="6" fill="url(#goldG3)" filter="url(#glow3)"/>

  <!-- Detalhes nos vértices do triângulo de baixo -->
  <circle cx="250" cy="440" r="6" fill="url(#goldG3)" filter="url(#glow3)"/>
  <circle cx="420" cy="145" r="6" fill="url(#goldG3)" filter="url(#glow3)"/>
  <circle cx="80" cy="145" r="6" fill="url(#goldG3)" filter="url(#glow3)"/>

  <!-- Ornamentos finos saindo do centro -->
  ${Array.from({length: 12}, (_, i) => {
    const angle = i * 30 * Math.PI / 180;
    const x1 = 250 + 45 * Math.sin(angle);
    const y1 = 250 - 45 * Math.cos(angle);
    const x2 = 250 + 65 * Math.sin(angle);
    const y2 = 250 - 65 * Math.cos(angle);
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="url(#goldG3)" stroke-width="0.8" opacity="0.4"/>`;
  }).join('\n  ')}

  <!-- Pontos decorativos no hexágono -->
  ${[0,60,120,180,240,300].map(deg => {
    const angle = deg * Math.PI / 180;
    const x = 250 + 160 * Math.sin(angle);
    const y = 250 - 160 * Math.cos(angle);
    return `<circle cx="${x}" cy="${y}" r="3" fill="url(#goldG3)" opacity="0.6"/>`;
  }).join('\n  ')}

  <!-- Filigrana nos cantos -->
  <path d="M 30 30 Q 50 30 50 50" fill="none" stroke="url(#goldG3)" stroke-width="1.5" opacity="0.3"/>
  <path d="M 30 30 Q 30 50 50 50" fill="none" stroke="url(#goldG3)" stroke-width="1.5" opacity="0.3"/>
  <path d="M 470 30 Q 450 30 450 50" fill="none" stroke="url(#goldG3)" stroke-width="1.5" opacity="0.3"/>
  <path d="M 470 30 Q 470 50 450 50" fill="none" stroke="url(#goldG3)" stroke-width="1.5" opacity="0.3"/>
  <path d="M 30 470 Q 50 470 50 450" fill="none" stroke="url(#goldG3)" stroke-width="1.5" opacity="0.3"/>
  <path d="M 30 470 Q 30 450 50 450" fill="none" stroke="url(#goldG3)" stroke-width="1.5" opacity="0.3"/>
  <path d="M 470 470 Q 450 470 450 450" fill="none" stroke="url(#goldG3)" stroke-width="1.5" opacity="0.3"/>
  <path d="M 470 470 Q 470 450 450 450" fill="none" stroke="url(#goldG3)" stroke-width="1.5" opacity="0.3"/>
</svg>`;

// ═══════════════════════════════════════════════════════
// ILUSTRAÇÃO 4 — LIVRO/TORAH ABERTO
// ═══════════════════════════════════════════════════════
const svg4 = `
<svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bg4" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#FDFCF8"/>
      <stop offset="100%" stop-color="#EDE8DC"/>
    </radialGradient>
    <linearGradient id="goldG4" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#E8C849"/>
      <stop offset="50%" stop-color="#D4AF37"/>
      <stop offset="100%" stop-color="#B8962E"/>
    </linearGradient>
    <linearGradient id="blueG4" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#2A5580"/>
      <stop offset="100%" stop-color="#1B3B5F"/>
    </linearGradient>
    <linearGradient id="pageFill" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#FDFCF8"/>
      <stop offset="100%" stop-color="#F5F0E5"/>
    </linearGradient>
    <linearGradient id="pageR" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#F5F0E5"/>
      <stop offset="100%" stop-color="#FDFCF8"/>
    </linearGradient>
    <linearGradient id="rayGrad" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%" stop-color="#D4AF37" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#D4AF37" stop-opacity="0"/>
    </linearGradient>
    <filter id="shadow4">
      <feDropShadow dx="2" dy="4" stdDeviation="6" flood-color="#1B3B5F" flood-opacity="0.15"/>
    </filter>
    <filter id="glow4">
      <feGaussianBlur stdDeviation="6" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <rect width="500" height="500" fill="url(#bg4)" rx="20"/>

  <!-- Raios de luz emanando do livro -->
  ${Array.from({length: 15}, (_, i) => {
    const angle = (-70 + i * 10) * Math.PI / 180;
    const x1 = 250;
    const y1 = 160;
    const x2 = 250 + 250 * Math.cos(angle);
    const y2 = 160 - 250 * Math.sin(angle);
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#D4AF37" stroke-width="0.8" opacity="${0.08 + Math.random() * 0.08}"/>`;
  }).join('\n  ')}

  <!-- Halo de luz -->
  <ellipse cx="250" cy="140" rx="120" ry="80" fill="#D4AF37" opacity="0.04"/>
  <ellipse cx="250" cy="150" rx="80" ry="50" fill="#D4AF37" opacity="0.06"/>

  <!-- Sombra do livro -->
  <ellipse cx="250" cy="410" rx="180" ry="20" fill="#1B3B5F" opacity="0.06"/>

  <!-- Página esquerda (traseira, mais escura) -->
  <path d="M 250 160 Q 220 165 60 180 L 55 385 Q 220 370 250 380 Z"
        fill="#EDE8DC" stroke="url(#blueG4)" stroke-width="1" opacity="0.5"/>

  <!-- Página esquerda (frontal) -->
  <path d="M 250 150 Q 200 155 65 170 L 60 380 Q 200 365 250 375 Z"
        fill="url(#pageFill)" stroke="url(#blueG4)" stroke-width="2" filter="url(#shadow4)"/>

  <!-- Linhas de texto - página esquerda -->
  <line x1="95" y1="210" x2="230" y2="200" stroke="#C5BBA5" stroke-width="1.2" opacity="0.5"/>
  <line x1="93" y1="230" x2="232" y2="220" stroke="#C5BBA5" stroke-width="1.2" opacity="0.45"/>
  <line x1="91" y1="250" x2="234" y2="240" stroke="#C5BBA5" stroke-width="1.2" opacity="0.4"/>
  <line x1="89" y1="270" x2="236" y2="260" stroke="#C5BBA5" stroke-width="1.2" opacity="0.35"/>
  <line x1="87" y1="290" x2="238" y2="280" stroke="#C5BBA5" stroke-width="1.2" opacity="0.3"/>
  <line x1="85" y1="310" x2="240" y2="300" stroke="#C5BBA5" stroke-width="1.2" opacity="0.25"/>
  <line x1="83" y1="330" x2="242" y2="320" stroke="#C5BBA5" stroke-width="1.2" opacity="0.2"/>
  <line x1="81" y1="350" x2="244" y2="340" stroke="#C5BBA5" stroke-width="1.2" opacity="0.15"/>

  <!-- Página direita (traseira) -->
  <path d="M 250 160 Q 280 165 440 180 L 445 385 Q 280 370 250 380 Z"
        fill="#EDE8DC" stroke="url(#blueG4)" stroke-width="1" opacity="0.5"/>

  <!-- Página direita (frontal) -->
  <path d="M 250 150 Q 300 155 435 170 L 440 380 Q 300 365 250 375 Z"
        fill="url(#pageR)" stroke="url(#blueG4)" stroke-width="2" filter="url(#shadow4)"/>

  <!-- Linhas de texto - página direita -->
  <line x1="270" y1="200" x2="405" y2="210" stroke="#C5BBA5" stroke-width="1.2" opacity="0.5"/>
  <line x1="268" y1="220" x2="407" y2="230" stroke="#C5BBA5" stroke-width="1.2" opacity="0.45"/>
  <line x1="266" y1="240" x2="409" y2="250" stroke="#C5BBA5" stroke-width="1.2" opacity="0.4"/>
  <line x1="264" y1="260" x2="411" y2="270" stroke="#C5BBA5" stroke-width="1.2" opacity="0.35"/>
  <line x1="262" y1="280" x2="413" y2="290" stroke="#C5BBA5" stroke-width="1.2" opacity="0.3"/>
  <line x1="260" y1="300" x2="415" y2="310" stroke="#C5BBA5" stroke-width="1.2" opacity="0.25"/>
  <line x1="258" y1="320" x2="417" y2="330" stroke="#C5BBA5" stroke-width="1.2" opacity="0.2"/>
  <line x1="256" y1="340" x2="419" y2="350" stroke="#C5BBA5" stroke-width="1.2" opacity="0.15"/>

  <!-- Lombada dourada -->
  <rect x="247" y="148" width="6" height="230" fill="url(#goldG4)" rx="2"/>
  <line x1="250" y1="155" x2="250" y2="375" stroke="#B8962E" stroke-width="0.5" opacity="0.5"/>

  <!-- Chama/luz no topo da lombada -->
  <path d="M 250 145 Q 243 120 248 95 Q 250 80 252 95 Q 257 120 250 145"
        fill="url(#goldG4)" opacity="0.8" filter="url(#glow4)"/>
  <path d="M 250 140 Q 246 125 249 108 Q 250 100 251 108 Q 254 125 250 140"
        fill="#E8C849" opacity="0.9"/>
  <!-- Centro da chama -->
  <ellipse cx="250" cy="115" rx="2" ry="8" fill="#FFF8E0" opacity="0.7"/>

  <!-- Ornamento na base -->
  <path d="M 160 395 Q 200 405 250 400 Q 300 405 340 395" fill="none" stroke="url(#goldG4)" stroke-width="1.5" opacity="0.5"/>
  <path d="M 180 408 Q 215 415 250 412 Q 285 415 320 408" fill="none" stroke="url(#goldG4)" stroke-width="1" opacity="0.3"/>

  <!-- Marcador de página dourado -->
  <path d="M 248 375 L 230 430 L 240 420 L 250 440 L 260 420 L 270 430 L 252 375"
        fill="url(#goldG4)" stroke="#B8962E" stroke-width="0.5" opacity="0.6"/>
</svg>`;

// ═══════════════════════════════════════════════════════
// ILUSTRAÇÃO 5 — PILAR CLÁSSICO COM COROA
// ═══════════════════════════════════════════════════════
const svg5 = `
<svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bg5" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#F8F6F0"/>
      <stop offset="100%" stop-color="#EDE8DC"/>
    </radialGradient>
    <linearGradient id="goldG5" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#E8C849"/>
      <stop offset="50%" stop-color="#D4AF37"/>
      <stop offset="100%" stop-color="#B8962E"/>
    </linearGradient>
    <linearGradient id="blueG5" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#2A5580"/>
      <stop offset="100%" stop-color="#1B3B5F"/>
    </linearGradient>
    <linearGradient id="pillarShade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#1B3B5F" stop-opacity="0.05"/>
      <stop offset="30%" stop-color="#FDFCF8" stop-opacity="0"/>
      <stop offset="70%" stop-color="#FDFCF8" stop-opacity="0"/>
      <stop offset="100%" stop-color="#1B3B5F" stop-opacity="0.08"/>
    </linearGradient>
    <filter id="shadow5">
      <feDropShadow dx="3" dy="5" stdDeviation="6" flood-color="#1B3B5F" flood-opacity="0.18"/>
    </filter>
  </defs>

  <rect width="500" height="500" fill="url(#bg5)" rx="20"/>

  <!-- Sombra do pilar no chão -->
  <ellipse cx="270" cy="455" rx="130" ry="15" fill="#1B3B5F" opacity="0.06"/>

  <!-- ═══ BASE DO PILAR ═══ -->
  <!-- Degrau 3 (mais largo, base) -->
  <rect x="130" y="430" width="240" height="25" rx="3" fill="#F0EBE0" stroke="url(#blueG5)" stroke-width="2"/>
  <rect x="130" y="430" width="240" height="25" rx="3" fill="url(#pillarShade)"/>
  <line x1="135" y1="442" x2="365" y2="442" stroke="url(#goldG5)" stroke-width="0.5" opacity="0.3"/>

  <!-- Degrau 2 -->
  <rect x="150" y="410" width="200" height="22" rx="2" fill="#F5F0E5" stroke="url(#blueG5)" stroke-width="2"/>
  <rect x="150" y="410" width="200" height="22" rx="2" fill="url(#pillarShade)"/>

  <!-- Degrau 1 (torus base) -->
  <rect x="170" y="395" width="160" height="17" rx="4" fill="#FDFCF8" stroke="url(#blueG5)" stroke-width="2"/>
  <ellipse cx="250" cy="395" rx="82" ry="5" fill="none" stroke="url(#blueG5)" stroke-width="1.5"/>

  <!-- ═══ FUSTE (coluna principal) ═══ -->
  <rect x="185" y="155" width="130" height="242" fill="#FDFCF8" stroke="url(#blueG5)" stroke-width="2" filter="url(#shadow5)"/>

  <!-- Caneluras (fluting) -->
  ${Array.from({length: 9}, (_, i) => {
    const x = 195 + i * 13;
    return `<line x1="${x}" y1="160" x2="${x}" y2="393" stroke="#1B3B5F" stroke-width="0.5" opacity="0.08"/>`;
  }).join('\n  ')}

  <!-- Éntase (curvatura sutil da coluna) -->
  <rect x="185" y="155" width="130" height="242" fill="url(#pillarShade)"/>

  <!-- Detalhes verticais mais fortes -->
  <line x1="185" y1="155" x2="185" y2="397" stroke="url(#blueG5)" stroke-width="1"/>
  <line x1="315" y1="155" x2="315" y2="397" stroke="url(#blueG5)" stroke-width="1"/>

  <!-- Anel decorativo no meio da coluna -->
  <rect x="183" y="270" width="134" height="12" rx="2" fill="none" stroke="url(#goldG5)" stroke-width="1" opacity="0.4"/>
  <line x1="183" y1="276" x2="317" y2="276" stroke="url(#goldG5)" stroke-width="0.5" opacity="0.3"/>

  <!-- Diamante central na coluna -->
  <polygon points="250,265 258,276 250,287 242,276" fill="none" stroke="url(#goldG5)" stroke-width="1.2"/>
  <polygon points="250,269 255,276 250,283 245,276" fill="url(#goldG5)" opacity="0.3"/>

  <!-- ═══ CAPITEL IÔNICO ═══ -->
  <!-- Ábaco (topo plano) -->
  <rect x="160" y="120" width="180" height="15" rx="2" fill="#FDFCF8" stroke="url(#blueG5)" stroke-width="2"/>
  <line x1="165" y1="127" x2="335" y2="127" stroke="url(#goldG5)" stroke-width="0.8" opacity="0.4"/>

  <!-- Equino (parte curva) -->
  <path d="M 170 135 Q 170 145 185 150 L 315 150 Q 330 145 330 135" fill="#FDFCF8" stroke="url(#blueG5)" stroke-width="1.5"/>

  <!-- Volutas (espirais iônicas) -->
  <!-- Voluta esquerda -->
  <path d="M 170 130 Q 145 128 142 140 Q 138 155 155 158 Q 168 160 170 148 Q 172 138 162 137 Q 155 136 155 142"
        fill="none" stroke="url(#blueG5)" stroke-width="2"/>
  <circle cx="158" cy="142" r="3" fill="url(#goldG5)"/>

  <!-- Voluta direita -->
  <path d="M 330 130 Q 355 128 358 140 Q 362 155 345 158 Q 332 160 330 148 Q 328 138 338 137 Q 345 136 345 142"
        fill="none" stroke="url(#blueG5)" stroke-width="2"/>
  <circle cx="342" cy="142" r="3" fill="url(#goldG5)"/>

  <!-- Gola do capitel -->
  <path d="M 185 150 L 185 155 L 315 155 L 315 150" fill="#FDFCF8" stroke="url(#blueG5)" stroke-width="1"/>

  <!-- Decoração de ovas no equino -->
  ${Array.from({length: 7}, (_, i) => {
    const x = 195 + i * 18;
    return `<ellipse cx="${x}" cy="142" rx="4" ry="6" fill="none" stroke="url(#goldG5)" stroke-width="0.8" opacity="0.5"/>`;
  }).join('\n  ')}

  <!-- ═══ COROA DOURADA ═══ -->
  <path d="M 190 115 L 200 70 L 218 95 L 235 60 L 250 90 L 265 60 L 282 95 L 300 70 L 310 115 Z"
        fill="url(#goldG5)" stroke="#B8962E" stroke-width="1.5" filter="url(#shadow5)"/>

  <!-- Detalhes da coroa -->
  <path d="M 195 112 L 200 78 L 215 98" fill="none" stroke="#FFF8E0" stroke-width="0.5" opacity="0.4"/>
  <path d="M 305 112 L 300 78 L 285 98" fill="none" stroke="#FFF8E0" stroke-width="0.5" opacity="0.4"/>

  <!-- Joias da coroa -->
  <circle cx="218" cy="88" r="5" fill="#C94040" opacity="0.7" stroke="#B8962E" stroke-width="0.5"/>
  <circle cx="250" cy="78" r="6" fill="#4080C9" opacity="0.7" stroke="#B8962E" stroke-width="0.5"/>
  <circle cx="282" cy="88" r="5" fill="#C94040" opacity="0.7" stroke="#B8962E" stroke-width="0.5"/>

  <!-- Ponto no topo central -->
  <circle cx="250" cy="55" r="4" fill="url(#goldG5)"/>
  <line x1="250" y1="48" x2="250" y2="38" stroke="url(#goldG5)" stroke-width="1.5"/>
  <line x1="245" y1="42" x2="255" y2="42" stroke="url(#goldG5)" stroke-width="1.5"/>

  <!-- Base da coroa -->
  <rect x="192" y="112" width="116" height="10" rx="2" fill="url(#goldG5)" stroke="#B8962E" stroke-width="0.5"/>
  <line x1="195" y1="117" x2="305" y2="117" stroke="#FFF8E0" stroke-width="0.5" opacity="0.3"/>

  <!-- Texto na base -->
  <text x="250" y="475" text-anchor="middle" font-family="Georgia, serif" font-size="10" fill="#9CA3AF" letter-spacing="5" opacity="0.4">SABEDORIA · GOVERNO</text>
</svg>`;

(async () => {
    const browser = await chromium.launch();

    const svgs = [
        { name: 'ilustracao-1-bussola', svg: svg1 },
        { name: 'ilustracao-2-escudo', svg: svg2 },
        { name: 'ilustracao-3-estrela', svg: svg3 },
        { name: 'ilustracao-4-livro', svg: svg4 },
        { name: 'ilustracao-5-pilar', svg: svg5 },
    ];

    for (const { name, svg } of svgs) {
        const page = await browser.newPage({ viewport: { width: SIZE, height: SIZE } });
        await page.setContent(`<!DOCTYPE html><html><head><meta charset="UTF-8">
            <style>*{margin:0;padding:0;}body{display:flex;align-items:center;justify-content:center;width:${SIZE}px;height:${SIZE}px;background:#F8F6F0;}</style>
        </head><body>${svg}</body></html>`, { waitUntil: 'networkidle' });
        await page.screenshot({ path: path.join(outDir, name + '.png'), type: 'png' });
        await page.close();
        console.log('  ✓', name);
    }

    await browser.close();
    console.log('\\nIlustrações detalhadas geradas!');
})();
