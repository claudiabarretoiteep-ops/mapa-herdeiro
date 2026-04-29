const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const outDir = path.join(__dirname, 'carrossel-6a9');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const W = 1080;
const H = 1350;

// ═══════════════════════════════════════════════════════
// SISTEMA DE DESIGN
// ═══════════════════════════════════════════════════════
const baseCSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600&family=Montserrat:wght@300;400;500;600;700&display=swap');

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  width: ${W}px;
  height: ${H}px;
  overflow: hidden;
  font-family: 'Montserrat', sans-serif;
}

.slide {
  width: ${W}px;
  height: ${H}px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* ═══ FUNDOS ═══ */
.bg-deep {
  background: linear-gradient(175deg, #0F2238 0%, #1B3B5F 40%, #162F4A 100%);
}
.bg-dark {
  background: linear-gradient(170deg, #0D1B2A 0%, #1B3B5F 50%, #0F2238 100%);
}
.bg-cream {
  background: linear-gradient(170deg, #FDFCF8 0%, #F5F0E5 100%);
}
.bg-gold-accent {
  background: linear-gradient(175deg, #1B3B5F 0%, #1F3F5F 60%, #1A3555 100%);
}

/* ═══ TIPOGRAFIA ═══ */
.serif { font-family: 'Playfair Display', Georgia, serif; }
.sans { font-family: 'Montserrat', sans-serif; }

.text-white { color: #FDFCF8; }
.text-gold { color: #D4AF37; }
.text-blue { color: #1B3B5F; }
.text-muted { color: rgba(253,252,248,0.5); }
.text-muted-dark { color: #8C9AAB; }

/* ═══ ELEMENTOS ═══ */
.gold-line {
  width: 60px; height: 2px;
  background: linear-gradient(90deg, transparent, #D4AF37, transparent);
}
.gold-line-wide {
  width: 120px; height: 1.5px;
  background: linear-gradient(90deg, transparent, #D4AF37, transparent);
}
.gold-dot {
  width: 8px; height: 8px;
  background: #D4AF37; border-radius: 50%;
}
.gold-diamond {
  width: 10px; height: 10px;
  background: #D4AF37; transform: rotate(45deg);
}

/* ═══ OVERLAY TEXTURA ═══ */
.texture::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; bottom: 0;
  background:
    radial-gradient(circle at 20% 30%, rgba(212,175,55,0.03) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(212,175,55,0.02) 0%, transparent 50%);
  pointer-events: none;
}

/* ═══ BORDA SUTIL ═══ */
.frame::after {
  content: '';
  position: absolute;
  top: 30px; left: 30px; right: 30px; bottom: 30px;
  border: 0.5px solid rgba(212,175,55,0.12);
  pointer-events: none;
}

/* ═══ SLIDE NUMBER ═══ */
.slide-num {
  position: absolute;
  bottom: 45px; right: 50px;
  font-family: 'Montserrat', sans-serif;
  font-size: 11px;
  letter-spacing: 0.2em;
  opacity: 0.3;
}

/* ═══ BRANDING ═══ */
.brand {
  position: absolute;
  top: 50px; left: 0; right: 0;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  opacity: 0.4;
}
.brand-bottom {
  position: absolute;
  bottom: 45px; left: 0; right: 0;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  opacity: 0.35;
}
`;

// ═══════════════════════════════════════════════════════
// SLIDES
// ═══════════════════════════════════════════════════════
const slides = [];

// ─── SLIDE 1: CAPA ───
slides.push(`
<div class="slide bg-deep texture frame">
  <div class="brand text-gold">Rabino Marcos Barreto</div>

  <!-- Elemento visual: 6 → 9 grande -->
  <div style="position:relative; margin-bottom: 50px;">
    <svg width="420" height="200" viewBox="0 0 420 200">
      <defs>
        <linearGradient id="numGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#E8C849"/>
          <stop offset="100%" stop-color="#B8962E"/>
        </linearGradient>
        <filter id="glowNum">
          <feGaussianBlur stdDeviation="8" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <!-- 6 -->
      <text x="50" y="160" font-family="'Playfair Display', serif" font-size="160" font-weight="700" fill="url(#numGrad)" filter="url(#glowNum)">6</text>
      <!-- Seta -->
      <line x1="155" y1="110" x2="250" y2="110" stroke="#D4AF37" stroke-width="2" opacity="0.6"/>
      <polygon points="248,100 268,110 248,120" fill="#D4AF37" opacity="0.6"/>
      <!-- 9 -->
      <text x="280" y="160" font-family="'Playfair Display', serif" font-size="160" font-weight="700" fill="url(#numGrad)" filter="url(#glowNum)">9</text>
    </svg>
  </div>

  <div style="text-align:center; padding: 0 100px;">
    <div class="serif text-white" style="font-size:38px; font-weight:600; line-height:1.35; margin-bottom:30px;">
      A jornada do homem<br>até a verdade
    </div>
    <div class="gold-line-wide" style="margin: 0 auto 30px;"></div>
    <div class="sans text-muted" style="font-size:16px; letter-spacing:0.08em; line-height:1.6;">
      O que ninguém te explicou<br>sobre transformação espiritual
    </div>
  </div>

  <div class="slide-num text-gold">01 / 15</div>
</div>
`);

// ─── SLIDE 2 ───
slides.push(`
<div class="slide bg-dark texture frame">
  <div class="brand text-gold">Rabino Marcos Barreto</div>

  <div style="text-align:center; padding: 0 90px;">
    <div class="serif text-white" style="font-size:42px; font-weight:600; line-height:1.4; margin-bottom:20px;">
      A mentira não<br>começou <span class="text-gold">fora.</span>
    </div>
    <div class="gold-line" style="margin: 30px auto;"></div>
    <div class="serif text-white" style="font-size:42px; font-weight:600; line-height:1.4;">
      Começou <span class="text-gold" style="font-style:italic;">dentro</span><br>do homem.
    </div>
  </div>

  <div class="slide-num text-gold">02 / 15</div>
</div>
`);

// ─── SLIDE 3 ───
slides.push(`
<div class="slide bg-deep texture frame">
  <div class="brand text-gold">Rabino Marcos Barreto</div>

  <div style="text-align:center; padding: 0 80px;">
    <div class="serif text-white" style="font-size:44px; font-weight:500; line-height:1.4; margin-bottom:16px;">
      A mentira é a verdade…
    </div>
    <div class="gold-line-wide" style="margin: 35px auto;"></div>
    <div style="position:relative; display:inline-block;">
      <div class="serif text-gold" style="font-size:52px; font-weight:700; font-style:italic; line-height:1.3;">
        ao contrário.
      </div>
    </div>
  </div>

  <!-- Elemento visual: 6 invertido virando 9 -->
  <div style="margin-top:60px; opacity:0.15;">
    <svg width="200" height="100" viewBox="0 0 200 100">
      <text x="20" y="80" font-family="'Playfair Display', serif" font-size="80" font-weight="700" fill="#D4AF37">6</text>
      <text x="110" y="80" font-family="'Playfair Display', serif" font-size="80" font-weight="700" fill="#D4AF37" transform="rotate(180 150 40)">6</text>
    </svg>
  </div>

  <div class="slide-num text-gold">03 / 15</div>
</div>
`);

// ─── SLIDE 4 (CITAÇÃO BÍBLICA) ───
slides.push(`
<div class="slide bg-cream texture frame">
  <div class="brand text-blue">Rabino Marcos Barreto</div>

  <div style="text-align:center; padding: 0 100px;">
    <!-- Aspas decorativas -->
    <div class="serif text-gold" style="font-size:120px; line-height:0.5; margin-bottom:20px; opacity:0.3;">"</div>

    <div class="serif text-blue" style="font-size:38px; font-weight:500; font-style:italic; line-height:1.5; margin-bottom:40px;">
      Seja todo homem mentiroso,<br>e D'us verdadeiro.
    </div>

    <div class="gold-line" style="margin: 0 auto 25px;"></div>

    <div class="sans text-muted-dark" style="font-size:14px; letter-spacing:0.15em; text-transform:uppercase;">
      Romanos 3:4
    </div>
  </div>

  <div class="slide-num text-blue" style="opacity:0.2;">04 / 15</div>
</div>
`);

// ─── SLIDE 5 ───
slides.push(`
<div class="slide bg-deep texture frame">
  <div class="brand text-gold">Rabino Marcos Barreto</div>

  <div style="text-align:center; padding: 0 80px;">
    <!-- 6 = homem natural -->
    <div style="display:flex; align-items:center; justify-content:center; gap:25px; margin-bottom:50px;">
      <div class="serif text-gold" style="font-size:90px; font-weight:700; line-height:1;">6</div>
      <div class="serif text-muted" style="font-size:50px; font-weight:300; opacity:0.3;">=</div>
      <div style="text-align:left;">
        <div class="serif text-white" style="font-size:32px; font-weight:600; line-height:1.3;">homem</div>
        <div class="serif text-muted" style="font-size:28px; font-weight:400; font-style:italic;">natural</div>
      </div>
    </div>

    <div class="gold-line-wide" style="margin: 0 auto 50px;"></div>

    <!-- 9 = dons do Espírito -->
    <div style="display:flex; align-items:center; justify-content:center; gap:25px;">
      <div class="serif text-gold" style="font-size:90px; font-weight:700; line-height:1;">9</div>
      <div class="serif text-muted" style="font-size:50px; font-weight:300; opacity:0.3;">=</div>
      <div style="text-align:left;">
        <div class="serif text-white" style="font-size:32px; font-weight:600; line-height:1.3;">dons do</div>
        <div class="serif text-gold" style="font-size:28px; font-weight:600; font-style:italic;">Espírito</div>
      </div>
    </div>
  </div>

  <div class="slide-num text-gold">05 / 15</div>
</div>
`);

// ─── SLIDE 6 ───
slides.push(`
<div class="slide bg-dark texture frame">
  <div class="brand text-gold">Rabino Marcos Barreto</div>

  <div style="text-align:center; padding: 0 90px;">
    <div class="serif text-white" style="font-size:40px; font-weight:500; line-height:1.45;">
      Você pode frequentar<br>igreja…
    </div>
    <div class="gold-line" style="margin: 40px auto;"></div>
    <div class="serif text-white" style="font-size:40px; font-weight:600; line-height:1.45;">
      e continuar<br>no <span class="text-gold" style="font-size:56px; font-weight:800;">6.</span>
    </div>
  </div>

  <div class="slide-num text-gold">06 / 15</div>
</div>
`);

// ─── SLIDE 7 ───
slides.push(`
<div class="slide bg-deep texture frame">
  <div class="brand text-gold">Rabino Marcos Barreto</div>

  <div style="text-align:center; padding: 0 80px;">
    <div class="serif text-white" style="font-size:40px; font-weight:500; line-height:1.45; margin-bottom:10px;">
      Ninguém nasce no <span class="text-gold" style="font-weight:800; font-size:50px;">9.</span>
    </div>

    <div class="gold-line-wide" style="margin: 40px auto;"></div>

    <div class="serif text-white" style="font-size:36px; font-weight:400; line-height:1.5; opacity:0.85;">
      Todo mundo precisa<br>passar pela<br><span class="text-gold" style="font-weight:700; font-style:italic;">transformação.</span>
    </div>
  </div>

  <div class="slide-num text-gold">07 / 15</div>
</div>
`);

// ─── SLIDE 8 ───
slides.push(`
<div class="slide bg-gold-accent texture frame">
  <div class="brand text-gold">Rabino Marcos Barreto</div>

  <div style="text-align:center; padding: 0 90px;">
    <div class="serif text-white" style="font-size:38px; font-weight:500; line-height:1.5;">
      Hoje tem gente que<br>quer <span class="text-gold" style="font-weight:700;">dons…</span>
    </div>

    <div class="gold-line" style="margin: 40px auto;"></div>

    <div class="serif text-white" style="font-size:42px; font-weight:600; line-height:1.45;">
      sem <span style="text-decoration:line-through; opacity:0.4;">transformação.</span>
    </div>
  </div>

  <div class="slide-num text-gold">08 / 15</div>
</div>
`);

// ─── SLIDE 9 ───
slides.push(`
<div class="slide bg-dark texture frame">
  <div class="brand text-gold">Rabino Marcos Barreto</div>

  <div style="text-align:center; padding: 0 80px;">
    <div class="serif text-white" style="font-size:40px; font-weight:500; line-height:1.45; margin-bottom:10px;">
      Quer poder<br>sem processo.
    </div>

    <div class="gold-line" style="margin: 35px auto;"></div>

    <div class="serif text-white" style="font-size:34px; font-weight:400; line-height:1.5; margin-top:10px;">
      Isso <span class="text-gold" style="font-weight:700; font-size:40px;">não</span> é<br>Espírito Santo.
    </div>
  </div>

  <div class="slide-num text-gold">09 / 15</div>
</div>
`);

// ─── SLIDE 10 ───
slides.push(`
<div class="slide bg-deep texture frame">
  <div class="brand text-gold">Rabino Marcos Barreto</div>

  <div style="text-align:center; padding: 0 80px;">
    <div class="serif text-white" style="font-size:36px; font-weight:400; line-height:1.5;">
      O Espírito Santo<br>não vem só te <span style="opacity:0.4;">usar.</span>
    </div>

    <div style="margin: 45px auto; display:flex; align-items:center; justify-content:center; gap:16px;">
      <div style="flex:1; max-width:80px; height:1px; background:linear-gradient(90deg, transparent, #D4AF37);"></div>
      <div class="gold-diamond"></div>
      <div style="flex:1; max-width:80px; height:1px; background:linear-gradient(270deg, transparent, #D4AF37);"></div>
    </div>

    <div class="serif text-gold" style="font-size:44px; font-weight:700; font-style:italic; line-height:1.4;">
      Ele vem te<br>transformar.
    </div>
  </div>

  <div class="slide-num text-gold">10 / 15</div>
</div>
`);

// ─── SLIDE 11 ───
slides.push(`
<div class="slide bg-cream texture frame">
  <div class="brand text-blue">Rabino Marcos Barreto</div>

  <div style="text-align:center; padding: 0 90px;">
    <div class="sans text-muted-dark" style="font-size:15px; letter-spacing:0.15em; text-transform:uppercase; margin-bottom:30px;">
      A verdade dói
    </div>

    <div class="serif text-blue" style="font-size:40px; font-weight:500; line-height:1.45;">
      Não dá pra viver assim:
    </div>

    <div class="gold-line" style="margin: 35px auto;"></div>

    <div class="serif text-blue" style="font-size:34px; font-weight:400; line-height:1.6; font-style:italic;">
      um dia no <span style="font-weight:700; font-style:normal; color:#D4AF37;">Espírito,</span><br>
      outro na <span style="font-weight:700; font-style:normal; opacity:0.4;">carne.</span>
    </div>
  </div>

  <div class="slide-num text-blue" style="opacity:0.2;">11 / 15</div>
</div>
`);

// ─── SLIDE 12 ───
slides.push(`
<div class="slide bg-deep texture frame">
  <div class="brand text-gold">Rabino Marcos Barreto</div>

  <!-- Transição visual 6 → 9 -->
  <div style="margin-bottom:40px;">
    <svg width="300" height="160" viewBox="0 0 300 160">
      <defs>
        <linearGradient id="fadeNum" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#D4AF37" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="#D4AF37" stop-opacity="1"/>
        </linearGradient>
      </defs>
      <text x="20" y="130" font-family="'Playfair Display', serif" font-size="140" font-weight="700" fill="#D4AF37" opacity="0.15">6</text>
      <text x="160" y="130" font-family="'Playfair Display', serif" font-size="140" font-weight="700" fill="url(#fadeNum)">9</text>
      <!-- Seta curva -->
      <path d="M 110 50 Q 150 20 180 50" fill="none" stroke="#D4AF37" stroke-width="1.5" opacity="0.5"/>
      <polygon points="178,44 186,52 176,54" fill="#D4AF37" opacity="0.5"/>
    </svg>
  </div>

  <div style="text-align:center; padding: 0 80px;">
    <div class="serif text-white" style="font-size:36px; font-weight:500; line-height:1.5;">
      <span class="text-gold" style="font-weight:700;">6</span> vira <span class="text-gold" style="font-weight:700;">9…</span>
    </div>

    <div class="gold-line" style="margin: 30px auto;"></div>

    <div class="serif text-white" style="font-size:34px; font-weight:400; line-height:1.55;">
      quando o homem se submete<br>à <span class="text-gold" style="font-weight:700; font-style:italic;">verdade.</span>
    </div>
  </div>

  <div class="slide-num text-gold">12 / 15</div>
</div>
`);

// ─── SLIDE 13 ───
slides.push(`
<div class="slide bg-dark texture frame">
  <div class="brand text-gold">Rabino Marcos Barreto</div>

  <div style="text-align:center; padding: 0 80px;">
    <div class="serif text-white" style="font-size:40px; font-weight:500; line-height:1.45;">
      A verdade não te<br><span style="text-decoration:line-through; opacity:0.35;">informa.</span>
    </div>

    <div style="margin: 45px auto; display:flex; align-items:center; justify-content:center; gap:16px;">
      <div style="flex:1; max-width:80px; height:1px; background:linear-gradient(90deg, transparent, #D4AF37);"></div>
      <div class="gold-diamond"></div>
      <div style="flex:1; max-width:80px; height:1px; background:linear-gradient(270deg, transparent, #D4AF37);"></div>
    </div>

    <div class="serif text-gold" style="font-size:48px; font-weight:700; font-style:italic; line-height:1.3;">
      Ela te transforma.
    </div>
  </div>

  <div class="slide-num text-gold">13 / 15</div>
</div>
`);

// ─── SLIDE 14 ───
slides.push(`
<div class="slide bg-deep texture frame">
  <div class="brand text-gold">Rabino Marcos Barreto</div>

  <div style="text-align:center; padding: 0 90px;">
    <div class="serif text-white" style="font-size:42px; font-weight:500; line-height:1.45;">
      Quer sair do <span class="text-gold" style="font-weight:800; font-size:54px;">6…</span>
    </div>

    <div class="gold-line" style="margin: 45px auto;"></div>

    <div class="serif text-white" style="font-size:42px; font-weight:600; line-height:1.45;">
      e viver no <span class="text-gold" style="font-weight:800; font-size:54px;">9?</span>
    </div>
  </div>

  <!-- Seta pra baixo sugerindo "continue" -->
  <div style="position:absolute; bottom:80px; opacity:0.25;">
    <svg width="40" height="40" viewBox="0 0 40 40">
      <path d="M 10 15 L 20 28 L 30 15" fill="none" stroke="#D4AF37" stroke-width="2"/>
    </svg>
  </div>

  <div class="slide-num text-gold">14 / 15</div>
</div>
`);

// ─── SLIDE 15: CTA FINAL ───
slides.push(`
<div class="slide bg-gold-accent texture frame" style="background: linear-gradient(175deg, #142D45 0%, #1B3B5F 35%, #1F4060 100%);">
  <div class="brand text-gold">Rabino Marcos Barreto</div>

  <div style="text-align:center; padding: 0 80px;">
    <!-- Badge -->
    <div style="display:inline-block; border:1px solid rgba(212,175,55,0.3); padding:10px 30px; margin-bottom:50px;">
      <div class="sans text-gold" style="font-size:12px; letter-spacing:0.3em; text-transform:uppercase;">
        Próximo passo
      </div>
    </div>

    <div class="serif text-white" style="font-size:44px; font-weight:700; line-height:1.35; margin-bottom:15px;">
      Entra na<br><span class="text-gold">Sala do Mapa.</span>
    </div>

    <div style="margin: 35px auto; display:flex; align-items:center; justify-content:center; gap:16px;">
      <div style="flex:1; max-width:60px; height:1px; background:linear-gradient(90deg, transparent, #D4AF37);"></div>
      <div class="gold-dot"></div>
      <div style="flex:1; max-width:60px; height:1px; background:linear-gradient(270deg, transparent, #D4AF37);"></div>
    </div>

    <div class="serif text-white" style="font-size:28px; font-weight:400; font-style:italic; line-height:1.6; opacity:0.8; margin-top:10px;">
      Quem anda no mapa,<br>não tropeça no escuro.
    </div>

    <!-- CTA visual -->
    <div style="margin-top:50px; display:inline-block; border:1.5px solid #D4AF37; padding:18px 50px; background:rgba(212,175,55,0.08);">
      <div class="sans text-gold" style="font-size:15px; font-weight:600; letter-spacing:0.2em; text-transform:uppercase;">
        Link na bio ↗
      </div>
    </div>
  </div>

  <div class="brand-bottom text-gold">@rabinomarcosbarreto.oficial</div>
  <div class="slide-num text-gold">15 / 15</div>
</div>
`);

// ═══════════════════════════════════════════════════════
// GERAR IMAGENS
// ═══════════════════════════════════════════════════════
(async () => {
  const browser = await chromium.launch();

  for (let i = 0; i < slides.length; i++) {
    const page = await browser.newPage({ viewport: { width: W, height: H } });
    const html = `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><style>${baseCSS}</style></head><body>${slides[i]}</body></html>`;
    await page.setContent(html, { waitUntil: 'networkidle' });
    const num = String(i + 1).padStart(2, '0');
    await page.screenshot({
      path: path.join(outDir, `slide-${num}.png`),
      type: 'png'
    });
    await page.close();
    console.log(`  ✓ Slide ${num}`);
  }

  await browser.close();
  console.log(`\n15 slides gerados em: ${outDir}`);
})();
