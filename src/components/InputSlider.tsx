
interface SliderProps {
  label: string;
  value: number;
  unit?: string;
}

export const InputSlider: React.FC<SliderProps> = ({ label, value, unit = '%' }) => (
  <div className="mb-4">
    <label className="text-gray-700 text-sm block mb-1">{label}</label>
    <div className="flex items-center space-x-2">
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        onChange={() => { /* Placeholder for functionality */ }}
      />
      <span className="text-xs font-semibold text-blue-600 w-12 text-right">{value}{unit}</span>
    </div>
  </div>
);