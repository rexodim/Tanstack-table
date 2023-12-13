import cn from "classnames";
import React, { DetailedHTMLProps, FC, SelectHTMLAttributes } from "react";

type Option<T> = { label: string; value: T };

interface Props<TV> extends DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
  options?: Option<TV>[];
  fullWidth?: boolean;
}

const Select = <TV extends string | number>({ className, fullWidth, options, ...rest }: Props<TV>) => {
  return (
    <select
      {...rest}
      className={cn(
        className,
        "border-r-solid relative  rounded-lg border-r-8 border-r-transparent bg-white p-2 text-sm leading-[17.5px] text-gray-main placeholder-gray-placeholder outline outline-1 outline-gray-input disabled:opacity-25",
        {
          "w-full": fullWidth,
        },
      )}
    >
      {options?.map((i, index) => (
        <option key={index} value={i.value}>
          {i.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
