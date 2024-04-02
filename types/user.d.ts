export interface User {
  id?: number;
  wallet_address: string;
  wallet_type: string;
  claims_artwork_ids?: claimsArtworkId[];
  created_at?: string;
}

export interface claimsArtworkId {
  id?: number;
  name: string;
  rebate?: number;
}

// export interface UserCredits {
//   one_time_credits: number;
//   monthly_credits: number;
//   total_credits: number;
//   used_credits: number;
//   left_credits: number;
// }
