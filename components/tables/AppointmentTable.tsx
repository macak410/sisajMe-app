"use client";

import { Appointment } from "@/types/appwrite.types";
import { format } from "date-fns";
import { hr } from "date-fns/locale";
import AppointmentAction from "../AppointmentAction";
import StatusMini from "../StatusMini";

const isValidStatus = (
  status: string
): status is "confirmed" | "pending" | "declined" =>
  ["confirmed", "pending", "declined"].includes(status);

const AppointmentTable = ({
  appointments,
}: {
  appointments: Appointment[];
}) => {
  return (
    <div className="w-full overflow-x-auto">
      {/* Header za desktop */}
      <div className="hidden sm:grid grid-cols-6 gap-4 py-4 px-2 font-semibold bg-dark-100 text-white rounded-t-lg">
        <div>#</div>
        <div>Ime i prezime</div>
        <div>Status</div>
        <div>Datum</div>
        <div>Frizer</div>
        <div>Radnje</div>
      </div>

      {/* Podaci */}
      <div className="space-y-6">
        {appointments.map((appointment, i) => (
          <div
            key={appointment.$id}
            className="grid grid-cols-1 sm:grid-cols-6 gap-4 items-center text-center sm:text-left bg-dark-500 border border-dark-700 p-5 rounded-xl shadow-sm"
          >
            {/* Redni broj */}
            <p className="font-semibold">#{i + 1}</p>

            {/* Klijent */}
            <div>
              <p className="font-medium">
                {appointment.customer?.fullName || "Nepoznato"}
              </p>
              <p className="text-sm text-textGray-400">
                {appointment.customer?.email}
              </p>
            </div>

            {/* Status */}
            {isValidStatus(appointment.status) ? (
              <StatusMini status={appointment.status} />
            ) : (
              <span className="text-sm text-red-600">Nepoznat status</span>
            )}

            {/* Datum */}
            <p className="text-sm">
              {format(new Date(appointment.scheduleDate), "d. MMMM yyyy. HH:mm", {
                locale: hr,
              })}
            </p>

            {/* Frizer */}
            <p className="text-sm">{appointment.barber}</p>

            {/* Radnje */}
            <div className="flex gap-2 justify-center sm:justify-end items-center flex-wrap">
              <AppointmentAction
                disabled={appointment.status === "confirmed"}
                type="confirmed"
                appointment={appointment}
              />
              <AppointmentAction
                disabled={appointment.status === "declined"}
                type="declined"
                appointment={appointment}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center text-sm mt-6 text-textGray-500">
        © ŠišajMe | All rights reserved
      </div>
    </div>
  );
};

export default AppointmentTable;