import React, { useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { Asset } from '../types/asset';
import { AssetGalleryItem } from '../components/AssetGalleryItem';
import { AssetTableView } from '../components/AssetTableView';
import { LayoutGrid, List, Camera, MapPin, Search, Plus } from 'lucide-react';

export const AssetAnalysisPage: React.FC = () => {
  const location = useLocation();
  const assets = location.state?.assets as Asset[] | undefined;

  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [displayMode, setDisplayMode] = useState<'gallery' | 'list'>('gallery');
  const [galleryImageMode, setGalleryImageMode] = useState<'street' | 'map'>('street');

  if (!assets) {
    return <Navigate to="/login" />;
  }

  const handleAssetSelect = (asset: Asset) => {
    setSelectedAsset(prev => prev?.enquiryId === asset.enquiryId ? null : asset);
  };

  const handleImageModeToggle = () => {
    setGalleryImageMode(prevMode => prevMode === 'street' ? 'map' : 'street');
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-8 py-2 flex items-center justify-between">
      <div className="flex flex-col w-full font-sans bg-slate-50">
        <div className="flex-shrink-0 p-4 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-800">Assets</h2>
          <p className="text-sm text-slate-500">{assets.length} properties found</p>
          <div className="flex items-center gap-2 mt-4">
            <div className="relative flex-grow">
              <Search className="absolute w-5 h-5 top-2.5 left-3 text-slate-400" strokeWidth={2} />
              <input type="text" placeholder="Search assets..." disabled
                className="w-full pl-10 pr-4 py-2 text-sm border rounded-md border-slate-300 bg-slate-100 cursor-not-allowed"
              />
            </div>
            <button disabled className="p-2 text-white bg-blue-300 rounded-md cursor-not-allowed">
              <Plus className="w-5 h-5" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between flex-shrink-0 p-2 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="flex p-1 bg-slate-100 rounded-md">
              <button onClick={() => setDisplayMode('gallery')} className={`p-1.5 rounded ${displayMode === 'gallery' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}>
                <LayoutGrid size={20} />
              </button>
              <button onClick={() => setDisplayMode('list')} className={`p-1.5 rounded ${displayMode === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}>
                <List size={20} />
              </button>
            </div>

            {displayMode === 'gallery' && (
              <button
                onClick={handleImageModeToggle}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 bg-slate-100 rounded-md hover:bg-slate-200"
              >
                {galleryImageMode === 'street' ? (
                  <>
                    <MapPin size={16} />
                    <span>Map View</span>
                  </>
                ) : (
                  <>
                    <Camera size={16} />
                    <span>Street View</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {displayMode === 'gallery' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
              {assets.map((asset) => (
                <AssetGalleryItem
                  key={asset.enquiryId}
                  asset={asset}
                  isSelected={selectedAsset?.enquiryId === asset.enquiryId}
                  onClick={() => handleAssetSelect(asset)}
                  imageMode={galleryImageMode}
                />
              ))}
            </div>
          ) : (
            <AssetTableView
              assets={assets}
              selectedAsset={selectedAsset}
              onAssetSelect={handleAssetSelect}
            />
          )}
        </div>
      </div>
    </div>
  );
};