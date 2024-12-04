import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";

export type Option = {
  id: string | number;
  label: string;
};

type MultiSelectProps = {
  options: Option[];
  placeholder?: string;
  onChangeOptions: (options: Option[]) => void;
  initialOptions?: Option[];
  label: string;
};

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  placeholder = "Select currencies",
  onChangeOptions,
  initialOptions = [],
  label,
}) => {
  const [selectedOptions, setSelectedOptions] =
    useState<Option[]>(initialOptions);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const handleOptionClick = (option: Option) => {
    if (selectedOptions.find((selected) => selected.id === option.id)) {
      setSelectedOptions((prev) => {
        const selectedOptions = prev.filter(
          (selected) => selected.id !== option.id
        );

        onChangeOptions(selectedOptions);

        return selectedOptions;
      });
      return;
    }

    setSelectedOptions((prev) => {
      const selectedOptions = [...prev, option];

      onChangeOptions(selectedOptions);

      return selectedOptions;
    });
  };

  const removeOption = (optionId: string | number) => {
    setSelectedOptions((prev) => {
      const updatedOptions = prev.filter(
        (selected) => selected.id !== optionId
      );

      onChangeOptions(updatedOptions);

      return updatedOptions;
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-64">
      <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>
      <div
        className={clsx(
          "bg-white border border-gray-300 rounded px-3 cursor-pointer relative",
          {
            "py-1.5": selectedOptions.length === 0,
            "py-1": selectedOptions.length > 0,
          }
        )}
        onClick={toggleDropdown}
      >
        <div className="flex gap-2  overflow-auto mr-4">
          {selectedOptions.length > 0 ? (
            selectedOptions.map((option) => (
              <span
                key={option.id}
                className="flex items-center bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm"
              >
                {option.label}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeOption(option.id);
                  }}
                  className="ml-1 text-red-500 hover:text-red-700"
                >
                  &times;
                </button>
              </span>
            ))
          ) : (
            <span className="text-gray-400">{placeholder}</span>
          )}
        </div>
        <span className="absolute top-0 right-0 flex items-center h-full box-border p-1.5 ml-auto text-gray-600 bg-white">
          {isDropdownOpen ? "▲" : "▼"}
        </span>
      </div>

      {isDropdownOpen && (
        <div className="absolute z-10 bg-white border border-gray-300 rounded shadow-md mt-1 max-h-60 overflow-y-auto w-full">
          {options.map((option) => (
            <div
              key={option.id}
              className={clsx("px-3 py-1 cursor-pointer hover:bg-blue-100", {
                ["bg-blue-50"]: selectedOptions.find(
                  (selected) => selected.id === option.id
                ),
              })}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
