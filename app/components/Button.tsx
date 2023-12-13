import cn from "classnames";
import Link from "next/link";
import React from "react";

import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";
import Spinner from "@/app/components/Spinner";

export interface IButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children?: ReactNode;
  href?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  loading?: boolean;
}

const Button = ({ children, className, href, loading, fullWidth, ...props }: IButtonProps) => (
  <button
    {...props}
    className={cn(
      "block rounded bg-primary-main p-2 text-center text-sm font-semibold text-white",
      className,
      loading ? "disabled:opacity-100" : "disabled:opacity-25",

      {
        "w-full": fullWidth,
      },
    )}
  >
    {loading ? (
      <Spinner />
    ) : href ? (
      <Link href={href} className="z-30">
        {children}
      </Link>
    ) : (
      children
    )}
  </button>
);

export default Button;
