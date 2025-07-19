"use client";

import { ArrowLeftCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  return (
    <div className="flex justify-center mt-6">
      <button
        onClick={() => router.back()}
        className="group flex items-center gap-2 bg-neutral-800 px-4 py-2 rounded-full text-yellow-500 hover:bg-neutral-700 transition-all duration-300"
      >
        <ArrowLeftCircle className="h-6 w-6 transition-transform duration-300 group-hover:-translate-x-1" />
        
        <span className="overflow-hidden max-w-0 group-hover:max-w-[80px] transition-all duration-300 group-hover:text-white">
          Natrag
        </span>
      </button>
    </div>
  );
};

export default BackButton;