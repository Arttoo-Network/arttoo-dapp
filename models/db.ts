import { Pool } from "pg";

let globalPool: Pool;

// SQL 语句，创建表
const createTables = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    wallet_address VARCHAR(255),
    wallet_type VARCHAR(255),
    created_at timestamptz
  );

  CREATE TABLE IF NOT EXISTS artworks (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    image VARCHAR(255),
    image_width INT,
    image_height INT,
    description TEXT,
    token INT,
    author VARCHAR(255),
    author_avatar VARCHAR(255),
    longitude FLOAT,
    latitude FLOAT,
    address VARCHAR(255),
    created_at timestamptz
  );
`;

export function getDb() {
  if (!globalPool) {
    const connectionString = process.env.POSTGRES_URL;
    console.log("connectionString", connectionString);

    globalPool = new Pool({
      connectionString,
    });

    globalPool.query(createTables).then(() => {
      console.log("Tables created successfully!");
    });
  }

  return globalPool;
}
