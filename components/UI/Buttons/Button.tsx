import React from "react";

type ButtonTypes = "button" | "submit" | "reset";

interface IProps {
  type: ButtonTypes;
  className: string;
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const ConfirmModalButton = ({
  type,
  className,
  children,
  onClick,
}: IProps) => {
  return (
    <button type={type} className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export const DeleteButton = () => {};

// export default ConfirmModalButton;
