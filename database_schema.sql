CREATE DATABASE IF NOT EXISTS ads_extractor;
USE ads_extractor;

CREATE TABLE IF NOT EXISTS companies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    keyword_search VARCHAR(255),
    country VARCHAR(100),
    facebook_url TEXT,
    website_url TEXT,
    email VARCHAR(255),
    phone VARCHAR(100),
    whatsapp VARCHAR(100),
    instagram_url TEXT,
    ads_status ENUM('active', 'inactive', 'all') DEFAULT 'active',
    ads_count INT DEFAULT 0,
    opportunity_score INT DEFAULT 0,
    last_ad_date DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_id INT,
    ad_type VARCHAR(100),
    ad_text TEXT,
    ad_image TEXT,
    ad_video TEXT,
    platform VARCHAR(100),
    ad_status VARCHAR(50),
    ad_date DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS extraction_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    keyword_search VARCHAR(255),
    country VARCHAR(100),
    status ENUM('processing', 'completed', 'failed') DEFAULT 'processing',
    total_companies INT DEFAULT 0,
    total_ads INT DEFAULT 0,
    error_message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
