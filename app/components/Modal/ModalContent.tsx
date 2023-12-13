import React, { FC, ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

const Modal: FC<Props> = ({ children }) => {
  return <div className="my-4">{children}</div>;
};

export default Modal;
