import { MapPin, Camera } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";

import { Asset } from "../types/asset";
import { geocodeAddress } from "../services/api";

interface AssetGalleryItemProps {
  asset: Asset;
  onClick: (asset: Asset) => void;
  imageMode: "street" | "map";
}

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export const AssetGalleryItem: React.FC<AssetGalleryItemProps> = ({
  asset,
  imageMode,
  onClick,
}) => {
  const [latLng, setLatLng] = useState<{ lat: number; lng: number } | null>(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgErrored, setImgErrored] = useState(false);

  useEffect(() => {
    let isMounted = true;
    geocodeAddress(asset.address).then((result) => {
      if (isMounted && result) {
        const { lat, lng } = result;
        setLatLng({ lat, lng });
      }
    });
    return () => {
      isMounted = false;
    };
  }, [asset.address]);

  const formattedValuation = useMemo(
    () =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        notation: "compact",
        maximumFractionDigits: 1,
      }).format(asset.currentValuation ?? 0),
    [asset.currentValuation]
  );

  const baseParams = "size=640x360&key=" + GOOGLE_MAPS_API_KEY;
  const streetViewUrl =
    "https://maps.googleapis.com/maps/api/streetview?" +
    `location=${encodeURIComponent(asset.address)}&${baseParams}`;
  const mapCenter = latLng ? `${latLng.lat},${latLng.lng}` : encodeURIComponent(asset.address);
  const marker =
    latLng ? `&markers=color:blue%7Clabel:S%7C${latLng.lat},${latLng.lng}` : "";
  const mapViewUrl =
    "https://maps.googleapis.com/maps/api/staticmap?" +
    `center=${mapCenter}&zoom=5&maptype=roadmap&${baseParams}${marker}`;

  const imageUrl = imageMode === "street" ? streetViewUrl : mapViewUrl;

  return (
    <button
      type="button"
      onClick={() => onClick(asset)}
      className={[
        "flex flex-col h-full w-full text-left overflow-hidden rounded-2xl border bg-white",
        "shadow-sm hover:shadow-md transition-shadow",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
      ].join(" ")}
    >
      <div className="relative flex-shrink-0 h-40">
        {!imgLoaded && !imgErrored && (
          <div className="h-40 w-full bg-slate-200 animate-pulse" />
        )}

        <img
          src={imageUrl}
          alt={`${imageMode} view of ${asset.obligorRef}`}
          className={[
            "w-full h-40 object-cover",
            !imgLoaded ? "hidden" : "",
          ].join(" ")}
          onLoad={() => setImgLoaded(true)}
          onError={() => {
            setImgErrored(true);
            setImgLoaded(true);
          }}
        />

        <div className="absolute left-3 top-3">
          <span className="inline-flex items-center gap-1 rounded-full bg-white/90 backdrop-blur px-2 py-1 text-xs font-medium text-slate-700 shadow-sm">
            {imageMode === "street" ? (
              <>
                <Camera className="h-3.5 w-3.5" aria-hidden="true" />
                Street View
              </>
            ) : (
              <>
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                Map
              </>
            )}
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold leading-tight min-h-[1.9rem]">
            {asset.obligorRef}
          </h3>
        </div>

        <div className="mt-1 flex items-start gap-1.5 text-slate-600">
          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <p className="text-xs leading-snug line-clamp-2">{asset.address}</p>
        </div>

        <div className="flex-1" />

        <div className="my-3 h-px w-full bg-slate-200" />

        <div className="mt-2 grid gap-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500">Sector:</span>
            <span className="font-medium text-slate-800">{asset.sector ?? "-"}</span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500">Valuation:</span>
            <span className="text-sm font-bold text-slate-900">{formattedValuation}</span>
          </div>
        </div>
      </div>
    </button>
  );
};
