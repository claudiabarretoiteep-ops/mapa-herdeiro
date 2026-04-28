const fs = require('fs');
const path = require('path');

const BASE_PATH = 'c:\\Users\\Claudia\\.gemini\\antigravity\\scratch\\crm-projeto\\frontend-landing';
const DATA_FILE = path.join(BASE_PATH, 'src', 'data', 'eixo.json');

function updateJson(slug, title, subtitle, description, fullBookAudio = null) {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));

    const existingIndex = data.sessions.findIndex(s => s.slug === slug);
    if (existingIndex !== -1) {
        console.log(`Sessão com slug '${slug}' já existe. Atualizando...`);
        data.sessions[existingIndex] = {
            ...data.sessions[existingIndex],
            title,
            subtitle,
            description,
            fullBookAudio: fullBookAudio ? `/audio/eixo/${slug}-full.mp3` : data.sessions[existingIndex].fullBookAudio
        };
    } else {
        const newSession = {
            slug,
            title,
            subtitle,
            alignmentAudio: `/audio/eixo/${slug}.mp3`,
            fullBookAudio: fullBookAudio ? `/audio/eixo/${slug}-full.mp3` : null,
            description,
            coverUrl: "/assets/images/eixo/cover.png"
        };
        data.sessions.push(newSession);
    }

    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 4), 'utf8');
}

const [, , slug, title, subtitle, description, fullBookAudio] = process.argv;

if (!slug || !title || !subtitle || !description) {
    console.log("Uso: node create_audiolivro.js <slug> <title> <subtitle> <description> [caminho_audio_completo]");
    process.exit(1);
}

updateJson(slug, title, subtitle, description, fullBookAudio);
console.log(`Sucesso! Recurso '${slug}' configurado no sistema.`);
