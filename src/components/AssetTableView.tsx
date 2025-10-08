import React from 'react';
import { Asset } from '../types/asset';

interface AssetTableViewProps {
  assets: Asset[];
  onAssetSelect: (asset: Asset) => void;
}

export const AssetTableView: React.FC<AssetTableViewProps> = ({ assets, onAssetSelect }) => {
  if (!assets || assets.length === 0) {
    return (
      <div className="w-full py-8 text-center text-sm text-slate-600">
        No assets to display.
      </div>
    );
  }

  return (
    <div className="w-full p-4 space-y-4">
      <ul className="sm:hidden space-y-3">
        {assets.map((asset) => (
          <li
            key={asset.enquiryId}
            onClick={() => onAssetSelect(asset)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onAssetSelect(asset)}
            className="border rounded-lg p-3 shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-slate-800">{asset.obligorRef}</div>
              <div className="text-xs text-slate-500">{asset.zipcode}</div>
            </div>

            <div className="text-sm text-slate-700 mb-2">{asset.address}</div>

            <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
              <div>
                <div className="font-semibold text-slate-700">Sector</div>
                <div>{asset.sector ?? '-'}</div>
              </div>
              <div>
                <div className="font-semibold text-slate-700">Status</div>
                <div>{asset.status ?? '-'}</div>
              </div>
              <div>
                <div className="font-semibold text-slate-700">Fund</div>
                <div>{asset.fund ?? '-'}</div>
              </div>
              <div>
                <div className="font-semibold text-slate-700">Valuation</div>
                <div>{typeof asset.currentValuation === 'number' ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(asset.currentValuation) : '-'}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="hidden sm:block w-full overflow-auto rounded-md border">
        <table className="w-full min-w-[760px] text-sm text-left text-gray-600">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 sticky top-0">
            <tr>
              <th scope="col" className="px-4 py-3 text-left">Deal Ref</th>
              <th scope="col" className="px-4 py-3 text-left">Address</th>
              <th scope="col" className="px-4 py-3 text-left">Postal Code</th>
              <th scope="col" className="px-4 py-3 text-left">Sector</th>
              <th scope="col" className="px-4 py-3 text-left">Status</th>
              <th scope="col" className="px-4 py-3 text-left">Fund</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => {
              return (
                <tr
                  key={asset.enquiryId}
                  onClick={() => onAssetSelect(asset)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onAssetSelect(asset)}
                  className={`border-b cursor-pointer transition-colors duration-150`}
                >
                  <td className="px-4 py-3 align-top font-medium truncate max-w-[160px]">{asset.obligorRef}</td>
                  <td className="px-4 py-3 align-top max-w-[360px] truncate">{asset.address}</td>
                  <td className="px-4 py-3 align-top truncate">{asset.zipcode}</td>
                  <td className="px-4 py-3 align-top truncate">{asset.sector}</td>
                  <td className="px-4 py-3 align-top truncate">{asset.status}</td>
                  <td className="px-4 py-3 align-top truncate">{asset.fund}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};