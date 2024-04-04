import {
  WalletClaimArtwork,
  WalletClaimArtworkWithDetails,
} from "types/artwork";
import { getDb } from "models/db";
import { QueryResult } from "pg";

export async function findWalletClaimByAddressAndArtworkId(params: {
  walletAddress: string;
  artworkId: number;
}): Promise<WalletClaimArtwork[] | undefined> {
  const db = await getDb();
  const { walletAddress, artworkId } = params;
  const query = `
    SELECT id, user_id, artwork_id, wallet_address, total_visit, visitor, rewards, created_at
    FROM wallet_claim_artworks
    WHERE wallet_address = $1 AND artwork_id = $2
  `;

  try {
    const { rows } = await db.query(query, [walletAddress, artworkId]);
    console.log(rows);
    if (rows?.length === 0) {
      return undefined;
    }
    return rows[0];
  } catch (error) {
    console.error("Error finding wallet claim:", error);
    throw error;
  }
}

export async function countArtworkClaims(artworkId: number): Promise<number> {
  const db = await getDb();
  const query = `
    SELECT COUNT(*)
    FROM wallet_claim_artworks
    WHERE artwork_id = $1
  `;

  try {
    const { rows } = await db.query(query, [artworkId]);
    return parseInt(rows[0].count, 10);
  } catch (error) {
    console.error("Error counting artwork claims:", error);
    throw error;
  }
}

export async function getArtworksForAddress(
  walletAddress: string
): Promise<WalletClaimArtworkWithDetails[]> {
  const db = await getDb();
  const query = `
    SELECT wca.id, wca.user_id, wca.artwork_id, wca.wallet_address, wca.visitor, wca.rewards, wca.created_at,
           aw.id AS artwork_id, aw.name AS artwork_name, aw.image AS artwork_image, aw.image_width AS artwork_image_width, aw.image_height AS artwork_image_height,
           aw.description AS artwork_description, aw.token AS artwork_token, aw.author AS artwork_author, aw.author_avatar AS artwork_author_avatar,
           aw.longitude AS artwork_longitude, aw.latitude AS artwork_latitude, aw.address AS artwork_address, aw.created_at AS artwork_created_at
    FROM wallet_claim_artworks AS wca
    LEFT JOIN artworks AS aw ON wca.artwork_id = aw.id
    WHERE wca.wallet_address = $1
  `;

  try {
    const { rows } = await db.query(query, [walletAddress]);
    console.log()
    return rows.map((row) => ({
      id: row.id,
      user_id: row.user_id,
      artwork_id: row.artwork_id,
      wallet_address: row.wallet_address,
      rewards: row.rewards,
      artwork_image: row.artwork_image,
      artwork_token: row.artwork_token,
      artwork_author: row.artwork_author,
      image_width: row.artwork_image_width,
      image_height: row.artwork_image_height,
      longitude: row.artwork_longitude,
      latitude: row.artwork_latitude,
      artwork_name: row.artwork_name,
      description: row.artwork_description,
    }));
  } catch (error) {
    console.error("Error getting artworks for address:", error);
    throw error;
  }
}
