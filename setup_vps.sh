#!/bin/bash

# AdsExtractor - VPS Master Setup Script (Ubuntu 24.04)
echo "------------------------------------------------"
echo "🚀 INICIANDO INSTALACIÓN DE ADSEXTRACTOR"
echo "------------------------------------------------"

# 1. Update System
sudo apt update && sudo apt upgrade -y

# 2. Install Node.js 22
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs

# 3. Install Git
sudo apt install -y git

# 4. Clone Project
cd /root
git clone https://github.com/jergalicia/ads-extractor-system.git app
cd app/backend

# 5. Install Dependencies
npm install

# 6. Install Playwright Browsers & Deps
npx playwright install chromium --with-deps

# 7. Setup Environment
echo "DB_HOST=127.0.0.1
DB_USER=u294757052_extra
DB_PASSWORD=Galicia2026*
DB_NAME=u294757052_extra
PORT=3000" > .env

# 8. Install PM2 for process management
sudo npm install -g pm2

# 9. Start Application
pm2 start app.js --name "ads-extractor"
pm2 save
pm2 startup

# 10. Install Nginx (Optional but recommended)
sudo apt install -y nginx
echo "server {
    listen 80;
    server_name 89.116.170.62;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}" > /etc/nginx/sites-available/default
sudo systemctl restart nginx

echo "------------------------------------------------"
echo "✅ INSTALACIÓN COMPLETADA EXITOSAMENTE"
echo "🌐 Tu plataforma está viva en: http://89.116.170.62"
echo "------------------------------------------------"
