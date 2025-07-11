import { editAppointment } from "@/lib/actions/appointment.action";
import { getLoggedInUser } from "@/lib/actions/customer.actions";
import { cn } from "@/lib/utils";
import { Appointment } from "@/types/appwrite.types";
import { Check, X } from "lucide-react";
import { useState } from "react";

interface AppointmentActionProps {
  type: "confirmed" | "declined";
  appointment: Appointment;
  disabled: boolean;
}

const AppointmentAction = ({
  type,
  appointment,
  disabled,
}: AppointmentActionProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = async () => {
    setIsLoading(true);

    try {
      const user = await getLoggedInUser();
      const appointmentData = {
        userId: user.$id,
        customer: appointment.customer.$id,
        barber: appointment.barber,
        serviceType: appointment.serviceType,
        scheduleDate: appointment.scheduleDate,
        status: String(type),
      };

      const editedAppointment = await editAppointment(
        appointment.$id,
        user.$id,
        appointmentData
      );

      if (!editedAppointment) throw Error;
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className={cn(
        "disabled:opacity-50 disabled:cursor-not-allowed",
        type === "confirmed" &&
          "text-green-500 [&:not(:disabled)]:hover:text-green-800",
        type === "declined" &&
          "text-red-500 [&:not(:disabled)]:hover:text-red-800"
      )}
      onClick={handleAction}
      disabled={isLoading || disabled}
    >
      {type === "confirmed" && <Check />}
      {type === "declined" && <X />}
    </button>
  );
};

export default AppointmentAction;
