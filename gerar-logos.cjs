const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const outDir = path.join(__dirname, 'logos-instituto');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const logos = [
  // ═══ OPÇÃO 1: Bússola + Tipografia Clássica ═══
  {
    name: 'logo-1-bussola',
    desc: 'Bússola minimalista + tipografia clássica',
    html: `<div style="display:flex;align-items:center;gap:20px;">
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="30" stroke="#1B3B5F" stroke-width="1.5"/>
        <circle cx="32" cy="32" r="24" stroke="#D4AF37" stroke-width="0.5" opacity="0.4"/>
        <line x1="32" y1="4" x2="32" y2="60" stroke="#1B3B5F" stroke-width="0.5" opacity="0.3"/>
        <line x1="4" y1="32" x2="60" y2="32" stroke="#1B3B5F" stroke-width="0.5" opacity="0.3"/>
        <polygon points="32,8 35,26 29,26" fill="#D4AF37"/>
        <polygon points="32,56 35,38 29,38" fill="#1B3B5F" opacity="0.3"/>
        <polygon points="8,32 26,29 26,35" fill="#1B3B5F" opacity="0.3"/>
        <polygon points="56,32 38,29 38,35" fill="#1B3B5F" opacity="0.3"/>
        <circle cx="32" cy="32" r="3" fill="#D4AF37"/>
        <circle cx="32" cy="32" r="1.5" fill="#1B3B5F"/>
      </svg>
      <div>
        <div style="font-family:'Playfair Display',serif;font-size:22px;font-weight:700;color:#1B3B5F;letter-spacing:0.02em;line-height:1.1;">INSTITUTO</div>
        <div style="font-family:'Playfair Display',serif;font-size:22px;font-weight:700;color:#1B3B5F;letter-spacing:0.02em;line-height:1.1;">MARCOS <span style="color:#D4AF37;">BARRETO</span></div>
        <div style="font-family:'Montserrat',sans-serif;font-size:7px;color:#9CA3AF;letter-spacing:0.4em;text-transform:uppercase;margin-top:4px;">Mapa do Herdeiro</div>
      </div>
    </div>`
  },

  // ═══ OPÇÃO 2: Monograma IMB em Escudo ═══
  {
    name: 'logo-2-monograma',
    desc: 'Monograma IMB dentro de escudo heráldico',
    html: `<div style="display:flex;align-items:center;gap:22px;">
      <svg width="60" height="72" viewBox="0 0 60 72" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Escudo -->
        <path d="M 30 2 L 56 14 L 56 38 Q 56 58, 30 70 Q 4 58, 4 38 L 4 14 Z" stroke="#1B3B5F" stroke-width="1.5" fill="none"/>
        <path d="M 30 7 L 51 17 L 51 37 Q 51 54, 30 65 Q 9 54, 9 37 L 9 17 Z" stroke="#D4AF37" stroke-width="0.5" fill="none" opacity="0.3"/>
        <!-- Letras IMB -->
        <text x="30" y="35" text-anchor="middle" font-family="'Playfair Display',serif" font-size="16" font-weight="700" fill="#1B3B5F" letter-spacing="1">I M B</text>
        <!-- Linha decorativa -->
        <line x1="16" y1="42" x2="44" y2="42" stroke="#D4AF37" stroke-width="0.8"/>
        <!-- Estrela -->
        <polygon points="30,48 31.5,52 36,52 32.5,54.5 34,59 30,56.5 26,59 27.5,54.5 24,52 28.5,52" fill="#D4AF37" opacity="0.6"/>
      </svg>
      <div>
        <div style="font-family:'Playfair Display',serif;font-size:20px;font-weight:700;color:#1B3B5F;letter-spacing:0.05em;line-height:1.15;">INSTITUTO</div>
        <div style="font-family:'Playfair Display',serif;font-size:20px;font-weight:700;color:#1B3B5F;letter-spacing:0.05em;line-height:1.15;">MARCOS BARRETO</div>
        <div style="width:100%;height:1px;background:linear-gradient(90deg,#D4AF37,transparent);margin:5px 0;"></div>
        <div style="font-family:'Montserrat',sans-serif;font-size:7px;color:#8C9AAB;letter-spacing:0.35em;text-transform:uppercase;">Formação · Alinhamento · Governo</div>
      </div>
    </div>`
  },

  // ═══ OPÇÃO 3: Estrela de Davi Minimalista ═══
  {
    name: 'logo-3-estrela',
    desc: 'Estrela de Davi geométrica + tipografia empilhada',
    html: `<div style="text-align:center;">
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-bottom:10px;">
        <!-- Estrela de Davi (dois triângulos) -->
        <polygon points="28,6 48,40 8,40" stroke="#1B3B5F" stroke-width="1.2" fill="none"/>
        <polygon points="28,50 8,16 48,16" stroke="#1B3B5F" stroke-width="1.2" fill="none"/>
        <!-- Centro dourado -->
        <circle cx="28" cy="28" r="4" fill="none" stroke="#D4AF37" stroke-width="1"/>
        <circle cx="28" cy="28" r="1.5" fill="#D4AF37"/>
      </svg>
      <div style="font-family:'Montserrat',sans-serif;font-size:8px;color:#D4AF37;letter-spacing:0.5em;text-transform:uppercase;margin-bottom:4px;">Instituto</div>
      <div style="font-family:'Playfair Display',serif;font-size:26px;font-weight:700;color:#1B3B5F;letter-spacing:0.08em;line-height:1;">MARCOS</div>
      <div style="font-family:'Playfair Display',serif;font-size:26px;font-weight:700;color:#1B3B5F;letter-spacing:0.08em;line-height:1;">BARRETO</div>
      <div style="width:60px;height:1px;background:#D4AF37;margin:8px auto 0;"></div>
    </div>`
  },

  // ═══ OPÇÃO 4: Toráh / Livro Aberto ═══
  {
    name: 'logo-4-livro',
    desc: 'Livro aberto estilizado + tipografia editorial',
    html: `<div style="display:flex;align-items:center;gap:20px;">
      <svg width="64" height="56" viewBox="0 0 64 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Livro aberto -->
        <path d="M 32 12 Q 16 8, 4 14 L 4 48 Q 16 42, 32 46" stroke="#1B3B5F" stroke-width="1.5" fill="none"/>
        <path d="M 32 12 Q 48 8, 60 14 L 60 48 Q 48 42, 32 46" stroke="#1B3B5F" stroke-width="1.5" fill="none"/>
        <!-- Lombada -->
        <line x1="32" y1="12" x2="32" y2="46" stroke="#D4AF37" stroke-width="1.5"/>
        <!-- Linhas de texto -->
        <line x1="10" y1="22" x2="26" y2="20" stroke="#1B3B5F" stroke-width="0.4" opacity="0.3"/>
        <line x1="10" y1="28" x2="26" y2="26" stroke="#1B3B5F" stroke-width="0.4" opacity="0.3"/>
        <line x1="10" y1="34" x2="26" y2="32" stroke="#1B3B5F" stroke-width="0.4" opacity="0.3"/>
        <line x1="38" y1="20" x2="54" y2="22" stroke="#1B3B5F" stroke-width="0.4" opacity="0.3"/>
        <line x1="38" y1="26" x2="54" y2="28" stroke="#1B3B5F" stroke-width="0.4" opacity="0.3"/>
        <line x1="38" y1="32" x2="54" y2="34" stroke="#1B3B5F" stroke-width="0.4" opacity="0.3"/>
        <!-- Luz/sabedoria -->
        <path d="M 32 6 L 30 10 L 32 9 L 34 10 Z" fill="#D4AF37"/>
        <line x1="32" y1="2" x2="32" y2="6" stroke="#D4AF37" stroke-width="0.8"/>
        <line x1="27" y1="4" x2="29" y2="7" stroke="#D4AF37" stroke-width="0.5" opacity="0.5"/>
        <line x1="37" y1="4" x2="35" y2="7" stroke="#D4AF37" stroke-width="0.5" opacity="0.5"/>
      </svg>
      <div>
        <div style="font-family:'Montserrat',sans-serif;font-size:8px;color:#D4AF37;letter-spacing:0.4em;text-transform:uppercase;margin-bottom:2px;">Instituto</div>
        <div style="font-family:'Playfair Display',serif;font-size:24px;font-weight:700;color:#1B3B5F;line-height:1.1;">Marcos Barreto</div>
        <div style="display:flex;align-items:center;gap:8px;margin-top:6px;">
          <div style="flex:1;height:0.5px;background:#D4AF37;"></div>
          <div style="width:5px;height:5px;background:#D4AF37;transform:rotate(45deg);"></div>
          <div style="flex:1;height:0.5px;background:#D4AF37;"></div>
        </div>
        <div style="font-family:'Montserrat',sans-serif;font-size:6.5px;color:#9CA3AF;letter-spacing:0.3em;text-transform:uppercase;margin-top:6px;">Teologia · Formação · Alinhamento</div>
      </div>
    </div>`
  },

  // ═══ OPÇÃO 5: Coluna / Pilar + Tipografia Monumental ═══
  {
    name: 'logo-5-pilar',
    desc: 'Pilar/coluna da sabedoria + tipografia monumental',
    html: `<div style="display:flex;align-items:center;gap:22px;">
      <svg width="40" height="72" viewBox="0 0 40 72" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Base -->
        <rect x="4" y="62" width="32" height="4" rx="1" stroke="#1B3B5F" stroke-width="1" fill="none"/>
        <rect x="8" y="58" width="24" height="4" rx="1" stroke="#1B3B5F" stroke-width="0.8" fill="none"/>
        <!-- Coluna -->
        <rect x="12" y="16" width="16" height="42" rx="1" stroke="#1B3B5F" stroke-width="1.2" fill="none"/>
        <!-- Caneluras -->
        <line x1="16" y1="18" x2="16" y2="56" stroke="#1B3B5F" stroke-width="0.3" opacity="0.3"/>
        <line x1="20" y1="18" x2="20" y2="56" stroke="#1B3B5F" stroke-width="0.3" opacity="0.3"/>
        <line x1="24" y1="18" x2="24" y2="56" stroke="#1B3B5F" stroke-width="0.3" opacity="0.3"/>
        <!-- Capitel -->
        <rect x="8" y="12" width="24" height="4" rx="1" stroke="#1B3B5F" stroke-width="0.8" fill="none"/>
        <rect x="4" y="8" width="32" height="4" rx="1" stroke="#1B3B5F" stroke-width="1" fill="none"/>
        <!-- Coroa dourada -->
        <path d="M 10 6 L 14 2 L 20 5 L 26 2 L 30 6" stroke="#D4AF37" stroke-width="1" fill="none" stroke-linecap="round"/>
        <circle cx="20" cy="2" r="1" fill="#D4AF37"/>
      </svg>
      <div>
        <div style="font-family:'Playfair Display',serif;font-size:11px;font-weight:400;color:#D4AF37;letter-spacing:0.3em;text-transform:uppercase;">Instituto</div>
        <div style="font-family:'Playfair Display',serif;font-size:28px;font-weight:800;color:#1B3B5F;letter-spacing:0.06em;line-height:1;margin-top:2px;">MARCOS</div>
        <div style="font-family:'Playfair Display',serif;font-size:28px;font-weight:800;color:#1B3B5F;letter-spacing:0.06em;line-height:1;">BARRETO</div>
        <div style="font-family:'Montserrat',sans-serif;font-size:6.5px;color:#9CA3AF;letter-spacing:0.25em;text-transform:uppercase;margin-top:8px;border-top:0.5px solid rgba(212,175,55,0.3);padding-top:6px;">Sabedoria · Direção · Governo</div>
      </div>
    </div>`
  }
];

(async () => {
  const browser = await chromium.launch();

  // ─── Gerar cada logo isolado ───
  for (const logo of logos) {
    const page = await browser.newPage({ viewport: { width: 600, height: 200 } });
    await page.setContent(`<!DOCTYPE html><html><head>
      <meta charset="UTF-8">
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">
      <style>*{margin:0;padding:0;box-sizing:border-box;}body{background:transparent;display:flex;align-items:center;justify-content:center;width:600px;height:200px;}</style>
    </head><body>${logo.html}</body></html>`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(outDir, logo.name + '.png'), type: 'png', omitBackground: true });
    await page.close();
  }

  // ─── Gerar painel comparativo ───
  const panelHtml = `<!DOCTYPE html><html><head>
    <meta charset="UTF-8">
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
      *{margin:0;padding:0;box-sizing:border-box;}
      body{font-family:'Montserrat',sans-serif;background:#F5F1E8;padding:40px;}
      .grid{display:flex;flex-direction:column;gap:36px;max-width:600px;margin:0 auto;}
      .option{background:#fff;border-radius:12px;padding:32px 40px;box-shadow:0 2px 12px rgba(0,0,0,0.06);display:flex;flex-direction:column;align-items:center;}
      .option-label{font-size:10px;font-weight:700;color:#D4AF37;letter-spacing:0.3em;text-transform:uppercase;margin-bottom:16px;}
      .option-desc{font-size:11px;color:#9CA3AF;margin-top:14px;text-align:center;}
      h1{font-family:'Playfair Display',serif;font-size:20px;color:#1B3B5F;text-align:center;margin-bottom:8px;}
      .sub{text-align:center;font-size:11px;color:#9CA3AF;margin-bottom:32px;}
    </style>
  </head><body>
    <h1>Logomarcas — Instituto Marcos Barreto</h1>
    <p class="sub">5 opções para escolha</p>
    <div class="grid">
      ${logos.map((l, i) => `
        <div class="option">
          <div class="option-label">Opção ${i + 1}</div>
          ${l.html}
          <div class="option-desc">${l.desc}</div>
        </div>
      `).join('')}
    </div>
  </body></html>`;

  const panelPage = await browser.newPage({ viewport: { width: 680, height: 2200 } });
  await panelPage.setContent(panelHtml, { waitUntil: 'networkidle' });
  await panelPage.screenshot({ path: path.join(outDir, 'todas-opcoes.png'), type: 'png', fullPage: true });
  await panelPage.close();

  await browser.close();
  console.log('Logos gerados em:', outDir);
})();
