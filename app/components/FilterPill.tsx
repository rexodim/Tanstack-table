import cn from "classnames";
import React, { FC } from "react";
import { XCircleIcon, PlusCircleIcon, ChevronDownIcon } from "@heroicons/react/20/solid";

type Props = {
  handleAddClick?: VoidFunction;
  handleDeleteClick?: VoidFunction;
  value?: string;
  field?: string;
};

const FilterPill: FC<Props> = ({ handleAddClick, handleDeleteClick, value, field }) => {
  const hasFilter: boolean = !!value;
  const PrimaryIcon = hasFilter ? XCircleIcon : PlusCircleIcon;
  const handlePrimaryIconClick = hasFilter ? handleDeleteClick : handleAddClick;

  return (
    <div
      className={cn(
        "flex w-fit items-center  gap-1 rounded-[100px] border border-gray-soft p-[5px] text-xs font-medium leading-3 text-gray-main",
        {
          "border-dashed": !hasFilter,
        },
      )}
    >
      <div className="flex cursor-pointer items-center gap-1" onClick={handlePrimaryIconClick}>
        <PrimaryIcon className="h-3 w-3 text-gray-main" />
        {field}
      </div>
      {hasFilter && <hr className="h-3.5 w-[1px] bg-[#D6DBE0]" />}
      {hasFilter && (
        <div className="flex cursor-pointer items-center gap-1" onClick={handleAddClick}>
          <span className="text-[#007AFF]">{value}</span>
          <ChevronDownIcon className="h-3 w-3 text-gray-main" />
        </div>
      )}
    </div>
  );
};

export default FilterPill;
