import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionSectionProps {
  title: string;
  children: React.ReactNode;
  startCollapsed?: boolean;
}

export const AccordionSection: React.FC<AccordionSectionProps> = ({ title, children, startCollapsed = false }) => {
  const [isCollapsed, setIsCollapsed] = useState(startCollapsed);

  return (
    <div className="mb-4 bg-white border rounded-lg shadow-sm border-slate-200">
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="flex items-center justify-between w-full p-3 font-semibold text-left text-slate-800"
      >
        <span>{title}</span>
        <ChevronDown
          size={20}
          className={`text-slate-500 transition-transform duration-300 ${!isCollapsed ? 'rotate-180' : ''}`}
        />
      </button>
      {!isCollapsed && (
        <div className="px-4 pb-4 border-t border-slate-200">
          {children}
        </div>
      )}
    </div>
  );
};