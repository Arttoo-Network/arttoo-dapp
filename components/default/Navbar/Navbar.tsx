"use client";
import { useActiveAccount } from "thirdweb/react";
import { Button } from "@/components/ui/button";

import {
  WalletDisconnectButton,
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';

// import { ConnectButton } from "thirdweb/react";
// import { createWallet } from "thirdweb/wallets";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { create } from "domain";

import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, SystemProgram, Transaction } from '@solana/web3.js';



// const wallets = [
//   createWallet("com.okex.wallet"),
//   createWallet("app.phantom"),
//   createWallet("com.trustwallet.app"),
// ];

{/* <WalletMultiButton />
                    <WalletDisconnectButton /> */}

console.log(
  process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
  "process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID"
);
const client = {
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "",
  secretKey: process.env.NEXT_PUBLIC_THIRDWEB_SECRET_KEY || "",
};

const Navbar = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  useEffect(() => {
    if (!publicKey) {
      return;
    }
    const wallet_address = publicKey.toString();
    console.log("wallet_address", wallet_address, publicKey.toBase58);

    saveUser(wallet_address, "solana");
  }, [publicKey]);

  const router = useRouter();
  const menuList = [
    {
      name: 'Map Home',
      path: '/map'
    },
    {
      name: 'token reward',
      path: '/token_reward'
    },
  ]
  const activeAccount = useActiveAccount();

  const connectButton : any = {
    label: (
      <span className="flex items-center text-xs">
        <LogInIcon className="w-5 h-5" /> Log in
      </span>
    ),
    className: "p-0 content-btn",
    style: {
      backgroundColor: "#fff",
      padding: 0,
      color: "#000",
    },
  };
  const detailsButton = {
    render: () => (
      <div className="flex items-center text-xs">
        <LogInIcon className="w-5 h-5" />
        {activeAccount?.address?.slice(0, 5)}...
        {activeAccount?.address?.slice(-4)}
      </div>
    ),
  };
  const [show, setShow] = useState(false);
  const toggle = (event: React.MouseEvent<HTMLButtonElement> | MouseEvent) => {
    event.stopPropagation();
    setShow(!show);
  };
  const closeMenu = () => {
    setShow(false);
  };
  useEffect(() => {
    document.addEventListener("click", closeMenu);
    return () => {
      document.removeEventListener("click", closeMenu);
    };
  });

  const saveUser = async (wallet_address: string, wallet_type: string) => {
    const uri = `/api/user-create`;
    const resp = await fetch(uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ wallet_address, wallet_type }),
    });
    const data = await resp.json();
    return data;
  }
  return (
    <header className="bg-white sticky top-0 z-40 w-full px-4 py-1 shadow-md">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">
          <Link href="/map"><Logo /></Link>
        </h1>
        <div id="connectButton" className="flex items-center">
          <WalletMultiButton />
          {/* <ConnectButton
            theme={"light"}
            client={client}
            wallets={wallets}
            recommendedWallets={wallets}
            connectButton={connectButton}
            detailsButton={detailsButton}
            connectModal={{
              showThirdwebBranding: false,
              size: "compact",
            }}
            onConnect={(wallet) => {
              const accout = wallet.getAccount();
              console.log("wallet", wallet, accout);

              const id = wallet.id;
              const wallet_address = accout?.address;

              if (!wallet_address) {
                return;
              }

              saveUser(wallet_address, id);
            }}
          /> */}

          <Button
            onClick={toggle}
            className="flex items-center"
            variant="ghost"
          >
            <MenuIcon className="w-6 h-6" />
          </Button>
        </div>
      </div>
      {show && (
        <div className="absolute left-0 w-full animation-fade text-xs bg-white shadow-md">
          {menuList.map((item) => (  <div
          key={item.name}
            onClick={() => router.push(item.path)}
            className="border-b p-5"
          >
            {item.name}
          </div>))}
        </div>
      )}
    </header>
  );
};

function LogInIcon(props: any) {
  return (
    <svg
      className="mr-2"
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="15" height="15" fill="url(#pattern6)" />
      <defs>
        <pattern
          id="pattern6"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_282_66" transform="scale(0.005)" />
        </pattern>
        <image
          id="image0_282_66"
          width="200"
          height="200"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAMk0lEQVR4nO3dXVIaTRTG8YN6L+8KgvcxISvIuIKQFYgr0KwguILgCsQVhKzAcQVOMPfiCkLu1Xn/TTTlBwxMQ+LQ/fyquronlVASzsPpmUGtmYhMpYCIFFBARAooICIFFBCRAgqISAEFRKSAAiJSQAERKaCAiBRQQEQKKCAiBf55QLa3t98zWa1Wa97e3tZZygrhdcuYRhcXF2fMwasx/ppms9kgBO/zPG+5Q+aGSTAIy9DMUuZsbW3tW5ZlQwvM0gNCKOqEYpfRNg4ZEg8XlO5gMDhhHYQaYykIRuPm5uZznudtk6jRUUbUQXdjY+OIrjLij1bWwgFRMGSaEIKyUEDevHmzz39Ah1HnUGQigjKkRvZ+/PiR2orxCojrGtfX11/dkiEyF4LS5erXJ5Yro3RAuEzbYjrO1TXET8aW6yNbrqGtgFIBcVsqrk51WYp4o5OM1tfXdwhJxmGlzR0QOsdxrhNxWZJVCclcAVE45G9YhZDMDMjr16+7TPsMkaWrekgKA0LnaNM5jlmK/DWEZEhI3pGREYeVMjUgXMptcin3nKXIv5Byn2SHuVJqjGfIRp274+d0j4Yt33dGambu3SI1WSWJmdUZiZm9ZSzbISHpWIVMDAhbqx7h2GW5LFe1Wq1DG+1nFWyjUt7dm2iLOjngcGlh4R6J22plLCvhWUA4KU/M7JSxDFeMNu8KqUmw7mqmy1hGUDLq5R1zJdQYj9A9LvPlbK2OeDfo8GYwYi0R4EbyATeSv7BcyNra2qfBYNBl+eIeBYRwtAnHMcuFsJ3au7i46JlEh62Xu7jTZ/mK4YX6cZd+t6rw5vo0IJf5gt2DrlGpPaT8e2SkTkhSW2zLVYkT9j8BIRwLdw+Sr84hY4uGhFoaUUv/sXxRfwLCidYpU2L+KpF4qY67kGQsXzFKIyQv/oY7DghPxH1/xyVLX98JR5NZ5BFqq8nl4JTdySaHZaXU1Q7zi6kxlnH1YYcnkprIBGzf3f2SryxL45zWnawP7YWMA8L2KjWz9wwfZ4QjMZEChKRPSD6wLOWlL/nW6IBun/iTtRf2ie6JZyxFpqJO6tTJActS+HdD/l3P5sTfT7lE/Iuuk3G4sBrdI7Hl3TkXqQSCMjSzPmE5IitD8+QC0jGzzwyRIBGWHkE59AlKjb1hjxa2y1okWIRkREh2CEmprZfrIKn5n6CLrBSCUureiusgl/mCHy8RWSVcOn5HI5mrk7gOkjOLRIMu4rZbLiRDm0EBkSgRkhO2Wm2bQQGRaLHV2prVRRQQidnRjx8/DpinUkAkWmyzhmyztlhOpYBI1NhmuZP1jOVECojEbodtVmpTLBQQHrjGJFIZHvV8SB13bAoFRILiUc8KiMTDo54VEImHRz0rIBIPj3pWQCQeHvWsgEg8POpZAZF4eNSzAiLx8KhnBUTi4VHPCojEw6OeFRCJh0c9KyASD496VkAkHh71rIBIPDzqWQGReHjUswIi8fCoZwVE4uFRzwqIxMOjnhUQiYdHPSsgEg+PelZAJB4e9ayASDw86lkBkXh41LMCIvHwqGcFROLhUc8KiMTDo54VEInH9vb2KM/zTZZzqc34nYUKiASFgJT6rc0bM36JjgIiQaGeEzM7ZczjjBpOrIACIsGhpjtm9pkxFVurX+vr6w26x4jDqRQQCRJbrbaZddluTTofOWNr1cpmhMNRQCRoBKVFSJosXdcY0jVSgjG0OSkgIgUUEJECCohIAQVEpIACInNpNpuNm5ubV3meJ1ZBa2trI762jJPwX5yEZ/zRUiggMhGBqN/e3u7mvwORMNeZV0lqDC7nnpCXoXlSQOQR6iHhcug+gWhxGIqMDtMdDAYnrEtRQGSMOkjs993nxAJF8IeMTpmgKCCRc1spzi0+53l+wGEs3NbrE1uvjHUhBSRihKNJOL4SjoZFhk4yYvpU9FF3RwGJlPsIBtNxvnon38vWoY4PmSdSQCJEONoE45il/HZELR8wP6OAREbhmIwt18TvLFRAIsIphzvnOM21rZpmh5pO7QEFJBJko359fX3qlgyZgC4y4k78Fhe3RhyOKSCR4HXu2O/7HFLs0fmIAhIBukeT7nHOUubAPRLXRYYGBSQCnJj3Oe/4wFLmwFbrhBP2tkEBCRzNo0H3uGS5MArnG0HLmDPmEX9UCXw9Db6eJsvEzN4yFnbfRRSQwNE9ehTPLstFHFEwHQpmxLrSqOfEuPlnZu8Z3tbW1j4NBoOuAhI4AvKTgNRZlsY7s/vROAnByDhcKW/evDm4vb39wtJXRn2/U0ACRjhahOMry9JWORz3eP5tnv8xSy90zS0FJGC8tl2mfUZpBOQjJ6p9lo+4cxpuNrrHdOFrGPi7fTfYkpxwWCn8H3TM8/I2z2lPAQkYr21qfnvxM17bxJ5w78hm9oVg1JmfoaD6dJ09ms6Iw0og0HUuUmQsXzHKOlRAAkZB/5xWzDPs8Nqm9gB1ktgcP/PWhYTO85FlZSxwPnKmgATq7p3zJ8tSKPBfFPizUBG2y/xuSzULj7HHY/SsIvi/8L3UnSkggeJ1TWyOd/wJznhdE3uAAmtSYOcs50JAvhGQFsvK4P8jZypNAQkUr2tifgE55HXt2AM8VsdKnujyGJWqDZ5Dah7nYwpIoHhdE1NA/uA5pKaAyD1e18Q8AsL26ITtUdse4Pyj7P2EK2qjYRXCc7jM5zyHekgBCRSnDaXOGx4443VN7AEeqs5j/WQ5r0cfGX9pHl//vSsFJGC+ry13kP97ei+Dx+oy7TMK0YHcHfhmlv3+uHgV0D3cTc2vLMs6U0ACRmGMKIxNlqVQ5Htss3r2BLWSMb1lTMW//ci/7bOsDL7uU6bEyjtSQALGa5uaz4lp7fm3nt7jMbtM+4ynrug8rQysK4OvNzGPczHHfaJXAQkYr23HSl59ukdIenSCPZbPuD39zc1Ni+7UMBCMfgaWlXL3dZ7ff51l8by2FJCAUSBNTk7PWXopCknV8dTrPPdTt2T4uKK+GwpI4Hh9h+b3Qb17Ke+kezSIoa0InnNiZl8YvuFwxlfiFJDA8fp2mfYZC3HdxMxcRzljriQuSnxgclu/ti2IN4Ut96aggASOrYbvB/WKZIwRoxIIb4NQNGxJeLwT3gjaBgUkAryz9iigXZYyh/vuYVBAIvCXukioxucezGMKSCR4nTvmeck3Fmyt3KcAGnSPEYdjCkgk6CLusmdqM+6ER26Hmk7tAQUkIoSkyY2zlPORTQ7lAXfXfDAYdFk+ooBEhow06STnLOUOW6s/V62eUkAixFWttpl11UkIQEE4HAUkUjSS6LdbhGOPcPSsgAISMTLiLv/2Wb5lxGTuTx4rIDL+uVF0kg5jk8PQlfpB3AqIjNFN6nSTA7YdLizBBYXndcI9DheMoZWggMgjLiicm7RYtgjKB+ZVdsXl2y6jn5UMxj0FRKa6C0tCUJocJvbbe0YVXTGGZpbRLTK6ReobiocUEJECCohIAQVEgsZN0Q93W0R3ou62XmdsvUYczkUBkSARjLbZ899lQkhGjM5gMDjicCYFRIJDTXdsxkf7CYn79uE9loUUEAkK9ZzYnD8Hi5DM/CF3CogEha1Vj23VLsuZCMiQgGyxnEoBkaAQkJ8EpM5yLoSksIsoIBIUj3o+pI47NoUCIkHxqGcFROLhUc8KiMTDo54VEImHRz0rIBIPj3pWQCQeHvWsgEg8POpZAZF4eNSzAiLx8KhnBUTi4VHPCojEw6OeFRCJh0c9KyASD496VkAkHh71rIBIPDzqWQGReHjUswIi8fCoZwVE4uFRzwqIxMOjnhUQiYdHPSsgEg+PelZAJB4e9ayASDw86lkBkXh41LMCIvHwqGcFROLhUc8KiMTDo57/XkCQmki1JFbOzIAMzewVQyQ6tVpt7+LiomdTuICkVt1f7Svyt+3QQVKbwgWky7zPEInOxsbGf0W/1NMFJLE5f2WVSEjYXn1je9ViOdX4KhQhGZrOQyQyBKTw/MMZB2R7e7ud5/kxS5FYXHHu0bAZxgFx1EUkJvN0D+dPQJq4ublJ6SSbHIoEi3CcEI62zeFPQBy2Wi0C8pWlSKi+s7VqMs/lUUAcFxKmHkHZZBYJBp3j2/r6ervosu5TzwLisNtqXl9f91nqnERCcUTnOGAuZWJA7tFN2nSSjikosqLoGid0jQ5dY2geCgNyj4biOkrbWDIapsBIdZ3VarURc59g9LMS26lJagwRmUIBESmggIgUUEBECiggIgUUEJECCohIAQVEpIACIlJAAREpoICIFFBARAooICIFFBCRAgqISIH/AdS5tdZ0XIf2AAAAAElFTkSuQmCC"
        />
      </defs>
    </svg>
  );
}

function MenuIcon(props: any) {
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
  );
}

function Logo() {
  return (
    <svg
      width="60"
      height="22"
      viewBox="0 0 60 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect
        x="0.882324"
        width="58.6396"
        height="21.8873"
        fill="url(#pattern0)"
      />
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image0_107_2239"
            transform="matrix(0.0020852 0 0 0.00558659 -0.0475793 0)"
          />
        </pattern>
        <image
          id="image0_107_2239"
          width="512"
          height="179"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
}
export { Navbar };
