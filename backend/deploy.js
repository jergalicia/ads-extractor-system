const ftp = require("basic-ftp");
const path = require("path");

async function deploy() {
    const client = new ftp.Client();
    client.ftp.verbose = true;
    try {
        await client.access({
            host: "82.197.88.239",
            user: "u294757052.ex.agencianitro.com",
            password: "Galicia2026*",
            port: 21,
            secure: false
        });

        console.log("Connected to FTP");

        // Upload backend files
        // We exclude node_modules because they should be installed on the server
        const backendFiles = [
            "app.js",
            "package.json",
            ".env",
            "routes",
            "controllers",
            "services",
            "extractors",
            "cron",
            "database"
        ];

        for (const file of backendFiles) {
            const localPath = path.join(__dirname, file);
            const remotePath = `/public_html/backend/${file}`;
            
            console.log(`Uploading ${file}...`);
            await client.ensureDir("/public_html/backend");
            if (file.includes(".") || file === ".env") {
                await client.uploadFrom(localPath, remotePath);
            } else {
                await client.uploadFromDir(localPath, remotePath);
            }
        }

        // Upload frontend dist
        console.log("Uploading frontend dist...");
        await client.ensureDir("/public_html/dist");
        await client.uploadFromDir(path.join(__dirname, "../frontend/dist"), "/public_html/dist");

        console.log("Deployment completed successfully!");
    } catch (err) {
        console.error("Deployment failed:", err);
    } finally {
        client.close();
    }
}

deploy();
