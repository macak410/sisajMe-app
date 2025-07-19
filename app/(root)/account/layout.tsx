import Image from "next/image";
import Link from "next/link";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="container my-auto">
        <div className="sub-container max-w-[1400px] justify-between">
          <div className="w-full mb-12 text-center md:text-left">
            <Link href="/account" className="inline-block">
              <Image
                src="/assets/imgs/logo-barbershop.jpg"
                width={1000}
                height={1000}
                alt="logo"
                className="h-40 w-auto mx-auto md:mx-0"
              />
            </Link>
          </div>

          {children}

          <p className="text-textGray-500 mt-16 md:text-left text-center text-sm">
            © ŠišajMe | All rights reserved
          </p>
        </div>
      </section>

      <Image
        src="/assets/imgs/barber_and_client_2.jpg"
        width={1500}
        height={1500}
        alt="barbershop interior"
        className="hidden md:block h-full object-cover max-w-[500px] bg-bottom"
      />
    </div>
  );
};

export default layout;
