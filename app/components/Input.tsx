import cn from "classnames";
import React, { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  fullWidth?: boolean;
}

const Input: FC<Props> = ({ className, fullWidth, ...rest }) => {
  return (
    <input
      {...rest}
      className={cn(
        className,
        "relative rounded-lg border border-solid border-gray-input bg-white p-2 text-sm leading-[17.5px] text-gray-main placeholder-gray-placeholder outline-none focus:outline-none disabled:opacity-25",
        {
          "w-full": fullWidth,
        },
      )}
    />
  );
};

export default Input;
