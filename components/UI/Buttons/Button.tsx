import React from "react";
type TProps = {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

export const CancelButton = ({ children, onClick, disabled }: TProps) => {
  return (
    <button
      type="button"
      className="inline-flex justify-center rounded-md border border-transparent
       bg-gray-50 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-violet-100 
         focus:outline-none duration-300"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export const SubmitButton = ({ children, disabled }: TProps) => {
  return (
    <button
      type="submit"
      className="bg-violet-400 text-white text-sm px-5 py-1.5 border 
                  border-transparent rounded-md hover:bg-violet-500 duration-200 focus:outline-none "
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export const ConfirmButton = ({ children, disabled }: TProps) => {
  return (
    <button
      type="button"
      className="flex items-center bg-violet-400 text-white text-sm px-4 py-2 border 
                border-transparent rounded-md hover:bg-violet-500 duration-200 font-medium
                focus:outline-none"
    >
      {children}
    </button>
  );
};

export const DeleteButton = ({ children, onClick }: TProps) => {
  return (
    <button
      type="button"
      className="inline-flex justify-center rounded-md border 
                border-transparent bg-red-500 px-4 py-2 text-sm font-medium 
                text-white hover:bg-red-600 hover:text-white focus:outline-none 
                duration-300"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
