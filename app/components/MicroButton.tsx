import cn from "classnames";
import Link from "next/link";
import React from "react";

import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

export interface IButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children?: ReactNode;
  fullWidth?: boolean;
}

const MicroButton = ({ children, className, fullWidth, ...props }: IButtonProps) => (
  <button
    {...props}
    className={cn(
      "flex items-center justify-center rounded-md border border-solid border-gray-input bg-white px-2 py-1.5 text-xs font-semibold text-gray-bold shadow-sm disabled:opacity-50",
      className,
      {
        "w-full": fullWidth,
      },
    )}
  >
    {children}
  </button>
);

export default MicroButton;
