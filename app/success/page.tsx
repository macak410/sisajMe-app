"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";

const SuccessPage = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/sign-in");
    }, 3000); // Redirect za 3 sekunde

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex h-screen min-h-screen px-[5%]">
      <div className="m-auto flex flex-col items-center justify-between gap-10 py-10">
        <Link href="/" className="mb-8">
          <Image
            src="/assets/imgs/logo-barbershop.jpg"
            width={1000}
            height={1000}
            alt="logo"
            className="h-40 w-fit"
          />
        </Link>

        <section className="flex flex-col items-center text-center">
          <Image
            src="/assets/imgs/confirmed.gif"
            width={150}
            height={150}
            alt="success"
          />
          <h1 className="heading-h1 max-w-[42rem] text-center">
            Račun je{" "}
            <span className="text-green-500">uspješno</span> kreiran 🎉
          </h1>
          <p className="text-textGray-500 mt-2.5 mb-8">
            Preusmjeravamo vas na prijavu...
          </p>
          <Button href="/sign-in">Prijavite se ručno</Button>
        </section>
      </div>
    </div>
  );
};

export default SuccessPage;