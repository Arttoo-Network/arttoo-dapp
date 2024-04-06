"use client";

import React, { memo, use, useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import {
  APIProvider,
  Map,
  useMarkerRef,
  Marker,
  AdvancedMarker,
  useAdvancedMarkerRef,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter, useSearchParams } from "next/navigation";

function MyComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const [artworksGrouped, setArtworksGrouped] = useState({} as any);
  const [currentArtwork, setCurrentArtwork] = useState(null as any);

  const [markerRef, seMarker] = useAdvancedMarkerRef();
  const initPosition =
    lat && lng
      ? { lat: parseFloat(lat), lng: parseFloat(lng) }
      : { lat: 51.53030424679481, lng: -0.07532395581990654 };

  const getArtworks = async () => {
    const uri = "/api/artworks-all";

    const resp = await fetch(uri, {
      method: "GET",
    });

    const data = await resp.json();

    setArtworksGrouped(groupByLocation(data));
    setCurrentArtwork(data[0]);
  };

  function groupByLocation(data: any) {
    const groups: any = {};

    data.forEach((item: any) => {
      const { longitude, latitude } = item;
      const key = `${longitude},${latitude}`;

      if (!groups[key]) {
        groups[key] = [];
      }

      groups[key].push(item);
    });

    return groups;
  }

  useEffect(() => {
    getArtworks();
  }, []);

  return (
    <>
      <GoogleMapMemo
        artworksGrouped={artworksGrouped}
        setCurrentArtwork={setCurrentArtwork}
        initPosition={initPosition}
      />

      <div className="absolute z-10 bottom-10 w-full">
       {currentArtwork &&  <div className="bg-white mx-2.5 flex px-4 py-2 justify-between border-2 border-black">
          <div className="pr-6">
            <div className="flex text-xs items-center">
              <Avatar className="w-7 h-7 rounded-full overflow-hidden mr-2">
                <AvatarImage
                  alt={currentArtwork?.author}
                  src={currentArtwork?.author_avatar}
                />
              </Avatar>
              {currentArtwork && currentArtwork.author}
            </div>
            <div className="text-sm font-semibold	mb-2 mt-1">
              {currentArtwork && currentArtwork.name}
            </div>
            <div className="flex items-center text-sm font-medium">
              <NavIcon className="mr-2" />{" "}
              {currentArtwork && currentArtwork.location}
            </div>
            <div className="text-[8px] pl-6 mb-2">
              {currentArtwork && currentArtwork.address}
            </div>
            <a
              className="pl-6 block"
              href={`https://www.google.com/maps/search/?api=1&query=${currentArtwork?.latitude},${currentArtwork?.longitude}`}
            >
              <Button className="text-[10px] flex bg-black text-white">
                Navigate
                <ArrIcon className="ml-2" />
              </Button>
            </a>
          </div>
          <div className="w-30 h-40 bg-[#F7F7F7] flex-shrink-0 flex justify-center items-center">
            <Image
              alt={currentArtwork.image}
              src={currentArtwork.image}
              height={150}
              width={100}
            />
          </div>
        </div>}
        <div className="px-2.5">
          <Button
            className="w-full my-4 flex h-12 bg-black text-lg text-white py-2 border-2 border-purple-600"
            onClick={() => {
              router.push(`/qr`);
            }}
          >
            <ScanIcon /> Scan to Hunt
          </Button>
        </div>
      </div>
    </>
  );
}

export default React.memo(MyComponent);

const GoogleMapMemo = memo(function GoogleMapMemo({
  artworksGrouped,
  setCurrentArtwork,
  initPosition,
}: any) {
  return (
    <Map
      style={{ width: "100vw", height: "calc(100vh - 48px)" }}
      defaultCenter={initPosition}
      defaultZoom={8}
      gestureHandling={"greedy"}
      disableDefaultUI={true}
      mapId={"arttoo-google-map"}
    >
      {Object.keys(artworksGrouped).map((key) => {
        const artworks = artworksGrouped[key];
        const [longitude, latitude] = key.split(",").map(parseFloat);

        return (
          <MarkerItem
            key={key}
            longitude={longitude}
            latitude={latitude}
            artworks={artworks}
            switchCurrent={setCurrentArtwork}
          />
        );
      })}
    </Map>
  );
});

function MarkerItem({ longitude, latitude, artworks, switchCurrent }: any) {
  const [markerRef, seMarker] = useAdvancedMarkerRef();

  const [infowindowShown, setInfowindowShown] = useState(false);

  const toggleInfoWindow = () =>
    setInfowindowShown((previousState) => !previousState);

  const closeInfoWindow = () => setInfowindowShown(false);

  const location = artworks[0]?.location || "Location";

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={{ lat: latitude, lng: longitude }}
        onClick={toggleInfoWindow}
      />

      {infowindowShown && (
        <InfoWindow anchor={seMarker} onCloseClick={closeInfoWindow}>
          <h1>{location}</h1>
          {artworks &&
            artworks.map((artwork: any) => {
              return (
                <div
                  key={artwork.id}
                  className="flex flex-col bg-white"
                  onClick={() => {
                    switchCurrent(artwork);
                  }}
                >
                  <div className="text-s font-medium	mb-2 mt-1 bg-slate-100 rounded-sm p-2">
                    {artwork.name}
                  </div>
                </div>
              );
            })}
        </InfoWindow>
      )}
    </>
  );
}

function NavIcon(
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      width="16"
      height="15"
      viewBox="0 0 16 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect x="0.820312" width="15" height="15" fill="url(#pattern10)" />
      <defs>
        <pattern
          id="pattern10"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_107_2206" transform="scale(0.005)" />
        </pattern>
        <image
          id="image0_107_2206"
          width="200"
          height="200"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
}
function ArrIcon(props: any) {
  return (
    <svg
      {...props}
      width="15"
      height="14"
      viewBox="0 0 15 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.8203 0H0.820312V6.375H9.40661L5.89005 2.88125L6.77865 2L11.8203 7L6.77865 12L5.89005 11.1188L9.40661 7.625H0.820312V14H14.8203V0Z"
        fill="white"
        fillOpacity="0.9"
      />
    </svg>
  );
}

function ScanIcon(props: any) {
  return (
    <svg
      width="29"
      height="29"
      viewBox="0 0 29 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_446_135)">
        <path
          d="M11.7753 8.04205V11.5646H8.25278V8.04205H11.7753ZM13.5366 6.28078H6.49152V13.3258H13.5366V6.28078ZM11.7753 17.4354V20.958H8.25278V17.4354H11.7753ZM13.5366 15.6742H6.49152V22.7192H13.5366V15.6742ZM21.1687 8.04205V11.5646H17.6462V8.04205H21.1687ZM22.93 6.28078H15.8849V13.3258H22.93V6.28078ZM15.8849 15.6742H17.6462V17.4354H15.8849V15.6742ZM17.6462 17.4354H19.4074V19.1967H17.6462V17.4354ZM19.4074 15.6742H21.1687V17.4354H19.4074V15.6742ZM15.8849 19.1967H17.6462V20.958H15.8849V19.1967ZM17.6462 20.958H19.4074V22.7192H17.6462V20.958ZM19.4074 19.1967H21.1687V20.958H19.4074V19.1967ZM21.1687 17.4354H22.93V19.1967H21.1687V17.4354ZM21.1687 20.958H22.93V22.7192H21.1687V20.958ZM25.2783 8.62913C24.6325 8.62913 24.1041 8.10075 24.1041 7.45496V5.10661H21.7558C21.11 5.10661 20.5816 4.57823 20.5816 3.93244C20.5816 3.28664 21.11 2.75826 21.7558 2.75826H25.2783C25.9241 2.75826 26.4525 3.28664 26.4525 3.93244V7.45496C26.4525 8.10075 25.9241 8.62913 25.2783 8.62913ZM26.4525 25.0676V21.545C26.4525 20.8993 25.9241 20.3709 25.2783 20.3709C24.6325 20.3709 24.1041 20.8993 24.1041 21.545V23.8934H21.7558C21.11 23.8934 20.5816 24.4218 20.5816 25.0676C20.5816 25.7134 21.11 26.2417 21.7558 26.2417H25.2783C25.9241 26.2417 26.4525 25.7134 26.4525 25.0676ZM4.14317 26.2417H7.66569C8.31149 26.2417 8.83986 25.7134 8.83986 25.0676C8.83986 24.4218 8.31149 23.8934 7.66569 23.8934H5.31734V21.545C5.31734 20.8993 4.78896 20.3709 4.14317 20.3709C3.49737 20.3709 2.96899 20.8993 2.96899 21.545V25.0676C2.96899 25.7134 3.49737 26.2417 4.14317 26.2417ZM2.96899 3.93244V7.45496C2.96899 8.10075 3.49737 8.62913 4.14317 8.62913C4.78896 8.62913 5.31734 8.10075 5.31734 7.45496V5.10661H7.66569C8.31149 5.10661 8.83986 4.57823 8.83986 3.93244C8.83986 3.28664 8.31149 2.75826 7.66569 2.75826H4.14317C3.49737 2.75826 2.96899 3.28664 2.96899 3.93244Z"
          fill="#FFFAFA"
        />
      </g>
      <defs>
        <clipPath id="clip0_446_135">
          <rect
            width="28.1802"
            height="28.1802"
            fill="white"
            transform="translate(0.620605 0.409912)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
