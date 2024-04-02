import { getUsers, insertUser, findUserByAddress } from "models/user";

import { User } from "types/user";

export async function saveUser(user: User) {
  try {
    const existUser = await findUserByAddress(user.wallet_address);
    console.log("exist user: ", existUser);
    if (!existUser) {
      await insertUser(user);
    }
  } catch (e) {
    console.log("save user failed: ", e);
  }
}

export async function fetchUser(wallet_address: string) {
  try {
    const user = await findUserByAddress(wallet_address);
    console.log("fetch user: ", user);
    return user;
  } catch (e) {
    console.log("fetch user failed: ", e);
  }
}

export async function fetchUsers() {
  try {
    const users = await getUsers();
    return users;
  } catch (e) {
    console.log("fetch user failed: ", e);
  }
}
