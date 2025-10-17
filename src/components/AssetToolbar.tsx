import React from "react";
import { SaveIcon, Undo2 } from "lucide-react";

type Props = {
  isSaving: boolean;
  onSave: () => void;
  onSaveVersion: () => void;
  onOpenVersions: () => void;
  onBack: () => void;
};

export const AssetToolbar: React.FC<Props> = ({ isSaving, onSave, onSaveVersion, onOpenVersions, onBack }) => {
  return (
    <div className="mt-2 sm:mt-0 sm:ml-auto flex items-center gap-2">
      <button
        onClick={onSave}
        disabled={isSaving}
        className="flex items-center text-white bg-green-500 hover:bg-green-600 px-3 py-1 rounded text-xs disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        <SaveIcon className="mr-1" size={14} />
        {isSaving ? 'Saving...' : 'Save'}
      </button>

      <button
        onClick={onSaveVersion}
        className="whitespace-nowrap flex items-center text-xs px-3 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700"
      >
        Save Version
      </button>

      <button
        onClick={onOpenVersions}
        className="flex items-center text-xs px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
      >
        Versions
      </button>

      <button
        onClick={onBack}
        className="flex items-center text-xs px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
      >
        <Undo2 className="mr-1" size={14} /> Back
      </button>
    </div>
  );
};

export default AssetToolbar;