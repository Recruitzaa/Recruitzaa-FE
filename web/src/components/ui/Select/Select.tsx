import React, { useState, useRef, useEffect, useId } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  label?: string;
  options: (SelectOption | string)[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

export const Select: React.FC<CustomSelectProps> = ({
  label,
  options,
  value,
  onChange,
  className = '',
  placeholder = 'Select an option',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selectId = useId();

  // Normalize options to SelectOption[]
  const normalizedOptions = options.map((opt) =>
    typeof opt === 'string' ? { value: opt, label: opt } : opt
  );

  const selectedOption = normalizedOptions.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col space-y-1 w-full text-left ${className}`}
    >
      {label && (
        <label
          htmlFor={selectId}
          className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <button
          id={selectId}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full border border-slate-200 hover:border-brand-primary rounded-lg px-3 py-2 text-xs bg-white text-slate-800 outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all shadow-sm min-h-[36px]"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span className={selectedOption ? 'text-slate-800' : 'text-slate-400'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown
            size={14}
            className={`text-slate-400 transition-transform duration-250 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isOpen && (
          <ul
            className="absolute z-50 w-full mt-1.5 bg-white border border-slate-200 rounded-lg shadow-lg max-h-60 overflow-y-auto py-1"
            role="listbox"
          >
            {normalizedOptions.length === 0 ? (
              <li className="px-3 py-2 text-xs text-slate-400">No options available</li>
            ) : (
              normalizedOptions.map((opt) => {
                const isSelected = opt.value === value;
                return (
                  <li
                    key={opt.value}
                    onClick={() => handleSelect(opt.value)}
                    className={`flex items-center justify-between px-3 py-2 text-xs cursor-pointer select-none transition-colors ${
                      isSelected
                        ? 'bg-brand-primary-light text-brand-primary font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                    role="option"
                    aria-selected={isSelected}
                  >
                    <span>{opt.label}</span>
                    {isSelected && <Check size={12} className="text-brand-primary" />}
                  </li>
                );
              })
            )}
          </ul>
        )}
      </div>
    </div>
  );
};
