import qrcode
import sys
import os

def generate_qr(slug):
    url = f"https://mapadaherdeiro.com.br/#/eixo/{slug}"
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=10,
        border=4,
    )
    qr.add_data(url)
    qr.make(fit=True)

    img = qr.make_image(fill_color="#1B3B5F", back_color="white")
    
    save_path = f"c:\\Users\\Claudia\\.gemini\\antigravity\\scratch\\crm-projeto\\frontend-landing\\public\\assets\\images\\eixo\\qrcodes\\qr_{slug}.png"
    os.makedirs(os.path.dirname(save_path), exist_ok=True)
    img.save(save_path)
    print(f"QRCode gerado em: {save_path}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Uso: python generate_qr.py <slug>")
    else:
        generate_qr(sys.argv[1])
