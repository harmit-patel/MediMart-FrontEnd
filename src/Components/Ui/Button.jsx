import React from "react";

export function Button({ className, children, ...props }) {
  return (
    <button
      className={`px-4 py-2 rounded-md font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}