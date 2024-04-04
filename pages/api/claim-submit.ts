import type { NextApiRequest, NextApiResponse } from 'next'
import { submitClaim } from "services/claim";
 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { wallet_address, wallet_type, artwork_id } = req.body;
  const claim = {
    wallet_address,
    wallet_type,
    artwork_id
  };
  console.log('dd', claim)
  const ret = await submitClaim(claim);

  res.status(200).json(ret);
}
