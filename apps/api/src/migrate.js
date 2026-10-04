import { query } from './db.js';

const TABLES = [
  `CREATE TABLE IF NOT EXISTS schema_migrations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(191) NOT NULL UNIQUE,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

  `CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(191) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(191) DEFAULT 'Admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

  `CREATE TABLE IF NOT EXISTS site_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(191) NOT NULL UNIQUE,
    setting_value LONGTEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

  `CREATE TABLE IF NOT EXISTS pages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(191) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    seo_title VARCHAR(255),
    seo_description TEXT,
    hero_eyebrow VARCHAR(255),
    hero_title VARCHAR(500),
    hero_subtitle TEXT,
    hero_cta_primary VARCHAR(191),
    hero_cta_secondary VARCHAR(191),
    published TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

  `CREATE TABLE IF NOT EXISTS page_sections (
    id INT AUTO_INCREMENT PRIMARY KEY,
    page_id INT NOT NULL,
    section_key VARCHAR(191) NOT NULL,
    content JSON,
    sort_order INT DEFAULT 0,
    UNIQUE KEY uniq_page_section (page_id, section_key),
    CONSTRAINT fk_page_sections_page FOREIGN KEY (page_id) REFERENCES pages(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

  `CREATE TABLE IF NOT EXISTS services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(191) NOT NULL UNIQUE,
    category VARCHAR(128) DEFAULT 'AI Data Services',
    excerpt TEXT,
    description LONGTEXT,
    body JSON,
    icon VARCHAR(64) DEFAULT 'sparkles',
    image_url VARCHAR(500),
    image_label VARCHAR(255),
    tags JSON,
    featured TINYINT(1) DEFAULT 0,
    sort_order INT DEFAULT 0,
    published TINYINT(1) DEFAULT 1,
    seo_title VARCHAR(255),
    seo_description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

  `CREATE TABLE IF NOT EXISTS process_steps (
    id INT AUTO_INCREMENT PRIMARY KEY,
    group_key VARCHAR(64) NOT NULL,
    step_number INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    body TEXT,
    sort_order INT DEFAULT 0,
    INDEX idx_process_group (group_key)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

  `CREATE TABLE IF NOT EXISTS stats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    value VARCHAR(64) NOT NULL,
    label VARCHAR(255) NOT NULL,
    subtext VARCHAR(255),
    sort_order INT DEFAULT 0
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

  `CREATE TABLE IF NOT EXISTS testimonials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    quote TEXT NOT NULL,
    name VARCHAR(191) NOT NULL,
    role VARCHAR(191),
    rating DECIMAL(2,1) DEFAULT 5.0,
    sort_order INT DEFAULT 0,
    published TINYINT(1) DEFAULT 1
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

  `CREATE TABLE IF NOT EXISTS faqs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question VARCHAR(500) NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(128) DEFAULT 'General',
    sort_order INT DEFAULT 0,
    published TINYINT(1) DEFAULT 1
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

  `CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(191) NOT NULL UNIQUE,
    category VARCHAR(128) DEFAULT 'Insights',
    excerpt TEXT,
    content LONGTEXT,
    author VARCHAR(191) DEFAULT 'Dhvani.ai Team',
    cover_url VARCHAR(500),
    cover_label VARCHAR(255),
    read_minutes INT DEFAULT 5,
    tags JSON,
    published TINYINT(1) DEFAULT 1,
    published_at DATE,
    seo_title VARCHAR(255),
    seo_description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

  `CREATE TABLE IF NOT EXISTS leads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(64) NOT NULL DEFAULT 'contact',
    name VARCHAR(191),
    email VARCHAR(191),
    phone VARCHAR(64),
    company VARCHAR(191),
    country VARCHAR(128),
    city VARCHAR(128),
    subject VARCHAR(255),
    message TEXT,
    meta JSON,
    status VARCHAR(64) DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_leads_type (type)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

  `CREATE TABLE IF NOT EXISTS lead_files (
    id INT AUTO_INCREMENT PRIMARY KEY,
    lead_id INT NOT NULL,
    field VARCHAR(64) NOT NULL,
    filename VARCHAR(255) NOT NULL,
    mime VARCHAR(128),
    size INT DEFAULT 0,
    data LONGBLOB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_lead_files_lead FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,
];

export const ALL_TABLES = [
  'lead_files',
  'leads',
  'posts',
  'faqs',
  'testimonials',
  'stats',
  'process_steps',
  'services',
  'page_sections',
  'pages',
  'site_settings',
  'admins',
  'schema_migrations',
];

export async function ensureSchema() {
  for (const sql of TABLES) {
    await query(sql);
  }
  console.log('✓ Database schema ready');
}
