import Image from "next/image";
import Link from "next/link";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="container my-auto">
        <div className="sub-container max-w-[860px] justify-between">
          <div>
            <Link href="/" className="inline-block mb-12">
              <Image
                src="/assets/imgs/logo.svg"
                width={1000}
                height={1000}
                alt="logo"
                className="h-10 w-fit"
              />
            </Link>
          </div>

          {children}

          <p className="text-textGray-500 mt-16">
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
