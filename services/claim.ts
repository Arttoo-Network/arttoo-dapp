import { getClaimsByWalletAddress, claimArtwork } from '../models/claim';
import { ClaimRequest } from '../types/artwork';

export async function submitClaim(claim: ClaimRequest) {
  try {
    const ret = await claimArtwork(claim);
    return ret;
  } catch (e) {
    console.log('save claim failed: ', e);
  }
}

export async function fetchClaimsByWalletAddress(wallet_address: string) {
  try {
    const claims = await getClaimsByWalletAddress(wallet_address);
    console.log('fetch claims: ', claims);
    return claims;
  } catch (e) {
    console.log('fetch claims failed: ', e);
  }
}
