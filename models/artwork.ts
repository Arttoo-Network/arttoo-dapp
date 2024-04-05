import { Artwork } from "types/artwork";
import { getDb } from "models/db";
import { QueryResult } from "pg";

export async function insertArtwork(artwork: Artwork): Promise<QueryResult<any>> {
  const createdAt = new Date().toISOString();
  const db = await getDb();

  const query = `
    INSERT INTO artworks (
      name, image, image_width, image_height, description, token, author, author_avatar, longitude, latitude, address, created_at
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12
    ) RETURNING id
  `;

  const values: any = [
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
  ];

  try {
    const result = await db.query(query, values);
    return result;
  } catch (error) {
    console.error('Error inserting artwork:', error);
    throw error;
  }
}

export async function getArtworks(): Promise<Artwork[]> {
  const db = await getDb();

  const query = `
    SELECT id, name, image, image_width, image_height, description, token, author, author_avatar, longitude, latitude, address, created_at
    FROM artworks
    ORDER BY created_at DESC
  `;

  try {
    const { rows } = await db.query(query);
    return rows;
  } catch (error) {
    console.error('Error getting artworks:', error);
    throw error;
  }
}

export async function findArtworkById(id: number): Promise<Artwork | undefined> {
  const db = await getDb();
  const query = `
    SELECT name, image, image_width, image_height, description, token, author, author_avatar, longitude, latitude, address, created_at
    FROM artworks
    WHERE id = $1
  `;

  const { rows } = await db.query(query, [id]);

  if (rows.length === 0) {
    return undefined;
  }

  const {
    name,
    image,
    image_width,
    image_height,
    description,
    token,
    author,
    author_avatar,
    longitude,
    latitude,
    address,
    created_at,
  } = rows[0];

  return {
    name,
    image,
    image_width,
    image_height,
    description,
    token,
    author,
    author_avatar,
    longitude,
    latitude,
    address,
    created_at,
  };
}

export async function updateArtwork(artwork: Partial<Artwork>) {
  const db = await getDb();

  if (!artwork.id) {
    throw new Error("Artwork id is required");
  }

  const keys = Object.keys(artwork) as (keyof Artwork)[];
  const setClause = keys
    .filter((key) => key !== "id")
    .map((key, index) => `${key} = $${index + 1}`)
    .join(", ");

  const values: any = keys
    .filter((key) => key !== "id")
    .map((key) => artwork[key]);

  const query = `
    UPDATE artworks
    SET ${setClause}
    WHERE id = $${values.length + 1}
  `;

  values.push(artwork.id);

  const res = await db.query(query, values);
  return res;
}

export async function deleteArtwork(id: number): Promise<void> {
  const db = await getDb();
  const query = `
    DELETE FROM artworks
    WHERE id = $1
  `;

  try {
    await db.query(query, [id]);
  } catch (error) {
    console.error('Error deleting artwork:', error);
    throw error;
  }
}
