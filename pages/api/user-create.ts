// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { User } from "types/user";
import { fetchUser, saveUser } from "services/user";
import { respData, respErr } from "lib/resp";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User>
) {

  console.log("get-user-info", req);

  if (!req.body.wallet_address || !req.body.wallet_type) {
    return
  }

  const user: User = {
    wallet_address: req.body.wallet_address,
    wallet_type: req.body.wallet_type,
    claimed_tokens: 0,
  };

  try {
    await saveUser(user);

    res.status(200).json(user)
  } catch (e) {
    console.log("save user info failed");
    return respErr("save user info failed");
  }
}
