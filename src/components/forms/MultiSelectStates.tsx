"use client";

import { useState, type FocusEvent } from "react";
import { Check, ChevronDown, Search, X } from "lucide-react";
import { usStates } from "@/lib/quote-validation";

type MultiSelectStatesProps = {
  selectedStates: string[];
  onChange: (states: string[]) => void;
  invalid?: boolean;
};

export default function MultiSelectStates({
  selectedStates,
  onChange,
  invalid = false,
}: MultiSelectStatesProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const filteredStates = usStates.filter(({ code, name }) =>
    `${name} ${code}`.toLowerCase().includes(query.trim().toLowerCase())
  );
  const selectedNames = selectedStates
    .map((code) => usStates.find((state) => state.code === code))
    .filter((state): state is (typeof usStates)[number] => Boolean(state));

  const closeOnBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setIsOpen(false);
    }
  };

  const toggleState = (code: string) => {
    onChange(
      selectedStates.includes(code)
        ? selectedStates.filter((selectedCode) => selectedCode !== code)
        : [...selectedStates, code]
    );
  };

  return (
    <div className="relative" onBlur={closeOnBlur}>
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-labelledby="lead-location-label"
        aria-describedby={invalid ? "lead-location-error" : undefined}
        aria-controls="lead-target-states"
        onClick={() => setIsOpen((open) => !open)}
        className={`w-full min-h-[50px] px-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all flex items-center justify-between gap-3 text-left ${
          invalid ? "border-red-400" : "border-gray-200"
        }`}
      >
        <span className={selectedNames.length ? "text-gray-900" : "text-gray-400"}>
          {selectedNames.length
            ? `${selectedNames.length} ${selectedNames.length === 1 ? "state" : "states"} selected`
            : "Search and select states"}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {selectedNames.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {selectedNames.map(({ code, name }) => (
            <span key={code} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              {name}
              <button
                type="button"
                aria-label={`Remove ${name}`}
                onClick={() => toggleState(code)}
                className="rounded-full hover:bg-primary/20 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}
        </div>
      )}

      {isOpen && (
        <div
          id="lead-target-states"
          className="absolute z-30 mt-2 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl"
        >
          <div className="p-3 border-b border-gray-100 relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="search"
              autoComplete="off"
              aria-label="Search U.S. states"
              placeholder="Search states..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
            />
          </div>
          <ul
            role="group"
            aria-label="Select target states"
            className="max-h-56 overflow-y-auto p-1"
          >
            {filteredStates.length ? (
              filteredStates.map(({ code, name }) => {
                const selected = selectedStates.includes(code);
                return (
                  <li key={code}>
                    <label className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 cursor-pointer text-sm text-gray-700">
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => toggleState(code)}
                        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <span className="flex-1">{name}</span>
                      {selected && <Check className="w-4 h-4 text-primary" />}
                    </label>
                  </li>
                );
              })
            ) : (
              <li className="px-3 py-2.5 text-sm text-gray-500" role="status">
                No states found.
              </li>
            )}
          </ul>
          <div className="border-t border-gray-100 p-2 text-right">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 rounded-lg text-sm font-medium text-primary hover:bg-primary/5"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
