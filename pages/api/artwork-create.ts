import type { NextApiRequest, NextApiResponse } from 'next'
import { Artwork } from "types/artwork";
import { saveArtwork, fetchArtworkById, editArtwork } from "services/artwork";
 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Process a POST request
    const artwork: Artwork = req.body;
    const ret = await saveArtwork(artwork);
    res.status(200).json(ret);
  }
}
