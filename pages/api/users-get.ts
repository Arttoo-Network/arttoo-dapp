// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { User } from "types/user";
import { fetchUser, fetchUsers } from "services/user";
import { respData, respErr } from "lib/resp";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  console.log("get-user-info", req);

  const users = await fetchUsers();
  console.log("users", users);

  res.status(200).json(users);
}
