import React from "react";

export default function FormField({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder = "",
  min,
  max,
  step,
}) {
  return (
    <div className="flex flex-col gap-1.5 mb-4">
      <label className="text-sm font-semibold text-gray-700 flex items-center">
        {label}
        {required && (
          <span className="text-red-500 ml-1" title="Required">
            *
          </span>
        )}
      </label>

      <input
        className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg 
                   text-gray-900 text-sm outline-none transition-all duration-200
                   placeholder:text-gray-400
                   focus:border-blue-500 focus:ring-4 focus:ring-blue-100
                   disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
      />
    </div>
  );
}
