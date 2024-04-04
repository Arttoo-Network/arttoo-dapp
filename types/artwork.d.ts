export interface Artwork {
  id?: number;
  name: string; // 艺术藏品名称
  image: string; // 艺术藏品图片
  image_width: number; // 艺术藏品图片宽度
  image_height: number; // 艺术藏品图片高度
  description: string; // 艺术藏品描述
  token: number; // 艺术藏品 token
  author: string; // 艺术藏品作者
  author_avatar: string; // 艺术藏品作者头像
  longitude: number; // 艺术藏品经度
  latitude: number; // 艺术藏品纬度
  address: string; // 艺术藏品地址
  created_at?: string;
}

export interface WalletClaimArtwork {
  id?: number;
  user_id: number; // 用户 ID
  artwork_id: number; // 艺术藏品 ID
  wallet_address: string; // 钱包地址
  wallet_type: string; // 钱包类型
  visitor: number; // 当前领取者排名
  rewards: number; // 获取的藏品 token + 回扣
  created_at?: string;
}
export interface WalletClaimArtworkRes extends WalletClaimArtwork {
  count: number;
}

export interface ClaimRequest {
  user_id?: number; // 用户 ID
  wallet_address: string; // 钱包地址
  wallet_type: string; // 钱包类型
  artwork_id: number; // 艺术藏品 ID
}
export interface RewardRequest {
  walletAddress: string; // 钱包地址
  artworkId: number; // 艺术藏品 ID
}

export interface WalletClaimArtworkWithDetails {
  id: number,
  user_id?: number,
  artwork_id: number,
  artwork_name: string,
  wallet_address: string,
  rewards: number,
  artwork_image: string,
  artwork_token: number,
  artwork_author: string,
  image_width: number,
  image_height: number,
  longitude: number,
  latitude: numbere,
  description: string
}