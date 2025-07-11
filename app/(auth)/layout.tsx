import { getLoggedInUser } from "@/lib/actions/customer.actions";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedInUser = await getLoggedInUser();
  if (loggedInUser) redirect("/");

  return (
    <div className="flex h-screen max-h-screen">
      <section className="container my-auto">
        <div className="sub-container max-w-[496px]">
          <div>
            <Link href="/" className="inline-block mb-12">
              <Image
                src="/assets/imgs/logo-barbershop.jpg"
                width={1000}
                height={1000}
                alt="ŠišajMe logo"
                className="h-40 w-fit"
              />
            </Link>
          </div>

          {children}

          <div className="text-textGray-500 mt-16">
            <p>© ŠišajMe | All rights reserved</p>
          </div>
        </div>
      </section>

      <Image
        src="/assets/imgs/barber.png"
        width={1000}
        height={1000}
        alt="barbershop interior"
        className="rounded-tl-3xl rounded-bl-3xl side-img max-w-[50%]"
      />
    </div>
  );
}
