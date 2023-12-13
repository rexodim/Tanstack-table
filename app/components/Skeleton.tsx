import React, { FC } from "react";

type Props = {
  width: string | number;
  height: string | number;
};

const Skeleton: FC<Props> = ({ width, height }) => {
  return (
    <div style={{ width, height }} className="animate-pulse">
      <div className="h-full w-full rounded-full bg-gray-100 dark:bg-gray-400" />
    </div>
  );
};

export default Skeleton;
