import React from "react";

interface IProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

export const CancelButton = ({ children, onClick, disabled }: IProps) => {
  return (
    <button
      type="button"
      className="inline-flex justify-center rounded-md border border-transparent bg-gray-50 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-violet-100 focus:outline-none duration-300"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export const DeleteButton = () => {};
