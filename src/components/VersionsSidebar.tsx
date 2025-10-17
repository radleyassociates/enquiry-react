import toast from 'react-hot-toast';
import React, { useEffect, useState } from 'react';
import { getVersions, saveVersion } from '../services/api';

type VersionItem = { id: string; enquiryId: string; description?: string; created?: string; outputs?: any };

export const VersionsSidebar: React.FC<{
  open: boolean;
  onClose: () => void;
  obligorRef?: string;
  customer?: string;
  currentEnquiryId?: string;
  onLoadVersion: (enquiryId: string) => Promise<void>;
}> = ({ open, onClose, obligorRef, customer, currentEnquiryId, onLoadVersion }) => {
  const [versions, setVersions] = useState<VersionItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    if (!open || !obligorRef || !customer) return;
    let mounted = true;
    setLoading(true);
    getVersions(obligorRef, customer)
      .then((res) => {
        if (!mounted) return;
        setVersions((res?.result as VersionItem[]) || []);
      })
      .catch(() => setVersions([]))
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, [open, obligorRef, customer]);

  const handleSaveSnapshot = async (baseEnquiryId?: string) => {
    const description = window.prompt('Snapshot description (blank ok):', '') ?? '';
    if (!baseEnquiryId) return toast.error('No version selected to snapshot.');
    const t = toast.loading('Saving snapshot...');
    try {
      const res = await saveVersion(baseEnquiryId, description);
      toast.success('Snapshot saved', { id: t });
      if (obligorRef && customer) {
        const r2 = await getVersions(obligorRef, customer);
        setVersions((r2?.result as VersionItem[]) || []);
      }
    } catch (err: any) {
      toast.error(err?.message ?? 'Failed to save snapshot', { id: t });
    }
  };

  return (
    <aside
      className={`fixed top-0 right-0 h-full w-[360px] bg-white shadow-lg z-50 transform transition-transform ${open ? 'translate-x-0' : 'translate-x-full'
        }`}
      role="dialog"
      aria-modal="true"
    >
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="font-semibold">Versions</h3>
        <div>
          <button onClick={onClose} className="text-xs px-2 py-1 bg-gray-100 rounded">Close</button>
        </div>
      </div>

      <div className="p-4 overflow-auto h-[calc(100%-64px)]">
        {!obligorRef || !customer ? (
          <div className="text-sm text-gray-500">No asset context to load versions.</div>
        ) : loading ? (
          <div className="text-sm text-gray-500">Loading...</div>
        ) : versions.length === 0 ? (
          <div className="text-sm text-gray-500">No versions found.</div>
        ) : (
          <ul className="space-y-2">
            {versions.map((v) => (
              <li key={v.enquiryId} className={`p-3 border rounded ${v.enquiryId === selected ? 'bg-blue-50 border-blue-200' : 'bg-white'}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-sm font-medium">{v.description || `Draft (${v.id || v.enquiryId})`}</div>
                    <div className="text-xs text-gray-500 mt-1">Created: {v.created || '—'}</div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => {
                        setSelected(v.id);
                        onLoadVersion(v.id);
                      }}
                      className="text-xs px-2 py-1 bg-gray-100 rounded"
                    >
                      Load
                    </button>

                    {/* <button
                      onClick={() => handleSaveSnapshot(v.id)}
                      className="text-xs px-2 py-1 bg-gray-100 rounded"
                    >
                      Snapshot
                    </button> */}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="p-4 border-t flex gap-2">
        <button
          onClick={() => handleSaveSnapshot(currentEnquiryId ?? undefined)}
          className="flex-1 text-sm bg-blue-600 text-white py-2 rounded"
        >
          Save Snapshot of Current
        </button>
        <button
          onClick={async () => {
            if (!obligorRef || !customer) return;
            setLoading(true);
            try {
              const r = await getVersions(obligorRef, customer);
              setVersions((r?.result as VersionItem[]) || []);
            } finally {
              setLoading(false);
            }
          }}
          className="text-sm px-3 py-2 bg-gray-100 rounded"
        >
          Refresh
        </button>
      </div>
    </aside>
  );
};
export default VersionsSidebar;