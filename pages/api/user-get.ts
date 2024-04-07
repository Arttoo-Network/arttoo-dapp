// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { User } from "types/user";
import { fetchUser } from "services/user";
import { respData, respErr } from "lib/resp";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  console.log("get-user-info", req);

  const { wallet_address } = req.query;
  if (!wallet_address) {
    return respErr("wallet_address is required");
  }

  const user = await fetchUser(wallet_address as string);

  if (!user) {
    return respErr("user not found");
  }

  return res.status(200).json(user);
}
