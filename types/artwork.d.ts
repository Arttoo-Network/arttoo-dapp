export interface Artwork {
  id?: number;
  name: string;
  image: string;
  image_width: number;
  image_height: number;
  description: string;
  token: number;
  author: string;
  author_avatar: string;
  longitude: number; // 艺术藏品经度
  latitude: number; // 艺术藏品纬度
  address: string; // 艺术藏品地址
  rewards?: Rewards,
  created_at?: string;
}

export interface UpdateArtwork {
  id: number;
  name: string;
  image: string;
  image_width: number;
  image_height: number;
  description: string;
  token: number;
}

export interface Rewards {
  visitor: number;
  total_visitor: number;
  reward: number;
}

// claim 接口请求参数
export interface Claim {
  wallet_address: string; // 钱包地址
  wallet_type: string; // 钱包类型
  artwork: Artwork; // 艺术藏品
  claim_at?: string; // claim 的时间
}

// claim 接口返回参数
export interface ClaimResponse {
  wallet_address: string; // 钱包地址
  wallet_type: string; // 钱包类型
  artwork: Artwork; // 艺术藏品
  rewards: Rewards; // 奖励
}



interface ArtworkRewards {
  artwork: Artwork;
  reward: number;
}

// token reward 页面接口请求参数
export interface TokenRewardRequest{
  wallet_address: string; // 钱包地址
  wallet_type: string; // 钱包类型
}

// token reward 页面接口返回参数
export interface TokenRewardResponse{
  wallet_address: string; // 钱包地址
  wallet_type: string; // 钱包类型
  total_rewards: number; // token总数量
  artwork_rewards: ArtworkRewards[]; // 艺术藏品奖励列表
}
