"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const SuccessPage = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/sign-in");
    }, 3000); // 3 sekunde

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="center-page text-center space-y-4">
      <h1 className="heading-h2 text-green-500">Uspješno ste kreirali račun 🎉</h1>
      <p className="regular-text text-gray-500">
        Preusmjeravamo vas na prijavu...
      </p>
    </div>
  );
};

export default SuccessPage;