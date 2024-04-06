/**
 * v0 by Vercel.
 * @see https://v0.dev/t/u6D1gynbUzw
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useActiveAccount, useActiveWallet } from "thirdweb/react";
import { WalletClaimArtworkWithDetails } from "types/artwork";
import Image from "next/image";

export default function Component() {
  const [list, setList] = useState<WalletClaimArtworkWithDetails[]>([]);
  const totalRewards = list.reduce((sum, artwork) => {
    return sum + artwork.rewards;
}, 0)

  const activeAccount = useActiveAccount();
  useEffect(() => {
    const getArtwork = async () => {
      const walletAddress = activeAccount?.address;
      if (!walletAddress) {
        return;
      }

      const uri = `/api/reward-list`;

      const resp = await fetch(uri, {
        method: "POST",
        headers: {
          "Content-Type":" application/json"
        },
        body: JSON.stringify({ walletAddress }),
      });

      const data = await resp.json();
      setList(data);
    };
   
    getArtwork();
  }, [activeAccount]);
  return (
    <div className="bg-white">
      <div className="mx-2.5 my-2 p-4 rounded-2xl bg-gradient-to-b	 from-[#A5F4E1] shadow" >
        <div className="mb-1 text-base font-semibold">External wallet</div>
        <div className="text-xs text-gray-600">Wallet tokens can be used for future voting</div>
        <div className="flex items-center justify-between mt-4 mb-4">
          <div className="flex items-center space-x-2">
            <WalletIcon className="h-6 w-6" />
            <div>{activeAccount?.address ? `${activeAccount?.address?.slice(0, 5)}...${activeAccount?.address?.slice(-4)}` : ''}</div>
          </div>
          <div className="text-lg font-bold">{totalRewards} Token</div>
        </div>
        {/* <div className="text-5xl font-sans font-square flex justify-center bg-gradient-to-r text-gradient from-[#2AE5FF] to-[#F471FF] text-transparent bg-clip-text">
            <span className="mr-2 ">1,200</span>
            <span>$ART</span>
          </div> */}
      </div>
      <div className="mx-2.5 mt-5 mb-2 flex justify-between">
        <div className="text-xl font-bold flex items-center">kick-backs <MenuIcon className="ml-2"/></div>
        <Button className="text-sm bg-black text-white">Claim in full</Button>
      </div>
      <div className="mx-4 my-2 grid gap-2">
      { list.map((item) => {
        return (
          <div key={item.id} className="flex items-start justify-between p-3 rounded-lg bg-white shadow-md">
          <div className="flex items-center ">
          <Image
            alt={item.artwork_name}
            className="h-20 w-20"
            height="80"
            src={item.artwork_image}
            style={{
              aspectRatio: "80/80",
              objectFit: "cover",
            }}
            width="80"
          />
          <div className="pl-3">
            <div className=" text-base font-bold">{item.artwork_author}</div>
            <div className="text-sm">{item.artwork_name}</div>
          </div>
          </div>
          <div className="text-lg font-bold">+{item.rewards}</div>
        </div>
        )
      })}
      {
        !list.length && <div className="flex justify-center py-20">No rewards</div>
      }
      </div>
    </div>
  )
}

function MenuIcon(props: any) {
  return (
    <svg 
    { ...props }
    width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="8" fill="#020202"/>
    <path d="M7.22602 4.4447H8.77441L8.48767 10.1478H7.51276L7.22602 4.4447ZM7.99448 10.7528C8.24681 10.7528 8.46473 10.8313 8.63678 10.9881C8.79735 11.145 8.88911 11.3467 8.88911 11.5932C8.88911 11.8397 8.79735 12.0525 8.63678 12.2094C8.45326 12.3663 8.24681 12.4447 7.99448 12.4447C7.74215 12.4447 7.5357 12.3551 7.37513 12.1982C7.19161 12.0413 7.11133 11.8397 7.11133 11.5932C7.11133 11.3467 7.19161 11.145 7.37513 10.9881C7.5357 10.8313 7.74215 10.7528 7.99448 10.7528Z" fill="url(#paint0_linear_311_1074)"/>
    <defs>
    <linearGradient id="paint0_linear_311_1074" x1="8.00022" y1="4.4447" x2="8.00022" y2="12.4447" gradientUnits="userSpaceOnUse">
    <stop stopColor="#2CE4FF"/>
    <stop offset="1" stopColor="#F372FF"/>
    </linearGradient>
    </defs>
    </svg>
    
  )
}


function WalletIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
      <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
    </svg>
  )
}
