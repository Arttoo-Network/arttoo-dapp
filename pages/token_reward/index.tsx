/**
 * v0 by Vercel.
 * @see https://v0.dev/t/u6D1gynbUzw
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <div className="bg-white">
      {/* <div className="flex items-center justify-between p-4">
        <div className="text-2xl font-bold">ARTOO</div>
        <div className="flex items-center space-x-4">
          <ShoppingBagIcon className="h-6 w-6" />
          <div>ox284...f9g9sn</div>
          <MenuIcon className="h-6 w-6" />
        </div>
      </div> */}
      <div className="mx-2.5 my-2 p-4 rounded-2xl bg-gradient-to-b	 from-[#A5F4E1] shadow" >
        <div className="mb-1 text-base font-semibold">External wallet</div>
        <div className="text-xs text-gray-600">Wallet tokens can be used for future voting</div>
        <div className="flex items-center justify-between mt-4 mb-4">
          <div className="flex items-center space-x-2">
            <WalletIcon className="h-6 w-6" />
            <div>ox2846...f9g9sn</div>
          </div>
          <div className="text-lg font-bold">1200 Token</div>
        </div>
        <div className="text-5xl font-sans font-square flex justify-center bg-gradient-to-r text-gradient from-[#2AE5FF] to-[#F471FF] text-transparent bg-clip-text">
            <span className="mr-2 ">1,200</span>
            <span>$ART</span>
          </div>
      </div>
      <div className="mx-2.5 mt-5 mb-2 flex justify-between">
        <div className="text-xl font-bold">kick-backs</div>
        <Button className="rounded-lg	 text-sm bg-gradient-to-r from-[#C7FBB9] via-[#B5F2E3] to-[#9FF4C6] text-black">Claim in full</Button>
      </div>
      <div className="mx-4 my-2 grid gap-2">
        <div className="flex items-start justify-between p-3 rounded-lg bg-white shadow-md">
          <div className="flex items-center ">
          <img
            alt="Yayoi Kusama artwork"
            className="h-20 w-20"
            height="80"
            src="https://placehold.co/70x70"
            style={{
              aspectRatio: "80/80",
              objectFit: "cover",
            }}
            width="80"
          />
          <div className="pl-3">
            <div className=" text-base font-bold">Yayoi Kusama</div>
            <div className="text-sm">Infinity net [FKQS](2016)</div>
          </div>
          </div>
          <div className="text-lg font-bold">+300</div>
        </div>
      </div>
    </div>
  )
}

function MenuIcon(props) {
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
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}


function ShoppingBagIcon(props) {
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
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  )
}


function WalletIcon(props) {
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
