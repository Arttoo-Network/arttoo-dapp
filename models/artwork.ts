import { Artwork } from "types/artwork";
import { getDb } from "models/db";
import exp from "constants";

export async function insertArtwork(artwork: Artwork) {
  const createdAt: string = new Date().toISOString();

  const db = await getDb();
  const res = await db.query(
    `INSERT INTO artworks 
      (name, image, image_width, image_height, description, token, author, author_avatar, longitude, latitude, address, created_at)
      VALUES 
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
  `,
    [
      artwork.name,
      artwork.image,
      artwork.image_width,
      artwork.image_height,
      artwork.description,
      artwork.token,
      artwork.author,
      artwork.author_avatar,
      artwork.longitude,
      artwork.latitude,
      artwork.address,
      createdAt,
    ]
  );

  return res;
}

export async function getArtworks() {
  const db = await getDb();
  const res = await db.query(`SELECT * FROM artworks`);
  console.log('getArtworks', res.rows);
  return res.rows;
}

export async function findArtworkById(id: number) {
  const db = await getDb();
  const res = await db.query(`SELECT * FROM artworks WHERE id = $1`, [id]);

  if (res.rowCount === 0) {
    return undefined;
  }

  const { rows } = res;
  const row = rows[0];
  const artwork: Artwork = {
    name: row.name,
    image: row.image,
    image_width: row.image_width,
    image_height: row.image_height,
    description: row.description,
    token: row.token,
    author: row.author,
    author_avatar: row.author_avatar,
    longitude: row.longitude,
    latitude: row.latitude,
    address: row.address,
    created_at: row.created_at,
  };

  return artwork;
}

export async function updateArtwork(artwork: Artwork) {
  const db = await getDb();

  if (!artwork.id) {
    throw new Error("Artwork id is required");
  }


  const res = await db.query(
    `UPDATE artworks 
    SET name = $1, image = $2, image_width = $3, image_height = $4, description = $5, token = $6, author = $7, author_avatar = $8, longitude = $9, latitude = $10, address = $11
    WHERE id = $12
  `,
    [
      artwork.name,
      artwork.image,
      artwork.image_width,
      artwork.image_height,
      artwork.description,
      artwork.token,
      artwork.author,
      artwork.author_avatar,
      artwork.longitude,
      artwork.latitude,
      artwork.address,
      artwork.id,
    ]
  );

  return res;
}

export async function deleteArtwork(id: number) {
  const db = await getDb();
  const res = await db.query(`DELETE FROM artworks WHERE id = $1`, [id]);

  return res;
}
