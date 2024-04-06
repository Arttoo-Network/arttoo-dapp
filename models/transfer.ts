// import {
//   Connection,
//   clusterApiUrl,
//   Keypair,
//   LAMPORTS_PER_SOL,
//   Transaction,
//   sendAndConfirmTransaction,
//   PublicKey,
// } from "@solana/web3.js";
// import {
//   createTransferInstruction,
//   getOrCreateAssociatedTokenAccount,
//   getMint,
// } from "@solana/spl-token";


// const transfer = async () => {
//   // Connect to cluster
//   const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
//   let secretKey = Uint8Array.from([213,250,198,250,57,113,231,219,112,203,145,138,170,144,202,186,72,149,38,158,81,86,179,46,232,182,225,140,164,121,121,115,114,56,244,34,140,178,16,202,233,117,242,145,50,191,207,71,167,171,168,136,216,211,150,226,197,231,25,160,150,220,4,37]);
//   const fromWallet = Keypair.fromSecretKey(secretKey);
//   const towallet = new PublicKey("FWerdRvRQYe3REAuKDHMzkwcY17aHj7jwfqQ4tKbd3cN")

//   // const mint = await getMint(connection, new PublicKey("8Y1kQ4Z4ryxDpZ647N3pcXFzn4brHqysiDQVEN6ybCi7"));

//   const mint = await 

//   const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
//       connection,
//       fromWallet,
//       mint.address,
//       fromWallet.publicKey
//   );
  
//   console.log("fromTokenAccount===>",fromTokenAccount)

    
  
//   //get the token account of the toWallet Solana address, if it does not exist, create it
//   const toTokenAccount = await getOrCreateAssociatedTokenAccount(
//       connection,
//       fromWallet,
//       mint.address,
//       towallet
//   );
//   console.log("toTokenAccount===>",toTokenAccount)
      
//   // Add token transfer instructions to transaction
//   const transaction = new Transaction().add(
//   createTransferInstruction(
//       fromTokenAccount.address,
//       toTokenAccount.address,
//       fromWallet.publicKey,
//       10000
//   )
//   );

//   // Sign transaction, broadcast, and confirm
//   const res =await sendAndConfirmTransaction(connection, transaction, [fromWallet]);
//   console.log("res===>",res)
// }

// export { transfer };



import {
  Connection,
  clusterApiUrl,
  Keypair,
  LAMPORTS_PER_SOL,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
  createTransferInstruction,
} from "@solana/spl-token";


export const transfer = async () => {
  // Connect to cluster
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  // Generate a new wallet keypair and airdrop SOL
  const fromWallet = Keypair.generate();
  const fromAirdropSignature = await connection.requestAirdrop(
    fromWallet.publicKey,
    LAMPORTS_PER_SOL
  );
  // Wait for airdrop confirmation
  await connection.confirmTransaction(fromAirdropSignature);

  // Generate a new wallet to receive newly minted token
  const toWallet = Keypair.generate();

  // Create new token mint
  const mint = await createMint(
    connection,
    fromWallet,
    fromWallet.publicKey,
    null,
    9
  );

  // Get the token account of the fromWallet Solana address, if it does not exist, create it
  const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    fromWallet,
    mint,
    fromWallet.publicKey
  );

  //get the token account of the toWallet Solana address, if it does not exist, create it
  const toTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    fromWallet,
    mint,
    toWallet.publicKey
  );

  // Minting 1 new token to the "fromTokenAccount" account we just returned/created
  await mintTo(
    connection,
    fromWallet,
    mint,
    fromTokenAccount.address,
    fromWallet.publicKey,
    1000000000, // it's 1 token, but in lamports
    []
  );

  // Add token transfer instructions to transaction
  const transaction = new Transaction().add(
    createTransferInstruction(
      fromTokenAccount.address,
      toTokenAccount.address,
      fromWallet.publicKey,
      1
    )
  );

  // Sign transaction, broadcast, and confirm
  await sendAndConfirmTransaction(connection, transaction, [fromWallet]);
}
