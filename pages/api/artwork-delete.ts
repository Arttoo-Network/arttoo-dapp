import type { NextApiRequest, NextApiResponse } from 'next'
import { Artwork } from "types/artwork";
import { saveArtwork, fetchArtworkById, editArtwork, removeArtwork } from "services/artwork";
 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    // Process a DELETE request
    const id = parseInt(req.body.id as string);
    await removeArtwork(id);
    res.status(200).json({ status: 'success' });
  }
}
