import React, { FC, ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

const ModalFooter: FC<Props> = ({ children }) => {
  return <div className="flex items-center">{children}</div>;
};

export default ModalFooter;
