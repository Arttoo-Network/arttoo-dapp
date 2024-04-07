import { User } from "types/user";
import { getDb } from "models/db";

export async function insertUser(user: User) {
  const createdAt: string = new Date().toISOString();

  const db = await getDb();
  const res = await db.query(
    `INSERT INTO users 
      (wallet_address, wallet_type, claimed_tokens, created_at)
      VALUES 
      ($1, $2, $3, $4)
  `,
    [user.wallet_address, user.wallet_type, user.claimed_tokens, createdAt] as any
  );

  return res;
}

export async function getUsers() {
  const db = await getDb();
  const res = await db.query(`SELECT * FROM users`);

  return res.rows;
}


export async function findUserByAddress(wallet_address: string) {
  const db = await getDb();
  const res = await db.query(`SELECT * FROM users WHERE wallet_address = $1`, [
    wallet_address,
  ]);

  if (res.rowCount === 0) {
    return undefined;
  }

  const { rows } = res;
  const row = rows[0];
  const user: User = {
    wallet_address: row.wallet_address,
    wallet_type: row.wallet_type,
    claimed_tokens: row.claimed_tokens,
    created_at: row.created_at,
  };

  return user;
}

export async function updateUserClaimedToken(user: Partial<User>) {
  const db = await getDb();

  if (!user.wallet_address) {
    throw new Error("wallet_address is required");
  }

  if (!user.claimed_tokens) {
    throw new Error("claimed_tokens is required");
  }

  const res = await db.query(
    `UPDATE users SET claimed_tokens = $1 WHERE wallet_address = $2`,
    [user.claimed_tokens, user.wallet_address] as any
  );

  return res;
}
