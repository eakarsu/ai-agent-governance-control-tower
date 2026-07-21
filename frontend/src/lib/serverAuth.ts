import crypto from 'node:crypto';
import { ensurePostgres } from '@/lib/postgres';
import type { SessionUser } from '@/lib/auth';

const SESSION_HOURS = 8;

type UserRow = {
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
  role: SessionUser['role'];
};

function toSessionUser(row: Omit<UserRow, 'password_hash'>): SessionUser {
  return { email: row.email, firstName: row.first_name, lastName: row.last_name, role: row.role };
}

async function verifyPassword(password: string, encoded: string) {
  const [algorithm, n, r, p, saltText, hashText] = encoded.split('$');
  if (algorithm !== 'scrypt' || !n || !r || !p || !saltText || !hashText) return false;
  const expected = Buffer.from(hashText, 'base64');
  if (expected.length !== 32) return false;
  const actual = await new Promise<Buffer>((resolve, reject) => {
    crypto.scrypt(password, Buffer.from(saltText, 'base64'), expected.length, {
      N: Number(n), r: Number(r), p: Number(p), maxmem: 64 * 1024 * 1024,
    }, (error, derivedKey) => error ? reject(error) : resolve(derivedKey));
  });
  return crypto.timingSafeEqual(actual, expected);
}

export async function authenticateUser(email: string, password: string): Promise<SessionUser | null> {
  if (!email || !password) return null;
  const pool = await ensurePostgres();
  const { rows } = await pool.query<UserRow>(
    `SELECT email,password_hash,first_name,last_name,role
       FROM governance_app_users WHERE email=$1 AND status='active'`,
    [email.trim().toLowerCase()],
  );
  const row = rows[0];
  if (!row || !(await verifyPassword(password, row.password_hash))) return null;
  return toSessionUser(row);
}

export async function createSession(user: SessionUser) {
  const token = crypto.randomBytes(32).toString('base64url');
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
  const pool = await ensurePostgres();
  await pool.query('DELETE FROM governance_app_sessions WHERE expires_at <= NOW()');
  await pool.query(
    `INSERT INTO governance_app_sessions(token_hash,user_email,expires_at)
     VALUES($1,$2,NOW()+($3 * INTERVAL '1 hour'))`,
    [tokenHash, user.email, SESSION_HOURS],
  );
  return token;
}

export async function getSessionUser(token?: string | null): Promise<SessionUser | null> {
  if (!token) return null;
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
  const pool = await ensurePostgres();
  const { rows } = await pool.query<Omit<UserRow, 'password_hash'>>(
    `UPDATE governance_app_sessions AS s SET last_seen_at=NOW()
       FROM governance_app_users AS u
      WHERE s.token_hash=$1 AND s.user_email=u.email
        AND s.expires_at>NOW() AND u.status='active'
      RETURNING u.email,u.first_name,u.last_name,u.role`,
    [tokenHash],
  );
  return rows[0] ? toSessionUser(rows[0]) : null;
}

export async function destroySession(token?: string | null) {
  if (!token) return;
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
  const pool = await ensurePostgres();
  await pool.query('DELETE FROM governance_app_sessions WHERE token_hash=$1', [tokenHash]);
}
