const QRCode = require('qrcode');
const path = require('path');
const fs = require('fs');

async function generateTestQr(slug, ip) {
    const url = `http://${ip}:3000/#/eixo/${slug}`;
    const savePath = path.join('c:\\Users\\Claudia\\Documents\\.gemini\\antigravity\\scratch\\crm-projeto\\frontend-landing\\public\\assets\\images\\eixo\\qrcodes', `test_qr_${slug}.png`);

    try {
        if (!fs.existsSync(path.dirname(savePath))) {
            fs.mkdirSync(path.dirname(savePath), { recursive: true });
        }

        await QRCode.toFile(savePath, url, {
            color: {
                dark: '#FB923C', // Cor laranja para diferenciar que é TESTE
                light: '#FFFFFF'
            },
            width: 500,
            margin: 2
        });
        console.log(`QRCode de TESTE gerado em: ${savePath}`);
    } catch (err) {
        console.error('Erro ao gerar QRCode de teste:', err);
    }
}

const slug = process.argv[2];
const ip = process.argv[3] || '192.168.0.104';

if (!slug) {
    console.log("Uso: node generate_test_qr.cjs <slug> <ip>");
    process.exit(1);
}

generateTestQr(slug, ip);
