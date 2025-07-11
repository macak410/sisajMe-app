import React, { FC } from "react";

interface StateCardProps {
  state: "confirmed" | "pending" | "declined";
  count: number;
  label: string;
  icon: React.ElementType;
}

const StateCard: FC<StateCardProps> = ({
  state,
  count = 0,
  label,
  icon: Icon,
}) => {
  const colors = {
    confirmed: "#008450",
    pending: "#EFB700",
    declined: "#B81D13",
  };

  return (
    <div className="flex flex-1 items-center gap-6 rounded-2xl p-6 bg-dark-500 border border-dark-700 shadow-lg">
      <Icon size={64} color={colors[state]} />
      <div>
        <h4 className="text-xl font-medium text-textGray-500">{label}</h4>
        <p className="text-4xl font-bold">{count}</p>
      </div>
    </div>
  );
};

export default StateCard;
