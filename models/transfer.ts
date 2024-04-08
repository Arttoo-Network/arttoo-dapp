import {
    Connection,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
    Transaction,
    sendAndConfirmTransaction,
    PublicKey,
  } from "@solana/web3.js";
import {
createTransferInstruction,
getOrCreateAssociatedTokenAccount,
getMint,
TOKEN_2022_PROGRAM_ID
} from "@solana/spl-token";
import { getDb } from "./db";


// const connection = new Connection("https://api.mainnet-beta.solana.com");
// const h = connection.getBlockHeight()
// h.then(res=>console.log("===>",res))
// let secretKey = Uint8Array.from([213,250,198,250,57,113,231,219,112,203,145,138,170,144,202,186,72,149,38,158,81,86,179,46,232,182,225,140,164,121,121,115,114,56,244,34,140,178,16,202,233,117,242,145,50,191,207,71,167,171,168,136,216,211,150,226,197,231,25,160,150,220,4,37]);
// const fromWallet = Keypair.fromSecretKey(secretKey);
// console.log("===>",fromWallet.publicKey)
// const mint = getMint(connection, new PublicKey("8Y1kQ4Z4ryxDpZ647N3pcXFzn4brHqysiDQVEN6ybCi7"));
// mint.then(res=>console.log("===>",res))




// export const transfer = async (fromWallet: Keypair, toWallet: PublicKey, amount: number) => {}

const TRANSFER_SECRET_KEY = process.env.TRANSFER_SECRET_KEY as any;

console.log("TRANSFER_SECRET_KEY===>",TRANSFER_SECRET_KEY)

export const transfer = async (toWallet: string, amount: number) => {
  // Connect to cluster
   // const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
   const connection = new Connection('https://divine-newest-surf.solana-mainnet.quiknode.pro/06d9c2bd2e81a32582ddd475e0c06e4875d3b357/');
//   const connection = new Connection('https://solana-mainnet.phantom.app/YBPpkkN4g91xDiAnTE9r0RcMkjg0sKUIWvAfoFVJ');

   let secretKey = Uint8Array.from(TRANSFER_SECRET_KEY);
   const fromWallet = Keypair.fromSecretKey(secretKey);
   // console.log("===>",fromWallet.publicKey)
   const towallet = new PublicKey(toWallet)

   const mint = await getMint(connection, 
     new PublicKey("49mn1PDLPkLyaFZW5aQiqtoM2xdfXpjJqfJJ4S2kwnbT"),
     'single',
     TOKEN_2022_PROGRAM_ID);
   console.log("mint===> ok")
   // const mint = 

   const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
       connection,
       fromWallet,
       mint.address,
       fromWallet.publicKey,
       false,
       'single', 
       undefined,
       TOKEN_2022_PROGRAM_ID
   );
   
   console.log("fromTokenAccount===> ok")

     
   
   //get the token account of the toWallet Solana address, if it does not exist, create it
   const toTokenAccount = await getOrCreateAssociatedTokenAccount(
       connection,
       fromWallet,
       mint.address,
       towallet,
       false,
       'single', 
       undefined,
       TOKEN_2022_PROGRAM_ID
   );
   console.log("toTokenAccount===> ok")
       
   // Add token transfer instructions to transaction
   const transaction = new Transaction().add(
   createTransferInstruction(
       fromTokenAccount.address,
       toTokenAccount.address,
       fromWallet.publicKey,
       amount*1000000,
       [],
       TOKEN_2022_PROGRAM_ID
   )
   );

   // Sign transaction, broadcast, and confirm
   let res = await sendAndConfirmTransaction(connection, transaction, [fromWallet]);
   console.log("res===> ok!!>",res)
   return res
}

// 查 wallet_claim_artworks 表，看看当前地址是否有 claim 的记录，以及总的 rewards 数量
export const checkWalletAccount = async (wallet_address: string) => {
  const db = await getDb();
  console.log("wallet_address===>",wallet_address)
  const res = await db.query(`SELECT * FROM wallet_claim_artworks WHERE wallet_address = $1`, [
    wallet_address,
  ]);
  if (res.rowCount === 0) {
    return undefined;
  }
  const { rows } = res;
  console.log("wallet_claim_artworks===>",rows)
  
  // 把查询到的数据的所有 rewards 加起来
  const total_rewards = rows.reduce((acc, row) => acc + row.rewards, 0);

  // 再去 users 表里查一下，claimed_tokens 字段
  const res2 = await db.query(`SELECT claimed_tokens FROM users WHERE wallet_address = $1`, [
    wallet_address,
  ]);
  if (res2.rowCount === 0) {
    return undefined;
  }
  const { rows: rows2 } = res2;

  return {
    total_rewards,
    claimed_tokens: rows2[0].claimed_tokens
  };
}

export const submitTransfer = async (toWallet: string) => {
  const ret = await checkWalletAccount(toWallet);
  if (!ret) {
    // 你没有 claim 过任何 artwork
    return { code: 400, message: "You don't have claimed rewards" };
  }

  const { total_rewards, claimed_tokens } = ret;
  const unClaimedTokens = total_rewards - claimed_tokens;
  if (unClaimedTokens <= 0) {
    return { code: 400, message: "Insufficient balance" };
  }

  let transferRes;
  // const transferRes = await transfer(toWallet, unClaimedTokens);

  if (transferRes) {
    const db = await getDb();
    const res = await db.query(`UPDATE users SET claimed_tokens = $1 WHERE wallet_address = $2`, [
      total_rewards,
      toWallet
    ]);

    if (res.rowCount === 1) {
      return {
        code: 0,
        message: "Transfer successful",
        data: {
          claimed_tokens: total_rewards
        }
      };
    }
  }

  return { code: 500, message: "Network congestion, Transfer failed" };
}
