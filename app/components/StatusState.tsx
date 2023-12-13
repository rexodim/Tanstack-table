import cn from "classnames";
import { FC } from "react";
import { ClockIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { Status } from "@/app/types";

type Props = { value?: Status };

const COLORS = {
  [Status.Draft]: "border-gray-soft bg-gray-soft text-[#6E7686] bg-opacity-30",
  [Status.Pending]: "border-[#FFE663] bg-[#FFE663] text-[#FF9900] bg-opacity-30",
  [Status.Complete]: "border-[#B8EF81] bg-[#B8EF81] text-[#478524] bg-opacity-30",
};

const ICONS = {
  [Status.Draft]: ClockIcon,
  [Status.Pending]: ClockIcon,
  [Status.Complete]: CheckCircleIcon,
};

const StatusState: FC<Props> = ({ value }) => {
  if (!value) return;
  const Icon = ICONS[value];

  return (
    <div
      className={cn(
        "flex w-fit items-center gap-1 rounded border border-solid p-1 text-xs font-medium leading-3",
        COLORS[value],
      )}
    >
      {value}
      <Icon className="h-3 w-3" />
    </div>
  );
};

export default StatusState;
