import StateCard from "@/components/StateCard";
import AppointmentTable from "@/components/tables/AppointmentTable";
import { getAppointments } from "@/lib/actions/appointment.action";
import { getLoggedInUser } from "@/lib/actions/customer.actions";
import { Appointment } from "@/types/appwrite.types";
import { CalendarCheck, CalendarClock, CalendarX } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Dashboard",
};

export const dynamic = "force-dynamic";

const DashboardPage = async () => {
  const user = await getLoggedInUser();
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;
  const appointments: Appointment[] = await getAppointments();

  const statusCounts = Array.isArray(appointments)
    ? appointments.reduce(
        (acc, appointment) => {
          if (
            appointment.status === "confirmed" ||
            appointment.status === "pending" ||
            appointment.status === "declined"
          ) {
            acc[appointment.status] += 1;
          }
          return acc;
        },
        { confirmed: 0, pending: 0, declined: 0 }
      )
    : { confirmed: 0, pending: 0, declined: 0 };

  if (!user || user.email !== ADMIN_EMAIL) return notFound();

  return (
    <div className="min-h-screen w-full overflow-x-hidden px-4 pt-4 pb-16 sm:px-6 lg:px-12">
      <header className="sticky top-3 z-30 flex items-center justify-between rounded-2xl bg-dark-200 px-[5%] py-5 shadow-lg">
        <Link href="/account" className="cursor-pointer">
          <Image
            src="/assets/imgs/logo-barbershop.jpg"
            width={1000}
            height={1000}
            alt="logo"
            className="h-40 w-fit"
          />
        </Link>
        <p className="text-lg font-medium">Nadzorna ploča</p>
      </header>

      <main className="mt-6 space-y-8">
        <section className="space-y-4 text-center sm:text-left">
          <h1 className="heading-h1">Dobrodošli, {user.name} 👋</h1>
          <p className="text-textGray-500 text-lg font-medium">
            Kontrolirajte termine i klijente po želji
          </p>
        </section>

        <section className="flex flex-col flex-wrap gap-5 sm:flex-row sm:justify-between xl:gap-10">
          <StateCard
            state="confirmed"
            count={statusCounts.confirmed}
            label="Potvrđeni termini"
            icon={CalendarCheck}
          />
          <StateCard
            state="pending"
            count={statusCounts.pending}
            label="Čeka na potvrdu"
            icon={CalendarClock}
          />
          <StateCard
            state="declined"
            count={statusCounts.declined}
            label="Otkazani termini"
            icon={CalendarX}
          />
        </section>

        <AppointmentTable appointments={appointments} />
      </main>
    </div>
  );
};

export default DashboardPage;