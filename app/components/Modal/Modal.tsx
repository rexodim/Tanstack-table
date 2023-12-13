import React, { FC, ReactNode } from "react";
import cn from "classnames";

type Position = {
  top?: number | string;
  bottom?: number | string;
  left?: number | string;
  right?: number | string;
};

type Props = {
  open: boolean;
  close?: VoidFunction;
  children?: ReactNode;
  disableBackdrop?: boolean;
  position?: Position;
};

const Modal: FC<Props> = ({ open, children, disableBackdrop = false, position, close }) => {
  if (!open) return null;

  return (
    <>
      <div
        style={position}
        className={cn(
          "z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none",
          !!position ? "absolute" : "fixed inset-0",
        )}
      >
        <div className="relative mx-auto w-auto max-w-3xl">
          <div className="relative flex w-full flex-col rounded-xl border border-solid border-[#DEDFE2] bg-white p-4 shadow-lg outline-none focus:outline-none">
            {children}
          </div>
        </div>
      </div>
      <div
        className={cn("fixed inset-0 z-40 bg-black opacity-0", {
          "opacity-25": !disableBackdrop,
        })}
        onClick={close}
      />
    </>
  );
};

export default Modal;
