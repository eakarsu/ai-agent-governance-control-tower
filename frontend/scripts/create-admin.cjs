'use strict';

const crypto = require('node:crypto');
const { Pool } = require('pg');

function hashPassword(password) {
  const salt = crypto.randomBytes(16);
  const derived = crypto.scryptSync(password, salt, 32, { N: 16384, r: 8, p: 1, maxmem: 64 * 1024 * 1024 });
  return `scrypt$16384$8$1$${salt.toString('base64')}$${derived.toString('base64')}`;
}

async function main() {
  if (process.env.BOOTSTRAP_ACKNOWLEDGEMENT !== 'create-initial-admin') {
    throw new Error('Refusing admin provisioning without BOOTSTRAP_ACKNOWLEDGEMENT=create-initial-admin');
  }
  const email = process.env.PROVISION_ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.PROVISION_ADMIN_PASSWORD;
  const fullName = process.env.PROVISION_ADMIN_NAME?.trim() || 'Initial Administrator';
  if (!process.env.DATABASE_URL || !email || !password || password.length < 12) {
    throw new Error('DATABASE_URL, PROVISION_ADMIN_EMAIL, and a password of at least 12 characters are required');
  }
  const splitAt = fullName.lastIndexOf(' ');
  const firstName = splitAt > 0 ? fullName.slice(0, splitAt) : fullName;
  const lastName = splitAt > 0 ? fullName.slice(splitAt + 1) : 'Administrator';
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  try {
    const existing = await pool.query('SELECT 1 FROM governance_app_users WHERE email=$1', [email]);
    if (existing.rowCount) throw new Error(`Refusing to overwrite existing account ${email}`);
    await pool.query(
      `INSERT INTO governance_app_users(email,password_hash,first_name,last_name,role)
       VALUES($1,$2,$3,$4,'admin')`,
      [email, hashPassword(password), firstName, lastName],
    );
    console.log(`Provisioned initial administrator ${email}`);
  } finally {
    await pool.end();
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
