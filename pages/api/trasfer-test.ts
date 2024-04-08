import type { NextApiRequest, NextApiResponse } from 'next'
import { RewardRequest } from 'types/artwork';
import { transfer } from 'models/transfer';
 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const ret = await transfer(req.body.wallet_address, req.body.amount);
  return res.status(200).json(ret);
}
