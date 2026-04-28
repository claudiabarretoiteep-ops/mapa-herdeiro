const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1240, height: 1754 } });

  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500&family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Montserrat', sans-serif;
            width: 1240px; height: 1754px;
            background: #FDFCF8;
            position: relative; overflow: hidden;
        }
        body::before {
            content: '';
            position: absolute; top: 0; left: 0; right: 0; bottom: 0;
            background:
                radial-gradient(circle at 15% 20%, rgba(212,175,55,0.03) 0%, transparent 40%),
                radial-gradient(circle at 85% 80%, rgba(27,59,95,0.02) 0%, transparent 40%);
        }
        .border-frame {
            position: absolute; top: 60px; left: 60px; right: 60px; bottom: 60px;
            border: 1.5px solid rgba(212,175,55,0.25);
        }
        .border-frame::before {
            content: ''; position: absolute;
            top: 10px; left: 10px; right: 10px; bottom: 10px;
            border: 0.5px solid rgba(212,175,55,0.12);
        }
        .corner { position: absolute; width: 40px; height: 40px; }
        .corner::before, .corner::after { content: ''; position: absolute; background: #D4AF37; }
        .corner-tl { top: 60px; left: 60px; }
        .corner-tl::before { top: 0; left: 0; width: 40px; height: 2px; }
        .corner-tl::after { top: 0; left: 0; width: 2px; height: 40px; }
        .corner-tr { top: 60px; right: 60px; }
        .corner-tr::before { top: 0; right: 0; width: 40px; height: 2px; }
        .corner-tr::after { top: 0; right: 0; width: 2px; height: 40px; }
        .corner-bl { bottom: 60px; left: 60px; }
        .corner-bl::before { bottom: 0; left: 0; width: 40px; height: 2px; }
        .corner-bl::after { bottom: 0; left: 0; width: 2px; height: 40px; }
        .corner-br { bottom: 60px; right: 60px; }
        .corner-br::before { bottom: 0; right: 0; width: 40px; height: 2px; }
        .corner-br::after { bottom: 0; right: 0; width: 2px; height: 40px; }

        .watermark {
            position: absolute; top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            width: 400px; height: 400px; opacity: 0.02;
        }
        .watermark svg { width: 100%; height: 100%; }

        .content {
            position: relative; z-index: 1; height: 100%;
            display: flex; flex-direction: column; align-items: center;
            padding: 100px 120px 90px;
        }
        .instituto-name {
            font-family: 'Playfair Display', serif;
            font-size: 18px; font-weight: 600; color: #1B3B5F;
            letter-spacing: 0.35em; text-transform: uppercase;
        }
        .instituto-line {
            width: 70px; height: 1.5px; background: #D4AF37;
            margin: 16px auto 0;
        }
        .title-block { text-align: center; margin: 40px 0 20px; }
        .title-label {
            font-size: 13px; font-weight: 600;
            letter-spacing: 0.4em; text-transform: uppercase;
            color: #D4AF37; margin-bottom: 24px;
        }
        .title-main {
            font-family: 'Playfair Display', serif;
            font-size: 40px; font-weight: 700; color: #1B3B5F; line-height: 1.25;
        }
        .title-sub {
            font-size: 14px; color: #8C9AAB;
            letter-spacing: 0.08em; margin-top: 20px;
        }
        .gold-divider {
            display: flex; align-items: center; gap: 16px;
            margin: 32px 0; width: 100%; max-width: 500px;
        }
        .gold-divider .line {
            flex: 1; height: 0.5px;
            background: linear-gradient(90deg, transparent, #D4AF37, transparent);
        }
        .gold-divider .diamond {
            width: 8px; height: 8px; background: #D4AF37; transform: rotate(45deg);
        }
        .certifica-intro {
            font-size: 14px; color: #8C9AAB;
            letter-spacing: 0.15em; text-transform: uppercase;
            margin-bottom: 16px;
        }

        /* ESPACO VAZIO para Voomp inserir o nome do aluno */
        .name-space {
            width: 500px; height: 70px;
            border-bottom: 2px solid #D4AF37;
            margin: 10px 0 20px;
        }

        .body-text {
            text-align: center; font-size: 15px;
            color: #6B7280; line-height: 1.9; max-width: 560px;
        }
        .body-text strong { color: #1B3B5F; font-weight: 600; }

        .modules { margin: 20px 0; text-align: left; max-width: 560px; width: 100%; }
        .module-item {
            display: flex; align-items: center; gap: 14px;
            padding: 12px 0; border-bottom: 0.5px solid rgba(212,175,55,0.1);
            font-size: 14px; color: #4B5563;
        }
        .module-item:last-child { border-bottom: none; }
        .module-bullet { width: 7px; height: 7px; background: #D4AF37; border-radius: 50%; }

        .declaration {
            text-align: center; margin: 20px 0;
            padding: 16px 30px; max-width: 560px;
        }
        .declaration p {
            font-family: 'Playfair Display', serif;
            font-size: 16px; font-style: italic;
            color: #1B3B5F; line-height: 1.7; opacity: 0.8;
        }

        .seal-container { position: absolute; right: 130px; bottom: 280px; }
        .seal {
            width: 110px; height: 110px; border-radius: 50%;
            border: 2.5px solid #D4AF37;
            display: flex; flex-direction: column;
            align-items: center; justify-content: center;
            text-align: center;
            background: radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%);
            position: relative;
        }
        .seal::before {
            content: ''; position: absolute;
            top: 5px; left: 5px; right: 5px; bottom: 5px;
            border-radius: 50%; border: 0.5px solid rgba(212,175,55,0.3);
        }
        .seal .seal-icon { font-size: 24px; margin-bottom: 3px; }
        .seal .seal-text {
            font-family: 'Playfair Display', serif;
            font-size: 9px; font-weight: 700; color: #D4AF37;
            text-transform: uppercase; letter-spacing: 0.15em; line-height: 1.3;
        }

        .validation-bar { text-align: center; margin-top: auto; padding-top: 12px; }
        .ecosystem-text {
            font-size: 12px; color: #9CA3AF; font-weight: 500;
            letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 16px;
        }
        .signatures {
            display: flex; justify-content: center;
            gap: 80px; margin-top: 16px; width: 100%;
        }
        .signature { text-align: center; flex: 0 0 220px; }
        .sig-line { width: 100%; height: 0.5px; background: #1B3B5F; margin-bottom: 8px; opacity: 0.3; }
        .sig-name {
            font-family: 'Playfair Display', serif;
            font-size: 15px; font-weight: 600; color: #1B3B5F;
        }
        .sig-title { font-size: 10px; color: #9CA3AF; margin-top: 3px; letter-spacing: 0.05em; }
        .meta-row { display: flex; justify-content: center; gap: 60px; margin-top: 20px; }
        .meta-label {
            font-size: 9px; color: #B0B8C4;
            text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 3px;
        }
        .meta-value { font-size: 12px; color: #6B7280; font-weight: 500; }
    </style>
</head>
<body>
    <div class="watermark">
        <svg viewBox="0 0 200 200" fill="#1B3B5F">
            <circle cx="100" cy="100" r="95" fill="none" stroke="#1B3B5F" stroke-width="0.5"/>
            <circle cx="100" cy="100" r="80" fill="none" stroke="#1B3B5F" stroke-width="0.3"/>
            <line x1="100" y1="5" x2="100" y2="195" stroke="#1B3B5F" stroke-width="0.3"/>
            <line x1="5" y1="100" x2="195" y2="100" stroke="#1B3B5F" stroke-width="0.3"/>
            <line x1="30" y1="30" x2="170" y2="170" stroke="#1B3B5F" stroke-width="0.2"/>
            <line x1="170" y1="30" x2="30" y2="170" stroke="#1B3B5F" stroke-width="0.2"/>
            <polygon points="100,8 104,25 96,25" fill="#1B3B5F"/>
            <polygon points="100,192 104,175 96,175" fill="#1B3B5F"/>
            <polygon points="8,100 25,96 25,104" fill="#1B3B5F"/>
            <polygon points="192,100 175,96 175,104" fill="#1B3B5F"/>
        </svg>
    </div>

    <div class="border-frame"></div>
    <div class="corner corner-tl"></div>
    <div class="corner corner-tr"></div>
    <div class="corner corner-bl"></div>
    <div class="corner corner-br"></div>

    <div class="seal-container">
        <div class="seal">
            <div class="seal-icon">✦</div>
            <div class="seal-text">Herdeiro<br>Alinhado</div>
        </div>
    </div>

    <div class="content">
        <div style="text-align:center;">
            <div class="instituto-name">Instituto Marcos Barreto</div>
            <div class="instituto-line"></div>
        </div>

        <div class="title-block">
            <div class="title-label">✦ Certificação Oficial ✦</div>
            <div class="title-main">Certificado de Alinhamento<br>do Herdeiro</div>
            <div class="title-sub">Reconhecimento de Jornada e Realinhamento Espiritual e Prático</div>
        </div>

        <div class="gold-divider">
            <div class="line"></div>
            <div class="diamond"></div>
            <div class="line"></div>
        </div>

        <div class="certifica-intro">Este documento certifica que</div>

        <!-- ESPACO VAZIO — Voomp insere "Nome do Aluno" aqui -->
        <div class="name-space"></div>

        <div class="body-text">concluiu integralmente a jornada formativa composta por:</div>

        <div class="modules">
            <div class="module-item"><div class="module-bullet"></div><span>DNA do Herdeiro — Diagnóstico do Perfil Espiritual</span></div>
            <div class="module-item"><div class="module-bullet"></div><span>A Revelação do Herdeiro — Estudo de Gálatas 3 e 4</span></div>
            <div class="module-item"><div class="module-bullet"></div><span>Sistema Guiado de Realinhamento Espiritual e Prático — Eixos 0 a 5</span></div>
        </div>

        <div class="body-text" style="margin-top:12px;">
            e demonstrou compromisso com o processo de <strong>alinhamento, clareza e posicionamento</strong> como herdeiro.
        </div>

        <div class="declaration">
            <div class="gold-divider" style="max-width:280px;margin:0 auto 14px;">
                <div class="line"></div>
                <div class="diamond"></div>
                <div class="line"></div>
            </div>
            <p>"Este não é um certificado de conclusão.<br>
            É o reconhecimento de que você deixou de andar no escuro<br>
            e passou a caminhar com direção."</p>
        </div>

        <div class="validation-bar">
            <div class="ecosystem-text">Jornada validada dentro do Ecossistema Mapa do Herdeiro</div>
        </div>

        <div class="signatures">
            <div class="signature">
                <div class="sig-line"></div>
                <div class="sig-name">Rabino Marcos Barreto</div>
                <div class="sig-title">Fundador — Ecossistema Mapa do Herdeiro</div>
            </div>
            <div class="signature">
                <div class="sig-line"></div>
                <div class="sig-name">Cláudia Barreto</div>
                <div class="sig-title">Diretora Estratégica — Instituto Marcos Barreto</div>
            </div>
        </div>

        <div class="meta-row">
            <div class="meta-item"><div class="meta-label">Data de Emissão</div><div class="meta-value">___  / ___  / 2026</div></div>
            <div class="meta-item"><div class="meta-label">Código de Validação</div><div class="meta-value">MH-2026-________</div></div>
        </div>
    </div>
</body>
</html>`;

  await page.setContent(html, { waitUntil: 'networkidle' });

  // PNG for Voomp (high quality)
  await page.screenshot({
    path: 'certificado-voomp-base.png',
    fullPage: false,
    type: 'png'
  });

  // JPEG (lighter file)
  await page.screenshot({
    path: 'certificado-voomp-base.jpg',
    fullPage: false,
    type: 'jpeg',
    quality: 95
  });

  await browser.close();
  console.log('Imagens geradas com sucesso!');
})();
