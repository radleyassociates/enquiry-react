import React, { createContext, useContext, useEffect, useState } from "react";
import { Asset } from "types/asset";

type AssetsContextType = {
  assets: Asset[];
  setAssets: (a: Asset[]) => void;
  addAsset: (a: Asset) => void;
  updateAsset: (enquiryId: string, patch: Partial<Asset>) => void;
  removeAsset: (enquiryId: string) => void;
  clearAssets: () => void;
};

const AssetsContext = createContext<AssetsContextType | undefined>(undefined);
const STORAGE_KEY = "app_assets_v1";

export const AssetsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [assets, setAssetsState] = useState<Asset[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Asset[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(assets));
    } catch {
      // ignore storage errors
    }
  }, [assets]);

  const setAssets = (a: Asset[]) => setAssetsState(a);
  const addAsset = (a: Asset) => setAssetsState(prev => [a, ...prev]);
  const updateAsset = (enquiryId: string, patch: Partial<Asset>) =>
    setAssetsState(prev => prev.map(x => (String(x.enquiryId) === enquiryId ? { ...x, ...patch } : x)));
  const removeAsset = (enquiryId: string) =>
    setAssetsState(prev => prev.filter(x => String(x.enquiryId) !== enquiryId));
  const clearAssets = () => setAssetsState([]);

  return (
    <AssetsContext.Provider value={{ assets, setAssets, addAsset, updateAsset, removeAsset, clearAssets }}>
      {children}
    </AssetsContext.Provider>
  );
};

export const useAssets = (): AssetsContextType => {
  const ctx = useContext(AssetsContext);
  if (!ctx) throw new Error("useAssets must be used within AssetsProvider");
  return ctx;
};