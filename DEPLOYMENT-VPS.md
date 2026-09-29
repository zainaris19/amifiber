# Panduan Deploy AMIFIBER ke VPS Pribadi

Website ini **100% standalone** — tidak ada koneksi ke server Emergent. Komponen: React (frontend statis) + FastAPI (backend) + MongoDB + Gmail SMTP (email). 

## 1. Ringkasan Audit Ketergantungan (hasil pemeriksaan)

| Komponen | Status | Keterangan |
|---|---|---|
| Frontend (React/CRA) | ✅ Standalone | Statis, di-build jadi folder `build/` |
| Backend (FastAPI) | ✅ Standalone | Python murni + SMTP stdlib |
| Database (MongoDB) | ✅ Standalone | Jalankan `mongod` di VPS Anda |
| Email (Gmail SMTP) | ✅ Standalone | Kirim langsung dari `noreplayamifiber@gmail.com` via `smtp.gmail.com` |
| Favicon/logo/foto/video | ✅ Standalone | Semua file lokal di `public/` |
| Google Fonts | ☁️ Eksternal non-Emergent | Publik; opsional di-self-host |
| Peta MapLibre (demotiles) | ☁️ Eksternal non-Emergent | Tile publik gratis `demotiles.maplibre.org` |

Tidak ada telemetri, script, atau API Emergent tersisa (sudah dihapus dari `index.html` dan `server.py`, diverifikasi 0 referensi).

## 2. Siapkan VPS

```bash
# kebutuhan: Python 3.11+, Node 18+/yarn, MongoDB, Nginx
sudo apt update && sudo apt install -y python3-pip nodejs npm mongodb-org nginx
# (MongoDB: ikuti docs.mongodb.org untuk repo distro Anda)
```

## 3. Backend

```bash
cd backend
python3 -m venv venv && source venv/bin/activate
pip install -r requirements.txt
```

Isi `backend/.env` (JANGAN di-commit ke git):

```
MONGO_URL="mongodb://localhost:27017"
DB_NAME=amifiber
CORS_ORIGINS=https://www.domain-anda.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=noreplayamifiber@gmail.com
SMTP_PASS=app-password-16-karakter
EMAIL_FROM_NAME=AMIFIBER
CONTACT_EMAIL=sales@amifiber.com
```

Jalankan (systemd):

```ini
# /etc/systemd/system/amifiber-api.service
[Unit]
Description=AMIFIBER API
After=network.target mongod.service

[Service]
WorkingDirectory=/opt/amifiber/backend
ExecStart=/opt/amifiber/backend/venv/bin/uvicorn server:app --host 127.0.0.1 --port 8001
Restart=always
EnvironmentFile=/opt/amifiber/backend/.env

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl enable --now amifiber-api
curl http://127.0.0.1:8001/api/health   # harus {"status":"ok"}
```

## 4. Frontend (build di VPS)

PENTING: `REACT_APP_BACKEND_URL` ditanam saat build — set dulu, baru build:

```bash
cd frontend
echo "REACT_APP_BACKEND_URL=https://www.domain-anda.com" > .env
yarn install && yarn build       # hasil: frontend/build/
```

## 5. Nginx (satu domain: statis + API)

```nginx
server {
    listen 443 ssl http2;
    server_name www.domain-anda.com domain-anda.com;
    # ssl_certificate ... (certbot --nginx)

    root /opt/amifiber/frontend/build;
    index index.html;

    location /api/ {
        proxy_pass http://127.0.0.1:8001;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    location / {
        try_files $uri $uri/ /index.html;   # SPA fallback
    }
}
```

## 6. Catatan Penting

- **Gmail App Password**: siapkan 2-Step Verification aktif; app password tidak boleh dibagikan/commit. Gmail batasi ±500 email/hari — cukup untuk form kontak.
- **Reply-To**: email konfirmasi ke pengunjung di-set Reply-To `sales@amifiber.com` (dari `CONTACT_EMAIL`), jadi balasan pengunjung masuk ke sales.
- **Copy data**: database preview ini lokal di pod — untuk membawa data ke VPS: `mongodump`/`mongorestore` (koleksi `inquiries` dll).
- **Update konten**: semua copy/statistik ada di `frontend/src/data/` — edit lalu build ulang.
