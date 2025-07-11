import { Appointment } from "@/types/appwrite.types";
import { format, isPast } from "date-fns";
import { CalendarDays, Edit } from "lucide-react";
import Link from "next/link";
import DeleteAppointment from "./DeleteAppointment";

const AppointmentsList = ({
  appointments,
}: {
  appointments: Appointment[];
}) => {
  return (
    <ul className="space-y-5">
      {appointments.map((appointment, i) => (
        <li
          key={appointment.$id}
          className="flex px-5 flex-1 flex-col items-center justify-between gap-8 border-2 rounded-md bg-dark-500 text-textGray-500 border-dark-700 py-8 w-full md:flex-row"
        >
          <p className="font-bold">#{i}</p>
          <p>{appointment.barber}</p>
          <p>{appointment.serviceType}</p>
          <div className="flex items-center gap-2.5">
            <CalendarDays />
            <p>{format(appointment.scheduleDate, "MMMM dd, yyyy HH:mm")}</p>
          </div>
          <div className="flex items-center gap-2.5">
            {!isPast(appointment.scheduleDate) &&
            appointment.status === "pending" ? (
              <>
                <Link href={`/account/appointments/edit/${appointment.$id}`}>
                  <Edit className="h-5 text-yellow-500 hover:text-blue-500" />
                </Link>
                <DeleteAppointment appointmentId={appointment.$id} />
              </>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default AppointmentsList;
