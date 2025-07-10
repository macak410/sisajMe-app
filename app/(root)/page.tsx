import Button from "@/components/Button";
import Spinner from "@/components/Spinner";
import { getLoggedInUser } from "@/lib/actions/customer.actions";
import Image from "next/image";
import Link from "next/link";

const Home = async () => {
  const loggedUser = await getLoggedInUser();

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

          <div>
            {loggedUser && (
              <>
                <h1 className="heading-h1">
                  Welcome,{" "}
                  {loggedUser ? loggedUser.name.split(" ").at(0) : "Guest"} 👋
                </h1>
                <p className="text-textGray-500 mt-5 mb-10">
                  Your perfect cut, just a tap away. Get your appointment in
                  seconds!
                </p>
                <Button
                  href={`customers/${loggedUser.$id}/new-appointment`}
                  className="self-start"
                >
                  Get Appointment
                </Button>
              </>
            )}
          </div>

          <div className="mt-16">
            <Link
              href="/account"
              className="text-yellow-500 hover:text-yellow-400 text-lg font-medium"
            >
              Account Settings
            </Link>
            <p className="text-textGray-500">© NextCut | All rights reserved</p>
          </div>
        </div>
      </section>

      <Image
        src="/assets/imgs/barber_and_client.jpg"
        width={1500}
        height={1500}
        alt="barbershop interior"
        className="hidden md:block h-full object-cover max-w-[500px] bg-bottom"
      />
    </div>
  );
};

export default Home;
