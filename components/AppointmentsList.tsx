"use client";

import { Appointment } from "@/types/appwrite.types";
import { format, isPast } from "date-fns";
import { hr } from "date-fns/locale";
import { CalendarDays, Edit } from "lucide-react";
import Link from "next/link";
import DeleteAppointment from "./DeleteAppointment";
import StatusBadge from "./StatusBadge";

const AppointmentsList = ({ appointments }: { appointments: Appointment[] }) => {
  return (
    <section className="w-full mx-auto px-6 py-6 space-y-6">
      {/* Desktop prikaz */}
      <div className="hidden md:block">
        <div className="flex w-full items-center justify-between gap-8 px-6 py-4 text-sm text-textGray-400 uppercase tracking-wide">
          <p className="w-[5%] min-w-[80px]"></p>
          <p className="w-[20%]">Frizer</p>
          <p className="w-[25%]">Usluga</p>
          <p className="w-[30%]">Datum i vrijeme</p>
          <p className="w-[20%] text-right">Status / Akcije</p>
        </div>

        <ul className="space-y-5 w-full">
          {appointments.map((appointment, i) => {
            const isExpired = isPast(new Date(appointment.scheduleDate));
            const canModify =
              !isExpired && ["pending", "confirmed"].includes(appointment.status);

            return (
              <li
                key={appointment.$id}
                className={`grid grid-cols-[80px_1fr_1fr_1.5fr_auto] items-center gap-8 rounded-xl bg-dark-500 border-2 border-dark-700 px-6 py-5 shadow-md transition hover:scale-[1.01] hover:bg-neutral-700 ${
                  isExpired ? "opacity-50 grayscale" : ""
                }`}
              >
                <p className="text-lg font-bold text-accent-400 text-center">#{i + 1}</p>
                <p className="truncate font-medium text-base text-white">{appointment.barber}</p>
                <p className="truncate text-white">{appointment.serviceType}</p>
                <div className="flex items-center gap-2 text-sm text-white truncate">
                  <CalendarDays className="h-5 w-5 shrink-0" />
                  {format(new Date(appointment.scheduleDate), "d. MMMM yyyy. 'u' HH:mm", {
                    locale: hr,
                  })}
                </div>
                <div className="flex items-center justify-end gap-4 text-white">
                  {!isExpired && <StatusBadge status={appointment.status} />}
                  {canModify && (
                    <>
                      {appointment.status === "pending" && (
                        <Link href={`/account/appointments/edit/${appointment.$id}`}>
                          <Edit className="h-5 w-5 text-yellow-500 hover:text-blue-500 transition-transform hover:scale-110" />
                        </Link>
                      )}
                      <DeleteAppointment appointmentId={appointment.$id} />
                    </>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Mobilni prikaz */}
      <ul className="space-y-5 md:hidden">
        {appointments.map((appointment, i) => {
          const isExpired = isPast(new Date(appointment.scheduleDate));
          const canModify =
            !isExpired && ["pending", "confirmed"].includes(appointment.status);

          return (
            <li
              key={appointment.$id}
              className={`grid grid-cols-[1fr_auto] max-[479px]:grid-cols-1 items-center max-[479px]:text-center rounded-xl bg-dark-500 p-5 shadow-md gap-4 text-white ${
                isExpired ? "opacity-50 grayscale" : ""
              }`}
            >
              <div className="space-y-2 text-sm max-[479px]:items-center max-[479px]:flex max-[479px]:flex-col w-full">
                <div className="flex items-center justify-start gap-2 flex-wrap">
                  <p className="font-bold text-base text-accent-400">Termin #{i + 1}</p>
                  {!isExpired && <StatusBadge status={appointment.status} />}
                </div>
                <p>
                  <span className="text-textGray-400">Frizer:</span> {appointment.barber}
                </p>
                <p>
                  <span className="text-textGray-400">Usluga:</span> {appointment.serviceType}
                </p>
                <p className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 shrink-0" />
                  {format(new Date(appointment.scheduleDate), "d. MMMM yyyy. 'u' HH:mm", {
                    locale: hr,
                  })}
                </p>
              </div>

              {canModify && (
                <div className="flex items-center gap-5 justify-end max-[767px]:justify-start max-[479px]:justify-center max-[479px]:pt-2">
                  {appointment.status === "pending" && (
                    <Link href={`/account/appointments/edit/${appointment.$id}`}>
                      <Edit className="h-7 w-7 text-yellow-500 hover:text-blue-500 transition-transform hover:scale-110" />
                    </Link>
                  )}
                  <DeleteAppointment appointmentId={appointment.$id} iconSize={28} />
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default AppointmentsList;