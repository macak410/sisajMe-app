import Button from "@/components/Button";
import { getAppointment } from "@/lib/actions/appointment.action";
import { format } from "date-fns";
import { CalendarDays } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ConfirmedPageProps {
  params: {
    userId: string;
    appointmentId: string;
  };
  searchParams: {
    appointmentId: string;
  };
}

const ConfirmedPage = async ({ params, searchParams }: ConfirmedPageProps) => {
  const appointment = await getAppointment(searchParams.appointmentId);

  return (
    <div className="flex h-screen min-h-screen px-[5%]">
      <div className="m-auto flex flex-col items-center justify-between gap-10 py-10">
        <Link href="/" className="mb-8">
          <Image
            src="/assets/imgs/logo.svg"
            width={1000}
            height={1000}
            alt="logo"
            className="h-10 w-fit"
          />
        </Link>

        <section className="flex flex-col items-center">
          <Image
            src="/assets/imgs/confirmed.gif"
            width={150}
            height={150}
            alt="confirmed"
          />
          <h1 className="heading-h1 max-w-[42rem] text-center">
            Your appointment has been{" "}
            <span className="text-green-500">successfully</span> submitted
          </h1>
          <p className="text-textGray-500 mt-2.5 mb-8">
            Please wait for admin approval.
          </p>
          <Button href="/">Go to Home</Button>
        </section>

        <section className="text-textGray-500 flex w-full flex-col items-center gap-8 border-y-2 border-dark-400 py-8 md:w-fit md:flex-row">
          <h3 className="text-white font-medium text-2xl">
            Appointment Details
          </h3>
          <p>{appointment.barber}</p>
          <p>{appointment.serviceType}</p>
          <div className="flex items-center gap-2.5">
            <CalendarDays />
            <p>{format(appointment.scheduleDate, "MMMM dd, yyyy HH:mm")}</p>
          </div>
          <Link
            href={`/account/appointments/edit/${appointment.$id}`}
            className="text-yellow-500 hover:text-yellow-400 font-medium cursor-pointer"
          >
            Edit appointment
          </Link>
        </section>
      </div>
    </div>
  );
};

export default ConfirmedPage;
