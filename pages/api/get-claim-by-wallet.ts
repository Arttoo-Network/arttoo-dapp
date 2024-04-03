import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchClaimsByWalletAddress } from "services/claim";
 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { wallet_address } = req.body;
  const claims = await fetchClaimsByWalletAddress(wallet_address);
  console.log('claims', claims);
  
  res.status(200).json(claims);
}
