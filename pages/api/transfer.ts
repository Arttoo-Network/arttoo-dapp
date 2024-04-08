import type { NextApiRequest, NextApiResponse } from 'next'
import { RewardRequest } from 'types/artwork';
import { submitTransfer } from 'models/transfer';


export const config = {
  maxDuration: 30,
};
 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const ret = await submitTransfer(req.body.wallet_address);
  return res.status(200).json(ret);
}
