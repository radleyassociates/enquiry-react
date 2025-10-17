import React from "react";

type Props = {
  open: boolean;
  description: string;
  setDescription: (v: string) => void;
  isSaving: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export const VersionModal: React.FC<Props> = ({ open, description, setDescription, isSaving, onClose, onConfirm }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => { if (!isSaving) onClose(); }}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-lg mx-4 bg-white rounded-lg shadow-lg z-70">
        <div className="p-4">
          <label className="block text-xs text-gray-600 mb-2">Description (optional)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full text-sm p-2 border rounded-md resize-none"
            placeholder="Enter a description for this version (blank allowed)"
            disabled={isSaving}
          />
        </div>

        <div className="p-4 border-t flex justify-end gap-2">
          <button
            onClick={onClose}
            className="text-sm px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
            disabled={isSaving}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="text-sm px-3 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700"
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Version'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VersionModal;