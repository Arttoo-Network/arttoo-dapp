// import Button from '@components/default/Button';
import Text from '@components/default/Text';
import { ETextType } from '@components/default/Text/Text.enum';
import { FaStar } from 'react-icons/fa';
import { EColor, ESize } from 'theme/theme.enum';
import WalletButton from '../WalletButton';

// const Navbar = () => {
// 	return (
// 		<nav className='fixed left-0 top-0 flex justify-end w-full p-4 sm:justify-between ba z-10 bg-black'>
// 			<Text type={ETextType.h1} size={ESize.s}>
// 				Arttoo
// 			</Text>

// 			<div>
// 				<WalletButton />
// 			</div>
// 		</nav>
// 	);
// };

// export { Navbar };

import { Button } from "@/components/ui/button"

import { ConnectButton } from "thirdweb/react";
import { createWallet, embeddedWallet } from "thirdweb/wallets";

const wallets = [
  // embeddedWallet(),
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
];

console.log(process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID, 'process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID')
const client = {
	clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "",
	secretKey: process.env.NEXT_PUBLIC_THIRDWEB_SECRET_KEY || "",
}


const Navbar = () => {
	const connectButton = {
		label: "Sign in",
		className: "my-custom-class",
		style: {
			borderRadius: "10px",
			backgroundColor: "#fff",
			color: "#000",
		},
	}
  return (
    <header className="bg-white px-4 py-3 shadow-md">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">ARTTOO</h1>
        <div className="flex items-center space-x-4">
          {/* <Button className="flex items-center space-x-2" variant="ghost">
            <LogInIcon className="w-5 h-5" />
            <span>Sign In</span>
          </Button> */}
					<ConnectButton
						theme={"light"}
						client={client}
						wallets={wallets}
						connectButton={connectButton}
					/>
          <Button className="flex items-center" variant="ghost">
            <MenuIcon className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </header>
  )
}

function LogInIcon(props) {
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
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" x2="3" y1="12" y2="12" />
    </svg>
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


export { Navbar };
