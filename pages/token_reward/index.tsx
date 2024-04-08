/**
 * v0 by Vercel.
 * @see https://v0.dev/t/u6D1gynbUzw
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useActiveAccount, useActiveWallet } from "thirdweb/react";
import { WalletClaimArtworkWithDetails } from "types/artwork";
import Image from "next/image";
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

export default function Component() {
  const { publicKey, sendTransaction, wallet } = useWallet();
  const wallet_address = publicKey?.toString();

  const [list, setList] = useState<WalletClaimArtworkWithDetails[]>([]);
  const totalRewards = list.reduce((sum, artwork) => {
    return sum + artwork.rewards;
  }, 0);

  const activeAccount = useActiveAccount();
  useEffect(() => {
    const getArtwork = async () => {
      if (!wallet_address) {
        return;
      }

      const uri = `/api/reward-list`;

      const resp = await fetch(uri, {
        method: "POST",
        headers: {
          "Content-Type": " application/json",
        },
        body: JSON.stringify({ walletAddress: wallet_address }),
      });

      const data = await resp.json();
      setList(data);
    };

    getArtwork();
    getUserInfoByWallet();
  }, [activeAccount]);

  const [claimedToken, setClaimedTokens] = useState(0);

  const getUserInfoByWallet = async () => {
    if (!wallet_address) {
      return;
    }

    const uri = `/api/user-get?wallet_address=${wallet_address}`;

    const resp = await fetch(uri);

    const userInfo = await resp.json();

    if (userInfo) {
      setClaimedTokens(userInfo.claimed_tokens);
    }
  }

  const handleSubmitTransfer = async () => {
    if (!wallet_address) {
      return;
    }

    const uri = `/api/transfer`;

    const resp = await fetch(uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ wallet_address }),
    });

    const { code, data, message } = await resp.json();

    if (code === 0) {
      setClaimedTokens(data.claimed_tokens);
    } else {
      console.error(message);
      setTimeout(() => {
        alert('Network congestion, ' + message);
      }, 3000);
    }
  }

  return (
    <div className="bg-white">
      <div className="mx-2.5 my-2 p-2 bg-gradient-to-b	 from-[#A5F4E1] shadow">
        <div className="flex items-center justify-between">
          <div className="flex text-xs items-center space-x-2">
            <WalletIcon className="h-6 w-6" />
            <div>
              {wallet_address
                ? `${wallet_address?.slice(
                    0,
                    5
                  )}...${wallet_address?.slice(-4)}`
                : ""}
            </div>
          </div>
          <div className="text-xs font-medium">{claimedToken} claimed</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-xs font-medium	pt-4 pb-1">Total Reward</div>
          <div className="text-2xl font-semibold pb-4">{totalRewards} $HUNT</div>
          <div className="text-xs font-medium	pb-4">{totalRewards - claimedToken} $HUNT unclaimed</div>
        </div>
      </div>
      <div className="flex justify-center py-3">
        <Button
          className="text-sm bg-black text-white"
          onClick={handleSubmitTransfer}
        >
          Claim All
        </Button>
      </div>
      <div className="mx-2.5 mt-5 mb-2 flex justify-between">
        <div className="text-xl font-bold flex items-center">
          kick-backs <MenuIcon className="ml-2" />
        </div>
      </div>
      <div className="mx-4 my-2 grid gap-2">
        {list.map((item) => {
          return (
            <a
              key={item.id}
              className="flex items-start justify-between p-3 rounded-lg bg-white shadow-md"
              href={`/claim?id=${item.artwork_id}`}
            >
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
                  <div className=" text-base font-bold">
                    {item.artwork_author}
                  </div>
                  <div className="text-sm mb-1">{item.artwork_name}</div>
                  <div className="text-sm text-[#3AC1B9]">{item.artwork_token}  $HUNT</div>
                </div>
              </div>
              <div className="text-lg font-bold">
                +{item.rewards - item.artwork_token}
              </div>
            </a>
          );
        })}
        {!list.length && (
          <div className="flex justify-center py-20">No rewards</div>
        )}
      </div>
    </div>
  );
}

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="8" cy="8" r="8" fill="#020202" />
      <path
        d="M7.22602 4.4447H8.77441L8.48767 10.1478H7.51276L7.22602 4.4447ZM7.99448 10.7528C8.24681 10.7528 8.46473 10.8313 8.63678 10.9881C8.79735 11.145 8.88911 11.3467 8.88911 11.5932C8.88911 11.8397 8.79735 12.0525 8.63678 12.2094C8.45326 12.3663 8.24681 12.4447 7.99448 12.4447C7.74215 12.4447 7.5357 12.3551 7.37513 12.1982C7.19161 12.0413 7.11133 11.8397 7.11133 11.5932C7.11133 11.3467 7.19161 11.145 7.37513 10.9881C7.5357 10.8313 7.74215 10.7528 7.99448 10.7528Z"
        fill="url(#paint0_linear_311_1074)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_311_1074"
          x1="8.00022"
          y1="4.4447"
          x2="8.00022"
          y2="12.4447"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2CE4FF" />
          <stop offset="1" stopColor="#F372FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function WalletIcon(props: any) {
  return (
    <svg
      {...props}
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect
        x="0.618164"
        width="31.2195"
        height="31.2195"
        fill="url(#pattern0_1077_1143)"
      />
      <defs>
        <pattern
          id="pattern0_1077_1143"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_1077_1143" transform="scale(0.005)" />
        </pattern>
        <image
          id="image0_1077_1143"
          width="200"
          height="200"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAMk0lEQVR4nO3dXVIaTRTG8YN6L+8KgvcxISvIuIKQFYgr0KwguILgCsQVhKzAcQVOMPfiCkLu1Xn/TTTlBwxMQ+LQ/fyquronlVASzsPpmUGtmYhMpYCIFFBARAooICIFFBCRAgqISAEFRKSAAiJSQAERKaCAiBRQQEQKKCAiBf55QLa3t98zWa1Wa97e3tZZygrhdcuYRhcXF2fMwasx/ppms9kgBO/zPG+5Q+aGSTAIy9DMUuZsbW3tW5ZlQwvM0gNCKOqEYpfRNg4ZEg8XlO5gMDhhHYQaYykIRuPm5uZznudtk6jRUUbUQXdjY+OIrjLij1bWwgFRMGSaEIKyUEDevHmzz39Ah1HnUGQigjKkRvZ+/PiR2orxCojrGtfX11/dkiEyF4LS5erXJ5Yro3RAuEzbYjrO1TXET8aW6yNbrqGtgFIBcVsqrk51WYp4o5OM1tfXdwhJxmGlzR0QOsdxrhNxWZJVCclcAVE45G9YhZDMDMjr16+7TPsMkaWrekgKA0LnaNM5jlmK/DWEZEhI3pGREYeVMjUgXMptcin3nKXIv5Byn2SHuVJqjGfIRp274+d0j4Yt33dGambu3SI1WSWJmdUZiZm9ZSzbISHpWIVMDAhbqx7h2GW5LFe1Wq1DG+1nFWyjUt7dm2iLOjngcGlh4R6J22plLCvhWUA4KU/M7JSxDFeMNu8KqUmw7mqmy1hGUDLq5R1zJdQYj9A9LvPlbK2OeDfo8GYwYi0R4EbyATeSv7BcyNra2qfBYNBl+eIeBYRwtAnHMcuFsJ3au7i46JlEh62Xu7jTZ/mK4YX6cZd+t6rw5vo0IJf5gt2DrlGpPaT8e2SkTkhSW2zLVYkT9j8BIRwLdw+Sr84hY4uGhFoaUUv/sXxRfwLCidYpU2L+KpF4qY67kGQsXzFKIyQv/oY7DghPxH1/xyVLX98JR5NZ5BFqq8nl4JTdySaHZaXU1Q7zi6kxlnH1YYcnkprIBGzf3f2SryxL45zWnawP7YWMA8L2KjWz9wwfZ4QjMZEChKRPSD6wLOWlL/nW6IBun/iTtRf2ie6JZyxFpqJO6tTJActS+HdD/l3P5sTfT7lE/Iuuk3G4sBrdI7Hl3TkXqQSCMjSzPmE5IitD8+QC0jGzzwyRIBGWHkE59AlKjb1hjxa2y1okWIRkREh2CEmprZfrIKn5n6CLrBSCUureiusgl/mCHy8RWSVcOn5HI5mrk7gOkjOLRIMu4rZbLiRDm0EBkSgRkhO2Wm2bQQGRaLHV2prVRRQQidnRjx8/DpinUkAkWmyzhmyztlhOpYBI1NhmuZP1jOVECojEbodtVmpTLBQQHrjGJFIZHvV8SB13bAoFRILiUc8KiMTDo54VEImHRz0rIBIPj3pWQCQeHvWsgEg8POpZAZF4eNSzAiLx8KhnBUTi4VHPCojEw6OeFRCJh0c9KyASD496VkAkHh71rIBIPDzqWQGReHjUswIi8fCoZwVE4uFRzwqIxMOjnhUQiYdHPSsgEg+PelZAJB4e9ayASDw86lkBkXh41LMCIvHwqGcFROLhUc8KiMTDo54VEInH9vb2KM/zTZZzqc34nYUKiASFgJT6rc0bM36JjgIiQaGeEzM7ZczjjBpOrIACIsGhpjtm9pkxFVurX+vr6w26x4jDqRQQCRJbrbaZddluTTofOWNr1cpmhMNRQCRoBKVFSJosXdcY0jVSgjG0OSkgIgUUEJECCohIAQVEpIACInNpNpuNm5ubV3meJ1ZBa2trI762jJPwX5yEZ/zRUiggMhGBqN/e3u7mvwORMNeZV0lqDC7nnpCXoXlSQOQR6iHhcug+gWhxGIqMDtMdDAYnrEtRQGSMOkjs993nxAJF8IeMTpmgKCCRc1spzi0+53l+wGEs3NbrE1uvjHUhBSRihKNJOL4SjoZFhk4yYvpU9FF3RwGJlPsIBtNxvnon38vWoY4PmSdSQCJEONoE45il/HZELR8wP6OAREbhmIwt18TvLFRAIsIphzvnOM21rZpmh5pO7QEFJBJko359fX3qlgyZgC4y4k78Fhe3RhyOKSCR4HXu2O/7HFLs0fmIAhIBukeT7nHOUubAPRLXRYYGBSQCnJj3Oe/4wFLmwFbrhBP2tkEBCRzNo0H3uGS5MArnG0HLmDPmEX9UCXw9Db6eJsvEzN4yFnbfRRSQwNE9ehTPLstFHFEwHQpmxLrSqOfEuPlnZu8Z3tbW1j4NBoOuAhI4AvKTgNRZlsY7s/vROAnByDhcKW/evDm4vb39wtJXRn2/U0ACRjhahOMry9JWORz3eP5tnv8xSy90zS0FJGC8tl2mfUZpBOQjJ6p9lo+4cxpuNrrHdOFrGPi7fTfYkpxwWCn8H3TM8/I2z2lPAQkYr21qfnvxM17bxJ5w78hm9oVg1JmfoaD6dJ09ms6Iw0og0HUuUmQsXzHKOlRAAkZB/5xWzDPs8Nqm9gB1ktgcP/PWhYTO85FlZSxwPnKmgATq7p3zJ8tSKPBfFPizUBG2y/xuSzULj7HHY/SsIvi/8L3UnSkggeJ1TWyOd/wJznhdE3uAAmtSYOcs50JAvhGQFsvK4P8jZypNAQkUr2tifgE55HXt2AM8VsdKnujyGJWqDZ5Dah7nYwpIoHhdE1NA/uA5pKaAyD1e18Q8AsL26ITtUdse4Pyj7P2EK2qjYRXCc7jM5zyHekgBCRSnDaXOGx4443VN7AEeqs5j/WQ5r0cfGX9pHl//vSsFJGC+ry13kP97ei+Dx+oy7TMK0YHcHfhmlv3+uHgV0D3cTc2vLMs6U0ACRmGMKIxNlqVQ5Htss3r2BLWSMb1lTMW//ci/7bOsDL7uU6bEyjtSQALGa5uaz4lp7fm3nt7jMbtM+4ynrug8rQysK4OvNzGPczHHfaJXAQkYr23HSl59ukdIenSCPZbPuD39zc1Ni+7UMBCMfgaWlXL3dZ7ff51l8by2FJCAUSBNTk7PWXopCknV8dTrPPdTt2T4uKK+GwpI4Hh9h+b3Qb17Ke+kezSIoa0InnNiZl8YvuFwxlfiFJDA8fp2mfYZC3HdxMxcRzljriQuSnxgclu/ti2IN4Ut96aggASOrYbvB/WKZIwRoxIIb4NQNGxJeLwT3gjaBgUkAryz9iigXZYyh/vuYVBAIvCXukioxucezGMKSCR4nTvmeck3Fmyt3KcAGnSPEYdjCkgk6CLusmdqM+6ER26Hmk7tAQUkIoSkyY2zlPORTQ7lAXfXfDAYdFk+ooBEhow06STnLOUOW6s/V62eUkAixFWttpl11UkIQEE4HAUkUjSS6LdbhGOPcPSsgAISMTLiLv/2Wb5lxGTuTx4rIDL+uVF0kg5jk8PQlfpB3AqIjNFN6nSTA7YdLizBBYXndcI9DheMoZWggMgjLiicm7RYtgjKB+ZVdsXl2y6jn5UMxj0FRKa6C0tCUJocJvbbe0YVXTGGZpbRLTK6ReobiocUEJECCohIAQVEgsZN0Q93W0R3ou62XmdsvUYczkUBkSARjLbZ899lQkhGjM5gMDjicCYFRIJDTXdsxkf7CYn79uE9loUUEAkK9ZzYnD8Hi5DM/CF3CogEha1Vj23VLsuZCMiQgGyxnEoBkaAQkJ8EpM5yLoSksIsoIBIUj3o+pI47NoUCIkHxqGcFROLhUc8KiMTDo54VEImHRz0rIBIPj3pWQCQeHvWsgEg8POpZAZF4eNSzAiLx8KhnBUTi4VHPCojEw6OeFRCJh0c9KyASD496VkAkHh71rIBIPDzqWQGReHjUswIi8fCoZwVE4uFRzwqIxMOjnhUQiYdHPSsgEg+PelZAJB4e9ayASDw86lkBkXh41LMCIvHwqGcFROLhUc8KiMTDo57/XkCQmki1JFbOzIAMzewVQyQ6tVpt7+LiomdTuICkVt1f7Svyt+3QQVKbwgWky7zPEInOxsbGf0W/1NMFJLE5f2WVSEjYXn1je9ViOdX4KhQhGZrOQyQyBKTw/MMZB2R7e7ud5/kxS5FYXHHu0bAZxgFx1EUkJvN0D+dPQJq4ublJ6SSbHIoEi3CcEI62zeFPQBy2Wi0C8pWlSKi+s7VqMs/lUUAcFxKmHkHZZBYJBp3j2/r6ervosu5TzwLisNtqXl9f91nqnERCcUTnOGAuZWJA7tFN2nSSjikosqLoGid0jQ5dY2geCgNyj4biOkrbWDIapsBIdZ3VarURc59g9LMS26lJagwRmUIBESmggIgUUEBECiggIgUUEJECCohIAQVEpIACIlJAAREpoICIFFBARAooICIFFBCRAgqISIH/AdS5tdZ0XIf2AAAAAElFTkSuQmCC"
        />
      </defs>
    </svg>
  );
}
