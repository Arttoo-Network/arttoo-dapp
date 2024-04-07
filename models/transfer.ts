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


// const connection = new Connection("https://api.mainnet-beta.solana.com");
// const h = connection.getBlockHeight()
// h.then(res=>console.log("===>",res))
// let secretKey = Uint8Array.from([213,250,198,250,57,113,231,219,112,203,145,138,170,144,202,186,72,149,38,158,81,86,179,46,232,182,225,140,164,121,121,115,114,56,244,34,140,178,16,202,233,117,242,145,50,191,207,71,167,171,168,136,216,211,150,226,197,231,25,160,150,220,4,37]);
// const fromWallet = Keypair.fromSecretKey(secretKey);
// console.log("===>",fromWallet.publicKey)
// const mint = getMint(connection, new PublicKey("8Y1kQ4Z4ryxDpZ647N3pcXFzn4brHqysiDQVEN6ybCi7"));
// mint.then(res=>console.log("===>",res))




// export const transfer = async (fromWallet: Keypair, toWallet: PublicKey, amount: number) => {}

export const transfer = async () => {
  // Connect to cluster
  // const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  const connection = new Connection('https://api.devnet.solana.com');
  let secretKey = Uint8Array.from([213,250,198,250,57,113,231,219,112,203,145,138,170,144,202,186,72,149,38,158,81,86,179,46,232,182,225,140,164,121,121,115,114,56,244,34,140,178,16,202,233,117,242,145,50,191,207,71,167,171,168,136,216,211,150,226,197,231,25,160,150,220,4,37]);
  const fromWallet = Keypair.fromSecretKey(secretKey);
  // console.log("===>",fromWallet.publicKey)
  const towallet = new PublicKey("7V1uJ7rHvvKbjj2eKUWH8AkUosMev72WbmtMkLTL4gpu")

  const mint = await getMint(connection, 
    new PublicKey("8Y1kQ4Z4ryxDpZ647N3pcXFzn4brHqysiDQVEN6ybCi7"),
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
      100*1000000,
      [],
      TOKEN_2022_PROGRAM_ID
  )
  );

  // Sign transaction, broadcast, and confirm
  let res = await sendAndConfirmTransaction(connection, transaction, [fromWallet]);
  console.log("res===> ok!!>",res)

  return res;
}
  