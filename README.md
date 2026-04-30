# AdsExtractor - Sistema Inteligente de Extracción de Leads

Este sistema permite buscar empresas que hacen publicidad en Facebook e Instagram, extraer su información de contacto y clasificar su potencial comercial.

## Estructura del Proyecto

- `backend/`: API construida con Node.js, Express y Playwright.
- `frontend/`: Dashboard moderno construido con React, Vite y Tailwind (Vanilla CSS Custom).

## Requisitos

- Node.js v16+
- MySQL
- Google Chrome/Chromium (para Playwright)

## Instalación

1. **Base de Datos**:
   - Crea una base de datos llamada `ads_system`.
   - Ejecuta el script SQL en `backend/database/schema.sql`.

2. **Backend**:
   ```bash
   cd backend
   npm install
   npx playwright install chromium
   ```
   - Configura el archivo `.env` con tus credenciales de MySQL.

3. **Frontend**:
   ```bash
   cd frontend
   npm install
   ```

## Ejecución

1. **Backend**:
   ```bash
   cd backend
   npm run dev
   ```

2. **Frontend**:
   ```bash
   cd frontend
   npm run dev
   ```

## Funcionalidades Implementadas

- ✅ Buscador por keyword y país.
- ✅ Extracción automatizada con Playwright.
- ✅ Dashboard de métricas con Glassmorphism.
- ✅ Almacenamiento en MySQL.
- ✅ Exportación a Excel y CSV.
- ✅ Cron Jobs para extracción periódica.

## Despliegue en Hostinger

1. Sube el código a un repositorio de GitHub.
2. En Hostinger, conecta el repositorio mediante "Git Deployment".
3. Configura las variables de entorno en el panel de Hostinger.
4. Asegúrate de que los puertos coincidan.
5. Configura el Cron Job en el hPanel apuntando a `node backend/cron/extractorJob.js`.
