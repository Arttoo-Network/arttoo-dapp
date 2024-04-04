import type { NextApiRequest, NextApiResponse } from 'next'
import { RewardRequest } from 'types/artwork';
import { getReward } from "services/reward";
 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {artworkId, walletAddress} = req.body;
    const data = await getReward({
      walletAddress,
      artworkId
    });

    res.status(200).json(data);
  } catch (e) {
    console.log('get reward api failed: ', e);
  }
 }
