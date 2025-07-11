import React, { FC } from "react";
import type { FieldError } from "react-hook-form";

interface FormRowProps {
  children: React.ReactNode;
  label?: string;
  htmlFor?: string;
  error?: string;
}

const FormRow: FC<FormRowProps> = ({ children, label, htmlFor, error }) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-lg font-medium mb-2.5" htmlFor={htmlFor}>
          {label}
        </label>
      )}
      {children}
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};

export default FormRow;
