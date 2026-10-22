"use client";

import { useRef, useState, type FocusEvent, type KeyboardEvent } from "react";
import { Check, Search } from "lucide-react";
import { usStates } from "@/lib/quote-validation";

type SearchableStateSelectProps = {
  id: string;
  value?: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  inputRef: (element: HTMLInputElement | null) => void;
  invalid?: boolean;
  describedBy?: string;
};

const otherOption = { code: "OTHER", name: "Other" };
const allOptions = [...usStates, otherOption];

export default function SearchableStateSelect({
  id,
  value = "",
  onChange,
  onBlur,
  inputRef,
  invalid = false,
  describedBy,
}: SearchableStateSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const previousValue = useRef(value);
  const selectedState = allOptions.find((state) => state.code === value);
  const filteredStates = allOptions.filter((state) =>
    `${state.name} ${state.code}`.toLowerCase().includes(query.trim().toLowerCase())
  );
  const displayValue = isOpen ? query : selectedState?.name ?? "";

  const closeList = (event: FocusEvent<HTMLDivElement>) => {
    if (event.currentTarget.contains(event.relatedTarget as Node | null)) return;
    setIsOpen(false);
    setQuery("");
    onBlur();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        setActiveIndex(0);
        return;
      }
      setIsOpen(true);
      setActiveIndex((index) => Math.min(index + 1, filteredStates.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, 0));
    } else if (event.key === "Enter" && isOpen && filteredStates.length > 0) {
      event.preventDefault();
      onChange(filteredStates[activeIndex]?.code ?? filteredStates[0].code);
      setIsOpen(false);
      setQuery("");
    } else if (event.key === "Escape" && isOpen) {
      event.preventDefault();
      onChange(previousValue.current);
      setIsOpen(false);
      setQuery("");
    }
  };

  return (
    <div className="relative" onBlur={closeList}>
      <input
        id={id}
        type="text"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={isOpen}
        aria-controls={`${id}-listbox`}
        aria-activedescendant={
          isOpen && filteredStates[activeIndex]
            ? `${id}-option-${filteredStates[activeIndex].code}`
            : undefined
        }
        aria-invalid={invalid}
        aria-describedby={describedBy}
        autoComplete="off"
        placeholder="Search or select a state"
        value={displayValue}
        onFocus={() => {
          previousValue.current = value;
          setQuery("");
          setActiveIndex(0);
          setIsOpen(true);
        }}
        onChange={(event) => {
          const nextQuery = event.currentTarget.value;
          setQuery(nextQuery);
          setActiveIndex(0);
          setIsOpen(true);
          onChange("");
        }}
        onKeyDown={handleKeyDown}
        className="w-full px-4 py-3 pr-11 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
      />
      <input ref={inputRef} type="hidden" name="state" value={value} />
      <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />

      {isOpen && (
        <ul
          id={`${id}-listbox`}
          role="listbox"
          aria-label="US states"
          className="absolute z-30 mt-2 max-h-60 w-full overflow-y-auto rounded-xl border border-gray-200 bg-white p-1 shadow-xl"
        >
          {filteredStates.length > 0 ? (
            filteredStates.map((state, index) => (
              <li
                key={state.code}
                id={`${id}-option-${state.code}`}
                role="option"
                aria-selected={value === state.code}
                className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm cursor-pointer ${
                  index === activeIndex
                    ? "bg-primary/10 text-primary"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => {
                  onChange(state.code);
                  setQuery("");
                  setIsOpen(false);
                }}
              >
                <span>{state.name}</span>
                {value === state.code && <Check className="w-4 h-4" />}
              </li>
            ))
          ) : (
            <li className="px-3 py-2.5 text-sm text-gray-500" role="status">
              No states found.
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
