import { WalletClaimArtwork } from "types/artwork";
import { getDb } from "models/db";
import { QueryResult } from "pg";

export async function findWalletClaimByAddressAndArtworkId(params: {walletAddress: string, artworkId: number}): Promise<WalletClaimArtwork[] | undefined> {
  const db = await getDb();
  const {walletAddress, artworkId} = params;
  const query = `
    SELECT id, user_id, artwork_id, wallet_address, total_visit, visitor, rewards, created_at
    FROM wallet_claim_artworks
    WHERE wallet_address = $1 AND artwork_id = $2
  `;

  try {
    const { rows } = await db.query(query, [walletAddress, artworkId]);
    console.log(rows)
    if (rows?.length === 0) {
      return undefined;
    }
    return rows[0];
  } catch (error) {
    console.error('Error finding wallet claim:', error);
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
    console.error('Error counting artwork claims:', error);
    throw error;
  }
}
