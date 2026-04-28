const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const outDir = path.join(__dirname, 'rubricas');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&family=Great+Vibes&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: transparent; }

        .rubrica-container {
            display: flex;
            flex-direction: column;
            gap: 80px;
            padding: 60px;
        }

        .rubrica-block {
            text-align: center;
            position: relative;
        }

        .rubrica-block .label {
            font-family: 'Playfair Display', serif;
            font-size: 11px;
            color: #9CA3AF;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            margin-bottom: 20px;
        }

        /* ═══ RUBRICA RABINO ═══ */
        .rubrica-rabino {
            position: relative;
            width: 360px;
            height: 120px;
            margin: 0 auto;
        }

        .rubrica-rabino svg {
            width: 100%;
            height: 100%;
        }

        /* ═══ RUBRICA CLÁUDIA ═══ */
        .rubrica-claudia {
            position: relative;
            width: 360px;
            height: 120px;
            margin: 0 auto;
        }

        .rubrica-claudia svg {
            width: 100%;
            height: 100%;
        }

        .sig-info {
            margin-top: 8px;
        }
        .sig-info .name {
            font-family: 'Playfair Display', serif;
            font-size: 14px;
            font-weight: 600;
            color: #1B3B5F;
        }
        .sig-info .title {
            font-size: 10px;
            color: #9CA3AF;
            letter-spacing: 0.05em;
            margin-top: 2px;
        }
    </style>
</head>
<body>
    <div class="rubrica-container">

        <!-- ═══ RABINO MARCOS BARRETO ═══ -->
        <div class="rubrica-block" id="rabino">
            <div class="label">Rubrica</div>
            <div class="rubrica-rabino">
                <svg viewBox="0 0 360 120" xmlns="http://www.w3.org/2000/svg">
                    <!-- Traço principal — M fluido e estilizado -->
                    <path d="M 40 90
                             Q 45 30, 70 35
                             Q 85 37, 80 65
                             Q 78 80, 95 40
                             Q 105 20, 115 55
                             Q 120 70, 130 45
                             Q 140 25, 160 50
                             C 175 70, 185 35, 200 50
                             Q 220 65, 250 45
                             C 270 30, 290 55, 310 40"
                          fill="none" stroke="#1B3B5F" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>

                    <!-- Traço horizontal de sustentação -->
                    <path d="M 55 78 Q 180 72, 300 75"
                          fill="none" stroke="#1B3B5F" stroke-width="0.8" stroke-linecap="round" opacity="0.4"/>

                    <!-- Ponto do i / detalhe -->
                    <circle cx="145" cy="25" r="2.5" fill="#D4AF37"/>

                    <!-- Flourish final -->
                    <path d="M 305 42 Q 320 35, 330 45 Q 340 55, 325 58"
                          fill="none" stroke="#1B3B5F" stroke-width="1.5" stroke-linecap="round"/>

                    <!-- Underline decorativa -->
                    <path d="M 60 95 Q 180 100, 300 92"
                          fill="none" stroke="#D4AF37" stroke-width="1" stroke-linecap="round" opacity="0.5"/>
                </svg>
            </div>
            <div class="sig-info">
                <div class="name">Rabino Marcos Barreto</div>
                <div class="title">Fundador — Ecossistema Mapa do Herdeiro</div>
            </div>
        </div>

        <!-- ═══ CLÁUDIA BARRETO ═══ -->
        <div class="rubrica-block" id="claudia">
            <div class="label">Rubrica</div>
            <div class="rubrica-claudia">
                <svg viewBox="0 0 360 120" xmlns="http://www.w3.org/2000/svg">
                    <!-- Traço principal — C elegante e fluido -->
                    <path d="M 60 55
                             Q 45 25, 70 20
                             Q 95 15, 90 45
                             Q 88 60, 105 35
                             Q 115 22, 130 45
                             C 140 60, 148 30, 165 40
                             Q 180 48, 195 35
                             C 210 22, 225 50, 245 38
                             Q 260 28, 280 45
                             Q 295 58, 310 42"
                          fill="none" stroke="#1B3B5F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>

                    <!-- Loop do C inicial -->
                    <path d="M 55 58 Q 40 70, 50 80 Q 60 88, 80 78"
                          fill="none" stroke="#1B3B5F" stroke-width="1.8" stroke-linecap="round"/>

                    <!-- Traço horizontal sutil -->
                    <path d="M 70 72 Q 190 68, 305 70"
                          fill="none" stroke="#1B3B5F" stroke-width="0.6" stroke-linecap="round" opacity="0.3"/>

                    <!-- Detalhe dourado -->
                    <circle cx="175" cy="22" r="2" fill="#D4AF37"/>

                    <!-- Flourish final -->
                    <path d="M 306 44 Q 320 30, 335 40 Q 342 48, 330 52 Q 322 54, 325 48"
                          fill="none" stroke="#1B3B5F" stroke-width="1.3" stroke-linecap="round"/>

                    <!-- Underline -->
                    <path d="M 50 95 Q 180 102, 310 93"
                          fill="none" stroke="#D4AF37" stroke-width="1" stroke-linecap="round" opacity="0.5"/>
                </svg>
            </div>
            <div class="sig-info">
                <div class="name">Cláudia Barreto</div>
                <div class="title">Diretora Estratégica — Instituto Marcos Barreto</div>
            </div>
        </div>

    </div>
</body>
</html>`;

(async () => {
    const browser = await chromium.launch();

    // ─── Preview conjunto ───
    const pageFull = await browser.newPage({ viewport: { width: 500, height: 550 } });
    await pageFull.setContent(html, { waitUntil: 'networkidle' });
    await pageFull.screenshot({ path: path.join(outDir, 'rubricas-preview.png'), type: 'png', omitBackground: true });
    await pageFull.close();

    // ─── Rubrica Rabino (isolada, fundo transparente) ───
    const pageR = await browser.newPage({ viewport: { width: 400, height: 160 } });
    await pageR.setContent(`<!DOCTYPE html><html><head>
        <meta charset="UTF-8">
        <style>*{margin:0;padding:0;box-sizing:border-box;}body{background:transparent;display:flex;align-items:center;justify-content:center;width:400px;height:160px;}</style>
    </head><body>
        <svg viewBox="0 0 360 120" xmlns="http://www.w3.org/2000/svg" width="360" height="120">
            <path d="M 40 90 Q 45 30, 70 35 Q 85 37, 80 65 Q 78 80, 95 40 Q 105 20, 115 55 Q 120 70, 130 45 Q 140 25, 160 50 C 175 70, 185 35, 200 50 Q 220 65, 250 45 C 270 30, 290 55, 310 40" fill="none" stroke="#1B3B5F" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M 55 78 Q 180 72, 300 75" fill="none" stroke="#1B3B5F" stroke-width="0.8" stroke-linecap="round" opacity="0.4"/>
            <circle cx="145" cy="25" r="2.5" fill="#D4AF37"/>
            <path d="M 305 42 Q 320 35, 330 45 Q 340 55, 325 58" fill="none" stroke="#1B3B5F" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M 60 95 Q 180 100, 300 92" fill="none" stroke="#D4AF37" stroke-width="1" stroke-linecap="round" opacity="0.5"/>
        </svg>
    </body></html>`, { waitUntil: 'networkidle' });
    await pageR.screenshot({ path: path.join(outDir, 'rubrica-rabino-marcos.png'), type: 'png', omitBackground: true });
    await pageR.close();

    // ─── Rubrica Cláudia (isolada, fundo transparente) ───
    const pageC = await browser.newPage({ viewport: { width: 400, height: 160 } });
    await pageC.setContent(`<!DOCTYPE html><html><head>
        <meta charset="UTF-8">
        <style>*{margin:0;padding:0;box-sizing:border-box;}body{background:transparent;display:flex;align-items:center;justify-content:center;width:400px;height:160px;}</style>
    </head><body>
        <svg viewBox="0 0 360 120" xmlns="http://www.w3.org/2000/svg" width="360" height="120">
            <path d="M 60 55 Q 45 25, 70 20 Q 95 15, 90 45 Q 88 60, 105 35 Q 115 22, 130 45 C 140 60, 148 30, 165 40 Q 180 48, 195 35 C 210 22, 225 50, 245 38 Q 260 28, 280 45 Q 295 58, 310 42" fill="none" stroke="#1B3B5F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M 55 58 Q 40 70, 50 80 Q 60 88, 80 78" fill="none" stroke="#1B3B5F" stroke-width="1.8" stroke-linecap="round"/>
            <path d="M 70 72 Q 190 68, 305 70" fill="none" stroke="#1B3B5F" stroke-width="0.6" stroke-linecap="round" opacity="0.3"/>
            <circle cx="175" cy="22" r="2" fill="#D4AF37"/>
            <path d="M 306 44 Q 320 30, 335 40 Q 342 48, 330 52 Q 322 54, 325 48" fill="none" stroke="#1B3B5F" stroke-width="1.3" stroke-linecap="round"/>
            <path d="M 50 95 Q 180 102, 310 93" fill="none" stroke="#D4AF37" stroke-width="1" stroke-linecap="round" opacity="0.5"/>
        </svg>
    </body></html>`, { waitUntil: 'networkidle' });
    await pageC.screenshot({ path: path.join(outDir, 'rubrica-claudia-barreto.png'), type: 'png', omitBackground: true });
    await pageC.close();

    await browser.close();
    console.log('Rubricas geradas em:', outDir);
})();
