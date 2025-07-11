"use client";

import { Undo2 } from "lucide-react";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  return (
    <button onClick={() => router.back()}>
      <Undo2 className="text-yellow-500" />
    </button>
  );
};

export default BackButton;
