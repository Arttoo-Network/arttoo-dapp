import { findWalletClaimByAddressAndArtworkId, countArtworkClaims, getArtworksForAddress } from '../models/wallet_claim_artworks';
import { RewardRequest } from '../types/artwork';

export async function getReward(rewardRequest: RewardRequest) {
  try {
    const [res, count] = await Promise.all([
      findWalletClaimByAddressAndArtworkId(rewardRequest), 
      countArtworkClaims(rewardRequest.artworkId)])
      if (res) {
        return {
          ...res,
          count
        }
      }
      return {code: 1}
  
  } catch (e) {
    console.log('get reward failed: ', e);
  }
}

export async function getArtworks(walletAddress: string) {
  try {
    const res = await  getArtworksForAddress(walletAddress)
      if (res) {
        return res
      }
      return []
  
  } catch (e) {
    console.log('get artwork list fail: ', e);
  }
}
