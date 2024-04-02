
import { getArtworks, insertArtwork, findArtworkById, updateArtwork, deleteArtwork } from '../models/artwork';
import { Artwork } from '../types/artwork';

export async function saveArtwork(artwork: Artwork) {
  try {
    await insertArtwork(artwork);
  } catch (e) {
    console.log('save artwork failed: ', e);
  }
}

export async function fetchArtworks() {
  try {
    const artworks = await getArtworks();
    console.log('fetch artworks: ', artworks);
    return artworks;
  } catch (e) {
    console.log('fetch artworks failed: ', e);
  }
}

export async function fetchArtworkById(id: number) {
  console.log('fetch artwork by id: ', id);
  try {
    const artwork = await findArtworkById(id);
  console.log('fetch artwork by id: ', artwork);
    return artwork;
  } catch (e) {
    console.log('fetch artwork failed: ', e);
  }
}

export async function editArtwork(artwork: Artwork) {
  try {
    const res = await updateArtwork(artwork);
    console.log('edit artwork: ', res);
    return res;
  } catch (e) {
    console.log('edit artwork failed: ', e);
  }
}


export async function removeArtwork(id: number) {
  console.log('delete artwork by id: ', id);
  try {
    await deleteArtwork(id);
  } catch (e) {
    console.log('delete artwork failed: ', e);
  }
}
