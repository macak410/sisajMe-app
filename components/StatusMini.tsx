import clsx from "clsx";
import { Ban, CircleCheck, CircleEllipsis } from "lucide-react";
import { FC } from "react";

interface StatusMiniProps {
  status: "confirmed" | "pending" | "declined";
}

const statusConfig: Record<StatusMiniProps["status"], {
  label: string;
  bg: string;
  text: string;
  icon: JSX.Element;
}> = {
  confirmed: {
    label: "Potvrđeno",
    bg: "bg-green-600/10",
    text: "text-green-600",
    icon: <CircleCheck className="w-4 h-4" />,
  },
  pending: {
    label: "Čeka potvrdu",
    bg: "bg-yellow-600/10",
    text: "text-yellow-600",
    icon: <CircleEllipsis className="w-4 h-4" />,
  },
  declined: {
    label: "Odbijeno",
    bg: "bg-red-600/10",
    text: "text-red-600",
    icon: <Ban className="w-4 h-4" />,
  },
};

const StatusMini: FC<StatusMiniProps> = ({ status }) => {
  const config = statusConfig[status];

  return (
    <div
      className={clsx(
        "inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium mx-auto sm:mx-0",
        config.bg,
        config.text
      )}
    >
      {config.icon}
      <span>{config.label}</span>
    </div>
  );
};

export default StatusMini;