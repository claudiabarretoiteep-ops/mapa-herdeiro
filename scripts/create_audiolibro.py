import json
import os
import sys

# Definir os caminhos base
BASE_PATH = r"c:\Users\Claudia\.gemini\antigravity\scratch\crm-projeto\frontend-landing"
DATA_FILE = os.path.join(BASE_PATH, "src", "data", "eixo.json")
EBOOKS_FOLDER = os.path.join(BASE_PATH, "public", "ebooks")
AUDIO_FOLDER = os.path.join(BASE_PATH, "public", "audio", "eixo")
QR_FOLDER = os.path.join(BASE_PATH, "public", "assets", "images", "eixo", "qrcodes")

# Criar a pasta de QRCodes se não existir
os.makedirs(QR_FOLDER, exist_ok=True)

def update_json(slug, title, subtitle, description):
    with open(DATA_FILE, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Verificar se o slug já existe
    for session in data['sessions']:
        if session['slug'] == slug:
            print(f"Sessão com slug '{slug}' já existe. Atualizando...")
            session['title'] = title
            session['subtitle'] = subtitle
            session['description'] = description
            break
    else:
        new_session = {
            "slug": slug,
            "title": title,
            "subtitle": subtitle,
            "audioUrl": f"/audio/eixo/{slug}.mp3",
            "description": description,
            "coverUrl": "/assets/images/eixo/cover.png"
        }
        data['sessions'].append(new_session)
    
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4, ensure_ascii=False)

def main():
    if len(sys.argv) < 5:
        print("Uso: python create_audiolibro.py <slug> <title> <subtitle> <description>")
        return

    slug = sys.argv[1]
    title = sys.argv[2]
    subtitle = sys.argv[3]
    description = sys.argv[4]

    update_json(slug, title, subtitle, description)
    print(f"Sucesso! Recurso '{slug}' configurado no sistema.")
    print(f"Link: https://mapadaherdeiro.com.br/#/eixo/{slug}")

if __name__ == "__main__":
    main()
