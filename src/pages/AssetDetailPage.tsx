import { SaveIcon, Undo2 } from 'lucide-react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { formatNumber } from '../utils/number';
import loadingGif from '../assets/loading4b.gif';
import { Asset, AssetResult } from '../types/asset';
import { useAssets } from '../contexts/AssetsContext';
import { InputSlider } from '../components/InputSlider';
import { AccordionSection } from '../components/AccordionSection';
import { fetchAndMapAssetData, updateApiEnquiry } from '../services/api';

const tabs = [
  'Initial Valuation', 'Value Sensitivity', 'Headlines', 'Cashflow Chart',
  'IRR', 'Leases', 'Cashflows - Asset', 'Cashflows - Unit',
  'Cashflows - Expenses', 'Values Forecast', 'Macro Economy', 'Internal MLA Assumptions'
];

export const AssetEnquiryView: React.FC = () => {
  const navigate = useNavigate();
  const { enquiryId } = useParams<{ enquiryId: string }>();

  const [enquiry, setEnquiry] = useState<AssetResult | any | null>(null);
  const [activeTab, setActiveTab] = useState('Initial Valuation');
  const [loading, setLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [assetData, setAssetData] = useState<Asset | null>(null);
  const { assets } = useAssets();

  const initialOfferBaselineRef = useRef<number | null>(null);

  useEffect(() => {
    const found = assets?.find?.((a: any) => String(a.enquiryId) === String(enquiryId));
    setAssetData(found || null);

    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchAndMapAssetData(enquiryId as string);
        setEnquiry(data);
      } catch (err: any) {
        setError(err?.message || 'An unknown error occurred during data fetching.');
      } finally {
        setLoading(false);
      }
    };

    if (enquiryId) {
      loadData();
    } else {
      setLoading(false);
      setError('Enquiry ID not provided in the URL.');
    }
  }, [enquiryId, assets]);

  useEffect(() => {
    if (!enquiry || initialOfferBaselineRef.current !== null) return;
    const initial =
      (typeof enquiry?.buildings?.[0]?.currentValuation !== 'undefined'
        ? enquiry?.buildings?.[0]?.currentValuation
        : enquiry?.currentValuation) ?? null;

    const parsed =
      typeof initial === 'string' ? Number(initial) : (typeof initial === 'number' ? initial : null);

    if (parsed !== null && !Number.isNaN(parsed)) {
      initialOfferBaselineRef.current = parsed;
    }
  }, [enquiry]);

  const handleRerun = async () => {
    try {
      setError(null);
    } catch (err: any) {
      setError(err?.message ?? 'Failed to rerun analysis.');
    }
  };

  const handleSave = async () => {
    if (!enquiry) {
      setError('No enquiry data to save.');
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      const response = await updateApiEnquiry(enquiry);
      if (response.status !== 200) {
        throw new Error(response.message || `Failed to save. Server returned status ${response.status}`);
      }
      alert('Save successful!');

    } catch (err: any) {
      setError(err?.message ?? 'An unknown error occurred while saving.');
    } finally {
      setIsSaving(false);
    }
  };

  const offerPrice: number | null = useMemo(() => {
    const val =
      (typeof enquiry?.buildings?.[0]?.currentValuation !== 'undefined'
        ? enquiry?.buildings?.[0]?.currentValuation
        : enquiry?.currentValuation) ?? null;

    const parsed =
      typeof val === 'string' ? Number(val) : (typeof val === 'number' ? val : null);

    if (parsed === null || Number.isNaN(parsed)) return null;
    return parsed;
  }, [enquiry]);

  const { minOffer, maxOffer } = useMemo(() => {
    const baseline = initialOfferBaselineRef.current ?? offerPrice ?? 0;
    const min = Math.max(0, Math.floor(baseline * 0.5));
    const max = Math.max(min + 1000, Math.ceil(baseline * 1.5));
    return { minOffer: min, maxOffer: max };
  }, [offerPrice]);

  const handleOfferChange = (next: number) => {
    setEnquiry((prev: any) => {
      if (!prev) return prev;

      const hasBuildings = Array.isArray(prev.buildings) && prev.buildings.length > 0;

      const nextBuildings = hasBuildings
        ? [{ ...prev.buildings[0], currentValuation: next }, ...prev.buildings.slice(1)]
        : prev.buildings;

      return {
        ...prev,
        currentValuation: next,
        ...(hasBuildings ? { buildings: nextBuildings } : {}),
      };
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <img src={loadingGif} alt="Loading..." className="mx-auto" />
          <p className="mt-3 text-sm text-slate-600">Loading asset data…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 font-sans text-sm">
      <nav className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 bg-white p-3 rounded-md shadow-sm">
        <div className="flex items-center gap-2 flex-wrap">
          <button className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded font-semibold text-xs">
            Executive
          </button>
          {['Rent Roll', 'Expenses', 'Debt', 'Assumptions'].map(item => (
            <button key={item} className="hover:bg-gray-200 px-3 py-1 rounded text-xs">
              {item}
            </button>
          ))}
        </div>

        <div className="mt-2 sm:mt-0 sm:ml-auto flex items-center gap-2">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center text-white bg-green-500 hover:bg-green-600 px-3 py-1 rounded text-xs disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <SaveIcon className="mr-1" size={14} />
            {isSaving ? 'Saving...' : 'Save'}
          </button>

          <button
            onClick={() => navigate('/assets')}
            className="flex items-center text-xs px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
          >
            <Undo2 className="mr-1" size={14} /> Back
          </button>
        </div>

        <div className="w-full sm:w-auto sm:ml-6 text-xs text-slate-600 mt-1 sm:mt-0">
          Deal ref: <span className="font-medium text-slate-800">{assetData?.obligorRef ?? '—'}</span>
        </div>
      </nav>

      {error && (
        <div className="mt-3">
          <div className="flex items-center justify-between bg-rose-50 border border-rose-200 text-rose-700 px-4 py-2 rounded">
            <div className="text-sm">{error}</div>
            <button onClick={() => setError(null)} className="text-sm px-2 py-1 bg-rose-100 rounded">
              Dismiss
            </button>
          </div>
        </div>
      )}

      <div className="mt-4 grid grid-cols-1 lg:grid-cols-8 gap-4 px-4">
        <aside className="lg:col-span-2 space-y-4">
          <button
            type="button"
            onClick={handleRerun}
            className="w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg py-2 text-center"
          >
            Rerun analysis
          </button>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="font-semibold text-gray-700 mb-3">Pricing</h3>

            <div className="text-gray-600 mb-4">
              <div className="flex justify-between items-center mb-1">
                <label className="text-gray-700 text-sm">Offer Price:</label>
                <span className="text-xs font-semibold">
                  {offerPrice !== null ? `US$${formatNumber(offerPrice)}` : '—'}
                </span>
              </div>

              <div className="flex items-center space-x-2 mt-2">
                <input
                  type="range"
                  min={minOffer}
                  max={maxOffer}
                  step={1000}
                  value={offerPrice ?? minOffer}
                  onChange={(e) => handleOfferChange(Number(e.target.value))}
                  className="w-full h-1 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>{`US$${formatNumber(minOffer)}`}</span>
                <span>{`US$${formatNumber(maxOffer)}`}</span>
              </div>
            </div>
          </div>

          <AccordionSection title="Valuation">
            <div className="mt-4 space-y-3">
              <InputSlider label="Exit Cap Rate" value={10.7} />
              <InputSlider label="Discount Rate" value={13.6} />
              <InputSlider label="Sales Costs" value={7.4} />
            </div>
          </AccordionSection>

          <AccordionSection title="Rental Assumptions">
            <div className="mt-4">
              <InputSlider label="Rental Value Growth" value={5.6} />
            </div>
          </AccordionSection>

          <div className="flex flex-col gap-2">
            <button className="w-full text-center text-blue-600 border border-blue-600 hover:bg-blue-50 py-2 rounded text-xs font-medium">
              Change ERV for all units
            </button>
          </div>
        </aside>

        <main className="lg:col-span-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-bold text-gray-600 mb-2 border-b pb-1">Asset Summary</h3>
              <div className="text-xs mt-2">
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                  <div className="text-gray-500">Type</div>
                  <div className="text-gray-800 font-medium">{assetData?.sector ?? '—'}</div>

                  <div className="text-gray-500">Market Rent</div>
                  <div className="text-gray-800 font-medium">
                    US${formatNumber(10273645)}{' '}
                    <span className="text-gray-400 text-xs ml-2">({'US$27.3 PSF'})</span>
                  </div>

                  <div className="text-gray-500">Occupancy</div>
                  <div className="text-gray-800 font-medium">0%</div>

                  <div className="text-gray-500">Contracted Rent</div>
                  <div className="text-gray-800 font-medium">
                    US${formatNumber(8035255)}{' '}
                    <span className="text-gray-400 text-xs ml-2">({'US$21.35 PSF'})</span>
                  </div>

                  <div className="text-gray-500">Cap Rate NTM</div>
                  <div className="text-gray-800 font-medium">-69,907,772.87%</div>
                </dl>
              </div>
            </div>

            <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-bold text-gray-600 mb-2 border-b pb-1">Results</h3>
              <div className="text-xs">
                <table className="w-full">
                  <thead>
                    <tr className="text-gray-500">
                      <th className="font-normal text-left pb-1"></th>
                      <th className="font-medium text-right pb-1">This Run</th>
                      <th className="font-normal text-right pb-1 border-l pl-2">Previous Run</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="h-6">
                      <td className="text-gray-500">IRR:</td>
                      <td
                        className={`text-right font-bold bg-yellow-50 px-2 rounded ${enquiry?.apiOutputs?.irrmean >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}
                      >
                        {Math.abs(enquiry?.apiOutputs?.irrmean ?? 0)}%
                        <span className="text-xs ml-1">
                          {enquiry?.apiOutputs?.irrmean >= 0 ? '⬆' : '⬇'}
                        </span>
                      </td>
                      <td className="text-right text-gray-800 border-l pl-2">73.12%</td>
                    </tr>
                    <tr className="h-6">
                      <td className="text-gray-500">Present Val:</td>
                      <td
                        className={`text-right font-bold bg-yellow-50 px-2 rounded ${enquiry?.apiOutputs?.dcfmean >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}
                      >
                        US${formatNumber(Math.abs(enquiry?.apiOutputs?.dcfmean ?? 0))}
                        <span className="text-xs ml-1">
                          {enquiry?.apiOutputs?.dcfmean >= 0 ? '⬆' : '⬇'}
                        </span>
                      </td>
                      <td className="text-right text-gray-800 border-l pl-2">US$137,555,166.86</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="bg-white border-b border-gray-300">
            <div
              className="overflow-x-auto overflow-y-hidden"
              style={{ top: 'var(--header-height, 64px)' }}
            >
              <div className="inline-flex whitespace-nowrap min-w-max bg-gray-100">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-shrink-0 text-xs px-4 py-2 border-r border-gray-300 last:border-r-0 transition-colors
                      ${activeTab === tab
                        ? 'bg-white text-blue-600 border-t-2 border-blue-600 -mb-[1px]'
                        : 'text-gray-600 hover:bg-gray-200'
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-300 h-[60vh] mt-0.5 rounded-b-lg shadow-md p-4 overflow-auto">
            <p className="text-gray-400 italic">
              Content area for the selected tab is currently blank as requested (No charts yet).
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};
