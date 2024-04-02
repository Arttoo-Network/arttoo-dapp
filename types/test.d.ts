interface Artwork {
  id?: number;
  name: string; // 艺术藏品名称
  image: string; // 艺术藏品图片
  image_width: number; // 艺术藏品图片宽度
  image_height: number; // 艺术藏品图片高度
  description: string; // 艺术藏品描述
  token: number; // 艺术藏品token数量
  author: string; // 艺术藏品作者
  author_avatar: string; // 艺术藏品作者头像
  longitude: number; // 艺术藏品经度
  latitude: number; // 艺术藏品纬度
  address: string; // 艺术藏品地址
  created_at?: string;
}

interface Rewards {
  visitor: number; // 第几位claim
  total_visitor: number; // 总共claim数量
  reward: number; // 奖励token数量
}

// claim 接口请求参数
{
  wallet_address: string; // 钱包地址
  wallet_type: string; // 钱包类型
  artwork: Artwork; // 艺术藏品
  claim_at?: string; // claim 的时间
}

// claim 接口返回参数
{
  wallet_address: string; // 钱包地址
  wallet_type: string; // 钱包类型
  artwork: Artwork; // 艺术藏品
  rewards: Rewards; // 奖励
}


--------------------------------------------

interface ArtworkRewards {
  artwork: Artwork;
  reward: number;
}

// token reward 页面接口请求参数
{
  wallet_address: string; // 钱包地址
  wallet_type: string; // 钱包类型
}

// token reward 页面接口返回参数
{
  wallet_address: string; // 钱包地址
  wallet_type: string; // 钱包类型
  total_rewards: number; // token总数量
  artwork_rewards: ArtworkRewards[]; // 艺术藏品奖励列表
}
