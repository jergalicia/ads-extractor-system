#!/bin/bash

# AdsExtractor - VPS COMPLETE Setup Script (With Local Database)
echo "------------------------------------------------"
echo "🚀 INICIANDO INSTALACIÓN COMPLETA + BASE DE DATOS"
echo "------------------------------------------------"

# 1. Update System
sudo apt update

# 2. Install MySQL Server (Silent)
sudo apt install -y mysql-server
sudo systemctl start mysql

# 3. Setup Database and User
echo "🛠️ Configurando Base de Datos Local..."
sudo mysql -e "CREATE DATABASE IF NOT EXISTS ads_extractor;"
sudo mysql -e "CREATE USER IF NOT EXISTS 'admin_extractor'@'localhost' IDENTIFIED BY 'Extractor2026*';"
sudo mysql -e "GRANT ALL PRIVILEGES ON ads_extractor.* TO 'admin_extractor'@'localhost';"
sudo mysql -e "FLUSH PRIVILEGES;"

# 4. Initialize Tables
cd /root/app || cd /root
curl -sL https://raw.githubusercontent.com/jergalicia/ads-extractor-system/main/database_schema.sql > schema.sql
sudo mysql ads_extractor < schema.sql

# 5. Install Node.js 22 (If not present)
if ! command -v node &> /dev/null
then
    curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
    sudo apt install -y nodejs
fi

# 6. Setup/Update Project
cd /root
if [ -d "app" ]; then
    cd app && git pull
else
    git clone https://github.com/jergalicia/ads-extractor-system.git app
    cd app
fi
cd backend

# 7. Install Dependencies
npm install
npx playwright install chromium --with-deps

# 8. Setup Environment (Pointing to LOCAL database)
echo "DB_HOST=127.0.0.1
DB_USER=admin_extractor
DB_PASSWORD=Extractor2026*
DB_NAME=ads_extractor
PORT=3000" > .env

# 9. Launch with PM2
sudo npm install -g pm2
pm2 stop all || true
pm2 start app.js --name "ads-extractor"
pm2 save

echo "------------------------------------------------"
echo "✅ TODO LISTO Y CONECTADO"
echo "🌐 Accede aquí: http://89.116.170.62:3000"
echo "🔥 El buscador ahora usa su propia base de datos local."
echo "------------------------------------------------"
