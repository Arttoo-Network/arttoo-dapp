import type { NextApiRequest, NextApiResponse } from 'next'
import { getArtworks } from "services/reward";
 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {walletAddress} = req.body;
    const data = await getArtworks(walletAddress);

    res.status(200).json(data);
  } catch (e) {
    console.log('get artworks list api failed: ', e);
  }
 }
