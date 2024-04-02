import { User } from "types/user";
import { getDb } from "models/db";

export async function insertUser(user: User) {
  const createdAt: string = new Date().toISOString();

  const db = await getDb();
  const res = await db.query(
    `INSERT INTO users 
      (wallet_address, wallet_type, created_at)
      VALUES 
      ($1, $2, $3)
  `,
    [user.wallet_address, user.wallet_type, createdAt]
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
    created_at: row.created_at,
  };

  return user;
}
