import { forwardRef, InputHTMLAttributes } from "react";

type InputTextProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

const InputText = forwardRef<HTMLInputElement, InputTextProps>(
  ({ label, ...rest }: InputTextProps, ref): JSX.Element => {
    return (
      <div>
        {label && (
          <label
            htmlFor={rest.id}
            className="mb-1 text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          className="block border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 border-gray-300"
          {...rest}
        />
      </div>
    );
  }
);

InputText.displayName = "InputText";

export default InputText;
