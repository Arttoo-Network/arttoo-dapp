import { findWalletClaimByAddressAndArtworkId, countArtworkClaims } from '../models/wallet_claim_artworks';
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
