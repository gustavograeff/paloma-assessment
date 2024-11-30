import { forwardRef, SelectHTMLAttributes } from "react";

type InputSelectProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "children"
> & {
  placeholder?: string;
  label: string;
  options: { value: string; label: string }[];
};

const InputSelect = forwardRef<HTMLSelectElement, InputSelectProps>(
  (
    { label, placeholder, options, value, className, ...rest },
    ref
  ): JSX.Element => {
    return (
      <div className={className}>
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <select
          ref={ref}
          value={value}
          className="mt-1 p-1 block border-2 rounded-sm border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 hover:cursor-pointer"
          {...rest}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

InputSelect.displayName = "InputSelect";

export default InputSelect;
