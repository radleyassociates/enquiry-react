import React, { useState, useEffect } from "react";

type Props = {
  offerPrice: number | null;
  minOffer: number;
  maxOffer: number;
  onOfferChange: (n: number) => void;
  onRerun: () => void;
  formatNumber: (v: number) => string;
};

export const PricingPanel: React.FC<Props> = ({ offerPrice, minOffer, maxOffer, onOfferChange, onRerun, formatNumber }) => {
  const [inputValue, setInputValue] = useState<string>(offerPrice !== null ? String(offerPrice) : '');

  useEffect(() => {
    setInputValue(offerPrice !== null ? String(offerPrice) : '');
  }, [offerPrice, inputValue]);

  const handleInputChange = (v: string) => {
    setInputValue(v);
    const num = Number(v.replace(/,/g, ''));
    if (!Number.isNaN(num)) {
      onOfferChange(num);
    }
  };

  const handleInputBlur = () => {
    if (inputValue.trim() === '') {
      setInputValue(offerPrice !== null ? String(offerPrice) : String(minOffer));
    } else {
      const n = Number(inputValue.replace(/,/g, ''));
      if (!Number.isNaN(n)) setInputValue(String(Math.max(minOffer, Math.min(maxOffer, n))));
      else setInputValue(offerPrice !== null ? String(offerPrice) : String(minOffer));
    }
  };

  return (
    <>
      <div className="mb-3 flex items-center gap-2">
        <button
          type="button"
          onClick={onRerun}
          className="w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg font-medium rounded-lg py-2 text-center"
        >
          Rerun analysis
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-2">
          <label className="text-gray-700 text-sm">Offer Price</label>
          <div className="flex items-center gap-2">
            <input
              min={minOffer}
              max={maxOffer}
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              onBlur={handleInputBlur}
              className="text-sm w-32 p-1 justify-end text-right
             border-transparent ring-transparent focus:border-gray-400 focus:ring-1 focus:ring-gray-400 focus:outline-none"
            />
            <div className="text-xs text-gray-500">US$</div>
          </div>
        </div>

        <div className="flex items-center space-x-2 mt-2">
          <input
            type="range"
            min={minOffer}
            max={maxOffer}
            step={1000}
            value={offerPrice ?? minOffer}
            onChange={(e) => onOfferChange(Number(e.target.value))}
            className="w-full h-1 bg-blue-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div className="flex justify-between text-[10px] text-gray-400 mt-1">
          <span>{`US$${formatNumber(minOffer)}`}</span>
          <span>{`US$${formatNumber(maxOffer)}`}</span>
        </div>
      </div>
    </>
  );
};

export default PricingPanel;