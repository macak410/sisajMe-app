"use client";

import clsx from "clsx";

const statusLabels: Record<string, string> = {
  confirmed: "Potvrđeno",
  pending: "Čeka potvrdu",
  declined: "Odbijeno",
};

const statusColors: Record<string, string> = {
  confirmed: "bg-green-600 text-white",
  pending: "bg-yellow-500 text-black",
  declined: "bg-red-600 text-white",
};

interface StatusBadgeProps {
  status: string;
}

const StatusBadge = ({ status }: StatusBadgeProps) => (
  <span
    className={clsx(
      "px-2 py-0.5 text-xs rounded-full whitespace-nowrap",
      statusColors[status]
    )}
  >
    {statusLabels[status] || status}
  </span>
);

export default StatusBadge;