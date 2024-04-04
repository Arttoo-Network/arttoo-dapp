import { WalletClaimArtwork, ClaimRequest } from "types/artwork";
import { getDb } from "models/db";
import { QueryResult } from "pg";

export async function claimArtwork(claim: ClaimRequest): Promise<QueryResult<any>> {
  const db = await getDb();
  const { wallet_address, artwork_id } = claim;

  // 检查是否已经领取过该艺术藏品
  const existingClaim = await db.query(
    `SELECT * FROM wallet_claim_artworks WHERE wallet_address = $1 AND artwork_id = $2`,
    [wallet_address, artwork_id]
  );
  if (existingClaim.rowCount) {
    throw new Error("You have already claimed this artwork");
  }

  // 获取当前艺术藏品信息
  const artworkData = await db.query(`SELECT * FROM artworks WHERE id = $1`, [artwork_id]);
  console.log('sss', artwork_id)
  const { token: rewards } = artworkData.rows[0];

  // 获取当前艺术藏品的领取者数量和排名
  const claimsData = await db.query(
    `SELECT id, rewards FROM wallet_claim_artworks WHERE artwork_id = $1 ORDER BY created_at DESC`,
    [artwork_id]
  );
  
  if (claimsData.rowCount) {
    // 为最后五个领取者增加奖励
    const lastFiveVisitors = claimsData.rows.slice(0, 5);
    lastFiveVisitors.forEach((visitor, index) => {
      const bonus = rewards * [0.1, 0.08, 0.06, 0.04, 0.02][index];
      visitor.rewards += bonus;
      db.query(`UPDATE wallet_claim_artworks SET rewards = $1 WHERE id = $2`, [
        visitor.rewards,
        visitor.id,
      ]);
    });
  }

  const visitor = (claimsData.rowCount || 0) + 1;

  // 插入新的领取记录
  const createdAt = new Date().toISOString();
  const res = await db.query(
    `INSERT INTO wallet_claim_artworks (wallet_address, artwork_id, rewards, visitor, created_at) VALUES ($1, $2, $3, $4, $5)`,
    [wallet_address, artwork_id, rewards, visitor, createdAt]
  );
  
  return res;
}


export async function getClaimsByWalletAddress(wallet_address: string) {
  const db = await getDb();
  const res = await db.query(`SELECT * FROM wallet_claim_artworks WHERE wallet_address = $1`, [
    wallet_address,
  ]);

  // 计算总奖励
  const totalRewards = res.rows.reduce((acc, claim) => acc + claim.rewards, 0);

  return { claims: res.rows, totalRewards, wallet_address };
}
