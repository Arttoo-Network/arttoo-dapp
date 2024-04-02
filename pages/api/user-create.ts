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

  const user: User = {
    wallet_address: req.body.wallet_address || "0x1234567890abcdef1234567890abcdef12345678",
    wallet_type: req.body.wallet_type || "metamask"
  };

  try {

    await saveUser(user);

    res.status(200).json(user)
  } catch (e) {
    console.log("get user info failed");
    return respErr("get user info failed");
  }
}
