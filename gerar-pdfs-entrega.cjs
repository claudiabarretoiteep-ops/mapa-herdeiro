const { chromium } = require('playwright');
const path = require('path');

const EIXOS = [
  { id: 0, nome: 'Despertar', titulo: 'Você não está perdido. Está desalinhado.', sub: 'Um ensaio conciso e prático sobre maturidade espiritual e governo interior.', tag: 'Bônus Gratuito', color: '#D4AF37' },
  { id: 1, nome: 'Consciência', titulo: 'Fé herdada ou fé compreendida?', sub: 'Saia da repetição religiosa e entre em entendimento com fundamento.', tag: 'Eixo 1', color: '#8B5CF6' },
  { id: 2, nome: 'Confronto', titulo: 'Promessa não é estrutura.', sub: 'Encare os padrões que estão travando sua vida.', tag: 'Eixo 2', color: '#EF4444' },
  { id: 3, nome: 'Direção', titulo: 'Governo começa dentro.', sub: 'Pare de reagir e comece a decidir.', tag: 'Eixo 3', color: '#10B981' },
  { id: 4, nome: 'Governo', titulo: 'Prosperar sem culpa.', sub: 'Quebre a teologia da escassez com base bíblica.', tag: 'Eixo 4', color: '#F59E0B' },
  { id: 5, nome: 'Expansão', titulo: 'Teshuvá: O retorno ao eixo.', sub: 'Saia do modo sobrevivência e entre em construção.', tag: 'Eixo 5', color: '#3B82F6' },
];

const LINKS = {
  whatsapp_grupo: 'https://chat.whatsapp.com/GklHlN6ObdAJcOEwauT0dB',
  whatsapp_claudia: 'https://api.whatsapp.com/send?phone=5537991494464&text=Ol%C3%A1%20Pra.%20Cl%C3%A1udia!%20Vim%20pelo%20Mapa%20do%20Herdeiro.',
  instagram: 'https://www.instagram.com/rabinomarcosbarreto.oficial/',
  youtube: 'https://www.youtube.com/prmarcosbarreto',
  diagnostico: 'https://mapadoherdeiro.com.br/eixos/#/diagnostico',
  revelacao: 'https://mapadoherdeiro.com.br/eixos/#/revelacao',
  sistema: 'https://mapadoherdeiro.com.br/eixos/#/sistema',
  email: 'claudiabarreto.iteep@gmail.com',
};

function eixoLink(id) {
  return `https://mapadoherdeiro.com.br/eixos/#/leitura?eixo=${id}`;
}

function buildCoverPage(title, subtitle, badge) {
  return `
    <div style="
      width: 100%; height: 100vh;
      background: linear-gradient(160deg, #1B3B5F 0%, #0D1F33 60%, #122842 100%);
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      text-align: center; position: relative; overflow: hidden;
      page-break-after: always;
    ">
      <div style="position:absolute;top:0;left:0;right:0;bottom:0;
        background: radial-gradient(circle at 30% 40%, rgba(212,175,55,0.08) 0%, transparent 50%),
                    radial-gradient(circle at 70% 70%, rgba(212,175,55,0.05) 0%, transparent 40%),
                    radial-gradient(circle at 50% 10%, rgba(255,255,255,0.02) 0%, transparent 30%);
      "></div>
      <div style="position:relative;z-index:1;padding:60px;">
        <div style="
          display:inline-block; background:rgba(212,175,55,0.12); border:1px solid rgba(212,175,55,0.25);
          border-radius:50px; padding:8px 24px; font-size:11px; font-weight:700;
          letter-spacing:0.2em; text-transform:uppercase; color:#D4AF37; margin-bottom:40px;
          font-family:'Inter',sans-serif;
        ">${badge}</div>
        <h1 style="
          font-family:'Playfair Display',serif; font-size:42px; font-weight:700;
          color:#FFFFFF; line-height:1.15; margin-bottom:16px; max-width:500px;
        ">${title}</h1>
        <p style="
          font-family:'Inter',sans-serif; font-size:15px; color:rgba(255,255,255,0.5);
          max-width:420px; margin:0 auto 48px; line-height:1.6;
        ">${subtitle}</p>
        <div style="width:60px;height:2px;background:#D4AF37;margin:0 auto 32px;"></div>
        <p style="font-family:'Playfair Display',serif;font-size:16px;color:rgba(255,255,255,0.35);font-style:italic;">
          Rabino Marcos Barreto
        </p>
        <p style="font-family:'Inter',sans-serif;font-size:11px;color:rgba(255,255,255,0.2);margin-top:8px;">
          Mapa do Herdeiro
        </p>
      </div>
    </div>
  `;
}

function buildEcossistema() {
  return `
    <div style="background:#1B3B5F;padding:40px 32px;text-align:center;">
      <h3 style="font-family:'Playfair Display',serif;font-size:20px;font-weight:700;color:#D4AF37;margin-bottom:6px;">
        Conheça o Ecossistema
      </h3>
      <p style="font-size:12px;color:rgba(255,255,255,0.4);margin-bottom:24px;font-family:'Inter',sans-serif;">
        Mapa do Herdeiro — Rabino Marcos Barreto
      </p>
      <table style="margin:0 auto;border-spacing:0 10px;max-width:420px;width:100%;">
        <tr><td style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:14px 16px;">
          <a href="${LINKS.whatsapp_grupo}" style="text-decoration:none;color:#fff;font-size:13px;font-weight:600;font-family:'Inter',sans-serif;">
            💬 Sala do Mapa — Grupo WhatsApp
          </a><br><span style="font-size:11px;color:rgba(255,255,255,0.4);font-family:'Inter',sans-serif;">Entre na comunidade gratuita de realinhamento</span>
        </td></tr>
        <tr><td style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:14px 16px;">
          <a href="${LINKS.diagnostico}" style="text-decoration:none;color:#fff;font-size:13px;font-weight:600;font-family:'Inter',sans-serif;">
            🧬 DNA do Herdeiro
          </a><br><span style="font-size:11px;color:rgba(255,255,255,0.4);font-family:'Inter',sans-serif;">Diagnóstico gratuito do seu perfil espiritual</span>
        </td></tr>
        <tr><td style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:14px 16px;">
          <a href="${LINKS.revelacao}" style="text-decoration:none;color:#fff;font-size:13px;font-weight:600;font-family:'Inter',sans-serif;">
            📖 A Revelação do Herdeiro
          </a><br><span style="font-size:11px;color:rgba(255,255,255,0.4);font-family:'Inter',sans-serif;">A aula que muda como você lê Gálatas 4</span>
        </td></tr>
        <tr><td style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:14px 16px;">
          <a href="${LINKS.sistema}" style="text-decoration:none;color:#fff;font-size:13px;font-weight:600;font-family:'Inter',sans-serif;">
            📚 Coleção Eixos do Herdeiro
          </a><br><span style="font-size:11px;color:rgba(255,255,255,0.4);font-family:'Inter',sans-serif;">Os 6 eixos de realinhamento completos</span>
        </td></tr>
      </table>
      <div style="margin-top:24px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.08);">
        <a href="${LINKS.instagram}" style="text-decoration:none;color:rgba(255,255,255,0.5);font-size:13px;margin:0 12px;font-family:'Inter',sans-serif;">📸 Instagram</a>
        <a href="${LINKS.youtube}" style="text-decoration:none;color:rgba(255,255,255,0.5);font-size:13px;margin:0 12px;font-family:'Inter',sans-serif;">🎬 YouTube</a>
        <a href="${LINKS.whatsapp_claudia}" style="text-decoration:none;color:rgba(255,255,255,0.5);font-size:13px;margin:0 12px;font-family:'Inter',sans-serif;">💬 WhatsApp</a>
      </div>
    </div>
    <div style="background:#122842;padding:20px 40px;text-align:center;">
      <p style="font-family:'Playfair Display',serif;font-size:14px;color:rgba(255,255,255,0.3);font-weight:700;margin-bottom:6px;">Mapa do Herdeiro</p>
      <p style="color:rgba(255,255,255,0.15);font-size:11px;font-family:'Inter',sans-serif;">Rabino Marcos Barreto — Todos os direitos reservados</p>
    </div>
  `;
}

function buildSupport() {
  return `
    <div style="text-align:center;padding:24px;background:#FDFCF7;border:1px solid #F0EDE5;border-radius:12px;margin:32px 0;">
      <h3 style="font-family:'Playfair Display',serif;font-size:15px;font-weight:700;color:#1B3B5F;margin-bottom:8px;">Precisa de ajuda?</h3>
      <p style="font-size:12px;color:#9CA3AF;line-height:1.6;font-family:'Inter',sans-serif;">
        Entre em contato: <a href="mailto:${LINKS.email}" style="color:#D4AF37;text-decoration:none;font-weight:600;">${LINKS.email}</a>
      </p>
      <p style="margin-top:10px;font-size:11px;color:#D4AF37;font-weight:600;font-family:'Inter',sans-serif;">
        Use o mesmo e-mail da compra para acessar.
      </p>
    </div>
  `;
}

function buildQuote() {
  return `
    <div style="text-align:center;margin:32px 0;padding:24px 32px;border-left:3px solid #D4AF37;background:rgba(212,175,55,0.03);border-radius:0 8px 8px 0;">
      <p style="font-family:'Playfair Display',serif;font-size:16px;font-style:italic;color:#1B3B5F;line-height:1.5;">
        "Você não está travado por falta de fé — está travado por uma fé mal ensinada."
      </p>
      <p style="font-family:'Inter',sans-serif;font-size:11px;color:#9CA3AF;margin-top:8px;">— Rabino Marcos Barreto</p>
    </div>
  `;
}

function buildEixoCard(eixo, showTag = true) {
  return `
    <a href="${eixoLink(eixo.id)}" style="
      display:flex; align-items:center; gap:16px; padding:16px 20px;
      background:#FDFCF7; border:1px solid #F0EDE5; border-radius:12px;
      text-decoration:none; margin-bottom:10px; transition:none;
    ">
      <div style="
        width:44px; height:44px; border-radius:10px; display:flex; align-items:center; justify-content:center;
        font-family:'Playfair Display',serif; font-size:18px; font-weight:800; color:#fff;
        background:${eixo.color}; flex-shrink:0;
      ">${eixo.id}</div>
      <div style="flex:1;">
        <div style="font-size:11px;color:#9CA3AF;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;font-family:'Inter',sans-serif;">
          Eixo ${eixo.id}${eixo.id > 0 ? ' — ' + eixo.nome : ''}
        </div>
        <div style="font-family:'Playfair Display',serif;font-size:15px;font-weight:700;color:#1B3B5F;margin-top:2px;">
          ${eixo.titulo}
        </div>
        <div style="font-size:12px;color:#9CA3AF;margin-top:2px;font-family:'Inter',sans-serif;">${eixo.sub}</div>
      </div>
      ${showTag ? `<span style="
        font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;padding:4px 10px;
        border-radius:50px;white-space:nowrap;font-family:'Inter',sans-serif;
        ${eixo.id === 0 ? 'background:rgba(212,175,55,0.1);color:#D4AF37;' : 'background:rgba(16,185,129,0.1);color:#10B981;'}
      ">${eixo.id === 0 ? 'Bônus' : 'Liberado'}</span>` : ''}
      <span style="color:#D4AF37;font-size:18px;flex-shrink:0;">→</span>
    </a>
  `;
}

function buildInstructions() {
  return `
    <div style="background:#FDFCF7;border:1px solid #F0EDE5;border-radius:12px;padding:24px 28px;margin-bottom:32px;">
      <h3 style="font-family:'Playfair Display',serif;font-size:16px;font-weight:700;color:#1B3B5F;margin-bottom:16px;">📋 Como acessar</h3>
      <ol style="font-size:13px;color:#6B7280;line-height:1.8;padding-left:20px;font-family:'Inter',sans-serif;">
        <li><strong>Clique no link</strong> do eixo abaixo.</li>
        <li>Na página de leitura, <strong>informe o e-mail usado na compra</strong>.</li>
        <li>Siga a ordem dos eixos — cada um prepara o terreno para o próximo.</li>
        <li>Você tem <strong>acesso vitalício</strong>. Volte quantas vezes quiser.</li>
      </ol>
    </div>
  `;
}

function htmlWrapper(bodyContent) {
  return `<!DOCTYPE html><html lang="pt-BR"><head>
    <meta charset="UTF-8">
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
      * { margin:0; padding:0; box-sizing:border-box; }
      body { font-family:'Inter',sans-serif; background:#F5F1E8; color:#6B7280; line-height:1.6; }
      .container { max-width:640px; margin:0 auto; }
      a { color: inherit; }
      @media print {
        .no-break { break-inside:avoid; page-break-inside:avoid; }
        .page-break { break-after:always; page-break-after:always; }
      }
    </style>
  </head><body><div class="container">${bodyContent}</div></body></html>`;
}

// ═══════════════════════════════════════════
// GERAR PDF — Coleção Completa
// ═══════════════════════════════════════════
function buildColecaoCompleta() {
  const cover = buildCoverPage(
    'Sistema de Realinhamento<br><span style="color:#D4AF37;">do Herdeiro</span>',
    'Os Eixos do Herdeiro — Eixos 0 a 5<br>Leitura + Áudio + Ativação',
    '✦ Acesso Liberado'
  );

  const body = `
    <div style="background:#fff;padding:40px;">
      <div style="text-align:center;margin-bottom:32px;padding-bottom:28px;border-bottom:1px solid #F0EDE5;">
        <h2 style="font-family:'Playfair Display',serif;font-size:22px;font-weight:700;color:#1B3B5F;margin-bottom:12px;">
          Sua jornada começa agora.
        </h2>
        <p style="font-size:14px;color:#6B7280;max-width:460px;margin:0 auto;font-family:'Inter',sans-serif;">
          Parabéns por tomar essa decisão. Você tem acesso ao
          <strong style="color:#1B3B5F;">Sistema Completo de Realinhamento</strong> —
          6 Eixos progressivos que vão te reposicionar em clareza, direção e governo.
        </p>
      </div>

      ${buildInstructions()}

      <div style="margin-bottom:20px;">
        <p style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;color:#D4AF37;margin-bottom:4px;font-family:'Inter',sans-serif;">Seus Eixos</p>
        <p style="font-family:'Playfair Display',serif;font-size:17px;font-weight:700;color:#1B3B5F;">Acesse sua jornada completa</p>
      </div>

      ${EIXOS.map(e => buildEixoCard(e)).join('')}

      ${buildQuote()}
      ${buildSupport()}
    </div>
    ${buildEcossistema()}
  `;

  return htmlWrapper(cover + body);
}

// ═══════════════════════════════════════════
// GERAR PDF — Eixo Individual
// ═══════════════════════════════════════════
function buildEixoIndividual(eixo) {
  const cover = buildCoverPage(
    `Eixo ${eixo.id}<br><span style="color:${eixo.color};">${eixo.nome}</span>`,
    eixo.titulo + '<br><em style="font-size:13px;opacity:0.7;">' + eixo.sub + '</em>',
    eixo.tag
  );

  const body = `
    <div style="background:#fff;padding:40px;">
      <div style="text-align:center;margin-bottom:32px;padding-bottom:28px;border-bottom:1px solid #F0EDE5;">
        <h2 style="font-family:'Playfair Display',serif;font-size:22px;font-weight:700;color:#1B3B5F;margin-bottom:12px;">
          Seu acesso está liberado.
        </h2>
        <p style="font-size:14px;color:#6B7280;max-width:460px;margin:0 auto;font-family:'Inter',sans-serif;">
          Parabéns! Você adquiriu o <strong style="color:#1B3B5F;">Eixo ${eixo.id} — ${eixo.nome}</strong>.
          Clique no botão abaixo para acessar sua leitura.
        </p>
      </div>

      ${buildInstructions()}

      <div style="text-align:center;margin:32px 0;">
        <a href="${eixoLink(eixo.id)}" style="
          display:inline-block; background:linear-gradient(135deg,#D4AF37,#C49B2F); color:#1B3B5F;
          font-family:'Inter',sans-serif; font-size:16px; font-weight:700; text-transform:uppercase;
          letter-spacing:0.05em; padding:18px 48px; border-radius:10px; text-decoration:none;
        ">ACESSAR EIXO ${eixo.id} — ${eixo.nome.toUpperCase()} →</a>
      </div>

      <div style="margin:32px 0;">
        ${buildEixoCard(eixo, false)}
      </div>

      ${buildQuote()}
      ${buildSupport()}
    </div>
    ${buildEcossistema()}
  `;

  return htmlWrapper(cover + body);
}

// ═══════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════
(async () => {
  const browser = await chromium.launch();
  const outDir = path.join(__dirname, 'pdfs-entrega');
  const fs = require('fs');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const pdfOpts = {
    format: 'A4',
    printBackground: true,
    margin: { top: '0mm', right: '0mm', bottom: '0mm', left: '0mm' },
    scale: 0.82,
    preferCSSPageSize: false,
  };

  // 1) Coleção completa
  console.log('Gerando: Coleção Completa...');
  const page1 = await browser.newPage();
  await page1.setContent(buildColecaoCompleta(), { waitUntil: 'networkidle' });
  await page1.pdf({ ...pdfOpts, path: path.join(outDir, 'Entrega-Colecao-Eixos-Completa.pdf') });
  await page1.close();

  // 2) Eixos individuais
  for (const eixo of EIXOS) {
    console.log(`Gerando: Eixo ${eixo.id} — ${eixo.nome}...`);
    const page = await browser.newPage();
    await page.setContent(buildEixoIndividual(eixo), { waitUntil: 'networkidle' });
    await page.pdf({ ...pdfOpts, path: path.join(outDir, `Entrega-Eixo-${eixo.id}-${eixo.nome}.pdf`) });
    await page.close();
  }

  await browser.close();
  console.log(`\n✅ Todos os PDFs gerados em: ${outDir}`);
})();
