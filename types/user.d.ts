export interface User {
  id?: number;
  wallet_address: string;
  wallet_type: string;
  claimed_tokens: number;
  created_at?: string;
}
