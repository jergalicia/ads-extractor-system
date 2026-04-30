#!/bin/bash

# AdsExtractor - VPS SAFE Setup Script (Non-destructive)
echo "------------------------------------------------"
echo "🛡️ INICIANDO INSTALACIÓN SEGURA (MODO COMPATIBLE)"
echo "------------------------------------------------"

# 1. Update System Packages (Safe)
sudo apt update

# 2. Install Node.js 22 (If not present)
if ! command -v node &> /dev/null
then
    curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
    sudo apt install -y nodejs
fi

# 3. Install Git (If not present)
sudo apt install -y git

# 4. Clone Project in isolated folder
cd /root
if [ -d "app" ]; then
    echo "⚠️ Carpeta /root/app ya existe. Actualizando código..."
    cd app && git pull
else
    git clone https://github.com/jergalicia/ads-extractor-system.git app
    cd app
fi
cd backend

# 5. Install Dependencies
npm install

# 6. Install Playwright Browsers & Deps (Isolated)
npx playwright install chromium --with-deps

# 7. Setup Environment
echo "DB_HOST=127.0.0.1
DB_USER=u294757052_extra
DB_PASSWORD=Galicia2026*
DB_NAME=u294757052_extra
PORT=3000" > .env

# 8. Install PM2 (Process Manager)
sudo npm install -g pm2

# 9. Start Application on Port 3000
pm2 stop all || true
pm2 start app.js --name "ads-extractor"
pm2 save

echo "------------------------------------------------"
echo "✅ INSTALACIÓN SEGURA COMPLETADA"
echo "🚀 Tu extractor está activo en: http://89.116.170.62:3000"
echo "ℹ️  No se ha tocado Docker ni Traefik."
echo "------------------------------------------------"
