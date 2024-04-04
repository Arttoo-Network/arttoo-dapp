import type { NextApiRequest, NextApiResponse } from 'next'
import { Artwork } from "types/artwork";
import { saveArtwork, fetchArtworkById, editArtwork } from "services/artwork";
 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id;
  const artwork = await fetchArtworkById(id);
  res.status(200).json(artwork);
}
