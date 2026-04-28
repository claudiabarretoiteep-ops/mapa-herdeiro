const QRCode = require('qrcode');
const path = require('path');
const fs = require('fs');

async function generateQr(slug) {
    const url = `https://mapadaherdeiro.com.br/#/eixo/${slug}`;
    const saveDir = 'c:\\Users\\Claudia\\Documents\\.gemini\\antigravity\\scratch\\crm-projeto\\frontend-landing\\public\\assets\\images\\eixo\\qrcodes';

    // Use relative path for more flexibility if needed, but keeping absolute for now
    const savePath = path.join('c:\\Users\\Claudia\\.gemini\\antigravity\\scratch\\crm-projeto\\frontend-landing\\public\\assets\\images\\eixo\\qrcodes', `qr_${slug}.png`);

    try {
        if (!fs.existsSync(path.dirname(savePath))) {
            fs.mkdirSync(path.dirname(savePath), { recursive: true });
        }

        await QRCode.toFile(savePath, url, {
            color: {
                dark: '#1B3B5F',
                light: '#FFFFFF'
            },
            width: 500,
            margin: 2
        });
        console.log(`QRCode gerado em: ${savePath}`);
    } catch (err) {
        console.error('Erro ao gerar QRCode:', err);
    }
}

const slug = process.argv[2];
if (!slug) {
    console.log("Uso: node generate_qr.js <slug>");
    process.exit(1);
}

generateQr(slug);
