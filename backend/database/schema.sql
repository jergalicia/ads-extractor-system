CREATE DATABASE IF NOT EXISTS ads_system;
USE ads_system;

CREATE TABLE IF NOT EXISTS companies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_name VARCHAR(255),
    keyword_search VARCHAR(255),
    country VARCHAR(100),
    city VARCHAR(100),
    industry VARCHAR(255),
    facebook_url TEXT,
    instagram_url TEXT,
    website_url TEXT,
    email VARCHAR(255),
    phone VARCHAR(100),
    whatsapp VARCHAR(100),
    ads_status VARCHAR(50),
    ads_count INT DEFAULT 0,
    first_ad_date DATETIME,
    last_ad_date DATETIME,
    followers INT DEFAULT 0,
    opportunity_score INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_id INT,
    ad_type VARCHAR(100),
    ad_text LONGTEXT,
    ad_image TEXT,
    ad_video TEXT,
    cta VARCHAR(100),
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
    total_companies INT,
    total_ads INT,
    status VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
