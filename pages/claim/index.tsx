"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { Artwork, WalletClaimArtworkRes } from "types/artwork";
import { useActiveAccount, useActiveWallet } from "thirdweb/react";
enum STATUS {
  "LOADING",
  "SUCCESS",
  "ERROR",
}

export default function Component() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(STATUS.SUCCESS);
  const [artInfo, setArtInfo] = useState<Artwork>({} as Artwork);
  const activeAccount = useActiveAccount();
  const wallet = useActiveWallet();
  const [rewards, setRewards] = useState<WalletClaimArtworkRes | null>(null);

  const hasRewards = rewards !== null;
  const handleClaim = () => {
    claim()
  };
  const claim = async () => {
    if (!wallet?.id) {
      const ele = document.querySelector('#connectButton .content-btn') as HTMLButtonElement;
      ele?.click()
      return;
    }
    setStatus(STATUS.LOADING);
    setLoading(true);
    try {
      const id = searchParams.get("id");

      if (!wallet?.id || !id) {
        return;
      }
  
      const uri = `/api/claim-submit`;
  
      const resp = await fetch(uri, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          wallet_address: activeAccount?.address,
          wallet_type: wallet.id,
          artwork_id: +id,
        }),
      });
  
      const data = await resp.json();
      setStatus(STATUS.SUCCESS);
      getReward();
      setLoading(false);
    } catch (e) {
      setStatus(STATUS.ERROR);
    }

  };

  const [twitterShareText, setTwitterShareText] = useState("");
  useEffect(() => {
    const getArtwork = async () => {
      const id = searchParams.get("id");
      if (!id) {
        return;
      }

      const uri = `/api/artwork-get?id=${id}`;

      const resp = await fetch(uri, {
        method: "POST",
        body: JSON.stringify({ id }),
      });

      const data = await resp.json();
      setArtInfo(data);

      const shareUrl = encodeURIComponent(`https://arttoo.io:3000/map?lng=${data.longitude}&lat=${data.latitude}`)
      const text = `I’ve discovered ${data.name} at ${shareUrl} , come view this artwork and claim @arttoonetwork‘s $HUNT token`
      setTwitterShareText(text);
    };
   
    getArtwork();
  }, [searchParams]);
  const getReward = async () => {
    const id = searchParams.get("id");
    if (!id || !activeAccount?.address) {
      setRewards(null)
      return;
    }

    const uri = `/api/reward-get`;

    const resp = await fetch(uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        walletAddress: activeAccount?.address,
        artworkId: +id,
      }),
    });

    const res = await resp.json();
    if(res.code === 1) {
      setRewards(null)
    } else {
      setRewards(res)
    }
  };
  useEffect(() => {
    getReward();
  }, [activeAccount, searchParams])

  return (
    <div className="max-w-md mx-auto">
      <main className="py-4 px-3">
        <section className="flex items-center space-x-2 mb-4">
          <Avatar className="w-7 h-7">
            <AvatarImage alt={artInfo.author} src={artInfo.author_avatar} />
            <AvatarFallback>YK</AvatarFallback>
          </Avatar>
          <h2 className="text-lg font-semibold">{artInfo.author}</h2>
        </section>
        <section className="mb-2 rounded-lg	bg-background-second py-4">
          <div className="text-center mt-2">
            <div className="flex pb-4 justify-center">
              {artInfo.image ? (
                <Image
                  alt="Infinite net [FKQS](2016)"
                  height="290"
                  src={artInfo.image}
                  width="223"
                />
              ) : (
                <div className="min-h-60"></div>
              )}
            </div>
            <h3 className="text-sm font-semibold">{artInfo.name}</h3>
            <p className="text-xs">
              {artInfo.image_width} x {artInfo.image_height} in
            </p>
          </div>
        </section>
        <section className="mb-4 px-2 min-h-7">
          <p className="text-xs leading-5	">{artInfo.description}</p>
        </section>
        {!hasRewards && (
          <section className="border-2  border-black	 py-3 px-2">
            <div className="flex justify-start items-center mb-4">
              <h3 className="text-lg font-semibold mr-1">Rewards</h3>
              <InfoIcon className="w-5 h-5 text-gray-400" />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="bg-gray-200 rounded-full w-8 h-8" >
                  <Image 
                    width={32} // 可选，图片的宽度
                    height={32}
                    src="/assets/token.png" alt={"ART"} />
                </div>
                <span className="font-bold">ARTOO</span>
              </div>
              <span className="text-lg font-bold">+{artInfo.token}</span>
            </div>
            <Button
              onClick={handleClaim}
              className="w-full  h-12 mt-4 bg-black text-white py-2 border-2 border-purple-600"
            >
              CLAIM
            </Button>
          </section>
        )}
        {hasRewards && (
          <section className="shadow px-2 py-4 mb-4">
            <div className="flex justify-start items-center mb-4">
              <h3 className="text-lg font-semibold mr-1">Rewards</h3>
            </div>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2">
                <div className="bg-gray-200 rounded-full w-8 h-8" >
                <Image 
                    width={32} // 可选，图片的宽度
                    height={32}
                    src="/assets/token.png" alt={"ART"} />
                </div>
                <span className="font-bold">ARTOO</span>
              </div>
              <span className="text-lg font-bold">+{artInfo.token}</span>
            </div>
            <div className="flex justify-between bg-[#F1F6F4] px-2 py-4 mb-4">
              <div>
                <div className="text-xs">Visitor</div>
                <div className="text-base font-semibold">NO.{rewards.visitor}</div>
              </div>
              <div className="text-xs">
                <div>
                  <div className="pb-2">Total visit</div>
                  <div>{rewards.count}</div>
                </div>
                <div className="pt-4">+{rewards.rewards - artInfo.token} ART</div>
              </div>
            </div>
            <section>
              <div className="text-base font-semibold">Share information</div>
              <div className="text-xs text-neutral-400	py-2">
                The more people participate in scanning the QR code.the more
                reward tokens you earn.
              </div>
            </section>
            <section className="pb-5">
              <a
                className="text-xs flex items-center border-b py-4"
                data-size="large"
                href={`https://twitter.com/intent/tweet?text=${twitterShareText}`}
              >
                <Image
                  className="mr-2"
                  src="/assets/twitter.png"
                  alt="twitter"
                  width={20} // 可选，图片的宽度
                  height={20} // 可选，图片的高度
                />
                Share it on Twitter
              </a>
              <div className="text-xs flex items-center py-4">
                <Image
                  className="mr-2"
                  src="/assets/ins.png"
                  alt="Instargram"
                  width={20} // 可选，图片的宽度
                  height={20} // 可选，图片的高度
                />
                Share it on Instargram
              </div>
            </section>
          </section>
        )}
      </main>
      {loading && (
        <div className="fixed inset-0  backdrop-blur-sm	 z-50">
          <div className="bg-white h-80 shadow absolute w-full bottom-0 p-4">
            <div className="flex flex-row-reverse	">
              <CloseIcon
                onClick={() => {
                  setLoading(false);
                }}
              />
            </div>
            <div className="flex py-7 items-center justify-center">
              {status === STATUS.SUCCESS ? (
                <div className="flex flex-col items-center">
                  <SuccessIcon className="mb-8" />
                  <Image
                    src="/assets/share-x.png"
                    alt="twitter"
                    width={355} // 可选，图片的宽度
                    height={82} // 可选，图片的高度
                  />
                </div>
              ) : status === STATUS.LOADING ? (
                <LoadingIcon />
              ) : (
                <div className="flex flex-col items-center">
                  <ErrorIcon className="mb-4" />
                  Error connecting wallet
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InfoIcon(props: any) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}

function CloseIcon(props: any) {
  return (
    <svg
      {...props}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <circle cx="10" cy="10" r="10" fill="#F1F1F1" />
      <rect x="4" y="4" width="12" height="12" fill="url(#pattern1)" />
      <defs>
        <pattern
          id="pattern1"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_311_697" transform="scale(0.005)" />
        </pattern>
        <image
          id="image0_311_697"
          width="200"
          height="200"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
}

function SuccessIcon(props: any) {
  return (
    <svg
      {...props}
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <circle cx="30" cy="30" r="30" fill="black" />
      <rect
        x="14.2857"
        y="13.5713"
        width="32.4151"
        height="32.4151"
        fill="url(#pattern2)"
      />
      <defs>
        <pattern
          id="pattern2"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_311_700" transform="scale(0.005)" />
        </pattern>
        <image
          id="image0_311_700"
          width="200"
          height="200"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
}
function LoadingIcon() {
  return (
    <div className="animate-spin">
      <svg
        width="60"
        height="60"
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <circle cx="30" cy="30" r="30" fill="black" />
        <rect
          x="13.7141"
          y="13.7141"
          width="32.4151"
          height="32.4151"
          fill="url(#pattern3)"
        />
        <defs>
          <pattern
            id="pattern3"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use xlinkHref="#image0_107_2339" transform="scale(0.005)" />
          </pattern>
          <image
            id="image0_107_2339"
            width="200"
            height="200"
            xlinkHref="data:image/png;base64,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"
          />
        </defs>
      </svg>
    </div>
  );
}

function ErrorIcon(props: any) {
  return (
    <svg
      {...props}
      width="62"
      height="62"
      viewBox="0 0 62 62"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="31"
        cy="31"
        r="30"
        fill="black"
        stroke="#FE3C3C"
        stroke-width="2"
      />
      <rect x="12" y="12" width="36" height="36" fill="url(#pattern9)" />
      <defs>
        <pattern
          id="pattern9"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_311_752" transform="scale(0.005)" />
        </pattern>
        <image
          id="image0_311_752"
          width="200"
          height="200"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
}
